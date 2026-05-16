import { test, expect } from "@playwright/test";

test.describe("DevLens smart paste", () => {
  test("detects JWT, JSON, and unknown input", async ({ page }) => {
    await page.goto("/studio");

    const input = page.locator("textarea").first();

    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpc3MiOiJ3dGUiLCJleHAiOjE5MDAwMDAwMDB9.signature";
    await input.fill(jwt);
    await expect(page.getByText("JWT", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Header", { exact: true })).toBeVisible();
    await expect(page.getByText("Payload", { exact: true })).toBeVisible();

    await input.fill('{"name":"webtoolseasy","items":[1,2,3]}');
    await expect(page.getByText("JSON", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Schema", { exact: true })).toBeVisible();

    await input.fill("this is plain text and should remain unknown");
    await expect(
      page.getByText("UNKNOWN", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("Unknown input", { exact: true }),
    ).toBeVisible();
  });
});
