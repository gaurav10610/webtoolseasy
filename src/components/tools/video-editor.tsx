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

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleFileSelect = useCallback((files: FileList) => {
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

    // Load video metadata
    newClips.forEach((clip) => {
      if (clip.videoElement) {
        clip.videoElement.addEventListener("loadedmetadata", () => {
          clip.duration = clip.videoElement!.duration;
          clip.endTime = clip.duration;
          clip.trimEnd = clip.duration;
          setClips((prev) => [...prev.filter((c) => c.id !== clip.id), clip]);
        });
      }
    });

    setClips((prev) => [...prev, ...newClips]);
    setError("");
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const selectClip = (clip: VideoClip) => {
    setCurrentClip(clip);
    if (videoRef.current && clip.videoElement) {
      videoRef.current.src = clip.videoElement.src;
      videoRef.current.currentTime = clip.trimStart;
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !currentClip) return;

    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Auto-pause at trim end
    if (time >= currentClip.trimEnd) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current || !currentClip) return;

    const newTime =
      currentClip.trimStart +
      (value / 100) * (currentClip.trimEnd - currentClip.trimStart);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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

  const updateTextOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setTextOverlays((prev) =>
      prev.map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      )
    );
  };

  const removeTextOverlay = (id: string) => {
    setTextOverlays((prev) => prev.filter((overlay) => overlay.id !== id));
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
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {clips.map((clip) => (
                <Card
                  key={clip.id}
                  className={`cursor-pointer transition-all ${
                    currentClip?.id === clip.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => selectClip(clip)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <VideoLibraryIcon color="primary" />
                      <Typography
                        variant="body2"
                        className="font-medium truncate"
                      >
                        {clip.name}
                      </Typography>
                    </div>
                    <Typography variant="caption" color="text.secondary">
                      Duration: {formatTime(clip.duration)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      className="block"
                    >
                      Size: {formatBytes(clip.file.size)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PaperWithChildren>

          {currentClip && (
            <>
              {/* Video Player */}
              <PaperWithChildren className="p-4" variant="elevation">
                <Typography variant="h6" className="mb-3">
                  Video Preview
                </Typography>
                <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    className="w-full h-auto max-h-96"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => {
                      if (videoRef.current && currentClip) {
                        videoRef.current.currentTime = currentClip.trimStart;
                      }
                    }}
                    controls={false}
                  />
                  <canvas ref={canvasRef} className="hidden" />
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
                        currentClip
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

                {/* Trim Controls */}
                <Typography variant="subtitle2" className="mb-2">
                  Trim Video
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="caption">Start:</Typography>
                  <Slider
                    value={currentClip.trimStart}
                    max={currentClip.duration}
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
                  <Typography variant="caption">End:</Typography>
                  <Slider
                    value={currentClip.trimEnd}
                    max={currentClip.duration}
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
              </PaperWithChildren>

              {/* Text Overlays */}
              <PaperWithChildren className="p-4" variant="elevation">
                <div className="flex justify-between items-center mb-3">
                  <Typography variant="h6">Text Overlays</Typography>
                  <Button
                    onClick={addTextOverlay}
                    startIcon={<TextFields />}
                    variant="outlined"
                  >
                    Add Text
                  </Button>
                </div>

                {textOverlays.map((overlay) => (
                  <Card key={overlay.id} className="mb-2">
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
                          onClick={() => removeTextOverlay(overlay.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" spacing={2} className="mb-2">
                        <TextField
                          label="Start Time"
                          type="number"
                          value={overlay.startTime}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              startTime: parseFloat(e.target.value),
                            })
                          }
                          size="small"
                          inputProps={{
                            step: 0.1,
                            min: 0,
                            max: currentClip.duration,
                          }}
                        />
                        <TextField
                          label="End Time"
                          type="number"
                          value={overlay.endTime}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              endTime: parseFloat(e.target.value),
                            })
                          }
                          size="small"
                          inputProps={{
                            step: 0.1,
                            min: 0,
                            max: currentClip.duration,
                          }}
                        />
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <TextField
                          label="Font Size"
                          type="number"
                          value={overlay.fontSize}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              fontSize: parseInt(e.target.value),
                            })
                          }
                          size="small"
                          inputProps={{ min: 8, max: 72 }}
                        />
                        <TextField
                          label="Color"
                          type="color"
                          value={overlay.color}
                          onChange={(e) =>
                            updateTextOverlay(overlay.id, {
                              color: e.target.value,
                            })
                          }
                          size="small"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                ))}

                {textOverlays.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No text overlays added yet. Click &quot;Add Text&quot; to
                    start.
                  </Typography>
                )}
              </PaperWithChildren>

              {/* Video Filters */}
              <PaperWithChildren className="p-4" variant="elevation">
                <div className="flex justify-between items-center mb-3">
                  <Typography variant="h6">Video Effects</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      onClick={() => addFilter("brightness")}
                      size="small"
                    >
                      Brightness
                    </Button>
                    <Button onClick={() => addFilter("contrast")} size="small">
                      Contrast
                    </Button>
                    <Button
                      onClick={() => addFilter("saturation")}
                      size="small"
                    >
                      Saturation
                    </Button>
                    <Button onClick={() => addFilter("blur")} size="small">
                      Blur
                    </Button>
                  </Stack>
                </div>

                {filters.map((filter) => (
                  <Card key={filter.id} className="mb-2">
                    <CardContent className="p-3">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                          variant="body2"
                          className="capitalize min-w-20"
                        >
                          {filter.type}
                        </Typography>
                        <Slider
                          value={filter.value}
                          onChange={(_, value) =>
                            updateFilter(filter.id, value as number)
                          }
                          min={filter.type === "blur" ? 0 : 0}
                          max={filter.type === "blur" ? 10 : 200}
                          step={filter.type === "blur" ? 0.1 : 1}
                          className="flex-1"
                        />
                        <Typography variant="caption" className="min-w-12">
                          {filter.value}
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
                  <Typography variant="body2" color="text.secondary">
                    No effects applied. Use the buttons above to add effects.
                  </Typography>
                )}
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
