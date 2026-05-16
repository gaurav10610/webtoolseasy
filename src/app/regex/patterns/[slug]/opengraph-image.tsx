import { ImageResponse } from "next/og";
import { regexPatterns } from "@/data/regexPatterns";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const patternData = regexPatterns.find((item) => item.slug === slug);

  const title = patternData ? patternData.name : "Regex Pattern Library";
  const patternText = patternData
    ? `/${patternData.pattern}/${patternData.flags}`
    : "Curated expressions with examples";
  const previewPattern =
    patternText.length > 64 ? `${patternText.slice(0, 61)}...` : patternText;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.26) 0%, rgba(15, 23, 42, 0) 42%), radial-gradient(circle at 82% 78%, rgba(244, 114, 182, 0.2) 0%, rgba(15, 23, 42, 0) 44%), linear-gradient(140deg, #130b17 0%, #111827 52%, #09090b 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#f9a8d4", letterSpacing: "0.08em" }}>
        WEBTOOLSEASY | REGEX PATTERNS
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            maxWidth: 1060,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#fbcfe8",
            maxWidth: 1020,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {previewPattern}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          color: "#f9a8d4",
        }}
      >
        <span>Test and refine expressions</span>
        <span style={{ color: "#475569" }}>|</span>
        <span>webtoolseasy.com</span>
      </div>
    </div>,
    size,
  );
}
