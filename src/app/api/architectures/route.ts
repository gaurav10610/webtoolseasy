import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { nanoid } from "nanoid";

// Simple in-memory rate limit (resets on server restart/serverless cold start)
// In production on Vercel, this is per-isolate.
const rateLimits = new Map<string, { count: number; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    
    const now = Date.now();
    const limit = rateLimits.get(ip);
    if (limit) {
      if (now > limit.expiresAt) {
        rateLimits.set(ip, { count: 1, expiresAt: now + 3600000 }); // 1 hour
      } else if (limit.count >= 10) {
        return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 });
      } else {
        limit.count++;
      }
    } else {
      rateLimits.set(ip, { count: 1, expiresAt: now + 3600000 });
    }

    const body = await request.json();
    const { data } = body;

    if (!data || typeof data !== "string") {
      return NextResponse.json({ error: "Invalid data payload" }, { status: 400 });
    }

    if (data.length > 500000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const id = nanoid(8);
    
    // Insert into DB
    const client = getDb();
    await client.execute({
      sql: "INSERT INTO architectures (id, slug, data, created_at, view_count) VALUES (?, ?, ?, ?, ?)",
      args: [id, id, data, Date.now(), 0],
    });

    return NextResponse.json({ id, url: `/shared/${id}` });
  } catch (error) {
    console.error("Failed to save architecture:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
