import { FFMPEG_COMMANDS } from "@/data/config/ffmpeg-config";
import { ConversionState, VideoFileData } from "@/types/file";
import { getOutputFileName, updateFileState } from "@/util/videoConverterUtils";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export const createFFmpegInstance = async () => {
  const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";
  const ffmpeg = new FFmpeg();

  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    workerURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript"
    ),
  });
  return ffmpeg;
};

export const writeFFmpegFile = async ({
  ffmpeg,
  file,
  fileName,
}: Readonly<{
  ffmpeg: FFmpeg;
  file: File;
  fileName: string;
}>) => {
  // Load the file into ffmpeg
  return ffmpeg.writeFile(fileName, await fetchFile(file));
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
   * check if the default command has been overridden based on input file format
   *
   * if not then use default command
   */
  if (FFMPEG_COMMANDS.get(targetFormat)!.has(fileFormat)) {
    command = FFMPEG_COMMANDS.get(targetFormat)!.get(fileFormat)!;
  } else {
    command = FFMPEG_COMMANDS.get(targetFormat)!.get(0)!;
  }

  for (let i = 0; i < args.length; i++) {
    command = command.split(`{${i}}`).join(args[i]);
  }
  return command.split(" ");
};

export async function transcodeVideo({
  videoFileData,
  setFileList,
}: Readonly<{
  videoFileData: VideoFileData;
  setFileList: React.Dispatch<React.SetStateAction<VideoFileData[]>>;
}>) {
  const targetFormatId = videoFileData.selectedTargetFormatId;

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.INITIALISING_FFMPEG;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  const formattedFileName = videoFileData.fomattedFileName;
  const outputFileName = getOutputFileName({
    fileName: formattedFileName,
    targetFormatid: videoFileData.selectedTargetFormatId,
  });

  const ffmpegCommand: string[] = buildFFMpegCommand({
    fileFormat: videoFileData.formatId,
    targetFormat: videoFileData.selectedTargetFormatId,
    args: [formattedFileName, outputFileName],
  });

  const ffmpeg = await createFFmpegInstance();

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.FILE_LOADING;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  /**
   * Write the file to ffmpeg
   */
  await writeFFmpegFile({
    ffmpeg,
    file: videoFileData.originalFile,
    fileName: formattedFileName,
  });

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.IN_PROGRESS;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  console.log(`executing ffmpeg command: ${ffmpegCommand.join(" ")}`);

  ffmpeg.on("progress", ({ progress }) => {
    const translatedProgress: number = Number((progress * 100).toFixed(2));
    console.log(`progress: ${translatedProgress}`);
    // videoFileData.convertedData[targetFormatId].conversionProgress = progress;
    // updateFileState({
    //   updatedVideoFileData: videoFileData,
    //   setFileList,
    // });
  });

  ffmpeg.on("log", ({ message, type }) => {
    console.log(`${type}: ${message}`);
    if (type === "stderr") {
      videoFileData.convertedData[targetFormatId]!.conversionState =
        ConversionState.FAILED;
      updateFileState({
        updatedVideoFileData: videoFileData,
        setFileList,
      });
    }
  });

  /**
   * Execute the ffmpeg command
   */
  await executeFFmpegCommand({ ffmpeg, command: ffmpegCommand });
}
