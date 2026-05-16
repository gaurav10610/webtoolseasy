import { NextResponse } from "next/server";
import { ensureArchitectureTable, getDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await ensureArchitectureTable();
    const client = getDb();
    const result = await client.query({
      text: "SELECT data FROM architectures WHERE id = $1 OR slug = $1",
      values: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Architecture not found" },
        { status: 404 },
      );
    }

    // Increment view count (fire and forget)
    client
      .query({
        text: "UPDATE architectures SET view_count = view_count + 1 WHERE id = $1 OR slug = $1",
        values: [id],
      })
      .catch((err) => console.error("Failed to update view count:", err));

    return NextResponse.json({ data: result.rows[0].data });
  } catch (error) {
    console.error("Failed to fetch architecture:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
