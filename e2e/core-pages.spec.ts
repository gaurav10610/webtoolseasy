import { test, expect } from "@playwright/test";
import { HomePage, CategoryPage } from "./utils/page-objects";

test.describe("Core Pages E2E Tests", () => {
  test.describe("Home Page", () => {
    test("loads successfully", async ({ page }) => {
      const home = new HomePage(page);
      await home.goto();
      await home.checkPageLoaded();
      await home.checkA11y();
      console.log("✓ Home page loads");
    });

    test("has search functionality", async ({ page }) => {
      const home = new HomePage(page);
      await home.goto();
      await home.checkSearch();
      console.log("✓ Search functionality present");
    });

    test("displays categories", async ({ page }) => {
      const home = new HomePage(page);
      await home.goto();
      await home.checkCategories();
      console.log("✓ Categories displayed");
    });
  });

  test.describe("Category Pages", () => {
    const categories = ["pdf-tools", "image-tools", "dev-tools", "text-tools"];

    for (const category of categories) {
      test(`${category} category page loads`, async ({ page }) => {
        const catPage = new CategoryPage(page, category);
        await catPage.goto();
        await catPage.checkPageLoaded();
        await catPage.checkA11y();

        const toolCount = await catPage.checkToolsList();
        expect(toolCount).toBeGreaterThan(0);
        console.log(`✓ ${category} category displays ${toolCount} tools`);
      });
    }
  });

  test.describe("Error Handling", () => {
    test("404 page exists", async ({ page }) => {
      const response = await page.goto(
        "http://localhost:3000/nonexistent-page",
        {
          waitUntil: "domcontentloaded",
        },
      );
      expect(response?.status() || 0).toBeGreaterThanOrEqual(400);
      console.log("✓ 404 page handling works");
    });
  });
});
