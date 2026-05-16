import { test, expect } from "@playwright/test";

test.describe("Core Pages E2E Tests", () => {
  async function expectNoConsoleErrors(
    page: import("@playwright/test").Page,
    path: string,
  ) {
    const errors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("networkidle");
    expect(errors, `Expected no console/page errors on ${path}`).toEqual([]);
  }

  test("Home page loads successfully", async ({ page }) => {
    await expectNoConsoleErrors(page, "/");

    // Check for core navigation links
    await expect(
      page.getByRole("link", { name: /DevLens/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /ArchCost/i }).first(),
    ).toBeVisible();
  });

  test("DevLens Studio loads successfully", async ({ page }) => {
    await expectNoConsoleErrors(page, "/studio");

    // Verify DevLens header/panel is visible
    await expect(page.getByText("DevLens", { exact: true })).toBeVisible();
    await expect(page.getByText("Smart Paste Workbench")).toBeVisible();

    // Verify a panel input exists
    await expect(page.locator("textarea").first()).toBeVisible();
  });

  test("ArchCost Canvas loads successfully", async ({ page }) => {
    await expectNoConsoleErrors(page, "/canvas");

    // Verify ArchCost header
    await expect(page.getByText("ArchCost", { exact: true })).toBeVisible();

    // Verify AWS Resources sidebar is visible
    await expect(page.getByText("AWS RESOURCES")).toBeVisible();

    // Verify toolbar elements
    await expect(
      page.getByRole("button", { name: /clear canvas/i }),
    ).toBeVisible();
  });

  test("Tool SEO landing page loads successfully", async ({ page }) => {
    await expectNoConsoleErrors(page, "/tools/jwt-decoder");

    // Verify tool metadata is present
    await expect(page.getByText("JWT Decoder", { exact: true })).toBeVisible();
    await expect(page.locator("textarea").first()).toHaveAttribute(
      "placeholder",
      /Paste a JWT token here/i,
    );
  });

  test("404 page exists", async ({ page }) => {
    const response = await page.goto("/nonexistent-page", {
      waitUntil: "domcontentloaded",
    });
    // Check for Next.js default 404 behavior or our custom 404
    expect(response?.status() || 0).toBeGreaterThanOrEqual(400);
  });
});
