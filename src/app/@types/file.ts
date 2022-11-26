export interface FileData {
  id: string;
  file: File;
  isCompressed: boolean;
  compressProgress?: number;
  type: FileDataType;
  name: string;
  isValid: boolean;
}

export enum FileDataType {
  IMAGE = 'image',
}
