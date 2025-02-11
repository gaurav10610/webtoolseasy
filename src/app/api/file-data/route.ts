import { NextResponse } from "next/server";
import { saveJsonFile } from "@/service/apiService";

/**
 * Adds a new file to the data folder
 * @param request
 * @param props
 * @returns
 */
export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "This endpoint is not available in production" },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();
    const { folder, fileName, data } = body;

    await saveJsonFile({ folder, fileName, data });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating file data", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error updating file data";
    return NextResponse.json(
      { success: false, error: errorMessage },
      {
        status: 500,
      }
    );
  }
}
