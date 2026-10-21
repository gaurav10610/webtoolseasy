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

  // Synchronize remote video stream to DOM video element
  const handleRemoteVideoRef = useCallback((el: HTMLVideoElement | null) => {
    remoteVideoRef.current = el;
    if (el && remoteStream) {
      if (el.srcObject !== remoteStream) {
        el.srcObject = remoteStream;
      }
      el.play().catch(() => {});
    }
  }, [remoteStream]);

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
      remoteVideoRef.current.play().catch(() => {});
    }
  }, [remoteStream, isCleanView]);

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
    setRole("sender");

    const code = (targetRoom || joinInput.trim() || generateRandomCode()).toUpperCase().trim();
    setRoomId(code);
    generateQrCode(code);

    if (clientRef.current) {
      clientRef.current.role = "sender";
      try {
        const stream = await clientRef.current.startCamera("environment", quality);
        setLocalStream(stream);
        await clientRef.current.joinRoom(code);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMessage(`Camera access denied or unavailable: ${msg}. Please allow camera permissions.`);
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

  const handleStartScreenShare = async () => {
    if (!clientRef.current) return;
    try {
      const stream = await clientRef.current.startScreenShare();
      setCaptureSource("screen");
      setLocalStream(stream);
    } catch (err) {
      setErrorMessage(`Screen share cancelled or failed: ${err}`);
    }
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
    setRoomId("");
    setStatus("disconnected");
  };

  const isInRoom = Boolean(roomId && status !== "disconnected");

  // OBS CLEAN VIEW MODE (Dedicated full viewport mode for OBS Browser Sources)
  if (isCleanView) {
    return (
      <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={handleRemoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />

        {status !== "streaming" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white space-y-3 p-6 text-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
            <div className="font-mono text-xl font-bold tracking-widest text-blue-400">
              ROOM: {roomId}
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Waiting for camera or screen stream to connect...
            </p>
          </div>
        )}

        <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 text-xs text-white flex items-center gap-2">
          <span className="font-mono text-slate-300">{status}</span>
          <button
            onClick={() => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.muted = !remoteVideoRef.current.muted;
              }
            }}
            className="hover:underline cursor-pointer"
          >
            🔊 Toggle Audio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDimScreen ? "bg-black opacity-15" : "bg-slate-50 dark:bg-slate-950"} text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 transition-opacity duration-300`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            WebRTC Studio Bridge • Sub-100ms Ultra-Low Latency • 1080p 60fps
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            BeamSuite <span className="text-blue-600 dark:text-blue-400">Studio Bridge</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your smartphone or PC into a wireless 1080p camera source for OBS Studio, or beam 60fps screen feeds directly between computers. No apps, no watermarks, 100% peer-to-peer.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center justify-between text-sm shadow-xs">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-bold ml-3 hover:opacity-80">✕</button>
          </div>
        )}

        {/* Main Studio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          {!isInRoom ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Option A: Start Camera Stream (Sender) */}
              <div className="p-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 text-center flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-3xl">📷</div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white">Start Camera Stream (Sender)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use this phone or computer camera as a wireless video source. Prompts for camera permission and creates an instant OBS stream link.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleStartSender()}
                    disabled={isStartingMedia}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow transition active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isStartingMedia ? "Requesting Camera..." : "Start Camera Stream"}
                  </button>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Or enter existing Room Code"
                      value={joinInput}
                      onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-center font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={8}
                    />
                    <button
                      onClick={() => handleStartSender(joinInput)}
                      disabled={!joinInput.trim() || isStartingMedia}
                      className="py-1.5 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer disabled:opacity-40"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* Option B: OBS Display Source (Receiver) */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center flex flex-col justify-between space-y-4">
                <div className="space-y-3">
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
                    className="w-full py-2.5 px-4 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-medium rounded-lg text-sm shadow transition active:scale-98 cursor-pointer"
                  >
                    Create OBS Camera Source
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE STUDIO ROOM */
            <div className="space-y-6">
              {/* Studio Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    Studio Room:
                  </span>
                  <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {roomId}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isOnAir || status === "streaming"
                      ? "bg-emerald-600 text-white animate-pulse"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}>
                    {isOnAir || status === "streaming" ? "🔴 LIVE ON AIR" : "⚪ STANDBY"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyObsLink}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Copy OBS Browser Source URL"
                  >
                    {copiedObsLink ? "✓ OBS Link Copied!" : "📋 Copy OBS Link"}
                  </button>

                  <button
                    onClick={() => setShowQrModal(true)}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    📱 Scan with Phone
                  </button>

                  <button
                    onClick={handleDisconnect}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* VIDEO VIEWFINDER AREA */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border-4 border-slate-800 shadow-inner">
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
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Receiver Empty State when no sender has connected yet */}
                {role === "receiver" && status !== "streaming" && !remoteStream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white space-y-3 p-6 text-center">
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
                    <div className="font-mono text-xl font-bold tracking-widest text-blue-400">
                      ROOM: {roomId}
                    </div>
                    <p className="text-sm text-slate-400 max-w-sm">
                      Waiting for camera stream to connect. Scan the QR code or open the link on your phone.
                    </p>
                    <button
                      onClick={() => setShowQrModal(true)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold cursor-pointer transition"
                    >
                      Show Phone QR Code
                    </button>
                  </div>
                )}

                {/* Sender Studio Controls Overlay */}
                {role === "sender" && (
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSwitchCamera}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                        title="Flip between front and back camera"
                      >
                        🔄 Flip Camera
                      </button>

                      <button
                        onClick={handleToggleTorch}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                          isTorchActive ? "bg-amber-500 text-black font-bold" : "bg-white/10 hover:bg-white/20"
                        }`}
                        title="Toggle Flashlight / Torch"
                      >
                        🔦 Torch
                      </button>

                      <button
                        onClick={handleToggleAudio}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                          isMicMuted ? "bg-red-600 text-white" : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {isMicMuted ? "🔇 Unmute Mic" : "🎙️ Mute Mic"}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsDimScreen(!isDimScreen)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition cursor-pointer"
                        title="Dim display to save battery during long streams"
                      >
                        🌙 Dim Display
                      </button>

                      <button
                        onClick={handleStartScreenShare}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-medium transition cursor-pointer"
                      >
                        🖥️ Share Screen
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* OBS Setup Helper Card */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    OBS Studio Quick Integration Guide
                  </h4>
                  <span className="text-xs text-slate-500">Latency: ~50ms</span>
                </div>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside">
                  <li>Open <strong>OBS Studio</strong>, click <strong>+ (Add Source)</strong>, and select <strong>Browser</strong>.</li>
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
              <h3 className="font-bold text-lg">Scan to Stream Camera</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Point your iPhone or Android camera to instantly start beaming video into room <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{roomId}</span>
              </p>
              {qrCodeUrl && (
                <div className="flex justify-center p-3 bg-white rounded-xl inline-block mx-auto border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="Camera Stream QR Code" className="w-52 h-52" />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyPhoneLink}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  {copiedPhoneLink ? "✓ Copied" : "Copy Phone Link"}
                </button>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Architecture Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">⚡</div>
            <h4 className="font-semibold text-sm">Ultra-Low Sub-100ms Latency</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct WebRTC peer connection bypasses cloud transcoders. Video and audio arrive instantly with no noticeable delay compared to RTMP or SRT.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">🔋</div>
            <h4 className="font-semibold text-sm">Battery & Thermal Saver</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Includes one-tap screen dimming to prevent mobile phone overheating during multi-hour live streams while maintaining smooth 1080p output.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">🔴</div>
            <h4 className="font-semibold text-sm">Live Tally Light</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time two-way signaling notifies the remote camera operator when their source is actively live on-air in OBS or being viewed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
