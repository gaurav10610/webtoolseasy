import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 30% 20%, rgba(251, 146, 60, 0.65) 0%, rgba(79, 70, 229, 0.35) 38%, rgba(10, 10, 11, 1) 100%)",
      }}
    >
      <div
        style={{
          width: 136,
          height: 136,
          borderRadius: 36,
          background:
            "linear-gradient(135deg, #fb923c 0%, #f97316 24%, #4f46e5 78%, #22d3ee 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ height: 32, borderRadius: 16, background: "white" }} />
          <div style={{ height: 32, borderRadius: 16, background: "white" }} />
        </div>
      </div>
    </div>,
    size,
  );
}
