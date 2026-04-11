"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Typography, Card, CardContent, Alert, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import CompressIcon from "@mui/icons-material/Compress";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SelectWithLabel } from "../lib/select";

enum ProcessingState {
  IDLE = "idle",
  LOADING = "loading",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

enum CompressionLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CUSTOM = "custom",
}

interface CompressionSettings {
  level: CompressionLevel;
  resolution: string;
  bitrate: number;
}

export default function VideoCompressor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [processingState, setProcessingState] = useState<ProcessingState>(
    ProcessingState.IDLE,
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const [settings, setSettings] = useState<CompressionSettings>({
    level: CompressionLevel.MEDIUM,
    resolution: "original",
    bitrate: 1500,
  });

  const [compressedExtension, setCompressedExtension] = useState("mp4");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Get bitrate based on compression level
  const getBitrateForLevel = useCallback((level: CompressionLevel): number => {
    switch (level) {
      case CompressionLevel.LOW:
        return 2500;
      case CompressionLevel.MEDIUM:
        return 1500;
      case CompressionLevel.HIGH:
        return 800;
      default:
        return 1500;
    }
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return;
      }

      setVideoFile(file);
      setOriginalSize(file.size);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setError("");
      setCompressedBlob(null);
      setCompressedUrl("");
      setCompressedSize(0);
      toolState.actions.showMessage("Video loaded successfully");
    },
    [toolState.actions],
  );

  // Compress video using Canvas + MediaRecorder (no FFmpeg/WASM)
  const compressVideo = useCallback(async () => {
    if (!videoFile || !videoRef.current) {
      toolState.actions.showMessage("Please upload a video first");
      return;
    }

    const video = videoRef.current;

    try {
      setProcessingState(ProcessingState.PROCESSING);
      setError("");
      setProgress("Preparing...");

      // Determine output dimensions
      const srcW = video.videoWidth || 1280;
      const srcH = video.videoHeight || 720;
      const outW =
        settings.resolution === "original"
          ? srcW
          : parseInt(settings.resolution, 10);
      const outH =
        settings.resolution === "original"
          ? srcH
          : Math.round((outW / srcW) * srcH);

      const canvas = document.createElement("canvas");
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d")!;

      // Canvas stream for video frames
      const canvasStream = canvas.captureStream(30);

      // Capture audio from the video element
      const rawStream = (
        video as HTMLVideoElement & { captureStream?: () => MediaStream }
      ).captureStream?.();
      if (rawStream) {
        rawStream
          .getAudioTracks()
          .forEach((t) => canvasStream.addTrack(t.clone()));
      }

      // Choose supported MIME type – prefer MP4 for seekability
      const mimeType =
        ["video/mp4", "video/webm;codecs=vp9,opus", "video/webm"].find((m) =>
          MediaRecorder.isTypeSupported(m),
        ) ?? "video/webm";
      const extension = mimeType.startsWith("video/mp4") ? "mp4" : "webm";
      setCompressedExtension(extension);

      const recorder = new MediaRecorder(canvasStream, {
        mimeType,
        videoBitsPerSecond: settings.bitrate * 1000,
        audioBitsPerSecond: 128_000,
      });
      mediaRecorderRef.current = recorder;

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const completionPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
      });

      recorder.start(500);

      // Mute the element itself so we don't double-play audio through speakers
      video.muted = true;
      video.currentTime = 0;
      await new Promise<void>((resolve) => {
        if (video.readyState >= 3) {
          resolve();
          return;
        }
        video.oncanplay = () => resolve();
      });

      let animFrameId: number;
      const drawFrame = () => {
        if (!video.ended) {
          ctx.drawImage(video, 0, 0, outW, outH);
          if (video.duration > 0) {
            setProgress(
              `Compressing: ${Math.round((video.currentTime / video.duration) * 100)}%`,
            );
          }
          animFrameId = requestAnimationFrame(drawFrame);
        }
      };

      video.onended = () => {
        ctx.drawImage(video, 0, 0, outW, outH);
        cancelAnimationFrame(animFrameId);
        if (recorder.state === "recording") recorder.stop();
      };

      animFrameId = requestAnimationFrame(drawFrame);
      await video.play();

      const blob = await completionPromise;

      // Restore video element
      video.muted = false;

      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setProcessingState(ProcessingState.COMPLETED);
      setProgress("");

      const reduction = ((1 - blob.size / originalSize) * 100).toFixed(1);
      toolState.actions.showMessage(
        `Video compressed! Size reduced by ${reduction}%`,
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to compress video";
      setError(errorMessage);
      setProcessingState(ProcessingState.IDLE);
      setProgress("");
      if (videoRef.current) videoRef.current.muted = false;
      toolState.actions.showMessage("Failed to compress video");
    }
  }, [videoFile, settings, originalSize, toolState.actions]);

  // Download compressed video
  const downloadVideo = useCallback(() => {
    if (!compressedBlob) {
      toolState.actions.showMessage("No compressed video to download");
      return;
    }

    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed-${Date.now()}.${compressedExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toolState.actions.showMessage("Video downloaded successfully!");
  }, [compressedBlob, compressedUrl, compressedExtension, toolState.actions]);

  // Reset
  const reset = useCallback(() => {
    setVideoFile(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl("");
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setCompressedUrl("");
    setCompressedBlob(null);
    setProcessingState(ProcessingState.IDLE);
    setError("");
    setProgress("");
    setOriginalSize(0);
    setCompressedSize(0);
    setSettings({
      level: CompressionLevel.MEDIUM,
      resolution: "original",
      bitrate: 1500,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [videoUrl, compressedUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [videoUrl, compressedUrl]);

  // Handle compression level change
  const handleLevelChange = useCallback(
    (level: CompressionLevel) => {
      setSettings((prev) => ({
        ...prev,
        level,
        bitrate:
          level !== CompressionLevel.CUSTOM
            ? getBitrateForLevel(level)
            : prev.bitrate,
      }));
    },
    [getBitrateForLevel],
  );

  // Format file size
  const formatSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  // Button configuration
  const buttons = useMemo(() => {
    const commonButtons = createCommonButtons({});

    const uploadButton = {
      type: "custom" as const,
      text: "Upload Video",
      onClick: () => fileInputRef.current?.click(),
      icon: <UploadIcon />,
      disabled: processingState === ProcessingState.PROCESSING,
    };

    if (
      processingState === ProcessingState.IDLE ||
      processingState === ProcessingState.LOADING
    ) {
      return [
        uploadButton,
        {
          type: "custom" as const,
          text: "Compress Video",
          onClick: compressVideo,
          icon: <CompressIcon />,
          disabled: !videoFile || processingState === ProcessingState.LOADING,
        },
        ...commonButtons,
      ];
    }

    if (processingState === ProcessingState.PROCESSING) {
      return [
        {
          type: "custom" as const,
          text: "Compressing...",
          onClick: () => {},
          icon: <CompressIcon />,
          disabled: true,
        },
        ...commonButtons,
      ];
    }

    if (processingState === ProcessingState.COMPLETED) {
      return [
        uploadButton,
        {
          type: "custom" as const,
          text: "Download Video",
          onClick: downloadVideo,
          icon: <DownloadIcon />,
        },
        {
          type: "custom" as const,
          text: "Compress Another",
          onClick: reset,
          icon: <CompressIcon />,
        },
        ...commonButtons,
      ];
    }

    return commonButtons;
  }, [processingState, videoFile, compressVideo, downloadVideo, reset]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Video Compressor"
        description="Compress video files to reduce size while maintaining quality. Support for all formats with adjustable compression levels and resolution."
        exampleCode="Upload video → Select compression level → Compress → Download"
        exampleOutput="Smaller MP4 video files optimized for sharing and storage"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Progress Display */}
        {progress && <Alert severity="info">{progress}</Alert>}

        {/* File Size Comparison */}
        {originalSize > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                File Size Comparison
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Typography variant="body2" className="text-gray-600">
                    Original Size
                  </Typography>
                  <Typography variant="h6" className="text-blue-600">
                    {formatSize(originalSize)}
                  </Typography>
                </div>
                {compressedSize > 0 && (
                  <>
                    <div>
                      <Typography variant="body2" className="text-gray-600">
                        Compressed Size
                      </Typography>
                      <Typography variant="h6" className="text-green-600">
                        {formatSize(compressedSize)}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-600">
                        Size Reduction
                      </Typography>
                      <Typography variant="h6" className="text-purple-600">
                        {((1 - compressedSize / originalSize) * 100).toFixed(1)}
                        %
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Settings */}
        {videoFile && processingState !== ProcessingState.PROCESSING && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Compression Settings
              </Typography>

              <div className="space-y-4">
                <SelectWithLabel
                  selectLabel="Compression Level"
                  value={settings.level}
                  onChange={(e) =>
                    handleLevelChange(e.target.value as CompressionLevel)
                  }
                  options={[
                    {
                      key: "low",
                      value: CompressionLevel.LOW,
                      label: "Low (Highest Quality)",
                    },
                    {
                      key: "medium",
                      value: CompressionLevel.MEDIUM,
                      label: "Medium (Balanced)",
                    },
                    {
                      key: "high",
                      value: CompressionLevel.HIGH,
                      label: "High (Smallest Size)",
                    },
                    {
                      key: "custom",
                      value: CompressionLevel.CUSTOM,
                      label: "Custom",
                    },
                  ]}
                />

                <SelectWithLabel
                  selectLabel="Resolution"
                  value={settings.resolution}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      resolution: e.target.value,
                    }))
                  }
                  options={[
                    { key: "original", value: "original", label: "Original" },
                    { key: "1920", value: "1920", label: "1080p (1920x1080)" },
                    { key: "1280", value: "1280", label: "720p (1280x720)" },
                    { key: "854", value: "854", label: "480p (854x480)" },
                    { key: "640", value: "640", label: "360p (640x360)" },
                  ]}
                />

                {settings.level === CompressionLevel.CUSTOM && (
                  <TextField
                    label="Video Bitrate (kbps)"
                    type="number"
                    value={settings.bitrate}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        bitrate: parseInt(e.target.value) || 1500,
                      }))
                    }
                    inputProps={{ min: 500, max: 10000, step: 100 }}
                    fullWidth
                    size="small"
                    helperText="Lower bitrate = smaller file, but lower quality"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Video Preview */}
        {videoUrl && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Original Video
              </Typography>
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Compressed Video Preview */}
        {compressedUrl && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Compressed Video Preview
              </Typography>
              <video
                src={compressedUrl}
                controls
                className="w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              How to Use
            </Typography>
            <div className="text-gray-600 space-y-2">
              <Typography variant="body2" component="div">
                1. Click &quot;Upload Video&quot; to select your video file
              </Typography>
              <Typography variant="body2" component="div">
                2. Choose compression level (Medium recommended for most cases)
              </Typography>
              <Typography variant="body2" component="div">
                3. Optionally reduce resolution to compress further
              </Typography>
              <Typography variant="body2" component="div">
                4. For precise control, use Custom mode and set bitrate manually
              </Typography>
              <Typography variant="body2" component="div">
                Note: Compression runs in real-time using your browser&apos;s
                native encoder — no files are uploaded to any server.
              </Typography>
              <Typography variant="body2" component="div">
                5. Click &quot;Compress Video&quot; and wait for processing
              </Typography>
              <Typography variant="body2" component="div">
                6. Compare sizes and preview quality
              </Typography>
              <Typography variant="body2" component="div">
                7. Download your compressed video when satisfied
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
