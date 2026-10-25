"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { DropStreamClient } from "@/lib/dropstream/dropstreamClient";
import { ConnectionStatus, FileItem, PeerInfo } from "@/lib/dropstream/types";
import { P2PPersistence } from "@/lib/p2p/p2pState";
import { P2PConnectionHeader } from "@/components/p2p/P2PConnectionHeader";

// Helper for formatting byte sizes
function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function DropStreamPage() {
  const [roomId, setRoomId] = useState<string>("");
  const [joinInput, setJoinInput] = useState<string>("");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [isRestoredSession, setIsRestoredSession] = useState<boolean>(false);
  const [remotePeer, setRemotePeer] = useState<PeerInfo | null>(null);
  const [fileQueue, setFileQueue] = useState<FileItem[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ from: string; text: string; timestamp: number }>>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"files" | "notes">("files");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const clientRef = useRef<DropStreamClient | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileQueueRef = useRef<FileItem[]>(fileQueue);

  useEffect(() => {
    fileQueueRef.current = fileQueue;
  }, [fileQueue]);

  const generateQrCode = async (id: string) => {
    try {
      const shareUrl = `${window.location.origin}/drop?room=${id}`;
      const dataUrl = await QRCode.toDataURL(shareUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });
      setQrCodeUrl(dataUrl);
    } catch (e) {
      console.error("QR Code generation error", e);
    }
  };

  // Initialize DropStream Client & restore session from browser memory
  useEffect(() => {
    // 1. Restore chat messages from storage
    const savedChat = P2PPersistence.loadState<Array<{ from: string; text: string; timestamp: number }>>("dropstream_chat");
    if (savedChat && savedChat.length > 0) {
      setChatMessages(savedChat);
    }

    const client = new DropStreamClient({
      onStatusChange: (newStatus) => setStatus(newStatus),
      onRoomJoined: (id) => {
        setRoomId(id);
        generateQrCode(id);
        P2PPersistence.saveSession("drop", { roomId: id });
        P2PPersistence.syncUrl({ room: id });
      },
      onPeerConnected: (peer) => setRemotePeer(peer),
      onPeerDisconnected: () => {
        setRemotePeer(null);
      },
      onFileQueueUpdated: (files) => setFileQueue([...files]),
      onChatMessage: (msg) => {
        setChatMessages((prev) => {
          const updated = [...prev, msg];
          P2PPersistence.saveState("dropstream_chat", updated);
          return updated;
        });
      },
      onError: (err) => {
        setErrorMessage(err);
      },
    });

    clientRef.current = client;

    // 2. Check if room is present in URL search params, then fallback to persisted session
    const params = new URLSearchParams(window.location.search);
    const roomFromUrl = params.get("room");
    const savedSession = P2PPersistence.loadSession("drop");

    const targetRoom = roomFromUrl || savedSession?.roomId || "";
    if (targetRoom) {
      const cleanRoom = targetRoom.toUpperCase().trim();
      setRoomId(cleanRoom);
      if (!roomFromUrl && savedSession?.roomId) {
        setIsRestoredSession(true);
      }
      generateQrCode(cleanRoom);
      client.joinRoom(cleanRoom);
    }

    // 3. Prevent accidental tab closure while transferring
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasActiveTransfer = fileQueueRef.current.some(
        (f) => f.status === "transferring"
      );
      if (hasActiveTransfer) {
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

  const handleCreateRoom = async () => {
    setErrorMessage("");
    setIsRestoredSession(false);
    try {
      const res = await fetch("https://webtoolseasy-signaling.gaurav10610.workers.dev/new-room");
      const data = await res.json();
      if (data?.roomId) {
        const id = data.roomId.toUpperCase().trim();
        setRoomId(id);
        generateQrCode(id);
        P2PPersistence.saveSession("drop", { roomId: id });
        P2PPersistence.syncUrl({ room: id });
        clientRef.current?.joinRoom(id);
      }
    } catch {
      // Fallback: generate local room code
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const formatted = `${code.slice(0, 3)}-${code.slice(3)}`;
      setRoomId(formatted);
      generateQrCode(formatted);
      P2PPersistence.saveSession("drop", { roomId: formatted });
      P2PPersistence.syncUrl({ room: formatted });
      clientRef.current?.joinRoom(formatted);
    }
  };

  const handleJoinRoom = () => {
    if (!joinInput.trim()) return;
    setErrorMessage("");
    setIsRestoredSession(false);
    const clean = joinInput.toUpperCase().trim();
    setRoomId(clean);
    generateQrCode(clean);
    P2PPersistence.saveSession("drop", { roomId: clean });
    P2PPersistence.syncUrl({ room: clean });
    clientRef.current?.joinRoom(clean);
  };

  const handleLeaveRoom = () => {
    clientRef.current?.leaveRoom();
    setRoomId("");
    setRemotePeer(null);
    setStatus("disconnected");
    setIsRestoredSession(false);
    P2PPersistence.clearSession("drop");
    P2PPersistence.syncUrl({ room: null });
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/drop?room=${roomId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (status !== "connected") {
      setErrorMessage("Please wait for a peer to connect before sending files.");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      clientRef.current?.sendFile(files[i]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || status !== "connected") return;
    clientRef.current?.sendChatMessage(chatInput);
    setChatMessages((prev) => {
      const updated = [
        ...prev,
        { from: "You", text: chatInput.trim(), timestamp: Date.now() },
      ];
      P2PPersistence.saveState("dropstream_chat", updated);
      return updated;
    });
    setChatInput("");
  };

  const isConnected = status === "connected";
  const isInRoom = Boolean(roomId && status !== "disconnected");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Uniform Persistent P2P Connection Header - Visible At All Times */}
      <P2PConnectionHeader
        appName="DropStream"
        appBadge="P2P"
        appIcon={<span>⚡</span>}
        status={status}
        roomId={roomId}
        peerName={remotePeer?.deviceName}
        peerDetails={remotePeer?.browser ? `${remotePeer.browser} on ${remotePeer.os}` : undefined}
        isRestoredSession={isRestoredSession}
        onNewRoom={handleCreateRoom}
        onLeaveRoom={handleLeaveRoom}
        onReconnect={() => roomId && clientRef.current?.joinRoom(roomId)}
        shareUrl={
          typeof window !== "undefined" && roomId
            ? `${window.location.origin}/drop?room=${roomId}`
            : undefined
        }
      >
        {isInRoom && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "files" ? "notes" : "files")}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-md transition cursor-pointer"
            >
              {activeTab === "files" ? "📝 Secret Notes" : "📁 Files"}
            </button>
          </div>
        )}
      </P2PConnectionHeader>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Peer-to-Peer • Zero Server Storage • End-to-End Encrypted
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            DropStream <span className="text-blue-600 dark:text-blue-400">P2P Transfer</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Send unlimited files and entire folders directly between devices at direct network speed.
            No cloud uploads, no file size limits, and no account required.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center justify-between text-sm shadow-xs">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-700 font-bold ml-3 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          {/* Room Controls Bar */}
          {!isInRoom ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Option A: Create Room */}
              <div className="p-6 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 text-center space-y-4">
                <div className="text-2xl">⚡</div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Send to Another Device</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Create a direct peer-to-peer room with a 6-digit code or QR link.
                  </p>
                </div>
                <button
                  onClick={handleCreateRoom}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-medium rounded-lg text-sm shadow-xs cursor-pointer"
                >
                  Create Transfer Room
                </button>
              </div>

              {/* Option B: Join Room */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center space-y-4">
                <div className="text-2xl">🔗</div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">Receive from a Code</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter the 6-character room code shared with you.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. E7N-ZVT"
                    value={joinInput}
                    onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-center tracking-widest font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={8}
                  />
                  <button
                    onClick={handleJoinRoom}
                    className="py-2 px-4 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Connected Room Dashboard */
            <div className="space-y-6">
              {/* Tabs: Files vs Secret Notes */}
              <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab("files")}
                  className={`pb-2.5 px-4 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    activeTab === "files"
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  📁 File Transfers ({fileQueue.length})
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`pb-2.5 px-4 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    activeTab === "notes"
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  📝 Secret Notes & Text ({chatMessages.length})
                </button>
              </div>

              {/* TAB 1: FILES */}
              {activeTab === "files" && (
                <div className="space-y-6">
                  {/* Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                      isConnected
                        ? "border-blue-300 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 hover:border-blue-500 hover:bg-blue-50/60"
                        : "border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={(e) => handleFilesSelected(e.target.files)}
                      className="hidden"
                      disabled={!isConnected}
                    />
                    <div className="space-y-2">
                      <div className="text-4xl">📥</div>
                      <div className="font-semibold text-base">
                        {isConnected
                          ? "Drag & drop files here or click to browse"
                          : "Waiting for peer connection..."}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Supports gigabyte-scale videos, images, ZIPs, and documents. No upload limit.
                      </p>
                    </div>
                  </div>

                  {/* Transfer List */}
                  {fileQueue.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Active & Completed Transfers
                        </h4>
                        {fileQueue.some((f) => f.status === "completed" || f.status === "cancelled") && (
                          <button
                            onClick={() => clientRef.current?.clearCompletedFiles()}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                            title="Release downloaded files from browser memory"
                          >
                            Clear Completed (Free Memory)
                          </button>
                        )}
                      </div>
                      <div className="space-y-2.5">
                        {fileQueue.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-3 text-sm">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <span className="text-lg">
                                  {item.direction === "outgoing" ? "📤" : "📥"}
                                </span>
                                <div className="truncate">
                                  <div className="font-semibold truncate">{item.name}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {formatBytes(item.bytesTransferred)} of {formatBytes(item.size)}
                                    {item.status === "transferring" && item.speedBytesPerSec > 0 && (
                                      <>
                                        {" "}• {formatBytes(item.speedBytesPerSec)}/s • ETA:{" "}
                                        {item.etaSeconds}s
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                    item.status === "completed"
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                      : item.status === "transferring"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 animate-pulse"
                                      : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                  }`}
                                >
                                  {item.status === "completed"
                                    ? "Completed"
                                    : item.status === "transferring"
                                    ? `${item.progress}%`
                                    : item.status}
                                </span>

                                {item.downloadUrl && (
                                  <a
                                    href={item.downloadUrl}
                                    download={item.name}
                                    className="px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition cursor-pointer"
                                  >
                                    Save
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300 ease-out"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SECRET NOTES & CHAT */}
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-xs text-slate-400">
                        No notes yet. Paste credentials, auth tokens, or links to share instantly.
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg text-sm max-w-[85%] ${
                            msg.from === "You"
                              ? "ml-auto bg-blue-600 text-white"
                              : "mr-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <div className="text-[10px] opacity-75 font-semibold mb-1">
                            {msg.from}
                          </div>
                          <div className="whitespace-pre-wrap break-words font-mono text-xs">
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={
                        isConnected
                          ? "Type a note, link, or password..."
                          : "Connect a peer to send notes"
                      }
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={!isConnected}
                      className="flex-1 px-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!isConnected || !chatInput.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition disabled:opacity-50 cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg">Scan with Phone Camera</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Point your mobile camera to instantly join room <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{roomId}</span>
              </p>
              {qrCodeUrl && (
                <div className="flex justify-center p-3 bg-white rounded-xl inline-block mx-auto border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="Room QR Code" className="w-52 h-52" />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs transition cursor-pointer"
                >
                  {copiedLink ? "✓ Link Copied" : "Copy Direct Link"}
                </button>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-lg text-xs transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Architecture & FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">🔒</div>
            <h4 className="font-semibold text-sm">True Zero-Knowledge Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your files never touch a server or cloud disk. Data streams directly from peer device to peer device using end-to-end encrypted WebRTC DataChannels.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">🚀</div>
            <h4 className="font-semibold text-sm">No File Size Limits</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transfer 10GB, 50GB, or multi-gigabyte video folders seamlessly. Adaptive memory backpressure ensures your browser never freezes or crashes.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">⚡</div>
            <h4 className="font-semibold text-sm">Direct LAN / Fiber Speed</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              If devices share the same Wi-Fi, transfers flow over your local network at maximum gigabit hardware speed without touching external internet bandwidth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
