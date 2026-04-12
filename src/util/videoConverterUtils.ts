import {
  AUDIO_FORMAT_MAP,
  AUDIO_FORMAT_LIST,
  INPUT_FORMAT_ID,
} from "@/data/config/audio-config";
import { VideoFileData } from "@/types/file";
import { map, merge } from "lodash-es";
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
  const format = AUDIO_FORMAT_MAP.get(targetFormatid);
  const ext = format?.ext ?? "wav";
  return `output_${fileName.substring(0, fileName.lastIndexOf("."))}.${ext}`;
}

export function getFileFormatId(fileExtension: string): number {
  const ext = fileExtension.toLowerCase();
  return INPUT_FORMAT_ID[ext] ?? 3; // default to Opus/WebM
}

/** Returns all audio format IDs as eligible targets (audio-only converter) */
export function getEligibleFormatIds(
  _fileName: string,
  _formatTypeFilter?: "Audio" | "Video",
): number[] {
  // All formats are audio-only in the native converter
  return AUDIO_FORMAT_LIST.map((f) => f.id);
}

export function getMimeType(targetFormat: number): string {
  return AUDIO_FORMAT_MAP.get(targetFormat)?.mimeType ?? "audio/wav";
}
