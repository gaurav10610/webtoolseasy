import { expect, test } from "@playwright/test";

test.describe("ArchCost database services", () => {
  test("shows H3 services and can drop DynamoDB node", async ({ page }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(sidebar.getByText("DynamoDB", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("ElastiCache", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("DocumentDB", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("Neptune", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("Aurora Serverless v2", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Timestream", { exact: true }),
    ).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const dynamodbCard = sidebar.getByText("DynamoDB", { exact: true }).first();
    await dynamodbCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 920, y: 320 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page.locator(".react-flow__node").filter({ hasText: "DynamoDB" }).last(),
    ).toBeVisible();
  });
});
