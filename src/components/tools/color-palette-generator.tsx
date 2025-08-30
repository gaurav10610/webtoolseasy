"use client";

import React, { useState, useMemo } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function adjustLightness(hex: string, percent: number) {
  const [r, g, b] = hexToRgb(hex);
  const adjust = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v + (255 - v) * percent)));
  return rgbToHex(adjust(r), adjust(g), adjust(b));
}

function complementary(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
}

function rotateHue(hex: string, deg: number) {
  // simple approximation via HSL conversion
  const [r, g, b] = hexToRgb(hex);
  const rf = r / 255,
    gf = g / 255,
    bf = b / 255;
  const max = Math.max(rf, gf, bf),
    min = Math.min(rf, gf, bf);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf:
        h = (gf - bf) / d + (gf < bf ? 6 : 0);
        break;
      case gf:
        h = (bf - rf) / d + 2;
        break;
      case bf:
        h = (rf - gf) / d + 4;
        break;
    }
    h /= 6;
  }
  h = (h * 360 + deg + 360) % 360;
  // convert back to rgb
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r1 = l,
    g1 = l,
    b1 = l;
  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r1 = hue2rgb(p, q, h + 1 / 3);
    g1 = hue2rgb(p, q, h);
    b1 = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToHex(
    Math.round(r1 * 255),
    Math.round(g1 * 255),
    Math.round(b1 * 255)
  );
}

export default function ColorPaletteGenerator() {
  const initial = "#3b82f6"; // blue-500
  const [color, setColor] = useState<string>(initial);
  const [paletteSize, setPaletteSize] = useState<number>(5);
  const [mode, setMode] = useState<string>("analogous");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const handleSnackBarClose = () => setIsSnackBarOpen(false);

  const palette = useMemo(() => {
    const base = color;
    const arr: string[] = [];
    if (mode === "complementary") {
      arr.push(base, complementary(base));
    } else if (mode === "shades") {
      for (let i = 0; i < paletteSize; i++)
        arr.push(adjustLightness(base, (i - (paletteSize - 1) / 2) * -0.15));
    } else if (mode === "triadic") {
      arr.push(base, rotateHue(base, 120), rotateHue(base, 240));
    } else {
      // analogous
      const step = 30;
      for (let i = 0; i < paletteSize; i++)
        arr.push(rotateHue(base, (i - Math.floor(paletteSize / 2)) * step));
    }
    // ensure unique and trim to paletteSize
    const unique = Array.from(new Set(arr)).slice(0, paletteSize);
    while (unique.length < paletteSize)
      unique.push(adjustLightness(base, 0.1 * unique.length));
    return unique;
  }, [color, paletteSize, mode]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setSnackBarMessage(`Copied ${text}`);
    setIsSnackBarOpen(true);
  };

  const downloadPalette = () => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${
      palette.length * 100
    }' height='100'>${palette
      .map(
        (c, i) =>
          `<rect x='${i * 100}' y='0' width='100' height='100' fill='${c}'/>`
      )
      .join("")}</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const buttons = [
    {
      type: "custom" as const,
      text: "Download SVG",
      onClick: downloadPalette,
      icon: <DownloadIcon />,
      variant: "outlined" as const,
    },
    {
      type: "custom" as const,
      text: "Copy CSS",
      onClick: () => {
        const css = palette.map((c, i) => `--color-${i}: ${c};`).join("\n");
        navigator.clipboard.writeText(css);
        setSnackBarMessage("CSS variables copied");
        setIsSnackBarOpen(true);
      },
      icon: <ContentCopyIcon />,
      variant: "outlined" as const,
    },
    ...createCommonButtons({
      onCopy: () => copyToClipboard(color),
    }),
  ];

  return (
    <ToolLayout
      snackBar={{
        open: isSnackBarOpen,
        message: snackBarMessage,
        onClose: handleSnackBarClose,
        autoHideDuration: 2000,
      }}
    >
      <SEOContent
        title="Color Palette Generator"
        description="Generate harmonious color palettes online. Create complementary, triadic, analogous palettes and download SVG palettes."
        exampleCode={"#3b82f6"}
        exampleOutput={"A set of harmonious colors"}
      />

      <ToolControls buttons={buttons} isFullScreen={false} />

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">
            Color Picker & Palette Generator
          </h2>
          <div className="flex items-center gap-2">
            {/* All action buttons are available in the toolbar above (ToolControls) */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-4 bg-white rounded shadow">
            <label className="block text-sm font-medium mb-2">Base Color</label>
            <div className="flex items-center gap-4">
              <input
                aria-label="Pick base color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-16 rounded cursor-pointer"
              />
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <input
                    className="border rounded px-2 py-1 text-sm w-36"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <button
                    className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer"
                    onClick={() => copyToClipboard(color)}
                    title="Copy hex"
                  >
                    <ContentCopyIcon />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Adjust palette size and mode
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm">Size</label>
              <input
                type="range"
                min={2}
                max={8}
                value={paletteSize}
                onChange={(e) => setPaletteSize(Number(e.target.value))}
                className="w-48"
              />
              <span className="text-sm font-medium">{paletteSize}</span>
            </div>

            <div className="mt-4 flex gap-2 items-center">
              <button
                className={`px-3 py-1 rounded ${
                  mode === "analogous"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setMode("analogous")}
              >
                Analogous
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mode === "complementary"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setMode("complementary")}
              >
                Complementary
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mode === "triadic" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => setMode("triadic")}
              >
                Triadic
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mode === "shades" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => setMode("shades")}
              >
                Shades
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-sm font-semibold mb-2">Generated Palette</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                {palette.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-12 h-12 rounded"
                      style={{ background: c }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {c.toUpperCase()}
                      </span>
                      <div className="mt-1 text-xs text-gray-600">
                        Click hex to copy
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <h4 className="text-sm font-medium mb-2">Export</h4>
                <div className="text-xs text-gray-600">
                  Use the toolbar above to download SVG or copy CSS variables.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
