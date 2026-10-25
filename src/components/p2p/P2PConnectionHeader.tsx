"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import { UniformConnectionStatus } from "@/lib/p2p/p2pState";

export interface P2PConnectionHeaderProps {
  appName: string;
  appBadge?: string;
  appIcon?: React.ReactNode;
  status: UniformConnectionStatus;
  roomId: string;
  peerName?: string;
  peerDetails?: string;
  isRestoredSession?: boolean;
  onNewRoom?: () => void;
  onLeaveRoom?: () => void;
  onReconnect?: () => void;
  shareUrl?: string;
  children?: React.ReactNode;
  className?: string;
}

export function P2PConnectionHeader({
  appName,
  appBadge,
  appIcon,
  status,
  roomId,
  peerName,
  peerDetails,
  isRestoredSession = false,
  onNewRoom,
  onLeaveRoom,
  onReconnect,
  shareUrl,
  children,
  className = "",
}: P2PConnectionHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const effectiveShareUrl =
    shareUrl ||
    (typeof window !== "undefined" && roomId
      ? `${window.location.origin}${window.location.pathname}?room=${roomId}`
      : "");

  const handleCopyLink = async () => {
    if (!effectiveShareUrl) return;
    try {
      await navigator.clipboard.writeText(effectiveShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = effectiveShareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShowQr = async () => {
    if (!effectiveShareUrl) return;
    try {
      const url = await QRCode.toDataURL(effectiveShareUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });
      setQrCodeDataUrl(url);
      setShowQrModal(true);
    } catch (e) {
      console.error("QR Code error:", e);
    }
  };

  // Status configuration mapping
  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return {
          label: "Live P2P Connected",
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          dot: "bg-emerald-500",
          pulse: true,
        };
      case "connecting_peer":
        return {
          label: "Handshake with Peer...",
          bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
          dot: "bg-purple-500",
          pulse: true,
        };
      case "in_room":
        return {
          label: "In Room • Waiting for Peer",
          bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
          dot: "bg-blue-500",
          pulse: true,
        };
      case "connecting_signaling":
        return {
          label: "Connecting Relay...",
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          dot: "bg-amber-500",
          pulse: true,
        };
      case "reconnecting":
        return {
          label: "Reconnecting...",
          bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
          dot: "bg-orange-500",
          pulse: true,
        };
      case "error":
        return {
          label: "Connection Issue",
          bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
          dot: "bg-rose-500",
          pulse: false,
        };
      case "disconnected":
      default:
        return {
          label: "Ready / Standby",
          bg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30",
          dot: "bg-slate-400",
          pulse: false,
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div
      className={`sticky top-16 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-xs transition-all ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: App Identity & Persistent Connection State */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2">
            {appIcon && (
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                {appIcon}
              </span>
            )}
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {appName}
            </span>
            {appBadge && (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {appBadge}
              </span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

          {/* Connection Status Pill - Always Visible */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${badge.bg}`}
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            title="Click to view network diagnostics"
          >
            <span className="relative flex h-2 w-2">
              {badge.pulse && (
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${badge.dot}`}
                ></span>
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${badge.dot}`}
              ></span>
            </span>
            <span>{badge.label}</span>
          </div>

          {/* Restored from reload indicator badge */}
          {isRestoredSession && roomId && (
            <span
              className="hidden lg:inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              title="Browser state was restored after page reload"
            >
              <svg
                className="w-3 h-3 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              State Preserved
            </span>
          )}

          {/* Connected Peer info */}
          {peerName && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold">{peerName}</span>
              {peerDetails && (
                <span className="text-slate-400 text-[10px]">({peerDetails})</span>
              )}
            </span>
          )}
        </div>

        {/* Center / Right: Room Actions & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {roomId ? (
            <div className="flex items-center gap-1.5">
              {/* Room Code Badge */}
              <div
                className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200"
                title="Room Code"
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Room:
                </span>
                <span>{roomId}</span>
              </div>

              {/* 1-Click Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
                title="Copy direct invite link"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-3.5 w-3.5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              {/* QR Code Trigger */}
              <button
                type="button"
                onClick={handleShowQr}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
                title="Display QR code for phone pairing"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </button>

              {/* Reconnect button if disconnected or error */}
              {(status === "error" || status === "disconnected") && onReconnect && (
                <button
                  type="button"
                  onClick={onReconnect}
                  className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 active:scale-95 transition cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reconnect
                </button>
              )}

              {/* Leave Room */}
              {onLeaveRoom && (
                <button
                  type="button"
                  onClick={onLeaveRoom}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                  title="Leave Room"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            onNewRoom && (
              <button
                type="button"
                onClick={onNewRoom}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 active:scale-95 transition shadow-2xs cursor-pointer"
              >
                <span>Create Room</span>
              </button>
            )
          )}

          {/* Child controls (e.g. Run, Console, Switch camera) */}
          {children && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Network Diagnostics Popover */}
      {showDiagnostics && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span>
                <strong>Signaling:</strong> Cloudflare Worker WebSocket
              </span>
              <span>
                <strong>Transport:</strong> WebRTC Direct DataChannel / MediaStream
              </span>
              <span>
                <strong>Encryption:</strong> DTLS / SRTP End-to-End
              </span>
              <span>
                <strong>Zero-Cloud:</strong> Yes (In-Memory / P2P)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowDiagnostics(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium cursor-pointer"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pair with Mobile Device
              </h3>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Scan this QR code with your mobile camera to join room{" "}
              <strong className="text-slate-800 dark:text-slate-200">{roomId}</strong> directly.
            </p>

            {qrCodeDataUrl ? (
              <div className="flex justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Code for room ${roomId}`}
                  className="w-48 h-48"
                />
              </div>
            ) : (
              <div className="flex justify-center p-8 text-xs text-slate-400">
                Generating QR code...
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
              >
                {copied ? "✓ Copied Link" : "Copy Direct Link"}
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
