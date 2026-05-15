import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ColorView,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToOklch,
} from "@/components/devlens/views/ColorView";

describe("ColorView", () => {
  it("renders the live color tools", () => {
    const html = renderToStaticMarkup(<ColorView input="#1e90ff" />);

    expect(html).toContain("Color picker");
    expect(html).toContain("Closest CSS color");
    expect(html).toContain("Lighter shades");
    expect(html).toContain("Darker shades");
    expect(html).toContain("OKLCH");
  });

  it("converts RGB values to hex, HSL, HSV, and OKLCH", () => {
    expect(rgbToHex([30, 144, 255])).toBe("#1e90ff");

    const hsl = rgbToHsl([255, 0, 0]);
    expect(hsl[0]).toBeCloseTo(0, 1);
    expect(hsl[1]).toBeCloseTo(100, 1);
    expect(hsl[2]).toBeCloseTo(50, 1);

    const hsv = rgbToHsv([30, 144, 255]);
    expect(hsv[0]).toBeCloseTo(210, 0);
    expect(hsv[1]).toBeCloseTo(88.2, 1);
    expect(hsv[2]).toBeCloseTo(100, 1);

    const oklch = rgbToOklch([255, 255, 255]);
    expect(oklch[0]).toBeGreaterThan(99);
    expect(oklch[1]).toBeLessThan(0.05);
  });
});
