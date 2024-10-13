export interface FFmpegFormat {
  displayName: string;
  targetFormat: string;
}

export enum ConvertEventType {
  START = 1,
  END = 2,
  FAILED = 3,
}

export interface FFMpegBaseFileEvent {
  fileId: string;
}

export interface ConvertEvent extends FFMpegBaseFileEvent {
  type: ConvertEventType;
  fileData?: Uint8Array;
  targetFormat: number;
}

export interface ConvertProgressEvent extends FFMpegBaseFileEvent {
  progress: number;
}

export interface FFMpegLoadingStatus extends FFMpegBaseFileEvent {
  status: string;
}

export interface FileLoadedEvent extends FFMpegBaseFileEvent {
  loaded: boolean;
}

export interface ConvertLogEvent {
  type: string;
  message: string;
}
