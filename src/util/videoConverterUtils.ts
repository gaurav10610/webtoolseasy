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
  // Normalize the extension to lowercase
  const ext = fileExtension.toLowerCase();

  // Find the format that matches the extension
  const found = find(
    Array.from(FFMPEG_FORMATS.entries()),
    ([, format]) => format.targetFormat === ext
  );

  if (found) {
    return found[0];
  }

  // If not found, default based on common video extensions
  switch (ext) {
    case "mp4":
      return 5; // MP4 x264 format
    case "webm":
      return 7; // WEBM format
    case "avi":
      return 10; // AVI format
    case "mkv":
      return 9; // MKV format
    case "mov":
      return 12; // MOV format
    case "m4v":
      return 13; // M4V format
    case "flv":
      return 14; // FLV format
    case "wmv":
      return 15; // WMV format
    case "3gp":
      return 16; // 3GP format
    default:
      return 5; // Default to MP4 x264
  }
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
