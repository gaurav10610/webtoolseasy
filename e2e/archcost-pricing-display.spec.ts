import { expect, test } from "@playwright/test";

function parseCurrency(input: string): number {
  const normalized = input.replace(/[^0-9.-]/g, "");
  return Number(normalized || 0);
}

test.describe("ArchCost pricing display enhancements", () => {
  test("shows annual estimate, supports region toggle, and renders node pricing badges", async ({
    page,
  }) => {
    await page.goto("/canvas");
    await page.evaluate(() => localStorage.removeItem("wte_arch_autosave"));
    await page.reload();

    await expect(page.getByText("Annual:")).toBeVisible();
    await expect(
      page.getByText("Cost Breakdown", { exact: true }),
    ).toBeVisible();

    const totalCost = page
      .locator("text=Total Monthly Est.")
      .locator("..")
      .locator("xpath=.//div[contains(@class,'text-3xl')]")
      .first();

    const before = parseCurrency((await totalCost.textContent()) || "0");
    await page.locator("aside select").first().selectOption("us-west-2");
    await expect
      .poll(async () => parseCurrency((await totalCost.textContent()) || "0"))
      .not.toBe(before);

    const ec2Node = page
      .locator(".react-flow__node")
      .filter({ hasText: "EC2" })
      .first();
    await expect(ec2Node.getByText("Free Tier Eligible")).toBeVisible();

    const pricingOptionSelect = ec2Node.locator("select").last();
    await pricingOptionSelect.selectOption("spot");
    await expect(ec2Node.getByText("Spot pricing:")).toBeVisible();

    await pricingOptionSelect.selectOption("reserved-1yr");
    await expect(ec2Node.getByText("Reserved 1yr:")).toBeVisible();
  });
});
