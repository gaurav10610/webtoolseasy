"use client";

import { useState, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FILE_TYPE_PRESETS, FILE_SIZE_PRESETS } from "@/util/fileValidation";

type FaviconSize = 16 | 32 | 48 | 64;

export default function FaviconGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<FaviconSize[]>([
    16, 32, 48,
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toolState.actions.showMessage("Image loaded successfully!");
      };
      reader.readAsDataURL(file);
    },
    [toolState.actions]
  );

  const handleSizeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSizes: FaviconSize[]
  ) => {
    if (newSizes.length > 0) {
      setSelectedSizes(newSizes);
    }
  };

  const generateFavicon = useCallback(
    async (size: FaviconSize) => {
      if (!uploadedImage) return null;

      return new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, size, size);
            resolve(canvas.toDataURL("image/png"));
          }
        };
        img.src = uploadedImage;
      });
    },
    [uploadedImage]
  );

  const downloadFavicon = useCallback(
    async (size: FaviconSize) => {
      try {
        const dataUrl = await generateFavicon(size);
        if (!dataUrl) {
          toolState.actions.showMessage("Please upload an image first");
          return;
        }

        const link = document.createElement("a");
        link.download = `favicon-${size}x${size}.png`;
        link.href = dataUrl;
        link.click();

        toolState.actions.showMessage(`Favicon ${size}x${size} downloaded!`);
      } catch (error) {
        console.error("Download error:", error);
        toolState.actions.showMessage("Error downloading favicon");
      }
    },
    [generateFavicon, toolState.actions]
  );

  const downloadAllSizes = useCallback(async () => {
    if (!uploadedImage) {
      toolState.actions.showMessage("Please upload an image first");
      return;
    }

    try {
      for (const size of selectedSizes) {
        await downloadFavicon(size);
        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      toolState.actions.showMessage("All favicons downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toolState.actions.showMessage("Error downloading favicons");
    }
  }, [uploadedImage, selectedSizes, downloadFavicon, toolState.actions]);

  const clearImage = useCallback(() => {
    setUploadedImage(null);
    toolState.actions.showMessage("Image cleared");
  }, [toolState.actions]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Download All Sizes",
      onClick: downloadAllSizes,
      icon: <DownloadIcon />,
      variant: "contained" as const,
      disabled: !uploadedImage,
    },
    {
      type: "custom" as const,
      text: "Clear Image",
      onClick: clearImage,
      color: "error" as const,
      disabled: !uploadedImage,
    },
    ...createCommonButtons({
      onFullScreen: toolState.toggleFullScreen,
    }),
  ];

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
        title="Favicon Generator - Create Favicon from Image"
        description="Generate favicons in multiple sizes from any image. Create .ico and PNG favicons for your website. Free online favicon converter."
        exampleCode="Upload your image"
        exampleOutput="Favicon in multiple sizes"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <ImageIcon /> Upload Image
            </Typography>
            <FileUploadWithDragDrop
              onFileSelect={handleFileSelect}
              accept="image/*"
              allowedTypes={FILE_TYPE_PRESETS.IMAGES}
              maxSize={FILE_SIZE_PRESETS.MEDIUM}
              multiple={false}
            />
            <Typography variant="caption" className="mt-2 block text-gray-600">
              Upload PNG, JPG, or SVG image. For best results, use square images
              with simple, recognizable designs.
            </Typography>
          </CardContent>
        </Card>

        {/* Size Selection */}
        {uploadedImage && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Select Favicon Sizes
              </Typography>
              <ToggleButtonGroup
                value={selectedSizes}
                onChange={handleSizeChange}
                aria-label="favicon sizes"
                className="flex-wrap"
              >
                <ToggleButton value={16} aria-label="16x16">
                  16x16
                </ToggleButton>
                <ToggleButton value={32} aria-label="32x32">
                  32x32
                </ToggleButton>
                <ToggleButton value={48} aria-label="48x48">
                  48x48
                </ToggleButton>
                <ToggleButton value={64} aria-label="64x64">
                  64x64
                </ToggleButton>
              </ToggleButtonGroup>
              <Alert severity="info" className="mt-4">
                Select multiple sizes for comprehensive browser support. Most
                websites use at least 16x16 and 32x32.
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        {uploadedImage && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Preview
              </Typography>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {([16, 32, 48, 64] as FaviconSize[]).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-3">
                    <div
                      className="border-2 border-gray-300 rounded-lg p-4 bg-white flex items-center justify-center"
                      style={{
                        width: Math.max(size * 2, 80),
                        height: Math.max(size * 2, 80),
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedImage}
                        alt={`Preview ${size}x${size}`}
                        style={{
                          width: size,
                          height: size,
                          imageRendering: size <= 32 ? "pixelated" : "auto",
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <Typography
                        variant="caption"
                        className="block font-semibold"
                      >
                        {size}x{size}
                      </Typography>
                      <button
                        onClick={() => downloadFavicon(size)}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3">
              How to Use Favicons
            </Typography>
            <Typography variant="body2" className="mb-3">
              After downloading, add these lines to your HTML{" "}
              <code>&lt;head&gt;</code> section:
            </Typography>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
              <div>
                &lt;link rel=&quot;icon&quot; type=&quot;image/png&quot;
                sizes=&quot;16x16&quot; href=&quot;/favicon-16x16.png&quot;&gt;
              </div>
              <div>
                &lt;link rel=&quot;icon&quot; type=&quot;image/png&quot;
                sizes=&quot;32x32&quot; href=&quot;/favicon-32x32.png&quot;&gt;
              </div>
              <div>
                &lt;link rel=&quot;icon&quot; type=&quot;image/png&quot;
                sizes=&quot;48x48&quot; href=&quot;/favicon-48x48.png&quot;&gt;
              </div>
            </div>
            <Typography variant="body2" className="mt-3 text-gray-600">
              <strong>Tip:</strong> Test your favicon in different browsers and
              clear your cache if it doesn&apos;t appear immediately.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
