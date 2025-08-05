"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import {
  Typography,
  Button,
  Slider,
  IconButton,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Download,
} from "@mui/icons-material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { PaperWithChildren } from "../lib/papers";
import { ToolLayout } from "../common/ToolLayout";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { formatBytes } from "@/util/commonUtils";

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
  effects: string[];
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  startTime: number;
  endTime: number;
  fontFamily: string;
}

interface VideoEditorState {
  clips: VideoClip[];
  currentClip: VideoClip | null;
  isPlaying: boolean;
  currentTime: number;
  isMuted: boolean;
  textOverlays: TextOverlay[];
  isProcessing: boolean;
  error: string;
  snackBar: {
    open: boolean;
    message: string;
    color: "success" | "info" | "warning" | "error";
  };
}

// Memoized Video Controls Component
const VideoControls = memo(function VideoControls({
  currentClip,
  isPlaying,
  currentTime,
  isMuted,
  onPlayPause,
  onTimeChange,
  onMuteToggle,
}: {
  currentClip: VideoClip | null;
  isPlaying: boolean;
  currentTime: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
  onMuteToggle: () => void;
}) {
  if (!currentClip) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded">
      <div className="flex items-center gap-2">
        <IconButton onClick={onPlayPause} size="small">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={onMuteToggle} size="small">
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Typography variant="caption">
          {formatTime(currentTime)} / {formatTime(currentClip.duration)}
        </Typography>
      </div>
      <Slider
        value={currentTime}
        min={0}
        max={currentClip.duration}
        onChange={(_, value) => onTimeChange(value as number)}
        size="small"
      />
    </div>
  );
});

export default function VideoEditor() {
  const [state, setState] = useState<VideoEditorState>({
    clips: [],
    currentClip: null,
    isPlaying: false,
    currentTime: 0,
    isMuted: false,
    textOverlays: [],
    isProcessing: false,
    error: "",
    snackBar: {
      open: false,
      message: "",
      color: "success",
    },
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const showMessage = useCallback(
    (message: string, color: "success" | "error" = "success") => {
      setState((prev) => ({
        ...prev,
        snackBar: { open: true, message, color },
      }));
    },
    []
  );

  const handleSnackBarClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      snackBar: { ...prev.snackBar, open: false },
    }));
  }, []);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const newClips: VideoClip[] = [];

    for (const file of Array.from(files)) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);

      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => {
          const clip: VideoClip = {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            duration: videoElement.duration,
            startTime: 0,
            endTime: videoElement.duration,
            trimStart: 0,
            trimEnd: videoElement.duration,
            videoElement,
            effects: [],
          };
          newClips.push(clip);
          resolve();
        };
      });
    }

    setState((prev) => ({
      ...prev,
      clips: [...prev.clips, ...newClips],
      currentClip: prev.currentClip || newClips[0] || null,
      error: "",
    }));
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setState((prev) => ({ ...prev, error: errorMessage }));
  }, []);

  const handleExport = useCallback(async () => {
    if (!state.currentClip) {
      showMessage("Please select a video clip to export", "error");
      return;
    }

    setState((prev) => ({ ...prev, isProcessing: true }));

    try {
      // Basic export functionality - in a real implementation,
      // you would process the video with FFmpeg
      const url = URL.createObjectURL(state.currentClip.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `edited_${state.currentClip.name}`;
      a.click();
      URL.revokeObjectURL(url);

      showMessage("Video exported successfully!", "success");
    } catch {
      showMessage("Export failed. Please try again.", "error");
    } finally {
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  }, [state.currentClip, showMessage]);

  return (
    <ToolLayout
      snackBar={{
        open: state.snackBar.open,
        message: state.snackBar.message,
        onClose: handleSnackBarClose,
      }}
    >
      {/* Error message */}
      {state.error && (
        <Alert severity="error" className="mb-3">
          {state.error}
        </Alert>
      )}

      {/* Processing indicator */}
      {state.isProcessing && (
        <div className="mb-3">
          <Typography variant="body2" className="mb-1">
            Processing video...
          </Typography>
          <LinearProgress />
        </div>
      )}

      {/* File Upload */}
      {state.clips.length === 0 && (
        <FileUploadWithDragDrop
          accept="video/*"
          multiple={true}
          allowedTypes={FILE_TYPE_PRESETS.VIDEOS}
          maxSize={FILE_SIZE_PRESETS.HUGE}
          onFileSelect={handleFileSelect}
          onError={handleError}
          title="Upload Videos to Edit"
          subtitle="Drag and drop your video files here or click to browse"
          supportText="Supports MP4, WebM, AVI, MOV formats up to 100MB each"
        />
      )}

      {/* Main Editor Interface */}
      {state.clips.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Clips */}
          <div className="space-y-4">
            <Typography variant="h6">Video Clips</Typography>
            {state.clips.map((clip) => (
              <PaperWithChildren
                key={clip.id}
                className="p-3 cursor-pointer transition-colors"
                variant="outlined"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <VideoLibraryIcon color="primary" />
                    <div>
                      <Typography variant="body2" fontWeight="medium">
                        {clip.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatBytes(clip.file.size)} •{" "}
                        {Math.round(clip.duration)}s
                      </Typography>
                    </div>
                  </div>
                </div>
              </PaperWithChildren>
            ))}

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExport}
              disabled={!state.currentClip || state.isProcessing}
              fullWidth
            >
              Export Video
            </Button>
          </div>

          {/* Center Panel - Video Preview */}
          <div className="lg:col-span-2 space-y-4">
            <Typography variant="h6">Video Preview</Typography>

            {state.currentClip ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded border"
                  controls
                />
                <div className="mt-4">
                  <VideoControls
                    currentClip={state.currentClip}
                    isPlaying={state.isPlaying}
                    currentTime={state.currentTime}
                    isMuted={state.isMuted}
                    onPlayPause={() => {}}
                    onTimeChange={() => {}}
                    onMuteToggle={() => {}}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                <Typography color="textSecondary">
                  Select a video clip to preview
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
