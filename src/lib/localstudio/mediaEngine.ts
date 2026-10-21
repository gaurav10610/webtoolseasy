import { TrimRange, VideoMetadata } from "./types";

export class LocalStudioEngine {
  private activeUrls: Set<string> = new Set();
  private audioContext: AudioContext | null = null;

  public registerUrl(url: string): string {
    this.activeUrls.add(url);
    return url;
  }

  public revokeUrl(url: string): void {
    if (this.activeUrls.has(url)) {
      try {
        URL.revokeObjectURL(url);
      } catch {}
      this.activeUrls.delete(url);
    }
  }

  public revokeAll(): void {
    for (const url of this.activeUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }
    this.activeUrls.clear();

    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
  }

  // Probe Video Metadata from local file
  public async probeVideo(file: File): Promise<{ metadata: VideoMetadata; objectUrl: string }> {
    const objectUrl = this.registerUrl(URL.createObjectURL(file));

    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = objectUrl;

      video.onloadedmetadata = () => {
        const width = video.videoWidth || 1920;
        const height = video.videoHeight || 1080;
        const duration = video.duration || 0;

        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const aspectRatio = `${width / divisor}:${height / divisor}`;

        const metadata: VideoMetadata = {
          name: file.name,
          size: file.size,
          type: file.type || "video/mp4",
          duration,
          width,
          height,
          aspectRatio,
        };

        resolve({ metadata, objectUrl });
      };

      video.onerror = () => {
        reject(new Error("Unable to decode video metadata. File format may be unsupported."));
      };
    });
  }

  // Fast Client-Side Video Trimmer using HTML5 MediaStream
  public async trimVideo(
    sourceUrl: string,
    range: TrimRange,
    onProgress?: (progress: number) => void
  ): Promise<{ blob: Blob; downloadUrl: string }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = sourceUrl;
      video.muted = false;
      video.currentTime = range.start;

      video.onseeked = async () => {
        // @ts-expect-error captureStream is supported on HTMLMediaElement in modern browsers
        const captureStream = video.captureStream ? video.captureStream() : video.mozCaptureStream?.();

        if (!captureStream) {
          // Fallback to direct slice
          return reject(new Error("Browser does not support stream capture."));
        }

        const mimeTypes = [
          "video/webm;codecs=vp9,opus",
          "video/webm;codecs=vp8,opus",
          "video/webm",
          "video/mp4",
        ];
        const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || "";

        const recorder = new MediaRecorder(
          captureStream,
          selectedMime ? { mimeType: selectedMime, videoBitsPerSecond: 8000000 } : undefined
        );

        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        const totalTrimDuration = Math.max(0.1, range.end - range.start);

        recorder.onstop = () => {
          const outputBlob = new Blob(chunks, { type: selectedMime || "video/webm" });
          const downloadUrl = this.registerUrl(URL.createObjectURL(outputBlob));
          captureStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
          resolve({ blob: outputBlob, downloadUrl });
        };

        video.ontimeupdate = () => {
          const currentPosition = video.currentTime - range.start;
          const pct = Math.min(100, Math.round((currentPosition / totalTrimDuration) * 100));
          onProgress?.(pct);

          if (video.currentTime >= range.end) {
            video.pause();
            recorder.stop();
          }
        };

        recorder.start(100);
        video.play().catch(reject);
      };

      video.onerror = (e) => reject(new Error(`Video seek error: ${e}`));
    });
  }

  // Extract Clean Audio Track to WAV (16-bit PCM)
  public async extractAudioToWav(file: File): Promise<{ blob: Blob; downloadUrl: string }> {
    const arrayBuffer = await file.arrayBuffer();

    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }

    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    const wavBlob = this.audioBufferToWavBlob(audioBuffer);
    const downloadUrl = this.registerUrl(URL.createObjectURL(wavBlob));

    return { blob: wavBlob, downloadUrl };
  }

  // Convert Web Audio API AudioBuffer to standard WAV Blob
  private audioBufferToWavBlob(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    let result: Float32Array;
    if (numChannels === 2) {
      result = this.interleaveChannels(buffer.getChannelData(0), buffer.getChannelData(1));
    } else {
      result = buffer.getChannelData(0);
    }

    const dataLength = result.length * (bitDepth / 8);
    const headerBuffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(headerBuffer);

    // RIFF chunk descriptor
    this.writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataLength, true);
    this.writeString(view, 8, "WAVE");

    // fmt sub-chunk
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
    view.setUint16(32, numChannels * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);

    // data sub-chunk
    this.writeString(view, 36, "data");
    view.setUint32(40, dataLength, true);

    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < result.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return new Blob([view], { type: "audio/wav" });
  }

  private writeString(view: DataView, offset: number, string: string): void {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  private interleaveChannels(left: Float32Array, right: Float32Array): Float32Array {
    const totalLength = left.length + right.length;
    const interleaved = new Float32Array(totalLength);
    let index = 0;
    let inputIndex = 0;

    while (index < totalLength) {
      interleaved[index++] = left[inputIndex];
      interleaved[index++] = right[inputIndex];
      inputIndex++;
    }
    return interleaved;
  }
}
