import { expect, test } from "@playwright/test";

function parseCurrency(input: string): number {
  const normalized = input.replace(/[^0-9.-]/g, "");
  return Number(normalized || 0);
}

test.describe("ArchCost edge transfer costs", () => {
  test("configures edge transfer and updates total monthly estimate", async ({
    page,
  }) => {
    await page.goto("/canvas");
    await page.evaluate(() => localStorage.removeItem("wte_arch_autosave"));
    await page.reload();

    const totalCost = page
      .locator("text=Total Monthly Est.")
      .locator("..")
      .locator("xpath=.//div[contains(@class,'text-3xl')]")
      .first();

    await expect
      .poll(async () => parseCurrency((await totalCost.textContent()) || "0"))
      .toBeGreaterThan(0);

    const before = parseCurrency((await totalCost.textContent()) || "0");

    await page.evaluate(() => {
      const storageKey = "wte_arch_autosave";
      const payload = {
        nodes: [
          {
            id: "alb-1",
            type: "infraNode",
            position: { x: 400, y: 100 },
            data: {
              label: "Application Load Balancer",
              service: "ALB",
              region: "us-east-1",
              config: { hoursPerMonth: 730, lcuCount: 1 },
              costPerMonth: 22.26,
            },
          },
          {
            id: "ec2-1",
            type: "infraNode",
            position: { x: 300, y: 300 },
            data: {
              label: "Web Server 1",
              service: "EC2",
              region: "us-east-1",
              config: {
                instanceType: "t3.micro",
                count: 1,
                hoursPerMonth: 730,
              },
              costPerMonth: 7.59,
            },
          },
          {
            id: "ec2-2",
            type: "infraNode",
            position: { x: 500, y: 300 },
            data: {
              label: "Web Server 2",
              service: "EC2",
              region: "us-east-1",
              config: {
                instanceType: "t3.micro",
                count: 1,
                hoursPerMonth: 730,
              },
              costPerMonth: 7.59,
            },
          },
          {
            id: "rds-1",
            type: "infraNode",
            position: { x: 400, y: 500 },
            data: {
              label: "Primary Database",
              service: "RDS",
              region: "us-east-1",
              config: {
                instanceType: "db.t3.micro",
                storageGB: 20,
                multiAZ: true,
              },
              costPerMonth: 27.12,
            },
          },
        ],
        edges: [
          {
            id: "e1",
            source: "alb-1",
            target: "ec2-1",
            animated: true,
            data: {
              gbPerMonth: 1000,
              transferConfigured: true,
              crossRegion: true,
            },
          },
          { id: "e2", source: "alb-1", target: "ec2-2", animated: true },
          { id: "e3", source: "ec2-1", target: "rds-1" },
          { id: "e4", source: "ec2-2", target: "rds-1" },
        ],
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    });

    await page.reload();
    await expect
      .poll(async () => parseCurrency((await totalCost.textContent()) || "0"))
      .toBeGreaterThan(0);

    const after = parseCurrency((await totalCost.textContent()) || "0");
    expect(Number((after - before).toFixed(2))).toBe(20);
    await expect(page.getByText("$20.00/mo (1,000 GB)")).toBeVisible();
  });
});
