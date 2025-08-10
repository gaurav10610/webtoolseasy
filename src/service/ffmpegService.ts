import { FFMPEG_COMMANDS } from "@/data/config/ffmpeg-config";
import { ConversionState, VideoFileData } from "@/types/file";
import { updateFileState } from "@/util/videoConverterUtils";
import { FFmpeg, FileData } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const createFFmpegInstance = async () => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
  const ffmpeg = new FFmpeg();

  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  // Log initialization
  ffmpeg.on("log", ({ type, message }) => {
    if (type === "error") {
      console.error("FFmpeg error:", message);
    }
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
  const targetCommands = FFMPEG_COMMANDS.get(targetFormat);
  if (!targetCommands) {
    console.error(`No commands found for target format ${targetFormat}`);
    throw new Error(`Unsupported target format: ${targetFormat}`);
  }

  if (targetCommands.has(fileFormat)) {
    command = targetCommands.get(fileFormat)!;
  } else {
    command = targetCommands.get(0)!;
  }

  if (!command) {
    console.error(
      `No command found for fileFormat ${fileFormat} -> targetFormat ${targetFormat}`
    );
    throw new Error(`Unsupported conversion: ${fileFormat} -> ${targetFormat}`);
  }

  console.log(`Building FFmpeg command: ${command} with args:`, args);

  for (let i = 0; i < args.length; i++) {
    command = command.split(`{${i}}`).join(args[i]);
  }

  const finalCommand = command.split(" ");
  console.log(`Final FFmpeg command:`, finalCommand);

  return finalCommand;
};

export const validateFileSize = (file: File) => {
  const fileSizeInMB = file.size / (1024 * 1024);
  // Reduce max file size to 100MB to prevent memory issues
  return fileSizeInMB <= 100;
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
  const fileSizeValid = validateFileSize(videoFileData.originalFile);

  if (!fileSizeValid) {
    setSnackBarMessage(
      `File size should be less than 100MB. File: ${videoFileData.originalFile.name}`
    );
    setSnackBarColor("error");
    setIsSnackBarOpen(true);
    return;
  }

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

  // Enhanced debugging for WebM files
  if (videoFileData.originalFile.name.toLowerCase().includes("webm")) {
    console.log("🔍 WebM FFmpeg Command Debug:", {
      fileName: videoFileData.originalFile.name,
      inputFormatId: videoFileData.formatId,
      targetFormatId: videoFileData.selectedTargetFormatId,
      formattedFileName,
      outputFileName,
      generatedCommand: ffmpegCommand,
    });
  }

  const ffmpeg = await createFFmpegInstance();

  videoFileData.convertedData[targetFormatId]!.conversionState =
    ConversionState.FILE_LOADING;

  updateFileState({
    updatedVideoFileData: videoFileData,
    setFileList,
  });

  try {
    // Read file directly as ArrayBuffer to avoid memory fragmentation
    console.log(
      `Reading file: ${videoFileData.originalFile.name}, size: ${(
        videoFileData.originalFile.size /
        (1024 * 1024)
      ).toFixed(2)}MB`
    );

    const fileArrayBuffer = await videoFileData.originalFile.arrayBuffer();
    const fileData = new Uint8Array(fileArrayBuffer);

    console.log(`File loaded into memory, writing to FFmpeg...`);

    /**
     * Write the file to ffmpeg
     */
    await writeFFmpegFile({
      ffmpeg,
      fileData: fileData,
      fileName: formattedFileName,
    });

    console.log(`File written to FFmpeg successfully`);
  } catch (error) {
    console.error("Failed to read file:", error);
    videoFileData.convertedData[targetFormatId]!.conversionState =
      ConversionState.FAILED;
    setSnackBarMessage(
      `Failed to read file: ${videoFileData.originalFile.name}. Error: ${error}`
    );
    setSnackBarColor("error");
    setIsSnackBarOpen(true);
    updateFileState({
      updatedVideoFileData: videoFileData,
      setFileList,
    });
    return;
  }

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
    console.log(`progress: ${translatedProgress}`);
    if (translatedProgress === 100) {
      videoFileData.convertedData[targetFormatId]!.conversionState =
        ConversionState.FILE_READING;
      updateFileState({
        updatedVideoFileData: videoFileData,
        setFileList,
      });

      getFFmpegFile({
        ffmpeg,
        fileName: outputFileName,
      })
        .then(async (fileData) => {
          videoFileData.convertedData[targetFormatId]!.conversionState =
            ConversionState.CONVERTED;
          videoFileData.convertedData[targetFormatId]!.isConverted = true;
          videoFileData.convertedData[targetFormatId]!.conversionProgress = 100;
          videoFileData.convertedData[targetFormatId]!.data = <Uint8Array>(
            fileData
          );

          // Clean up files from FFmpeg memory
          try {
            await deleteFFmpegFile({ ffmpeg, fileName: formattedFileName });
            await deleteFFmpegFile({ ffmpeg, fileName: outputFileName });
          } catch (cleanupError) {
            console.warn("File cleanup warning:", cleanupError);
          }

          // Terminate FFmpeg instance to free memory
          try {
            ffmpeg.terminate();
          } catch (terminateError) {
            console.warn("FFmpeg termination warning:", terminateError);
          }

          setSnackBarMessage(`${videoFileData.originalFile.name} converted!`);
          setSnackBarColor("success");
          setIsSnackBarOpen(true);

          updateFileState({
            updatedVideoFileData: videoFileData,
            setFileList,
          });
        })
        .catch((error) => {
          console.error("Failed to read output file:", error);
          videoFileData.convertedData[targetFormatId]!.conversionState =
            ConversionState.FAILED;
          setSnackBarMessage(
            `Failed to read converted file: ${videoFileData.originalFile.name}`
          );
          setSnackBarColor("error");
          setIsSnackBarOpen(true);

          // Clean up on error
          try {
            deleteFFmpegFile({ ffmpeg, fileName: formattedFileName }).catch(
              console.warn
            );
            deleteFFmpegFile({ ffmpeg, fileName: outputFileName }).catch(
              console.warn
            );
            ffmpeg.terminate();
          } catch (cleanupError) {
            console.warn("Error cleanup warning:", cleanupError);
          }

          updateFileState({
            updatedVideoFileData: videoFileData,
            setFileList,
          });
        });
    } else {
      videoFileData.convertedData[targetFormatId]!.conversionProgress =
        translatedProgress;
      updateFileState({
        updatedVideoFileData: videoFileData,
        setFileList,
      });
    }
  });

  /**
   * Execute the ffmpeg command
   */
  try {
    await executeFFmpegCommand({ ffmpeg, command: ffmpegCommand });
  } catch (error) {
    console.error("FFmpeg execution failed:", error);
    videoFileData.convertedData[targetFormatId]!.conversionState =
      ConversionState.FAILED;
    setSnackBarMessage(
      `Conversion failed for ${videoFileData.originalFile.name}: ${error}`
    );
    setSnackBarColor("error");
    setIsSnackBarOpen(true);

    // Clean up on FFmpeg execution error
    try {
      deleteFFmpegFile({ ffmpeg, fileName: formattedFileName }).catch(
        console.warn
      );
      deleteFFmpegFile({ ffmpeg, fileName: outputFileName }).catch(
        console.warn
      );
      ffmpeg.terminate();
    } catch (cleanupError) {
      console.warn("FFmpeg error cleanup warning:", cleanupError);
    }

    updateFileState({
      updatedVideoFileData: videoFileData,
      setFileList,
    });
  }
}
