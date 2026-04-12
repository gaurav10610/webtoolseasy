"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Typography,
  Button,
  Slider,
  Alert,
  LinearProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { PaperWithChildren } from "../lib/papers";
import { SnackBarWithPosition } from "../lib/snackBar";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { ToolLayout } from "../common/ToolLayout";

interface ExtractedFrame {
  id: string;
  dataUrl: string;
  timestamp: number;
  filename: string;
}

type ImageFormat = "image/png" | "image/jpeg";

const dataUrlToBlob = (dataUrl: string): Blob => {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
};

export default function FrameExtractor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractProgress, setExtractProgress] = useState(0);
  const [error, setError] = useState("");
  const [imageFormat, setImageFormat] = useState<ImageFormat>("image/jpeg");
  const [jpegQuality, setJpegQuality] = useState(90);
  const [bulkFrameCount, setBulkFrameCount] = useState(10);
  const [bulkStartTime, setBulkStartTime] = useState(0);
  const [bulkEndTime, setBulkEndTime] = useState(0);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00.0";
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${String(secs).padStart(4, "0")}`;
  };

  const getExtension = () => (imageFormat === "image/png" ? "png" : "jpg");

  const handleFileSelect = useCallback((files: FileList) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    setExtractedFrames([]);
    setError("");
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const handleError = useCallback((msg: string) => setError(msg), []);

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration;
    setDuration(dur);
    setBulkEndTime(dur);
    setCurrentTime(0);
    video.currentTime = 0;
  };

  const captureCanvasFrame = (timestampSec: number): string => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return "";
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const quality =
      imageFormat === "image/jpeg" ? jpegQuality / 100 : undefined;
    return canvas.toDataURL(imageFormat, quality);
  };

  const captureCurrentFrame = () => {
    const video = videoRef.current;
    if (!video || !videoFile) return;
    const t = video.currentTime;
    const dataUrl = captureCanvasFrame(t);
    if (!dataUrl) return;
    const id = `frame-${Date.now()}`;
    const filename = `frame_${formatTime(t).replace(/[:.]/g, "-")}.${getExtension()}`;
    setExtractedFrames((prev) => [
      ...prev,
      { id, dataUrl, timestamp: t, filename },
    ]);
    setSnackBarMessage(`Frame captured at ${formatTime(t)}`);
    setIsSnackBarOpen(true);
  };

  const seekAndCapture = (time: number): Promise<string> =>
    new Promise((resolve) => {
      const video = videoRef.current;
      if (!video) {
        resolve("");
        return;
      }
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        resolve(captureCanvasFrame(time));
      };
      video.addEventListener("seeked", onSeeked);
      video.currentTime = time;
    });

  const bulkExtractFrames = async () => {
    const video = videoRef.current;
    if (!video || !videoFile) return;

    const count = Math.min(Math.max(1, bulkFrameCount), 500);
    const start = Math.max(0, bulkStartTime);
    const end = Math.min(duration, bulkEndTime);

    if (end <= start) {
      setError("End time must be greater than start time.");
      return;
    }

    setIsExtracting(true);
    setExtractProgress(0);
    setError("");

    const newFrames: ExtractedFrame[] = [];
    const interval = count === 1 ? 0 : (end - start) / (count - 1);

    for (let i = 0; i < count; i++) {
      const t = start + i * interval;
      const dataUrl = await seekAndCapture(Math.min(t, end));
      if (dataUrl) {
        const filename = `frame_${String(i + 1).padStart(4, "0")}_${formatTime(t).replace(/[:.]/g, "-")}.${getExtension()}`;
        newFrames.push({
          id: `bulk-${Date.now()}-${i}`,
          dataUrl,
          timestamp: t,
          filename,
        });
      }
      setExtractProgress(Math.round(((i + 1) / count) * 100));
    }

    setExtractedFrames((prev) => [...prev, ...newFrames]);
    setIsExtracting(false);
    setSnackBarMessage(
      `Extracted ${newFrames.length} frame${newFrames.length !== 1 ? "s" : ""}`,
    );
    setIsSnackBarOpen(true);
  };

  const downloadFrame = (frame: ExtractedFrame) => {
    const a = document.createElement("a");
    a.href = frame.dataUrl;
    a.download = frame.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllAsZip = async () => {
    if (extractedFrames.length === 0) return;
    const { BlobWriter, BlobReader, ZipWriter } =
      await import("@zip.js/zip.js");
    const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
    await Promise.all(
      extractedFrames.map((frame) => {
        const blob = dataUrlToBlob(frame.dataUrl);
        return zipWriter.add(frame.filename, new BlobReader(blob));
      }),
    );
    const blob = await zipWriter.close();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `frames_${videoFile?.name.replace(/\.[^.]+$/, "") ?? "video"}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeFrame = (id: string) =>
    setExtractedFrames((prev) => prev.filter((f) => f.id !== id));

  const clearAllFrames = () => setExtractedFrames([]);

  return (
    <ToolLayout>
      <div className="flex flex-col gap-4 w-full">
        {/* File Upload */}
        <FileUploadWithDragDrop
          accept="video/*"
          multiple={false}
          maxSize={FILE_SIZE_PRESETS.HUGE}
          allowedTypes={FILE_TYPE_PRESETS.VIDEOS}
          onFileSelect={handleFileSelect}
          onError={handleError}
          title="Upload a video to extract frames"
          subtitle="Supports MP4, WebM, AVI, MOV and other video formats"
          dragText="Drop video here"
          supportText="Maximum file size: 100MB"
        />

        {error && <Alert severity="error">{error}</Alert>}

        {videoUrl && (
          <>
            {/* Video Player */}
            <PaperWithChildren className="p-4" variant="elevation">
              <Typography variant="h6" className="mb-3">
                Video Preview
              </Typography>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full max-h-96 bg-black rounded"
                controls
                onLoadedMetadata={handleVideoLoaded}
                onTimeUpdate={() => {
                  if (videoRef.current)
                    setCurrentTime(videoRef.current.currentTime);
                }}
              />
              <canvas ref={canvasRef} className="hidden" />
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                className="mt-3 flex-wrap gap-2"
              >
                <Typography variant="body2" color="text.secondary">
                  Current: {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
                <Button
                  onClick={captureCurrentFrame}
                  startIcon={<PhotoCameraIcon />}
                  variant="contained"
                  disabled={!videoFile || isExtracting}
                >
                  Capture Frame
                </Button>
              </Stack>
            </PaperWithChildren>

            {/* Output Settings */}
            <PaperWithChildren className="p-4" variant="elevation">
              <Typography variant="h6" className="mb-3">
                Output Settings
              </Typography>
              <Stack spacing={3}>
                <div>
                  <Typography variant="body2" className="mb-1">
                    Image Format
                  </Typography>
                  <ToggleButtonGroup
                    value={imageFormat}
                    exclusive
                    onChange={(_, v) => v && setImageFormat(v as ImageFormat)}
                    size="small"
                  >
                    <ToggleButton value="image/jpeg">JPEG</ToggleButton>
                    <ToggleButton value="image/png">PNG</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {imageFormat === "image/jpeg" && (
                  <div>
                    <Typography variant="body2" className="mb-1">
                      JPEG Quality: {jpegQuality}%
                    </Typography>
                    <Slider
                      value={jpegQuality}
                      min={10}
                      max={100}
                      step={5}
                      onChange={(_, v) => setJpegQuality(v as number)}
                      sx={{ maxWidth: 300 }}
                    />
                  </div>
                )}
              </Stack>
            </PaperWithChildren>

            {/* Bulk Extraction */}
            <PaperWithChildren className="p-4" variant="elevation">
              <Typography variant="h6" className="mb-3">
                Bulk Frame Extraction
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} className="flex-wrap gap-3">
                  <TextField
                    label="Start Time (s)"
                    type="number"
                    value={bulkStartTime}
                    onChange={(e) =>
                      setBulkStartTime(
                        Math.max(0, parseFloat(e.target.value) || 0),
                      )
                    }
                    inputProps={{ min: 0, max: duration, step: 0.1 }}
                    size="small"
                    sx={{ width: 140 }}
                  />
                  <TextField
                    label="End Time (s)"
                    type="number"
                    value={bulkEndTime}
                    onChange={(e) =>
                      setBulkEndTime(
                        Math.min(duration, parseFloat(e.target.value) || 0),
                      )
                    }
                    inputProps={{ min: 0, max: duration, step: 0.1 }}
                    size="small"
                    sx={{ width: 140 }}
                  />
                  <TextField
                    label="Number of Frames"
                    type="number"
                    value={bulkFrameCount}
                    onChange={(e) =>
                      setBulkFrameCount(
                        Math.min(
                          500,
                          Math.max(1, parseInt(e.target.value, 10) || 1),
                        ),
                      )
                    }
                    inputProps={{ min: 1, max: 500 }}
                    size="small"
                    sx={{ width: 160 }}
                  />
                </Stack>

                {isExtracting && (
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={extractProgress}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Extracting frames... {extractProgress}%
                    </Typography>
                  </Box>
                )}

                <Button
                  onClick={bulkExtractFrames}
                  startIcon={<BurstModeIcon />}
                  variant="contained"
                  color="secondary"
                  disabled={isExtracting || !videoFile}
                >
                  {isExtracting ? "Extracting..." : "Extract Frames"}
                </Button>
              </Stack>
            </PaperWithChildren>

            {/* Extracted Frames Gallery */}
            {extractedFrames.length > 0 && (
              <PaperWithChildren className="p-4" variant="elevation">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                  <Typography variant="h6">
                    Extracted Frames ({extractedFrames.length})
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      onClick={downloadAllAsZip}
                      startIcon={<FolderZipIcon />}
                      variant="contained"
                      size="small"
                    >
                      Download All as ZIP
                    </Button>
                    <Button
                      onClick={clearAllFrames}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Clear All
                    </Button>
                  </Stack>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {extractedFrames.map((frame) => (
                    <Card key={frame.id} className="group relative">
                      <CardMedia
                        component="img"
                        image={frame.dataUrl}
                        alt={frame.filename}
                        className="aspect-video object-cover"
                      />
                      <CardContent className="p-2">
                        <Typography
                          variant="caption"
                          className="block truncate text-gray-500"
                        >
                          {formatTime(frame.timestamp)}
                        </Typography>
                        <Stack direction="row" spacing={0.5} className="mt-1">
                          <IconButton
                            size="small"
                            onClick={() => downloadFrame(frame)}
                            color="primary"
                            title="Download frame"
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => removeFrame(frame.id)}
                            color="error"
                            title="Remove frame"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </PaperWithChildren>
            )}
          </>
        )}

        <SnackBarWithPosition
          open={isSnackBarOpen}
          autoHideDuration={3000}
          handleClose={() => setIsSnackBarOpen(false)}
          message={snackBarMessage}
          color="success"
          vertical="bottom"
          horizontal="center"
        />
      </div>
    </ToolLayout>
  );
}
