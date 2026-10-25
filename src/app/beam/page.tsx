"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import { BeamClient } from "@/lib/beamsuite/beamClient";
import { BeamRole, BeamStatus, CaptureSource, StreamQuality } from "@/lib/beamsuite/types";
import { P2PPersistence } from "@/lib/p2p/p2pState";
import { P2PConnectionHeader } from "@/components/p2p/P2PConnectionHeader";

export default function BeamSuitePage() {
  const [role, setRole] = useState<BeamRole>("receiver");
  const [roomId, setRoomId] = useState<string>("");
  const [joinInput, setJoinInput] = useState<string>("");
  const [status, setStatus] = useState<BeamStatus>("disconnected");
  const [isRestoredSession, setIsRestoredSession] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedObsLink, setCopiedObsLink] = useState<boolean>(false);
  const [copiedPhoneLink, setCopiedPhoneLink] = useState<boolean>(false);

  // Studio stream state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // Audio & playback state
  const [isReceiverMuted, setIsReceiverMuted] = useState<boolean>(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const [hasRemoteVideoFrames, setHasRemoteVideoFrames] = useState<boolean>(false);

  // Studio Controls state
  const [captureSource, setCaptureSource] = useState<CaptureSource>("camera");
  const [quality, setQuality] = useState<StreamQuality>("1080p30");
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isTorchActive, setIsTorchActive] = useState<boolean>(false);
  const [isDimScreen, setIsDimScreen] = useState<boolean>(false);
  const [isOnAir, setIsOnAir] = useState<boolean>(false);
  const [isCleanView, setIsCleanView] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isStartingMedia, setIsStartingMedia] = useState<boolean>(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const clientRef = useRef<BeamClient | null>(null);

  // Synchronize local video stream to DOM video element
  const handleLocalVideoRef = useCallback((el: HTMLVideoElement | null) => {
    localVideoRef.current = el;
    if (el && localStream) {
      if (el.srcObject !== localStream) {
        el.srcObject = localStream;
      }
      el.play().catch(() => {});
    }
  }, [localStream]);

  // Safely play remote video with automatic muted fallback to prevent black screen
  const attemptPlayRemoteVideo = useCallback((el: HTMLVideoElement) => {
    if (!el.paused && el.readyState >= 2) {
      return;
    }
    el.play().catch((err: unknown) => {
      const isAbort = err instanceof Error && err.name === "AbortError";
      if (isAbort) return; // Ignore harmless aborted play calls during fast stream loading
      console.warn("Unmuted autoplay restricted by browser policy; muting to guarantee live playback:", err);
      el.muted = true;
      setIsReceiverMuted(true);
      setAutoplayBlocked(true);
      el.play().catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        console.error("Muted playback attempt also failed:", e);
      });
    });
  }, []);

  // Synchronize remote video stream to DOM video element
  const handleRemoteVideoRef = useCallback((el: HTMLVideoElement | null) => {
    remoteVideoRef.current = el;
    if (el && remoteStream) {
      if (el.srcObject !== remoteStream) {
        el.srcObject = remoteStream;
      }
      attemptPlayRemoteVideo(el);
    }
  }, [remoteStream, attemptPlayRemoteVideo]);

  // Effect fallback to ensure playback if stream is assigned after mount
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      if (localVideoRef.current.srcObject !== localStream) {
        localVideoRef.current.srcObject = localStream;
      }
      localVideoRef.current.play().catch(() => {});
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      if (remoteVideoRef.current.srcObject !== remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      attemptPlayRemoteVideo(remoteVideoRef.current);
    }
  }, [remoteStream, isCleanView, attemptPlayRemoteVideo]);

  const handleToggleUnmute = () => {
    if (remoteVideoRef.current) {
      const nextMuted = !remoteVideoRef.current.muted;
      remoteVideoRef.current.muted = nextMuted;
      setIsReceiverMuted(nextMuted);
      if (!nextMuted) {
        setAutoplayBlocked(false);
      }
      remoteVideoRef.current.play().catch(() => {});
    }
  };

  const generateQrCode = async (id: string) => {
    try {
      const pushUrl = `${window.location.origin}/beam?push=${id}`;
      const dataUrl = await QRCode.toDataURL(pushUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });
      setQrCodeUrl(dataUrl);
    } catch (e) {
      console.error("QR Code error", e);
    }
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${code.slice(0, 3)}-${code.slice(3)}`;
  };

  // Initialize BeamClient, restore session from browser memory, and handle URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewRoom = params.get("view");
    const pushRoom = params.get("push");
    const roomParam = params.get("room");
    const roleParam = params.get("role") as BeamRole | null;
    const cleanParam = params.get("clean");

    const savedSession = P2PPersistence.loadSession("beam");

    let initialRole: BeamRole = "receiver";
    let initialRoom = "";

    if (viewRoom) {
      initialRole = "receiver";
      initialRoom = viewRoom.toUpperCase().trim();
      setIsCleanView(true);
    } else if (pushRoom) {
      initialRole = "sender";
      initialRoom = pushRoom.toUpperCase().trim();
    } else if (roomParam) {
      initialRoom = roomParam.toUpperCase().trim();
      initialRole = roleParam === "sender" ? "sender" : "receiver";
      if (cleanParam === "true") setIsCleanView(true);
    } else if (savedSession?.roomId) {
      initialRoom = savedSession.roomId;
      const metaRole = savedSession.metadata?.role as BeamRole | undefined;
      initialRole = metaRole || "receiver";
      setIsRestoredSession(true);
    }

    setRole(initialRole);
    if (initialRoom) {
      setRoomId(initialRoom);
      generateQrCode(initialRoom);
    }

    const client = new BeamClient(initialRole, {
      onStatusChange: (s) => setStatus(s),
      onRoomJoined: (id) => {
        setRoomId(id);
        generateQrCode(id);
        P2PPersistence.saveSession("beam", {
          roomId: id,
          metadata: { role: initialRole, quality },
        });
        P2PPersistence.syncUrl({
          room: id,
          role: initialRole,
          clean: isCleanView ? "true" : null,
        });
      },
      onRemoteStream: (stream) => {
        setRemoteStream(stream);
      },
      onTallyChange: (onAir) => setIsOnAir(onAir),
      onError: (err) => setErrorMessage(err),
    });

    clientRef.current = client;

    if (initialRoom) {
      if (initialRole === "sender") {
        // If sender has direct push or user gesture, attempt camera
        client.startCamera("environment", "1080p30").then((stream) => {
          setLocalStream(stream);
          client.joinRoom(initialRoom);
        }).catch((err) => {
          console.warn("Camera start deferred to user click:", err);
          // Still join room so receiver knows sender is present
          client.joinRoom(initialRoom);
        });
      } else {
        client.joinRoom(initialRoom);
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (clientRef.current && clientRef.current.status === "streaming") {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      client.leaveRoom();
    };
  }, []);

  const handleCreateReceiverRoom = async () => {
    setErrorMessage("");
    setRole("receiver");
    let code = "";
    try {
      const res = await fetch("https://webtoolseasy-signaling.gaurav10610.workers.dev/new-room");
      const data = await res.json();
      if (data?.roomId) {
        code = data.roomId;
      }
    } catch {
      code = generateRandomCode();
    }

    if (!code) code = generateRandomCode();
    setRoomId(code);
    generateQrCode(code);

    P2PPersistence.saveSession("beam", {
      roomId: code,
      metadata: { role: "receiver", quality },
    });
    P2PPersistence.syncUrl({ room: code, role: "receiver" });

    if (clientRef.current) {
      clientRef.current.role = "receiver";
      clientRef.current.joinRoom(code);
    }
  };

  const handleStartSender = async (targetRoom?: string) => {
    setErrorMessage("");
    setIsStartingMedia(true);

    const code = (targetRoom || roomId || joinInput.trim() || generateRandomCode()).toUpperCase().trim();

    if (clientRef.current) {
      clientRef.current.role = "sender";
      try {
        const stream = await clientRef.current.startCamera("environment", quality);
        setLocalStream(stream);
        setRole("sender");
        setRoomId(code);
        setIsRestoredSession(false);
        generateQrCode(code);

        P2PPersistence.saveSession("beam", {
          roomId: code,
          metadata: { role: "sender", quality },
        });
        P2PPersistence.syncUrl({ room: code, role: "sender" });

        await clientRef.current.joinRoom(code);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMessage(`Camera access denied or unavailable: ${msg}. Please allow camera permissions.`);
      } finally {
        setIsStartingMedia(false);
      }
    }
  };

  const handleStartScreenShareSender = async (targetRoom?: string) => {
    setErrorMessage("");
    setIsStartingMedia(true);

    const code = (targetRoom || roomId || joinInput.trim() || generateRandomCode()).toUpperCase().trim();

    if (clientRef.current) {
      clientRef.current.role = "sender";
      try {
        const stream = await clientRef.current.startScreenShare();
        setLocalStream(stream);
        setCaptureSource("screen");
        setRole("sender");
        setRoomId(code);
        setIsRestoredSession(false);
        generateQrCode(code);

        P2PPersistence.saveSession("beam", {
          roomId: code,
          metadata: { role: "sender", quality, captureSource: "screen" },
        });
        P2PPersistence.syncUrl({ room: code, role: "sender" });

        await clientRef.current.joinRoom(code);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMessage(`Screen share cancelled or failed: ${msg}`);
      } finally {
        setIsStartingMedia(false);
      }
    }
  };

  const handleSwitchCamera = async () => {
    if (!clientRef.current) return;
    try {
      const stream = await clientRef.current.switchCamera();
      setLocalStream(stream);
    } catch (err) {
      setErrorMessage(`Failed to switch camera: ${err}`);
    }
  };

  const handleToggleTorch = async () => {
    if (!clientRef.current) return;
    const torchState = await clientRef.current.toggleTorch();
    setIsTorchActive(torchState);
  };

  const handleToggleAudio = () => {
    if (!clientRef.current) return;
    const isUnmuted = clientRef.current.toggleAudio();
    setIsMicMuted(!isUnmuted);
  };

  const handleCopyObsLink = () => {
    const obsUrl = `${window.location.origin}/beam?view=${roomId}`;
    navigator.clipboard.writeText(obsUrl);
    setCopiedObsLink(true);
    setTimeout(() => setCopiedObsLink(false), 2000);
  };

  const handleCopyPhoneLink = () => {
    const phoneUrl = `${window.location.origin}/beam?push=${roomId}`;
    navigator.clipboard.writeText(phoneUrl);
    setCopiedPhoneLink(true);
    setTimeout(() => setCopiedPhoneLink(false), 2000);
  };

  const handleDisconnect = () => {
    clientRef.current?.leaveRoom();
    setLocalStream(null);
    setRemoteStream(null);
    setHasRemoteVideoFrames(false);
    setRoomId("");
    setStatus("disconnected");
    setIsRestoredSession(false);
    P2PPersistence.clearSession("beam");
    P2PPersistence.syncUrl({ room: null, role: null, clean: null, view: null, push: null });
  };

  const isInRoom = Boolean(roomId && status !== "disconnected");

  // Map BeamStatus to UniformConnectionStatus
  const uniformStatus =
    status === "streaming"
      ? "connected"
      : status === "connecting_peer"
      ? "connecting_peer"
      : status === "in_room"
      ? "in_room"
      : status === "connecting_signaling"
      ? "connecting_signaling"
      : status === "reconnecting"
      ? "reconnecting"
      : status === "error"
      ? "error"
      : "disconnected";

  // OBS CLEAN VIEW MODE (Dedicated full viewport mode for OBS Browser Sources)
  if (isCleanView) {
    return (
      <div
        onClick={handleToggleUnmute}
        className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center cursor-pointer select-none"
      >
        <video
          ref={handleRemoteVideoRef}
          autoPlay
          playsInline
          muted={isReceiverMuted}
          onLoadedMetadata={() => setHasRemoteVideoFrames(true)}
          onPlaying={() => setHasRemoteVideoFrames(true)}
          className="w-full h-full object-contain pointer-events-none"
        />

        {status !== "streaming" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-white space-y-3 p-6 text-center">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-ping"></span>
            <div className="font-mono text-2xl font-bold tracking-widest text-blue-400">
              ROOM: {roomId}
            </div>
            <p className="text-sm text-slate-300 max-w-sm">
              Waiting for phone camera or screen stream to connect...
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Status: {status}
            </div>
          </div>
        )}

        {status === "streaming" && !hasRemoteVideoFrames && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white space-y-3 p-6 text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm font-semibold text-slate-200">
              Decoding live video stream...
            </div>
          </div>
        )}

        {/* Minimal hover overlay for status & audio */}
        <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs text-white flex items-center gap-2.5 border border-white/10 shadow-lg">
          <span className="inline-flex items-center gap-1.5 font-mono text-slate-300 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${status === "streaming" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
            {status}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleUnmute();
            }}
            className="hover:underline cursor-pointer font-medium text-slate-200"
          >
            {isReceiverMuted ? "🔇 Click to Unmute" : "🔊 Audio Live"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDimScreen ? "bg-black opacity-15" : "bg-slate-50 dark:bg-slate-950"} text-slate-900 dark:text-slate-100 transition-opacity duration-300`}>
      {/* Uniform Persistent P2P Connection Header - Visible At All Times */}
      <P2PConnectionHeader
        appName="BeamSuite"
        appBadge="OBS"
        appIcon={<span>🎥</span>}
        status={uniformStatus}
        roomId={roomId}
        peerName={role === "receiver" ? (status === "streaming" ? "Camera Live" : "Waiting for Phone") : (isOnAir ? "OBS Live" : "Ready to Stream")}
        peerDetails={role === "receiver" ? "OBS Receiver" : "Camera Sender"}
        isRestoredSession={isRestoredSession}
        onNewRoom={role === "receiver" ? handleCreateReceiverRoom : () => handleStartSender()}
        onLeaveRoom={handleDisconnect}
        onReconnect={() => roomId && clientRef.current?.joinRoom(roomId)}
        shareUrl={
          typeof window !== "undefined" && roomId
            ? `${window.location.origin}/beam?view=${roomId}`
            : undefined
        }
      >
        <button
          type="button"
          onClick={() => setIsCleanView(!isCleanView)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-md transition cursor-pointer"
          title="Toggle Fullscreen OBS Browser Source View"
        >
          OBS Mode
        </button>
      </P2PConnectionHeader>

      <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Restored Session Notification for Sender */}
        {isRestoredSession && role === "sender" && !localStream && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <span className="text-base">🔄</span>
              <span>
                <strong>Session restored after reload</strong> for Room <strong>{roomId}</strong>. Click to start your camera stream.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleStartSender(roomId)}
              disabled={isStartingMedia}
              className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-xs transition active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {isStartingMedia ? "Starting Camera..." : "▶ Resume Camera Now"}
            </button>
          </div>
        )}

        {/* Header Hero */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            WebRTC Studio Bridge • Sub-100ms Ultra-Low Latency • 1080p 60fps
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            BeamSuite <span className="text-blue-600 dark:text-blue-400">Studio Bridge</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your smartphone or PC into a wireless 1080p camera source for OBS Studio, or beam 60fps screen feeds directly between computers. No apps, no watermarks, 100% peer-to-peer.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center justify-between text-xs sm:text-sm shadow-xs">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-bold ml-3 hover:opacity-80 cursor-pointer">✕</button>
          </div>
        )}

        {/* Main Studio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 space-y-6">
          {!isInRoom ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {/* Option A: Start Camera Stream (Sender) */}
              <div className="p-5 sm:p-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 text-center flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl">📷</div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white">Stream from this Device (Sender)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Turn this phone or laptop into a live wireless camera or screen source for OBS Studio.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStartSender()}
                      disabled={isStartingMedia}
                      className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs sm:text-sm shadow-xs transition active:scale-98 cursor-pointer disabled:opacity-50 min-h-[44px]"
                    >
                      {isStartingMedia ? "Starting..." : "📷 Camera Stream"}
                    </button>
                    <button
                      onClick={() => handleStartScreenShareSender()}
                      disabled={isStartingMedia}
                      className="py-2.5 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-medium rounded-lg text-xs sm:text-sm shadow-xs transition active:scale-98 cursor-pointer disabled:opacity-50 min-h-[44px]"
                    >
                      🖥️ Share Screen
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Or enter existing Room Code"
                      value={joinInput}
                      onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-center font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[38px]"
                      maxLength={8}
                    />
                    <button
                      onClick={() => handleStartSender(joinInput)}
                      disabled={!joinInput.trim() || isStartingMedia}
                      className="py-2 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-40 min-h-[38px]"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* Option B: OBS Display Source (Receiver) */}
              <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl">🎥</div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white">Add Camera into OBS (Receiver)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Generate a clean OBS Browser Source URL. Scan the displayed QR code with your phone to stream into OBS Studio instantly.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCreateReceiverRoom}
                    className="w-full py-2.5 px-4 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-medium rounded-lg text-sm shadow-xs transition active:scale-98 cursor-pointer min-h-[44px]"
                  >
                    Create OBS Camera Source
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE STUDIO ROOM */
            <div className="space-y-5">
              {/* Studio Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    Room:
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {roomId}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    status === "streaming"
                      ? "bg-emerald-600 text-white animate-pulse"
                      : status === "connecting_peer"
                      ? "bg-blue-600 text-white animate-pulse"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}>
                    {status === "streaming" ? "🔴 LIVE ON AIR" : status === "connecting_peer" ? "CONNECTING..." : "⚪ STANDBY"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handleCopyObsLink}
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Copy OBS Browser Source URL"
                  >
                    {copiedObsLink ? "✓ Copied" : "📋 OBS Link"}
                  </button>

                  <button
                    onClick={() => setShowQrModal(true)}
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    📱 Scan Phone
                  </button>

                  <button
                    onClick={handleDisconnect}
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900 transition cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Tally Light Indicator */}
              <div className={`p-2.5 rounded-xl text-center text-xs sm:text-sm font-bold tracking-wider transition-colors duration-300 ${
                isOnAir
                  ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-500/20"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}>
                {isOnAir ? "● TRANSMITTING LIVE TO BROADCAST" : "○ SOURCE PREVIEW ONLY • NOT ON PROGRAM"}
              </div>

              {/* Video Viewport Area */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
                {role === "sender" ? (
                  /* Local Stream View (Sender Mode) */
                  <video
                    ref={handleLocalVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-contain"
                  />
                ) : (
                  /* Remote Stream View (Receiver / OBS Mode) */
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      ref={handleRemoteVideoRef}
                      autoPlay
                      playsInline
                      muted={isReceiverMuted}
                      onLoadedMetadata={() => setHasRemoteVideoFrames(true)}
                      onPlaying={() => setHasRemoteVideoFrames(true)}
                      className="w-full h-full object-contain"
                    />

                    {/* Unmute Action Banner if Autoplay Was Restricted by Browser */}
                    {status === "streaming" && isReceiverMuted && autoplayBlocked && (
                      <div className="absolute top-4 inset-x-4 mx-auto max-w-md z-20">
                        <button
                          type="button"
                          onClick={handleToggleUnmute}
                          className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm animate-bounce"
                        >
                          <span>🔇 Audio muted by browser autoplay policy. Click here to unmute</span>
                        </button>
                      </div>
                    )}

                    {status !== "streaming" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-3 p-4 text-center bg-black/75">
                        <span className="w-4 h-4 rounded-full bg-blue-500 animate-ping"></span>
                        <p className="text-xs sm:text-sm max-w-sm">
                          Waiting for phone camera to connect. Scan the QR code or open the link on your mobile browser.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sender Controls Tray (Only shown on Sender device) */}
              {role === "sender" && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Camera Controls
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    <button
                      onClick={handleSwitchCamera}
                      className="py-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[40px]"
                    >
                      🔄 Flip Camera
                    </button>
                    <button
                      onClick={handleToggleTorch}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[40px] ${
                        isTorchActive
                          ? "bg-amber-500 text-slate-950 border-amber-600 font-bold"
                          : "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      🔦 {isTorchActive ? "Torch On" : "Torch Off"}
                    </button>
                    <button
                      onClick={handleToggleAudio}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[40px] ${
                        isMicMuted
                          ? "bg-red-500 text-white border-red-600 font-bold"
                          : "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      🎙️ {isMicMuted ? "Mic Muted" : "Mic Active"}
                    </button>
                    <button
                      onClick={() => setIsDimScreen(!isDimScreen)}
                      className="py-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[40px]"
                    >
                      🔋 Dim Display
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* QR Code Modal for Phone Pairing */}
        {showQrModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
            onClick={() => setShowQrModal(false)}
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Scan with Phone Camera</h3>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Point your smartphone camera at this QR code to join room{" "}
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{roomId}</span> and start streaming immediately.
              </p>

              {qrCodeUrl ? (
                <div className="flex justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt={`QR Code for room ${roomId}`} className="w-52 h-52" />
                </div>
              ) : (
                <div className="flex items-center justify-center h-52 text-xs text-slate-400">
                  Generating QR Code...
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleCopyPhoneLink}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs transition cursor-pointer"
                >
                  {copiedPhoneLink ? "✓ Link Copied" : "Copy Direct Link"}
                </button>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
