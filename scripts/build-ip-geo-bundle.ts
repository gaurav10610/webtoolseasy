import { mkdir, readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

async function main() {
  const sourcePath = path.join(
    process.cwd(),
    "node_modules",
    "ip-location-db",
    "dist",
    "geo-asn-ipv4-country.csv",
  );
  const outputDir = path.join(process.cwd(), "public", "data");
  const outputPath = path.join(outputDir, "ip-geo-ipv4-country.csv.gz");

  const source = await readFile(sourcePath);
  const compressed = gzipSync(source, { level: 9 });

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, compressed);

  const sizeKb = Math.round(compressed.byteLength / 1024);
  console.log(`Wrote ${outputPath} (${sizeKb}KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
