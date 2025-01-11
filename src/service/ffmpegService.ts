import { FFMPEG_COMMANDS } from "@/data/config/ffmpeg-config";
import { ConversionState, VideoFileData } from "@/types/file";
import { updateFileState } from "@/util/videoConverterUtils";
import { FFmpeg, FileData } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export const createFFmpegInstance = async () => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
  const ffmpeg = new FFmpeg();

  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  return ffmpeg;
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

export const writeFFmpegFile = async ({
  ffmpeg,
  fileData,
  fileName,
}: Readonly<{
  ffmpeg: FFmpeg;
  fileData: FileData;
  fileName: string;
}>) => {
  // Load the file into ffmpeg
  return ffmpeg.writeFile(fileName, fileData);
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

export const deleteFFmpegFile = async ({
  ffmpeg,
  fileName,
}: Readonly<{
  ffmpeg: FFmpeg;
  fileName: string;
}>) => {
  return ffmpeg.deleteFile(fileName);
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
  setIsSnackBarOpen,
  setSnackBarMessage,
  setSnackBarColor,
}: Readonly<{
  videoFileData: VideoFileData;
  setFileList: React.Dispatch<React.SetStateAction<VideoFileData[]>>;
  setIsSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarColor: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
}>) {
  const targetFormatId = videoFileData.selectedTargetFormatId;

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.INITIALISING_FFMPEG;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  const formattedFileName = videoFileData.formattedFileName;
  const outputFileName =
    videoFileData.convertedData[targetFormatId]!.outputFileName;

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

  const fileDataFromDisk = await fetchFile(videoFileData.originalFile);

  /**
   * Write the file to ffmpeg
   */
  await writeFFmpegFile({
    ffmpeg,
    fileData: fileDataFromDisk,
    fileName: formattedFileName,
  });

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.IN_PROGRESS;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  console.log(`executing ffmpeg command: `, {
    ffmpegCommand,
  });

  ffmpeg.on("progress", ({ progress }) => {
    const translatedProgress: number = Number((progress * 100).toFixed(2));
    if (translatedProgress === 100) {
      getFFmpegFile({
        ffmpeg,
        fileName: outputFileName,
      }).then(async (fileData) => {
        videoFileData.convertedData[targetFormatId]!.conversionState =
          ConversionState.CONVERTED;
        videoFileData.convertedData[targetFormatId]!.isConverted = true;
        videoFileData.convertedData[targetFormatId]!.conversionProgress = 100;
        videoFileData.convertedData[targetFormatId]!.data = <Uint8Array>(
          fileData
        );

        await deleteFFmpegFile({ ffmpeg, fileName: formattedFileName });

        setSnackBarMessage(`${videoFileData.originalFile.name} converted!`);
        setSnackBarColor("success");
        setIsSnackBarOpen(true);

        updateFileState({
          updatedVideoFileData: videoFileData,
          setFileList,
        });
      });
    }
  });

  // ffmpeg.on("log", ({ message, type }) => {
  //   console.log(`${type}: ${message}`);
  // });

  /**
   * Execute the ffmpeg command
   */
  await executeFFmpegCommand({ ffmpeg, command: ffmpegCommand });
}
