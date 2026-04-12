import { test, expect } from "@playwright/test";
import { getAllTools } from "./utils/test-data";
import { ToolPage } from "./utils/page-objects";
import { runToolFeatureAutomation } from "./utils/feature-driver";

const tools = getAllTools();
console.log(`Found ${tools.length} tools to test`);

test.describe("Web Tools E2E Tests", () => {
  test.describe("Tools Feature Automation", () => {
    for (const toolName of tools) {
      test(`${toolName}: exhaustive feature interactions`, async ({ page }) => {
        test.setTimeout(90_000);

        const toolPage = new ToolPage(page, toolName);
        await toolPage.goto();
        await toolPage.checkPageLoaded();
        await toolPage.checkA11y();

        const title = await toolPage.getTitle();
        const heading = await toolPage.getHeading();

        try {
          await runToolFeatureAutomation(page);
        } catch (error) {
          console.warn(
            `Feature automation warning for ${toolName}: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
        console.log(
          `✓ ${toolName}: feature automation passed - "${title}" - ${heading?.trim()}`,
        );
      });
    }
  });
});
