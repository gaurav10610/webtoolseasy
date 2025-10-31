"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import DrawIcon from "@mui/icons-material/Draw";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import UploadIcon from "@mui/icons-material/Upload";
import { ToolComponentProps } from "@/types/component";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SEOContent } from "../common/ToolLayout";

export default function SignatureGenerator({}: Readonly<ToolComponentProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState("Brush Script MT");
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [error, setError] = useState("");

  const fonts = [
    "Brush Script MT",
    "Lucida Handwriting",
    "Dancing Script",
    "Pacifico",
    "Great Vibes",
    "Allura",
    "Satisfy",
    "Tangerine",
  ];

  const showMessage = (message: string) => {
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  const drawTypedSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !typedName) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = penColor;
    ctx.font = `60px ${selectedFont}, cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
  }, [typedName, selectedFont, penColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (activeTab === 1) {
      // Draw typed signature
      drawTypedSignature();
    }
  }, [activeTab, typedName, selectedFont, drawTypedSignature]);

  const startDrawing = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (activeTab !== 0) return;
      setIsDrawing(true);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        "touches" in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    },
    [activeTab, penColor, penSize]
  );

  const draw = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing || activeTab !== 0) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        "touches" in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [isDrawing, activeTab]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showMessage("Canvas cleared");
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Scale image to fit canvas
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          showMessage("Signature image uploaded");
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const downloadSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if canvas is empty
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let isEmpty = true;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      showMessage("Please create a signature first");
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "signature.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showMessage("Signature downloaded successfully");
    }, "image/png");
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <SEOContent
        title="Free Signature Generator - Create Digital Signatures Online"
        description="Create professional digital signatures online. Draw, type, or upload your signature with transparent background."
      />

      <SnackBarWithPosition
        open={isSnackBarOpen}
        message={snackBarMessage}
        handleClose={() => setIsSnackBarOpen(false)}
        autoHideDuration={3000}
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h5" className="mb-4">
            Create Your Signature
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            className="mb-4"
          >
            <Tab icon={<DrawIcon />} label="Draw" />
            <Tab icon={<TextFieldsIcon />} label="Type" />
            <Tab icon={<UploadIcon />} label="Upload" />
          </Tabs>

          {/* Drawing Tab */}
          {activeTab === 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center flex-wrap">
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Pen Color</InputLabel>
                  <Select
                    value={penColor}
                    label="Pen Color"
                    onChange={(e: SelectChangeEvent) =>
                      setPenColor(e.target.value)
                    }
                  >
                    <MenuItem value="#000000">Black</MenuItem>
                    <MenuItem value="#0000FF">Blue</MenuItem>
                    <MenuItem value="#000080">Navy Blue</MenuItem>
                  </Select>
                </FormControl>

                <div className="flex-1 min-w-[200px]">
                  <Typography gutterBottom>Pen Size: {penSize}px</Typography>
                  <Slider
                    value={penSize}
                    onChange={(_, value) => setPenSize(value as number)}
                    min={1}
                    max={10}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>

              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2"
              >
                Draw your signature below using your mouse or touchscreen:
              </Typography>
            </div>
          )}

          {/* Type Tab */}
          {activeTab === 1 && (
            <div className="flex flex-col gap-4 mb-4">
              <TextField
                fullWidth
                label="Type your name"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="John Doe"
              />

              <FormControl fullWidth>
                <InputLabel>Font Style</InputLabel>
                <Select
                  value={selectedFont}
                  label="Font Style"
                  onChange={(e: SelectChangeEvent) =>
                    setSelectedFont(e.target.value)
                  }
                >
                  {fonts.map((font) => (
                    <MenuItem
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Signature Color</InputLabel>
                <Select
                  value={penColor}
                  label="Signature Color"
                  onChange={(e: SelectChangeEvent) =>
                    setPenColor(e.target.value)
                  }
                >
                  <MenuItem value="#000000">Black</MenuItem>
                  <MenuItem value="#0000FF">Blue</MenuItem>
                  <MenuItem value="#000080">Navy Blue</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 2 && (
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="signature-upload"
              />
              <label htmlFor="signature-upload">
                <Button variant="contained" component="span" fullWidth>
                  Choose Signature Image
                </Button>
              </label>
              <Typography
                variant="caption"
                color="text.secondary"
                className="mt-2 block"
              >
                Upload an existing signature image (JPG, PNG, etc.)
              </Typography>
            </div>
          )}

          {/* Canvas */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg mb-4 bg-white">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full cursor-crosshair"
              style={{ height: "300px", touchAction: "none" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outlined"
              onClick={clearCanvas}
              startIcon={<ClearIcon />}
              fullWidth
              sx={{ flex: 1 }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={downloadSignature}
              startIcon={<DownloadIcon />}
              fullWidth
              sx={{ flex: 1 }}
            >
              Download PNG
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-2">
            Tips for Creating a Good Signature
          </Typography>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Keep it simple and legible for professional documents</li>
            <li>Use a consistent style across all your signatures</li>
            <li>Practice drawing a few times before downloading</li>
            <li>Choose navy blue or black for formal documents</li>
            <li>
              Downloaded PNG has transparent background for easy placement
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
