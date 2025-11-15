"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  Slider,
  TextField,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import GifIcon from "@mui/icons-material/Gif";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { createFFmpegInstance } from "@/service/ffmpegService";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

enum ProcessingState {
  IDLE = "idle",
  LOADING = "loading",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

export default function GIFMaker({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [processingState, setProcessingState] = useState<ProcessingState>(
    ProcessingState.IDLE
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [gifBlob, setGifBlob] = useState<Blob | null>(null);
  const [gifUrl, setGifUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  // GIF settings
  const [fps, setFps] = useState<number>(15);
  const [width, setWidth] = useState<number>(480);
  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(3);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setError("");
      setGifBlob(null);
      setGifUrl("");
      toolState.actions.showMessage("Video loaded successfully");
    },
    [toolState.actions]
  );

  // Handle video metadata
  const handleVideoLoaded = useCallback(() => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setVideoDuration(duration);
      setDuration(Math.min(3, duration));
    }
  }, []);

  // Create GIF
  const createGIF = useCallback(async () => {
    if (!videoFile) {
      toolState.actions.showMessage("Please upload a video first");
      return;
    }

    try {
      setProcessingState(ProcessingState.LOADING);
      setError("");
      setProgress("Initializing FFmpeg...");

      // Initialize FFmpeg if not already done
      if (!ffmpegRef.current) {
        const ffmpeg = await createFFmpegInstance();
        ffmpegRef.current = ffmpeg;

        ffmpeg.on("progress", ({ progress: p }) => {
          setProgress(`Processing: ${Math.round(p * 100)}%`);
        });
      }

      setProcessingState(ProcessingState.PROCESSING);
      setProgress("Loading video...");

      const ffmpeg = ffmpegRef.current;
      const inputFileName = "input.mp4";
      const outputFileName = "output.gif";

      // Write input file
      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));
      setProgress("Creating GIF...");

      // Build FFmpeg command
      const command = [
        "-i",
        inputFileName,
        "-ss",
        startTime.toString(),
        "-t",
        duration.toString(),
        "-vf",
        `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        "-loop",
        "0",
        outputFileName,
      ];

      await ffmpeg.exec(command);
      setProgress("Finalizing...");

      // Read output file
      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([data as unknown as ArrayBuffer], {
        type: "image/gif",
      });
      const url = URL.createObjectURL(blob);

      setGifBlob(blob);
      setGifUrl(url);
      setProcessingState(ProcessingState.COMPLETED);
      setProgress("");
      toolState.actions.showMessage("GIF created successfully!");

      // Cleanup FFmpeg files
      try {
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputFileName);
      } catch (cleanupErr) {
        console.warn("FFmpeg cleanup warning:", cleanupErr);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create GIF";
      setError(errorMessage);
      setProcessingState(ProcessingState.IDLE);
      setProgress("");
      toolState.actions.showMessage("Failed to create GIF");
    }
  }, [videoFile, fps, width, startTime, duration, toolState.actions]);

  // Download GIF
  const downloadGIF = useCallback(() => {
    if (!gifBlob) {
      toolState.actions.showMessage("No GIF to download");
      return;
    }

    const link = document.createElement("a");
    link.href = gifUrl;
    link.download = `animated-${Date.now()}.gif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toolState.actions.showMessage("GIF downloaded successfully!");
  }, [gifBlob, gifUrl, toolState.actions]);

  // Reset
  const reset = useCallback(() => {
    setVideoFile(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl("");
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setGifUrl("");
    setGifBlob(null);
    setProcessingState(ProcessingState.IDLE);
    setError("");
    setProgress("");
    setFps(15);
    setWidth(480);
    setStartTime(0);
    setDuration(3);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [videoUrl, gifUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifUrl) URL.revokeObjectURL(gifUrl);
      // Cleanup FFmpeg instance
      if (ffmpegRef.current) {
        ffmpegRef.current.terminate();
        ffmpegRef.current = null;
      }
    };
  }, [videoUrl, gifUrl]);

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
          text: "Create GIF",
          onClick: createGIF,
          icon: <GifIcon />,
          disabled: !videoFile || processingState === ProcessingState.LOADING,
        },
        ...commonButtons,
      ];
    }

    if (processingState === ProcessingState.PROCESSING) {
      return [
        {
          type: "custom" as const,
          text: "Processing...",
          onClick: () => {},
          icon: <GifIcon />,
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
        ...commonButtons,
      ];
    }

    return commonButtons;
  }, [processingState, videoFile, createGIF, downloadGIF, reset]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="GIF Maker"
        description="Create animated GIFs from videos with custom frame rate, size, and duration settings. Free online GIF creator with no watermarks."
        exampleCode="Upload video → Adjust settings → Create GIF → Download"
        exampleOutput="High-quality animated GIF files optimized for web"
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

        {/* Video Preview */}
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

        {/* GIF Settings */}
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
                    onChange={(_, value) => setFps(value as number)}
                    min={5}
                    max={30}
                    step={1}
                    marks={[
                      { value: 5, label: "5" },
                      { value: 10, label: "10" },
                      { value: 15, label: "15" },
                      { value: 20, label: "20" },
                      { value: 30, label: "30" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Higher FPS = smoother but larger file size
                  </Typography>
                </div>

                <div>
                  <Typography variant="body2" className="mb-2">
                    Width (pixels): {width}
                  </Typography>
                  <Slider
                    value={width}
                    onChange={(_, value) => setWidth(value as number)}
                    min={240}
                    max={1920}
                    step={120}
                    marks={[
                      { value: 240, label: "240" },
                      { value: 480, label: "480" },
                      { value: 720, label: "720" },
                      { value: 1080, label: "1080" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Smaller width = smaller file size
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Start Time (seconds)"
                    type="number"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    inputProps={{ min: 0, max: videoDuration, step: 0.1 }}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Duration (seconds)"
                    type="number"
                    value={duration}
                    onChange={(e) =>
                      setDuration(
                        Math.max(0.1, parseFloat(e.target.value) || 1)
                      )
                    }
                    inputProps={{ min: 0.1, max: 30, step: 0.1 }}
                    fullWidth
                    size="small"
                  />
                </div>

                {videoDuration > 0 && (
                  <Typography variant="caption" className="text-gray-500">
                    Video duration: {videoDuration.toFixed(1)}s | Selected clip:{" "}
                    {startTime.toFixed(1)}s to{" "}
                    {(startTime + duration).toFixed(1)}s
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* GIF Preview */}
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
                  File size: {(gifBlob.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              )}
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
                2. Adjust frame rate (higher = smoother but larger file)
              </Typography>
              <Typography variant="body2" component="div">
                3. Set output width (smaller = faster load times)
              </Typography>
              <Typography variant="body2" component="div">
                4. Choose start time and duration for your GIF clip
              </Typography>
              <Typography variant="body2" component="div">
                5. Click &quot;Create GIF&quot; and wait for processing
              </Typography>
              <Typography variant="body2" component="div">
                6. Preview your GIF and download when satisfied
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
