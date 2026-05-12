import { NextRequest, NextResponse } from "next/server";
import { _listSyncEntities, _upsertSyncEntity } from "@/lib/syncStore";
import { _validateSyncRequestAuth } from "@/lib/syncApiAuth";

export async function GET(request: NextRequest) {
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

  const auth = _validateSyncRequestAuth(request.headers);

  return NextResponse.json({
    ok: auth.allowed,
    mode: auth.mode,
    recipes: _listSyncEntities("recipes"),
    message: "Recipe metadata sync endpoint ready.",
  });
}

export async function POST(request: NextRequest) {
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
    _upsertSyncEntity("recipes", {
      id: item.id,
      projectId: item.projectId,
      updatedAt: item.updatedAt,
      payload: { ...item.payload, owner: auth.userId },
    }),
  );

  return NextResponse.json({
    ok: true,
    mode: auth.mode,
    count: upserted.length,
    message: "Recipe metadata save path active.",
  });
}
