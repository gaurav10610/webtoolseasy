"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { TextField, Typography } from "@mui/material";
import { toCanvas, toString, toDataURL, QRCodeToDataURLOptions } from "qrcode";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

function base64toBlob(base64Data: string, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const byteString = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: mimeType });
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
}

export default function QrCodeGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `https://webtoolseasy.com/

Try these examples:
• Website URL
• Contact information
• WiFi credentials
• Social media profile
• Email address
• Phone number`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQrCode = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas && toolState.code) {
      try {
        await toCanvas(canvas, toolState.code, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
      } catch (error) {
        console.error("QR Code generation error:", error);
        toolState.actions.showMessage("Error generating QR code");
      }
    }
  }, [toolState.code, toolState.actions]);

  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  const copySvg = useCallback(async () => {
    try {
      const svgString = await toString(toolState.code, { type: "svg" });
      await navigator.clipboard.writeText(svgString);
      toolState.actions.showMessage("SVG copied to clipboard!");
    } catch {
      toolState.actions.showMessage("Failed to copy SVG");
    }
  }, [toolState]);

  const downloadImage = useCallback(
    async (imageType: "jpeg" | "webp" | "png") => {
      try {
        const mimeType = `image/${imageType}`;
        const options: QRCodeToDataURLOptions = {
          type: mimeType as "image/jpeg" | "image/webp" | "image/png",
          width: 512,
          margin: 2,
        };

        const dataUrl = await toDataURL(toolState.code, options);
        const base64Data = dataUrl.split(",")[1];
        const blob = await base64toBlob(base64Data, mimeType);

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `qr-code-webtoolseasy.${imageType}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toolState.actions.showMessage(
          `QR code downloaded as ${imageType.toUpperCase()}`
        );
      } catch {
        toolState.actions.showMessage(`Failed to download ${imageType} image`);
      }
    },
    [toolState]
  );

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Copy SVG",
        onClick: copySvg,
        icon: <ContentCopyIcon />,
      },
      {
        type: "custom" as const,
        text: "Download JPEG",
        onClick: () => downloadImage("jpeg"),
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Download PNG",
        onClick: () => downloadImage("png"),
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Download WEBP",
        onClick: () => downloadImage("webp"),
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
      }),
    ],
    [copySvg, downloadImage, toolState]
  );

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="QR Code Generator"
        description="Generate QR codes from text, URLs, and data. Free online QR code generator with download options in multiple formats."
        exampleCode={initialValue}
        exampleOutput="High-quality QR code with customizable size and format"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <Typography
            variant="h6"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span>📝</span>
            <span>Enter Text or URL</span>
          </Typography>
          <TextField
            multiline
            rows={12}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter text, URL, or data to generate QR code..."
            className="w-full"
            variant="outlined"
          />

          {/* Examples */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Typography
              variant="body2"
              className="text-blue-800 font-medium mb-2"
            >
              💡 Examples to try:
            </Typography>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• https://webtoolseasy.com</div>
              <div>• Email: contact@example.com</div>
              <div>• Phone: +1-234-567-8900</div>
              <div>• WiFi: WIFI:T:WPA;S:NetworkName;P:Password;;</div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col gap-4">
          <Typography
            variant="h6"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span>📱</span>
            <span>Generated QR Code</span>
          </Typography>
          <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 border-2 border-gray-200 rounded-lg min-h-[400px] justify-center">
            <div className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              className="text-center max-w-sm"
            >
              Scan this QR code with your mobile device to access the content
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
