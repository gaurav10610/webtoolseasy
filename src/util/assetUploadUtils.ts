import path from "path";
import fs from "fs";

/**
 * Uploads a file to the local file system
 * @param param0
 */
export async function uploadFile({
  file,
}: Readonly<{
  file: File;
}>) {
  const reader = file.stream().getReader();
  const chunks: Uint8Array[] = [];
  let done = false;
  while (!done) {
    const { value, done: doneValue } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = doneValue;
  }
  const fileBuffer = new Uint8Array(
    chunks.reduce((acc, chunk) => {
      const newAcc = new Uint8Array(acc.length + chunk.length);
      newAcc.set(acc);
      newAcc.set(chunk, acc.length);
      return newAcc;
    }, new Uint8Array())
  );

  // Save the file to the public directory
  const mediaDir = path.join(process.cwd(), "public", "media");
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  const fileExtension = file.name.split(".").pop();
  const uniqueFileName = `${Date.now()}.${fileExtension}`;
  const filePath = path.join(mediaDir, uniqueFileName);
  fs.writeFileSync(filePath, fileBuffer);

  return { fileUrl: `/media/${uniqueFileName}` };
}
