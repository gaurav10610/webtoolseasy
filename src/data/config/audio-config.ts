// Native-browser audio format configuration — replaces ffmpeg-config.ts
// All encoding handled via WebCodecs AudioEncoder + lamejs (MP3) + mp4-muxer (AAC)

export interface AudioFormat {
  id: number;
  ext: string;
  displayName: string;
  /** Codec string passed to WebCodecs AudioEncoder, or null for lamejs/PCM paths */
  webCodecsCodec: string | null;
  /** Nominal bitrate in bit/s (informational; used when configuring AudioEncoder) */
  bitrate: number;
  /** MIME type of the output container */
  mimeType: string;
}

export const AUDIO_FORMATS_NATIVE: Record<string, AudioFormat> = {
  MP3: {
    id: 1,
    ext: "mp3",
    displayName: "MP3 (Audio)",
    webCodecsCodec: null, // encoded via lamejs
    bitrate: 128_000,
    mimeType: "audio/mpeg",
  },
  OPUS: {
    id: 3,
    ext: "webm",
    displayName: "Opus WebM (Audio)",
    webCodecsCodec: "opus",
    bitrate: 128_000,
    mimeType: "audio/webm",
  },
  AAC: {
    id: 4,
    ext: "m4a",
    displayName: "AAC / M4A (Audio)",
    webCodecsCodec: "mp4a.40.2",
    bitrate: 128_000,
    mimeType: "audio/mp4",
  },
  WAV: {
    id: 5,
    ext: "wav",
    displayName: "WAV (Lossless)",
    webCodecsCodec: null, // encoded via PCM writer
    bitrate: 0,
    mimeType: "audio/wav",
  },
} as const;

/** Flat map of id → AudioFormat for O(1) look-ups */
export const AUDIO_FORMAT_MAP: Map<number, AudioFormat> = new Map(
  Object.values(AUDIO_FORMATS_NATIVE).map((f) => [f.id, f]),
);

/** Ordered list for UI selectors */
export const AUDIO_FORMAT_LIST: AudioFormat[] =
  Object.values(AUDIO_FORMATS_NATIVE);

/** Extension → format id (covers common input containers) */
export const INPUT_FORMAT_ID: Record<string, number> = {
  mp3: 1,
  ogg: 3,
  opus: 3,
  aac: 4,
  m4a: 4,
  wav: 5,
  flac: 5,
  mp4: 3,
  webm: 3,
  mkv: 3,
  mov: 3,
  avi: 3,
};
