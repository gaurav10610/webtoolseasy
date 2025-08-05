"use client";

import { useState } from "react";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import {
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  LinearProgress,
  Box,
} from "@mui/material";
import CompressIcon from "@mui/icons-material/Compress";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import imageCompression from "browser-image-compression";
import { formatBytes } from "@/util/commonUtils";
import { useCallback, useMemo } from "react";

interface CompressedImage {
  id: string;
  originalFile: File;
  compressedFile?: Blob;
  compressionProgress: number;
  isCompressing: boolean;
  isCompressed: boolean;
  error?: string;
  compressionRatio: number;
}

const OUTPUT_FORMATS = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

export default function ImageCompress({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [images, setImages] = useState<CompressedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string>("");
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [outputFormat, setOutputFormat] = useState("jpeg");

  const selectedImage = useMemo(
    () => images.find((img) => img.id === selectedImageId),
    [images, selectedImageId]
  );

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const newImages: CompressedImage[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        originalFile: file,
        compressionProgress: 0,
        isCompressing: false,
        isCompressed: false,
        compressionRatio: compressionLevel,
      }));

      setImages((prev) => [...prev, ...newImages]);
      if (!selectedImageId && newImages.length > 0) {
        setSelectedImageId(newImages[0].id);
      }
      toolState.actions.showMessage(
        `${newImages.length} image(s) uploaded successfully!`
      );
    },
    [selectedImageId, compressionLevel, toolState.actions]
  );

  const compressImage = useCallback(
    async (imageId: string) => {
      const imageIndex = images.findIndex((img) => img.id === imageId);
      if (imageIndex === -1) return;

      const image = images[imageIndex];
      const newImages = [...images];

      // Set compression state
      newImages[imageIndex] = {
        ...image,
        isCompressing: true,
        compressionProgress: 0,
        error: undefined,
        compressionRatio: compressionLevel,
      };
      setImages(newImages);

      try {
        const options = {
          maxSizeMB:
            (image.originalFile.size * (100 - compressionLevel)) /
            100 /
            (1024 * 1024),
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType:
            outputFormat === "jpeg"
              ? "image/jpeg"
              : outputFormat === "png"
              ? "image/png"
              : "image/webp",
          onProgress: (progress: number) => {
            setImages((prev) => {
              const updated = [...prev];
              const idx = updated.findIndex((img) => img.id === imageId);
              if (idx !== -1) {
                updated[idx] = {
                  ...updated[idx],
                  compressionProgress: progress,
                };
              }
              return updated;
            });
          },
        };

        const compressedFile = await imageCompression(
          image.originalFile,
          options
        );

        setImages((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((img) => img.id === imageId);
          if (idx !== -1) {
            updated[idx] = {
              ...updated[idx],
              compressedFile,
              isCompressing: false,
              isCompressed: true,
              compressionProgress: 100,
            };
          }
          return updated;
        });

        toolState.actions.showMessage("Image compressed successfully!");
      } catch (error) {
        setImages((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((img) => img.id === imageId);
          if (idx !== -1) {
            updated[idx] = {
              ...updated[idx],
              isCompressing: false,
              error:
                error instanceof Error ? error.message : "Compression failed",
            };
          }
          return updated;
        });
        toolState.actions.showMessage("Compression failed. Please try again.");
      }
    },
    [images, compressionLevel, outputFormat, toolState.actions]
  );

  const downloadImage = useCallback(
    (image: CompressedImage) => {
      if (!image.compressedFile) return;

      const url = URL.createObjectURL(image.compressedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed-${
        image.originalFile.name.split(".")[0]
      }.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toolState.actions.showMessage("Image downloaded successfully!");
    },
    [outputFormat, toolState.actions]
  );

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

  const compressAllImages = useCallback(() => {
    const uncompressedImages = images.filter(
      (img) => !img.isCompressed && !img.isCompressing
    );
    uncompressedImages.forEach((img) => compressImage(img.id));
  }, [images, compressImage]);

  const downloadAllCompressed = useCallback(() => {
    const compressedImages = images.filter(
      (img) => img.isCompressed && img.compressedFile
    );
    compressedImages.forEach((img) => downloadImage(img));
  }, [images, downloadImage]);

  // Button configuration
  const buttons = useMemo(
    () => [
      ...(selectedImage
        ? [
            {
              type: "custom" as const,
              text: "Compress Selected",
              onClick: () => compressImage(selectedImage.id),
              icon: <CompressIcon />,
              disabled:
                selectedImage.isCompressing || selectedImage.isCompressed,
            },
          ]
        : []),
      ...(images.some((img) => !img.isCompressed && !img.isCompressing)
        ? [
            {
              type: "custom" as const,
              text: "Compress All",
              onClick: compressAllImages,
              icon: <CompressIcon />,
            },
          ]
        : []),
      ...(images.some((img) => img.isCompressed)
        ? [
            {
              type: "custom" as const,
              text: "Download All",
              onClick: downloadAllCompressed,
              icon: <DownloadIcon />,
            },
          ]
        : []),
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      selectedImage,
      images,
      compressImage,
      compressAllImages,
      downloadAllCompressed,
      toolState,
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
        title="Image Compressor"
        description="Compress images online with adjustable quality settings. Reduce image file size while maintaining visual quality. Supports JPEG, PNG, and WebP formats."
        exampleCode="Upload images and adjust compression level to optimize file size"
        exampleOutput="Compressed images with reduced file size and preserved quality"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="w-full space-y-6">
        {/* File Upload */}
        {images.length === 0 && (
          <FileUploadWithDragDrop
            accept="image/*"
            multiple={true}
            onFileSelect={handleFileSelect}
            title="Upload Images to Compress"
            subtitle="Drag and drop your images here or click to browse"
            supportText="Supports JPG, PNG, WebP formats up to 10MB each"
          />
        )}

        {/* Add More Images */}
        {images.length > 0 && (
          <div className="flex justify-end">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                e.target.files && handleFileSelect(e.target.files)
              }
              className="hidden"
              id="add-more-images"
            />
            <label
              htmlFor="add-more-images"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add More Images
            </label>
          </div>
        )}

        {/* Compression Settings */}
        {images.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <Typography variant="h6" className="flex items-center gap-2">
              <SettingsIcon /> Compression Settings
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Compression Level */}
              <div>
                <Typography variant="body2" className="mb-2">
                  Compression Level: {compressionLevel}%
                </Typography>
                <Slider
                  value={compressionLevel}
                  onChange={(_, value) => setCompressionLevel(value as number)}
                  min={10}
                  max={90}
                  step={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </div>

              {/* Output Format */}
              <div>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Output Format</InputLabel>
                  <Select
                    value={outputFormat}
                    label="Output Format"
                    onChange={(e: SelectChangeEvent) =>
                      setOutputFormat(e.target.value)
                    }
                  >
                    {OUTPUT_FORMATS.map((format) => (
                      <MenuItem key={format.value} value={format.value}>
                        {format.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        )}

        {/* Image List */}
        {images.length > 0 && (
          <div className="space-y-4">
            <Typography variant="h6">Images ({images.length})</Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedImageId === image.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageId(image.id)}
                >
                  {/* Image Preview */}
                  <div className="aspect-square mb-3 rounded overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(image.originalFile)}
                      alt={image.originalFile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Info */}
                  <div className="space-y-2">
                    <Typography
                      variant="body2"
                      className="font-medium truncate"
                    >
                      {image.originalFile.name}
                    </Typography>

                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        Original: {formatBytes(image.originalFile.size)}
                      </div>
                      {image.compressedFile && (
                        <div className="text-green-600">
                          Compressed: {formatBytes(image.compressedFile.size)}(
                          {Math.round(
                            (1 -
                              image.compressedFile.size /
                                image.originalFile.size) *
                              100
                          )}
                          % reduction)
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {image.isCompressing && (
                      <Box className="w-full">
                        <LinearProgress
                          variant="determinate"
                          value={image.compressionProgress}
                          className="mb-1"
                        />
                        <Typography variant="caption" className="text-gray-600">
                          Compressing... {Math.round(image.compressionProgress)}
                          %
                        </Typography>
                      </Box>
                    )}

                    {/* Status */}
                    {image.isCompressed && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-green-600">
                          ✓ Compressed
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(image);
                          }}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Download
                        </button>
                      </div>
                    )}

                    {/* Error */}
                    {image.error && (
                      <Typography variant="caption" className="text-red-600">
                        Error: {image.error}
                      </Typography>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 w-full text-center py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
