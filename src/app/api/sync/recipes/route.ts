import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC !== "true") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Workflow sync is disabled. Enable NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC=true to activate metadata sync APIs.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    recipes: [],
    message: "Sync endpoint is ready for metadata-backed recipe storage.",
  });
}

export async function POST() {
  if (process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC !== "true") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Workflow sync is disabled. Enable NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC=true to activate metadata sync APIs.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Recipe metadata save stub is active.",
  });
}
