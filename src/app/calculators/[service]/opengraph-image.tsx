import { ImageResponse } from "next/og";
import { calculatorPages } from "@/data/calculatorPages";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    service: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { service } = await params;
  const calc = calculatorPages.find((c) => c.service.toLowerCase() === service);

  const title = calc ? `${calc.name} Pricing` : "AWS Pricing Calculator";
  const subtitle = calc
    ? `${calc.service} cost model and assumptions`
    : "Estimate and optimize monthly cloud spend";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 14% 16%, rgba(251, 191, 36, 0.26) 0%, rgba(15, 23, 42, 0) 40%), radial-gradient(circle at 86% 22%, rgba(56, 189, 248, 0.22) 0%, rgba(15, 23, 42, 0) 43%), linear-gradient(140deg, #131722 0%, #111827 58%, #0a0a0b 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#f59e0b", letterSpacing: "0.08em" }}>
        WEBTOOLSEASY | ARCHCOST
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 66,
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, color: "#cbd5e1", maxWidth: 1000 }}>
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
        <span>Interactive calculator guide</span>
        <span style={{ color: "#475569" }}>|</span>
        <span>webtoolseasy.com</span>
      </div>
    </div>,
    size,
  );
}
