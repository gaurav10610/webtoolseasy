export enum FFMpegCommandType {
  TO_MP3 = 'toMp3',
  TO_MP4 = 'toMp4',
  TO_WEBM = 'toWebM',
}

export enum ConvertEventType {
  START = 1,
  END = 2,
}

export interface FFMpegBaseFileEvent {
  fileId: string;
}

export interface ConvertEvent extends FFMpegBaseFileEvent {
  type: ConvertEventType;
}

export interface ConvertProgressEvent extends FFMpegBaseFileEvent {
  progress: number;
}

export interface FileLoadedEvent extends FFMpegBaseFileEvent {
  loaded: boolean;
}

export interface ConvertLogEvent {
  type: string;
  message: string;
}
