export const FFMPEG_COMMANDS = {
  toMp3: '-i {0} -c:a libmp3lame {1}',
  toMp4: '-i {0} -c:v libx264 {1}',
  toWebM: '-i {0} -c:v libvpx {1}',
};
