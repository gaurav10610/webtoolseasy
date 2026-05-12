import fs from "node:fs";
import path from "node:path";

const targets = [
  path.join(
    process.cwd(),
    "src",
    "components",
    "workflows",
    "WorkflowRunner.tsx",
  ),
  path.join(
    process.cwd(),
    "src",
    "components",
    "workflows",
    "WorkflowEnhancements.tsx",
  ),
  path.join(process.cwd(), "src", "app", "workflows", "page.tsx"),
  path.join(process.cwd(), "src", "app", "workflows", "[slug]", "page.tsx"),
  path.join(process.cwd(), "src", "app", "templates", "[slug]", "page.tsx"),
];

const keyValues: Record<string, string> = {};

for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  const source = fs.readFileSync(target, "utf8");

  const matches = source.match(/>([^<>{}][^<>]{2,})</g) || [];
  for (const raw of matches) {
    const text = raw.slice(1, -1).replace(/\s+/g, " ").trim();
    if (!text || text.length < 3 || /[{}]/.test(text)) continue;

    const key = `workflow.${text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")}`;

    if (!keyValues[key]) {
      keyValues[key] = text;
    }
  }
}

const outputPath = path.join(
  process.cwd(),
  "src",
  "data",
  "config",
  "workflow-i18n-keys.json",
);

fs.writeFileSync(outputPath, `${JSON.stringify(keyValues, null, 2)}\n`, "utf8");
console.log(
  `Extracted ${Object.keys(keyValues).length} localization-ready keys to ${outputPath}`,
);
