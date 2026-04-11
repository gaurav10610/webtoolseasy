"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Slider,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PaletteIcon from "@mui/icons-material/Palette";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
}

export default function ColorConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "#3B82F6",
  });

  const [colorFormats, setColorFormats] = useState<ColorFormats>({
    hex: "#3B82F6",
    rgb: "rgb(59, 130, 246)",
    hsl: "hsl(217, 91%, 60%)",
    cmyk: "cmyk(76%, 47%, 0%, 4%)",
  });

  const [rgbSliders, setRgbSliders] = useState({ r: 59, g: 130, b: 246 });

  const hexToRgb = (hex: string): [number, number, number] | null => {
    // Support both 3-digit and 6-digit hex
    const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (short) {
      return [
        parseInt(short[1] + short[1], 16),
        parseInt(short[2] + short[2], 16),
        parseInt(short[3] + short[3], 16),
      ];
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const rgbToCmyk = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number, number] => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100),
    ];
  };

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const [h, s, l] = rgbToHsl(r, g, b);
    const [c, m, y, k] = rgbToCmyk(r, g, b);

    setColorFormats({
      hex: hex.toUpperCase(),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
    });
    setRgbSliders({ r, g, b });
  }, []);

  useEffect(() => {
    const parseInput = (input: string): [number, number, number] | null => {
      const trimmed = input.trim();

      // HEX (3-digit and 6-digit)
      if (
        /^#?[0-9A-Fa-f]{3}$/.test(trimmed) ||
        /^#?[0-9A-Fa-f]{6}$/.test(trimmed)
      ) {
        const hex = trimmed.startsWith("#") ? trimmed : "#" + trimmed;
        return hexToRgb(hex);
      }

      // RGB
      const rgbMatch = trimmed.match(
        /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,
      );
      if (rgbMatch) {
        return [
          parseInt(rgbMatch[1]),
          parseInt(rgbMatch[2]),
          parseInt(rgbMatch[3]),
        ];
      }

      // Simple RGB numbers
      const numbersMatch = trimmed.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (numbersMatch) {
        return [
          parseInt(numbersMatch[1]),
          parseInt(numbersMatch[2]),
          parseInt(numbersMatch[3]),
        ];
      }

      return null;
    };

    const rgb = parseInput(toolState.code);
    if (rgb) {
      updateFromRgb(rgb[0], rgb[1], rgb[2]);
    }
  }, [toolState.code, updateFromRgb]);

  const handleSliderChange = useCallback(
    (channel: "r" | "g" | "b", value: number) => {
      const newRgb = { ...rgbSliders, [channel]: value };
      setRgbSliders(newRgb);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      toolState.setCode(hex.toUpperCase());
    },
    [rgbSliders, toolState],
  );

  const copyFormat = (format: string, value: string) => {
    toolState.actions.copyText(value, `${format} copied!`);
  };

  // Derive current HSL hue/saturation/lightness
  const currentHsl = useMemo(() => {
    const m = colorFormats.hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    return m ? { h: +m[1], s: +m[2], l: +m[3] } : { h: 0, s: 0, l: 50 };
  }, [colorFormats.hsl]);

  const hslToRgbArr = (
    h: number,
    s: number,
    l: number,
  ): [number, number, number] => {
    const sl = s / 100,
      ll = l / 100;
    const a = sl * Math.min(ll, 1 - ll);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      return ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4)),
    ];
  };

  const harmonyColors = useMemo(() => {
    const { h, s, l } = currentHsl;
    const make = (deg: number) => {
      const [r, g, b] = hslToRgbArr((h + deg) % 360, s, l);
      return rgbToHex(r, g, b).toUpperCase();
    };
    return {
      complementary: [make(180)],
      triadic: [make(120), make(240)],
      analogous: [make(330), make(30)],
      splitComplementary: [make(150), make(210)],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHsl]);

  const wcagContrast = useMemo(() => {
    const { r, g, b } = rgbSliders;
    const toLin = (v: number) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const lum = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
    const vsWhite = 1.05 / (lum + 0.05);
    const vsBlack = (lum + 0.05) / 0.05;
    return {
      vsWhite: +vsWhite.toFixed(2),
      vsBlack: +vsBlack.toFixed(2),
      lum: +lum.toFixed(4),
    };
  }, [rgbSliders]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Copy HEX",
      onClick: () => copyFormat("HEX", colorFormats.hex),
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
    {
      type: "custom" as const,
      text: "Copy RGB",
      onClick: () => copyFormat("RGB", colorFormats.rgb),
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
    {
      type: "custom" as const,
      text: "Copy HSL",
      onClick: () => copyFormat("HSL", colorFormats.hsl),
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
    {
      type: "custom" as const,
      text: "Copy CMYK",
      onClick: () => copyFormat("CMYK", colorFormats.cmyk),
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
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
        title="Color Converter Tool"
        description="Convert colors between HEX, RGB, HSL, and CMYK formats. Live color preview with instant conversion and RGB sliders."
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <TextField
            label="Enter Color (HEX, RGB)"
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="#3B82F6, #F00, or rgb(59, 130, 246)"
            fullWidth
            size="small"
            helperText="Supports 3-digit (#F00) and 6-digit (#FF0000) hex, RGB values"
          />
          <div
            className="w-full md:w-32 h-12 border-2 border-gray-300 rounded shrink-0"
            style={{ backgroundColor: colorFormats.hex }}
            title="Color Preview"
          />
        </div>

        {/* RGB Sliders */}
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col gap-3">
            <Typography
              variant="subtitle2"
              className="!font-semibold flex items-center gap-2"
            >
              <PaletteIcon fontSize="small" color="primary" />
              RGB Sliders
            </Typography>
            {(["r", "g", "b"] as const).map((channel) => (
              <Box key={channel} className="flex items-center gap-3">
                <Typography
                  variant="body2"
                  className="!font-mono !font-bold !w-6 text-center"
                  sx={{
                    color:
                      channel === "r"
                        ? "#ef4444"
                        : channel === "g"
                          ? "#22c55e"
                          : "#3b82f6",
                  }}
                >
                  {channel.toUpperCase()}
                </Typography>
                <Slider
                  value={rgbSliders[channel]}
                  onChange={(_, val) =>
                    handleSliderChange(channel, val as number)
                  }
                  min={0}
                  max={255}
                  sx={{
                    color:
                      channel === "r"
                        ? "#ef4444"
                        : channel === "g"
                          ? "#22c55e"
                          : "#3b82f6",
                  }}
                />
                <Typography
                  variant="body2"
                  className="!font-mono !w-8 text-right"
                >
                  {rgbSliders[channel]}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        {/* Large Color Preview */}
        <div
          className="w-full h-24 rounded-lg border-2 border-gray-300 transition-colors duration-200"
          style={{ backgroundColor: colorFormats.hex }}
          title="Color Preview"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PaletteIcon color="primary" />
                <Typography variant="h6" className="text-lg font-semibold">
                  HEX
                </Typography>
              </div>
              <TextField
                value={colorFormats.hex}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  },
                }}
              />
              <Typography variant="caption" className="text-gray-600">
                Used in CSS, HTML, and web design
              </Typography>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PaletteIcon color="primary" />
                <Typography variant="h6" className="text-lg font-semibold">
                  RGB
                </Typography>
              </div>
              <TextField
                value={colorFormats.rgb}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "16px",
                    },
                  },
                }}
              />
              <Typography variant="caption" className="text-gray-600">
                Red, Green, Blue - for digital displays
              </Typography>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PaletteIcon color="primary" />
                <Typography variant="h6" className="text-lg font-semibold">
                  HSL
                </Typography>
              </div>
              <TextField
                value={colorFormats.hsl}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "16px",
                    },
                  },
                }}
              />
              <Typography variant="caption" className="text-gray-600">
                Hue, Saturation, Lightness - intuitive adjustments
              </Typography>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PaletteIcon color="primary" />
                <Typography variant="h6" className="text-lg font-semibold">
                  CMYK
                </Typography>
              </div>
              <TextField
                value={colorFormats.cmyk}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "16px",
                    },
                  },
                }}
              />
              <Typography variant="caption" className="text-gray-600">
                Cyan, Magenta, Yellow, Key - for print design
              </Typography>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-blue-200 bg-blue-50">
          <CardContent>
            <Typography variant="body2" className="text-gray-700">
              <strong>Tip:</strong> Enter any color format or use the RGB
              sliders for precise control. Supported inputs: HEX (#FF5733 or
              #F53), RGB (255, 87, 51), or rgb(255, 87, 51).
            </Typography>
          </CardContent>
        </Card>

        {/* Color Harmony */}
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col gap-3">
            <Typography variant="h6">Color Harmony</Typography>
            {(
              [
                {
                  label: "Complementary",
                  swatches: harmonyColors.complementary,
                },
                { label: "Triadic", swatches: harmonyColors.triadic },
                { label: "Analogous", swatches: harmonyColors.analogous },
                {
                  label: "Split-Complementary",
                  swatches: harmonyColors.splitComplementary,
                },
              ] as const
            ).map(({ label, swatches }) => (
              <div key={label} className="flex items-center gap-3">
                <Typography variant="body2" className="w-40 shrink-0">
                  {label}
                </Typography>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: colorFormats.hex }}
                    title={`Base: ${colorFormats.hex}`}
                    onClick={() => toolState.setCode(colorFormats.hex)}
                  />
                  {swatches.map((hex: string) => (
                    <div
                      key={hex}
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: hex }}
                      title={hex}
                      onClick={() => toolState.setCode(hex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* WCAG Contrast */}
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col gap-3">
            <Typography variant="h6">WCAG Contrast Checker</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  bg: "#ffffff",
                  label: "vs White",
                  ratio: wcagContrast.vsWhite,
                },
                {
                  bg: "#000000",
                  label: "vs Black",
                  ratio: wcagContrast.vsBlack,
                },
              ].map(({ bg, label, ratio }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 p-3 border rounded"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-5 h-5 rounded border"
                      style={{ backgroundColor: bg }}
                    />
                    <Typography variant="subtitle2">{label}</Typography>
                    <Typography
                      variant="h6"
                      sx={{ ml: "auto", fontWeight: "bold" }}
                    >
                      {ratio}:1
                    </Typography>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { level: "AA Normal", pass: ratio >= 4.5 },
                      { level: "AA Large", pass: ratio >= 3 },
                      { level: "AAA Normal", pass: ratio >= 7 },
                      { level: "AAA Large", pass: ratio >= 4.5 },
                    ].map(({ level, pass }) => (
                      <span
                        key={level}
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${pass ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {pass ? "✓" : "✗"} {level}
                      </span>
                    ))}
                  </div>
                  <div
                    className="mt-1 rounded p-2 text-center text-sm font-semibold"
                    style={{
                      backgroundColor: bg,
                      color: colorFormats.hex,
                      border: `2px solid ${colorFormats.hex}`,
                    }}
                  >
                    Sample text on {bg === "#ffffff" ? "white" : "black"}{" "}
                    background
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
