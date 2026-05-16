import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = (await searchParams) || {};
  const nameParam = query.name;
  const costParam = query.cost;

  const name =
    (Array.isArray(nameParam) ? nameParam[0] : nameParam) ||
    `Shared Architecture ${id}`;
  const cost = (Array.isArray(costParam) ? costParam[0] : costParam) || "0.00";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 85% 20%, rgba(251, 146, 60, 0.22) 0%, rgba(15, 23, 42, 0) 45%), linear-gradient(140deg, #0b0f1a 0%, #0a0a0b 55%, #111827 100%)",
        color: "#f8fafc",
        padding: "56px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 24, color: "#fdba74", letterSpacing: "0.08em" }}>
        SHARED ON ARCHCOST
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.02,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            maxWidth: 1020,
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1" }}>
          Estimated Monthly Cost
        </div>
        <div style={{ fontSize: 70, fontWeight: 800, color: "#a5f3fc" }}>
          ${cost}
        </div>
      </div>

      <div style={{ fontSize: 28, color: "#a5b4fc" }}>
        webtoolseasy.com/shared/{id}
      </div>
    </div>,
    size,
  );
}
