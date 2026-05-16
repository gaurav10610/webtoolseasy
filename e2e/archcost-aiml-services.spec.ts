import { expect, test } from "@playwright/test";

test.describe("ArchCost AI/ML services", () => {
  test("shows H7 services and can drop Bedrock node", async ({ page }) => {
    await page.goto("/canvas");

    const sidebar = page.locator("aside").first();
    await expect(sidebar.getByText("Bedrock", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("SageMaker Endpoints", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("Textract", { exact: true })).toBeVisible();
    await expect(
      sidebar.getByText("Rekognition", { exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByText("Transcribe", { exact: true }),
    ).toBeVisible();
    await expect(sidebar.getByText("Polly", { exact: true })).toBeVisible();

    const beforeCount = await page.locator(".react-flow__node").count();
    const bedrockCard = sidebar.getByText("Bedrock", { exact: true });
    await bedrockCard.dragTo(page.locator(".react-flow__pane"), {
      targetPosition: { x: 980, y: 300 },
    });

    await expect(page.locator(".react-flow__node")).toHaveCount(
      beforeCount + 1,
    );
    await expect(
      page.locator(".react-flow__node").filter({ hasText: "Bedrock" }).last(),
    ).toBeVisible();
  });
});
