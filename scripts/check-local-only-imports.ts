import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src");
const TARGET_FOLDERS = [
  path.join(ROOT, "components", "workflows"),
  path.join(ROOT, "hooks"),
  path.join(ROOT, "lib"),
];

const DISALLOWED_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "axios import", regex: /from\s+["']axios["']/ },
  { label: "XMLHttpRequest", regex: /XMLHttpRequest/ },
  { label: "node fs import", regex: /from\s+["']node:fs["']/ },
  { label: "node http import", regex: /from\s+["']node:http["']/ },
];

function listFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;

  for (const child of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, child);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      listFiles(fullPath, acc);
      continue;
    }
    if (/\.(ts|tsx)$/.test(child)) {
      acc.push(fullPath);
    }
  }

  return acc;
}

const files = TARGET_FOLDERS.flatMap((folder) => listFiles(folder));
const violations: string[] = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of DISALLOWED_PATTERNS) {
    if (pattern.regex.test(content)) {
      violations.push(`${file}: ${pattern.label}`);
    }
  }
}

if (violations.length > 0) {
  console.error("Local-only import static checks failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(`Local-only import static checks passed for ${files.length} files`);
