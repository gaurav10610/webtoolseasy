import { FFMpegOutputConfig } from 'src/app/@types/ffmpeg';

export const FFMPEG_SUPPORTED_INPUT_VIDEO_FORMATS = [
  'mp4',
  'webm',
  'ogv',
  'mkv',
  'ogm',
];

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
