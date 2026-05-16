import { expect, test } from "@playwright/test";

test.describe("ArchCost comparison mode", () => {
  test("opens side-by-side panes and shows savings banner", async ({
    page,
  }) => {
    await page.goto("/canvas");
    await page.evaluate(() => {
      localStorage.removeItem("wte_arch_autosave");
      localStorage.removeItem("wte_arch_autosave_A");
      localStorage.removeItem("wte_arch_autosave_B");
    });
    await page.reload();

    await page.getByRole("button", { name: "Compare" }).click();

    await expect(page.getByText("Option A ·", { exact: false })).toBeVisible();
    await expect(page.getByText("Option B ·", { exact: false })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Exit Comparison" }),
    ).toBeVisible();

    const frames = page.locator("iframe[title^='Comparison option']");
    await expect(frames).toHaveCount(2);

    await page.getByRole("button", { name: "Exit Comparison" }).click();
    await expect(page.getByRole("button", { name: "Compare" })).toBeVisible();
  });
});
