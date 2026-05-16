import { ImageResponse } from "next/og";
import { jwtClaims } from "@/data/jwtClaims";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    claim: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { claim } = await params;
  const claimData = jwtClaims.find((item) => item.id === claim);

  const title = claimData
    ? `JWT Claim: ${claimData.name}`
    : "JWT Claim Reference";
  const subtitle = claimData
    ? `${claimData.fullName} | ${claimData.type}`
    : "Meaning, type, and security guidance";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 86% 20%, rgba(14, 165, 233, 0.24) 0%, rgba(15, 23, 42, 0) 44%), radial-gradient(circle at 16% 78%, rgba(129, 140, 248, 0.24) 0%, rgba(15, 23, 42, 0) 46%), linear-gradient(145deg, #0b1020 0%, #111827 55%, #0a0a0b 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#93c5fd", letterSpacing: "0.08em" }}>
        WEBTOOLSEASY | JWT CLAIMS
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
        <div style={{ fontSize: 32, color: "#cbd5e1", maxWidth: 1020 }}>
          {subtitle}
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
        <span>Token standards and validation</span>
        <span style={{ color: "#475569" }}>|</span>
        <span>webtoolseasy.com</span>
      </div>
    </div>,
    size,
  );
}
