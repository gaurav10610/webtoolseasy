"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  TextField,
  Typography,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

type TextAlign = "left" | "center" | "right";

export default function MemeGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Impact");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [textAlign, setTextAlign] = useState<TextAlign>("center");

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Setup text styling
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.textAlign = textAlign;

    // Text position based on alignment
    let xPos: number;
    if (textAlign === "left") {
      xPos = 20;
    } else if (textAlign === "right") {
      xPos = canvas.width - 20;
    } else {
      xPos = canvas.width / 2;
    }

    // Draw top text
    if (topText) {
      const topY = fontSize + 20;
      ctx.strokeText(topText.toUpperCase(), xPos, topY);
      ctx.fillText(topText.toUpperCase(), xPos, topY);
    }

    // Draw bottom text
    if (bottomText) {
      const bottomY = canvas.height - 20;
      ctx.strokeText(bottomText.toUpperCase(), xPos, bottomY);
      ctx.fillText(bottomText.toUpperCase(), xPos, bottomY);
    }
  }, [
    image,
    topText,
    bottomText,
    fontSize,
    fontFamily,
    textColor,
    strokeColor,
    strokeWidth,
    textAlign,
  ]);

  useEffect(() => {
    if (image) {
      drawMeme();
    }
  }, [image, drawMeme]);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toolState.actions.showMessage("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          toolState.actions.showMessage("Image loaded successfully!");
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [toolState.actions]
  );

  const downloadMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) {
      toolState.actions.showMessage("Please upload an image first");
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meme-webtoolseasy.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toolState.actions.showMessage("Meme downloaded!");
    }, "image/png");
  }, [image, toolState.actions]);

  const loadSampleImage = useCallback(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImage(img);
      toolState.actions.showMessage("Sample meme template loaded!");
    };
    img.onerror = () => {
      toolState.actions.showMessage("Failed to load sample image");
    };
    // Simple colored background as fallback
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#3498db";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      img.src = canvas.toDataURL();
    }
  }, [toolState.actions]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Upload Image",
      icon: <CloudUploadIcon />,
      onClick: () => fileInputRef.current?.click(),
      variant: "contained" as const,
    },
    {
      type: "custom" as const,
      text: "Use Sample",
      onClick: loadSampleImage,
      variant: "outlined" as const,
    },
    {
      type: "custom" as const,
      text: "Download Meme",
      icon: <DownloadIcon />,
      onClick: downloadMeme,
      variant: "contained" as const,
      color: "success" as const,
      disabled: !image,
    },
  ];

  const fontOptions = [
    "Impact",
    "Arial",
    "Comic Sans MS",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Courier New",
  ];

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Free Online Meme Generator"
        description="Create custom memes with text overlay. Upload images and add funny captions with our free meme maker tool."
        exampleCode="Upload image → Add text → Download meme"
        exampleOutput="Professional memes with custom text"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <ToolControls buttons={buttons} />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Controls Panel */}
        <Card className="w-full md:w-1/3">
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h6" className="font-semibold">
              Meme Text
            </Typography>

            <TextField
              label="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              fullWidth
              size="small"
            />

            <TextField
              label="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              fullWidth
              size="small"
            />

            <Typography variant="subtitle2" className="font-semibold mt-2">
              Font Settings
            </Typography>

            <FormControl fullWidth size="small">
              <InputLabel>Font Family</InputLabel>
              <Select
                value={fontFamily}
                label="Font Family"
                onChange={(e) => setFontFamily(e.target.value)}
              >
                {fontOptions.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <Typography variant="body2" gutterBottom>
                Font Size: {fontSize}px
              </Typography>
              <Slider
                value={fontSize}
                onChange={(_, value) => setFontSize(value as number)}
                min={20}
                max={100}
                size="small"
              />
            </div>

            <div>
              <Typography variant="body2" gutterBottom>
                Stroke Width: {strokeWidth}px
              </Typography>
              <Slider
                value={strokeWidth}
                onChange={(_, value) => setStrokeWidth(value as number)}
                min={0}
                max={10}
                size="small"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Typography variant="body2">Text Color:</Typography>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Typography variant="body2">Stroke Color:</Typography>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>

            <div>
              <Typography variant="body2" gutterBottom>
                Text Alignment
              </Typography>
              <ToggleButtonGroup
                value={textAlign}
                exclusive
                onChange={(_, value) => value && setTextAlign(value)}
                size="small"
                fullWidth
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Preview */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <Card className="w-full">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Meme Preview
              </Typography>
              {!image ? (
                <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
                  <Typography variant="body1" color="text.secondary">
                    Upload an image or use a sample template to start creating
                    your meme
                  </Typography>
                </div>
              ) : (
                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-gray-300 rounded"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
