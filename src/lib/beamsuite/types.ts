export type BeamRole = "sender" | "receiver";
export type CaptureSource = "camera" | "screen" | "audio_only";
export type StreamQuality = "1080p60" | "1080p30" | "720p60" | "720p30" | "480p";

export type BeamStatus =
  | "disconnected"
  | "connecting_signaling"
  | "in_room"
  | "connecting_peer"
  | "streaming"
  | "error";

export interface BeamPeerMetadata {
  peerId: string;
  role: BeamRole;
  source?: CaptureSource;
  deviceName?: string;
  isMobile?: boolean;
}

export interface BeamControlMessage {
  type: "tally" | "quality_change" | "mute_toggle" | "ping";
  onAir?: boolean;
  quality?: StreamQuality;
  muted?: boolean;
}
