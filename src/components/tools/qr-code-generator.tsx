"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import {
  TextField,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
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
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [qrSize, setQrSize] = useState(300);
  const [errLevel, setErrLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");

  const applyLogo = useCallback(
    (canvas: HTMLCanvasElement, logoUrl: string) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d")!;
        const logoSize = canvas.width * 0.22;
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;
        // White background circle for logo
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          logoSize / 2 + 6,
          0,
          2 * Math.PI,
        );
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.drawImage(img, x, y, logoSize, logoSize);
      };
      img.src = logoUrl;
    },
    [],
  );

  const generateQrCode = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas && toolState.code) {
      try {
        await toCanvas(canvas, toolState.code, {
          width: qrSize,
          margin: 2,
          errorCorrectionLevel: errLevel,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        });
        if (logoDataUrl) applyLogo(canvas, logoDataUrl);
      } catch (error) {
        console.error("QR Code generation error:", error);
        toolState.actions.showMessage("Error generating QR code");
      }
    }
  }, [
    toolState.code,
    toolState.actions,
    darkColor,
    lightColor,
    qrSize,
    errLevel,
    logoDataUrl,
    applyLogo,
  ]);

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
          width: Math.max(qrSize, 512),
          margin: 2,
          errorCorrectionLevel: errLevel,
          color: { dark: darkColor, light: lightColor },
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
          `QR code downloaded as ${imageType.toUpperCase()}`,
        );
      } catch {
        toolState.actions.showMessage(`Failed to download ${imageType} image`);
      }
    },
    [toolState, darkColor, lightColor, qrSize, errLevel],
  );

  const downloadSvg = useCallback(async () => {
    try {
      const svgString = await toString(toolState.code, {
        type: "svg",
        errorCorrectionLevel: errLevel,
        color: { dark: darkColor, light: lightColor },
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "qr-code-webtoolseasy.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toolState.actions.showMessage("SVG downloaded!");
    } catch {
      toolState.actions.showMessage("Failed to download SVG");
    }
  }, [toolState, darkColor, lightColor, errLevel]);

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
        text: "SVG",
        onClick: downloadSvg,
        icon: <DownloadIcon />,
        variant: "outlined" as const,
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
    [copySvg, downloadSvg, downloadImage, toolState],
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
            rows={8}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="Enter text, URL, or data to generate QR code..."
            className="w-full"
            variant="outlined"
          />

          {/* Customisation */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
            <Typography variant="body2" className="font-medium">
              ✨ Customise
            </Typography>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Typography variant="caption" color="textSecondary">
                  Foreground
                </Typography>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                  />
                  <Typography variant="caption">{darkColor}</Typography>
                </div>
              </div>
              <div>
                <Typography variant="caption" color="textSecondary">
                  Background
                </Typography>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                  />
                  <Typography variant="caption">{lightColor}</Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="caption" color="textSecondary">
                Size: {qrSize}px
              </Typography>
              <Slider
                value={qrSize}
                onChange={(_, v) => setQrSize(v as number)}
                min={100}
                max={600}
                step={50}
                size="small"
                marks={[
                  { value: 200, label: "200" },
                  { value: 400, label: "400" },
                  { value: 600, label: "600" },
                ]}
              />
            </div>

            <FormControl size="small" fullWidth>
              <InputLabel>Error Correction</InputLabel>
              <Select
                value={errLevel}
                label="Error Correction"
                onChange={(e) =>
                  setErrLevel(e.target.value as "L" | "M" | "Q" | "H")
                }
              >
                <MenuItem value="L">L — Low (7%)</MenuItem>
                <MenuItem value="M">M — Medium (15%) — recommended</MenuItem>
                <MenuItem value="Q">Q — Quartile (25%)</MenuItem>
                <MenuItem value="H">H — High (30%)</MenuItem>
              </Select>
            </FormControl>

            {/* Logo Overlay */}
            <div>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
                gutterBottom
              >
                Logo Overlay (use H error correction for best results)
              </Typography>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) =>
                    setLogoDataUrl(ev.target?.result as string);
                  reader.readAsDataURL(file);
                  e.target.value = "";
                }}
              />
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => logoInputRef.current?.click()}
                >
                  Upload Logo
                </Button>
                {logoDataUrl && (
                  <>
                    <img
                      src={logoDataUrl}
                      alt="logo"
                      className="w-8 h-8 object-contain border rounded"
                    />
                    <Chip
                      label="Remove"
                      size="small"
                      onDelete={() => setLogoDataUrl("")}
                      deleteIcon={<ClearIcon />}
                      variant="outlined"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

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
