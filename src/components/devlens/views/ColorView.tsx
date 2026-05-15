"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type ColorViewProps = {
  input: string;
};

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

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function getContrastRatio(
  colorA: [number, number, number],
  colorB: [number, number, number],
): number {
  const luminance = ([red, green, blue]: [number, number, number]) => {
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

export function ColorView({ input }: ColorViewProps) {
  const color = useMemo(() => normalizeHex(input), [input]);

  if (!color) {
    return (
      <Panel title="Color" subtitle="Unable to parse color">
        <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Invalid hex color
        </p>
      </Panel>
    );
  }

  const rgb = hexToRgb(color);
  const contrastOnWhite = getContrastRatio(rgb, [255, 255, 255]);
  const contrastOnBlack = getContrastRatio(rgb, [0, 0, 0]);

  return (
    <div className="space-y-4">
      <Panel
        title="Color swatch"
        action={<CopyButton text={color} label="Copy hex" />}
      >
        <div
          className="h-32 rounded-3xl border border-white/10"
          style={{ backgroundColor: color }}
        />
      </Panel>

      <Panel title="Conversions">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              HEX
            </div>
            <div className="mt-2 text-white">{color}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              RGB
            </div>
            <div className="mt-2 text-white">rgb({rgb.join(", ")})</div>
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
        </div>
      </Panel>
    </div>
  );
}
