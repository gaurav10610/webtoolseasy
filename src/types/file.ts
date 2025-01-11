export interface BaseFileData {
  id: string;
  originalFile: File;
}

export enum ConversionState {
  NOT_CONVERTED = "NOT_CONVERTED",
  INITIALISING_FFMPEG = "INITIALISING_FFMPEG",
  FILE_LOADING = "FILE_LOADING",
  IN_PROGRESS = "IN_PROGRESS",
  FILE_READING = "FILE_READING",
  FAILED = "FAILED",
  CONVERT_ERROR = "CONVERT_ERROR",
  CONVERTED = "CONVERTED",
}

export interface ConvertedFileData {
  data?: Uint8Array;
  formatName: string;
  formatId: number;
  conversionState: ConversionState;
  isConverted: boolean;
  conversionProgress: number;
  error?: unknown;
}

export interface VideoFileData extends BaseFileData {
  convertedData: Record<number, ConvertedFileData>;
  formattedFileName: string;
  outputFileName: string;
  formatId: number;
  formatName: string;
  selectedTargetFormatId: number;
}
