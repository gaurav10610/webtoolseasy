export type RecordingQuality = "720p" | "1080p" | "1440p";

export interface RecordingMimeInfo {
  mimeType: string;
  extension: "webm" | "mp4";
}

export interface ComposedRecordingStreamResult {
  stream: MediaStream;
  cleanup: () => void;
}

// MP4 is preferred because MediaRecorder-generated MP4 files are natively seekable
// (proper moov atom with duration). WebM from MediaRecorder omits the Duration header
// by default which causes fast-forward / seeking to fail in most players.
// Chrome 94+, Edge 94+, Firefox 130+ all support video/mp4 in MediaRecorder.
const VIDEO_MIME_CANDIDATES: RecordingMimeInfo[] = [
  { mimeType: "video/mp4;codecs=avc1,mp4a.40.2", extension: "mp4" },
  { mimeType: "video/mp4;codecs=h264,aac", extension: "mp4" },
  { mimeType: "video/mp4", extension: "mp4" },
  { mimeType: "video/webm;codecs=vp9,opus", extension: "webm" },
  { mimeType: "video/webm;codecs=vp8,opus", extension: "webm" },
  { mimeType: "video/webm", extension: "webm" },
];

const AUDIO_MIME_CANDIDATES: RecordingMimeInfo[] = [
  { mimeType: "audio/webm;codecs=opus", extension: "webm" },
  { mimeType: "audio/mp4", extension: "mp4" },
  { mimeType: "audio/webm", extension: "webm" },
];

export function getPreferredRecordingMimeInfo({
  audioOnly = false,
}: Readonly<{
  audioOnly?: boolean;
}> = {}): RecordingMimeInfo {
  const candidates = audioOnly ? AUDIO_MIME_CANDIDATES : VIDEO_MIME_CANDIDATES;

  if (typeof MediaRecorder === "undefined") {
    return candidates[0];
  }

  return (
    candidates.find(({ mimeType }) =>
      typeof MediaRecorder.isTypeSupported === "function"
        ? MediaRecorder.isTypeSupported(mimeType)
        : true,
    ) || candidates[candidates.length - 1]
  );
}

export function getDownloadExtensionFromMimeType(mimeType?: string) {
  return mimeType?.includes("mp4") ? "mp4" : "webm";
}

export function getVideoConstraintsForQuality(quality: RecordingQuality) {
  switch (quality) {
    case "1440p":
      return {
        width: { ideal: 2560 },
        height: { ideal: 1440 },
        frameRate: { ideal: 30, max: 60 },
      };
    case "1080p":
      return {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30, max: 60 },
      };
    case "720p":
    default:
      return {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30, max: 60 },
      };
  }
}

export function getRecommendedVideoBitrate(quality: RecordingQuality) {
  switch (quality) {
    case "1440p":
      return 14_000_000;
    case "1080p":
      return 9_000_000;
    case "720p":
    default:
      return 5_000_000;
  }
}

function createRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function drawVideoCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const sourceWidth = video.videoWidth || width;
  const sourceHeight = video.videoHeight || height;
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  ctx.drawImage(video, drawX, drawY, drawWidth, drawHeight);
}

async function createHiddenVideoElement(stream: MediaStream) {
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.srcObject = stream;

  await new Promise<void>((resolve) => {
    if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) {
      resolve();
      return;
    }

    videoElement.onloadedmetadata = () => resolve();
  });

  await videoElement.play().catch(() => undefined);
  return videoElement;
}

function getCanvasDimensions({
  screenStream,
  webcamStream,
}: Readonly<{
  screenStream?: MediaStream;
  webcamStream?: MediaStream;
}>) {
  const screenSettings = screenStream?.getVideoTracks()[0]?.getSettings();
  const webcamSettings = webcamStream?.getVideoTracks()[0]?.getSettings();

  return {
    width: screenSettings?.width || webcamSettings?.width || 1280,
    height: screenSettings?.height || webcamSettings?.height || 720,
  };
}

function buildMixedAudioTrack({
  screenStream,
  webcamStream,
  includeSystemAudio,
  includeMicrophoneAudio,
}: Readonly<{
  screenStream?: MediaStream;
  webcamStream?: MediaStream;
  includeSystemAudio: boolean;
  includeMicrophoneAudio: boolean;
}>): { track?: MediaStreamTrack; cleanup: () => void } {
  const sourceStreams: MediaStream[] = [];

  if (includeSystemAudio && screenStream?.getAudioTracks().length) {
    sourceStreams.push(new MediaStream(screenStream.getAudioTracks()));
  }

  if (includeMicrophoneAudio && webcamStream?.getAudioTracks().length) {
    sourceStreams.push(new MediaStream(webcamStream.getAudioTracks()));
  }

  if (!sourceStreams.length) {
    return { cleanup: () => undefined };
  }

  try {
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();

    sourceStreams.forEach((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1;
      source.connect(gainNode).connect(destination);
    });

    if (audioContext.state === "suspended") {
      void audioContext.resume().catch(() => undefined);
    }

    return {
      track: destination.stream.getAudioTracks()[0],
      cleanup: () => {
        void audioContext.close().catch(() => undefined);
      },
    };
  } catch {
    return {
      track: sourceStreams[0].getAudioTracks()[0],
      cleanup: () => undefined,
    };
  }
}

export async function createComposedRecordingStream({
  screenStream,
  webcamStream,
  includeSystemAudio,
  includeMicrophoneAudio,
  frameRate = 30,
}: Readonly<{
  screenStream?: MediaStream;
  webcamStream?: MediaStream;
  includeSystemAudio: boolean;
  includeMicrophoneAudio: boolean;
  frameRate?: number;
}>): Promise<ComposedRecordingStreamResult> {
  const hasScreenVideo = Boolean(screenStream?.getVideoTracks().length);
  const hasWebcamVideo = Boolean(webcamStream?.getVideoTracks().length);

  if (!hasScreenVideo && !hasWebcamVideo) {
    throw new Error("Select Screen Capture or Camera to create a recording.");
  }

  const { width, height } = getCanvasDimensions({ screenStream, webcamStream });
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    throw new Error("Unable to initialize the in-browser recording surface.");
  }

  const [screenVideo, webcamVideo] = await Promise.all([
    hasScreenVideo
      ? createHiddenVideoElement(screenStream as MediaStream)
      : Promise.resolve(null),
    hasWebcamVideo
      ? createHiddenVideoElement(webcamStream as MediaStream)
      : Promise.resolve(null),
  ]);

  let animationFrameId = 0;

  const renderFrame = () => {
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    if (screenVideo) {
      drawVideoCover(ctx, screenVideo, 0, 0, width, height);
    } else if (webcamVideo) {
      drawVideoCover(ctx, webcamVideo, 0, 0, width, height);
    }

    if (screenVideo && webcamVideo) {
      const overlayWidth = Math.round(width * 0.22);
      const overlayHeight = Math.round((overlayWidth * 9) / 16);
      const margin = Math.max(16, Math.round(width * 0.015));
      const overlayX = width - overlayWidth - margin;
      const overlayY = height - overlayHeight - margin;

      ctx.save();
      ctx.shadowColor = "rgba(15, 23, 42, 0.35)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
      createRoundedRectPath(
        ctx,
        overlayX,
        overlayY,
        overlayWidth,
        overlayHeight,
        18,
      );
      ctx.clip();
      drawVideoCover(
        ctx,
        webcamVideo,
        overlayX,
        overlayY,
        overlayWidth,
        overlayHeight,
      );
      ctx.restore();

      ctx.save();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      createRoundedRectPath(
        ctx,
        overlayX,
        overlayY,
        overlayWidth,
        overlayHeight,
        18,
      );
      ctx.stroke();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(renderFrame);
  };

  renderFrame();

  const composedVideoStream = canvas.captureStream(frameRate);
  const outputStream = new MediaStream();
  const composedVideoTrack = composedVideoStream.getVideoTracks()[0];

  if (composedVideoTrack) {
    outputStream.addTrack(composedVideoTrack);
  }

  const { track: mixedAudioTrack, cleanup: cleanupAudio } =
    buildMixedAudioTrack({
      screenStream,
      webcamStream,
      includeSystemAudio,
      includeMicrophoneAudio,
    });

  if (mixedAudioTrack) {
    outputStream.addTrack(mixedAudioTrack);
  }

  return {
    stream: outputStream,
    cleanup: () => {
      cancelAnimationFrame(animationFrameId);
      composedVideoStream.getTracks().forEach((track) => track.stop());
      screenVideo?.pause();
      webcamVideo?.pause();
      if (screenVideo) {
        screenVideo.srcObject = null;
      }
      if (webcamVideo) {
        webcamVideo.srcObject = null;
      }
      cleanupAudio();
    },
  };
}
