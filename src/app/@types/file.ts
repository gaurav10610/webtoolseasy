export interface FileData {
  file: File;
  isCompressed: boolean;
  compressProgress: number;
  inProgress: boolean;
  type: FileDataType;
  name: string;
  isValid: boolean;
  compressedData?: Blob;
  compressOptions: any;
  oldSize: string;
  compressedSize?: string;
  error?: string;
}

export enum FileDataType {
  IMAGE = 'image',
}
