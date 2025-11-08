import { test, expect } from "@playwright/test";
import { readdirSync } from "fs";
import { join } from "path";

// Get all tool config files dynamically
const toolsDir = join(process.cwd(), "src/data/tools");
const toolFiles = readdirSync(toolsDir).filter((file) => file.endsWith(".ts"));
const toolNames = toolFiles.map((file) => file.replace(".ts", ""));

console.log(`Found ${toolNames.length} tools to test`);

test.describe("Web Tools Sanity Tests", () => {
  // Test each tool
  for (const toolName of toolNames) {
    test(`should load ${toolName} page successfully`, async ({ page }) => {
      // Navigate to the tool page
      const response = await page.goto(`/tools/${toolName}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Verify HTTP 200 response
      expect(response?.status(), `${toolName} should return 200`).toBe(200);

      // Wait for h1 to be present (client component may take time to load)
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible({ timeout: 10000 });
      const headingText = await h1.textContent();

      // Verify page title exists and is not empty
      const title = await page.title();
      expect(title.length, `${toolName} should have a page title`).toBeGreaterThan(0);

      // Verify main content area exists (not a 404 page)
      const mainContent = page.locator("main");
      await expect(mainContent, `${toolName} should have main content`).toBeVisible();

      // Verify no Next.js default 404 page
      const nextJs404 = page.locator('text="This page could not be found"');
      await expect(nextJs404, `${toolName} should not show 404 page`).not.toBeVisible();

      console.log(`✓ ${toolName}: "${title}" - ${headingText?.trim()}`);
    });
  }
});
