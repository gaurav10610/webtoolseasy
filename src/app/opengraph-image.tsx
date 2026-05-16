import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.24) 0%, rgba(15, 23, 42, 0) 42%), radial-gradient(circle at 85% 22%, rgba(249, 115, 22, 0.24) 0%, rgba(15, 23, 42, 0) 45%), linear-gradient(140deg, #0b0f1a 0%, #0a0a0b 58%, #111827 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 26, color: "#c4b5fd", letterSpacing: "0.08em" }}>
        WEBTOOLSEASY
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.02,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            maxWidth: 1050,
          }}
        >
          DevLens + ArchCost
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1", maxWidth: 1020 }}>
          JWT Decoder, JSON Query, Regex Tester, and Visual AWS Cost Estimator
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          color: "#a5b4fc",
        }}
      >
        <span>webtoolseasy.com</span>
        <span style={{ color: "#64748b" }}>•</span>
        <span>Privacy-first, local-first developer tools</span>
      </div>
    </div>,
    size,
  );
}
