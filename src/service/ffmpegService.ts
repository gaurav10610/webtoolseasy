import { FFMPEG_COMMANDS } from "@/data/config/ffmpeg-config";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { get, split } from "lodash-es";

export const writeFFmpegFile = async ({
  ffmpeg,
  file,
}: Readonly<{
  ffmpeg: FFmpeg;
  file: File;
}>) => {
  // Load the file into ffmpeg
  return ffmpeg.writeFile(file.name, await fetchFile(file));
};

export const executeFFmpegCommand = async ({
  ffmpeg,
  command,
}: Readonly<{
  ffmpeg: FFmpeg;
  command: string[];
}>) => {
  // Run the command
  return ffmpeg.exec(command);
};

export const getFFmpegFile = async ({
  ffmpeg,
  fileName,
}: Readonly<{
  ffmpeg: FFmpeg;
  fileName: string;
}>) => {
  return ffmpeg.readFile(fileName);
};

export const buildFFMpegCommand = ({
  fileFormat,
  targetFormat,
  args,
}: Readonly<{
  fileFormat: number;
  targetFormat: number;
  args: string[];
}>) => {
  let command: string;

  /**
   * Check if the default command has been overridden based on input file format
   *
   * If not, then use the default command
   */
  const formatCommands = FFMPEG_COMMANDS.get(targetFormat);
  command = get(formatCommands, fileFormat, get(formatCommands, 0));

  args.forEach((arg, index) => {
    command = split(command, `{${index}}`).join(arg);
  });

  return split(command, " ");
};
