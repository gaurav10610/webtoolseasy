import { test, expect } from "@playwright/test";

const TOOL_PATHS = [
  "/tools/jwt-decoder",
  "/tools/json-query",
  "/tools/regex-tester",
  "/tools/base64",
  "/tools/timestamp-converter",
  "/tools/url-decoder",
  "/tools/uuid",
  "/tools/color",
  "/tools/cron",
  "/tools/env-file-editor",
  "/tools/certificate-inspector",
];

const AUDIT_PATHS = [
  "/",
  "/studio",
  "/canvas",
  "/privacy",
  "/architectures",
  "/architectures/classic-3-tier-web",
  "/calculators",
  "/calculators/ec2",
  "/jwt/claims",
  "/jwt/claims/iss",
  "/regex/patterns",
  "/regex/patterns/email",
];

test.describe("SEO metadata", () => {
  test("tool pages expose unique title/description/canonical and JSON-LD", async ({
    page,
  }) => {
    const titles = new Set<string>();

    for (const path of TOOL_PATHS) {
      await page.goto(path);

      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .first()
        .getAttribute("content");
      const canonical = await page
        .locator('link[rel="canonical"]')
        .first()
        .getAttribute("href");

      expect(title.length).toBeGreaterThan(5);
      expect(description && description.length > 20).toBeTruthy();
      expect(canonical).toBeTruthy();

      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      expect(await jsonLdScripts.count()).toBeGreaterThanOrEqual(2);

      const jsonLdText = await jsonLdScripts.allTextContents();
      expect(jsonLdText.join("\n")).toContain("FAQPage");
      expect(jsonLdText.join("\n")).toContain("SoftwareApplication");

      expect(titles.has(title)).toBe(false);
      titles.add(title);
    }
  });

  test("core and programmatic pages expose title/description/canonical", async ({
    page,
  }) => {
    const titles = new Set<string>();

    for (const path of AUDIT_PATHS) {
      await page.goto(path);

      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .first()
        .getAttribute("content");
      const canonical = await page.evaluate(() => {
        return (
          document
            .querySelector('link[rel="canonical"]')
            ?.getAttribute("href") ?? null
        );
      });
      const expectedCanonical = `https://webtoolseasy.com${path}`.replace(
        /\/$/,
        "",
      );

      expect(title.length).toBeGreaterThan(5);
      expect(description && description.length > 20).toBeTruthy();
      expect(
        (canonical ?? "").replace(/\/$/, ""),
        `Canonical mismatch for ${path}`,
      ).toBe(expectedCanonical);

      expect(titles.has(title)).toBe(false);
      titles.add(title);
    }
  });
});
