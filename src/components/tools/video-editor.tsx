"use client";

import React, { useState, useRef, useCallback, memo, useMemo } from "react";
import {
  Typography,
  Button,
  Slider,
  IconButton,
  Alert,
  LinearProgress,
  Switch,
  FormControlLabel,
  Card,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Download,
  ContentCut,
  Delete,
  Add,
  Tune,
  TextFields,
  DragIndicator,
} from "@mui/icons-material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { PaperWithChildren } from "../lib/papers";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { formatBytes } from "@/util/commonUtils";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface TextOverlay {
  id: string;
  text: string;
  x: number; // Position as percentage (0-100)
  y: number; // Position as percentage (0-100)
  width: number; // Width as percentage (5-50)
  height: number; // Height as percentage (2-20)
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight: string;
  backgroundColor: string;
  opacity: number;
  startTime: number; // When overlay appears
  endTime: number; // When overlay disappears
}

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
  effects: VideoEffect[];
  textOverlays: TextOverlay[];
  url: string;
}

interface VideoEffect {
  id: string;
  type: "brightness" | "contrast" | "blur" | "grayscale" | "sepia" | "saturate";
  name: string;
  value: number;
  enabled: boolean;
}

interface VideoEditorState {
  clips: VideoClip[];
  selectedClipId: string | null;
  isPlaying: boolean;
  currentTime: number;
  isMuted: boolean;
  volume: number;
  isProcessing: boolean;
  error: string;
  selectedTextOverlayId: string | null;
}

const DEFAULT_EFFECTS: Omit<VideoEffect, "id">[] = [
  { type: "brightness", name: "Brightness", value: 100, enabled: false },
  { type: "contrast", name: "Contrast", value: 100, enabled: false },
  { type: "blur", name: "Blur", value: 0, enabled: false },
  { type: "grayscale", name: "Grayscale", value: 0, enabled: false },
  { type: "sepia", name: "Sepia", value: 0, enabled: false },
  { type: "saturate", name: "Saturation", value: 100, enabled: false },
];

// Helper function to check if a video has been edited
const isVideoEdited = (clip: VideoClip): boolean => {
  // Check if any effects are enabled
  const hasEffects = clip.effects.some((effect) => effect.enabled);

  // Check if video has been trimmed
  const hasTrimming = clip.trimStart > 0 || clip.trimEnd < clip.duration;

  // Check if video has text overlays
  const hasTextOverlays = clip.textOverlays.length > 0;

  return hasEffects || hasTrimming || hasTextOverlays;
};

// Memoized Video Controls Component
const VideoControls = memo(function VideoControls({
  selectedClip,
  isPlaying,
  currentTime,
  isMuted,
  volume,
  onPlayPause,
  onTimeChange,
  onMuteToggle,
  onVolumeChange,
}: {
  selectedClip: VideoClip | null;
  isPlaying: boolean;
  currentTime: number;
  isMuted: boolean;
  volume: number;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
  onMuteToggle: () => void;
  onVolumeChange: (volume: number) => void;
}) {
  if (!selectedClip) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <PaperWithChildren variant="elevation" className="p-2 sm:p-3">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton onClick={onPlayPause} size="large" color="primary">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Typography
              variant="body2"
              className="min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">
                {formatTime(currentTime)} / {formatTime(selectedClip.duration)}
              </span>
              <span className="sm:hidden">{Math.round(currentTime)}s</span>
            </Typography>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton onClick={onMuteToggle} size="small">
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              value={isMuted ? 0 : volume}
              min={0}
              max={100}
              onChange={(_, value) => onVolumeChange(value as number)}
              size="small"
              className="w-12 sm:w-20"
            />
          </div>
        </div>
        <Slider
          value={currentTime}
          min={selectedClip.trimStart}
          max={selectedClip.trimEnd}
          onChange={(_, value) => onTimeChange(value as number)}
          size="small"
          className="w-full"
        />
      </div>
    </PaperWithChildren>
  );
});

// Video Effects Panel
const VideoEffectsPanel = memo(function VideoEffectsPanel({
  effects,
  onEffectToggle,
  onEffectValueChange,
}: {
  effects: VideoEffect[];
  onEffectToggle: (effectId: string) => void;
  onEffectValueChange: (effectId: string, value: number) => void;
}) {
  return (
    <div className="space-y-3">
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div className="flex items-center justify-between mb-2">
            <Typography
              variant="body2"
              fontWeight="medium"
              className="text-xs sm:text-sm"
            >
              {effect.name}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={effect.enabled}
                  onChange={() => onEffectToggle(effect.id)}
                  size="small"
                />
              }
              label=""
            />
          </div>
          {effect.enabled && (
            <Slider
              value={effect.value}
              min={
                effect.type === "blur"
                  ? 0
                  : effect.type === "grayscale" || effect.type === "sepia"
                  ? 0
                  : 50
              }
              max={
                effect.type === "blur"
                  ? 10
                  : effect.type === "grayscale" || effect.type === "sepia"
                  ? 100
                  : 200
              }
              onChange={(_, value) =>
                onEffectValueChange(effect.id, value as number)
              }
              size="small"
              valueLabelDisplay="auto"
              marks={[
                {
                  value:
                    effect.type === "blur"
                      ? 0
                      : effect.type === "grayscale" || effect.type === "sepia"
                      ? 0
                      : 100,
                  label: "Normal",
                },
              ]}
            />
          )}
        </div>
      ))}
    </div>
  );
});

// Trim Controls Panel
const TrimControlsPanel = memo(function TrimControlsPanel({
  selectedClip,
  onTrimChange,
}: {
  selectedClip: VideoClip | null;
  onTrimChange: (trimStart: number, trimEnd: number) => void;
}) {
  if (!selectedClip) return null;

  return (
    <div className="space-y-3">
      <Typography
        variant="h6"
        className="flex items-center gap-2 text-sm sm:text-base"
      >
        <ContentCut className="text-blue-600" />
        <span className="hidden sm:inline">Trim Video</span>
        <span className="sm:hidden">Trim</span>
      </Typography>
      <div className="p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50">
        <div className="space-y-3">
          <Typography
            variant="body2"
            fontWeight="medium"
            className="text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Trim Range: </span>
            {Math.round(selectedClip.trimStart)}s -{" "}
            {Math.round(selectedClip.trimEnd)}s
          </Typography>
          <Slider
            value={[selectedClip.trimStart, selectedClip.trimEnd]}
            min={0}
            max={selectedClip.duration}
            onChange={(_, value) => {
              const [start, end] = value as number[];
              onTrimChange(start, end);
            }}
            valueLabelDisplay="auto"
            size="small"
            marks={[
              { value: 0, label: "0s" },
              {
                value: selectedClip.duration,
                label: `${Math.round(selectedClip.duration)}s`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
});

// Draggable Text Overlay Component
const DraggableTextOverlay = memo(
  function DraggableTextOverlay({
    overlay,
    isSelected,
    currentTime,
    onUpdate,
    onSelect,
    videoContainerRect,
  }: {
    overlay: TextOverlay;
    isSelected: boolean;
    currentTime: number;
    onUpdate: (updates: Partial<TextOverlay>) => void;
    onSelect: () => void;
    videoContainerRect: DOMRect | null;
  }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeType, setResizeType] = useState<
      "se" | "sw" | "ne" | "nw" | null
    >(null);

    // Local state for position and size during drag/resize to prevent video re-renders
    const [localPosition, setLocalPosition] = useState({
      x: overlay.x,
      y: overlay.y,
    });
    const [localSize, setLocalSize] = useState({
      width: overlay.width,
      height: overlay.height,
    });

    // Update local state when overlay prop changes (but not during drag/resize)
    React.useEffect(() => {
      if (!isDragging && !isResizing) {
        setLocalPosition({ x: overlay.x, y: overlay.y });
        setLocalSize({ width: overlay.width, height: overlay.height });
      }
    }, [
      overlay.x,
      overlay.y,
      overlay.width,
      overlay.height,
      isDragging,
      isResizing,
    ]);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!videoContainerRect) return;

        if (isDragging) {
          const newX =
            ((e.clientX - videoContainerRect.left - dragOffset.x) /
              videoContainerRect.width) *
            100;
          const newY =
            ((e.clientY - videoContainerRect.top - dragOffset.y) /
              videoContainerRect.height) *
            100;

          setLocalPosition({
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
          });
        } else if (isResizing && resizeType) {
          const rect = videoContainerRect;
          const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
          const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

          let newWidth = localSize.width;
          let newHeight = localSize.height;
          let newX = localPosition.x;
          let newY = localPosition.y;

          // Handle different resize directions
          if (resizeType.includes("e")) {
            newWidth = Math.max(
              5,
              Math.min(50, mouseX - localPosition.x + localSize.width / 2)
            );
          }
          if (resizeType.includes("w")) {
            const rightEdge = localPosition.x + localSize.width / 2;
            newX = Math.max(0, Math.min(rightEdge - 5, mouseX));
            newWidth = Math.max(5, rightEdge - newX);
          }
          if (resizeType.includes("s")) {
            newHeight = Math.max(
              2,
              Math.min(20, mouseY - localPosition.y + localSize.height / 2)
            );
          }
          if (resizeType.includes("n")) {
            const bottomEdge = localPosition.y + localSize.height / 2;
            newY = Math.max(0, Math.min(bottomEdge - 2, mouseY));
            newHeight = Math.max(2, bottomEdge - newY);
          }

          setLocalPosition({ x: newX, y: newY });
          setLocalSize({ width: newWidth, height: newHeight });
        }
      },
      [
        isDragging,
        isResizing,
        dragOffset,
        videoContainerRect,
        resizeType,
        localPosition,
        localSize,
      ]
    );

    const handleMouseUp = useCallback(() => {
      if (isDragging || isResizing) {
        // Only update the actual overlay when drag/resize is complete
        onUpdate({
          x: localPosition.x,
          y: localPosition.y,
          width: localSize.width,
          height: localSize.height,
        });
      }
      setIsDragging(false);
      setIsResizing(false);
      setResizeType(null);
    }, [isDragging, isResizing, onUpdate, localPosition, localSize]);

    React.useEffect(() => {
      if (isDragging || isResizing) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    // Only show overlay if current time is within its time range
    const isVisible =
      currentTime >= overlay.startTime && currentTime <= overlay.endTime;

    if (!isVisible || !videoContainerRect) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      onSelect();

      // Update video container rect to ensure we have current dimensions
      if (videoContainerRect) {
        // Calculate offset from the center of the element since we use translate(-50%, -50%)
        const elementCenterX =
          (localPosition.x / 100) * videoContainerRect.width;
        const elementCenterY =
          (localPosition.y / 100) * videoContainerRect.height;

        setDragOffset({
          x: e.clientX - videoContainerRect.left - elementCenterX,
          y: e.clientY - videoContainerRect.top - elementCenterY,
        });
      }
    };

    const handleResizeMouseDown = (
      e: React.MouseEvent,
      type: "se" | "sw" | "ne" | "nw"
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeType(type);
      onSelect();
    };

    return (
      <div
        className={`absolute select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        style={{
          left: `${localPosition.x}%`,
          top: `${localPosition.y}%`,
          width: `${localSize.width}%`,
          height: `${localSize.height}%`,
          fontSize: `${overlay.fontSize}px`,
          color: overlay.color,
          fontFamily: overlay.fontFamily,
          fontWeight: overlay.fontWeight,
          backgroundColor: overlay.backgroundColor,
          opacity: overlay.opacity,
          padding: "4px 8px",
          borderRadius: "4px",
          transform: "translate(-50%, -50%)",
          zIndex: isSelected ? 10 : 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          wordWrap: "break-word",
          overflow: "hidden",
        }}
        onMouseDown={handleMouseDown}
      >
        {overlay.text || "Text Overlay"}

        {isSelected && (
          <>
            {/* Move indicator */}
            <DragIndicator
              className="absolute -top-2 -left-2 text-blue-500 bg-white rounded"
              fontSize="small"
            />

            {/* Resize handles */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize"
              onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
            />
            <div
              className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize"
              onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
            />
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize"
              onMouseDown={(e) => handleResizeMouseDown(e, "se")}
            />
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize"
              onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
            />
          </>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.overlay.id === nextProps.overlay.id &&
      prevProps.overlay.text === nextProps.overlay.text &&
      prevProps.overlay.x === nextProps.overlay.x &&
      prevProps.overlay.y === nextProps.overlay.y &&
      prevProps.overlay.width === nextProps.overlay.width &&
      prevProps.overlay.height === nextProps.overlay.height &&
      prevProps.overlay.fontSize === nextProps.overlay.fontSize &&
      prevProps.overlay.color === nextProps.overlay.color &&
      prevProps.overlay.fontFamily === nextProps.overlay.fontFamily &&
      prevProps.overlay.fontWeight === nextProps.overlay.fontWeight &&
      prevProps.overlay.backgroundColor === nextProps.overlay.backgroundColor &&
      prevProps.overlay.opacity === nextProps.overlay.opacity &&
      prevProps.overlay.startTime === nextProps.overlay.startTime &&
      prevProps.overlay.endTime === nextProps.overlay.endTime &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.currentTime === nextProps.currentTime &&
      prevProps.videoContainerRect?.width ===
        nextProps.videoContainerRect?.width &&
      prevProps.videoContainerRect?.height ===
        nextProps.videoContainerRect?.height
    );
  }
);

// Text Overlays Panel Component
const TextOverlaysPanel = memo(function TextOverlaysPanel({
  selectedClip,
  selectedTextOverlayId,
  onAddTextOverlay,
  onUpdateTextOverlay,
  onRemoveTextOverlay,
  onSelectTextOverlay,
}: {
  selectedClip: VideoClip | null;
  selectedTextOverlayId: string | null;
  onAddTextOverlay: () => void;
  onUpdateTextOverlay: (
    overlayId: string,
    updates: Partial<TextOverlay>
  ) => void;
  onRemoveTextOverlay: (overlayId: string) => void;
  onSelectTextOverlay: (overlayId: string | null) => void;
}) {
  if (!selectedClip) return null;

  const selectedOverlay = selectedClip.textOverlays.find(
    (overlay) => overlay.id === selectedTextOverlayId
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Typography
          variant="h6"
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          <TextFields className="text-blue-600" />
          <span className="hidden sm:inline">
            Text Overlays ({selectedClip.textOverlays.length})
          </span>
          <span className="sm:hidden">
            Text ({selectedClip.textOverlays.length})
          </span>
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={onAddTextOverlay}
          className="text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Add Text</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <div className="space-y-3 max-h-24 sm:max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {selectedClip.textOverlays.map((overlay) => (
          <Card
            key={overlay.id}
            variant={
              selectedTextOverlayId === overlay.id ? "elevation" : "outlined"
            }
            className={`p-3 cursor-pointer transition-all border-2 ${
              selectedTextOverlayId === overlay.id
                ? "bg-blue-50 border-blue-500 shadow-md"
                : "hover:bg-gray-50 border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectTextOverlay(overlay.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <TextFields
                  color={
                    selectedTextOverlayId === overlay.id ? "primary" : "action"
                  }
                  fontSize="small"
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    className="truncate text-xs sm:text-sm leading-tight mb-1"
                  >
                    {overlay.text || "Text Overlay"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className="text-xs leading-tight"
                  >
                    {Math.round(overlay.startTime)}s - {Math.round(overlay.endTime)}s
                  </Typography>
                </div>
              </div>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTextOverlay(overlay.id);
                }}
                className="text-red-500 hover:bg-red-50 flex-shrink-0 ml-2"
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>

      {selectedOverlay && (
        <div className="space-y-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
          <Typography
            variant="body2"
            fontWeight="medium"
            className="text-sm sm:text-base leading-tight"
          >
            Edit Text Overlay
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Text"
            value={selectedOverlay.text}
            onChange={(e) =>
              onUpdateTextOverlay(selectedOverlay.id, { text: e.target.value })
            }
            className="mb-1"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField
              size="small"
              label="Font Size"
              type="number"
              value={selectedOverlay.fontSize}
              onChange={(e) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  fontSize: Number(e.target.value),
                })
              }
            />
            <FormControl size="small">
              <InputLabel>Font Weight</InputLabel>
              <Select
                value={selectedOverlay.fontWeight}
                onChange={(e) =>
                  onUpdateTextOverlay(selectedOverlay.id, {
                    fontWeight: e.target.value,
                  })
                }
              >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="bold">Bold</MenuItem>
                <MenuItem value="lighter">Light</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField
              size="small"
              label="Text Color"
              type="color"
              value={selectedOverlay.color}
              onChange={(e) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  color: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              label="Background"
              type="color"
              value={selectedOverlay.backgroundColor}
              onChange={(e) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  backgroundColor: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField
              size="small"
              label="Width (%)"
              type="number"
              value={selectedOverlay.width}
              onChange={(e) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  width: Math.max(5, Math.min(50, Number(e.target.value))),
                })
              }
              inputProps={{ min: 5, max: 50, step: 1 }}
            />
            <TextField
              size="small"
              label="Height (%)"
              type="number"
              value={selectedOverlay.height}
              onChange={(e) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  height: Math.max(2, Math.min(20, Number(e.target.value))),
                })
              }
              inputProps={{ min: 2, max: 20, step: 1 }}
            />
          </div>

          <div className="space-y-2">
            <Typography variant="caption" className="text-xs sm:text-sm">
              Opacity
            </Typography>
            <Slider
              value={selectedOverlay.opacity}
              min={0}
              max={1}
              step={0.1}
              onChange={(_, value) =>
                onUpdateTextOverlay(selectedOverlay.id, {
                  opacity: value as number,
                })
              }
              valueLabelDisplay="auto"
              size="small"
            />
          </div>

          <div className="space-y-2">
            <Typography variant="caption" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Display Time: </span>
              {Math.round(selectedOverlay.startTime)}s -{" "}
              {Math.round(selectedOverlay.endTime)}s
            </Typography>
            <Slider
              value={[selectedOverlay.startTime, selectedOverlay.endTime]}
              min={0}
              max={selectedClip.duration}
              onChange={(_, value) => {
                const [start, end] = value as number[];
                onUpdateTextOverlay(selectedOverlay.id, {
                  startTime: start,
                  endTime: end,
                });
              }}
              valueLabelDisplay="auto"
              size="small"
              marks={[
                { value: 0, label: "0s" },
                {
                  value: selectedClip.duration,
                  label: `${Math.round(selectedClip.duration)}s`,
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default function VideoEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [state, setState] = useState<VideoEditorState>({
    clips: [],
    selectedClipId: null,
    isPlaying: false,
    currentTime: 0,
    isMuted: false,
    volume: 100,
    isProcessing: false,
    error: "",
    selectedTextOverlayId: null,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedClip =
    state.clips.find((clip) => clip.id === state.selectedClipId) || null;

  const showMessage = useCallback(
    (message: string) => {
      toolState.actions.showMessage(message);
    },
    [toolState.actions]
  );

  const handleFileSelect = useCallback(
    async (files: FileList) => {
      setState((prev) => ({ ...prev, isProcessing: true, error: "" }));

      try {
        const newClips: VideoClip[] = [];

        for (const file of Array.from(files)) {
          const videoElement = document.createElement("video");
          const url = URL.createObjectURL(file);
          videoElement.src = url;

          await new Promise<void>((resolve, reject) => {
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
                url,
                effects: DEFAULT_EFFECTS.map((effect) => ({
                  ...effect,
                  id: crypto.randomUUID(),
                })),
                textOverlays: [],
              };
              newClips.push(clip);
              resolve();
            };
            videoElement.onerror = reject;
          });
        }

        setState((prev) => ({
          ...prev,
          clips: [...prev.clips, ...newClips],
          selectedClipId: prev.selectedClipId || newClips[0]?.id || null,
          isProcessing: false,
        }));

        showMessage(`Successfully uploaded ${newClips.length} video(s)`);
      } catch {
        setState((prev) => ({
          ...prev,
          error: "Failed to load video files. Please try again.",
          isProcessing: false,
        }));
      }
    },
    [showMessage]
  );

  const handleError = useCallback((errorMessage: string) => {
    setState((prev) => ({ ...prev, error: errorMessage }));
  }, []);

  const handleClipSelect = useCallback(
    (clipId: string) => {
      setState((prev) => ({
        ...prev,
        selectedClipId: clipId,
        isPlaying: false,
        currentTime: 0,
      }));

      if (videoRef.current && selectedClip) {
        videoRef.current.currentTime = selectedClip.trimStart;
      }
    },
    [selectedClip]
  );

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (state.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [state.isPlaying]);

  const handleTimeChange = useCallback((time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !state.isMuted;
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, [state.isMuted]);

  const handleVolumeChange = useCallback((volume: number) => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume / 100;
    setState((prev) => ({ ...prev, volume, isMuted: volume === 0 }));
  }, []);

  const handleEffectToggle = useCallback((effectId: string) => {
    setState((prev) => ({
      ...prev,
      clips: prev.clips.map((clip) =>
        clip.id === prev.selectedClipId
          ? {
              ...clip,
              effects: clip.effects.map((effect) =>
                effect.id === effectId
                  ? { ...effect, enabled: !effect.enabled }
                  : effect
              ),
            }
          : clip
      ),
    }));
  }, []);

  const handleEffectValueChange = useCallback(
    (effectId: string, value: number) => {
      setState((prev) => ({
        ...prev,
        clips: prev.clips.map((clip) =>
          clip.id === prev.selectedClipId
            ? {
                ...clip,
                effects: clip.effects.map((effect) =>
                  effect.id === effectId ? { ...effect, value } : effect
                ),
              }
            : clip
        ),
      }));
    },
    []
  );

  const handleTrimChange = useCallback((trimStart: number, trimEnd: number) => {
    setState((prev) => ({
      ...prev,
      clips: prev.clips.map((clip) =>
        clip.id === prev.selectedClipId ? { ...clip, trimStart, trimEnd } : clip
      ),
    }));
  }, []);

  // Memoize video style to prevent unnecessary re-renders during effect changes
  const videoStyle = useMemo(() => {
    if (!selectedClip) return {};
    
    const activeEffects = selectedClip.effects.filter(effect => effect.enabled);
    if (activeEffects.length === 0) return {};

    const filters = activeEffects
      .map((effect) => {
        switch (effect.type) {
          case "brightness":
            return `brightness(${effect.value}%)`;
          case "contrast":
            return `contrast(${effect.value}%)`;
          case "blur":
            return `blur(${effect.value}px)`;
          case "grayscale":
            return `grayscale(${effect.value}%)`;
          case "sepia":
            return `sepia(${effect.value}%)`;
          case "saturate":
            return `saturate(${effect.value}%)`;
          default:
            return "";
        }
      })
      .filter(Boolean)
      .join(" ");

    return { filter: filters };
  }, [selectedClip]);

  const handleExport = useCallback(async () => {
    if (!selectedClip) {
      showMessage("Please select a video clip to export");
      return;
    }

    setState((prev) => ({ ...prev, isProcessing: true }));

    try {
      const a = document.createElement("a");
      a.href = selectedClip.url;
      a.download = `edited_${selectedClip.name}`;
      a.click();

      showMessage("Video exported successfully!");
    } catch {
      showMessage("Export failed. Please try again.");
    } finally {
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  }, [selectedClip, showMessage]);

  const handleRemoveClip = useCallback((clipId: string) => {
    setState((prev) => {
      const newClips = prev.clips.filter((clip) => clip.id !== clipId);
      const newSelectedClipId =
        prev.selectedClipId === clipId
          ? newClips[0]?.id || null
          : prev.selectedClipId;

      const removedClip = prev.clips.find((clip) => clip.id === clipId);
      if (removedClip) {
        URL.revokeObjectURL(removedClip.url);
      }

      return {
        ...prev,
        clips: newClips,
        selectedClipId: newSelectedClipId,
      };
    });
  }, []);

  // Text Overlay Handlers
  const handleAddTextOverlay = useCallback(() => {
    if (!selectedClip) return;

    const newOverlay: TextOverlay = {
      id: crypto.randomUUID(),
      text: "New Text",
      x: 50, // Center horizontally
      y: 50, // Center vertically
      width: 20, // Default width as percentage
      height: 8, // Default height as percentage
      fontSize: 24,
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      fontWeight: "normal",
      backgroundColor: "#000000",
      opacity: 0.8,
      startTime: state.currentTime,
      endTime: Math.min(state.currentTime + 5, selectedClip.duration), // 5 seconds or end of video
    };

    setState((prev) => ({
      ...prev,
      clips: prev.clips.map((clip) =>
        clip.id === selectedClip.id
          ? { ...clip, textOverlays: [...clip.textOverlays, newOverlay] }
          : clip
      ),
      selectedTextOverlayId: newOverlay.id,
    }));
  }, [selectedClip, state.currentTime]);

  const handleUpdateTextOverlay = useCallback(
    (overlayId: string, updates: Partial<TextOverlay>) => {
      if (!selectedClip) return;

      setState((prev) => ({
        ...prev,
        clips: prev.clips.map((clip) =>
          clip.id === selectedClip.id
            ? {
                ...clip,
                textOverlays: clip.textOverlays.map((overlay) =>
                  overlay.id === overlayId
                    ? { ...overlay, ...updates }
                    : overlay
                ),
              }
            : clip
        ),
      }));
    },
    [selectedClip]
  );

  const handleRemoveTextOverlay = useCallback(
    (overlayId: string) => {
      if (!selectedClip) return;

      setState((prev) => ({
        ...prev,
        clips: prev.clips.map((clip) =>
          clip.id === selectedClip.id
            ? {
                ...clip,
                textOverlays: clip.textOverlays.filter(
                  (overlay) => overlay.id !== overlayId
                ),
              }
            : clip
        ),
        selectedTextOverlayId:
          prev.selectedTextOverlayId === overlayId
            ? null
            : prev.selectedTextOverlayId,
      }));
    },
    [selectedClip]
  );

  const handleSelectTextOverlay = useCallback((overlayId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedTextOverlayId: overlayId,
    }));
  }, []);

  const [videoContainerRect, setVideoContainerRect] = useState<DOMRect | null>(
    null
  );

  // Update video container rect for drag positioning
  React.useEffect(() => {
    const updateVideoRect = () => {
      if (videoRef.current) {
        setVideoContainerRect(videoRef.current.getBoundingClientRect());
      }
    };

    // Debounced update to prevent excessive calls
    const timeoutId = setTimeout(updateVideoRect, 100);
    window.addEventListener("resize", updateVideoRect);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateVideoRect);
    };
  }, [selectedClip?.id]); // Only update when clip changes, not on every selectedClip change

  // Update video source when selected clip changes
  React.useEffect(() => {
    if (videoRef.current && selectedClip) {
      videoRef.current.src = selectedClip.url;
      videoRef.current.currentTime = selectedClip.trimStart;
    }
  }, [selectedClip]);

  // Handle video time updates
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: video.currentTime }));

      if (selectedClip && video.currentTime >= selectedClip.trimEnd) {
        video.pause();
        setState((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [selectedClip]);

  const buttons = React.useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Export Video",
        onClick: handleExport,
        icon: <Download />,
        disabled:
          !selectedClip ||
          state.isProcessing ||
          (selectedClip ? !isVideoEdited(selectedClip) : true),
      },
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [handleExport, selectedClip, state.isProcessing, toolState.toggleFullScreen]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Video Editor"
        description="Free online video editor with real-time preview. Trim videos, apply effects, add text overlays and more."
        exampleCode="Upload video files to start editing"
        exampleOutput="Edited video with effects and trimming applied"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {state.error && (
        <Alert severity="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      {state.isProcessing && (
        <div className="mb-4">
          <Typography variant="body2" className="mb-2">
            Processing video...
          </Typography>
          <LinearProgress />
        </div>
      )}

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

      {state.clips.length > 0 && (
        <div className="flex flex-col gap-4 h-full min-h-0">
          {/* Video Clips Section - Top Row */}
          <PaperWithChildren
            variant="elevation"
            className="p-3 sm:p-4 flex-shrink-0"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography
                  variant="h6"
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <VideoLibraryIcon className="text-blue-600" />
                  <span className="hidden sm:inline">
                    Video Clips ({state.clips.length})
                  </span>
                  <span className="sm:hidden">
                    Clips ({state.clips.length})
                  </span>
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  component="label"
                  className="text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Add Videos</span>
                  <span className="sm:hidden">Add</span>
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFileSelect(e.target.files);
                      }
                    }}
                  />
                </Button>
              </div>

              <div className="space-y-3 max-h-32 sm:max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {state.clips.map((clip) => (
                  <Card
                    key={clip.id}
                    variant={
                      state.selectedClipId === clip.id
                        ? "elevation"
                        : "outlined"
                    }
                    className={`p-3 cursor-pointer transition-all border-2 ${
                      state.selectedClipId === clip.id
                        ? "bg-blue-50 border-blue-500 shadow-md"
                        : "hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleClipSelect(clip.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <VideoLibraryIcon
                          color={
                            state.selectedClipId === clip.id
                              ? "primary"
                              : "action"
                          }
                          fontSize="small"
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Typography
                            variant="body2"
                            fontWeight="medium"
                            className="truncate text-xs sm:text-sm leading-tight mb-1"
                          >
                            {clip.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            className="text-xs leading-tight"
                          >
                            <span className="hidden sm:inline">
                              {formatBytes(clip.file.size)} •{" "}
                            </span>
                            {Math.round(clip.duration)}s
                            {isVideoEdited(clip) && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full leading-none">
                                <span className="hidden sm:inline">Edited</span>
                                <span className="sm:hidden">✓</span>
                              </span>
                            )}
                          </Typography>
                        </div>
                      </div>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveClip(clip.id);
                        }}
                        className="text-red-500 hover:bg-red-50 flex-shrink-0 ml-2"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </PaperWithChildren>

          {/* Bottom Row - Video Preview and Editing Controls Side by Side */}
          {selectedClip && (
            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
              {/* Left Column - Video Preview */}
              <div className="flex-1 min-w-0">
                <PaperWithChildren
                  variant="elevation"
                  className="p-3 sm:p-4 h-full"
                >
                  <div className="flex flex-col gap-4 h-full min-h-0">
                    <div className="flex items-center justify-between flex-shrink-0">
                      <Typography
                        variant="h6"
                        className="flex items-center gap-2 text-sm sm:text-base"
                      >
                        <PlayArrow className="text-blue-600" />
                        <span className="hidden sm:inline">Video Preview</span>
                        <span className="sm:hidden">Preview</span>
                      </Typography>
                      {isVideoEdited(selectedClip) && (
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Download />}
                          onClick={handleExport}
                          disabled={state.isProcessing}
                          className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                        >
                          <span className="hidden sm:inline">Export Video</span>
                          <span className="sm:hidden">Export</span>
                        </Button>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                      <div className="relative flex-1 bg-black rounded-lg overflow-hidden min-h-[200px] sm:min-h-[300px]">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-contain"
                          style={videoStyle}
                          onLoadedData={() => {
                            if (videoRef.current && selectedClip) {
                              videoRef.current.currentTime =
                                selectedClip.trimStart;
                              // Only update rect if not set yet
                              if (!videoContainerRect) {
                                setVideoContainerRect(
                                  videoRef.current.getBoundingClientRect()
                                );
                              }
                            }
                          }}
                        />

                        {/* Text Overlays */}
                        {selectedClip?.textOverlays.map((overlay) => (
                          <DraggableTextOverlay
                            key={overlay.id}
                            overlay={overlay}
                            isSelected={
                              state.selectedTextOverlayId === overlay.id
                            }
                            currentTime={state.currentTime}
                            onUpdate={(updates) =>
                              handleUpdateTextOverlay(overlay.id, updates)
                            }
                            onSelect={() => handleSelectTextOverlay(overlay.id)}
                            videoContainerRect={videoContainerRect}
                          />
                        ))}
                      </div>

                      <div className="flex-shrink-0">
                        <VideoControls
                          selectedClip={selectedClip}
                          isPlaying={state.isPlaying}
                          currentTime={state.currentTime}
                          isMuted={state.isMuted}
                          volume={state.volume}
                          onPlayPause={handlePlayPause}
                          onTimeChange={handleTimeChange}
                          onMuteToggle={handleMuteToggle}
                          onVolumeChange={handleVolumeChange}
                        />
                      </div>
                    </div>
                  </div>
                </PaperWithChildren>
              </div>

              {/* Right Column - Video Editing Controls */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="flex flex-col gap-4 h-full">
                  {/* Mobile: Stack controls, Desktop: Vertical layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {/* Trim Controls */}
                    <PaperWithChildren
                      variant="elevation"
                      className="p-3 sm:p-4"
                    >
                      <TrimControlsPanel
                        selectedClip={selectedClip}
                        onTrimChange={handleTrimChange}
                      />
                    </PaperWithChildren>

                    {/* Text Overlays */}
                    <PaperWithChildren
                      variant="elevation"
                      className="p-3 sm:p-4"
                    >
                      <TextOverlaysPanel
                        selectedClip={selectedClip}
                        selectedTextOverlayId={state.selectedTextOverlayId}
                        onAddTextOverlay={handleAddTextOverlay}
                        onUpdateTextOverlay={handleUpdateTextOverlay}
                        onRemoveTextOverlay={handleRemoveTextOverlay}
                        onSelectTextOverlay={handleSelectTextOverlay}
                      />
                    </PaperWithChildren>
                  </div>

                  {/* Video Effects - Full width */}
                  <PaperWithChildren
                    variant="elevation"
                    className="p-3 sm:p-4 flex-1 min-h-0"
                  >
                    <div className="h-full flex flex-col">
                      <Typography
                        variant="h6"
                        className="flex items-center gap-2 flex-shrink-0 mb-3 text-sm sm:text-base"
                      >
                        <Tune className="text-blue-600" />
                        Effects
                      </Typography>
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <VideoEffectsPanel
                          effects={selectedClip.effects}
                          onEffectToggle={handleEffectToggle}
                          onEffectValueChange={handleEffectValueChange}
                        />
                      </div>
                    </div>
                  </PaperWithChildren>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
