"use client";
/**
 * webCodecsAudioService.ts
 *
 * Native-browser audio encoding service — replaces ffmpegService for all audio work.
 *
 * Encoding paths:
 *   MP3  → lamejs Mp3Encoder (pure JS, no WASM)
 *   Opus → WebCodecs AudioEncoder (codec "opus") muxed into WebM via buildWebM()
 *   AAC  → WebCodecs AudioEncoder (codec "mp4a.40.2") muxed into MP4 via mp4-muxer
 *   WAV  → inline 16-bit PCM writer (zero dependencies, instant)
 *
 * All functions:
 *   - Accept a browser File or AudioBuffer as input
 *   - Return a Blob of the encoded output
 *   - Accept an optional onProgress callback (0–100)
 *   - Accept an optional AbortSignal for cancellation
 */

import { buildWebM, type MuxChunk } from "@/lib/webmMuxer";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ProgressCallback = (pct: number) => void;

export interface EncodeOptions {
  bitrate?: number; // bit/s — default 128 000
  onProgress?: ProgressCallback;
  signal?: AbortSignal;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: File → AudioBuffer
// ─────────────────────────────────────────────────────────────────────────────

export async function fileToAudioBuffer(file: File): Promise<AudioBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const ctx = new AudioContext();
  try {
    return await ctx.decodeAudioData(arrayBuffer);
  } finally {
    ctx.close();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WAV encoder — 16-bit PCM, no external dependencies
// ─────────────────────────────────────────────────────────────────────────────

export function encodeToWav(
  audioBuffer: AudioBuffer,
  opts: EncodeOptions = {},
): Blob {
  const { onProgress } = opts;
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const numFrames = audioBuffer.length;
  const bytesPerSample = 2; // 16-bit
  const dataSize = numFrames * numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++)
      view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // PCM subchunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true); // byte rate
  view.setUint16(32, numChannels * bytesPerSample, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  // Interleave channels
  const channels = Array.from({ length: numChannels }, (_, i) =>
    audioBuffer.getChannelData(i),
  );
  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }
    if (i % 50_000 === 0) onProgress?.(Math.round((i / numFrames) * 100));
  }
  onProgress?.(100);
  return new Blob([buffer], { type: "audio/wav" });
}

// ─────────────────────────────────────────────────────────────────────────────
// MP3 encoder — lamejs (pure JS, no WASM)
// ─────────────────────────────────────────────────────────────────────────────

export async function encodeToMp3(
  audioBuffer: AudioBuffer,
  opts: EncodeOptions = {},
): Promise<Blob> {
  const { bitrate = 128_000, onProgress, signal } = opts;
  const kbps = Math.round(bitrate / 1000);

  // Dynamic import to keep lamejs out of the main bundle until needed
  const lamejs = await import("@breezystack/lamejs");
  const Mp3Encoder = lamejs.Mp3Encoder;

  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const numFrames = audioBuffer.length;

  // lamejs wants Int16 PCM samples
  const toInt16 = (floatData: Float32Array): Int16Array => {
    const int16 = new Int16Array(floatData.length);
    for (let i = 0; i < floatData.length; i++) {
      const s = Math.max(-1, Math.min(1, floatData[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16;
  };

  const leftChannel = toInt16(audioBuffer.getChannelData(0));
  const rightChannel =
    numChannels > 1 ? toInt16(audioBuffer.getChannelData(1)) : leftChannel;

  const encoder = new Mp3Encoder(numChannels > 1 ? 2 : 1, sampleRate, kbps);

  const CHUNK = 1152; // lamejs processes 1152 samples at a time
  const parts: Uint8Array[] = [];

  for (let i = 0; i < numFrames; i += CHUNK) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const end = Math.min(i + CHUNK, numFrames);
    const leftSlice = leftChannel.subarray(i, end);
    const rightSlice = rightChannel.subarray(i, end);

    const buf =
      numChannels > 1
        ? encoder.encodeBuffer(leftSlice, rightSlice)
        : encoder.encodeBuffer(leftSlice);

    if (buf.length > 0) {
      const ab = buf.buffer.slice(
        buf.byteOffset,
        buf.byteOffset + buf.byteLength,
      );
      parts.push(new Uint8Array(ab));
    }
    if (i % (CHUNK * 100) === 0) onProgress?.(Math.round((i / numFrames) * 95));

    // Yield to keep UI responsive (every ~100 chunks)
    if (i % (CHUNK * 50) === 0)
      await new Promise<void>((r) => setTimeout(r, 0));
  }

  const finalBuf = encoder.flush();
  if (finalBuf.length > 0) {
    const ab = finalBuf.buffer.slice(
      finalBuf.byteOffset,
      finalBuf.byteOffset + finalBuf.byteLength,
    );
    parts.push(new Uint8Array(ab));
  }
  onProgress?.(100);

  return new Blob(parts as BlobPart[], { type: "audio/mpeg" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Opus encoder — WebCodecs AudioEncoder → WebM via webmMuxer
// ─────────────────────────────────────────────────────────────────────────────

export async function encodeToOpus(
  audioBuffer: AudioBuffer,
  opts: EncodeOptions = {},
): Promise<Blob> {
  const { bitrate = 128_000, onProgress, signal } = opts;

  const sampleRate = 48_000; // Opus spec requires 48 kHz
  const numChannels = Math.min(audioBuffer.numberOfChannels, 2);

  // Resample to 48 kHz if necessary
  let workBuffer = audioBuffer;
  if (audioBuffer.sampleRate !== sampleRate) {
    const offlineCtx = new OfflineAudioContext(
      numChannels,
      Math.ceil(audioBuffer.duration * sampleRate),
      sampleRate,
    );
    const src = offlineCtx.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(offlineCtx.destination);
    src.start();
    workBuffer = await offlineCtx.startRendering();
  }

  const chunks: MuxChunk[] = [];
  let encoderError: Error | null = null;

  const encoder = new AudioEncoder({
    output: (chunk) => {
      const buf = new Uint8Array(chunk.byteLength);
      chunk.copyTo(buf);
      chunks.push({ data: buf, timestampUs: chunk.timestamp, isKey: true });
    },
    error: (e) => {
      encoderError = e;
    },
  });

  encoder.configure({
    codec: "opus",
    sampleRate,
    numberOfChannels: numChannels,
    bitrate,
  });

  const FRAME_SIZE = 20_000; // 20 ms at 48 kHz = 960 samples
  const totalSamples = workBuffer.length;
  const floatArrays = Array.from({ length: numChannels }, (_, ch) =>
    workBuffer.getChannelData(ch),
  );

  for (let offset = 0; offset < totalSamples; offset += FRAME_SIZE) {
    if (signal?.aborted) {
      encoder.close();
      throw new DOMException("Aborted", "AbortError");
    }
    if (encoderError) {
      encoder.close();
      throw encoderError;
    }

    const end = Math.min(offset + FRAME_SIZE, totalSamples);
    const frameLen = end - offset;

    // AudioData uses interleaved Float32
    const interleaved = new Float32Array(frameLen * numChannels);
    for (let i = 0; i < frameLen; i++)
      for (let ch = 0; ch < numChannels; ch++)
        interleaved[i * numChannels + ch] = floatArrays[ch][offset + i];

    const audioData = new AudioData({
      format: "f32",
      sampleRate,
      numberOfFrames: frameLen,
      numberOfChannels: numChannels,
      timestamp: Math.round((offset / sampleRate) * 1_000_000),
      data: interleaved,
    });

    encoder.encode(audioData);
    audioData.close();

    if (offset % (FRAME_SIZE * 50) === 0) {
      onProgress?.(Math.round((offset / totalSamples) * 90));
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }

  await encoder.flush();
  encoder.close();
  if (encoderError) throw encoderError;
  onProgress?.(100);

  return buildWebM({
    width: 0,
    height: 0,
    durationMs: Math.round(audioBuffer.duration * 1000),
    codecId: "A_OPUS",
    chunks,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// AAC encoder — WebCodecs AudioEncoder → MP4 via mp4-muxer
// ─────────────────────────────────────────────────────────────────────────────

export async function encodeToAac(
  audioBuffer: AudioBuffer,
  opts: EncodeOptions = {},
): Promise<Blob> {
  const { bitrate = 128_000, onProgress, signal } = opts;

  // AAC requires sample rate to be one of the standard rates; use original or resample
  const sampleRate = audioBuffer.sampleRate;
  const numChannels = Math.min(audioBuffer.numberOfChannels, 2);

  // Check if AAC is supported first; fall back to WAV if not
  const config: AudioEncoderConfig = {
    codec: "mp4a.40.2",
    sampleRate,
    numberOfChannels: numChannels,
    bitrate,
  };
  const support = await AudioEncoder.isConfigSupported(config);
  if (!support.supported) {
    console.warn(
      "AAC AudioEncoder not supported on this browser — falling back to WAV",
    );
    return encodeToWav(audioBuffer, opts);
  }

  const { Muxer, ArrayBufferTarget } = await import("mp4-muxer");

  const expectedAudioChunks = Math.ceil(
    (audioBuffer.length / sampleRate) * 50, // ~50 chunks per second at 20 ms frame
  );

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    audio: { codec: "aac", numberOfChannels: numChannels, sampleRate },
    fastStart: { expectedAudioChunks },
  });

  let encoderError: Error | null = null;

  const encoder = new AudioEncoder({
    output: (chunk, meta) => {
      muxer.addAudioChunk(chunk, meta);
    },
    error: (e) => {
      encoderError = e;
    },
  });

  encoder.configure(config);

  const FRAME_SIZE = 20_000; // 20 ms
  const totalSamples = audioBuffer.length;
  const floatArrays = Array.from({ length: numChannels }, (_, ch) =>
    audioBuffer.getChannelData(ch),
  );

  for (let offset = 0; offset < totalSamples; offset += FRAME_SIZE) {
    if (signal?.aborted) {
      encoder.close();
      muxer.finalize();
      throw new DOMException("Aborted", "AbortError");
    }
    if (encoderError) {
      encoder.close();
      muxer.finalize();
      throw encoderError;
    }

    const end = Math.min(offset + FRAME_SIZE, totalSamples);
    const frameLen = end - offset;

    const interleaved = new Float32Array(frameLen * numChannels);
    for (let i = 0; i < frameLen; i++)
      for (let ch = 0; ch < numChannels; ch++)
        interleaved[i * numChannels + ch] = floatArrays[ch][offset + i];

    const audioData = new AudioData({
      format: "f32",
      sampleRate,
      numberOfFrames: frameLen,
      numberOfChannels: numChannels,
      timestamp: Math.round((offset / sampleRate) * 1_000_000),
      data: interleaved,
    });

    encoder.encode(audioData);
    audioData.close();

    if (offset % (FRAME_SIZE * 50) === 0) {
      onProgress?.(Math.round((offset / totalSamples) * 90));
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }

  await encoder.flush();
  encoder.close();
  if (encoderError) throw encoderError;

  muxer.finalize();
  onProgress?.(100);

  return new Blob([target.buffer], { type: "audio/mp4" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Unified dispatch — picks the right encoder for a given format id
// ─────────────────────────────────────────────────────────────────────────────

import { AUDIO_FORMAT_MAP } from "@/data/config/audio-config";

/**
 * Encode a browser File (any audio or video container) to the target format.
 *
 * @param file         The source media File
 * @param targetFormatId  One of the ids in AUDIO_FORMATS_NATIVE (1=MP3, 3=Opus, 4=AAC, 5=WAV)
 * @param opts         Optional bitrate, progress callback, abort signal
 * @returns            Encoded Blob + suggested file extension
 */
export async function encodeAudioFile(
  file: File,
  targetFormatId: number,
  opts: EncodeOptions = {},
): Promise<{ blob: Blob; ext: string; mimeType: string }> {
  const format = AUDIO_FORMAT_MAP.get(targetFormatId);
  if (!format) throw new Error(`Unknown audio format id: ${targetFormatId}`);

  opts.onProgress?.(0);
  const audioBuffer = await fileToAudioBuffer(file);
  opts.onProgress?.(5);

  let blob: Blob;
  switch (targetFormatId) {
    case 1: // MP3
      blob = await encodeToMp3(audioBuffer, opts);
      break;
    case 3: // Opus
      blob = await encodeToOpus(audioBuffer, opts);
      break;
    case 4: // AAC
      blob = await encodeToAac(audioBuffer, opts);
      break;
    case 5: // WAV
      blob = encodeToWav(audioBuffer, opts);
      break;
    default:
      throw new Error(`No encoder for format id ${targetFormatId}`);
  }

  return { blob, ext: format.ext, mimeType: format.mimeType };
}
