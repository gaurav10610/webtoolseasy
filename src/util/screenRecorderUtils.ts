import { VideoStreamMerger } from "video-stream-merger";

export async function getScreenStream({
  includeSystemAudio = false,
}: Readonly<{
  includeSystemAudio?: boolean;
}>) {
  return navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: includeSystemAudio,
  });
}

export function getVideoStreamHeightWidth(mediaStream: MediaStream) {
  if (mediaStream.getVideoTracks().length > 0) {
    const settings: MediaTrackSettings = mediaStream
      .getVideoTracks()[0]
      .getSettings();
    return `[ height: ${settings.height}, width: ${settings.width} ]`;
  }
  return "";
}

export async function getCameraAndMicrophoneStream({
  includeCameraVideo,
  includeMicrophoneAudio,
}: Readonly<{
  includeCameraVideo: boolean;
  includeMicrophoneAudio: boolean;
}>) {
  return navigator.mediaDevices.getUserMedia({
    video: includeCameraVideo,
    audio: includeMicrophoneAudio,
  });
}

export function mergeMediaStreams({
  screenStream,
  webcamStream,
  includeSystemAudio,
  includeMicrophoneAudio,
  cameraVideoOptions,
}: Readonly<{
  screenStream: MediaStream | undefined;
  webcamStream: MediaStream | undefined;
  includeSystemAudio: boolean;
  includeMicrophoneAudio: boolean;
  cameraVideoOptions: Record<string, number>;
}>): MediaStream | null {
  const screenStreamSettings: MediaTrackSettings = screenStream!
    .getVideoTracks()[0]
    .getSettings()!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergerOptions: any = {
    width: screenStreamSettings.width!,
    height: screenStreamSettings.height!,
  };

  const streamMerger: VideoStreamMerger = new VideoStreamMerger(mergerOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeScreenStreamOptions: any = {
    x: 0,
    y: 0,
    width: streamMerger.width,
    height: streamMerger.height,
    mute: !includeSystemAudio,
    index: 0,
  };

  // Add the screen capture. Position it to fill the whole stream (the default)
  streamMerger.addStream(screenStream!, mergeScreenStreamOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeWebcamStreamOptions: any = {
    x: streamMerger.width - cameraVideoOptions.width,
    y: streamMerger.height - cameraVideoOptions.height,
    width: cameraVideoOptions.width,
    height: cameraVideoOptions.height,
    mute: !includeMicrophoneAudio,
    index: 1,
  };

  // Add the webcam stream. Position it on the bottom left and resize it to 100x100.
  streamMerger.addStream(webcamStream!, mergeWebcamStreamOptions);

  // Start the merging. Calling this makes the result available to us
  streamMerger.start();

  // We now have a merged MediaStream!
  return streamMerger.result;
}
