import { test, expect } from "@playwright/test";

test.describe("LocalStudio In-Browser Media Suite", () => {
  test("renders initial UI with Video Cutter and Audio Extractor tabs", async ({ page }) => {
    await page.goto("/studio");

    // Check title and badges
    await expect(page.locator("h1")).toContainText("LocalStudio");
    await expect(page.getByText("100% In-Browser Media Engine")).toBeVisible();
    await expect(page.getByText("Zero Cloud Uploads")).toBeVisible();

    // Check tabs
    const videoCutterTab = page.getByRole("button", { name: /Lossless Video Cutter/i });
    const audioExtractorTab = page.getByRole("button", { name: /Audio Track Extractor/i });
    await expect(videoCutterTab).toBeVisible();
    await expect(audioExtractorTab).toBeVisible();

    // Verify upload zone is active
    await expect(page.getByText("Drop your video or audio file here")).toBeVisible();

    // Verify Feature Highlights at the bottom
    await expect(page.getByText("Instant 0.1s Trimming")).toBeVisible();
    await expect(page.getByText("100% Client-Side Privacy")).toBeVisible();
    await expect(page.getByText("Zero Watermarks, 100% Free")).toBeVisible();

    // Take screenshot of landing state
    await page.screenshot({ path: "test-results/localstudio-landing.png" });
  });

  test("allows switching tabs between video cutter and audio extractor", async ({ page }) => {
    await page.goto("/studio");

    const audioExtractorTab = page.getByRole("button", { name: /Audio Track Extractor/i });
    await audioExtractorTab.click();

    // The tab should now be active
    await expect(audioExtractorTab).toHaveClass(/border-violet-600/);

    const videoCutterTab = page.getByRole("button", { name: /Lossless Video Cutter/i });
    await videoCutterTab.click();
    await expect(videoCutterTab).toHaveClass(/border-violet-600/);
  });
});
