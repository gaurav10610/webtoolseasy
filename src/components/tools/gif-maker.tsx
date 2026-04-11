"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  Slider,
  TextField,
  LinearProgress,
  Box,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import GifIcon from "@mui/icons-material/Gif";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { FileUploadWithDragDrop } from "../lib/fileUpload";

// ============================================================
// GIF89a encoder — pure JS, no external dependencies
// Uses 3:3:2 fixed 256-colour palette + LZW compression
// ============================================================

/** 3:3:2 packed 256-color palette (RGB triplets) */
const PALETTE_332 = (() => {
  const p = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const r = (i >> 5) & 7;
    const g = (i >> 2) & 7;
    const b = i & 3;
    p[i * 3] = Math.round((r / 7) * 255);
    p[i * 3 + 1] = Math.round((g / 7) * 255);
    p[i * 3 + 2] = Math.round((b / 3) * 255);
  }
  return p;
})();

/** Map RGBA ImageData → 8-bit palette indices using 3:3:2 quantization */
function quantizeFrame(imageData: ImageData): Uint8Array {
  const { data, width, height } = imageData;
  const n = width * height;
  const idx = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    idx[i] = ((r >> 5) << 5) | ((g >> 5) << 2) | (b >> 6);
  }
  return idx;
}

/** GIF-variant LZW encoder */
function lzwEncode(pixels: Uint8Array, minCodeSize: number): Uint8Array {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  const HASH = 8191; // prime, load < 0.5 for ≤4096 entries

  const output: number[] = [];
  let buf = 0,
    bufLen = 0;

  const write = (code: number, bits: number) => {
    buf |= code << bufLen;
    bufLen += bits;
    while (bufLen >= 8) {
      output.push(buf & 0xff);
      buf = (buf >>> 8) & 0x00ffffff;
      bufLen -= 8;
    }
  };

  // Per-encode fresh hash tables (avoids fill cost for large resets)
  const hKey = new Int32Array(HASH).fill(-1);
  const hVal = new Uint16Array(HASH);

  const slot = (key: number) => {
    let h = (key ^ (key >>> 8)) % HASH;
    while (hKey[h] !== -1) h = (h + 1) % HASH;
    return h;
  };
  const lookup = (key: number): number => {
    let h = (key ^ (key >>> 8)) % HASH;
    while (hKey[h] !== -1) {
      if (hKey[h] === key) return hVal[h];
      h = (h + 1) % HASH;
    }
    return -1;
  };

  let codeSize = minCodeSize + 1;
  let nextCode = endCode + 1;

  const reset = () => {
    hKey.fill(-1);
    codeSize = minCodeSize + 1;
    nextCode = endCode + 1;
  };

  write(clearCode, codeSize);
  let prefix = pixels[0];

  for (let i = 1; i < pixels.length; i++) {
    const color = pixels[i];
    const key = (prefix << 8) | color;
    const code = lookup(key);

    if (code >= 0) {
      prefix = code;
    } else {
      write(prefix, codeSize);
      if (nextCode < 4096) {
        const h = slot(key);
        hKey[h] = key;
        hVal[h] = nextCode++;
        if (nextCode > 1 << codeSize) codeSize = Math.min(12, codeSize + 1);
      } else {
        write(clearCode, codeSize);
        reset();
      }
      prefix = color;
    }
  }

  write(prefix, codeSize);
  write(endCode, codeSize);
  if (bufLen > 0) output.push(buf & 0xff);

  return new Uint8Array(output);
}

function u16le(v: number): number[] {
  return [v & 0xff, (v >> 8) & 0xff];
}

/** Assemble a GIF89a blob from pre-quantised frames */
function buildGIF(
  frames: Uint8Array[],
  width: number,
  height: number,
  delayCs: number,
): Blob {
  const parts: Uint8Array[] = [];
  const push = (n: number[]) => parts.push(new Uint8Array(n));

  // Header + Logical Screen Descriptor + Global CT
  push([71, 73, 70, 56, 57, 97]); // "GIF89a"
  push([
    ...u16le(width),
    ...u16le(height),
    0b11110111, // global CT flag=1, colorRes=7, sort=0, ctSize=7 → 256 entries
    0,
    0,
  ]);
  parts.push(PALETTE_332);

  // Netscape loop extension (infinite looping)
  push([
    0x21,
    0xff,
    11,
    78,
    69,
    84,
    83,
    67,
    65,
    80,
    69,
    50,
    46,
    48, // "NETSCAPE2.0"
    3,
    1,
    0,
    0,
    0,
  ]);

  const minCodeSize = 8;

  for (const indexed of frames) {
    // Graphic Control Extension
    push([
      0x21,
      0xf9,
      4,
      0b00000100, // disposal = do-not-dispose
      ...u16le(delayCs), // delay in 1/100 s
      0,
      0,
    ]);

    // Image Descriptor (full canvas, no local CT)
    push([
      0x2c,
      ...u16le(0),
      ...u16le(0),
      ...u16le(width),
      ...u16le(height),
      0,
    ]);

    // LZW data in 255-byte sub-blocks
    const lzw = lzwEncode(indexed, minCodeSize);
    const blocks: number[] = [minCodeSize];
    for (let i = 0; i < lzw.length; i += 255) {
      const sz = Math.min(255, lzw.length - i);
      blocks.push(sz);
      for (let j = 0; j < sz; j++) blocks.push(lzw[i + j]);
    }
    blocks.push(0); // block terminator
    push(blocks);
  }

  push([0x3b]); // GIF trailer

  const total = parts.reduce((s, p) => s + p.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return new Blob([out], { type: "image/gif" });
}

// ============================================================
// Seek-based frame extraction from a video File
// ============================================================
async function extractFrames(
  file: File,
  startTime: number,
  duration: number,
  fps: number,
  targetWidth: number,
  onProgress: (pct: number) => void,
  signal: AbortSignal,
): Promise<{ frames: Uint8Array[]; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    video.preload = "metadata";
    video.muted = true;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.src = "";
    };

    signal.addEventListener("abort", () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    });

    video.onloadedmetadata = async () => {
      const aspect = video.videoHeight / Math.max(1, video.videoWidth);
      const outW = targetWidth;
      const outH = Math.round(outW * aspect);
      const canvas = document.createElement("canvas");
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d")!;

      const totalFrames = Math.max(1, Math.floor(duration * fps));
      const frameInterval = 1 / fps;
      const result: Uint8Array[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (signal.aborted) {
          cleanup();
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }

        video.currentTime = startTime + i * frameInterval;

        await new Promise<void>((res, rej) => {
          const t = setTimeout(() => res(), 4000); // timeout for stuck seeks
          video.onseeked = () => {
            clearTimeout(t);
            res();
          };
          video.onerror = () => {
            clearTimeout(t);
            rej(new Error("Seek failed"));
          };
        });

        ctx.drawImage(video, 0, 0, outW, outH);
        result.push(quantizeFrame(ctx.getImageData(0, 0, outW, outH)));
        onProgress(Math.round(((i + 1) / totalFrames) * 90)); // 90% for extraction
      }

      cleanup();
      resolve({ frames: result, width: outW, height: outH });
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Failed to load video"));
    };
  });
}

// ============================================================
// React component
// ============================================================
enum ProcessingState {
  IDLE = "idle",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

export default function GIFMaker({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({ hostname: hostname || "", queryParams });

  const [processingState, setProcessingState] = useState(ProcessingState.IDLE);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [gifBlob, setGifBlob] = useState<Blob | null>(null);
  const [gifUrl, setGifUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState<number | null>(null);

  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(320);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(3);
  const [videoDuration, setVideoDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifUrl) URL.revokeObjectURL(gifUrl);
      abortRef.current?.abort();
    };
  }, [videoUrl, gifUrl]);

  useEffect(() => {
    if (
      processingState !== ProcessingState.PROCESSING ||
      progress <= 0 ||
      !startedAtRef.current
    ) {
      if (processingState !== ProcessingState.PROCESSING) {
        setEtaSeconds(null);
      }
      return;
    }

    const elapsed = (Date.now() - startedAtRef.current) / 1000;
    const remaining = Math.max(
      0,
      Math.round((elapsed / Math.max(progress, 1)) * (100 - progress)),
    );
    setEtaSeconds(remaining);
  }, [progress, processingState]);

  const handleFileUpload = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return;
      }
      setVideoFile(file);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoUrl(URL.createObjectURL(file));
      setError("");
      setGifBlob(null);
      if (gifUrl) URL.revokeObjectURL(gifUrl);
      setGifUrl("");
      setProcessingState(ProcessingState.IDLE);
      setEtaSeconds(null);
      toolState.actions.showMessage("Video loaded");
    },
    [videoUrl, gifUrl, toolState.actions],
  );

  const handleVideoLoaded = useCallback(() => {
    if (videoRef.current) {
      const d = videoRef.current.duration;
      setVideoDuration(d);
      setDuration(Math.min(3, d));
    }
  }, []);

  const createGIF = useCallback(async () => {
    if (!videoFile) {
      toolState.actions.showMessage("Please upload a video first");
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setProcessingState(ProcessingState.PROCESSING);
    setError("");
    setProgress(0);
    setEtaSeconds(null);
    startedAtRef.current = Date.now();

    try {
      const {
        frames,
        width: outW,
        height: outH,
      } = await extractFrames(
        videoFile,
        startTime,
        duration,
        fps,
        width,
        setProgress,
        ac.signal,
      );

      setProgress(95);
      const delayCs = Math.max(2, Math.round(100 / fps));
      const blob = buildGIF(frames, outW, outH, delayCs);
      setProgress(100);

      if (gifUrl) URL.revokeObjectURL(gifUrl);
      const url = URL.createObjectURL(blob);
      setGifBlob(blob);
      setGifUrl(url);
      setProcessingState(ProcessingState.COMPLETED);
      toolState.actions.showMessage("GIF created successfully!");
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Failed to create GIF";
      setError(msg);
      setProcessingState(ProcessingState.IDLE);
      toolState.actions.showMessage("Failed to create GIF");
    }
  }, [videoFile, startTime, duration, fps, width, gifUrl, toolState.actions]);

  const downloadGIF = useCallback(() => {
    if (!gifBlob) return;
    const a = document.createElement("a");
    a.href = gifUrl;
    a.download = `animated-${Date.now()}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toolState.actions.showMessage("GIF downloaded!");
  }, [gifBlob, gifUrl, toolState.actions]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setVideoFile(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl("");
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setGifUrl("");
    setGifBlob(null);
    setProcessingState(ProcessingState.IDLE);
    setError("");
    setProgress(0);
    setFps(10);
    setWidth(320);
    setStartTime(0);
    setDuration(3);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [videoUrl, gifUrl]);

  const buttons = useMemo(() => {
    const common = createCommonButtons({});
    const upload = {
      type: "custom" as const,
      text: "Upload Video",
      onClick: () => fileInputRef.current?.click(),
      icon: <UploadIcon />,
      disabled: processingState === ProcessingState.PROCESSING,
    };

    if (processingState === ProcessingState.IDLE) {
      return [
        upload,
        {
          type: "custom" as const,
          text: "Create GIF",
          onClick: createGIF,
          icon: <GifIcon />,
          disabled: !videoFile,
        },
        ...common,
      ];
    }
    if (processingState === ProcessingState.PROCESSING) {
      return [
        {
          type: "custom" as const,
          text: "Creating GIF…",
          onClick: () => {},
          icon: <GifIcon />,
          disabled: true,
        },
        ...common,
      ];
    }
    return [
      upload,
      {
        type: "custom" as const,
        text: "Download GIF",
        onClick: downloadGIF,
        icon: <DownloadIcon />,
      },
      {
        type: "custom" as const,
        text: "Create Another",
        onClick: reset,
        icon: <GifIcon />,
      },
      ...common,
    ];
  }, [processingState, videoFile, createGIF, downloadGIF, reset]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
<input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {!videoFile && processingState === ProcessingState.IDLE && (
          <FileUploadWithDragDrop
            accept="video/*"
            multiple={false}
            onFileSelect={(files) =>
              handleFileUpload({
                target: { files },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            title="Upload Video to Make a GIF"
            subtitle="Drag and drop your video here or click to browse"
            supportText="Select a short clip, preview it, then export an animated GIF"
          />
        )}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {processingState === ProcessingState.PROCESSING && (
          <Box>
            <Typography variant="body2" className="mb-1">
              Creating GIF… {progress}%
              {etaSeconds !== null ? ` • ETA ~${etaSeconds}s` : ""}
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        {videoFile && processingState !== ProcessingState.PROCESSING && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                GIF Settings
              </Typography>
              <div className="space-y-6">
                <div>
                  <Typography variant="body2" className="mb-2">
                    Frame Rate (FPS): {fps}
                  </Typography>
                  <Slider
                    value={fps}
                    onChange={(_, v) => setFps(v as number)}
                    min={5}
                    max={25}
                    step={1}
                    marks={[
                      { value: 5, label: "5" },
                      { value: 10, label: "10" },
                      { value: 15, label: "15" },
                      { value: 25, label: "25" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Higher FPS = smoother animation but larger file
                  </Typography>
                </div>

                <div>
                  <Typography variant="body2" className="mb-2">
                    Output Width (px): {width}
                  </Typography>
                  <Slider
                    value={width}
                    onChange={(_, v) => setWidth(v as number)}
                    min={160}
                    max={800}
                    step={40}
                    marks={[
                      { value: 160, label: "160" },
                      { value: 320, label: "320" },
                      { value: 480, label: "480" },
                      { value: 640, label: "640" },
                      { value: 800, label: "800" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Smaller width = smaller file size
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Start Time (s)"
                    type="number"
                    size="small"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    inputProps={{ min: 0, max: videoDuration, step: 0.1 }}
                    fullWidth
                  />
                  <TextField
                    label="Duration (s)"
                    type="number"
                    size="small"
                    value={duration}
                    onChange={(e) =>
                      setDuration(
                        Math.max(0.5, parseFloat(e.target.value) || 1),
                      )
                    }
                    inputProps={{ min: 0.5, max: 15, step: 0.5 }}
                    fullWidth
                  />
                </div>

                {videoDuration > 0 && (
                  <Typography variant="caption" className="text-gray-500">
                    Video: {videoDuration.toFixed(1)}s | Clip:{" "}
                    {startTime.toFixed(1)}s →{" "}
                    {(startTime + duration).toFixed(1)}s (
                    {Math.floor(duration * fps)} frames)
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {videoUrl && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Video Preview
              </Typography>
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                onLoadedMetadata={handleVideoLoaded}
                className="w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {gifUrl && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                GIF Preview
              </Typography>
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gifUrl}
                  alt="Generated GIF"
                  className="max-w-full rounded-lg"
                />
              </div>
              {gifBlob && (
                <Typography variant="body2" className="mt-4 text-gray-600">
                  File size: {(gifBlob.size / 1024).toFixed(0)} KB
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
