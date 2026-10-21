import { ConnectionStatus, FileItem, PeerInfo, SignalingMessage, DataChannelMessage } from "./types";

const CHUNK_SIZE = 64 * 1024; // 64 KB
const MAX_BUFFERED_AMOUNT = 4 * 1024 * 1024; // 4 MB threshold for backpressure
const BUFFER_LOW_THRESHOLD = 512 * 1024; // 512 KB threshold to resume sending

const DEFAULT_SIGNALING_URL =
  process.env.NEXT_PUBLIC_SIGNALING_URL || "wss://webtoolseasy-signaling.gaurav10610.workers.dev";

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

export interface DropStreamCallbacks {
  onStatusChange?: (status: ConnectionStatus) => void;
  onRoomJoined?: (roomId: string, peerId: string) => void;
  onPeerConnected?: (peer: PeerInfo) => void;
  onPeerDisconnected?: (peerId: string) => void;
  onFileQueueUpdated?: (files: FileItem[]) => void;
  onChatMessage?: (message: { from: string; text: string; timestamp: number }) => void;
  onError?: (error: string) => void;
}

export class DropStreamClient {
  private ws: WebSocket | null = null;
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;

  public roomId: string = "";
  public peerId: string = "";
  public remotePeer: PeerInfo | null = null;
  public status: ConnectionStatus = "disconnected";

  private files: Map<string, FileItem> = new Map();
  private callbacks: DropStreamCallbacks = {};
  private pingInterval: number | null = null;

  // Receiving state
  private currentIncomingFile: FileItem | null = null;
  private incomingChunks: ArrayBuffer[] = [];
  private incomingTotalChunks: number = 0;
  private incomingChunkCount: number = 0;
  private lastSpeedCalculationTime: number = 0;
  private bytesTransferredSinceLastCheck: number = 0;

  constructor(callbacks?: DropStreamCallbacks) {
    if (callbacks) {
      this.callbacks = callbacks;
    }
  }

  public setCallbacks(callbacks: DropStreamCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  private setStatus(newStatus: ConnectionStatus): void {
    this.status = newStatus;
    this.callbacks.onStatusChange?.(newStatus);
  }

  private notifyQueueUpdate(): void {
    this.callbacks.onFileQueueUpdated?.(Array.from(this.files.values()));
  }

  // Connect to Signaling Room
  public async joinRoom(roomId: string, customPeerId?: string): Promise<void> {
    this.roomId = roomId.toUpperCase().trim();
    this.setStatus("connecting_signaling");

    const deviceMetadata = this.getDeviceMetadata();
    const wsUrl = `${DEFAULT_SIGNALING_URL}/room/${this.roomId}${
      customPeerId ? `?peerId=${encodeURIComponent(customPeerId)}` : ""
    }`;

    try {
      this.ws = new WebSocket(wsUrl);
    } catch (err) {
      this.setStatus("error");
      this.callbacks.onError?.(`Failed to connect to signaling server: ${err}`);
      return;
    }

    this.ws.onopen = () => {
      // Send initial metadata
      this.sendSignaling({
        type: "join",
        metadata: deviceMetadata as unknown as Record<string, unknown>,
      });
      this.startHeartbeat();
    };

    this.ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data) as SignalingMessage;
        await this.handleSignalingMessage(msg);
      } catch (e) {
        console.error("Signaling message error", e);
      }
    };

    this.ws.onerror = () => {
      this.setStatus("error");
      this.callbacks.onError?.("Signaling connection error.");
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      if (this.status !== "connected") {
        this.setStatus("disconnected");
      }
    };
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 25000);
  }

  private stopHeartbeat(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private sendSignaling(msg: SignalingMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  private async handleSignalingMessage(msg: SignalingMessage): Promise<void> {
    switch (msg.type) {
      case "welcome":
        this.peerId = msg.peerId || "";
        this.setStatus("in_room");
        this.callbacks.onRoomJoined?.(this.roomId, this.peerId);

        // If another peer is already in this room, initiate connection as caller
        if (msg.peers && msg.peers.length > 0) {
          const peer = msg.peers[0];
          this.remotePeer = {
            peerId: peer.peerId,
            ...(peer.metadata || {}),
          };
          this.callbacks.onPeerConnected?.(this.remotePeer);
          await this.initiatePeerConnection(peer.peerId, true);
        }
        break;

      case "peer_joined":
        if (msg.peerId && msg.peerId !== this.peerId) {
          this.remotePeer = {
            peerId: msg.peerId,
            ...(msg.metadata || {}),
          };
          this.callbacks.onPeerConnected?.(this.remotePeer);
          // Wait for incoming offer or negotiate
        }
        break;

      case "peer_updated":
        if (this.remotePeer && msg.peerId === this.remotePeer.peerId) {
          this.remotePeer = {
            ...this.remotePeer,
            ...(msg.metadata || {}),
          };
          this.callbacks.onPeerConnected?.(this.remotePeer);
        }
        break;

      case "peer_left":
        if (this.remotePeer && msg.peerId === this.remotePeer.peerId) {
          this.callbacks.onPeerDisconnected?.(msg.peerId);
          this.remotePeer = null;
          this.cleanupPeerConnection();
          this.setStatus("in_room");
        }
        break;

      case "signal":
        if (msg.fromPeerId && msg.data) {
          await this.handleWebRTCSignal(msg.fromPeerId, msg.data);
        }
        break;
    }
  }

  // Setup RTCPeerConnection
  private async initiatePeerConnection(targetPeerId: string, isInitiator: boolean): Promise<void> {
    this.setStatus("connecting_peer");
    this.cleanupPeerConnection();

    this.pc = new RTCPeerConnection(RTC_CONFIG);

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignaling({
          type: "signal",
          targetPeerId,
          data: { candidate: event.candidate },
        });
      }
    };

    this.pc.onconnectionstatechange = () => {
      if (!this.pc) return;
      if (this.pc.connectionState === "connected") {
        this.setStatus("connected");
      } else if (
        this.pc.connectionState === "disconnected" ||
        this.pc.connectionState === "failed" ||
        this.pc.connectionState === "closed"
      ) {
        if (this.status === "connected") {
          this.setStatus("in_room");
        }
      }
    };

    if (isInitiator) {
      // Create DataChannel with backpressure support
      this.dc = this.pc.createDataChannel("dropstream-data", { ordered: true });
      this.setupDataChannel(this.dc);

      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      this.sendSignaling({
        type: "signal",
        targetPeerId,
        data: { sdp: this.pc.localDescription },
      });
    } else {
      this.pc.ondatachannel = (event) => {
        this.dc = event.channel;
        this.setupDataChannel(this.dc);
      };
    }
  }

  private async handleWebRTCSignal(fromPeerId: string, data: unknown): Promise<void> {
    const signalData = data as { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit };

    if (signalData.sdp) {
      if (signalData.sdp.type === "offer") {
        await this.initiatePeerConnection(fromPeerId, false);
        if (!this.pc) return;
        await this.pc.setRemoteDescription(new RTCSessionDescription(signalData.sdp));
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.sendSignaling({
          type: "signal",
          targetPeerId: fromPeerId,
          data: { sdp: this.pc.localDescription },
        });
      } else if (signalData.sdp.type === "answer") {
        if (this.pc) {
          await this.pc.setRemoteDescription(new RTCSessionDescription(signalData.sdp));
        }
      }
    } else if (signalData.candidate) {
      if (this.pc && this.pc.remoteDescription) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(signalData.candidate));
        } catch (e) {
          console.warn("Failed to add ICE candidate", e);
        }
      }
    }
  }

  private setupDataChannel(channel: RTCDataChannel): void {
    channel.binaryType = "arraybuffer";
    channel.bufferedAmountLowThreshold = BUFFER_LOW_THRESHOLD;

    channel.onopen = () => {
      this.setStatus("connected");
    };

    channel.onclose = () => {
      if (this.status === "connected") {
        this.setStatus("in_room");
      }
    };

    channel.onerror = (err) => {
      console.error("DataChannel error", err);
    };

    channel.onmessage = (event) => {
      if (typeof event.data === "string") {
        try {
          const msg = JSON.parse(event.data) as DataChannelMessage;
          this.handleDataChannelMessage(msg);
        } catch {
          // Plain text message
        }
      } else if (event.data instanceof ArrayBuffer) {
        this.handleIncomingChunk(event.data);
      }
    };
  }

  private handleDataChannelMessage(msg: DataChannelMessage): void {
    switch (msg.type) {
      case "chat":
        if (msg.text) {
          this.callbacks.onChatMessage?.({
            from: this.remotePeer?.deviceName || "Peer",
            text: msg.text,
            timestamp: Date.now(),
          });
        }
        break;

      case "file_meta":
        if (msg.fileId && msg.name && msg.size !== undefined) {
          const item: FileItem = {
            id: msg.fileId,
            name: msg.name,
            size: msg.size,
            type: msg.mimeType || "application/octet-stream",
            status: "transferring",
            direction: "incoming",
            bytesTransferred: 0,
            progress: 0,
            speedBytesPerSec: 0,
            etaSeconds: 0,
          };
          this.files.set(msg.fileId, item);
          this.currentIncomingFile = item;
          this.incomingChunks = [];
          this.incomingTotalChunks = msg.totalChunks || Math.ceil(msg.size / CHUNK_SIZE);
          this.incomingChunkCount = 0;
          this.lastSpeedCalculationTime = Date.now();
          this.bytesTransferredSinceLastCheck = 0;
          this.notifyQueueUpdate();
        }
        break;

      case "file_complete":
        if (this.currentIncomingFile && this.currentIncomingFile.id === msg.fileId) {
          const blob = new Blob(this.incomingChunks, {
            type: this.currentIncomingFile.type,
          });
          const downloadUrl = URL.createObjectURL(blob);
          this.currentIncomingFile.status = "completed";
          this.currentIncomingFile.progress = 100;
          this.currentIncomingFile.downloadUrl = downloadUrl;
          this.currentIncomingFile.bytesTransferred = this.currentIncomingFile.size;
          this.currentIncomingFile.speedBytesPerSec = 0;
          this.currentIncomingFile.etaSeconds = 0;
          this.notifyQueueUpdate();

          // Auto-trigger download
          this.triggerDownload(downloadUrl, this.currentIncomingFile.name);

          // Reset incoming state
          this.currentIncomingFile = null;
          this.incomingChunks = [];
        }
        break;

      case "file_cancel":
        if (msg.fileId && this.files.has(msg.fileId)) {
          const f = this.files.get(msg.fileId)!;
          f.status = "cancelled";
          this.notifyQueueUpdate();
          if (this.currentIncomingFile?.id === msg.fileId) {
            this.currentIncomingFile = null;
            this.incomingChunks = [];
          }
        }
        break;
    }
  }

  private handleIncomingChunk(chunk: ArrayBuffer): void {
    if (!this.currentIncomingFile) return;

    this.incomingChunks.push(chunk);
    this.incomingChunkCount++;
    this.currentIncomingFile.bytesTransferred += chunk.byteLength;
    this.bytesTransferredSinceLastCheck += chunk.byteLength;

    const progress = Math.min(
      100,
      Math.round((this.currentIncomingFile.bytesTransferred / this.currentIncomingFile.size) * 100)
    );
    this.currentIncomingFile.progress = progress;

    // Calculate speed and ETA every 500ms
    const now = Date.now();
    const elapsed = (now - this.lastSpeedCalculationTime) / 1000;
    if (elapsed >= 0.5) {
      const speed = Math.round(this.bytesTransferredSinceLastCheck / elapsed);
      this.currentIncomingFile.speedBytesPerSec = speed;
      const remainingBytes = this.currentIncomingFile.size - this.currentIncomingFile.bytesTransferred;
      this.currentIncomingFile.etaSeconds = speed > 0 ? Math.round(remainingBytes / speed) : 0;
      this.lastSpeedCalculationTime = now;
      this.bytesTransferredSinceLastCheck = 0;
      this.notifyQueueUpdate();
    }
  }

  // Trigger browser file download
  private triggerDownload(url: string, filename: string): void {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("Auto-download failed", e);
    }
  }

  // Send a File over WebRTC DataChannel with Adaptive Backpressure
  public async sendFile(file: File): Promise<void> {
    if (!this.dc || this.dc.readyState !== "open") {
      this.callbacks.onError?.("No active peer connection to send file.");
      return;
    }

    const fileId = crypto.randomUUID();
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    const item: FileItem = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      lastModified: file.lastModified,
      file,
      status: "transferring",
      direction: "outgoing",
      bytesTransferred: 0,
      progress: 0,
      speedBytesPerSec: 0,
      etaSeconds: 0,
    };

    this.files.set(fileId, item);
    this.notifyQueueUpdate();

    // 1. Send file metadata
    this.dc.send(
      JSON.stringify({
        type: "file_meta",
        fileId,
        name: file.name,
        size: file.size,
        mimeType: item.type,
        totalChunks,
      })
    );

    // 2. Stream chunks with backpressure
    let offset = 0;
    let lastTime = Date.now();
    let bytesSinceLast = 0;

    while (offset < file.size) {
      // Check cancellation
      if (item.status === "cancelled") {
        this.dc.send(JSON.stringify({ type: "file_cancel", fileId }));
        return;
      }

      // Backpressure: If buffer is full, wait for bufferedamountlow event
      if (this.dc.bufferedAmount > MAX_BUFFERED_AMOUNT) {
        await new Promise<void>((resolve) => {
          if (!this.dc) return resolve();
          const handler = () => {
            this.dc?.removeEventListener("bufferedamountlow", handler);
            resolve();
          };
          this.dc.addEventListener("bufferedamountlow", handler);
        });
      }

      const slice = file.slice(offset, offset + CHUNK_SIZE);
      const buffer = await slice.arrayBuffer();

      try {
        this.dc.send(buffer);
      } catch (err) {
        item.status = "error";
        item.error = `Send error: ${err}`;
        this.notifyQueueUpdate();
        return;
      }

      offset += buffer.byteLength;
      item.bytesTransferred = offset;
      item.progress = Math.min(100, Math.round((offset / file.size) * 100));
      bytesSinceLast += buffer.byteLength;

      const now = Date.now();
      const elapsed = (now - lastTime) / 1000;
      if (elapsed >= 0.5) {
        const speed = Math.round(bytesSinceLast / elapsed);
        item.speedBytesPerSec = speed;
        const remaining = file.size - offset;
        item.etaSeconds = speed > 0 ? Math.round(remaining / speed) : 0;
        lastTime = now;
        bytesSinceLast = 0;
        this.notifyQueueUpdate();
      }
    }

    // 3. Send file completion
    this.dc.send(
      JSON.stringify({
        type: "file_complete",
        fileId,
      })
    );

    item.status = "completed";
    item.progress = 100;
    item.speedBytesPerSec = 0;
    item.etaSeconds = 0;
    this.notifyQueueUpdate();
  }

  // Send text message (for notes, keys, or links)
  public sendChatMessage(text: string): void {
    if (this.dc?.readyState === "open" && text.trim()) {
      this.dc.send(
        JSON.stringify({
          type: "chat",
          text: text.trim(),
        })
      );
    }
  }

  public leaveRoom(): void {
    this.sendSignaling({ type: "leave" });
    this.cleanupPeerConnection();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setStatus("disconnected");
    this.remotePeer = null;
    this.files.clear();
    this.notifyQueueUpdate();
  }

  private cleanupPeerConnection(): void {
    if (this.dc) {
      try {
        this.dc.close();
      } catch {}
      this.dc = null;
    }
    if (this.pc) {
      try {
        this.pc.close();
      } catch {}
      this.pc = null;
    }
  }

  private getDeviceMetadata(): PeerInfo {
    if (typeof window === "undefined") {
      return { peerId: "server" };
    }
    const ua = navigator.userAgent;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    let os = "Desktop";
    if (/Macintosh/i.test(ua)) os = "macOS";
    else if (/Windows/i.test(ua)) os = "Windows";
    else if (/Linux/i.test(ua)) os = "Linux";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/iPhone|iPad/i.test(ua)) os = "iOS";

    let browser = "Browser";
    if (/Chrome/i.test(ua)) browser = "Chrome";
    else if (/Safari/i.test(ua)) browser = "Safari";
    else if (/Firefox/i.test(ua)) browser = "Firefox";
    else if (/Edge/i.test(ua)) browser = "Edge";

    return {
      peerId: this.peerId,
      deviceName: `${os} • ${browser}`,
      browser,
      os,
      isMobile,
    };
  }
}
