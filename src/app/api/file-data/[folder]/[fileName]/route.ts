import { NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";
import { updateJsonFile } from "@/service/apiService";

/**
 * Fetch data from a file in the data folder
 * @param request
 * @param props
 * @returns
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ folder: string; pageUrl: string }> }
) {
  const params = await props.params;
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "This endpoint is not available in production" },
        {
          status: 400,
        }
      );
    }

    const folder = params.folder;
    const pageUrl = params.pageUrl;

    const filePath = join(process.cwd(), `/src/data/${folder}/${pageUrl}`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File Not Found!" },
        {
          status: 404,
        }
      );
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);

    return NextResponse.json(
      { data: jsonData },
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "error fetching page data";
    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
      }
    );
  }
}

/**
 * Updates data in a file in the data folder
 * @param request
 * @param props
 * @returns
 */
export async function PUT(
  request: Request,
  props: { params: Promise<{ folder: string; fileName: string }> }
) {
  const { folder, fileName } = await props.params;
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

    await updateJsonFile({
      folder,
      fileName,
      data: body,
    });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "error updating page data";
    return NextResponse.json(
      { error: errorMessage, success: false },
      {
        status: 500,
      }
    );
  }
}
