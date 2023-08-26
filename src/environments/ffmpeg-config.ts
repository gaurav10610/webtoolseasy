import { FFmpegFormat } from 'src/app/@types/ffmpeg';

export const FFMPEG_FORMATS: Map<number, FFmpegFormat> = new Map([
  [
    1,
    {
      targetFormat: 'mp3',
      displayName: 'MP3 (Audio)',
    },
  ],
  [
    2,
    {
      targetFormat: 'ogg',
      displayName: 'OGG (Audio)',
    },
  ],
  [
    3,
    {
      targetFormat: 'opus',
      displayName: 'OPUS (Audio)',
    },
  ],
  [
    4,
    {
      targetFormat: 'aac',
      displayName: 'AAC (Audio)',
    },
  ],
  [
    5,
    {
      targetFormat: 'mp4',
      displayName: 'MP4 x264(Video)',
    },
  ],
  [
    6,
    {
      targetFormat: 'mp4',
      displayName: 'MP4 x265(Video)',
    },
  ],
  [
    7,
    {
      targetFormat: 'webm',
      displayName: 'WEBM (Video)',
    },
  ],
  [
    8,
    {
      targetFormat: 'ogv',
      displayName: 'OGV (Video)',
    },
  ],
  [
    9,
    {
      targetFormat: 'mkv',
      displayName: 'MKV (Video)',
    },
  ],
  [
    10,
    {
      targetFormat: 'avi',
      displayName: 'AVI (Video)',
    },
  ],
  [
    11,
    {
      targetFormat: 'ogm',
      displayName: 'OGM (Video)',
    },
  ],
]);

export const ELIGIBLE_TARGET_FORMATS: Map<string, number[]> = new Map(
  Object.entries({
    mp4: [1, 4],
    webm: [1, 3, 4],
    ogm: [1, 4],
    mkv: [1, 4, 5, 6],
    avi: [1, 3, 4],
    ogv: [1, 2, 3, 4, 5, 6, 7],
  })
);

export const FFMPEG_COMMANDS: Map<number, Map<number, string>> = new Map([
  [1, new Map([[0, '-i {0} {1}']])],
  [2, new Map([[0, '-i {0} {1}']])],
  [3, new Map([[0, '-i {0} {1}']])],
  [4, new Map([[0, '-i {0} {1}']])],
  [
    5,
    new Map([
      [0, '-i {0} -c:v libx264 {1}'],
      [9, '-i {0} -codec copy {1}'],
    ]),
  ],
  [
    6,
    new Map([
      [0, '-i {0} -c:v libx265 {1}'],
      [9, '-i {0} -codec copy {1}'],
    ]),
  ],
  [7, new Map([[0, '-i {0} {1}']])],
  [8, new Map([[0, '-i {0} {1}']])],
  [
    9,
    new Map([
      [0, '-i {0} {1}'],
      [5, '-i {0} -codec copy {1}'],
      [6, '-i {0} -codec copy {1}'],
    ]),
  ],
  [10, new Map([[0, '-i {0} {1}']])],
  [11, new Map([[0, '-i {0} {1}']])],
]);
