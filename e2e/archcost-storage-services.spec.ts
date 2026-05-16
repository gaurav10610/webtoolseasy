import { expect, test } from "@playwright/test";

test.describe("ArchCost storage services", () => {
  test("shows H4 services and can drop EFS node", async ({ page }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(sidebar.getByText("EFS", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("EBS Volume", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("S3 Glacier Instant", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("FSx (Windows / Lustre)", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Storage Gateway", { exact: true }),
    ).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const efsCard = sidebar.getByText("EFS", { exact: true }).first();
    await efsCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 950, y: 320 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page.locator(".react-flow__node").filter({ hasText: "EFS" }).last(),
    ).toBeVisible();
  });
});
