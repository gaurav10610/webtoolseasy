import { expect, test } from "@playwright/test";

test.describe("ArchCost messaging services", () => {
  test("shows H6 services and can drop SQS node", async ({ page }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(sidebar.getByText("SQS", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("SNS", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("EventBridge", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Kinesis Data Streams", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Kinesis Firehose", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("MSK (Managed Kafka)", { exact: true }),
    ).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const sqsCard = sidebar.getByText("SQS", { exact: true });
    await sqsCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 960, y: 300 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page.locator(".react-flow__node").filter({ hasText: "SQS" }).last(),
    ).toBeVisible();
  });
});
