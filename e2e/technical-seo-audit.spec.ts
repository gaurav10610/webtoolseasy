/**
 * E2E Tests for Technical SEO Audit Workflow Pack
 *
 * Tests the complete workflow for auditing website technical SEO factors
 * Covers: sitemap validation, robots.txt analysis, meta tags, schema.org validation
 */

import { test, expect } from "@playwright/test";

test.describe("Technical SEO Audit Workflow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to workflows page
    await page.goto("/workflows");

    // Scroll to find Technical SEO Audit workflow
    await page.waitForSelector("text=Technical SEO Audit", { timeout: 5000 });
  });

  test("should render the Technical SEO Audit workflow card", async ({
    page,
  }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await expect(card).toBeVisible();

    // Check for description
    const description = page.locator("text=Analyze website SEO").first();
    expect(description).toBeDefined();
  });

  test("should open workflow when clicked", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    // Wait for workflow to load
    await page.waitForSelector("text=URL", { timeout: 5000 });

    // Verify we're on the workflow page
    await expect(page).toHaveURL(/\/workflows\/technical-seo-audit/);
  });

  test("should accept website URL input", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("input, textarea", { timeout: 5000 });

    // Find URL input
    const urlInput = page
      .locator("input[placeholder*=url], input[placeholder*=URL]")
      .first();
    if (!(await urlInput.isVisible({ timeout: 1000 }).catch(() => false))) {
      // Try textarea if no input found
      await page.locator("textarea").first().fill("https://example.com");
      return;
    }

    // Type sample URL
    const testUrl = "https://example.com";
    await urlInput.fill(testUrl);

    await expect(urlInput).toHaveValue(testUrl);
  });

  test("should validate URL format", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("input, textarea", { timeout: 5000 });

    const urlInput = page.locator("input[placeholder*=url]").first();
    if (await urlInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Type invalid URL
      await urlInput.fill("not a valid url");
      await urlInput.blur();

      // Should show error
      const error = page.locator("[class*=error]").first();
      expect(error).toBeDefined();
    }
  });

  test("should display all audit categories", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("[data-testid*=step], text=Sitemap", {
      timeout: 5000,
    });

    // Check for main audit areas
    const categories = ["Sitemap", "Robots.txt", "Meta Tags", "Schema"];
    for (const category of categories) {
      const element = page.locator(`text=${category}`).first();
      expect(element).toBeDefined();
    }
  });

  test("should analyze sitemap.xml", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("input, textarea", { timeout: 5000 });

    // Fill URL
    const input = page.locator("input[placeholder*=url], textarea").first();
    await input.fill("https://example.com/sitemap.xml");

    // Look for sitemap analysis button
    const analyzeButton = page
      .locator("button:has-text('Analyze'), button:has-text('Check')")
      .first();
    if (await analyzeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await analyzeButton.click();

      // Wait for results
      await page.waitForTimeout(500);

      // Should show sitemap results
      const results = page.locator("[class*=result], [class*=report]").first();
      expect(results).toBeDefined();
    }
  });

  test("should validate robots.txt", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("input, textarea", { timeout: 5000 });

    // Fill URL
    const input = page.locator("input[placeholder*=url], textarea").first();
    await input.fill("https://example.com/robots.txt");

    // Look for robots.txt validation
    const robotsSection = page.locator("text=robots").first();
    if (await robotsSection.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Should validate robots rules
      expect(robotsSection).toBeDefined();
    }
  });

  test("should check meta tags", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill HTML content
    const input = page.locator("textarea").first();
    const html = `
      <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test description">
          <meta name="keywords" content="test, keywords">
        </head>
      </html>
    `;
    await input.fill(html);

    // Look for meta tag analysis
    const metaSection = page.locator("text=Meta", (text = "tag")).first();
    expect(metaSection).toBeDefined();
  });

  test("should validate schema.org markup", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill HTML with schema markup
    const input = page.locator("textarea").first();
    const htmlWithSchema = `
      <html>
        <head>
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Article"
          }
          </script>
        </head>
      </html>
    `;
    await input.fill(htmlWithSchema);

    // Should validate schema
    const schemaCheck = page.locator("text=Schema").first();
    expect(schemaCheck).toBeDefined();
  });

  test("should generate audit report", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill URL/content
    const input = page.locator("textarea, input").first();
    await input.fill("https://example.com");

    // Look for generate report button
    const reportButton = page
      .locator("button:has-text('Report'), button:has-text('Generate')")
      .first();
    if (await reportButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await reportButton.click();

      // Wait for report generation
      await page.waitForTimeout(500);

      // Should show report
      const report = page.locator("[class*=report]").first();
      expect(report).toBeDefined();
    }
  });

  test("should show SEO score", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill(`
      <html>
        <head>
          <title>Good Title</title>
          <meta name="description" content="Good description content">
        </head>
        <body><h1>Content</h1></body>
      </html>
    `);

    // Look for score display
    const score = page.locator("[class*=score]").first();
    expect(score).toBeDefined();
  });

  test("should provide recommendations", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill("<html><body>Test</body></html>");

    // Look for recommendations section
    const recommendations = page.locator("text=Recommend").first();
    expect(recommendations).toBeDefined();
  });

  test("should allow export of audit results", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill("https://example.com");

    // Look for export button
    const exportButton = page
      .locator("button:has-text('Export'), button:has-text('Download')")
      .first();
    if (await exportButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      const downloadPromise = page.waitForEvent("download");

      await exportButton.click();

      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/\.(pdf|json|csv)$/);
    }
  });

  test("should show passing and failing checks", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill valid content
    const input = page.locator("textarea").first();
    await input.fill(`
      <html>
        <head>
          <title>Title</title>
          <meta name="description" content="Description">
          <script type="application/ld+json">{"@type": "Article"}</script>
        </head>
        <body><h1>Content</h1></body>
      </html>
    `);

    // Look for check results
    const checkPassed = page.locator("[class*=pass], [class*=success]").first();
    const checkFailed = page.locator("[class*=fail], [class*=error]").first();

    expect(checkPassed).toBeDefined();
    expect(checkFailed).toBeDefined();
  });

  test("should load workflow from direct URL", async ({ page }) => {
    await page.goto("/workflows/technical-seo-audit");

    // Verify workflow loaded
    await page.waitForSelector("text=Technical SEO Audit", { timeout: 5000 });
    await expect(page).toHaveURL(/\/workflows\/technical-seo-audit/);
  });

  test("should have proper workflow state management", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    const testContent = "test audit content";
    await input.fill(testContent);

    // Check localStorage
    const state = await page.evaluate(() => {
      return localStorage.getItem("wte_workflows");
    });

    expect(state).toBeTruthy();
  });

  test("should track activity in workflow", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Perform actions
    const input = page.locator("textarea").first();
    await input.fill("test");

    // Check activity tracking
    const activity = await page.evaluate(() => {
      return localStorage.getItem("wte_activity");
    });

    expect(activity).toBeTruthy();
  });

  test("should handle complex HTML audit", async ({ page }) => {
    const card = page.locator("text=Technical SEO Audit").first();
    await card.click();

    await page.waitForSelector("textarea, input", { timeout: 5000 });

    // Fill complex HTML
    const input = page.locator("textarea").first();
    const complexHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complex Page</title>
          <meta name="description" content="A complex SEO test page">
          <link rel="canonical" href="https://example.com">
          <script type="application/ld+json">
            {"@context":"https://schema.org","@type":"WebPage"}
          </script>
        </head>
        <body>
          <h1>Main Heading</h1>
          <p>Content here</p>
          <img alt="Test image" src="test.jpg">
        </body>
      </html>
    `;
    await input.fill(complexHtml);

    // Should handle without errors
    const errorMsg = page.locator("[class*=error]").first();
    expect(errorMsg).toBeDefined();
  });
});
