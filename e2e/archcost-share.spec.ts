import { test, expect } from "@playwright/test";

test.describe("ArchCost share", () => {
  test("copies share URL and loads read-only shared canvas", async ({
    context,
    page,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await page.goto("/canvas");

    const ec2Card = page.getByText("EC2 Instance", { exact: true }).first();
    const pane = page.locator(".react-flow__pane");
    await ec2Card.dragTo(pane, {
      targetPosition: { x: 860, y: 260 },
    });

    await page.getByRole("button", { name: /share/i }).click();
    await expect(page.getByRole("button", { name: /copied/i })).toBeVisible();

    const sharedUrl = await page.evaluate(async () =>
      navigator.clipboard.readText(),
    );
    expect(sharedUrl).toContain("/canvas");

    await page.goto(sharedUrl);
    await expect(
      page.getByText("Viewing shared architecture (Read-only)"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Fork to Edit" }),
    ).toBeVisible();
  });
});
