import {
  ELIGIBLE_TARGET_FORMATS,
  FFMPEG_FORMATS,
} from "@/data/config/ffmpeg-config";
import { FFmpegFormat } from "@/types/ffmpeg";
import { VideoFileData } from "@/types/file";
import { find, isEmpty, map, merge } from "lodash-es";
import { getFileExtension } from "./commonUtils";

export const updateFileState = ({
  updatedVideoFileData,
  setFileList,
}: Readonly<{
  updatedVideoFileData: VideoFileData;
  setFileList: React.Dispatch<React.SetStateAction<VideoFileData[]>>;
}>) => {
  setFileList((prevList) => {
    return map(prevList, (fileData) => {
      if (fileData.id === updatedVideoFileData.id) {
        return merge({}, fileData, updatedVideoFileData);
      }
      return fileData;
    });
  });
};

export function getOutputFileName({
  fileName,
  targetFormatid,
}: Readonly<{ fileName: string; targetFormatid: number }>): string {
  return `output_${fileName.substring(0, fileName.lastIndexOf("."))}.${
    FFMPEG_FORMATS.get(targetFormatid)!.targetFormat
  }`;
}

export function getFileFormatId(fileExtension: string): number {
  return (
    find(
      Array.from(FFMPEG_FORMATS.entries()),
      ([, format]) => format.targetFormat === fileExtension
    )?.[0] ?? 6
  );
}

export function getEligibleFormatIds(
  fileName: string,
  formatTypeFilter?: "Audio" | "Video"
): number[] | undefined {
  const fileExtension = getFileExtension(fileName);
  const fileFormatId = getFileFormatId(fileExtension!);
  const fileFormat = FFMPEG_FORMATS.get(fileFormatId) as FFmpegFormat;
  const eligibleFormats = ELIGIBLE_TARGET_FORMATS.get(fileFormat.targetFormat);

  if (isEmpty(formatTypeFilter)) {
    return eligibleFormats;
  }

  return eligibleFormats?.filter((formatId) => {
    const format = FFMPEG_FORMATS.get(formatId) as FFmpegFormat;
    return format.displayName.includes(formatTypeFilter!);
  });
}

export function getMimeType(targetFormat: number) {
  const targetFormatName: string =
    FFMPEG_FORMATS.get(targetFormat)!.targetFormat;
  if (targetFormatName === "mp4" || targetFormatName === "webm") {
    return `video/${targetFormatName}`;
  }
  return `audio/${targetFormatName}`;
}
