import { FFmpegFormat } from "@/types/ffmpeg";

// Audio formats
export const AUDIO_FORMATS = {
  MP3: {
    id: 1,
    ext: "mp3",
    name: "MP3 (Audio)",
    codec: "libmp3lame",
    params: "-q:a 2",
  },
  OGG: {
    id: 2,
    ext: "ogg",
    name: "OGG (Audio)",
    codec: "libvorbis",
    params: "-q:a 5",
  },
  OPUS: {
    id: 3,
    ext: "opus",
    name: "OPUS (Audio)",
    codec: "libopus",
    params: "-b:a 128k",
  },
  AAC: {
    id: 4,
    ext: "aac",
    name: "AAC (Audio)",
    codec: "aac",
    params: "-b:a 128k",
  },
} as const;

// Video formats
export const VIDEO_FORMATS = {
  MP4_X264: { id: 5, ext: "mp4", name: "MP4 x264 (Video)", codec: "libx264" },
  MP4_X265: { id: 6, ext: "mp4", name: "MP4 x265 (Video)", codec: "libx265" },
  WEBM: { id: 7, ext: "webm", name: "WEBM (Video)" },
  OGV: { id: 8, ext: "ogv", name: "OGV (Video)" },
  MKV: { id: 9, ext: "mkv", name: "MKV (Video)" },
  AVI: { id: 10, ext: "avi", name: "AVI (Video)" },
  OGM: { id: 11, ext: "ogm", name: "OGM (Video)" },
  MOV: { id: 12, ext: "mov", name: "MOV (Video)" },
  M4V: { id: 13, ext: "m4v", name: "M4V (Video)" },
  FLV: { id: 14, ext: "flv", name: "FLV (Video)" },
  WMV: { id: 15, ext: "wmv", name: "WMV (Video)" },
  GP3: { id: 16, ext: "3gp", name: "3GP (Video)" },
} as const;

export const FFMPEG_FORMATS: Map<number, FFmpegFormat> = new Map([
  // Audio formats
  ...Object.values(AUDIO_FORMATS).map(
    (f) =>
      [f.id, { targetFormat: f.ext, displayName: f.name }] as [
        number,
        FFmpegFormat
      ]
  ),
  // Video formats
  ...Object.values(VIDEO_FORMATS).map(
    (f) =>
      [f.id, { targetFormat: f.ext, displayName: f.name }] as [
        number,
        FFmpegFormat
      ]
  ),
]);

// Define which formats can be converted to which target formats
export const ELIGIBLE_TARGET_FORMATS: Map<string, number[]> = new Map([
  // All video formats can be converted to all audio formats
  ...Object.values(VIDEO_FORMATS).map(
    (f) =>
      [f.ext, Object.values(AUDIO_FORMATS).map((a) => a.id)] as [
        string,
        number[]
      ]
  ),
  // MKV and OGV can also convert to other video formats
  [
    "mkv",
    [
      ...Object.values(AUDIO_FORMATS).map((a) => a.id),
      VIDEO_FORMATS.MP4_X264.id,
      VIDEO_FORMATS.MP4_X265.id,
    ],
  ],
  [
    "ogv",
    [
      ...Object.values(AUDIO_FORMATS).map((a) => a.id),
      VIDEO_FORMATS.MP4_X264.id,
      VIDEO_FORMATS.MP4_X265.id,
      VIDEO_FORMATS.WEBM.id,
    ],
  ],
]);

// Helper function to generate audio extraction command
const getAudioCommand = (targetId: number): string => {
  const audioFormat = Object.values(AUDIO_FORMATS).find(
    (f) => f.id === targetId
  );
  if (!audioFormat) return "-i {0} -vn {1}";
  return `-i {0} -vn -acodec ${audioFormat.codec} ${audioFormat.params} {1}`;
};

// Simplified command generation
export const FFMPEG_COMMANDS: Map<number, Map<number, string>> = new Map([
  // Audio formats (already audio, just convert codec)
  ...Object.values(AUDIO_FORMATS).map(
    (f) =>
      [f.id, new Map([[0, getAudioCommand(f.id)]])] as [
        number,
        Map<number, string>
      ]
  ),

  // Video formats - each can convert to audio formats
  ...Object.values(VIDEO_FORMATS).map(
    (f) =>
      [
        f.id,
        new Map([
          [0, "-i {0} -vn {1}"], // Default conversion
          ...Object.values(AUDIO_FORMATS).map(
            (a) => [a.id, getAudioCommand(a.id)] as [number, string]
          ),
        ]),
      ] as [number, Map<number, string>]
  ),
]);

// Override specific video format commands
FFMPEG_COMMANDS.set(
  VIDEO_FORMATS.MP4_X264.id,
  new Map([
    [0, "-i {0} -c:v libx264 {1}"],
    [VIDEO_FORMATS.MKV.id, "-i {0} -codec copy {1}"],
    ...Object.values(AUDIO_FORMATS).map(
      (a) => [a.id, getAudioCommand(a.id)] as [number, string]
    ),
  ])
);

FFMPEG_COMMANDS.set(
  VIDEO_FORMATS.MP4_X265.id,
  new Map([
    [0, "-i {0} -c:v libx265 {1}"],
    [VIDEO_FORMATS.MKV.id, "-i {0} -codec copy {1}"],
    ...Object.values(AUDIO_FORMATS).map(
      (a) => [a.id, getAudioCommand(a.id)] as [number, string]
    ),
  ])
);

FFMPEG_COMMANDS.set(
  VIDEO_FORMATS.MKV.id,
  new Map([
    [0, "-i {0} {1}"],
    [VIDEO_FORMATS.MP4_X264.id, "-i {0} -codec copy {1}"],
    [VIDEO_FORMATS.MP4_X265.id, "-i {0} -codec copy {1}"],
    ...Object.values(AUDIO_FORMATS).map(
      (a) => [a.id, getAudioCommand(a.id)] as [number, string]
    ),
  ])
);

// Special WebM handling with specific audio extraction parameters
FFMPEG_COMMANDS.set(
  VIDEO_FORMATS.WEBM.id,
  new Map([
    [0, "-i {0} -vn {1}"], // Default conversion
    [
      AUDIO_FORMATS.MP3.id,
      "-i {0} -vn -acodec libmp3lame -q:a 2 -ar 44100 {1}",
    ], // WebM to MP3 with sample rate
    [AUDIO_FORMATS.OGG.id, "-i {0} -vn -acodec libvorbis -q:a 5 -ar 44100 {1}"], // WebM to OGG
    [
      AUDIO_FORMATS.OPUS.id,
      "-i {0} -vn -acodec libopus -b:a 128k -ar 48000 {1}",
    ], // WebM to OPUS with higher sample rate
    [AUDIO_FORMATS.AAC.id, "-i {0} -vn -acodec aac -b:a 128k -ar 44100 {1}"], // WebM to AAC
  ])
);
