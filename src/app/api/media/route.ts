import { NextResponse } from "next/server";
import { uploadFile } from "@/util/assetUploadUtils";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      {
        status: 400,
      }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  /**
   * Save the file to the data folder
   */
  const { fileUrl } = await uploadFile({ file });

  return NextResponse.json(
    { fileUrl },
    {
      status: 200,
    }
  );
}
