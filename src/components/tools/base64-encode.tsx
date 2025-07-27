"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import { copyToClipboard } from "@/util/commonUtils";
import { SnackBarWithPosition } from "../lib/snackBar";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FILE_SIZE_PRESETS } from "../../util/fileValidation";

export default function Base64Encode() {
  const [base64Data, setBase64Data] = useState<string>("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const snackBarMessage = "Base64 Data Copied!";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result;
      setBase64Data(base64Data as string);
      setError(""); // Clear any previous errors
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const copyBase64DataURI = () => {
    copyToClipboard(base64Data);
    setIsSnackBarOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />

      {/* Error message */}
      {error && (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
          <Typography variant="body2" className="text-red-800">
            {error}
          </Typography>
        </div>
      )}

      {/* File Upload */}
      <FileUploadWithDragDrop
        accept="*/*"
        multiple={false}
        maxSize={FILE_SIZE_PRESETS.LARGE}
        onFileSelect={handleFileSelect}
        onError={handleError}
        title="Upload File to Encode"
        subtitle="Drag and drop your file here or click to browse"
        supportText="Supports any file type up to 10MB"
      />

      <div className="flex flex-col w-full justify-end gap-2">
        <ButtonWithHandler
          buttonText="Copy Base64 Data"
          onClick={copyBase64DataURI}
          size="small"
          variant="contained"
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <Typography
          color="textSecondary"
          variant="caption"
          sx={{ overflowWrap: "anywhere" }}
        >
          Base64 data example:
          iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVR4nGNgGAWjYBSMwFgYwB
          ...
        </Typography>
      </div>

      <div className="flex flex-col w-full">
        <Typography variant="h3" sx={{ fontSize: "inherit" }} color="primary">
          Base64 Encoded Data
        </Typography>
        <div className="w-full border-solid border-2 border-lightgrey rounded-sm p-4 min-h-[100px]">
          <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
            {base64Data ||
              "Upload a file to see the Base64 encoded data here..."}
          </Typography>
        </div>
      </div>
    </div>
  );
}
