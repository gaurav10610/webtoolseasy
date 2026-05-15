"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type ColorViewProps = {
  input: string;
};

type Rgb = [number, number, number];

function normalizeHex(value: string): string | null {
  const trimmed = value.trim().replace(/^#/, "");

  if (/^[0-9a-f]{3}$/i.test(trimmed)) {
    return `#${trimmed
      .split("")
      .map((char) => char + char)
      .join("")
      .toLowerCase()}`;
  }

  if (/^[0-9a-f]{6}$/i.test(trimmed)) {
    return `#${trimmed.toLowerCase()}`;
  }

  return null;
}

function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

export function rgbToHex([red, green, blue]: Rgb) {
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function rgbToHsl([red, green, blue]: Rgb) {
  const normalizedRed = red / 255;
  const normalizedGreen = green / 255;
  const normalizedBlue = blue / 255;
  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
  const delta = max - min;

  let hue = 0;
  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  if (delta !== 0) {
    switch (max) {
      case normalizedRed:
        hue = 60 * (((normalizedGreen - normalizedBlue) / delta) % 6);
        break;
      case normalizedGreen:
        hue = 60 * ((normalizedBlue - normalizedRed) / delta + 2);
        break;
      default:
        hue = 60 * ((normalizedRed - normalizedGreen) / delta + 4);
        break;
    }
  }

  return [
    ((hue % 360) + 360) % 360,
    saturation * 100,
    lightness * 100,
  ] as const;
}

export function rgbToHsv([red, green, blue]: Rgb) {
  const normalizedRed = red / 255;
  const normalizedGreen = green / 255;
  const normalizedBlue = blue / 255;
  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    switch (max) {
      case normalizedRed:
        hue = 60 * (((normalizedGreen - normalizedBlue) / delta) % 6);
        break;
      case normalizedGreen:
        hue = 60 * ((normalizedBlue - normalizedRed) / delta + 2);
        break;
      default:
        hue = 60 * ((normalizedRed - normalizedGreen) / delta + 4);
        break;
    }
  }

  const saturation = max === 0 ? 0 : delta / max;
  return [((hue % 360) + 360) % 360, saturation * 100, max * 100] as const;
}

export function rgbToOklch([red, green, blue]: Rgb) {
  const linear = [red, green, blue].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  const l =
    0.4122214708 * linear[0] +
    0.5363325363 * linear[1] +
    0.0514459929 * linear[2];
  const m =
    0.2119034982 * linear[0] +
    0.6806995451 * linear[1] +
    0.1073969566 * linear[2];
  const s =
    0.0883024619 * linear[0] +
    0.2817188376 * linear[1] +
    0.6299787005 * linear[2];

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  const lightness =
    0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const b = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

  const chroma = Math.sqrt(a * a + b * b);
  const hue = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;

  return [lightness * 100, chroma, hue] as const;
}

function getContrastRatio(colorA: Rgb, colorB: Rgb): number {
  const luminance = ([red, green, blue]: Rgb) => {
    const channels = [red, green, blue].map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };

  const left = luminance(colorA);
  const right = luminance(colorB);
  return (Math.max(left, right) + 0.05) / (Math.min(left, right) + 0.05);
}

const CSS_COLOR_NAMES: Array<{ name: string; hex: string }> = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "red", hex: "#ff0000" },
  { name: "lime", hex: "#00ff00" },
  { name: "blue", hex: "#0000ff" },
  { name: "yellow", hex: "#ffff00" },
  { name: "cyan", hex: "#00ffff" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "gray", hex: "#808080" },
  { name: "silver", hex: "#c0c0c0" },
  { name: "orange", hex: "#ffa500" },
  { name: "salmon", hex: "#fa8072" },
  { name: "coral", hex: "#ff7f50" },
  { name: "gold", hex: "#ffd700" },
  { name: "pink", hex: "#ffc0cb" },
  { name: "indigo", hex: "#4b0082" },
  { name: "skyblue", hex: "#87ceeb" },
  { name: "seagreen", hex: "#2e8b57" },
  { name: "tomato", hex: "#ff6347" },
  { name: "crimson", hex: "#dc143c" },
];

function getClosestCssColor(rgb: Rgb) {
  let closest = CSS_COLOR_NAMES[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of CSS_COLOR_NAMES) {
    const candidateRgb = hexToRgb(candidate.hex);
    const distance = Math.sqrt(
      (rgb[0] - candidateRgb[0]) ** 2 +
        (rgb[1] - candidateRgb[1]) ** 2 +
        (rgb[2] - candidateRgb[2]) ** 2,
    );

    if (distance < bestDistance) {
      bestDistance = distance;
      closest = candidate;
    }
  }

  return closest;
}

function mixWithWhite(rgb: Rgb, factor: number): Rgb {
  return rgb.map((channel) =>
    Math.round(channel + (255 - channel) * factor),
  ) as Rgb;
}

function mixWithBlack(rgb: Rgb, factor: number): Rgb {
  return rgb.map((channel) => Math.round(channel * (1 - factor))) as Rgb;
}

function buildShades(rgb: Rgb) {
  return {
    lighter: Array.from({ length: 9 }, (_, index) => ({
      label: `Light ${index + 1}`,
      hex: rgbToHex(mixWithWhite(rgb, (index + 1) / 10)),
    })),
    darker: Array.from({ length: 9 }, (_, index) => ({
      label: `Dark ${index + 1}`,
      hex: rgbToHex(mixWithBlack(rgb, (index + 1) / 10)),
    })),
  };
}

export function ColorView({ input }: ColorViewProps) {
  const color = useMemo(() => normalizeHex(input), [input]);
  const [editableColor, setEditableColor] = useState(color ?? "#000000");

  useEffect(() => {
    if (color) {
      setEditableColor(color);
    }
  }, [color]);

  if (!color) {
    return (
      <Panel title="Color" subtitle="Unable to parse color">
        <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Invalid hex color
        </p>
      </Panel>
    );
  }

  const rgb = hexToRgb(editableColor);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const oklch = rgbToOklch(rgb);
  const contrastOnWhite = getContrastRatio(rgb, [255, 255, 255]);
  const contrastOnBlack = getContrastRatio(rgb, [0, 0, 0]);
  const closest = getClosestCssColor(rgb);
  const shades = buildShades(rgb);

  return (
    <div className="space-y-4">
      <Panel
        title="Color swatch"
        action={<CopyButton text={editableColor} label="Copy hex" />}
      >
        <div className="space-y-4">
          <div
            className="h-32 rounded-3xl border border-white/10"
            style={{ backgroundColor: editableColor }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-3 text-sm text-gray-300">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Color picker
              </span>
              <input
                type="color"
                value={editableColor}
                onChange={(event) => setEditableColor(event.target.value)}
                className="h-10 w-14 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
              />
            </label>
            <Badge variant="info">{closest.name}</Badge>
          </div>
        </div>
      </Panel>

      <Panel title="Conversions">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              HEX
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <span>{editableColor}</span>
              <CopyButton text={editableColor} label="Copy" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              RGB
            </div>
            <div className="mt-2 text-white">rgb({rgb.join(", ")})</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              HSL
            </div>
            <div className="mt-2 text-white">
              hsl({hsl[0].toFixed(0)}, {hsl[1].toFixed(1)}%, {hsl[2].toFixed(1)}
              %)
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              HSV
            </div>
            <div className="mt-2 text-white">
              hsv({hsv[0].toFixed(0)}, {hsv[1].toFixed(1)}%, {hsv[2].toFixed(1)}
              %)
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              OKLCH
            </div>
            <div className="mt-2 text-white">
              oklch({oklch[0].toFixed(3)} {oklch[1].toFixed(3)}{" "}
              {oklch[2].toFixed(1)})
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Contrast
            </div>
            <div className="mt-2 text-white">
              White {contrastOnWhite.toFixed(2)} / Black{" "}
              {contrastOnBlack.toFixed(2)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 xl:col-span-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Closest CSS color
            </div>
            <div className="mt-2 text-white">
              {closest.name} ({closest.hex})
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Palette">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Lighter shades
            </div>
            <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-9">
              {shades.lighter.map((shade) => (
                <div
                  key={shade.hex}
                  className="rounded-2xl border border-white/10 bg-black/20 p-2"
                >
                  <div
                    className="h-10 rounded-xl border border-white/10"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <div className="mt-2 text-[10px] text-gray-400">
                    {shade.label}
                  </div>
                  <div className="mt-1 break-all text-xs text-white">
                    {shade.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Darker shades
            </div>
            <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-9">
              {shades.darker.map((shade) => (
                <div
                  key={shade.hex}
                  className="rounded-2xl border border-white/10 bg-black/20 p-2"
                >
                  <div
                    className="h-10 rounded-xl border border-white/10"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <div className="mt-2 text-[10px] text-gray-400">
                    {shade.label}
                  </div>
                  <div className="mt-1 break-all text-xs text-white">
                    {shade.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
