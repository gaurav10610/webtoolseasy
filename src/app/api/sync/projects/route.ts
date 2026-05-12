import { NextRequest, NextResponse } from "next/server";
import { _listSyncEntities, _upsertSyncEntity } from "@/lib/syncStore";
import { _validateSyncRequestAuth } from "@/lib/syncApiAuth";

export async function GET(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC !== "true") {
    return NextResponse.json(
      { ok: false, message: "Workflow sync disabled" },
      { status: 503 },
    );
  }

  const auth = _validateSyncRequestAuth(request.headers);
  return NextResponse.json({
    ok: auth.allowed,
    mode: auth.mode,
    projects: _listSyncEntities("projects"),
  });
}

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC !== "true") {
    return NextResponse.json(
      { ok: false, message: "Workflow sync disabled" },
      { status: 503 },
    );
  }

  const auth = _validateSyncRequestAuth(request.headers);
  const body = (await request.json()) as {
    items?: Array<{
      id: string;
      projectId?: string;
      updatedAt: string;
      payload: Record<string, unknown>;
    }>;
  };

  const items = body.items || [];
  const upserted = items.map((item) =>
    _upsertSyncEntity("projects", {
      id: item.id,
      projectId: item.projectId,
      updatedAt: item.updatedAt,
      payload: { ...item.payload, owner: auth.userId },
    }),
  );

  return NextResponse.json({
    ok: true,
    count: upserted.length,
    mode: auth.mode,
  });
}
