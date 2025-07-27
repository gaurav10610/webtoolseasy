"use client";

import React from "react";
import Image from "next/image";
import { Typography, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { formatBytes } from "../../util/commonUtils";

interface FilePreviewItem {
  id: string;
  file: File;
  preview?: string;
  isSelected?: boolean;
  showProgress?: boolean;
  progress?: number;
  status?: "idle" | "processing" | "completed" | "error";
  statusText?: string;
}

interface FilePreviewProps {
  files: FilePreviewItem[];
  onFileSelect?: (id: string) => void;
  onFileRemove?: (id: string) => void;
  showFileInfo?: boolean;
  previewSize?: "small" | "medium" | "large";
  layout?: "grid" | "list";
  className?: string;
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith("image/")) return <ImageIcon />;
  if (fileType.startsWith("video/")) return <VideoFileIcon />;
  if (fileType.startsWith("audio/")) return <AudioFileIcon />;
  if (fileType === "application/pdf") return <PictureAsPdfIcon />;
  return <InsertDriveFileIcon />;
}

function getFilePreview(
  file: File,
  preview?: string,
  size: "small" | "medium" | "large" = "medium"
) {
  const isImage = file.type.startsWith("image/");
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  if (isImage && preview) {
    return (
      <Image
        src={preview}
        alt={file.name}
        width={size === "small" ? 64 : size === "medium" ? 96 : 128}
        height={size === "small" ? 64 : size === "medium" ? 96 : 128}
        className={`${sizeClasses[size]} object-cover rounded-md`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center bg-gray-100 rounded-md border-2 border-dashed border-gray-300`}
    >
      {getFileIcon(file.type)}
    </div>
  );
}

function FilePreviewCard({
  item,
  onSelect,
  onRemove,
  showFileInfo,
  previewSize,
  layout,
}: {
  item: FilePreviewItem;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  showFileInfo?: boolean;
  previewSize?: "small" | "medium" | "large";
  layout?: "grid" | "list";
}) {
  const {
    id,
    file,
    preview,
    isSelected,
    showProgress,
    progress,
    status,
    statusText,
  } = item;

  const isListLayout = layout === "list";

  return (
    <div
      className={`
        relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400"
        }
        ${
          isListLayout
            ? "flex items-center gap-3"
            : "flex flex-col items-center"
        }
      `}
      onClick={() => onSelect?.(id)}
    >
      {onRemove && (
        <IconButton
          size="small"
          className={`absolute ${
            isListLayout ? "right-2 top-1/2 -translate-y-1/2" : "right-1 top-1"
          } z-10 bg-white shadow-sm hover:bg-red-50`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          <DeleteIcon fontSize="small" className="text-red-500" />
        </IconButton>
      )}

      <div className={isListLayout ? "shrink-0" : ""}>
        {getFilePreview(file, preview, previewSize)}
      </div>

      {showFileInfo && (
        <div
          className={`${isListLayout ? "flex-1 min-w-0" : "mt-2 text-center"}`}
        >
          <Typography
            variant="body2"
            className={`font-medium ${isListLayout ? "truncate" : "break-all"}`}
            title={file.name}
          >
            {file.name}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {formatBytes(file.size)}
          </Typography>

          {status && status !== "idle" && (
            <div className="mt-1">
              <Chip
                size="small"
                label={statusText || status}
                color={
                  status === "completed"
                    ? "success"
                    : status === "processing"
                    ? "primary"
                    : status === "error"
                    ? "error"
                    : "default"
                }
                variant="outlined"
              />
            </div>
          )}
        </div>
      )}

      {showProgress && progress !== undefined && progress > 0 && (
        <div className={`${isListLayout ? "w-full" : "w-full mt-2"}`}>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <Typography
            variant="caption"
            className="text-gray-600 text-center block mt-1"
          >
            {progress}%
          </Typography>
        </div>
      )}
    </div>
  );
}

export function FilePreview({
  files,
  onFileSelect,
  onFileRemove,
  showFileInfo = true,
  previewSize = "medium",
  layout = "grid",
  className = "",
}: FilePreviewProps) {
  if (files.length === 0) {
    return null;
  }

  const isListLayout = layout === "list";

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
        ${
          isListLayout
            ? "space-y-2"
            : `grid gap-3 ${
                previewSize === "small"
                  ? "grid-cols-6"
                  : previewSize === "medium"
                  ? "grid-cols-4"
                  : "grid-cols-3"
              } md:grid-cols-${
                previewSize === "small"
                  ? "8"
                  : previewSize === "medium"
                  ? "6"
                  : "4"
              }`
        }
      `}
      >
        {files.map((item) => (
          <FilePreviewCard
            key={item.id}
            item={item}
            onSelect={onFileSelect}
            onRemove={onFileRemove}
            showFileInfo={showFileInfo}
            previewSize={previewSize}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
}

export default FilePreview;
