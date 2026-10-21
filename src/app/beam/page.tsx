"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import { BeamClient } from "@/lib/beamsuite/beamClient";
import { BeamRole, BeamStatus, CaptureSource, StreamQuality } from "@/lib/beamsuite/types";

export default function BeamSuitePage() {
  const [role, setRole] = useState<BeamRole>("receiver");
  const [roomId, setRoomId] = useState<string>("");
  const [joinInput, setJoinInput] = useState<string>("");
  const [status, setStatus] = useState<BeamStatus>("disconnected");
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

  // Initialize BeamClient & handle URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewRoom = params.get("view");
    const pushRoom = params.get("push");
    const cleanParam = params.get("clean");

    let initialRole: BeamRole = "receiver";
    let initialRoom = "";

    if (viewRoom) {
      initialRole = "receiver";
      initialRoom = viewRoom.toUpperCase().trim();
      setIsCleanView(true);
    } else if (pushRoom) {
      initialRole = "sender";
      initialRoom = pushRoom.toUpperCase().trim();
    } else if (cleanParam === "true") {
      setIsCleanView(true);
    }

    setRole(initialRole);
    if (initialRoom) {
      setRoomId(initialRoom);
    }

    const client = new BeamClient(initialRole, {
      onStatusChange: (s) => setStatus(s),
      onRoomJoined: (id) => {
        setRoomId(id);
        generateQrCode(id);
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
        client.startCamera("environment", "1080p30").then((stream) => {
          setLocalStream(stream);
          client.joinRoom(initialRoom);
        }).catch((err) => {
          setErrorMessage(`Camera initialization error: ${err.message || err}`);
        });
      } else {
        client.joinRoom(initialRoom);
      }
    }

    return () => {
      client.leaveRoom();
    };
  }, []);

  const generateRandomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${code.slice(0, 3)}-${code.slice(3)}`;
  };

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

    if (clientRef.current) {
      clientRef.current.role = "receiver";
      clientRef.current.joinRoom(code);
    }
  };

  const handleStartSender = async (targetRoom?: string) => {
    setErrorMessage("");
    setIsStartingMedia(true);

    const code = (targetRoom || joinInput.trim() || generateRandomCode()).toUpperCase().trim();

    if (clientRef.current) {
      clientRef.current.role = "sender";
      try {
        const stream = await clientRef.current.startCamera("environment", quality);
        setLocalStream(stream);
        setRole("sender");
        setRoomId(code);
        generateQrCode(code);
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

    const code = (targetRoom || joinInput.trim() || generateRandomCode()).toUpperCase().trim();

    if (clientRef.current) {
      clientRef.current.role = "sender";
      try {
        const stream = await clientRef.current.startScreenShare();
        setLocalStream(stream);
        setCaptureSource("screen");
        setRole("sender");
        setRoomId(code);
        generateQrCode(code);
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
  };

  const isInRoom = Boolean(roomId && status !== "disconnected");

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
    <div className={`min-h-screen ${isDimScreen ? "bg-black opacity-15" : "bg-slate-50 dark:bg-slate-950"} text-slate-900 dark:text-slate-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 transition-opacity duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
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
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* VIDEO VIEWFINDER AREA */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-slate-800 shadow-inner">
                {role === "sender" ? (
                  <video
                    ref={handleLocalVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={handleRemoteVideoRef}
                    autoPlay
                    playsInline
                    muted={isReceiverMuted}
                    onClick={handleToggleUnmute}
                    onLoadedMetadata={() => setHasRemoteVideoFrames(true)}
                    onPlaying={() => setHasRemoteVideoFrames(true)}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                )}

                {/* Receiver Empty State when no sender has connected yet */}
                {role === "receiver" && status !== "streaming" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-white space-y-3 p-6 text-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-ping"></span>
                    <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-blue-400">
                      ROOM: {roomId}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
                      {status === "connecting_peer"
                        ? "Establishing peer-to-peer WebRTC connection..."
                        : "Waiting for phone camera or screen stream to connect. Scan the QR code or enter code on your phone."}
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setShowQrModal(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold cursor-pointer transition shadow-sm"
                      >
                        Show Phone QR Code
                      </button>
                      <button
                        onClick={handleCopyPhoneLink}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold cursor-pointer transition border border-slate-700"
                      >
                        {copiedPhoneLink ? "✓ Link Copied" : "Copy Phone Link"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Decoding state when connected but waiting for keyframes */}
                {role === "receiver" && status === "streaming" && !hasRemoteVideoFrames && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white space-y-3 p-6 text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-sm font-semibold text-slate-200">
                      Decoding live video feed...
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Connection established. Streaming video frames from camera.
                    </p>
                  </div>
                )}

                {/* Autoplay / Muted Audio Feedback Overlay */}
                {role === "receiver" && status === "streaming" && isReceiverMuted && (
                  <div
                    onClick={handleToggleUnmute}
                    className="absolute top-4 inset-x-4 mx-auto max-w-sm bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white rounded-xl px-3.5 py-2 text-xs flex items-center justify-between shadow-lg cursor-pointer transition active:scale-98"
                  >
                    <span className="flex items-center gap-2">
                      <span>🔇</span>
                      <span>Audio muted by browser. Click to unmute.</span>
                    </span>
                    <span className="font-bold underline text-blue-400">Unmute</span>
                  </div>
                )}

                {/* Sender Studio Controls Overlay */}
                {role === "sender" && (
                  <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex flex-wrap items-center justify-between gap-2 bg-black/70 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-white/10 text-white">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={handleSwitchCamera}
                        className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                        title="Flip between front and back camera"
                      >
                        🔄 <span className="hidden sm:inline">Flip</span>
                      </button>

                      <button
                        onClick={handleToggleTorch}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                          isTorchActive ? "bg-amber-500 text-black font-bold" : "bg-white/10 hover:bg-white/20"
                        }`}
                        title="Toggle Flashlight / Torch"
                      >
                        🔦 <span className="hidden sm:inline">Torch</span>
                      </button>

                      <button
                        onClick={handleToggleAudio}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                          isMicMuted ? "bg-red-600 text-white" : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {isMicMuted ? "🔇 Unmute" : "🎙️ Mute"}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setIsDimScreen(!isDimScreen)}
                        className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition cursor-pointer"
                        title="Dim display to save battery during long streams"
                      >
                        🌙 Dim
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* OBS Setup Helper Card */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    OBS Studio Quick Setup
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">Latency: &lt;100ms</span>
                </div>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal list-inside">
                  <li>In <strong>OBS Studio</strong>, click <strong>+ (Add Source)</strong> &rarr; <strong>Browser</strong>.</li>
                  <li>
                    Set URL to:{" "}
                    <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-blue-600 dark:text-blue-400 select-all">
                      {typeof window !== "undefined" ? `${window.location.origin}/beam?view=${roomId}` : `/beam?view=${roomId}`}
                    </code>
                  </li>
                  <li>Set Width: <strong>1920</strong>, Height: <strong>1080</strong>, and check <strong>Control audio via OBS</strong>.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base sm:text-lg">Scan to Stream Camera</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Point your iPhone or Android camera to instantly start beaming video into room <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{roomId}</span>
              </p>
              {qrCodeUrl && (
                <div className="flex justify-center p-3 bg-white rounded-xl inline-block mx-auto border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="Camera Stream QR Code" className="w-48 h-48 sm:w-52 sm:h-52" />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyPhoneLink}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition cursor-pointer min-h-[38px]"
                >
                  {copiedPhoneLink ? "✓ Copied" : "Copy Phone Link"}
                </button>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer min-h-[38px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Architecture Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="text-xl">⚡</div>
            <h4 className="font-semibold text-xs sm:text-sm">Sub-100ms Ultra-Low Latency</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct WebRTC peer connection bypasses cloud transcoders. Video and audio arrive instantly with no noticeable lag compared to RTMP.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="text-xl">🔋</div>
            <h4 className="font-semibold text-xs sm:text-sm">Battery & Thermal Saver</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Includes one-tap screen dimming to prevent mobile phone overheating during multi-hour live streams while maintaining smooth 1080p.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div className="text-xl">🔴</div>
            <h4 className="font-semibold text-xs sm:text-sm">Live On-Air Tally</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time two-way signaling notifies the remote camera operator when their feed is actively live on-air in OBS Studio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
