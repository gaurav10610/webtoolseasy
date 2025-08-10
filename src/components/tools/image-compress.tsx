"use client";

import { useState } from "react";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import { Typography, Slider, LinearProgress, Box, Button } from "@mui/material";
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
  { value: "bmp", label: "BMP" },
  { value: "ico", label: "ICO" },
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
          fileType: "image/jpeg", // Default to JPEG for compression
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
    [images, compressionLevel, toolState.actions]
  );

  const downloadImage = useCallback(
    (image: CompressedImage, format: string) => {
      if (!image.compressedFile) return;

      const url = URL.createObjectURL(image.compressedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed-${
        image.originalFile.name.split(".")[0]
      }.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toolState.actions.showMessage("Image downloaded successfully!");
    },
    [toolState.actions]
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

  const applySettingsAndCompress = useCallback(() => {
    // Reset all images to uncompressed state with new settings
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCompressed: false,
        compressedFile: undefined,
        compressionProgress: 0,
        error: undefined,
        compressionRatio: compressionLevel,
      }))
    );

    // Start compressing all images
    setTimeout(() => {
      const imagesToCompress = images.filter((img) => !img.isCompressing);
      imagesToCompress.forEach((img) => compressImage(img.id));
    }, 100);

    toolState.actions.showMessage(
      "Applying settings and starting compression..."
    );
  }, [images, compressionLevel, compressImage, toolState.actions]);

  const downloadAllCompressed = useCallback(() => {
    const compressedImages = images.filter(
      (img) => img.isCompressed && img.compressedFile
    );
    compressedImages.forEach((img) => downloadImage(img, "jpeg"));
  }, [images, downloadImage]);

  // Button configuration
  const buttons = useMemo(() => [], []);

  return (
    <ToolLayout
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

      <ToolControls buttons={buttons} />

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

            <div className="grid grid-cols-1 gap-4">
              {/* Compression Level */}
              <div>
                <Typography variant="body2" className="mb-2">
                  Compression Level: {compressionLevel}%
                </Typography>
                <Slider
                  value={compressionLevel}
                  onChange={(_, value) => {
                    setCompressionLevel(value as number);
                  }}
                  min={10}
                  max={90}
                  step={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </div>
            </div>

            {/* Compression Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
              <Button
                variant="contained"
                startIcon={<CompressIcon />}
                onClick={applySettingsAndCompress}
                disabled={images.some((img) => img.isCompressing)}
                sx={{
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                Apply Settings & Compress All
              </Button>

              {selectedImage && (
                <Button
                  variant="outlined"
                  startIcon={<CompressIcon />}
                  onClick={() => compressImage(selectedImage.id)}
                  disabled={
                    selectedImage.isCompressing || selectedImage.isCompressed
                  }
                >
                  Compress Selected
                </Button>
              )}

              {images.some((img) => img.isCompressed) && (
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={downloadAllCompressed}
                  sx={{
                    backgroundColor: "#16a34a",
                    "&:hover": { backgroundColor: "#15803d" },
                  }}
                >
                  Download All
                </Button>
              )}
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

                    <div className="text-sm space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                        <span className="font-medium">Original:</span>
                        <span className="text-blue-600 font-mono">
                          {formatBytes(image.originalFile.size)}
                        </span>
                      </div>
                      {image.compressedFile && (
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Compressed:</span>
                          <span className="text-green-600 font-mono">
                            {formatBytes(image.compressedFile.size)}
                          </span>
                        </div>
                      )}
                      {image.compressedFile && (
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Reduction:</span>
                          <span className="text-blue-600 font-bold">
                            {Math.round(
                              (1 -
                                image.compressedFile.size /
                                  image.originalFile.size) *
                                100
                            )}
                            %
                          </span>
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

                    {/* Status and Download */}
                    {image.isCompressed && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Compressed
                          </span>
                        </div>
                        <div className="space-y-1">
                          <Typography
                            variant="caption"
                            className="text-gray-600"
                          >
                            Download as:
                          </Typography>
                          <div className="flex flex-wrap gap-1">
                            {OUTPUT_FORMATS.map((format) => (
                              <Button
                                key={format.value}
                                size="small"
                                variant="outlined"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadImage(image, format.value);
                                }}
                                sx={{
                                  minWidth: "auto",
                                  px: 1,
                                  py: 0.5,
                                  fontSize: "0.7rem",
                                }}
                              >
                                {format.label}
                              </Button>
                            ))}
                          </div>
                        </div>
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
