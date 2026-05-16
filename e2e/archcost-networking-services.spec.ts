import { expect, test } from "@playwright/test";

test.describe("ArchCost networking services", () => {
  test("shows H5 services and can drop NLB node", async ({ page }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(
      sidebar.getByText("Network Load Balancer", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("API Gateway (REST)", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("API Gateway (HTTP)", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("Route 53", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("NAT Gateway", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("VPC PrivateLink", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Global Accelerator", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Data Transfer", { exact: true }),
    ).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const nlbCard = sidebar.getByText("Network Load Balancer", { exact: true });
    await nlbCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 960, y: 320 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page.locator(".react-flow__node").filter({ hasText: "NLB" }).last(),
    ).toBeVisible();
  });
});
