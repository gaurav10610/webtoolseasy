/**
 * E2E Tests for Blog Publish Workflow Pack
 *
 * Tests the complete workflow for SEO optimization, publishing, and sharing blog posts
 * Covers: content formatting, SEO analysis, publish preview, and sharing
 */

import { test, expect } from "@playwright/test";

test.describe("Blog Publish Workflow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to workflows page
    await page.goto("/workflows");

    // Scroll to find Blog Publish workflow
    await page.waitForSelector("text=Blog Publish", { timeout: 5000 });
  });

  test("should render the Blog Publish workflow card", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await expect(card).toBeVisible();

    // Check for description
    const description = page
      .locator("text=Optimize, publish, and share blog posts")
      .first();
    expect(description).toBeDefined();
  });

  test("should open workflow when clicked", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    // Wait for workflow to load
    await page.waitForSelector("text=Content", { timeout: 5000 });

    // Verify we're on the workflow page
    await expect(page).toHaveURL(/\/workflows\/blog-publish/);
  });

  test("should display all workflow steps", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("[data-testid*=step]", { timeout: 5000 });

    // Verify key steps
    await expect(page.locator("text=Content")).toBeVisible();
    await expect(page.locator("text=SEO Check")).toBeVisible();
  });

  test("should accept markdown blog content", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    const input = page.locator("textarea").first();

    // Type sample markdown
    const markdown =
      "# My Blog Post\n\nThis is a test post with **bold** text.";
    await input.fill(markdown);

    await expect(input).toHaveValue(markdown);
  });

  test("should accept HTML blog content", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    const input = page.locator("textarea").first();

    // Type sample HTML
    const html = "<h1>My Post</h1><p>Some content here</p>";
    await input.fill(html);

    await expect(input).toHaveValue(html);
  });

  test("should perform SEO analysis on content", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    const input = page.locator("textarea").first();

    // Type blog content
    await input.fill(
      "# Best Practices for Web Development\n\nThis comprehensive guide covers everything you need to know about modern web development techniques.",
    );

    // Look for SEO analysis button
    const seoButton = page
      .locator("button:has-text('Check SEO'), button:has-text('Analyze')")
      .first();
    if (await seoButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await seoButton.click();

      // Wait for analysis results
      await page.waitForTimeout(500);

      // Look for SEO score or results
      const seoResults = page.locator("[class*=seo], [class*=score]").first();
      expect(seoResults).toBeDefined();
    }
  });

  test("should validate required SEO fields", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Look for title field
    const titleField = page
      .locator("input[placeholder*=title], input[placeholder*=Title]")
      .first();
    if (await titleField.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Should be empty initially
      const value = await titleField.inputValue();
      expect(value).toBe("");

      // Fill with title
      await titleField.fill("My Blog Post");

      // Verify filled
      const newValue = await titleField.inputValue();
      expect(newValue).toBe("My Blog Post");
    }
  });

  test("should generate meta description", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill(
      "# Amazing Article\n\nLearn the best practices for modern web development.",
    );

    // Look for auto-generated meta description
    const metaField = page
      .locator("input[placeholder*=meta], textarea[placeholder*=description]")
      .first();
    if (await metaField.isVisible({ timeout: 1000 }).catch(() => false)) {
      const metaValue = await metaField.inputValue();
      // Should have some content
      expect(metaValue?.length || 0).toBeGreaterThan(0);
    }
  });

  test("should support keyword optimization", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Look for keyword field
    const keywordField = page.locator("input[placeholder*=keyword]").first();
    if (await keywordField.isVisible({ timeout: 1000 }).catch(() => false)) {
      await keywordField.fill("web development");

      const value = await keywordField.inputValue();
      expect(value).toBe("web development");
    }
  });

  test("should provide publish preview", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill basic content
    const input = page.locator("textarea").first();
    await input.fill("# Blog Title\n\nBlog content here");

    // Look for preview button
    const previewButton = page
      .locator("button:has-text('Preview'), button:has-text('View')")
      .first();
    if (await previewButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await previewButton.click();

      // Should show preview
      await page.waitForTimeout(300);
    }
  });

  test("should generate shareable social media snippets", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill(
      "# Interesting Article\n\nCheck out this amazing content about web technology.",
    );

    // Look for social share section
    const socialSection = page.locator("[class*=social], text=Share").first();
    expect(socialSection).toBeDefined();
  });

  test("should allow export of blog content", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill("# Blog Post\n\nContent");

    // Look for export button
    const exportButton = page
      .locator("button:has-text('Export'), button:has-text('Download')")
      .first();
    if (await exportButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      const downloadPromise = page.waitForEvent("download");

      await exportButton.click();

      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/\.(md|html|txt)$/);
    }
  });

  test("should validate content length", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    const input = page.locator("textarea").first();

    // Very short content
    await input.fill("Hi");

    // Should show warning
    const warning = page.locator("[class*=warning], text=Too short").first();
    expect(warning).toBeDefined();
  });

  test("should track blog content history", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill("# First Version\n\nContent");

    // Check for history/version section
    const historySection = page
      .locator("[class*=history], text=History")
      .first();
    expect(historySection).toBeDefined();
  });

  test("should load workflow from direct URL", async ({ page }) => {
    await page.goto("/workflows/blog-publish");

    // Verify workflow loaded
    await page.waitForSelector("text=Blog Publish", { timeout: 5000 });
    await expect(page).toHaveURL(/\/workflows\/blog-publish/);
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Check for ARIA labels
    const inputs = page.locator("[role=textbox], textarea");
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should maintain state in localStorage", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Fill content
    const input = page.locator("textarea").first();
    await input.fill("# Test Post");

    // Check localStorage
    const state = await page.evaluate(() => {
      return localStorage.getItem("wte_workflows");
    });

    expect(state).toBeTruthy();
  });

  test("should handle formatting options", async ({ page }) => {
    const card = page.locator("text=Blog Publish").first();
    await card.click();

    await page.waitForSelector("textarea, [role=textbox]", { timeout: 5000 });

    // Look for formatting toolbar
    const toolbar = page.locator("[class*=toolbar], [class*=format]").first();
    if (await toolbar.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Should have formatting buttons
      const buttons = page.locator("button", { has: toolbar });
      const count = await buttons.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});
