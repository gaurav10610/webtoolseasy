export type ConnectionStatus =
  | "disconnected"
  | "connecting_signaling"
  | "in_room"
  | "connecting_peer"
  | "connected"
  | "error";

export interface PeerInfo {
  peerId: string;
  deviceName?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  file?: File;
  status: "pending" | "transferring" | "completed" | "error" | "cancelled";
  direction: "outgoing" | "incoming";
  bytesTransferred: number;
  progress: number; // 0 to 100
  speedBytesPerSec: number;
  etaSeconds: number;
  downloadUrl?: string;
  error?: string;
}

export interface SignalingMessage {
  type: "welcome" | "peer_joined" | "peer_left" | "peer_updated" | "signal" | "pong" | "join" | "leave" | "ping";
  peerId?: string;
  fromPeerId?: string;
  targetPeerId?: string;
  roomId?: string;
  peers?: Array<{ peerId: string; metadata?: Record<string, unknown> }>;
  metadata?: Record<string, unknown>;
  data?: unknown;
}

export interface DataChannelMessage {
  type: "file_meta" | "file_complete" | "file_cancel" | "chat" | "ping";
  fileId?: string;
  name?: string;
  size?: number;
  mimeType?: string;
  totalChunks?: number;
  text?: string;
}
