export interface FileData {
  id: string;
  file: File;
  isCompressed: boolean;
  compressProgress: number;
  inProgress: boolean;
  type: FileDataType;
  name: string;
  isValid: boolean;
  compressedData?: Blob;
  compressOptions: any;
  error?: string;
  compressionRate: number;
  maxFileSize: number;
}

export interface ImageCompressSettings {
  fileId: string;
  compressionRate: number;
  maxFileSize: number;
}

export enum FileDataType {
  IMAGE = 'image',
}
