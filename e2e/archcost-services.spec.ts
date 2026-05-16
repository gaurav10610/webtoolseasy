import { expect, test } from "@playwright/test";

test.describe("ArchCost compute services", () => {
  test("shows H2 compute services and renders Elastic Beanstalk informational badge", async ({
    page,
  }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(
      sidebar.getByText("ECS Fargate", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("EKS Cluster", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Lightsail Instance", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Elastic Beanstalk", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("AWS Batch", { exact: true })).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const beanstalkCard = sidebar
      .getByText("Elastic Beanstalk", { exact: true })
      .first();
    await beanstalkCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 980, y: 320 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );

    const beanstalkNode = page
      .locator(".react-flow__node")
      .filter({ hasText: "Elastic Beanstalk" })
      .last();

    await expect(beanstalkNode.getByText("No additional charge")).toBeVisible();
  });
});
