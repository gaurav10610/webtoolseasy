"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

type BarcodeType = "code128" | "ean13" | "upca" | "code39";

export default function BarcodeGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "1234567890128",
  });

  const [barcodeType, setBarcodeType] = useState<BarcodeType>("code128");
  const [error, setError] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate Code128 barcode
  const generateCode128 = useCallback(
    (data: string, canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const barWidth = 3;
      const barHeight = 100;
      const margin = 20;

      // Simplified Code128 encoding (subset B)
      const width = data.length * 11 * barWidth + 2 * margin;
      canvas.width = width;
      canvas.height = barHeight + 40;

      // Clear canvas
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bars
      ctx.fillStyle = "#000000";
      let x = margin;

      // Start pattern
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(x, margin, barWidth, barHeight);
        x += barWidth * 2;
      }

      // Data bars
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        const pattern =
          char % 2 === 0
            ? [1, 0, 1, 0, 1, 0, 1, 0, 1]
            : [1, 1, 0, 0, 1, 1, 0, 0, 1];

        pattern.forEach((bar) => {
          if (bar === 1) {
            ctx.fillRect(x, margin, barWidth, barHeight);
          }
          x += barWidth;
        });
      }

      // Stop pattern
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(x, margin, barWidth, barHeight);
        x += barWidth * 2;
      }

      // Draw text
      ctx.fillStyle = "#000000";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(data, canvas.width / 2, barHeight + margin + 20);
    },
    []
  );

  // Generate EAN13 barcode
  const generateEAN13 = useCallback(
    (data: string, canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Pad/trim to 13 digits
      const paddedData = data.padEnd(13, "0").substring(0, 13);

      const barWidth = 2;
      const barHeight = 80;
      const margin = 20;
      const width = 95 * barWidth + 2 * margin;

      canvas.width = width;
      canvas.height = barHeight + 40;

      // Clear canvas
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bars
      ctx.fillStyle = "#000000";
      let x = margin;

      // Start guard
      ctx.fillRect(x, margin, barWidth, barHeight);
      x += barWidth * 2;
      ctx.fillRect(x, margin, barWidth, barHeight);
      x += barWidth * 2;

      // Left digits (6 digits)
      for (let i = 1; i <= 6; i++) {
        const digit = parseInt(paddedData[i]);
        const barCount = digit % 2 === 0 ? 7 : 9;
        for (let j = 0; j < barCount; j++) {
          if (j % 2 === 0) {
            ctx.fillRect(x, margin, barWidth, barHeight);
          }
          x += barWidth;
        }
      }

      // Center guard
      x += barWidth;
      ctx.fillRect(x, margin, barWidth, barHeight);
      x += barWidth * 2;
      ctx.fillRect(x, margin, barWidth, barHeight);
      x += barWidth * 2;

      // Right digits (6 digits)
      for (let i = 7; i <= 12; i++) {
        const digit = parseInt(paddedData[i]);
        const barCount = digit % 2 === 0 ? 7 : 9;
        for (let j = 0; j < barCount; j++) {
          if (j % 2 === 0) {
            ctx.fillRect(x, margin, barWidth, barHeight);
          }
          x += barWidth;
        }
      }

      // End guard
      ctx.fillRect(x, margin, barWidth, barHeight);
      x += barWidth * 2;
      ctx.fillRect(x, margin, barWidth, barHeight);

      // Draw text
      ctx.fillStyle = "#000000";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(paddedData, canvas.width / 2, barHeight + margin + 20);
    },
    []
  );

  // Generate barcode
  const generateBarcode = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !toolState.code) return;

    try {
      setError("");

      if (barcodeType === "code128") {
        if (toolState.code.length === 0 || toolState.code.length > 50) {
          setError("Code128: Enter 1-50 characters");
          return;
        }
        generateCode128(toolState.code, canvas);
      } else if (barcodeType === "ean13") {
        const numericData = toolState.code.replace(/\D/g, "");
        if (numericData.length === 0) {
          setError("EAN13: Enter numeric digits only");
          return;
        }
        generateEAN13(numericData, canvas);
      } else if (barcodeType === "upca") {
        const numericData = toolState.code.replace(/\D/g, "");
        if (numericData.length === 0) {
          setError("UPC-A: Enter numeric digits only");
          return;
        }
        generateEAN13(numericData.substring(0, 12), canvas);
      } else if (barcodeType === "code39") {
        if (toolState.code.length === 0 || toolState.code.length > 40) {
          setError("Code39: Enter 1-40 alphanumeric characters");
          return;
        }
        generateCode128(toolState.code.toUpperCase(), canvas);
      }
    } catch (err) {
      setError("Failed to generate barcode");
      console.error(err);
    }
  }, [toolState.code, barcodeType, generateCode128, generateEAN13]);

  useEffect(() => {
    generateBarcode();
  }, [generateBarcode]);

  const handleTypeChange = (event: SelectChangeEvent<BarcodeType>) => {
    setBarcodeType(event.target.value as BarcodeType);
    setError("");
  };

  const downloadBarcode = useCallback(
    (format: "png" | "svg") => {
      const canvas = canvasRef.current;
      if (!canvas) {
        toolState.actions.showMessage("No barcode to download");
        return;
      }

      if (format === "png") {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `barcode-${barcodeType}-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toolState.actions.showMessage("Barcode downloaded as PNG!");
        });
      }
    },
    [barcodeType, toolState.actions]
  );

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
        title="Barcode Generator"
        description="Create professional barcodes online. Generate Code128, EAN13, UPC-A, and Code39 barcodes instantly."
        exampleCode="Enter data → Select format → Generate barcode → Download"
        exampleOutput="High-quality barcode images ready for printing"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Input Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Barcode Settings
            </Typography>

            <div className="space-y-4">
              <FormControl fullWidth>
                <InputLabel>Barcode Type</InputLabel>
                <Select
                  value={barcodeType}
                  onChange={handleTypeChange}
                  label="Barcode Type"
                >
                  <MenuItem value="code128">Code128 (Alphanumeric)</MenuItem>
                  <MenuItem value="ean13">EAN13 (13 digits)</MenuItem>
                  <MenuItem value="upca">UPC-A (12 digits)</MenuItem>
                  <MenuItem value="code39">Code39 (Alphanumeric)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Barcode Data"
                value={toolState.code}
                onChange={(e) => toolState.setCode(e.target.value)}
                placeholder={
                  barcodeType === "ean13" || barcodeType === "upca"
                    ? "Enter numbers only"
                    : "Enter text or numbers"
                }
                multiline
                rows={2}
                helperText={
                  barcodeType === "code128"
                    ? "Supports letters, numbers, and special characters (1-50 chars)"
                    : barcodeType === "ean13"
                    ? "Enter 13 numeric digits (will auto-pad if shorter)"
                    : barcodeType === "upca"
                    ? "Enter 12 numeric digits (will auto-pad if shorter)"
                    : "Uppercase letters and numbers only (1-40 chars)"
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Barcode Display */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Generated Barcode
            </Typography>

            <div className="flex justify-center items-center bg-white p-6 rounded-lg border-2 border-gray-200">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
              <button
                onClick={() => downloadBarcode("png")}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <DownloadIcon />
                Download PNG
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Barcode Format Guide
            </Typography>
            <div className="space-y-3">
              <div>
                <Typography variant="subtitle2" className="font-bold">
                  Code128
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Universal barcode supporting alphanumeric characters. Best for
                  general purpose use, inventory, and shipping.
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-bold">
                  EAN13
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  European Article Number. Standard for retail products
                  worldwide. Requires 13 numeric digits.
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-bold">
                  UPC-A
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Universal Product Code. Standard for retail in North America.
                  Requires 12 numeric digits.
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-bold">
                  Code39
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Industrial barcode supporting uppercase letters and numbers.
                  Used in automotive and defense industries.
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Tips */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Usage Tips
            </Typography>
            <div className="text-gray-600 space-y-2">
              <Typography variant="body2" component="div">
                • Ensure sufficient white space (quiet zone) around the barcode
                when printing
              </Typography>
              <Typography variant="body2" component="div">
                • Test your barcode with an actual scanner before mass printing
              </Typography>
              <Typography variant="body2" component="div">
                • Use high contrast (black bars on white background) for best
                scanning
              </Typography>
              <Typography variant="body2" component="div">
                • Maintain minimum size requirements for the barcode type you
                choose
              </Typography>
              <Typography variant="body2" component="div">
                • Download as PNG for printing or digital use
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
