import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "workflow-api",
    syncEnabled: process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC === "true",
    timestamp: new Date().toISOString(),
  });
}
