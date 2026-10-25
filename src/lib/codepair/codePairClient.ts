"use client";

/**
 * CodePair P2P WebRTC Client
 * Enables 100% Zero-Cloud, Real-Time Collaborative Pair Programming.
 * Synchronizes code deltas, cursor positions, selections, and language modes directly via RTCDataChannel.
 */

const DEFAULT_SIGNALING_URL =
  process.env.NEXT_PUBLIC_SIGNALING_SERVER ||
  "wss://webtoolseasy-signaling.gaurav10610.workers.dev";

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun.cloudflare.com:3478" },
    { urls: "stun:stun.services.mozilla.com" },
  ],
  iceCandidatePoolSize: 10,
};

export type CodePairStatus =
  | "disconnected"
  | "connecting_signaling"
  | "in_room"
  | "connecting_peer"
  | "connected"
  | "reconnecting"
  | "error";

export interface RemoteCursorState {
  peerId: string;
  username: string;
  color: string;
  line: number;
  column: number;
  selection?: {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
  } | null;
}

export type CodePairMessage =
  | { type: "HELLO"; peerId: string; username: string; color: string }
  | { type: "DOC_SYNC_REQ" }
  | { type: "DOC_SYNC_RES"; code: string; language: string; version: number }
  | { type: "CODE_CHANGE"; code: string; version: number }
  | { type: "CURSOR_MOVE"; cursor: RemoteCursorState }
  | { type: "LANG_CHANGE"; language: string };

export interface CodePairCallbacks {
  onStatusChange?: (status: CodePairStatus) => void;
  onPeerConnected?: (peer: { peerId: string; username: string; color: string }) => void;
  onPeerDisconnected?: () => void;
  onRemoteCodeChange?: (code: string, version: number) => void;
  onRemoteCursor?: (cursor: RemoteCursorState) => void;
  onRemoteLanguageChange?: (language: string) => void;
  onDocSyncRequired?: () => { code: string; language: string; version: number };
  onError?: (errorMessage: string) => void;
}

export class CodePairClient {
  public roomId: string = "";
  public peerId: string;
  public username: string;
  public userColor: string;
  public status: CodePairStatus = "disconnected";

  private ws: WebSocket | null = null;
  private pc: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private remotePeerId: string | null = null;
  private isInitiator: boolean = false;
  private candidateQueue: RTCIceCandidateInit[] = [];
  private isSettingRemoteDescription: boolean = false;
  private reconnectAttempts: number = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualLeave: boolean = false;
  private callbacks: CodePairCallbacks = {};
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    username?: string,
    userColor?: string,
    callbacks?: CodePairCallbacks
  ) {
    this.peerId = `cp_${Math.random().toString(36).substring(2, 9)}`;
    this.username = username || `Dev_${Math.floor(100 + Math.random() * 900)}`;
    this.userColor = userColor || this.getRandomColor();
    if (callbacks) {
      this.callbacks = callbacks;
    }
  }

  private getRandomColor(): string {
    const colors = [
      "#3B82F6", // Blue
      "#10B981", // Emerald
      "#8B5CF6", // Purple
      "#F59E0B", // Amber
      "#EC4899", // Pink
      "#06B6D4", // Cyan
      "#EF4444", // Red
      "#14B8A6", // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  public setCallbacks(callbacks: CodePairCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  private setStatus(status: CodePairStatus): void {
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  // Generate random room code: CP-XXXXXX
  public static generateRoomCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `CP-${code.slice(0, 3)}-${code.slice(3)}`;
  }

  public async joinRoom(roomId: string): Promise<void> {
    this.roomId = roomId.toUpperCase().trim();
    this.isManualLeave = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      try {
        this.ws.close();
      } catch {}
      this.ws = null;
    }

    this.setStatus("connecting_signaling");

    const wsUrl = `${DEFAULT_SIGNALING_URL}/room/${this.roomId}?peerId=${encodeURIComponent(
      this.peerId
    )}`;

    try {
      this.ws = new WebSocket(wsUrl);
    } catch (err) {
      this.setStatus("error");
      this.callbacks.onError?.(`Signaling connection failed: ${err}`);
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.sendSignaling({
        type: "join",
        metadata: {
          peerId: this.peerId,
          username: this.username,
          color: this.userColor,
        },
      });
      this.startHeartbeat();
    };

    this.ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data);
        await this.handleSignalingMessage(msg);
      } catch (err) {
        console.error("[CodePair Signaling Error]", err);
      }
    };

    this.ws.onerror = (err) => {
      if (!this.isManualLeave) {
        console.warn("[CodePair WS Error]", err);
      }
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      if (this.isManualLeave) {
        this.setStatus("disconnected");
        return;
      }
      if (this.dataChannel && this.dataChannel.readyState === "open") {
        console.warn("[CodePair] WS closed but DataChannel is open. Attempting background reconnect...");
      } else {
        this.setStatus("reconnecting");
      }
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect(): void {
    if (this.isManualLeave || !this.roomId) return;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.reconnectAttempts >= 8) {
      console.warn("[CodePair] Max reconnect attempts reached.");
      this.setStatus("error");
      return;
    }
    const delay = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 8000);
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => {
      if (!this.isManualLeave && this.roomId) {
        console.log(`[CodePair] Reconnecting to room ${this.roomId} (attempt ${this.reconnectAttempts})...`);
        this.joinRoom(this.roomId);
      }
    }, delay);
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      this.sendSignaling({ type: "ping" });
    }, 20000);
  }

  private stopHeartbeat(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private sendSignaling(msg: Record<string, unknown>): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  private async handleSignalingMessage(msg: Record<string, unknown>): Promise<void> {
    switch (msg.type) {
      case "welcome": {
        if (msg.peerId) {
          this.peerId = msg.peerId as string;
        }
        this.setStatus("in_room");
        const peers = (msg.peers as Array<{ peerId: string }>) || [];
        if (peers.length > 0) {
          // A peer is already waiting in this room: initiate WebRTC connection
          this.remotePeerId = peers[0].peerId;
          this.isInitiator = true;
          this.setStatus("connecting_peer");
          await this.initPeerConnection(true);
        }
        break;
      }

      case "peer_joined": {
        const newPeerId = msg.peerId as string;
        if (!this.remotePeerId && newPeerId !== this.peerId) {
          this.remotePeerId = newPeerId;
          this.isInitiator = false;
          this.setStatus("connecting_peer");
          await this.initPeerConnection(false);
        }
        break;
      }

      case "signal": {
        const fromPeerId = msg.fromPeerId as string;
        if (!this.remotePeerId) {
          this.remotePeerId = fromPeerId;
        }

        const data = msg.data as { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit };
        if (data.sdp) {
          if (!this.pc) {
            this.setStatus("connecting_peer");
            await this.initPeerConnection(false);
          }
          this.isSettingRemoteDescription = true;
          await this.pc!.setRemoteDescription(new RTCSessionDescription(data.sdp));
          this.isSettingRemoteDescription = false;

          // Drain queued candidates
          while (this.candidateQueue.length > 0) {
            const cand = this.candidateQueue.shift();
            if (cand && this.pc) {
              await this.pc.addIceCandidate(new RTCIceCandidate(cand));
            }
          }

          if (data.sdp.type === "offer") {
            const answer = await this.pc!.createAnswer();
            await this.pc!.setLocalDescription(answer);
            this.sendSignaling({
              type: "signal",
              fromPeerId: this.peerId,
              targetPeerId: fromPeerId,
              data: { sdp: answer },
            });
          }
        } else if (data.candidate) {
          if (this.pc && this.pc.remoteDescription && !this.isSettingRemoteDescription) {
            await this.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } else {
            this.candidateQueue.push(data.candidate);
          }
        }
        break;
      }

      case "peer_left": {
        this.handlePeerDisconnected();
        break;
      }
    }
  }

  private async initPeerConnection(isInitiator: boolean): Promise<void> {
    if (this.pc) {
      this.pc.close();
    }

    this.pc = new RTCPeerConnection(RTC_CONFIG);

    this.pc.onicecandidate = (event) => {
      if (event.candidate && this.remotePeerId) {
        this.sendSignaling({
          type: "signal",
          fromPeerId: this.peerId,
          targetPeerId: this.remotePeerId,
          data: { candidate: event.candidate.toJSON() },
        });
      }
    };

    this.pc.oniceconnectionstatechange = () => {
      if (!this.pc) return;
      if (this.pc.iceConnectionState === "failed") {
        console.warn("[CodePair WebRTC] ICE connection failed, restarting ICE...");
        try {
          this.pc.restartIce();
        } catch {}
      }
    };

    this.pc.onconnectionstatechange = () => {
      if (!this.pc) return;
      console.log(`[CodePair WebRTC] Connection state: ${this.pc.connectionState}`);
      if (this.pc.connectionState === "disconnected" || this.pc.connectionState === "failed") {
        this.handlePeerDisconnected();
      }
    };

    if (isInitiator) {
      // Create DataChannel
      this.dataChannel = this.pc.createDataChannel("codepair_sync", {
        ordered: true,
      });
      this.setupDataChannel(this.dataChannel);

      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      this.sendSignaling({
        type: "signal",
        fromPeerId: this.peerId,
        targetPeerId: this.remotePeerId!,
        data: { sdp: offer },
      });
    } else {
      this.pc.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannel(this.dataChannel);
      };
    }
  }

  private setupDataChannel(channel: RTCDataChannel): void {
    channel.onopen = () => {
      console.log("[CodePair DataChannel] OPEN! Peer-to-Peer direct link established.");
      this.setStatus("connected");

      // Send HELLO with username & color
      this.sendData({
        type: "HELLO",
        peerId: this.peerId,
        username: this.username,
        color: this.userColor,
      });

      // Request document sync if we joined an existing host
      if (this.isInitiator) {
        this.sendData({ type: "DOC_SYNC_REQ" });
      }
    };

    channel.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as CodePairMessage;
        this.handleDataMessage(msg);
      } catch (err) {
        console.error("[CodePair Data Parse Error]", err);
      }
    };

    channel.onclose = () => {
      console.log("[CodePair DataChannel] Closed.");
      this.handlePeerDisconnected();
    };

    channel.onerror = (event: Event) => {
      const errorEvent = event as RTCErrorEvent;
      const detail = errorEvent?.error?.message || "Transport closed";
      if (
        channel.readyState === "closing" ||
        channel.readyState === "closed" ||
        !this.pc ||
        this.pc.connectionState === "closed" ||
        this.pc.connectionState === "disconnected"
      ) {
        console.log(`[CodePair DataChannel] Channel closed by peer (${detail})`);
      } else {
        console.warn(`[CodePair DataChannel Warning] ${detail}`);
      }
    };
  }

  private handleDataMessage(msg: CodePairMessage): void {
    switch (msg.type) {
      case "HELLO": {
        this.callbacks.onPeerConnected?.({
          peerId: msg.peerId,
          username: msg.username,
          color: msg.color,
        });
        // Proactively send current document to newly connected peer
        const currentDoc = this.callbacks.onDocSyncRequired?.();
        if (currentDoc && currentDoc.code) {
          this.sendData({
            type: "DOC_SYNC_RES",
            code: currentDoc.code,
            language: currentDoc.language,
            version: currentDoc.version,
          });
        }
        break;
      }

      case "DOC_SYNC_REQ": {
        // Peer requested full document state
        const currentDoc = this.callbacks.onDocSyncRequired?.();
        if (currentDoc) {
          this.sendData({
            type: "DOC_SYNC_RES",
            code: currentDoc.code,
            language: currentDoc.language,
            version: currentDoc.version,
          });
        }
        break;
      }

      case "DOC_SYNC_RES": {
        this.callbacks.onRemoteLanguageChange?.(msg.language);
        this.callbacks.onRemoteCodeChange?.(msg.code, msg.version);
        break;
      }

      case "CODE_CHANGE": {
        this.callbacks.onRemoteCodeChange?.(msg.code, msg.version);
        break;
      }

      case "CURSOR_MOVE": {
        this.callbacks.onRemoteCursor?.(msg.cursor);
        break;
      }

      case "LANG_CHANGE": {
        this.callbacks.onRemoteLanguageChange?.(msg.language);
        break;
      }
    }
  }

  private handlePeerDisconnected(): void {
    this.dataChannel = null;
    this.remotePeerId = null;
    this.setStatus(this.ws && this.ws.readyState === WebSocket.OPEN ? "in_room" : "disconnected");
    this.callbacks.onPeerDisconnected?.();
  }

  public sendData(msg: CodePairMessage): void {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      try {
        this.dataChannel.send(JSON.stringify(msg));
      } catch (err) {
        console.error("[CodePair Send Error]", err);
      }
    }
  }

  public broadcastCodeChange(code: string, version: number): void {
    this.sendData({
      type: "CODE_CHANGE",
      code,
      version,
    });
  }

  public broadcastCursor(cursor: RemoteCursorState): void {
    this.sendData({
      type: "CURSOR_MOVE",
      cursor,
    });
  }

  public broadcastLanguageChange(language: string): void {
    this.sendData({
      type: "LANG_CHANGE",
      language,
    });
  }

  public leaveRoom(): void {
    this.isManualLeave = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeat();
    if (this.dataChannel) {
      try {
        this.dataChannel.close();
      } catch {}
      this.dataChannel = null;
    }
    if (this.pc) {
      try {
        this.pc.close();
      } catch {}
      this.pc = null;
    }
    if (this.ws) {
      try {
        this.sendSignaling({ type: "leave" });
        this.ws.close();
      } catch {}
      this.ws = null;
    }
    this.remotePeerId = null;
    this.setStatus("disconnected");
  }
}
