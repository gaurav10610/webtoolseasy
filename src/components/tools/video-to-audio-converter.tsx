"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Typography,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AddIcon from "@mui/icons-material/Add";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { ToolLayout, SEOContent } from "@/components/common/ToolLayout";
import { formatBytes } from "@/util/commonUtils";

// ---------------------------------------------------------------------------
// WAV encoder: converts an AudioBuffer to a WAV ArrayBuffer (16-bit PCM)
// ---------------------------------------------------------------------------
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const dataLength = numFrames * numChannels * bytesPerSample;
  const wav = new ArrayBuffer(44 + dataLength);
  const view = new DataView(wav);

  const ws = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };

  ws(0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  ws(8, "WAVE");
  ws(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
  view.setUint16(32, numChannels * bytesPerSample, true);
  view.setUint16(34, bitsPerSample, true);
  ws(36, "data");
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const s = buffer.getChannelData(ch)[i];
      const clamped = Math.max(-1, Math.min(1, s));
      view.setInt16(offset, clamped < 0 ? clamped * 32768 : clamped * 32767, true);
      offset += 2;
    }
  }
  return wav;
}

// ---------------------------------------------------------------------------
// Fast path: AudioContext.decodeAudioData → WAV (no real-time playback needed)
// ---------------------------------------------------------------------------
async function extractAudioFast(
  file: File,
): Promise<{ blob: Blob; ext: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext();
  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const wavBuffer = audioBufferToWav(audioBuffer);
    return { blob: new Blob([wavBuffer], { type: "audio/wav" }), ext: "wav" };
  } finally {
    await audioCtx.close();
  }
}

// ---------------------------------------------------------------------------
// Realtime fallback: play video silently and capture audio via MediaRecorder
// ---------------------------------------------------------------------------
async function extractAudioRealtime(
  file: File,
  onProgress: (pct: number) => void,
  signal: AbortSignal,
): Promise<{ blob: Blob; ext: string }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    video.preload = "metadata";

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.src = "";
    };

    signal.addEventListener("abort", () => {
      video.pause();
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    });

    video.onloadedmetadata = () => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(video);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);

      const mimeType =
        ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4"]
          .find((m) => MediaRecorder.isTypeSupported(m)) ?? "audio/webm";
      const ext = mimeType.includes("ogg")
        ? "ogg"
        : mimeType.includes("mp4")
          ? "m4a"
          : "webm";

      const rec = new MediaRecorder(dest.stream, { mimeType });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = () => {
        audioCtx.close();
        cleanup();
        resolve({ blob: new Blob(chunks, { type: mimeType }), ext });
      };

      rec.start(500);

      video.ontimeupdate = () => {
        if (video.duration > 0) {
          onProgress(Math.round((video.currentTime / video.duration) * 100));
        }
      };

      video.onended = () => {
        if (rec.state === "recording") rec.stop();
      };

      video.onerror = () => {
        if (rec.state === "recording") rec.stop();
        cleanup();
        reject(new Error("Video playback error"));
      };

      // Mute speakers — audio routed to AudioContext only
      video.muted = true;
      video.play().catch(reject);
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Failed to load video file"));
    };
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface AudioEntry {
  id: string;
  file: File;
  status: "idle" | "processing" | "done" | "error";
  progress: number;
  resultBlob?: Blob;
  resultExt?: string;
  error?: string;
}

export default function VideoToAudioConverter() {
  const [entries, setEntries] = useState<AudioEntry[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [audioFormat, setAudioFormat] = useState<"wav" | "webm" | "ogg">("wav");
  const abortRefs = useRef<Map<string, AbortController>>(new Map());

  const showMsg = useCallback((msg: string) => {
    setSnackMsg(msg);
    setSnackOpen(true);
  }, []);

  useEffect(() => {
    const refs = abortRefs.current;
    return () => {
      refs.forEach((c) => c.abort());
    };
  }, []);

  const handleFileSelect = useCallback((fileList: FileList) => {
    const fresh: AudioEntry[] = Array.from(fileList).map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      status: "idle" as const,
      progress: 0,
    }));
    setEntries((prev) => [...prev, ...fresh]);
  }, []);

  const openFilePicker = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.multiple = true;
    input.onchange = (e) => {
      const el = e.target as HTMLInputElement;
      if (el.files) handleFileSelect(el.files);
    };
    input.click();
  }, [handleFileSelect]);

  const convert = useCallback(async (id: string) => {
    const ac = new AbortController();
    abortRefs.current.set(id, ac);

    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "processing", progress: 0, error: undefined } : e,
      ),
    );

    try {
      const entry = entries.find((e) => e.id === id);
      if (!entry) return;

      let result: { blob: Blob; ext: string };

      if (audioFormat === "wav") {
        // Fast path via AudioContext — always produces WAV
        try {
          result = await extractAudioFast(entry.file);
        } catch {
          result = await extractAudioRealtime(
            entry.file,
            (pct) => setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, progress: pct } : e))),
            ac.signal,
          );
        }
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, progress: 100 } : e)));
      } else {
        // Realtime path for webm/ogg — override mimeType to match user's choice
        const preferredMime = audioFormat === "ogg" ? "audio/ogg;codecs=opus" : "audio/webm;codecs=opus";
        const mimeType = MediaRecorder.isTypeSupported(preferredMime) ? preferredMime : "audio/webm";
        result = await extractAudioRealtime(
          entry.file,
          (pct) => setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, progress: pct } : e))),
          ac.signal,
        );
        // Re-wrap with the selected extension label
        result = { blob: new Blob([await result.blob.arrayBuffer()], { type: mimeType }), ext: audioFormat };
      }

      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, status: "done", progress: 100, resultBlob: result.blob, resultExt: result.ext }
            : e,
        ),
      );
      showMsg("Audio extracted successfully!");
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Extraction failed";
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "error", error: msg } : e)),
      );
      showMsg("Extraction failed");
    } finally {
      abortRefs.current.delete(id);
    }
  }, [entries, audioFormat, showMsg]);

  const download = useCallback((entry: AudioEntry) => {
    if (!entry.resultBlob) return;
    const url = URL.createObjectURL(entry.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.file.name.replace(/\.[^.]+$/, "")}-audio.${entry.resultExt ?? "wav"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const removeEntry = useCallback((id: string) => {
    abortRefs.current.get(id)?.abort();
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const convertAll = useCallback(() => {
    entries
      .filter((e) => e.status === "idle" || e.status === "error")
      .forEach((e) => convert(e.id));
  }, [entries, convert]);

  const hasConvertible = entries.some((e) => e.status === "idle" || e.status === "error");

  return (
    <ToolLayout
      snackBar={{ open: snackOpen, message: snackMsg, onClose: () => setSnackOpen(false) }}
    >
      <SEOContent
        title="Video to Audio Converter"
        description="Extract audio from video files directly in your browser. Supports MP4, WebM, MOV and more. No upload — 100% private."
        exampleCode="Upload video → Extract → Download WAV audio"
        exampleOutput="WAV audio file extracted from the video"
      />

      {entries.length === 0 ? (
        <FileUploadWithDragDrop
          accept="video/*"
          multiple
          onFileSelect={handleFileSelect}
          title="Upload Videos to Extract Audio"
          subtitle="Drag and drop video files here or click to browse"
          supportText="MP4, WebM, MOV, AVI and more — processed 100% in your browser"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Typography variant="h6">
              {entries.length} file{entries.length !== 1 ? "s" : ""}
            </Typography>
            <div className="flex gap-2 items-center">
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Output Format</InputLabel>
                <Select
                  value={audioFormat}
                  label="Output Format"
                  onChange={(e) => setAudioFormat(e.target.value as "wav" | "webm" | "ogg")}
                >
                  <MenuItem value="wav">WAV</MenuItem>
                  <MenuItem value="webm">WebM</MenuItem>
                  <MenuItem value="ogg">OGG</MenuItem>
                </Select>
              </FormControl>
              {hasConvertible && (
                <Button variant="contained" startIcon={<AudiotrackIcon />} onClick={convertAll}>
                  Convert All
                </Button>
              )}
              <Button variant="outlined" startIcon={<AddIcon />} onClick={openFilePicker}>
                Add More
              </Button>
            </div>
          </div>

          {entries.map((entry) => (
            <Card key={entry.id} variant="outlined">
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <VideoLibraryIcon color="warning" />
                    <div className="min-w-0">
                      <Typography variant="body2" className="font-medium truncate">
                        {entry.file.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatBytes(entry.file.size)}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {entry.status === "done" && (
                      <Chip
                        label={`.${entry.resultExt?.toUpperCase() ?? "WAV"}`}
                        color="success"
                        size="small"
                      />
                    )}
                    {(entry.status === "idle" || entry.status === "error") && (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<AudiotrackIcon />}
                        onClick={() => convert(entry.id)}
                        color={entry.status === "error" ? "error" : "primary"}
                      >
                        {entry.status === "error" ? "Retry" : "Extract"}
                      </Button>
                    )}
                    {entry.status === "done" && (
                      <Tooltip title="Download audio">
                        <IconButton size="small" color="success" onClick={() => download(entry)}>
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Remove">
                      <IconButton size="small" onClick={() => removeEntry(entry.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                {entry.status === "processing" && (
                  <div>
                    <LinearProgress
                      variant={entry.progress > 0 ? "determinate" : "indeterminate"}
                      value={entry.progress}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {entry.progress > 0 ? `${entry.progress}%` : "Extracting audio..."}
                    </Typography>
                  </div>
                )}

                {entry.status === "error" && (
                  <Alert severity="error" sx={{ py: 0 }}>
                    {entry.error}
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
