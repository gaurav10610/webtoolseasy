import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
          width: 376,
          height: 376,
          borderRadius: 92,
          background: "rgba(10, 10, 11, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.45)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            borderRadius: 42,
            background:
              "linear-gradient(135deg, #fb923c 0%, #f97316 24%, #4f46e5 78%, #22d3ee 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 8px rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 86,
              height: 86,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: 36,
                borderRadius: 18,
                background: "rgba(255,255,255,0.96)",
              }}
            />
            <div
              style={{
                height: 36,
                borderRadius: 18,
                background: "rgba(255,255,255,0.96)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            color: "#f8fafc",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          WebToolsEasy
        </div>
      </div>
    </div>,
    size,
  );
}
