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
]);

export const ELIGIBLE_TARGET_FORMATS: Map<string, number[]> = new Map(
  Object.entries({
    mp4: [1, 2, 3, 4, 7, 8],
    webm: [1, 2, 3, 4, 5, 6, 8],
    ogv: [1, 2, 3, 4, 5, 6, 7],
    mkv: [1, 2, 3, 4, 5, 6, 7, 8],
    ogm: [1, 2, 3, 4, 5, 6, 7, 8],
    avi: [1, 2, 3, 4, 5, 6, 7, 8],
  })
);

export const FFMPEG_COMMANDS: Map<number, Map<number, string>> = new Map([
  [1, new Map([[0, '-i {0} -c:a libmp3lame {1}']])],
  [2, new Map([[0, '-i {0} -c:a libvorbis {1}']])],
  [3, new Map([[0, '-i {0} -c:a libopus {1}']])],
  [4, new Map([[0, '-i {0} -c:a libfdk_aac {1}']])],
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
  [7, new Map([[0, '-i {0} -c:v libvpx {1}']])],
  [8, new Map([[0, '-i {0} -c:v libtheora {1}']])],
]);
