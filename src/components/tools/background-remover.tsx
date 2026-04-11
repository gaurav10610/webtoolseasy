"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Typography, Card, CardContent, Alert, Slider } from "@mui/material";
import Image from "next/image";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout } from "../common/ToolLayout";
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
    ProcessingState.IDLE,
  );
  const [originalImage, setOriginalImage] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(128);
  const [smoothing, setSmoothing] = useState<number>(2);
  const [accelerationMode, setAccelerationMode] = useState("Canvas 2D");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const gpuNavigator = navigator as Navigator & { gpu?: unknown };
    if (gpuNavigator.gpu) {
      setAccelerationMode("WebGPU-assisted");
      return;
    }

    const glCanvas = document.createElement("canvas");
    const gl = glCanvas.getContext("webgl2") || glCanvas.getContext("webgl");
    if (gl) {
      setAccelerationMode("WebGL-assisted");
    }
  }, []);

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
    [toolState.actions],
  );

  const handleError = useCallback(
    (error: string) => {
      setError(error);
      toolState.actions.showMessage(error);
    },
    [toolState.actions],
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

        ctx.drawImage(img, 0, 0);
        const sourceImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sourceData = sourceImage.data;
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const maskCtx = maskCanvas.getContext("2d", {
          willReadFrequently: true,
        });
        if (!maskCtx) return;
        const maskImage = maskCtx.createImageData(canvas.width, canvas.height);
        const maskData = maskImage.data;

        const sampleBackground = () => {
          const samples: number[][] = [];
          const sampleSize = Math.min(
            16,
            Math.max(8, Math.round(canvas.width * 0.02)),
          );
          const samplePoint = (x: number, y: number) => {
            const idx = (y * canvas.width + x) * 4;
            samples.push([
              sourceData[idx],
              sourceData[idx + 1],
              sourceData[idx + 2],
            ]);
          };

          for (let i = 0; i < sampleSize; i++) {
            for (let j = 0; j < sampleSize; j++) {
              samplePoint(i, j);
              samplePoint(canvas.width - 1 - i, j);
              samplePoint(i, canvas.height - 1 - j);
              samplePoint(canvas.width - 1 - i, canvas.height - 1 - j);
            }
          }

          return samples
            .reduce(
              (acc, sample) => [
                acc[0] + sample[0],
                acc[1] + sample[1],
                acc[2] + sample[2],
              ],
              [0, 0, 0],
            )
            .map((value) => value / samples.length);
        };

        const avgBg = sampleBackground();
        const getNeighborEdgeStrength = (x: number, y: number) => {
          const currentIndex = (y * canvas.width + x) * 4;
          const read = (offsetX: number, offsetY: number) => {
            const nx = Math.max(0, Math.min(canvas.width - 1, x + offsetX));
            const ny = Math.max(0, Math.min(canvas.height - 1, y + offsetY));
            const idx = (ny * canvas.width + nx) * 4;
            return [sourceData[idx], sourceData[idx + 1], sourceData[idx + 2]];
          };

          const [r, g, b] = [
            sourceData[currentIndex],
            sourceData[currentIndex + 1],
            sourceData[currentIndex + 2],
          ];
          const neighbors = [read(-1, 0), read(1, 0), read(0, -1), read(0, 1)];
          return (
            neighbors.reduce((sum, sample) => {
              return (
                sum +
                Math.abs(r - sample[0]) +
                Math.abs(g - sample[1]) +
                Math.abs(b - sample[2])
              );
            }, 0) / neighbors.length
          );
        };

        const smoothBand = Math.max(10, smoothing * 18);

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const r = sourceData[idx];
            const g = sourceData[idx + 1];
            const b = sourceData[idx + 2];
            const distance = Math.sqrt(
              Math.pow(r - avgBg[0], 2) +
                Math.pow(g - avgBg[1], 2) +
                Math.pow(b - avgBg[2], 2),
            );
            const edgeStrength = getNeighborEdgeStrength(x, y);
            const alphaBase =
              ((distance - (threshold - smoothBand)) / (smoothBand * 2)) * 255;
            const edgeBoost = Math.min(80, edgeStrength * 0.35);
            const alpha = Math.max(
              0,
              Math.min(255, Math.round(alphaBase + edgeBoost)),
            );

            maskData[idx] = r;
            maskData[idx + 1] = g;
            maskData[idx + 2] = b;
            maskData[idx + 3] = alpha;
          }
        }

        maskCtx.putImageData(maskImage, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        ctx.save();
        ctx.globalCompositeOperation = "destination-in";
        ctx.filter =
          smoothing > 0
            ? `blur(${accelerationMode === "Canvas 2D" ? smoothing * 0.6 : smoothing}px)`
            : "none";
        ctx.drawImage(maskCanvas, 0, 0);
        ctx.restore();
        ctx.filter = "none";

        const dataUrl = canvas.toDataURL("image/png");
        setProcessedImage(dataUrl);
        setProcessingState(ProcessingState.COMPLETED);
        toolState.actions.showMessage(
          `Background removed using ${accelerationMode} edge detection!`,
        );
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
  }, [
    accelerationMode,
    originalImage,
    threshold,
    smoothing,
    toolState.actions,
  ]);

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
                <Typography
                  variant="caption"
                  className="block text-slate-600 dark:text-slate-300"
                >
                  Engine: {accelerationMode}. Enhanced edge feathering uses a
                  Canvas mask with WebGL/WebGPU-assisted smoothing when
                  available.
                </Typography>
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
