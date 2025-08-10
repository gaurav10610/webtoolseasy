"use client";

import { useState, useEffect } from "react";
import { ToolComponentProps } from "@/types/component";
import { Typography, Card, CardContent, Alert, Button } from "@mui/material";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { SnackBarWithPosition } from "../lib/snackBar";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import Tesseract from "tesseract.js";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ToolLayout, SEOContent } from "../common/ToolLayout";

interface OCRProgress {
  status: string;
  progress: number;
}

export default function ImageToTextConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const currentPath = usePathname();
  const textQueryParam = queryParams.content;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>(
    textQueryParam ? decodeText(textQueryParam) : ""
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OCRProgress>({
    status: "",
    progress: 0,
  });
  const [error, setError] = useState<string>("");

  // Snackbar states
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleFileSelect = (files: FileList) => {
    const file = files[0]; // Get the first file

    // Clean up previous image preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
    setExtractedText("");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const extractTextFromImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsProcessing(true);
    setError("");
    setOcrProgress({ status: "Initializing...", progress: 0 });

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(selectedImage, "eng", {
        logger: (m) => {
          setOcrProgress({
            status: m.status,
            progress: Math.round(m.progress * 100),
          });
        },
      });

      setExtractedText(text.trim());
      setSnackBarMessage("Text extracted successfully!");
      setIsSnackBarOpen(true);
    } catch (err) {
      console.error("OCR Error:", err);
      setError("Failed to extract text from image. Please try again.");
    } finally {
      setIsProcessing(false);
      setOcrProgress({ status: "", progress: 0 });
    }
  };

  const handleTextCopy = () => {
    if (!extractedText) {
      setError("No text to copy");
      return;
    }
    copyToClipboard(extractedText);
    setSnackBarMessage("Text copied to clipboard!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = async () => {
    if (!extractedText) {
      setError("No text to share");
      return;
    }

    try {
      const compressedData = await compressStringToBase64(extractedText);
      const url = `${hostname}${currentPath}?content=${encodeText(
        compressedData
      )}`;
      copyToClipboard(url);
      setSnackBarMessage("Shareable link copied to clipboard!");
      setIsSnackBarOpen(true);
    } catch (err) {
      console.error("Link generation error:", err);
      setError("Failed to generate shareable link");
    }
  };

  const handleDownloadText = () => {
    if (!extractedText) {
      setError("No text to download");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `extracted-text-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setSnackBarMessage("Text file downloaded!");
    setIsSnackBarOpen(true);
  };

  const clearAll = () => {
    // Clean up image preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");
    setExtractedText("");
    setError("");
    setOcrProgress({ status: "", progress: 0 });
  };

  const ControlButtons = () => (
    <div className="flex flex-col gap-2 w-full md:flex-row">
      <Button
        variant="contained"
        size="small"
        startIcon={<TextFieldsIcon />}
        onClick={extractTextFromImage}
        disabled={!selectedImage || isProcessing}
      >
        Extract Text
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<ContentCopyIcon />}
        onClick={handleTextCopy}
        disabled={!extractedText}
      >
        Copy Text
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<DownloadIcon />}
        onClick={handleDownloadText}
        disabled={!extractedText}
      >
        Download Text
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<LinkIcon />}
        onClick={handleLinkCopy}
        disabled={!extractedText}
      >
        Copy Shareable Link
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<RefreshIcon />}
        onClick={clearAll}
        disabled={isProcessing}
      >
        Clear All
      </Button>
    </div>
  );

  return (
    <ToolLayout>
      <SEOContent
        title="Image to Text Converter (OCR)"
        description="Free online OCR tool to extract text from images. Convert JPG, PNG, WebP images to editable text using advanced optical character recognition."
        exampleCode="image.jpg"
        exampleOutput="Extracted text content"
      />

      <div className="flex flex-col gap-4 w-full h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Typography variant="h4" component="h1" className="truncate">
            Free Image to Text Converter
          </Typography>
        </div>

        {/* Snackbar */}
        <SnackBarWithPosition
          message={snackBarMessage}
          open={isSnackBarOpen}
          autoHideDuration={3000}
          handleClose={handleSnackBarClose}
          vertical="bottom"
          horizontal="center"
        />

        {/* Control Buttons */}
        <ControlButtons />

        {/* Error Alert */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* File Upload Section */}
        <FileUploadWithDragDrop
          onFileSelect={handleFileSelect}
          onError={handleError}
          accept="image/*"
          multiple={false}
          allowedTypes={FILE_TYPE_PRESETS.IMAGES}
          maxSize={FILE_SIZE_PRESETS.LARGE}
          title="Upload Image"
          subtitle="Select or drag and drop your image here"
          supportText="Supports JPG, PNG, GIF, BMP, WebP formats up to 10MB"
          disabled={isProcessing}
        />

        {/* Processing Progress */}
        {isProcessing && (
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-800 font-medium">
                  {ocrProgress.status}
                </span>
                <span className="text-blue-600">{ocrProgress.progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${ocrProgress.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Extracting text from image using OCR technology...
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col w-full gap-4 flex-grow min-w-0 md:flex-row md:h-[500px]">
          {/* Image Preview Section */}
          <div className="w-full md:w-1/2 flex flex-col min-h-0">
            <Typography variant="h6" className="mb-3 flex items-center gap-2">
              <ImageIcon />
              Image Preview
            </Typography>
            <div className="flex-1 border border-gray-200 rounded-lg bg-white flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500 p-8">
                  <ImageIcon className="text-6xl mb-4" />
                  <Typography variant="body1">
                    Upload an image to see preview
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Text Section */}
          <div className="w-full md:w-1/2 flex flex-col min-h-0">
            <Typography variant="h6" className="mb-3 flex items-center gap-2">
              <TextFieldsIcon />
              Extracted Text
            </Typography>
            <div className="flex-1 border border-gray-200 rounded-lg bg-white overflow-hidden">
              {extractedText || selectedImage ? (
                <SingleCodeEditorWithHeaderV2
                  codeEditorProps={{
                    language: "plaintext",
                    value:
                      extractedText ||
                      "Click 'Extract Text' to get text from your image...",
                    onChange: setExtractedText,
                    className: "h-full",
                    editorOptions: {
                      wordWrap: "on",
                      lineNumbers: "off",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      padding: { top: 16, bottom: 16 },
                      readOnly: !extractedText,
                    },
                  }}
                  themeOption="vs-light"
                  className="w-full h-full border-0 rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500 p-8">
                  <div>
                    <TextFieldsIcon className="text-6xl mb-4" />
                    <Typography variant="body1">
                      Upload an image to extract text
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
