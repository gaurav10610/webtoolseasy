import { expect, test } from "@playwright/test";

test.describe("ArchCost dev tools and observability services", () => {
  test("shows H8 services and can drop CloudWatch Metrics node", async ({
    page,
  }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(
      sidebar.getByText("CloudWatch Metrics", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("CloudWatch Logs", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("CloudWatch Alarms", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Secrets Manager", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("KMS", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("CodeBuild", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("CodePipeline", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("X-Ray", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("WAF", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("Shield Standard", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Shield Advanced", { exact: true }),
    ).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const metricsCard = sidebar.getByText("CloudWatch Metrics", {
      exact: true,
    });
    await metricsCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 980, y: 320 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page
        .locator(".react-flow__node")
        .filter({ hasText: "CloudWatch Metrics" })
        .last(),
    ).toBeVisible();
  });
});
