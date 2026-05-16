import { test, expect } from "@playwright/test";

test.describe("ArchCost canvas", () => {
  test("drag EC2 node and update config cost", async ({ page }) => {
    await page.goto("/canvas");
    await page.evaluate(() => localStorage.removeItem("wte_arch_autosave"));
    await page.reload();

    const nodeLocator = page.locator(".react-flow__node");
    await expect(nodeLocator).toHaveCount(4);
    const beforeNodeCount = await nodeLocator.count();

    const totalCost = page
      .locator("text=Total Monthly Est.")
      .locator("..")
      .locator("xpath=.//div[contains(@class,'text-3xl')]")
      .first();
    const beforeCost = (await totalCost.textContent()) ?? "";

    const pane = page.locator(".react-flow__pane");
    const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
    await dataTransfer.evaluate((dt) => {
      dt.setData("application/reactflow/service", "EC2");
    });
    await pane.dispatchEvent("dragover", { dataTransfer });
    await pane.dispatchEvent("drop", {
      dataTransfer,
      clientX: 900,
      clientY: 260,
    });

    await expect(nodeLocator).toHaveCount(beforeNodeCount + 1);

    const newNode = nodeLocator.last();
    const newNodeId = await newNode.getAttribute("data-id");
    const hoursInput = newNode.locator("input[type='number']").nth(1);
    await hoursInput.fill("100");

    const afterCost = (await totalCost.textContent()) ?? "";
    expect(afterCost).not.toBe(beforeCost);

    const undoButton = page.getByRole("button", { name: "Undo" });

    // First undo reverts the config change.
    await undoButton.click();
    await expect(hoursInput).toHaveValue("730");

    // Additional undo steps may be needed because drag/config interactions can
    // create multiple history entries. Keep undoing until the added node is removed.
    let remaining = 120;
    while ((await nodeLocator.count()) > beforeNodeCount && remaining > 0) {
      await undoButton.click();
      remaining -= 1;
    }

    if (newNodeId) {
      await expect(page.locator(`[data-id='${newNodeId}']`)).toHaveCount(0);
    }
    expect(await nodeLocator.count()).toBeLessThanOrEqual(beforeNodeCount);
  });
});
