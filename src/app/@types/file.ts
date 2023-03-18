export interface BaseFileData {
  id: string;
  file: File;
  inProgress: boolean;
  type: FileDataType;
  name: string;
  isValid: boolean;
  error?: string;
}

export interface ImageFileData extends BaseFileData {
  isCompressed: boolean;
  compressProgress: number;
  compressedData?: Blob;
  compressOptions: any;
  compressionRate: number;
  maxFileSize: number;
}

export interface VideoFileData extends BaseFileData {
  convertProgress: number;
  targetFormat: string;
  isConverted: boolean;
  convertedFileData?: Blob;
  isLoaded: boolean;
}

export interface ImageCompressSettings {
  fileId: string;
  compressionRate: number;
  maxFileSize: number;
}

export enum FileDataType {
  IMAGE = 'image',
  VIDEO = 'video',
}
