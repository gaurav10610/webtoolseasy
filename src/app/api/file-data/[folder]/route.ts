import { NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";

/**
 * Fetches the list of files in a folder with data
 * @param request
 * @param props
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ folder: string }> }
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

    const folderPath = join(process.cwd(), `/src/data/${folder}`);

    if (!fs.existsSync(folderPath)) {
      return NextResponse.json(
        { error: "Folder Not Found!" },
        {
          status: 404,
        }
      );
    }

    const files = fs.readdirSync(folderPath);
    const filesData = files.map((file) => {
      const filePath = join(folderPath, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents);
    });

    return NextResponse.json(
      { list: filesData },
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "error fetching folder data";
    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
      }
    );
  }
}
