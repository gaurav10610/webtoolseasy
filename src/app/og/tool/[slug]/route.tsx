import { ImageResponse } from "next/og";
import { TOOL_META } from "@/lib/devlens/toolMeta";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const meta = TOOL_META[slug];

  const title = meta?.shortTitle ?? prettifySlug(slug);
  const eyebrow = meta?.eyebrow ?? "DevLens Tool";
  const description =
    meta?.description ??
    "Privacy-first developer utility that runs in your browser.";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 20% 20%, #1f2937 0%, #0a0a0b 45%, #050506 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: 24,
          color: "#fdba74",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "999px",
            background: "#fb923c",
            boxShadow: "0 0 24px rgba(251, 146, 60, 0.9)",
          }}
        />
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#cbd5e1",
            maxWidth: 1040,
            lineHeight: 1.2,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 28, color: "#a5b4fc" }}>webtoolseasy.com</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            color: "#e2e8f0",
          }}
        >
          <span>DevLens</span>
          <span style={{ color: "#64748b" }}>•</span>
          <span>Runs locally in your browser</span>
        </div>
      </div>
    </div>,
    size,
  );
}
