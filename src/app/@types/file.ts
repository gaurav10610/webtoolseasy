export interface BaseFileData {
  id: string;
  file: File;
  inProgress?: boolean;
  type: FileDataType;
  name: string;
  error?: string;
  fileFormat?: number; // file format identifier
  dataURI?: any;
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
  targetFormat: number;
  convertedFileData: Map<number, Uint8Array | undefined>;
  targetFileName?: string;
  conversionErrors: Map<number, string>;
  converterStatus?: string;
  supportedFormats: SupportedOutputFormats[];
}

export interface SupportedOutputFormats {
  formatId: number;
  targetFormat: string;
  displayName: string;
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
