export enum FFMpegMediaFormatType {
  VIDEO = 'video',
  AUDIO = 'audio',
}

export interface FFMpegMediaFormatConfig {
  displayName: string;
  command: string;
  targetFormat: string;
}

export interface FFMpegOutputConfig {
  audio: FFMpegMediaFormatConfig[];
  video: FFMpegMediaFormatConfig[];
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
  targetFormat: string;
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
