"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Slider,
  TextField,
  IconButton,
  Alert,
  LinearProgress,
  Box,
  Stack,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Download,
  Delete,
  TextFields,
} from "@mui/icons-material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { PaperWithChildren } from "../lib/papers";
import { SnackBarWithPosition } from "../lib/snackBar";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { formatBytes, getRandomId } from "@/util/commonUtils";
import {
  createFFmpegInstance,
  executeFFmpegCommand,
  writeFFmpegFile,
  getFFmpegFile,
} from "@/service/ffmpegService";
import { FFmpeg } from "@ffmpeg/ffmpeg";

interface VideoClip {
  id: string;
  file: File;
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  trimStart: number;
  trimEnd: number;
  videoElement?: HTMLVideoElement;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface VideoFilter {
  id: string;
  type: "brightness" | "contrast" | "saturation" | "blur";
  value: number;
}

export default function VideoEditor() {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [currentClip, setCurrentClip] = useState<VideoClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [filters, setFilters] = useState<VideoFilter[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ffmpeg, setFFmpeg] = useState<FFmpeg | null>(null);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarColor, setSnackBarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [error, setError] = useState("");
  const [realTimePreview, setRealTimePreview] = useState(true);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(
    null
  );
  const [draggedOverlayId, setDraggedOverlayId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number | null>(null);

  // Initialize FFmpeg
  useEffect(() => {
    const initFFmpeg = async () => {
      try {
        const ffmpegInstance = await createFFmpegInstance();
        setFFmpeg(ffmpegInstance);
      } catch (error) {
        console.error("Failed to initialize FFmpeg:", error);
        setError(
          "Failed to initialize video processor. Please refresh the page."
        );
      }
    };

    initFFmpeg();
  }, []);

  // Handle video loading when currentClip changes
  useEffect(() => {
    if (currentClip && videoRef.current && currentClip.videoElement) {
      const video = videoRef.current;
      video.src = currentClip.videoElement.src;
      video.load();
      setIsPlaying(false);
      // Don't set currentTime here - let onLoadedMetadata handle it
    }
  }, [currentClip]);

  // Real-time preview rendering
  const renderPreview = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !currentClip) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || video.readyState < 2) return;

    // Get the display dimensions of the video element
    const displayWidth = video.offsetWidth || 640;
    const displayHeight = video.offsetHeight || 360;

    // Only update canvas size if dimensions have changed significantly
    const tolerance = 2; // Allow small differences
    if (
      Math.abs(canvas.width - displayWidth) > tolerance ||
      Math.abs(canvas.height - displayHeight) > tolerance
    ) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    // Clear canvas with black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate aspect ratios
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, drawX, drawY;

    // Calculate dimensions to maintain aspect ratio (letterbox/pillarbox as needed)
    if (videoAspectRatio > canvasAspectRatio) {
      // Video is wider than canvas - fit width, letterbox height
      drawWidth = canvas.width;
      drawHeight = canvas.width / videoAspectRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      // Video is taller than canvas - fit height, pillarbox width
      drawHeight = canvas.height;
      drawWidth = canvas.height * videoAspectRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    // Apply video filters using canvas context
    ctx.save();

    // Apply video effects
    if (filters.length > 0) {
      const filterStrings: string[] = [];
      filters.forEach((filter) => {
        switch (filter.type) {
          case "brightness":
            const brightness = 1 + (filter.value - 100) / 100;
            filterStrings.push(`brightness(${brightness})`);
            break;
          case "contrast":
            const contrast = filter.value / 100;
            filterStrings.push(`contrast(${contrast})`);
            break;
          case "saturation":
            const saturation = filter.value / 100;
            filterStrings.push(`saturate(${saturation})`);
            break;
          case "blur":
            filterStrings.push(`blur(${filter.value}px)`);
            break;
        }
      });

      if (filterStrings.length > 0) {
        ctx.filter = filterStrings.join(" ");
      }
    }

    // Draw the video frame with proper aspect ratio
    ctx.drawImage(video, drawX, drawY, drawWidth, drawHeight);

    ctx.restore();

    // Apply text overlays (skip the one being dragged)
    textOverlays.forEach((overlay) => {
      const currentTime = video.currentTime;
      if (
        currentTime >= overlay.startTime &&
        currentTime <= overlay.endTime &&
        overlay.id !== draggedOverlayId
      ) {
        ctx.save();

        // Calculate the actual video drawing area (same calculations as above)
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, drawX, drawY;

        if (videoAspectRatio > canvasAspectRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / videoAspectRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * videoAspectRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        // Scale font size based on the actual video drawing area
        const scaleFactor = Math.min(drawWidth / 640, drawHeight / 360);
        const scaledFontSize = Math.max(12, overlay.fontSize * scaleFactor);

        ctx.font = `${scaledFontSize}px ${overlay.fontFamily}`;
        ctx.fillStyle = overlay.color;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Calculate position as percentage of the actual video drawing area
        const x = drawX + (overlay.x / 100) * drawWidth;
        const y = drawY + (overlay.y / 100) * drawHeight;

        // Add text stroke for better visibility
        ctx.strokeStyle = "black";
        ctx.lineWidth = Math.max(1, scaledFontSize / 12);
        ctx.strokeText(overlay.text, x, y);
        ctx.fillText(overlay.text, x, y);

        ctx.restore();
      }
    });

    // Continue animation frame
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(renderPreview);
    }
  }, [currentClip, filters, textOverlays, isPlaying, draggedOverlayId]);

  // Start/stop real-time rendering based on playback state
  useEffect(() => {
    if (realTimePreview && isPlaying && currentClip) {
      renderPreview();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      // Render a single frame when paused
      if (realTimePreview) {
        renderPreview();
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, currentClip, realTimePreview, renderPreview]);

  // Re-render when effects or overlays change
  useEffect(() => {
    if (realTimePreview && !isPlaying && currentClip) {
      renderPreview();
    }
  }, [
    filters,
    textOverlays,
    currentClip,
    isPlaying,
    realTimePreview,
    renderPreview,
  ]);

  // Handle video element resize for responsive canvas
  useEffect(() => {
    if (!videoRef.current || !realTimePreview) return;

    const video = videoRef.current;
    let resizeTimeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize events to avoid excessive re-renders
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (currentClip && !isPlaying) {
          renderPreview();
        }
      }, 100);
    });

    resizeObserver.observe(video);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [realTimePreview, currentClip, isPlaying, renderPreview]);

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const newClips: VideoClip[] = Array.from(files).map((file) => {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);

        return {
          id: getRandomId(),
          file,
          name: file.name,
          duration: 0,
          startTime: 0,
          endTime: 0,
          trimStart: 0,
          trimEnd: 0,
          videoElement,
        };
      });

      // Track metadata loading for auto-selection
      let firstClipLoaded = false;

      // Load video metadata
      newClips.forEach((clip, index) => {
        if (clip.videoElement) {
          clip.videoElement.addEventListener("loadedmetadata", () => {
            clip.duration = clip.videoElement!.duration;
            clip.endTime = clip.duration;
            clip.trimEnd = clip.duration;

            setClips((prev) => {
              const updatedClips = [
                ...prev.filter((c) => c.id !== clip.id),
                clip,
              ];

              // Auto-select the first clip if no clip is currently selected and this is the first uploaded clip
              if (!firstClipLoaded && index === 0 && !currentClip) {
                firstClipLoaded = true;
                setTimeout(() => {
                  setCurrentClip(clip);
                }, 100); // Small delay to ensure UI is ready
              }

              return updatedClips;
            });
          });
        }
      });

      setClips((prev) => [...prev, ...newClips]);
      setError("");
    },
    [currentClip]
  );

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const selectClip = (clip: VideoClip) => {
    setCurrentClip(clip);
    setIsPlaying(false); // Reset play state when switching clips
  };

  const handlePlayPause = async () => {
    if (!videoRef.current || !currentClip) {
      console.log("No video ref or current clip");
      return;
    }

    const video = videoRef.current;

    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        // Ensure video is ready for playback
        if (video.readyState < 2) {
          console.log("Video not ready, readyState:", video.readyState);
          // Show a loading message instead of reloading
          setSnackBarMessage("Video is still loading, please wait...");
          setSnackBarColor("info");
          setIsSnackBarOpen(true);
          return;
        }

        // Ensure we're at the correct start position before playing
        if (Math.abs(video.currentTime - currentClip.trimStart) > 0.1) {
          video.currentTime = currentClip.trimStart;
          // Wait a moment for the seek to complete
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing/pausing video:", error);
      setIsPlaying(false);

      // Show user-friendly error
      setSnackBarMessage(
        "Unable to play video. Please try selecting the video again."
      );
      setSnackBarColor("warning");
      setIsSnackBarOpen(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !currentClip) return;

    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Auto-pause at trim end (with small buffer to avoid edge cases)
    if (time >= currentClip.trimEnd - 0.1) {
      videoRef.current.pause();
      setIsPlaying(false);
      // Reset to trim start for next playback
      setTimeout(() => {
        if (videoRef.current && currentClip) {
          videoRef.current.currentTime = currentClip.trimStart;
          setCurrentTime(currentClip.trimStart);
        }
      }, 100);
    }
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current || !currentClip) return;

    const newTime =
      currentClip.trimStart +
      (value / 100) * (currentClip.trimEnd - currentClip.trimStart);

    const video = videoRef.current;
    const wasPlaying = !video.paused;

    // Pause if playing to avoid conflicts during seek
    if (wasPlaying) {
      video.pause();
    }

    video.currentTime = newTime;
    setCurrentTime(newTime);

    // Resume playing if it was playing before
    if (wasPlaying) {
      setTimeout(() => {
        video
          .play()
          .catch((err) => console.error("Error resuming playback:", err));
      }, 100);
    }
  };

  const updateClipTrim = (
    clipId: string,
    trimStart: number,
    trimEnd: number
  ) => {
    setClips((prev) =>
      prev.map((clip) =>
        clip.id === clipId ? { ...clip, trimStart, trimEnd } : clip
      )
    );

    if (currentClip?.id === clipId) {
      setCurrentClip((prev) => (prev ? { ...prev, trimStart, trimEnd } : null));
    }
  };

  const addTextOverlay = () => {
    if (!currentClip) return;

    const newOverlay: TextOverlay = {
      id: getRandomId(),
      text: "Sample Text",
      x: 50,
      y: 50,
      startTime: currentTime,
      endTime: currentTime + 5,
      fontSize: 24,
      color: "#ffffff",
      fontFamily: "Arial",
    };

    setTextOverlays((prev) => [...prev, newOverlay]);
  };

  const updateTextOverlay = useCallback(
    (id: string, updates: Partial<TextOverlay>) => {
      setTextOverlays((prev) =>
        prev.map((overlay) =>
          overlay.id === id ? { ...overlay, ...updates } : overlay
        )
      );
    },
    []
  );

  const removeTextOverlay = (id: string) => {
    setTextOverlays((prev) => prev.filter((overlay) => overlay.id !== id));
    if (selectedOverlayId === id) {
      setSelectedOverlayId(null);
    }
  };

  // Handle drag start for text overlays
  const handleOverlayMouseDown = useCallback(
    (e: React.MouseEvent, overlayId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const container = overlayContainerRef.current;
      if (!container) return;

      const overlay = textOverlays.find((o) => o.id === overlayId);
      if (!overlay) return;

      setSelectedOverlayId(overlayId);
      setDraggedOverlayId(overlayId);

      const dragState = {
        isDragging: true,
        draggedOverlayId: overlayId,
        startX: e.clientX,
        startY: e.clientY,
        initialX: overlay.x,
        initialY: overlay.y,
      };

      // Add global mouse events
      const handleMouseMove = (event: MouseEvent) => {
        if (!overlayContainerRef.current) return;

        const container = overlayContainerRef.current;
        const rect = container.getBoundingClientRect();

        const deltaX = event.clientX - dragState.startX;
        const deltaY = event.clientY - dragState.startY;

        // Convert pixel movement to percentage
        const deltaXPercent = (deltaX / rect.width) * 100;
        const deltaYPercent = (deltaY / rect.height) * 100;

        const newX = Math.max(
          0,
          Math.min(100, dragState.initialX + deltaXPercent)
        );
        const newY = Math.max(
          0,
          Math.min(100, dragState.initialY + deltaYPercent)
        );

        updateTextOverlay(overlayId, { x: newX, y: newY });
      };

      const handleMouseUp = () => {
        // Remove global mouse events
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Reset dragging state
        setDraggedOverlayId(null);
      };

      // Add global mouse events
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [textOverlays, updateTextOverlay]
  );

  // Handle overlay container click (deselect when clicking empty area)
  const handleOverlayContainerClick = (e: React.MouseEvent) => {
    if (e.target === overlayContainerRef.current) {
      setSelectedOverlayId(null);
    }
  };

  const addFilter = (type: VideoFilter["type"]) => {
    const newFilter: VideoFilter = {
      id: getRandomId(),
      type,
      value:
        type === "brightness" || type === "contrast" || type === "saturation"
          ? 100
          : 0,
    };

    setFilters((prev) => [...prev.filter((f) => f.type !== type), newFilter]);
  };

  const updateFilter = (id: string, value: number) => {
    setFilters((prev) =>
      prev.map((filter) => (filter.id === id ? { ...filter, value } : filter))
    );
  };

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const exportVideo = async () => {
    if (!ffmpeg || !currentClip || clips.length === 0) return;

    setIsProcessing(true);

    try {
      // Write input file to FFmpeg
      const inputFileName = `input_${currentClip.id}.mp4`;
      const outputFileName = `output_${Date.now()}.mp4`;

      const arrayBuffer = await currentClip.file.arrayBuffer();
      await writeFFmpegFile({
        ffmpeg,
        fileData: new Uint8Array(arrayBuffer),
        fileName: inputFileName,
      });

      // Build FFmpeg command for trimming
      const command = [
        "-i",
        inputFileName,
        "-ss",
        currentClip.trimStart.toString(),
        "-t",
        (currentClip.trimEnd - currentClip.trimStart).toString(),
      ];

      // Add filters
      const filterComplex = [];

      // Video filters
      if (filters.length > 0) {
        const videoFilters = filters
          .map((filter) => {
            switch (filter.type) {
              case "brightness":
                return `eq=brightness=${(filter.value - 100) / 100}`;
              case "contrast":
                return `eq=contrast=${filter.value / 100}`;
              case "saturation":
                return `eq=saturation=${filter.value / 100}`;
              case "blur":
                return `boxblur=${filter.value}`;
              default:
                return "";
            }
          })
          .filter(Boolean);

        if (videoFilters.length > 0) {
          filterComplex.push(`[0:v]${videoFilters.join(",")}[v]`);
        }
      }

      // Text overlays
      if (textOverlays.length > 0) {
        textOverlays.forEach((overlay, index) => {
          const inputTag =
            index === 0
              ? filterComplex.length > 0
                ? "[v]"
                : "[0:v]"
              : `[v${index}]`;
          const outputTag =
            index === textOverlays.length - 1 ? "[vout]" : `[v${index + 1}]`;

          filterComplex.push(
            `${inputTag}drawtext=text='${overlay.text}':fontfile=/System/Library/Fonts/Arial.ttf:fontsize=${overlay.fontSize}:fontcolor=${overlay.color}:x=${overlay.x}:y=${overlay.y}:enable='between(t,${overlay.startTime},${overlay.endTime})'${outputTag}`
          );
        });
      }

      if (filterComplex.length > 0) {
        command.push("-filter_complex", filterComplex.join(";"));
        if (textOverlays.length > 0) {
          command.push("-map", "[vout]");
        } else if (filters.length > 0) {
          command.push("-map", "[v]");
        }
        command.push("-map", "0:a?");
      }

      command.push("-c:a", "copy", outputFileName);

      // Execute FFmpeg command
      await executeFFmpegCommand({ ffmpeg, command });

      // Read output file
      const outputData = await getFFmpegFile({
        ffmpeg,
        fileName: outputFileName,
      });

      // Download the processed video
      const blob = new Blob([outputData as unknown as ArrayBuffer], {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `edited_${currentClip.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSnackBarMessage("Video exported successfully!");
      setSnackBarColor("success");
      setIsSnackBarOpen(true);
    } catch (error) {
      console.error("Export failed:", error);
      setSnackBarMessage("Failed to export video. Please try again.");
      setSnackBarColor("error");
      setIsSnackBarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* File Upload */}
      <FileUploadWithDragDrop
        accept="video/*"
        multiple={true}
        maxSize={FILE_SIZE_PRESETS.HUGE}
        allowedTypes={FILE_TYPE_PRESETS.VIDEOS}
        onFileSelect={handleFileSelect}
        onError={handleError}
        title="Upload or drop video files here"
        subtitle="Supports MP4, WebM, AVI, MOV formats"
        dragText="Drop videos to start editing"
        supportText="Maximum file size: 100MB per file"
      />
      {error && (
        <Alert severity="error" className="mt-2">
          {error}
        </Alert>
      )}

      {clips.length > 0 && (
        <>
          {/* Video Timeline */}
          <PaperWithChildren className="p-4" variant="elevation">
            <Typography variant="h6" className="mb-3">
              Video Clips
            </Typography>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clips.map((clip) => (
                <Card
                  key={clip.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    currentClip?.id === clip.id
                      ? "ring-4 ring-blue-500 ring-opacity-100 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-400 transform scale-105"
                      : "hover:shadow-lg hover:ring-2 hover:ring-blue-200 hover:scale-102 transform"
                  }`}
                  style={{
                    boxShadow:
                      currentClip?.id === clip.id
                        ? "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                        : undefined,
                  }}
                  onClick={() => selectClip(clip)}
                >
                  <CardContent className="p-3 relative">
                    {/* Selected Video Gradient Overlay */}
                    {currentClip?.id === clip.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-lg pointer-events-none" />
                    )}

                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <div
                        className={`p-1 rounded-full transition-all duration-300 ${
                          currentClip?.id === clip.id
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                            : "bg-gray-100"
                        }`}
                      >
                        <VideoLibraryIcon
                          className={`transition-all duration-300 ${
                            currentClip?.id === clip.id
                              ? "text-white drop-shadow-md"
                              : "text-gray-600"
                          }`}
                          fontSize="small"
                        />
                      </div>
                      <Typography
                        variant="body2"
                        className={`font-medium truncate transition-all duration-300 ${
                          currentClip?.id === clip.id
                            ? "text-blue-900 font-semibold drop-shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        {clip.name}
                      </Typography>
                      {currentClip?.id === clip.id && (
                        <div className="ml-auto flex items-center gap-1">
                          <div className="relative">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse shadow-lg"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                          </div>
                          <Typography
                            variant="caption"
                            className="text-blue-700 font-medium bg-blue-100 px-2 py-0.5 rounded-full text-xs"
                          >
                            ACTIVE
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 relative z-10">
                      <Typography
                        variant="caption"
                        className={`block transition-all duration-300 ${
                          currentClip?.id === clip.id
                            ? "text-blue-700 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        <span
                          className={
                            currentClip?.id === clip.id
                              ? "text-blue-600 font-semibold"
                              : ""
                          }
                        >
                          Duration:
                        </span>{" "}
                        {formatTime(clip.duration)}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={`block transition-all duration-300 ${
                          currentClip?.id === clip.id
                            ? "text-blue-700 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        <span
                          className={
                            currentClip?.id === clip.id
                              ? "text-blue-600 font-semibold"
                              : ""
                          }
                        >
                          Size:
                        </span>{" "}
                        {formatBytes(clip.file.size)}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PaperWithChildren>

          {currentClip && (
            <>
              {/* Video Player */}
              <PaperWithChildren className="p-4" variant="elevation">
                <div className="flex justify-between items-center mb-3">
                  <Typography variant="h6">Video Preview</Typography>
                  <div className="flex items-center gap-2">
                    <Typography variant="caption" color="text.secondary">
                      {realTimePreview
                        ? "Effects applied in real-time"
                        : "Effects shown on export only"}
                    </Typography>
                    <Button
                      onClick={() => setRealTimePreview(!realTimePreview)}
                      variant={realTimePreview ? "contained" : "outlined"}
                      size="small"
                      color={realTimePreview ? "primary" : "secondary"}
                    >
                      {realTimePreview ? "Real-time ON" : "Real-time OFF"}
                    </Button>
                  </div>
                </div>
                <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    className="w-full h-auto max-h-96"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => {
                      if (videoRef.current && currentClip) {
                        // Ensure the video is ready before setting time
                        const video = videoRef.current;
                        if (video.readyState >= 1) {
                          video.currentTime = currentClip.trimStart;
                          setCurrentTime(currentClip.trimStart);
                        }
                        setIsPlaying(false); // Reset playing state when new video loads
                      }
                    }}
                    onCanPlay={() => {
                      // Only set currentTime if it's not already at the correct position
                      if (videoRef.current && currentClip) {
                        const video = videoRef.current;
                        if (
                          Math.abs(video.currentTime - currentClip.trimStart) >
                          0.1
                        ) {
                          video.currentTime = currentClip.trimStart;
                          setCurrentTime(currentClip.trimStart);
                        }
                      }
                    }}
                    onPlay={() => {
                      setIsPlaying(true);
                      console.log("Video started playing");
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                      console.log("Video paused");
                    }}
                    onSeeking={() => {
                      console.log("Video seeking...");
                    }}
                    onSeeked={() => {
                      console.log("Video seek completed");
                    }}
                    controls={false}
                    style={{
                      display:
                        realTimePreview &&
                        (filters.length > 0 || textOverlays.length > 0)
                          ? "none"
                          : "block",
                    }}
                  />

                  {/* Canvas overlay for real-time effects preview */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto max-h-96"
                    style={{
                      display:
                        realTimePreview &&
                        (filters.length > 0 || textOverlays.length > 0)
                          ? "block"
                          : "none",
                      backgroundColor: "black",
                      objectFit: "contain",
                    }}
                  />

                  {/* Draggable Text Overlay Container */}
                  <div
                    ref={overlayContainerRef}
                    className="absolute inset-0 pointer-events-none"
                    onClick={handleOverlayContainerClick}
                    style={{
                      display: textOverlays.length > 0 ? "block" : "none",
                      zIndex: 10,
                    }}
                  >
                    {textOverlays.map((overlay) => {
                      const currentVideoTime =
                        videoRef.current?.currentTime || 0;
                      const isVisible =
                        currentVideoTime >= overlay.startTime &&
                        currentVideoTime <= overlay.endTime;

                      if (!isVisible) return null;

                      return (
                        <div
                          key={overlay.id}
                          className={`absolute cursor-move select-none transition-all duration-200 pointer-events-auto ${
                            selectedOverlayId === overlay.id
                              ? "ring-2 ring-blue-400 ring-opacity-60 bg-blue-100 bg-opacity-20"
                              : "hover:ring-1 hover:ring-white hover:ring-opacity-40"
                          }`}
                          style={{
                            left: `${overlay.x}%`,
                            top: `${overlay.y}%`,
                            transform: "translate(-50%, -50%)",
                            fontSize: `${overlay.fontSize}px`,
                            color: overlay.color,
                            fontFamily: overlay.fontFamily,
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            minWidth: "20px",
                            minHeight: "20px",
                            zIndex: selectedOverlayId === overlay.id ? 20 : 15,
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            // Make transparent when canvas is showing and not being dragged, but keep interactive
                            opacity:
                              realTimePreview &&
                              (filters.length > 0 || textOverlays.length > 0) &&
                              overlay.id !== draggedOverlayId
                                ? 0
                                : 1,
                            // Always keep pointer events enabled for dragging
                            pointerEvents: "auto",
                          }}
                          onMouseDown={(e) =>
                            handleOverlayMouseDown(e, overlay.id)
                          }
                          title="Drag to reposition text"
                        >
                          {overlay.text}
                          {selectedOverlayId === overlay.id && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hidden preview video for processing */}
                  <video
                    ref={previewVideoRef}
                    className="hidden"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Player Controls */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  className="mb-4"
                >
                  <IconButton onClick={handlePlayPause} color="primary">
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>

                  <Box className="flex-1 mx-4">
                    <Slider
                      value={
                        currentClip &&
                        !isNaN(currentTime) &&
                        !isNaN(currentClip.trimStart) &&
                        !isNaN(currentClip.trimEnd) &&
                        currentClip.trimEnd > currentClip.trimStart
                          ? ((currentTime - currentClip.trimStart) /
                              (currentClip.trimEnd - currentClip.trimStart)) *
                            100
                          : 0
                      }
                      onChange={(_, value) => handleSeek(value as number)}
                      sx={{ color: "primary.main" }}
                    />
                  </Box>

                  <Typography variant="caption" className="min-w-20">
                    {formatTime(currentTime)} /{" "}
                    {formatTime(currentClip.duration)}
                  </Typography>

                  <IconButton
                    onClick={() => setIsMuted(!isMuted)}
                    onMouseDown={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                    }}
                  >
                    {isMuted ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>
                </Stack>
              </PaperWithChildren>

              {/* Video Editing Controls */}
              <PaperWithChildren className="p-4" variant="elevation">
                <Typography variant="h6" className="mb-4">
                  Video Editing Controls
                </Typography>

                {/* Trim Controls Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <Typography
                    variant="subtitle1"
                    className="mb-3 font-medium text-blue-700"
                  >
                    📹 Trim Video
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="mb-2"
                  >
                    <Typography variant="caption" className="min-w-12">
                      Start:
                    </Typography>
                    <Slider
                      value={currentClip?.trimStart || 0}
                      max={currentClip?.duration || 100}
                      step={0.1}
                      onChange={(_, value) =>
                        updateClipTrim(
                          currentClip.id,
                          value as number,
                          currentClip.trimEnd
                        )
                      }
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="caption" className="min-w-12">
                      End:
                    </Typography>
                    <Slider
                      value={currentClip?.trimEnd || 0}
                      max={currentClip?.duration || 100}
                      step={0.1}
                      onChange={(_, value) =>
                        updateClipTrim(
                          currentClip.id,
                          currentClip.trimStart,
                          value as number
                        )
                      }
                      sx={{ flex: 1 }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Trimmed duration:{" "}
                    {formatTime(currentClip.trimEnd - currentClip.trimStart)}
                  </Typography>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Text Overlays Section */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <Typography
                      variant="subtitle1"
                      className="font-medium text-blue-700"
                    >
                      📝 Text Overlays
                    </Typography>
                    <Button
                      onClick={addTextOverlay}
                      startIcon={<TextFields />}
                      variant="outlined"
                      size="small"
                    >
                      Add Text
                    </Button>
                  </div>

                  {textOverlays.map((overlay) => (
                    <Card
                      key={overlay.id}
                      className={`mb-2 border shadow-sm transition-all ${
                        selectedOverlayId === overlay.id
                          ? "border-blue-400 bg-blue-50"
                          : "border-blue-200"
                      }`}
                      onClick={() => setSelectedOverlayId(overlay.id)}
                    >
                      <CardContent className="p-3">
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          className="mb-2"
                        >
                          <TextField
                            label="Text"
                            value={overlay.text}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                text: e.target.value,
                              })
                            }
                            size="small"
                            className="flex-1"
                          />
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTextOverlay(overlay.id);
                            }}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Stack>

                        <Stack direction="row" spacing={2} className="mb-2">
                          <TextField
                            label="Start Time"
                            type="number"
                            value={overlay.startTime || 0}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                startTime: parseFloat(e.target.value) || 0,
                              })
                            }
                            size="small"
                            inputProps={{
                              step: 0.1,
                              min: 0,
                              max: currentClip?.duration || 100,
                            }}
                          />
                          <TextField
                            label="End Time"
                            type="number"
                            value={overlay.endTime || 5}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                endTime: parseFloat(e.target.value) || 5,
                              })
                            }
                            size="small"
                            inputProps={{
                              step: 0.1,
                              min: 0,
                              max: currentClip?.duration || 100,
                            }}
                          />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                          <TextField
                            label="Font Size"
                            type="number"
                            value={overlay.fontSize || 24}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                fontSize: parseInt(e.target.value) || 24,
                              })
                            }
                            size="small"
                            inputProps={{ min: 8, max: 72 }}
                          />
                          <TextField
                            label="Color"
                            type="color"
                            value={overlay.color || "#ffffff"}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                color: e.target.value,
                              })
                            }
                            size="small"
                          />
                        </Stack>

                        <Stack direction="row" spacing={2} className="mt-2">
                          <TextField
                            label="X Position (%)"
                            type="number"
                            value={Math.round((overlay.x || 50) * 100) / 100}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                x: parseFloat(e.target.value) || 50,
                              })
                            }
                            size="small"
                            inputProps={{ min: 0, max: 100, step: 0.1 }}
                          />
                          <TextField
                            label="Y Position (%)"
                            type="number"
                            value={Math.round((overlay.y || 50) * 100) / 100}
                            onChange={(e) =>
                              updateTextOverlay(overlay.id, {
                                y: parseFloat(e.target.value) || 50,
                              })
                            }
                            size="small"
                            inputProps={{ min: 0, max: 100, step: 0.1 }}
                          />
                        </Stack>

                        {selectedOverlayId === overlay.id && (
                          <Typography
                            variant="caption"
                            color="primary"
                            className="mt-2 block"
                          >
                            💡 Tip: Drag the text directly on the video to
                            reposition it
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {textOverlays.length === 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-center py-4 bg-white rounded border border-dashed border-blue-300"
                    >
                      No text overlays added yet. Click &quot;Add Text&quot; to
                      add draggable text to your video.
                    </Typography>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Video Effects Section */}
                <div className="p-4 bg-purple-50 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <Typography
                      variant="subtitle1"
                      className="font-medium text-purple-700"
                    >
                      ✨ Video Effects
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Button
                        onClick={() => addFilter("brightness")}
                        size="small"
                        variant="outlined"
                      >
                        Brightness
                      </Button>
                      <Button
                        onClick={() => addFilter("contrast")}
                        size="small"
                        variant="outlined"
                      >
                        Contrast
                      </Button>
                      <Button
                        onClick={() => addFilter("saturation")}
                        size="small"
                        variant="outlined"
                      >
                        Saturation
                      </Button>
                      <Button
                        onClick={() => addFilter("blur")}
                        size="small"
                        variant="outlined"
                      >
                        Blur
                      </Button>
                    </Stack>
                  </div>

                  {filters.map((filter) => (
                    <Card
                      key={filter.id}
                      className="mb-2 border border-purple-200 shadow-sm"
                    >
                      <CardContent className="p-3">
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography
                            variant="body2"
                            className="capitalize min-w-20"
                          >
                            {filter.type}
                          </Typography>
                          <Slider
                            value={filter.value || 0}
                            onChange={(_, value) =>
                              updateFilter(filter.id, value as number)
                            }
                            min={filter.type === "blur" ? 0 : 0}
                            max={filter.type === "blur" ? 10 : 200}
                            step={filter.type === "blur" ? 0.1 : 1}
                            className="flex-1"
                          />
                          <Typography variant="caption" className="min-w-12">
                            {filter.value || 0}
                            {filter.type === "blur" ? "px" : "%"}
                          </Typography>
                          <IconButton
                            onClick={() => removeFilter(filter.id)}
                            color="error"
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}

                  {filters.length === 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-center py-4 bg-white rounded border border-dashed border-purple-300"
                    >
                      No effects applied. Use the buttons above to add effects.
                    </Typography>
                  )}
                </div>
              </PaperWithChildren>

              {/* Export */}
              <PaperWithChildren className="p-4" variant="elevation">
                <Typography variant="h6" className="mb-3">
                  Export Video
                </Typography>

                {isProcessing && (
                  <Box className="mb-4">
                    <LinearProgress variant="indeterminate" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="mt-1"
                    >
                      Processing video... This may take a few minutes.
                    </Typography>
                  </Box>
                )}

                <Button
                  onClick={exportVideo}
                  disabled={!ffmpeg || isProcessing}
                  startIcon={<Download />}
                  variant="contained"
                  color="primary"
                >
                  {isProcessing ? "Processing..." : "Export Video"}
                </Button>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="mt-2"
                >
                  Export will include all applied trims, text overlays, and
                  effects.
                </Typography>
              </PaperWithChildren>
            </>
          )}
        </>
      )}

      <SnackBarWithPosition
        open={isSnackBarOpen}
        autoHideDuration={6000}
        handleClose={() => setIsSnackBarOpen(false)}
        message={snackBarMessage}
        color={snackBarColor}
        vertical="bottom"
        horizontal="center"
      />
    </div>
  );
}
