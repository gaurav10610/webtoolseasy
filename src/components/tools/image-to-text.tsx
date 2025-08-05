"use client";

import React, { useState, useCallback } from "react";
import { Typography, Button, Alert, LinearProgress } from "@mui/material";
import { Upload, ContentCopy, Delete } from "@mui/icons-material";
import { ToolLayout } from "../common/ToolLayout";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { formatBytes } from "@/util/commonUtils";

// Dynamically import Tesseract for OCR
const loadTesseract = () => import("tesseract.js");

interface ImageToTextState {
  selectedFile: File | null;
  extractedText: string;
  isProcessing: boolean;
  progress: number;
  error: string;
}

export default function ImageToText() {
  const [state, setState] = useState<ImageToTextState>({
    selectedFile: null,
    extractedText: "",
    isProcessing: false,
    progress: 0,
    error: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const showMessage = useCallback((message: string) => {
    setSnackBar({ open: true, message });
  }, []);

  const handleFileSelect = useCallback((files: FileList) => {
    const file = files[0];
    setState((prev) => ({
      ...prev,
      selectedFile: file,
      extractedText: "",
      error: "",
      progress: 0,
    }));
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setState((prev) => ({ ...prev, error: errorMessage }));
  }, []);

  const extractText = useCallback(async () => {
    if (!state.selectedFile) return;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: "",
    }));

    try {
      const Tesseract = await loadTesseract();

      const {
        data: { text },
      } = await Tesseract.recognize(state.selectedFile, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setState((prev) => ({
              ...prev,
              progress: Math.round(m.progress * 100),
            }));
          }
        },
      });

      setState((prev) => ({
        ...prev,
        extractedText: text,
        isProcessing: false,
        progress: 100,
      }));

      showMessage("Text extracted successfully!");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: `Failed to extract text: ${
          error instanceof Error ? error.message : String(error)
        }`,
        isProcessing: false,
        progress: 0,
      }));
    }
  }, [state.selectedFile, showMessage]);

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(state.extractedText);
    showMessage("Text copied to clipboard!");
  }, [state.extractedText, showMessage]);

  const clearAll = useCallback(() => {
    setState({
      selectedFile: null,
      extractedText: "",
      isProcessing: false,
      progress: 0,
      error: "",
    });
  }, []);

  return (
    <ToolLayout
      snackBar={{
        open: snackBar.open,
        message: snackBar.message,
        onClose: () => setSnackBar((prev) => ({ ...prev, open: false })),
      }}
    >
      <div className="space-y-4">
        <div>
          <Typography variant="h5" gutterBottom>
            Image to Text (OCR)
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Extract text from images using Optical Character Recognition
          </Typography>
        </div>

        {/* Error message */}
        {state.error && <Alert severity="error">{state.error}</Alert>}

        {/* File Upload */}
        {!state.selectedFile && (
          <FileUploadWithDragDrop
            accept="image/*"
            multiple={false}
            allowedTypes={FILE_TYPE_PRESETS.IMAGES}
            maxSize={FILE_SIZE_PRESETS.LARGE}
            onFileSelect={handleFileSelect}
            onError={handleError}
            title="Upload Image for Text Extraction"
            subtitle="Drag and drop your image here or click to browse"
            supportText="Supports JPG, PNG, GIF, BMP, WebP formats up to 10MB"
          />
        )}

        {/* Selected File Info */}
        {state.selectedFile && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Typography variant="subtitle1" fontWeight="medium">
                  {state.selectedFile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatBytes(state.selectedFile.size)}
                </Typography>
              </div>
              <Button
                startIcon={<Delete />}
                onClick={clearAll}
                color="error"
                size="small"
              >
                Remove
              </Button>
            </div>

            {/* Image Preview */}
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(state.selectedFile)}
                alt="Selected image for text extraction"
                className="max-w-full max-h-64 object-contain rounded border"
              />
            </div>

            {/* Extract Button */}
            <Button
              variant="contained"
              startIcon={<Upload />}
              onClick={extractText}
              disabled={state.isProcessing}
              fullWidth
            >
              {state.isProcessing
                ? `Extracting... ${state.progress}%`
                : "Extract Text"}
            </Button>

            {/* Progress bar */}
            {state.isProcessing && (
              <div className="mt-2">
                <LinearProgress variant="determinate" value={state.progress} />
              </div>
            )}
          </div>
        )}

        {/* Extracted Text */}
        {state.extractedText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Typography variant="h6">Extracted Text</Typography>
              <Button
                startIcon={<ContentCopy />}
                onClick={copyText}
                size="small"
              >
                Copy Text
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-white min-h-[200px] whitespace-pre-wrap font-mono text-sm">
              {state.extractedText}
            </div>
            <Typography variant="caption" color="textSecondary">
              Character count: {state.extractedText.length}
            </Typography>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
