import { test, expect } from "@playwright/test";

test.describe("ArchCost export", () => {
  test("shows export menu and supports CSV download", async ({ page }) => {
    await page.goto("/canvas");

    await page.getByRole("button", { name: "Export" }).click();
    await expect(page.getByText("Export Architecture CSV")).toBeVisible();
    await expect(page.getByText("Export PNG")).toBeVisible();
    await expect(page.getByText("Export PDF")).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.getByText("Export Architecture CSV").click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.csv$/i);
  });
});
