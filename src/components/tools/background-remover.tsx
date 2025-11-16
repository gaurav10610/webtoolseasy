"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Typography, Card, CardContent, Alert, Slider } from "@mui/material";
import Image from "next/image";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";

enum ProcessingState {
  IDLE = "idle",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

export default function BackgroundRemover({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [processingState, setProcessingState] = useState<ProcessingState>(
    ProcessingState.IDLE
  );
  const [originalImage, setOriginalImage] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(128);
  const [smoothing, setSmoothing] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle file upload
  const handleFileSelect = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        toolState.actions.showMessage("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setError("");
        setProcessedImage("");
        toolState.actions.showMessage("Image loaded successfully");
      };
      reader.readAsDataURL(file);
    },
    [toolState.actions]
  );

  const handleError = useCallback(
    (error: string) => {
      setError(error);
      toolState.actions.showMessage(error);
    },
    [toolState.actions]
  );

  // Remove background
  const removeBackground = useCallback(async () => {
    if (!originalImage) {
      toolState.actions.showMessage("Please upload an image first");
      return;
    }

    try {
      setProcessingState(ProcessingState.PROCESSING);
      setError("");

      const img = document.createElement("img");
      img.onload = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Draw original image
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple background removal algorithm
        // Detect background color from corners
        const cornerColors: number[][] = [];
        const sampleSize = 10;

        // Sample corners
        for (let i = 0; i < sampleSize; i++) {
          for (let j = 0; j < sampleSize; j++) {
            const idx = (i * canvas.width + j) * 4;
            cornerColors.push([data[idx], data[idx + 1], data[idx + 2]]);
          }
        }

        // Calculate average background color
        const avgBg = [0, 0, 0];
        cornerColors.forEach((color) => {
          avgBg[0] += color[0];
          avgBg[1] += color[1];
          avgBg[2] += color[2];
        });
        avgBg[0] /= cornerColors.length;
        avgBg[1] /= cornerColors.length;
        avgBg[2] /= cornerColors.length;

        // Remove background
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate color distance
          const distance = Math.sqrt(
            Math.pow(r - avgBg[0], 2) +
              Math.pow(g - avgBg[1], 2) +
              Math.pow(b - avgBg[2], 2)
          );

          // If similar to background color, make transparent
          if (distance < threshold) {
            data[i + 3] = 0; // Set alpha to 0
          }
        }

        // Apply edge smoothing
        if (smoothing > 0) {
          for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < canvas.width - 1; x++) {
              const idx = (y * canvas.width + x) * 4;
              const alpha = data[idx + 3];

              if (alpha > 0 && alpha < 255) {
                // Edge pixel, apply smoothing
                let avgAlpha = 0;
                let count = 0;

                for (let dy = -smoothing; dy <= smoothing; dy++) {
                  for (let dx = -smoothing; dx <= smoothing; dx++) {
                    const nIdx = ((y + dy) * canvas.width + (x + dx)) * 4;
                    if (nIdx >= 0 && nIdx < data.length) {
                      avgAlpha += data[nIdx + 3];
                      count++;
                    }
                  }
                }

                data[idx + 3] = Math.round(avgAlpha / count);
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/png");
        setProcessedImage(dataUrl);
        setProcessingState(ProcessingState.COMPLETED);
        toolState.actions.showMessage("Background removed successfully!");
      };

      img.onerror = () => {
        setError("Failed to load image");
        setProcessingState(ProcessingState.IDLE);
      };

      img.src = originalImage;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove background";
      setError(errorMessage);
      setProcessingState(ProcessingState.IDLE);
      toolState.actions.showMessage("Failed to remove background");
    }
  }, [originalImage, threshold, smoothing, toolState.actions]);

  // Download processed image
  const downloadImage = useCallback(() => {
    if (!processedImage) {
      toolState.actions.showMessage("No processed image to download");
      return;
    }

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `background-removed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toolState.actions.showMessage("Image downloaded successfully!");
  }, [processedImage, toolState.actions]);

  // Reset
  const reset = useCallback(() => {
    setOriginalImage("");
    setProcessedImage("");
    setProcessingState(ProcessingState.IDLE);
    setError("");
    setThreshold(128);
    setSmoothing(2);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (originalImage) URL.revokeObjectURL(originalImage);
      if (processedImage) URL.revokeObjectURL(processedImage);
    };
  }, [originalImage, processedImage]);

  // Button configuration
  const buttons = createCommonButtons({});

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Background Remover"
        description="Remove image backgrounds automatically. Upload any image and get a transparent background PNG in seconds."
        exampleCode="Upload image → Adjust settings → Remove background → Download PNG"
        exampleOutput="High-quality PNG images with transparent backgrounds"
      />

      <canvas ref={canvasRef} className="hidden" />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* File Upload */}
        {!originalImage && processingState === ProcessingState.IDLE && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Upload Image
              </Typography>
              <FileUploadWithDragDrop
                onFileSelect={handleFileSelect}
                onError={handleError}
                accept="image/*"
                maxSize={FILE_SIZE_PRESETS.LARGE}
                multiple={false}
              />
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        {originalImage && processingState !== ProcessingState.PROCESSING && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Adjustment Settings
              </Typography>

              <div className="space-y-6">
                <div>
                  <Typography variant="body2" className="mb-2">
                    Threshold: {threshold}
                  </Typography>
                  <Slider
                    value={threshold}
                    onChange={(_, value) => setThreshold(value as number)}
                    min={50}
                    max={200}
                    step={5}
                    marks={[
                      { value: 50, label: "50" },
                      { value: 100, label: "100" },
                      { value: 150, label: "150" },
                      { value: 200, label: "200" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Higher = removes more background (less selective)
                  </Typography>
                </div>

                <div>
                  <Typography variant="body2" className="mb-2">
                    Edge Smoothing: {smoothing}
                  </Typography>
                  <Slider
                    value={smoothing}
                    onChange={(_, value) => setSmoothing(value as number)}
                    min={0}
                    max={5}
                    step={1}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 2, label: "2" },
                      { value: 5, label: "5" },
                    ]}
                  />
                  <Typography variant="caption" className="text-gray-500">
                    Higher = smoother edges (may blur details)
                  </Typography>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={removeBackground}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <DeleteIcon />
                  Remove Background
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <DeleteIcon />
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Preview */}
        {(originalImage || processedImage) && (
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {originalImage && (
                  <div>
                    <Typography variant="h6" className="mb-2">
                      Original Image
                    </Typography>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={originalImage}
                        alt="Original"
                        fill
                        className="rounded-lg border border-gray-300 object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {processedImage && (
                  <div>
                    <Typography variant="h6" className="mb-2">
                      Background Removed
                    </Typography>
                    <div
                      className="relative w-full aspect-square rounded-lg border border-gray-300"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition:
                          "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    >
                      <Image
                        src={processedImage}
                        alt="Processed"
                        fill
                        className="rounded-lg object-contain"
                        unoptimized
                      />
                    </div>
                    <button
                      onClick={downloadImage}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4"
                    >
                      <DownloadIcon />
                      Download PNG
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              How to Use
            </Typography>
            <div className="text-gray-600 space-y-2">
              <Typography variant="body2" component="div">
                1. Click &quot;Upload Image&quot; to select your photo
              </Typography>
              <Typography variant="body2" component="div">
                2. Adjust threshold to control background detection sensitivity
              </Typography>
              <Typography variant="body2" component="div">
                3. Set edge smoothing for cleaner edges
              </Typography>
              <Typography variant="body2" component="div">
                4. Click &quot;Remove Background&quot; to process
              </Typography>
              <Typography variant="body2" component="div">
                5. Preview the result with transparency grid
              </Typography>
              <Typography variant="body2" component="div">
                6. Download as PNG with transparent background
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
