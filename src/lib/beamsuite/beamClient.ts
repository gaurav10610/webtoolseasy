import { BeamControlMessage, BeamPeerMetadata, BeamRole, BeamStatus, CaptureSource, StreamQuality } from "./types";
import { SignalingMessage } from "../dropstream/types";

const DEFAULT_SIGNALING_URL =
  process.env.NEXT_PUBLIC_SIGNALING_URL || "wss://webtoolseasy-signaling.gaurav10610.workers.dev";

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

export interface BeamClientCallbacks {
  onStatusChange?: (status: BeamStatus) => void;
  onRoomJoined?: (roomId: string, peerId: string) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onTallyChange?: (onAir: boolean) => void;
  onError?: (err: string) => void;
}

export class BeamClient {
  private ws: WebSocket | null = null;
  private pc: RTCPeerConnection | null = null;
  private controlDc: RTCDataChannel | null = null;

  public roomId: string = "";
  public peerId: string = "";
  public role: BeamRole = "sender";
  public status: BeamStatus = "disconnected";

  public localStream: MediaStream | null = null;
  public remoteStream: MediaStream | null = null;

  private currentFacingMode: "user" | "environment" = "environment";
  private isTorchOn: boolean = false;
  private isAudioMuted: boolean = false;
  private isOnAir: boolean = false;

  private callbacks: BeamClientCallbacks = {};
  private candidateQueue: RTCIceCandidateInit[] = [];
  private pingInterval: number | null = null;

  constructor(role: BeamRole = "sender", callbacks?: BeamClientCallbacks) {
    this.role = role;
    if (callbacks) {
      this.callbacks = callbacks;
    }
  }

  public setCallbacks(callbacks: BeamClientCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  private setStatus(status: BeamStatus): void {
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  // Camera Management
  public async startCamera(
    facingMode: "user" | "environment" = "environment",
    quality: StreamQuality = "1080p30"
  ): Promise<MediaStream> {
    this.stopMedia();
    this.currentFacingMode = facingMode;

    const videoConstraints: MediaTrackConstraints = {
      facingMode: { ideal: facingMode },
    };

    if (quality === "1080p60") {
      videoConstraints.width = { ideal: 1920 };
      videoConstraints.height = { ideal: 1080 };
      videoConstraints.frameRate = { ideal: 60 };
    } else if (quality === "1080p30") {
      videoConstraints.width = { ideal: 1920 };
      videoConstraints.height = { ideal: 1080 };
      videoConstraints.frameRate = { ideal: 30 };
    } else if (quality === "720p60") {
      videoConstraints.width = { ideal: 1280 };
      videoConstraints.height = { ideal: 720 };
      videoConstraints.frameRate = { ideal: 60 };
    } else {
      videoConstraints.width = { ideal: 1280 };
      videoConstraints.height = { ideal: 720 };
      videoConstraints.frameRate = { ideal: 30 };
    }

    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    };

    let stream: MediaStream | null = null;

    // Cascade 1: Requested quality + facingMode + audio
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: audioConstraints,
      });
    } catch {
      // Cascade 2: Requested quality + facingMode without audio (in case mic is denied or unavailable)
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });
      } catch {
        // Cascade 3: Basic generic video + audio
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        } catch {
          // Cascade 4: Basic video only (absolute fallback)
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }
      }
    }

    this.localStream = stream;
    this.attachLocalTracks();
    return stream;
  }

  public async switchCamera(): Promise<MediaStream> {
    this.currentFacingMode = this.currentFacingMode === "user" ? "environment" : "user";
    return this.startCamera(this.currentFacingMode);
  }

  public async toggleTorch(): Promise<boolean> {
    if (!this.localStream) return false;
    const videoTrack = this.localStream.getVideoTracks()[0];
    if (!videoTrack) return false;

    try {
      const capabilities = videoTrack.getCapabilities?.() as { torch?: boolean };
      if (!capabilities?.torch) return false;

      this.isTorchOn = !this.isTorchOn;
      // @ts-expect-error Torch constraint
      await videoTrack.applyConstraints({ advanced: [{ torch: this.isTorchOn }] });
      return this.isTorchOn;
    } catch {
      return false;
    }
  }

  public async startScreenShare(): Promise<MediaStream> {
    this.stopMedia();
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 60 } },
      audio: true,
    });
    this.localStream = stream;
    this.attachLocalTracks();
    return stream;
  }

  public toggleAudio(): boolean {
    if (!this.localStream) return false;
    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.isAudioMuted = !audioTrack.enabled;
    }
    return !this.isAudioMuted;
  }

  public stopMedia(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    this.isTorchOn = false;
  }

  // Connect to Signaling Room
  public async joinRoom(roomId: string, customPeerId?: string): Promise<void> {
    this.roomId = roomId.toUpperCase().trim();
    this.setStatus("connecting_signaling");

    const wsUrl = `${DEFAULT_SIGNALING_URL}/room/${this.roomId}${
      customPeerId ? `?peerId=${encodeURIComponent(customPeerId)}` : ""
    }`;

    try {
      this.ws = new WebSocket(wsUrl);
    } catch (err) {
      this.setStatus("error");
      this.callbacks.onError?.(`WebSocket connection error: ${err}`);
      return;
    }

    this.ws.onopen = () => {
      const metadata: BeamPeerMetadata = {
        peerId: this.peerId,
        role: this.role,
        isMobile: /Android|iPhone|iPad/i.test(navigator.userAgent),
      };
      this.sendSignaling({
        type: "join",
        metadata: metadata as unknown as Record<string, unknown>,
      });
      this.startHeartbeat();
    };

    this.ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data) as SignalingMessage;
        await this.handleSignalingMessage(msg);
      } catch (e) {
        console.error("Signaling error", e);
      }
    };

    this.ws.onerror = () => {
      this.setStatus("error");
      this.callbacks.onError?.("Signaling connection error.");
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      if (this.status !== "streaming") {
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

        // If other peers are in the room and I am the Sender, initiate the MediaStream Offer
        if (msg.peers && msg.peers.length > 0 && this.role === "sender") {
          const targetPeer = msg.peers[0];
          await this.initiatePeerConnection(targetPeer.peerId, true);
        }
        break;

      case "peer_joined":
        // New peer joined. If I am the Sender, create offer to send media
        if (msg.peerId && msg.peerId !== this.peerId && this.role === "sender") {
          await this.initiatePeerConnection(msg.peerId, true);
        }
        break;

      case "peer_left":
        this.cleanupPeerConnection();
        this.setStatus("in_room");
        this.setTally(false);
        break;

      case "signal":
        if (msg.fromPeerId && msg.data) {
          await this.handleWebRTCSignal(msg.fromPeerId, msg.data);
        }
        break;
    }
  }

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

    this.pc.oniceconnectionstatechange = () => {
      if (!this.pc) return;
      if (this.pc.iceConnectionState === "failed") {
        console.warn("[BeamSuite WebRTC] ICE connection failed, attempting ICE restart...");
        try {
          this.pc.restartIce();
        } catch {}
      }
    };

    this.pc.onconnectionstatechange = () => {
      if (!this.pc) return;
      console.log(`[BeamSuite WebRTC] Connection state: ${this.pc.connectionState}`);
      if (this.pc.connectionState === "connected") {
        this.setStatus("streaming");
        if (this.role === "receiver") {
          this.setTally(true);
        }
      } else if (
        this.pc.connectionState === "disconnected" ||
        this.pc.connectionState === "failed" ||
        this.pc.connectionState === "closed"
      ) {
        this.setStatus("in_room");
        this.setTally(false);
      }
    };

    // Attach local tracks if I am sender
    if (this.localStream && this.role === "sender") {
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream && this.pc) {
          this.pc.addTrack(track, this.localStream);
        }
      });
    }

    // Configure receiving transceivers if I am receiver
    if (!isInitiator && this.role === "receiver") {
      try {
        this.pc.addTransceiver("video", { direction: "recvonly" });
        this.pc.addTransceiver("audio", { direction: "recvonly" });
      } catch {}
    }

    // Listen for incoming tracks if I am receiver
    this.pc.ontrack = (event) => {
      console.log(`[BeamSuite WebRTC] ontrack: kind=${event.track.kind}, id=${event.track.id}`);
      let stream = event.streams && event.streams[0];
      if (!stream) {
        if (!this.remoteStream) {
          this.remoteStream = new MediaStream();
        }
        if (!this.remoteStream.getTracks().some((t) => t.id === event.track.id)) {
          this.remoteStream.addTrack(event.track);
        }
      } else {
        this.remoteStream = stream;
      }

      event.track.onunmute = () => {
        console.log(`[BeamSuite WebRTC] track unmuted: kind=${event.track.kind}`);
        if (this.remoteStream) {
          this.setStatus("streaming");
          this.callbacks.onRemoteStream?.(this.remoteStream);
        }
      };

      this.setStatus("streaming");
      if (this.remoteStream) {
        this.callbacks.onRemoteStream?.(this.remoteStream);
      }
    };

    // Control DataChannel
    if (isInitiator) {
      this.controlDc = this.pc.createDataChannel("beam-ctrl");
      this.setupControlChannel(this.controlDc);

      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      this.sendSignaling({
        type: "signal",
        targetPeerId,
        data: { sdp: this.pc.localDescription },
      });
    } else {
      this.pc.ondatachannel = (event) => {
        this.controlDc = event.channel;
        this.setupControlChannel(this.controlDc);
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
        await this.drainCandidateQueue();

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
          await this.drainCandidateQueue();
        }
      }
    } else if (signalData.candidate) {
      if (this.pc && this.pc.remoteDescription && this.pc.remoteDescription.type) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(signalData.candidate));
        } catch (e) {
          console.warn("Failed to add ICE candidate", e);
        }
      } else {
        this.candidateQueue.push(signalData.candidate);
      }
    }
  }

  private async drainCandidateQueue(): Promise<void> {
    if (!this.pc) return;
    while (this.candidateQueue.length > 0) {
      const cand = this.candidateQueue.shift();
      if (cand) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(cand));
        } catch (e) {
          console.warn("Failed to drain candidate", e);
        }
      }
    }
  }

  private setupControlChannel(dc: RTCDataChannel): void {
    dc.onopen = () => {
      if (this.role === "receiver") {
        this.sendControlMessage({ type: "tally", onAir: true });
      }
    };

    dc.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as BeamControlMessage;
        if (msg.type === "tally") {
          this.setTally(Boolean(msg.onAir));
        }
      } catch {}
    };
  }

  public sendControlMessage(msg: BeamControlMessage): void {
    if (this.controlDc?.readyState === "open") {
      this.controlDc.send(JSON.stringify(msg));
    }
  }

  private setTally(onAir: boolean): void {
    this.isOnAir = onAir;
    this.callbacks.onTallyChange?.(onAir);
  }

  private attachLocalTracks(): void {
    if (!this.pc || !this.localStream) return;
    const senders = this.pc.getSenders();
    this.localStream.getTracks().forEach((track) => {
      const existingSender = senders.find((s) => s.track?.kind === track.kind);
      if (existingSender) {
        existingSender.replaceTrack(track);
      } else {
        if (this.pc && this.localStream) {
          this.pc.addTrack(track, this.localStream);
        }
      }
    });
  }

  public leaveRoom(): void {
    this.stopHeartbeat();
    this.sendSignaling({ type: "leave" });
    this.cleanupPeerConnection();
    this.stopMedia();
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      this.ws.close();
      this.ws = null;
    }
    this.setStatus("disconnected");
    this.remoteStream = null;
    this.setTally(false);
  }

  private cleanupPeerConnection(): void {
    this.candidateQueue = [];
    if (this.controlDc) {
      this.controlDc.onopen = null;
      this.controlDc.onclose = null;
      this.controlDc.onmessage = null;
      try {
        this.controlDc.close();
      } catch {}
      this.controlDc = null;
    }
    if (this.pc) {
      this.pc.onicecandidate = null;
      this.pc.onconnectionstatechange = null;
      this.pc.ontrack = null;
      try {
        this.pc.close();
      } catch {}
      this.pc = null;
    }
  }
}
