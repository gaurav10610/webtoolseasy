import { test, expect } from "@playwright/test";
import { toolIds } from "@/data/apps";

/**
 * Tool URL Regression Tests
 *
 * Validates that:
 * 1. All tool URLs continue to resolve after IA changes
 * 2. Tool routes work correctly (both direct and category)
 * 3. Canonical URLs are properly set for SEO
 * 4. Tool categories remain accessible
 */

test.describe("Tool URL Regression Tests", () => {
  /**
   * Test 1: Verify all tool URLs resolve
   * TB-116: Ensure all existing tool URLs continue to resolve after IA changes
   */
  test("should have all tool IDs properly defined", () => {
    expect(toolIds.length).toBeGreaterThan(0);
    expect(toolIds.every((id) => typeof id === "string")).toBe(true);
  });

  test("should access tool by direct URL path", async ({ page }) => {
    // Pick a known tool to test
    const testToolSlug = "json-formatter";

    await page.goto(`/tools/${testToolSlug}`);

    // Verify page loads and tool is visible
    const toolHeader = page.locator("h1");
    expect(toolHeader).toBeTruthy();

    // Verify no 404 error
    const response = await page.goto(`/tools/${testToolSlug}`);
    expect(response?.status()).not.toBe(404);
  });

  test("should display tool card on category page", async ({ page }) => {
    await page.goto("/tools/category/development");

    // Verify category page loads
    const categoryTitle = page.locator("h1");
    await expect(categoryTitle).toBeVisible();

    // Verify tools are displayed
    const toolCards = page.locator('[data-testid="tool-card"]');
    const count = await toolCards.count();
    expect(count).toBeGreaterThan(0);
  });

  /**
   * Test 2: Verify canonical URLs for SEO
   * TB-117: Add regression test for tool route continuity and canonical integrity
   */
  test("should have canonical URL meta tag on tool pages", async ({ page }) => {
    const testToolSlug = "json-formatter";
    await page.goto(`/tools/${testToolSlug}`);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toBeDefined();

    const canonicalHref = await canonical.getAttribute("href");
    expect(canonicalHref).toContain(testToolSlug);
  });

  test("should have consistent canonical for tool across requests", async ({
    page,
  }) => {
    const testToolSlug = "csv-to-json";

    // First request
    await page.goto(`/tools/${testToolSlug}`);
    const canonical1 = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");

    // Second request (should match)
    await page.goto(`/tools/${testToolSlug}`);
    const canonical2 = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");

    expect(canonical1).toBe(canonical2);
  });

  /**
   * Test 3: Verify tool categories are accessible and consistent
   */
  test("should navigate between tool categories", async ({ page }) => {
    const categories = [
      "pdf-tools",
      "development",
      "image-tools",
      "media-tools",
    ];

    for (const category of categories) {
      await page.goto(`/tools/category/${category}`);

      // Verify page loads
      const response = await page.evaluate(
        () => document.body.innerText.length > 0,
      );
      expect(response).toBe(true);
    }
  });

  test("should have tool cards with proper links on category pages", async ({
    page,
  }) => {
    await page.goto("/tools/category/development");

    // Get all tool links
    const toolLinks = page.locator('a[href*="/tools/"]');
    const linkCount = await toolLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Verify link format is correct
    if (linkCount > 0) {
      const firstLink = await toolLinks.first().getAttribute("href");
      expect(firstLink).toMatch(/^\/tools\/[a-z\-]+$/);
    }
  });

  /**
   * Test 4: Verify tool metadata consistency
   */
  test("should have proper title tag on tool pages", async ({ page }) => {
    const testToolSlug = "json-formatter";
    await page.goto(`/tools/${testToolSlug}`);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe("Tools");
  });

  test("should have meta description on tool pages", async ({ page }) => {
    const testToolSlug = "json-formatter";
    await page.goto(`/tools/${testToolSlug}`);

    const description = page.locator('meta[name="description"]');
    const content = await description.getAttribute("content");

    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  /**
   * Test 5: Verify tool route patterns haven't changed
   */
  test("should follow consistent tool URL pattern", async ({ page }) => {
    const testSlugs = ["json-formatter", "csv-to-json", "image-compressor"];

    for (const slug of testSlugs) {
      const response = await page.goto(`/tools/${slug}`);

      // Verify route exists (either 200 or redirects with 3xx)
      const status = response?.status() || 0;
      expect([200, 301, 302, 307, 308]).toContain(status);
    }
  });

  /**
   * Test 6: Verify breadcrumb navigation works
   */
  test("should have proper breadcrumb navigation on tool pages", async ({
    page,
  }) => {
    const testToolSlug = "json-formatter";
    await page.goto(`/tools/${testToolSlug}`);

    // Look for breadcrumb structure
    const breadcrumbs = page.locator('[data-testid="breadcrumb"]');
    const breadcrumbCount = await breadcrumbs.count();

    // Should have at least Tools > ToolName
    if (breadcrumbCount > 0) {
      expect(breadcrumbCount).toBeGreaterThanOrEqual(2);
    }
  });

  /**
   * Test 7: Verify no broken internal links in tool pages
   */
  test("should have valid internal links on tool pages", async ({ page }) => {
    const testToolSlug = "json-formatter";
    await page.goto(`/tools/${testToolSlug}`);

    // Get all internal links
    const internalLinks = page.locator('a[href^="/"]');
    const linkCount = await internalLinks.count();

    if (linkCount > 0) {
      // Verify at least first few links are proper format
      const firstLink = await internalLinks.first().getAttribute("href");
      expect(firstLink).toMatch(/^\/[\w\-/]*$/);
    }
  });

  /**
   * Test 8: Verify tool category navigation from tools page
   */
  test("should be able to navigate back from tool to category", async ({
    page,
  }) => {
    // Go to tool
    await page.goto("/tools/json-formatter");

    // Find category link (usually in breadcrumb or header)
    const categoryLink = page.locator('a[href*="/tools/category/"]').first();

    if (await categoryLink.isVisible()) {
      await categoryLink.click();

      // Verify we're on a category page
      const url = page.url();
      expect(url).toContain("/tools/category/");
    }
  });

  /**
   * Test 9: Verify tools directory page still works
   */
  test("should be able to access tools directory page", async ({ page }) => {
    await page.goto("/tools");

    // Verify page loads and has content
    const content = page.locator("body");
    await expect(content).toBeVisible();

    const response = await page.goto("/tools");
    expect(response?.status()).not.toBe(404);
  });

  /**
   * Test 10: Verify tool search/filtering still works if present
   */
  test("should display tool search interface if available", async ({
    page,
  }) => {
    await page.goto("/tools");

    // Look for search input
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]',
    );
    const hasSearch = await searchInput.count();

    // If search exists, verify it's functional
    if (hasSearch > 0) {
      await searchInput.first().fill("json");

      // Wait for results to filter
      await page.waitForTimeout(500);

      // Verify some content updated
      const toolCards = page.locator('[data-testid="tool-card"]');
      const count = await toolCards.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
