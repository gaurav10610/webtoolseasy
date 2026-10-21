"use client";

import React, { useState, useRef, useEffect } from "react";
import { LocalStudioEngine } from "@/lib/localstudio/mediaEngine";
import { StudioToolTab, TrimRange, VideoMetadata } from "@/lib/localstudio/types";

function formatSeconds(secs: number): string {
  if (isNaN(secs) || secs < 0) return "00:00.0";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  const ms = Math.floor((secs % 1) * 10);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms}`;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function LocalStudioPage() {
  const [activeTab, setActiveTab] = useState<StudioToolTab>("video_cutter");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoMeta, setVideoMeta] = useState<VideoMetadata | null>(null);
  const [sourceVideoUrl, setSourceVideoUrl] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [trimRange, setTrimRange] = useState<TrimRange>({ start: 0, end: 10 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [exportedUrl, setExportedUrl] = useState<string>("");
  const [exportedSize, setExportedSize] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const engineRef = useRef<LocalStudioEngine | null>(null);

  useEffect(() => {
    engineRef.current = new LocalStudioEngine();
    return () => {
      engineRef.current?.revokeAll();
    };
  }, []);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setErrorMessage("");
    setExportedUrl("");
    setSelectedFile(file);

    try {
      if (engineRef.current) {
        const { metadata, objectUrl } = await engineRef.current.probeVideo(file);
        setVideoMeta(metadata);
        setSourceVideoUrl(objectUrl);
        setTrimRange({ start: 0, end: Math.min(metadata.duration, 30) });
      }
    } catch (err) {
      setErrorMessage(`${err}`);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(time, videoMeta?.duration || 0));
    }
  };

  const handleSetStart = () => {
    setTrimRange((prev) => ({
      ...prev,
      start: Math.min(currentTime, prev.end - 0.5),
    }));
  };

  const handleSetEnd = () => {
    setTrimRange((prev) => ({
      ...prev,
      end: Math.max(currentTime, prev.start + 0.5),
    }));
  };

  const handleExportTrimmed = async () => {
    if (!engineRef.current || !sourceVideoUrl || !selectedFile) return;
    setIsProcessing(true);
    setProgressPercent(0);
    setErrorMessage("");

    try {
      const { blob, downloadUrl } = await engineRef.current.trimVideo(
        sourceVideoUrl,
        trimRange,
        (pct) => setProgressPercent(pct)
      );
      setExportedUrl(downloadUrl);
      setExportedSize(blob.size);
    } catch (err) {
      setErrorMessage(`Trimming failed: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtractAudio = async () => {
    if (!engineRef.current || !selectedFile) return;
    setIsProcessing(true);
    setProgressPercent(20);
    setErrorMessage("");

    try {
      const { blob, downloadUrl } = await engineRef.current.extractAudioToWav(selectedFile);
      setExportedUrl(downloadUrl);
      setExportedSize(blob.size);
      setProgressPercent(100);
    } catch (err) {
      setErrorMessage(`Audio extraction failed: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            100% In-Browser Media Engine • Zero Cloud Uploads • No Watermarks
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            LocalStudio <span className="text-blue-600 dark:text-blue-400">Media Suite</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Surgically cut video clips without re-encoding quality loss, or extract pure WAV audio from video files directly inside your browser. Instant processing at hardware speeds.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center justify-between text-sm">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-bold ml-3 cursor-pointer">✕</button>
          </div>
        )}

        {/* Main Studio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          {/* Tool Switcher Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("video_cutter")}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition cursor-pointer ${
                activeTab === "video_cutter"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              ✂️ Lossless Video Cutter
            </button>
            <button
              onClick={() => setActiveTab("audio_extractor")}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition cursor-pointer ${
                activeTab === "audio_extractor"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              🎵 Audio Track Extractor (WAV)
            </button>
          </div>

          {/* File Upload Zone */}
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-violet-200 dark:border-violet-900 bg-violet-50/30 dark:bg-violet-950/20 hover:border-violet-500 rounded-2xl p-10 text-center cursor-pointer transition space-y-3"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*,audio/*"
                onChange={(e) => handleFileChange(e.target.files)}
                className="hidden"
              />
              <div className="text-4xl">🎬</div>
              <div className="font-semibold text-base">
                Drop your video or audio file here, or click to browse
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Supports MP4, WebM, MOV, MKV, and audio files. Your file stays 100% on your device.
              </p>
            </div>
          ) : (
            /* Active Media Workspace */
            <div className="space-y-6">
              {/* File Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  <span className="font-bold text-violet-600 dark:text-violet-400">📄 {selectedFile.name}</span>
                  <span className="text-slate-400">({formatBytes(selectedFile.size)})</span>
                  {videoMeta && (
                    <span className="hidden sm:inline text-slate-500 font-mono">
                      • {videoMeta.width}x{videoMeta.height} • {formatSeconds(videoMeta.duration)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setVideoMeta(null);
                    setSourceVideoUrl("");
                    setExportedUrl("");
                  }}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                >
                  Choose Different File
                </button>
              </div>

              {/* Video Player */}
              {sourceVideoUrl && (
                <div className="rounded-xl overflow-hidden bg-black aspect-video border border-slate-800 relative">
                  <video
                    ref={videoRef}
                    src={sourceVideoUrl}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* TAB 1: VIDEO CUTTER TIMELINE CONTROLS */}
              {activeTab === "video_cutter" && videoMeta && (
                <div className="space-y-5 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Current: <strong className="font-mono text-slate-900 dark:text-slate-100">{formatSeconds(currentTime)}</strong></span>
                    <span>Selection: <strong className="font-mono text-violet-600 dark:text-violet-400">{formatSeconds(trimRange.end - trimRange.start)}</strong></span>
                  </div>

                  {/* Range Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Start Timestamp:</span>
                        <span className="font-mono font-bold">{formatSeconds(trimRange.start)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={videoMeta.duration}
                        step={0.1}
                        value={trimRange.start}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setTrimRange((prev) => ({ ...prev, start: Math.min(val, prev.end - 0.5) }));
                          handleSeek(val);
                        }}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                      <button
                        onClick={handleSetStart}
                        className="w-full py-1.5 px-3 bg-white dark:bg-slate-800 border rounded text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        📍 Set Start to Playhead ({formatSeconds(currentTime)})
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">End Timestamp:</span>
                        <span className="font-mono font-bold">{formatSeconds(trimRange.end)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={videoMeta.duration}
                        step={0.1}
                        value={trimRange.end}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setTrimRange((prev) => ({ ...prev, end: Math.max(val, prev.start + 0.5) }));
                          handleSeek(val);
                        }}
                        className="w-full accent-violet-600 cursor-pointer"
                      />
                      <button
                        onClick={handleSetEnd}
                        className="w-full py-1.5 px-3 bg-white dark:bg-slate-800 border rounded text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        📍 Set End to Playhead ({formatSeconds(currentTime)})
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleExportTrimmed}
                      disabled={isProcessing}
                      className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-sm shadow transition disabled:opacity-50 active:scale-98 cursor-pointer"
                    >
                      {isProcessing ? `Trimming video... (${progressPercent}%)` : `Export Trimmed Clip (${formatSeconds(trimRange.start)} → ${formatSeconds(trimRange.end)})`}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: AUDIO EXTRACTOR */}
              {activeTab === "audio_extractor" && (
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-4 text-center">
                  <div className="text-3xl">🎙️</div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base">Extract Pure WAV Audio</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      Extracts uncompressed 16-bit PCM audio directly from your video file without re-encoding delays.
                    </p>
                  </div>
                  <button
                    onClick={handleExtractAudio}
                    disabled={isProcessing}
                    className="py-2.5 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-sm shadow transition disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? "Extracting audio..." : "Extract Audio Track Now"}
                  </button>
                </div>
              )}

              {/* Download Banner when complete */}
              {exportedUrl && (
                <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <div className="font-bold text-sm text-emerald-800 dark:text-emerald-200">
                        Export Ready ({formatBytes(exportedSize)})
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">
                        Processed 100% locally with zero server upload.
                      </div>
                    </div>
                  </div>
                  <a
                    href={exportedUrl}
                    download={`trimmed-${selectedFile.name.replace(/\.[^/.]+$/, "")}.${activeTab === "audio_extractor" ? "wav" : "webm"}`}
                    className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm shadow transition cursor-pointer"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">⚡</div>
            <h4 className="font-semibold text-sm">Instant 0.1s Trimming</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No waiting for cloud servers to re-encode your video. Slices frames directly using browser hardware acceleration.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">🔒</div>
            <h4 className="font-semibold text-sm">100% Client-Side Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Private home videos, confidential meeting recordings, and drone footage never leave your computer or touch our servers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="text-xl">💎</div>
            <h4 className="font-semibold text-sm">Zero Watermarks, 100% Free</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No forced trial subscriptions, no 5-minute length limits, and no ugly watermarks stamped onto your exported video clips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
