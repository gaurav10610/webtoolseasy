export interface BaseFileData {
  id: string;
  originalFile: File;
}

export interface ConvertedFileData {
  data?: Blob;
  formatName: string;
  formatId: number;
  isConverted: boolean;
  conversionProgress: number;
  error?: unknown;
}

export interface VideoFileData extends BaseFileData {
  convertedData: Record<number, ConvertedFileData>;
  formatId: number;
  formatName: string;
  selectedTargetFormatId: number;
}
