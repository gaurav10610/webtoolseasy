"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  SelectChangeEvent,
} from "@mui/material";
import { CloudUpload, Download, Crop, Refresh } from "@mui/icons-material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CropImage({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [aspectRatio, setAspectRatio] = useState<string>("free");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const aspectRatios = [
    { value: "free", label: "Free" },
    { value: "1:1", label: "Square (1:1)" },
    { value: "4:3", label: "Standard (4:3)" },
    { value: "16:9", label: "Widescreen (16:9)" },
    { value: "3:2", label: "Photo (3:2)" },
    { value: "2:3", label: "Portrait (2:3)" },
  ];

  const drawPreview = useCallback(
    (img: HTMLImageElement) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to fit container while maintaining aspect ratio
      const maxWidth = 400;
      const maxHeight = 300;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw crop overlay
      const overlayX = (cropArea.x / 100) * canvas.width;
      const overlayY = (cropArea.y / 100) * canvas.height;
      const overlayWidth = (cropArea.width / 100) * canvas.width;
      const overlayHeight = (cropArea.height / 100) * canvas.height;

      // Darken outside crop area
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, overlayY);
      ctx.fillRect(0, overlayY, overlayX, overlayHeight);
      ctx.fillRect(
        overlayX + overlayWidth,
        overlayY,
        canvas.width - overlayX - overlayWidth,
        overlayHeight
      );
      ctx.fillRect(
        0,
        overlayY + overlayHeight,
        canvas.width,
        canvas.height - overlayY - overlayHeight
      );

      // Draw crop area border
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.strokeRect(overlayX, overlayY, overlayWidth, overlayHeight);
    },
    [cropArea]
  );

  const loadImage = useCallback(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });

      // Draw image on canvas for preview
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      }

      drawPreview(img);
    };
    img.src = imageUrl;
  }, [imageUrl, drawPreview]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setError("");
      setCroppedImage(null);
    }
  };

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => drawPreview(img);
      img.src = imageUrl;
    }
  }, [cropArea, imageUrl, drawPreview]);

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);

    if (ratio !== "free") {
      const [widthRatio, heightRatio] = ratio.split(":").map(Number);
      const aspectValue = widthRatio / heightRatio;

      // Adjust crop area to maintain aspect ratio
      const currentAspect = cropArea.width / cropArea.height;

      if (currentAspect !== aspectValue) {
        let newWidth = cropArea.width;
        let newHeight = cropArea.height;

        if (currentAspect > aspectValue) {
          newWidth = cropArea.height * aspectValue;
        } else {
          newHeight = cropArea.width / aspectValue;
        }

        // Ensure crop area stays within bounds
        newWidth = Math.min(newWidth, 100 - cropArea.x);
        newHeight = Math.min(newHeight, 100 - cropArea.y);

        setCropArea((prev) => ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }));
      }
    }
  };

  const cropImage = useCallback(async () => {
    if (!selectedFile || !canvasRef.current) return;

    setLoading(true);
    setError("");

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      // Calculate actual crop coordinates
      const actualX = (cropArea.x / 100) * imageSize.width;
      const actualY = (cropArea.y / 100) * imageSize.height;
      const actualWidth = (cropArea.width / 100) * imageSize.width;
      const actualHeight = (cropArea.height / 100) * imageSize.height;

      // Create new canvas for cropped image
      const croppedCanvas = document.createElement("canvas");
      const croppedCtx = croppedCanvas.getContext("2d");

      croppedCanvas.width = actualWidth;
      croppedCanvas.height = actualHeight;

      // Draw cropped portion
      croppedCtx?.drawImage(
        canvas,
        actualX,
        actualY,
        actualWidth,
        actualHeight,
        0,
        0,
        actualWidth,
        actualHeight
      );

      // Convert to blob and create URL
      croppedCanvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCroppedImage(url);
          }
          setLoading(false);
        },
        "image/png",
        0.9
      );
    } catch {
      setError("Failed to crop image");
      setLoading(false);
    }
  }, [selectedFile, cropArea, imageSize]);

  const downloadCropped = useCallback(() => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = `cropped_${selectedFile?.name?.replace(
        /\.[^/.]+$/,
        ""
      )}.png`;
      link.click();
    }
  }, [croppedImage, selectedFile]);

  const resetCrop = useCallback(() => {
    setCropArea({ x: 10, y: 10, width: 80, height: 80 });
    setAspectRatio("free");
  }, []);

  const buttons = useMemo(
    () => [
      ...(selectedFile
        ? [
            {
              type: "custom" as const,
              text: "Crop Image",
              onClick: cropImage,
              icon: <Crop />,
              disabled: loading,
            },
            {
              type: "custom" as const,
              text: "Reset",
              onClick: resetCrop,
              icon: <Refresh />,
            },
          ]
        : []),
      ...(croppedImage
        ? [
            {
              type: "custom" as const,
              text: "Download",
              onClick: downloadCropped,
              icon: <Download />,
            },
          ]
        : []),
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      selectedFile,
      croppedImage,
      loading,
      toolState,
      cropImage,
      downloadCropped,
      resetCrop,
    ]
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
        title="Image Cropper"
        description="Crop images with custom dimensions and aspect ratios"
        exampleCode="Upload image and adjust crop area with percentage-based controls"
        exampleOutput="Cropped image with specified dimensions and aspect ratio"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="w-full space-y-6">
        {/* File Upload */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Image
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            fullWidth
            sx={{ mb: 2 }}
          >
            Choose Image File
          </Button>
          {selectedFile && (
            <Alert severity="info">
              Selected: {selectedFile.name} ({imageSize.width}x
              {imageSize.height}px)
            </Alert>
          )}
        </Paper>

        {/* Crop Controls */}
        {selectedFile && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Crop Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Aspect Ratio</InputLabel>
                  <Select
                    value={aspectRatio}
                    label="Aspect Ratio"
                    onChange={(e: SelectChangeEvent) =>
                      handleAspectRatioChange(e.target.value)
                    }
                  >
                    {aspectRatios.map((ratio) => (
                      <MenuItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography gutterBottom>
                  X Position: {cropArea.x.toFixed(1)}%
                </Typography>
                <Slider
                  value={cropArea.x}
                  onChange={(_, value) =>
                    setCropArea((prev) => ({ ...prev, x: value as number }))
                  }
                  min={0}
                  max={100 - cropArea.width}
                  step={0.1}
                />

                <Typography gutterBottom>
                  Y Position: {cropArea.y.toFixed(1)}%
                </Typography>
                <Slider
                  value={cropArea.y}
                  onChange={(_, value) =>
                    setCropArea((prev) => ({ ...prev, y: value as number }))
                  }
                  min={0}
                  max={100 - cropArea.height}
                  step={0.1}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography gutterBottom>
                  Width: {cropArea.width.toFixed(1)}%
                </Typography>
                <Slider
                  value={cropArea.width}
                  onChange={(_, value) => {
                    const newWidth = value as number;
                    setCropArea((prev) => {
                      const newCrop = { ...prev, width: newWidth };

                      if (aspectRatio !== "free") {
                        const [widthRatio, heightRatio] = aspectRatio
                          .split(":")
                          .map(Number);
                        newCrop.height = newWidth / (widthRatio / heightRatio);
                      }

                      return newCrop;
                    });
                  }}
                  min={1}
                  max={100 - cropArea.x}
                  step={0.1}
                />

                <Typography gutterBottom>
                  Height: {cropArea.height.toFixed(1)}%
                </Typography>
                <Slider
                  value={cropArea.height}
                  onChange={(_, value) => {
                    const newHeight = value as number;
                    setCropArea((prev) => {
                      const newCrop = { ...prev, height: newHeight };

                      if (aspectRatio !== "free") {
                        const [widthRatio, heightRatio] = aspectRatio
                          .split(":")
                          .map(Number);
                        newCrop.width = newHeight * (widthRatio / heightRatio);
                      }

                      return newCrop;
                    });
                  }}
                  min={1}
                  max={100 - cropArea.y}
                  step={0.1}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Preview */}
        {selectedFile && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <canvas
                ref={previewCanvasRef}
                style={{ maxWidth: "100%", border: "1px solid #ccc" }}
              />
            </Box>
          </Paper>
        )}

        {/* Cropped Result */}
        {croppedImage && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cropped Image
            </Typography>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedImage}
                alt="Cropped"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Box>
          </Paper>
        )}

        {/* Hidden canvases for processing */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  );
}
