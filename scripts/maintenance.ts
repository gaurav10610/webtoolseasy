/**
 * scripts/maintenance.ts
 *
 * All-in-one manual maintenance script to run periodically.
 * Replaces GitHub Actions workflows with a single local command.
 *
 * Usage:
 *   npm run maintenance          # Run all tasks
 *   npm run maintenance:pricing  # Update pricing only
 *   npm run maintenance:sitemap  # Update sitemap only
 *
 * This script:
 *   1. Fetches latest AWS pricing data
 *   2. Regenerates the sitemap
 *   3. Runs a production build to verify everything compiles
 *   4. Reports what changed
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const PRICING_FILE = resolve(ROOT, "src/data/awsPricing.generated.json");
const SITEMAP_FILE = resolve(ROOT, "public/sitemap.xml");

function run(label: string, command: string) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`▶ ${label}`);
  console.log(`  $ ${command}`);
  console.log(`${"─".repeat(60)}\n`);

  try {
    execSync(command, { stdio: "inherit", cwd: ROOT });
    console.log(`\n✅ ${label} — done`);
    return true;
  } catch {
    console.error(`\n❌ ${label} — failed`);
    return false;
  }
}

function getFileHash(filePath: string): string | null {
  if (!existsSync(filePath)) return null;
  try {
    return readFileSync(filePath, "utf8").slice(0, 500);
  } catch {
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const runAll = args.length === 0;
  const runPricing = runAll || args.includes("--pricing");
  const runSitemap = runAll || args.includes("--sitemap");
  const runBuild = runAll || args.includes("--build");

  console.log("╔══════════════════════════════════════════════╗");
  console.log("║   WebToolsEasy — Maintenance Script          ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log(`\nTime: ${new Date().toISOString()}`);

  const results: Array<{ task: string; status: string }> = [];

  // 1. Update AWS pricing
  if (runPricing) {
    const before = getFileHash(PRICING_FILE);
    const success = run("Update AWS Pricing", "npx tsx scripts/fetch-aws-pricing.ts");
    const after = getFileHash(PRICING_FILE);
    const changed = before !== after;
    results.push({
      task: "AWS Pricing",
      status: success
        ? changed
          ? "✅ Updated (data changed)"
          : "✅ No changes"
        : "❌ Failed",
    });
  }

  // 2. Regenerate sitemap
  if (runSitemap) {
    const before = getFileHash(SITEMAP_FILE);
    const success = run("Regenerate Sitemap", "npx tsx scripts/update-sitemap.ts");
    const after = getFileHash(SITEMAP_FILE);
    const changed = before !== after;
    results.push({
      task: "Sitemap",
      status: success
        ? changed
          ? "✅ Updated (content changed)"
          : "✅ No changes"
        : "❌ Failed",
    });
  }

  // 3. Production build
  if (runBuild) {
    const success = run("Production Build", "npm run build");
    results.push({
      task: "Build",
      status: success ? "✅ Passed" : "❌ Failed",
    });
  }

  // Summary
  console.log(`\n${"═".repeat(60)}`);
  console.log("  MAINTENANCE SUMMARY");
  console.log(`${"═".repeat(60)}`);
  for (const result of results) {
    console.log(`  ${result.task.padEnd(20)} ${result.status}`);
  }
  console.log(`${"═".repeat(60)}`);
  console.log(`\nDone at ${new Date().toISOString()}`);

  const hasFailure = results.some((r) => r.status.includes("❌"));
  if (hasFailure) {
    console.log("\n⚠️  Some tasks failed. Review output above.");
    process.exitCode = 1;
  } else {
    console.log("\n🎉 All tasks completed successfully.");
    console.log("   Run `git diff` to review changes, then commit manually.");
  }
}

main();
