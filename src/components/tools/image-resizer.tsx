"use client";

import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Slider,
  Alert,
} from "@mui/material";
import { useState, useCallback } from "react";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";
import imageCompression from "browser-image-compression";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface ImageInfo {
  file: File;
  preview: string;
  width: number;
  height: number;
  size: number;
}

export default function ImageResizer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [resizedImage, setResizedImage] = useState<ImageInfo | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const [quality, setQuality] = useState<number>(90);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadImageInfo = useCallback((file: File): Promise<ImageInfo> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const preview = URL.createObjectURL(file);

      img.onload = () => {
        resolve({
          file,
          preview,
          width: img.width,
          height: img.height,
          size: file.size,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(preview);
        reject(new Error("Failed to load image"));
      };

      img.src = preview;
    });
  }, []);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      try {
        setError("");
        const imageInfo = await loadImageInfo(file);
        setOriginalImage(imageInfo);
        setTargetWidth(imageInfo.width);
        setTargetHeight(imageInfo.height);
        setResizedImage(null);
      } catch {
        setError("Failed to load image. Please try another file.");
      }
    },
    [loadImageInfo]
  );

  const handleWidthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const width = Number(event.target.value);
      setTargetWidth(width);

      if (maintainRatio && originalImage) {
        const ratio = originalImage.height / originalImage.width;
        setTargetHeight(Math.round(width * ratio));
      }
    },
    [maintainRatio, originalImage]
  );

  const handleHeightChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const height = Number(event.target.value);
      setTargetHeight(height);

      if (maintainRatio && originalImage) {
        const ratio = originalImage.width / originalImage.height;
        setTargetWidth(Math.round(height * ratio));
      }
    },
    [maintainRatio, originalImage]
  );

  const createImageBlob = useCallback(
    (file: File, width: number, height: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            file.type,
            quality / 100
          );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    },
    [quality]
  );

  const handleResize = useCallback(async () => {
    if (!originalImage) return;

    try {
      setProcessing(true);
      setError("");

      const options = {
        maxWidthOrHeight: Math.max(targetWidth, targetHeight),
        useWebWorker: true,
        maxSizeMB: 10,
        initialQuality: quality / 100,
      };

      const compressedFile = await imageCompression(
        originalImage.file,
        options
      );

      // Create a new image with exact dimensions
      const resizedBlob = await createImageBlob(
        compressedFile,
        targetWidth,
        targetHeight
      );

      const resizedFile = new File([resizedBlob], originalImage.file.name, {
        type: originalImage.file.type,
      });

      const resizedInfo = await loadImageInfo(resizedFile);
      setResizedImage(resizedInfo);
      setProcessing(false);
    } catch {
      setError("Failed to resize image. Please try again.");
      setProcessing(false);
    }
  }, [
    originalImage,
    targetWidth,
    targetHeight,
    quality,
    loadImageInfo,
    createImageBlob,
  ]);

  const handleDownload = useCallback(() => {
    if (!resizedImage) return;

    const link = document.createElement("a");
    link.href = resizedImage.preview;
    link.download = `resized_${originalImage?.file.name || "image"}`;
    link.click();
  }, [resizedImage, originalImage]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Image Resizer"
        description="Resize and compress images online for free. Support for JPG, PNG, WebP with client-side processing."
        exampleCode="Upload any image file"
        exampleOutput="Resized and optimized image"
      />

      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Upload Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Select Image
              </Typography>
            </div>

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleFileSelect}
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                size="large"
                fullWidth
              >
                Choose Image File
              </Button>
            </label>

            {originalImage && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Typography variant="body2" className="text-gray-700">
                  <strong>File:</strong> {originalImage.file.name}
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  <strong>Original Size:</strong> {originalImage.width} x{" "}
                  {originalImage.height} px
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  <strong>File Size:</strong>{" "}
                  {formatFileSize(originalImage.size)}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        {originalImage && (
          <>
            {/* Settings Section */}
            <Card className="border border-gray-200">
              <CardContent>
                <Typography variant="h6" className="mb-3 text-gray-800">
                  Resize Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Target Width (px)"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={targetWidth}
                      onChange={handleWidthChange}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Target Height (px)"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={targetHeight}
                      onChange={handleHeightChange}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={maintainRatio}
                          onChange={(e) => setMaintainRatio(e.target.checked)}
                        />
                      }
                      label="Maintain Aspect Ratio"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography gutterBottom>Quality: {quality}%</Typography>
                    <Slider
                      value={quality}
                      onChange={(_, value) => setQuality(value as number)}
                      min={10}
                      max={100}
                      step={5}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleResize}
                      disabled={processing}
                    >
                      {processing ? "Processing..." : "Resize Image"}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card className="border border-gray-200 h-full">
                  <CardContent>
                    <Typography variant="h6" className="mb-3 text-gray-800">
                      Original
                    </Typography>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalImage.preview}
                      alt="Original"
                      className="w-full h-auto rounded border border-gray-300"
                    />
                    <div className="mt-2 text-center">
                      <Typography variant="body2" className="text-gray-600">
                        {originalImage.width} x {originalImage.height} px
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {formatFileSize(originalImage.size)}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {resizedImage && (
                <Grid item xs={12} md={6}>
                  <Card className="border-2 border-green-500 h-full">
                    <CardContent>
                      <Typography variant="h6" className="mb-3 text-green-700">
                        Resized
                      </Typography>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resizedImage.preview}
                        alt="Resized"
                        className="w-full h-auto rounded border border-gray-300"
                      />
                      <div className="mt-2 text-center">
                        <Typography variant="body2" className="text-gray-600">
                          {resizedImage.width} x {resizedImage.height} px
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {formatFileSize(resizedImage.size)}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-green-600 font-semibold"
                        >
                          Reduced by{" "}
                          {(
                            ((originalImage.size - resizedImage.size) /
                              originalImage.size) *
                            100
                          ).toFixed(1)}
                          %
                        </Typography>
                      </div>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<DownloadIcon />}
                        fullWidth
                        className="mt-3"
                        onClick={handleDownload}
                      >
                        Download Resized Image
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
