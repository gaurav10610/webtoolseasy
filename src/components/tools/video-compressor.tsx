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
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { buildWebM, type MuxChunk } from "@/lib/webmMuxer";

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
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [etaSeconds, setEtaSeconds] = useState<number | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);
  const [settings, setSettings] = useState<CompressionSettings>({
    level: CompressionLevel.MEDIUM,
    resolution: "original",
    bitrate: 1500,
  });

  const [compressedExtension, setCompressedExtension] = useState("mp4");
  const [encodingEngine, setEncodingEngine] = useState<
    "webcodecs" | "mediarecorder" | ""
  >("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const processingStartedAtRef = useRef<number | null>(null);

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
      setVideoDuration(0);
      setTrimStart(0);
      setTrimEnd(0);
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
      setProgressPercent(0);
      setEtaSeconds(null);
      setEncodingEngine("");
      processingStartedAtRef.current = Date.now();

      const fullDuration = video.duration || videoDuration || 0;
      const effectiveStart = Math.max(
        0,
        Math.min(trimStart, fullDuration || trimStart),
      );
      const effectiveEnd = Math.max(
        effectiveStart + 0.1,
        Math.min(
          trimEnd || fullDuration || effectiveStart + 0.1,
          fullDuration || trimEnd || effectiveStart + 0.1,
        ),
      );
      const segmentDuration = Math.max(0.1, effectiveEnd - effectiveStart);

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

      // Helper: update progress UI
      const updateProgressUI = (
        currentTime: number,
        start: number,
        duration: number,
      ) => {
        const pct = Math.min(
          100,
          Math.max(0, ((currentTime - start) / duration) * 100),
        );
        const rounded = Math.round(pct);
        setProgress(`Compressing: ${rounded}%`);
        setProgressPercent(rounded);
        if (processingStartedAtRef.current && rounded > 0) {
          const elapsed = (Date.now() - processingStartedAtRef.current) / 1000;
          setEtaSeconds(
            Math.max(0, Math.round((elapsed / rounded) * (100 - rounded))),
          );
        }
      };

      // Helper: seek video to start position and wait
      const seekToStart = async () => {
        video.muted = true;
        await new Promise<void>((resolve) => {
          if (video.readyState >= 3) {
            resolve();
            return;
          }
          video.oncanplay = () => resolve();
        });
        await new Promise<void>((resolve) => {
          video.addEventListener("seeked", () => resolve(), { once: true });
          video.currentTime = effectiveStart;
          if (Math.abs(video.currentTime - effectiveStart) < 0.05) {
            resolve();
          }
        });
      };

      // Helper: finalise result
      const finalise = (blob: Blob, ext: string) => {
        setCompressedExtension(ext);
        setCompressedBlob(blob);
        setCompressedSize(blob.size);
        const url = URL.createObjectURL(blob);
        setCompressedUrl(url);
        setProcessingState(ProcessingState.COMPLETED);
        setProgress("");
        setProgressPercent(100);
        setEtaSeconds(0);
        video.muted = false;
        const reduction = ((1 - blob.size / originalSize) * 100).toFixed(1);
        toolState.actions.showMessage(
          `Video compressed! Size reduced by ${reduction}%`,
        );
      };

      /* ---- Try WebCodecs (VideoEncoder + VideoFrame) first ---- */
      const hasWebCodecs =
        typeof VideoEncoder !== "undefined" &&
        typeof VideoFrame !== "undefined";

      if (hasWebCodecs) {
        // Pick a supported codec – prefer VP9, fall back to VP8
        let codec = "vp09.00.10.08"; // VP9 profile 0, level 1
        let codecId = "V_VP9";
        const vp9Config: VideoEncoderConfig = {
          codec,
          width: outW,
          height: outH,
          bitrate: settings.bitrate * 1000,
          framerate: 30,
        };
        const vp9Ok = await VideoEncoder.isConfigSupported(vp9Config);
        if (!vp9Ok.supported) {
          codec = "vp8";
          codecId = "V_VP8";
          const vp8Config: VideoEncoderConfig = {
            codec,
            width: outW,
            height: outH,
            bitrate: settings.bitrate * 1000,
            framerate: 30,
          };
          const vp8Ok = await VideoEncoder.isConfigSupported(vp8Config);
          if (!vp8Ok.supported) {
            // Neither VP9 nor VP8 supported – fall through to MediaRecorder
            throw new Error("WebCodecs: no supported codec");
          }
        }

        try {
          setEncodingEngine("webcodecs");
          const encodedChunks: MuxChunk[] = [];
          let encoderError: Error | null = null;

          const encoder = new VideoEncoder({
            output: (chunk, meta) => {
              const buf = new Uint8Array(chunk.byteLength);
              chunk.copyTo(buf);
              encodedChunks.push({
                data: buf,
                timestampUs: chunk.timestamp,
                isKey:
                  meta?.decoderConfig !== undefined || chunk.type === "key",
              });
            },
            error: (e) => {
              encoderError = e;
            },
          });

          encoder.configure({
            codec,
            width: outW,
            height: outH,
            bitrate: settings.bitrate * 1000,
            framerate: 30,
          });

          await seekToStart();

          // Play video and encode frames via Canvas → VideoFrame → VideoEncoder
          let frameCount = 0;
          await new Promise<void>((resolve, reject) => {
            let animId: number;
            const draw = () => {
              if (encoderError) {
                cancelAnimationFrame(animId);
                reject(encoderError);
                return;
              }
              const reachedEnd = video.currentTime >= effectiveEnd;
              if (!video.ended && !reachedEnd) {
                ctx.drawImage(video, 0, 0, outW, outH);
                const frame = new VideoFrame(canvas, {
                  timestamp: Math.round(
                    (video.currentTime - effectiveStart) * 1_000_000,
                  ),
                });
                const needKey = frameCount % 150 === 0; // keyframe every ~5s
                encoder.encode(frame, { keyFrame: needKey });
                frame.close();
                frameCount++;
                updateProgressUI(
                  video.currentTime,
                  effectiveStart,
                  segmentDuration,
                );
                animId = requestAnimationFrame(draw);
              } else {
                ctx.drawImage(video, 0, 0, outW, outH);
                const frame = new VideoFrame(canvas, {
                  timestamp: Math.round(
                    (video.currentTime - effectiveStart) * 1_000_000,
                  ),
                });
                encoder.encode(frame, { keyFrame: false });
                frame.close();
                cancelAnimationFrame(animId);
                video.pause();
                resolve();
              }
            };

            video.onended = () => {
              cancelAnimationFrame(animId);
              video.pause();
              resolve();
            };

            animId = requestAnimationFrame(draw);
            video.play().catch(reject);
          });

          await encoder.flush();
          encoder.close();

          if (encoderError) throw encoderError;

          setProgress("Muxing WebM...");
          const blob = buildWebM({
            width: outW,
            height: outH,
            durationMs: Math.round(segmentDuration * 1000),
            codecId,
            chunks: encodedChunks,
          });

          finalise(blob, "webm");
          return; // Success – skip MediaRecorder path
        } catch {
          // WebCodecs encoding failed – fall through to MediaRecorder
          setEncodingEngine("");
        }
      }

      /* ---- Fallback: Canvas + MediaRecorder ---- */
      setEncodingEngine("mediarecorder");

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

      await seekToStart();

      let animFrameId: number;
      const drawFrame = () => {
        const reachedTrimEnd = video.currentTime >= effectiveEnd;
        if (!video.ended && !reachedTrimEnd) {
          ctx.drawImage(video, 0, 0, outW, outH);
          updateProgressUI(video.currentTime, effectiveStart, segmentDuration);
          animFrameId = requestAnimationFrame(drawFrame);
        } else {
          ctx.drawImage(video, 0, 0, outW, outH);
          cancelAnimationFrame(animFrameId);
          video.pause();
          if (recorder.state === "recording") recorder.stop();
        }
      };

      video.onended = () => {
        cancelAnimationFrame(animFrameId);
        if (recorder.state === "recording") recorder.stop();
      };

      animFrameId = requestAnimationFrame(drawFrame);
      await video.play();

      const blob = await completionPromise;
      finalise(blob, extension);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to compress video";
      setError(errorMessage);
      setProcessingState(ProcessingState.IDLE);
      setProgress("");
      setProgressPercent(0);
      setEtaSeconds(null);
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
    setProgressPercent(0);
    setEtaSeconds(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setVideoDuration(0);
    setTrimStart(0);
    setTrimEnd(0);
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
        {!videoFile && processingState === ProcessingState.IDLE && (
          <FileUploadWithDragDrop
            accept="video/*"
            multiple={false}
            onFileSelect={(files) =>
              handleFileUpload({
                target: { files },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            title="Upload Video to Compress"
            subtitle="Drag and drop your video here or click to browse"
            supportText="MP4, WebM, MOV and more — processed locally in your browser"
          />
        )}
        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Progress Display */}
        {progress && (
          <Alert severity="info">
            {progress}
            {progressPercent > 0 && etaSeconds !== null
              ? ` • ETA ~${etaSeconds}s`
              : ""}
            {encodingEngine && (
              <Typography
                variant="caption"
                component="span"
                sx={{ ml: 1, opacity: 0.8 }}
              >
                Engine:{" "}
                {encodingEngine === "webcodecs"
                  ? "WebCodecs (hardware-accelerated)"
                  : "MediaRecorder"}
              </Typography>
            )}
          </Alert>
        )}

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

                {videoFile && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Trim Start (seconds)"
                      type="number"
                      value={trimStart}
                      onChange={(e) =>
                        setTrimStart(
                          Math.max(0, parseFloat(e.target.value) || 0),
                        )
                      }
                      inputProps={{
                        min: 0,
                        max: Math.max(0, videoDuration),
                        step: 0.1,
                      }}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Trim End (seconds)"
                      type="number"
                      value={trimEnd || videoDuration}
                      onChange={(e) =>
                        setTrimEnd(
                          Math.max(
                            trimStart,
                            parseFloat(e.target.value) || videoDuration,
                          ),
                        )
                      }
                      inputProps={{
                        min: 0,
                        max: Math.max(0, videoDuration),
                        step: 0.1,
                      }}
                      size="small"
                      fullWidth
                      helperText={
                        videoDuration > 0
                          ? `Full duration: ${videoDuration.toFixed(1)}s`
                          : "Load video metadata to enable trimming"
                      }
                    />
                  </div>
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
                onLoadedMetadata={(e) => {
                  const duration = e.currentTarget.duration || 0;
                  setVideoDuration(duration);
                  setTrimEnd(duration);
                }}
                className="w-full rounded-lg"
              />
              {videoDuration > 0 && (
                <Typography variant="body2" className="mt-2 text-gray-600">
                  Clip range: {trimStart.toFixed(1)}s →{" "}
                  {(trimEnd || videoDuration).toFixed(1)}s (
                  {Math.max(0, (trimEnd || videoDuration) - trimStart).toFixed(
                    1,
                  )}
                  s)
                </Typography>
              )}
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
