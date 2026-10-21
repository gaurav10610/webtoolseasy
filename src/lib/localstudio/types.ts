export interface VideoMetadata {
  name: string;
  size: number;
  type: string;
  duration: number; // in seconds
  width: number;
  height: number;
  aspectRatio: string;
}

export interface TrimRange {
  start: number; // in seconds
  end: number; // in seconds
}

export type StudioToolTab = "video_cutter" | "audio_extractor" | "audio_recorder";
