export interface BaseFileData {
  id: string;
  originalFile: File;
}

export enum ConversionState {
  NOT_CONVERTED = "Not Converted",
  INITIALISING_FFMPEG = "Initialising Coverter...",
  FILE_LOADING = "Loading File...",
  IN_PROGRESS = "Conversion In Progress...",
  FILE_READING = "Preparing File...",
  FAILED = "Conversion Failed",
  CONVERT_ERROR = "Conversion Error",
  CONVERTED = "Converted Successfully",
}

export interface ConvertedFileData {
  data?: Uint8Array;
  outputFileName: string;
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
  formatId: number;
  formatName: string;
  selectedTargetFormatId: number;
}
