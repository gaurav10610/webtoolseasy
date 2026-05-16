import { NextResponse } from "next/server";

// Catch-all route for any /tools/ requests that do not match a statically generated page.
// The new architecture significantly reduced the number of tools, so any old tool URL
// requested here will return a 410 Gone to cleanly drop it from search indexes.

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      error: "Gone",
      message: "This tool has been deprecated and removed in the new WebToolsEasy platform architecture.",
      code: 410,
    }),
    {
      status: 410,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
