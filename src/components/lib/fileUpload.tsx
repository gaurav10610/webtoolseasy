"use client";

import React, { useRef, useState, useCallback } from "react";
import { Typography, LinearProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  validateFiles,
  FileValidationOptions,
} from "../../util/fileValidation";

interface FileUploadProps extends FileValidationOptions {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: FileList) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  progress?: number;
  dragText?: string;
  supportText?: string;
}

export function FileUploadWithDragDrop({
  accept = "*/*",
  multiple = false,
  maxSize,
  allowedTypes,
  allowedExtensions,
  minSize,
  onFileSelect,
  onError,
  disabled = false,
  children,
  className = "",
  title,
  subtitle,
  showProgress = false,
  progress = 0,
  dragText,
  supportText,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const validationResult = validateFiles(files, {
        maxSize,
        allowedTypes,
        allowedExtensions,
        minSize,
      });

      if (!validationResult.isValid) {
        onError?.(validationResult.error || "File validation failed");
        return;
      }

      onFileSelect(files);
    },
    [onFileSelect, maxSize, allowedTypes, allowedExtensions, minSize, onError]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(event.target.files);
      // Reset input value to allow selecting the same file again
      if (event.target) {
        event.target.value = "";
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Only set isDragOver to false if we're leaving the drop zone completely
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = event.dataTransfer.files;
      handleFileSelect(files);
    },
    [disabled, handleFileSelect]
  );

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={`mb-4 min-w-0 ${className}`}>
      {title && (
        <Typography variant="h6" className="mb-3">
          {title}
        </Typography>
      )}

      <div
        className={`
          border-2 border-dashed rounded-lg p-6 transition-all duration-200 min-w-0
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            openFileDialog();
          }
        }}
        aria-label={`Upload files. ${
          accept !== "*/*" ? `Accepted formats: ${accept}` : ""
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          aria-hidden="true"
        />

        {children || (
          <div className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800">
            <UploadFileIcon className="mb-2 text-4xl" />
            <span className="text-lg font-medium break-words text-center">
              {dragText ||
                (showProgress && progress > 0
                  ? `Processing... ${progress}%`
                  : "Select or drag and drop your files here")}
            </span>
            {subtitle && (
              <span className="text-sm text-gray-500 mt-1 break-words text-center">
                {subtitle}
              </span>
            )}
            {supportText && (
              <span className="text-sm text-gray-500 mt-1 break-words text-center">
                {supportText}
              </span>
            )}
            {maxSize && (
              <span className="text-xs text-gray-400 mt-1 break-words text-center">
                Maximum file size: {(maxSize / (1024 * 1024)).toFixed(1)} MB
              </span>
            )}
          </div>
        )}

        {showProgress && progress > 0 && (
          <div className="mt-4">
            <LinearProgress
              variant="determinate"
              value={progress}
              className="rounded-full"
            />
            <p className="text-sm text-gray-600 mt-2 text-center break-words">
              Loading file in chunks for optimal performance...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadWithDragDrop;
