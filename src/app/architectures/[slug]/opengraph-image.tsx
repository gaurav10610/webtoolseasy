import { ImageResponse } from "next/og";
import { architectureTemplates } from "@/data/architectureTemplates";

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
  const template = architectureTemplates.find((item) => item.slug === slug);

  const title = template ? template.name : "AWS Architecture Template";
  const subtitle = template
    ? `${template.tags.slice(0, 3).join(" | ")}`
    : "Reference architecture with cost breakdown";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 18% 18%, rgba(99, 102, 241, 0.28) 0%, rgba(15, 23, 42, 0) 44%), radial-gradient(circle at 84% 78%, rgba(16, 185, 129, 0.22) 0%, rgba(15, 23, 42, 0) 46%), linear-gradient(150deg, #0f172a 0%, #111827 56%, #09090b 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#a5b4fc", letterSpacing: "0.08em" }}>
        WEBTOOLSEASY | AWS ARCHITECTURES
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 62,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            maxWidth: 1050,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 31, color: "#cbd5e1", maxWidth: 1020 }}>
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          color: "#93c5fd",
        }}
      >
        <span>Deployable blueprint</span>
        <span style={{ color: "#475569" }}>|</span>
        <span>Cost-aware planning</span>
      </div>
    </div>,
    size,
  );
}
