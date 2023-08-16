import { FFMpegOutputConfig } from 'src/app/@types/ffmpeg';

export const FFMPEG_FORMATS: Map<string, any> = new Map(
  Object.entries({
    1: {
      targetFormat: 'mp3',
      displayName: 'MP3 (Audio)',
    },
    2: {
      targetFormat: 'ogg',
      displayName: 'OGG (Audio)',
    },
    3: {
      targetFormat: 'opus',
      displayName: 'OPUS (Audio)',
    },
    4: {
      targetFormat: 'aac',
      displayName: 'AAC (Audio)',
    },
    5: {
      targetFormat: 'mp4',
      displayName: 'MP4 x264(Video)',
    },
    6: {
      targetFormat: 'mp4',
      displayName: 'MP4 x265(Video)',
    },
    7: {
      targetFormat: 'webm',
      displayName: 'WEBM (Video)',
    },
    8: {
      targetFormat: 'ogv',
      displayName: 'OGV (Video)',
    },
  })
);

export const ELIGIBLE_TARGET_FORMATS: Map<string, number[]> = new Map(
  Object.entries({
    mp4: [1, 2, 3, 4, 7, 8],
    webm: [1, 2, 3, 4, 5, 6, 8],
    ogv: [1, 2, 3, 4, 5, 6, 7],
    mkv: [1, 2, 3, 4, 5, 6, 7, 8],
    ogm: [1, 2, 3, 4, 5, 6, 7, 8],
  })
);

export const FFMPEG_COMMANDS = {
  1: {
    0: '-i {0} -c:a libmp3lame {1}',
  },
  2: {
    0: '-i {0} -c:a libvorbis {1}',
  },
  3: {
    0: '-i {0} -c:a libopus {1}',
  },
  4: {
    0: '-i {0} -c:a libfdk_aac {1}',
  },
  5: {
    0: '-i {0} -c:v libx264 {1}',
  },
  6: {
    0: '-i {0} -c:v libx265 {1}',
  },
  7: {
    0: '-i {0} -c:v libvpx {1}',
  },
  8: {
    0: '-i {0} -c:v libtheora {1}',
  },
};

export const FFMPEG_OUTPUT_CONFIG: FFMpegOutputConfig = {
  audio: [
    {
      targetFormat: 'mp3',
      displayName: 'MP3 (Audio)',
      command: '-i {0} -c:a libmp3lame {1}',
    },
    {
      targetFormat: 'ogg',
      displayName: 'OGG (Audio)',
      command: '-i {0} -c:a libvorbis {1}',
    },
    {
      targetFormat: 'opus',
      displayName: 'OPUS (Audio)',
      command: '-i {0} -c:a libopus {1}',
    },
    {
      targetFormat: 'aac',
      displayName: 'AAC (Audio)',
      command: '-i {0} -c:a libfdk_aac {1}',
    },
  ],
  video: [
    {
      targetFormat: 'mp4',
      displayName: 'MP4 x264(Video)',
      command: '-i {0} -c:v libx264 {1}',
    },
    {
      targetFormat: 'mp4',
      displayName: 'MP4 x265(Video)',
      command: '-i {0} -c:v libx265 {1}',
    },
    {
      targetFormat: 'webm',
      displayName: 'WEBM (Video)',
      command: '-i {0} -c:v libvpx {1}',
    },
    {
      targetFormat: 'ogv',
      displayName: 'OGV (Video)',
      command: '-i {0} -c:v libtheora {1}',
    },
  ],
};
