"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import {
  ToolControls,
  createCommonButtons,
  ToolButtonConfig,
} from "../common/ToolControls";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";
import { formatBytes } from "@/util/commonUtils";

// Icons
import ImageIcon from "@mui/icons-material/Image";
import ConvertIcon from "@mui/icons-material/Transform";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Import for image processing
// import imageCompression from "browser-image-compression";

interface ConvertedImage {
  id: string;
  originalFile: File;
  convertedFile?: Blob;
  outputFormat: string;
  quality: number;
  isConverting: boolean;
  isConverted: boolean;
  error?: string;
  originalSize: number;
  convertedSize?: number;
}

const OUTPUT_FORMATS = [
  { value: "jpeg", label: "JPEG", extension: "jpg" },
  { value: "png", label: "PNG", extension: "png" },
  { value: "webp", label: "WebP", extension: "webp" },
  { value: "gif", label: "GIF", extension: "gif" },
  { value: "bmp", label: "BMP", extension: "bmp" },
  { value: "ico", label: "ICO", extension: "ico" },
];

const SUPPORTED_INPUT_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
];

export default function ImageFormatConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [quality, setQuality] = useState(90);

  const selectedImage = useMemo(
    () => images.find((img) => img.id === selectedImageId),
    [images, selectedImageId]
  );

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const newImages: ConvertedImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (SUPPORTED_INPUT_FORMATS.includes(file.type)) {
          const id = Date.now().toString() + i.toString();
          newImages.push({
            id,
            originalFile: file,
            outputFormat,
            quality,
            isConverting: false,
            isConverted: false,
            originalSize: file.size,
          });
        }
      }

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
        if (!selectedImageId && newImages.length > 0) {
          setSelectedImageId(newImages[0].id);
        }
        toolState.actions.showMessage(
          `${newImages.length} image(s) added successfully!`
        );
      } else {
        toolState.actions.showMessage(
          "Please select valid image files (JPG, PNG, WebP, GIF, BMP, ICO)"
        );
      }
    },
    [outputFormat, quality, selectedImageId, toolState.actions]
  );

  const handleError = useCallback(
    (error: string) => {
      toolState.actions.showMessage(error);
    },
    [toolState.actions]
  );

  const convertToCanvas = useCallback(
    (file: File): Promise<HTMLCanvasElement> => {
      return new Promise((resolve, reject) => {
        const imgElement = new window.Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        imgElement.onload = () => {
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);
          resolve(canvas);
        };

        imgElement.onerror = () => reject(new Error("Failed to load image"));
        imgElement.src = URL.createObjectURL(file);
      });
    },
    []
  );

  const convertImage = useCallback(
    async (imageId: string) => {
      const image = images.find((img) => img.id === imageId);
      if (!image) return;

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? { ...img, isConverting: true, error: undefined }
            : img
        )
      );

      try {
        let convertedBlob: Blob;
        const targetFormat = image.outputFormat;
        const targetQuality = image.quality / 100;

        if (targetFormat === "ico") {
          // Special handling for ICO format
          const canvas = await convertToCanvas(image.originalFile);

          // Resize to common icon size
          const iconCanvas = document.createElement("canvas");
          const iconCtx = iconCanvas.getContext("2d");
          iconCanvas.width = 32;
          iconCanvas.height = 32;

          if (iconCtx) {
            iconCtx.drawImage(canvas, 0, 0, 32, 32);
            convertedBlob = await new Promise((resolve) => {
              iconCanvas.toBlob((blob) => resolve(blob!), "image/png");
            });
          } else {
            throw new Error("Failed to create icon");
          }
        } else {
          // Use canvas for format conversion
          const canvas = await convertToCanvas(image.originalFile);

          const mimeType =
            targetFormat === "jpeg"
              ? "image/jpeg"
              : targetFormat === "png"
              ? "image/png"
              : targetFormat === "webp"
              ? "image/webp"
              : targetFormat === "bmp"
              ? "image/bmp"
              : "image/png";

          convertedBlob = await new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), mimeType, targetQuality);
          });
        }

        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId
              ? {
                  ...img,
                  convertedFile: convertedBlob,
                  convertedSize: convertedBlob.size,
                  isConverting: false,
                  isConverted: true,
                }
              : img
          )
        );

        toolState.actions.showMessage("Image converted successfully!");
      } catch (error) {
        console.error("Conversion error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Conversion failed";

        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId
              ? {
                  ...img,
                  isConverting: false,
                  error: errorMessage,
                }
              : img
          )
        );

        handleError(`Failed to convert image: ${errorMessage}`);
      }
    },
    [images, convertToCanvas, toolState.actions, handleError]
  );

  const convertAllImages = useCallback(async () => {
    const unconvertedImages = images.filter(
      (img) => !img.isConverted && !img.isConverting
    );

    for (const image of unconvertedImages) {
      await convertImage(image.id);
    }
  }, [images, convertImage]);

  const downloadImage = useCallback(
    (imageId: string) => {
      const image = images.find((img) => img.id === imageId);
      if (!image?.convertedFile) return;

      const format = OUTPUT_FORMATS.find((f) => f.value === image.outputFormat);
      const extension = format?.extension || "jpg";
      const fileName =
        image.originalFile.name.replace(/\.[^/.]+$/, "") + "." + extension;

      const url = URL.createObjectURL(image.convertedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toolState.actions.showMessage("Image downloaded successfully!");
    },
    [images, toolState.actions]
  );

  const downloadAllImages = useCallback(() => {
    const convertedImages = images.filter((img) => img.convertedFile);

    convertedImages.forEach((image) => {
      downloadImage(image.id);
    });
  }, [images, downloadImage]);

  const removeImage = useCallback(
    (imageId: string) => {
      setImages((prev) => prev.filter((img) => img.id !== imageId));

      if (selectedImageId === imageId) {
        const remainingImages = images.filter((img) => img.id !== imageId);
        setSelectedImageId(
          remainingImages.length > 0 ? remainingImages[0].id : ""
        );
      }
    },
    [images, selectedImageId]
  );

  const clearAllImages = useCallback(() => {
    setImages([]);
    setSelectedImageId("");
    toolState.actions.showMessage("All images cleared!");
  }, [toolState.actions]);

  const updateImageSettings = useCallback(
    (imageId: string, newFormat: string, newQuality: number) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? {
                ...img,
                outputFormat: newFormat,
                quality: newQuality,
                isConverted: false,
                convertedFile: undefined,
                convertedSize: undefined,
                error: undefined,
              }
            : img
        )
      );
    },
    []
  );

  // Button configuration
  const buttons = createCommonButtons({
    onDownload: selectedImage
      ? () => downloadImage(selectedImage.id)
      : undefined,
  });

  const additionalButtons: ToolButtonConfig[] = [
    {
      type: "custom",
      text: "Convert Selected",
      onClick: selectedImage ? () => convertImage(selectedImage.id) : undefined,
      disabled:
        !selectedImage ||
        selectedImage.isConverting ||
        selectedImage.isConverted,
      icon: <ConvertIcon />,
      variant: "contained",
      color: "primary",
    },
    {
      type: "custom",
      text: "Convert All",
      onClick: convertAllImages,
      disabled:
        images.length === 0 ||
        images.every((img) => img.isConverted || img.isConverting),
      icon: <ConvertIcon />,
      variant: "outlined",
    },
    {
      type: "custom",
      text: "Download All",
      onClick: downloadAllImages,
      disabled: !images.some((img) => img.convertedFile),
      icon: <DownloadIcon />,
      variant: "outlined",
    },
    {
      type: "custom",
      text: "Clear All",
      onClick: clearAllImages,
      disabled: images.length === 0,
      icon: <DeleteIcon />,
      variant: "outlined",
      color: "error" as const,
    },
  ];

  return (
    <ToolLayout>
      {/* Upload Section */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" className="mb-4 flex items-center">
            <ImageIcon className="mr-2" />
            Upload Images
          </Typography>

          <FileUploadWithDragDrop
            accept="image/*"
            onFileSelect={handleFileSelect}
            onError={handleError}
            maxSize={FILE_SIZE_PRESETS.LARGE}
            multiple={true}
          />
        </CardContent>
      </Card>

      {/* Images List */}
      {images.length > 0 && (
        <Card className="mb-6">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Uploaded Images ({images.length})
            </Typography>

            <Box className="space-y-4">
              {images.map((image) => (
                <Card
                  key={image.id}
                  variant="outlined"
                  className={`cursor-pointer transition-colors ${
                    selectedImageId === image.id
                      ? "border-primary-500 bg-primary-50"
                      : ""
                  }`}
                  onClick={() => setSelectedImageId(image.id)}
                >
                  <CardContent className="py-3">
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle2" className="truncate">
                          {image.originalFile.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatBytes(image.originalSize)} →{" "}
                          {image.outputFormat.toUpperCase()}
                          {image.convertedSize &&
                            ` (${formatBytes(image.convertedSize)})`}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={4} md={6}>
                        {image.isConverting && (
                          <Box>
                            <Typography variant="caption">
                              Converting...
                            </Typography>
                            <LinearProgress className="mt-1" />
                          </Box>
                        )}

                        {image.error && (
                          <Alert severity="error">{image.error}</Alert>
                        )}

                        {image.isConverted && (
                          <Typography variant="caption" color="success.main">
                            ✓ Converted successfully
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={2} md={2}>
                        <Box className="flex justify-end gap-1">
                          <Tooltip title="Preview">
                            <IconButton size="small">
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          {image.convertedFile && (
                            <Tooltip title="Download">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadImage(image.id);
                                }}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Tooltip title="Remove">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      {selectedImage && (
        <Card className="mb-6">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Preview
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" className="mb-2">
                  Original
                </Typography>
                <Box className="border-2 border-gray-200 rounded-lg p-4">
                  <img
                    src={URL.createObjectURL(selectedImage.originalFile)}
                    alt="Original"
                    className="w-full h-auto max-h-80 object-contain rounded"
                  />
                  <Typography
                    variant="caption"
                    className="mt-2 block text-gray-600"
                  >
                    Size: {formatBytes(selectedImage.originalSize)}
                  </Typography>
                </Box>
              </Grid>

              {selectedImage.convertedFile && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" className="mb-2">
                    Converted ({selectedImage.outputFormat.toUpperCase()})
                  </Typography>
                  <Box className="border-2 border-gray-200 rounded-lg p-4">
                    <img
                      src={URL.createObjectURL(selectedImage.convertedFile)}
                      alt="Converted"
                      className="w-full h-auto max-h-80 object-contain rounded"
                    />
                    <Typography
                      variant="caption"
                      className="mt-2 block text-gray-600"
                    >
                      Size: {formatBytes(selectedImage.convertedSize || 0)}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Conversion Settings and Controls */}
      {selectedImage && (
        <Card className="mb-6">
          <CardContent>
            <Grid container spacing={4}>
              {/* Conversion Settings */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" className="mb-4">
                  Conversion Settings
                </Typography>

                <Box className="space-y-4">
                  <FormControl fullWidth>
                    <InputLabel>Output Format</InputLabel>
                    <Select
                      value={selectedImage.outputFormat}
                      label="Output Format"
                      onChange={(e) => {
                        const newFormat = e.target.value;
                        setOutputFormat(newFormat);
                        updateImageSettings(
                          selectedImage.id,
                          newFormat,
                          selectedImage.quality
                        );
                      }}
                    >
                      {OUTPUT_FORMATS.map((format) => (
                        <MenuItem key={format.value} value={format.value}>
                          {format.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography gutterBottom>
                      Quality: {selectedImage.quality}%
                    </Typography>
                    <Slider
                      value={selectedImage.quality}
                      onChange={(_, value) => {
                        const newQuality = value as number;
                        setQuality(newQuality);
                        updateImageSettings(
                          selectedImage.id,
                          selectedImage.outputFormat,
                          newQuality
                        );
                      }}
                      min={10}
                      max={100}
                      step={5}
                      marks={[
                        { value: 10, label: "10%" },
                        { value: 50, label: "50%" },
                        { value: 90, label: "90%" },
                        { value: 100, label: "100%" },
                      ]}
                      disabled={
                        selectedImage.outputFormat === "png" ||
                        selectedImage.outputFormat === "gif"
                      }
                    />
                    {(selectedImage.outputFormat === "png" ||
                      selectedImage.outputFormat === "gif") && (
                      <Typography variant="caption" color="textSecondary">
                        Quality setting not applicable for{" "}
                        {selectedImage.outputFormat.toUpperCase()} format
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Control Buttons */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" className="mb-4">
                  Actions
                </Typography>
                <Box className="flex flex-wrap gap-2">
                  {[...buttons, ...additionalButtons].map((button, index) => (
                    <Box
                      key={index}
                      component="button"
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors whitespace-nowrap text-sm font-medium border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      onClick={button.onClick}
                      disabled={button.disabled}
                      style={{
                        backgroundColor:
                          button.variant === "contained"
                            ? button.color === "primary"
                              ? "#1976d2"
                              : button.color === "error"
                              ? "#d32f2f"
                              : "#1976d2"
                            : "transparent",
                        border:
                          button.variant === "outlined"
                            ? `1px solid ${
                                button.color === "error" ? "#d32f2f" : "#1976d2"
                              }`
                            : "none",
                        color:
                          button.variant === "outlined"
                            ? button.color === "error"
                              ? "#d32f2f"
                              : "#1976d2"
                            : "white",
                      }}
                    >
                      {button.icon}
                      {button.text}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tool Controls for when no image is selected */}
      {!selectedImage && images.length > 0 && (
        <ToolControls buttons={[...buttons, ...additionalButtons]} />
      )}

      {/* SEO Content */}
      <SEOContent
        title="Image Format Converter"
        description="Convert images between different formats including JPG, PNG, WebP, GIF, BMP, and ICO. Free online tool for batch image conversion with quality adjustment."
      />
    </ToolLayout>
  );
}
