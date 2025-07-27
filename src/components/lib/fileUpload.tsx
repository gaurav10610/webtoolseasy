"use client";

import { useState, useRef, DragEvent } from "react";
import { Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  title?: string;
  description?: string;
  isUploading?: boolean;
  uploadProgress?: number;
  disabled?: boolean;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
}

export const FileUploadWithDragDrop = ({
  onFileSelect,
  accept = "*/*",
  multiple = false,
  title = "Upload File",
  description = "Select or drag and drop your file here",
  isUploading = false,
  uploadProgress = 0,
  disabled = false,
  maxFileSize = 50,
  allowedTypes = [],
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError("");

    // Check file size
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxFileSize) {
      setError(`File size exceeds ${maxFileSize}MB limit`);
      return false;
    }

    // Check file type if allowedTypes is specified
    if (allowedTypes.length > 0) {
      const isValidType = allowedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.includes(type);
      });

      if (!isValidType) {
        setError(
          `File type not supported. Allowed types: ${allowedTypes.join(", ")}`
        );
        return false;
      }
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    if (disabled || isUploading) return;

    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getBorderColor = () => {
    if (error) return "border-red-300";
    if (isDragOver) return "border-blue-500";
    return "border-gray-300";
  };

  const getBackgroundColor = () => {
    if (error) return "bg-red-50";
    if (isDragOver) return "bg-blue-50";
    if (isUploading) return "bg-gray-100";
    return "bg-gray-50 hover:bg-gray-100";
  };

  return (
    <div className="mb-4 min-w-0">
      <Typography variant="h6" className="mb-3">
        {title}
      </Typography>
      <div
        className={`border-2 border-dashed ${getBorderColor()} rounded-lg p-6 ${getBackgroundColor()} transition-colors min-w-0 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isUploading}
        />
        <div
          className={`flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 ${
            disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <UploadFileIcon className="mb-2 text-4xl" />
          <span className="text-lg font-medium break-words">
            {isUploading ? `Processing... ${uploadProgress}%` : description}
          </span>
          <span className="text-sm text-gray-500 mt-1 break-words text-center">
            {allowedTypes.length > 0 && !error && (
              <>Supported formats: {allowedTypes.join(", ")}</>
            )}
            {maxFileSize && !error && <> • Max size: {maxFileSize}MB</>}
          </span>
          {error && (
            <span className="text-sm text-red-500 mt-1 break-words text-center">
              {error}
            </span>
          )}
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center break-words">
              Processing file...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
