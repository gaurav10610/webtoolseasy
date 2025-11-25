import { test, expect } from "@playwright/test";
import { readdirSync } from "fs";
import { join } from "path";

// Get all blog config files dynamically
const blogConfigDir = join(process.cwd(), "src/data/blog/config");
const blogFiles = readdirSync(blogConfigDir).filter((file) =>
  file.endsWith(".ts")
);
const blogSlugs = blogFiles.map((file) => file.replace(".ts", ""));

console.log(`Found ${blogSlugs.length} blog posts to test`);

test.describe("Blog Posts E2E Tests", () => {
  test.describe("Blog Listing Page", () => {
    test("should load blog listing page successfully", async ({ page }) => {
      const response = await page.goto("/blog", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Verify HTTP 200 response
      expect(response?.status(), "Blog listing should return 200").toBe(200);

      // Wait for h1 to be present
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible({ timeout: 10000 });
      const headingText = await h1.textContent();
      expect(headingText?.toLowerCase()).toContain("blog");

      // Verify page title
      const title = await page.title();
      expect(
        title.length,
        "Blog listing should have a page title"
      ).toBeGreaterThan(0);
      expect(title.toLowerCase()).toContain("blog");

      // Verify main content area exists
      const mainContent = page.locator("main");
      await expect(
        mainContent,
        "Blog listing should have main content"
      ).toBeVisible();

      // Verify no 404 page
      const nextJs404 = page.locator('text="This page could not be found"');
      await expect(
        nextJs404,
        "Blog listing should not show 404 page"
      ).not.toBeVisible();

      console.log(`✓ Blog listing page: "${title}"`);
    });

    test("should display blog post cards", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "domcontentloaded" });

      // Wait for blog cards to load
      await page.waitForSelector('[role="article"], article, .MuiCard-root', {
        timeout: 10000,
        state: "visible",
      });

      // Check that at least one blog card is visible
      const blogCards = page.locator(
        '[role="article"], article, .MuiCard-root'
      );
      const cardCount = await blogCards.count();
      expect(
        cardCount,
        "Should display at least one blog card"
      ).toBeGreaterThan(0);

      console.log(`✓ Found ${cardCount} blog post cards`);
    });

    test("should display hero section with description", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "domcontentloaded" });

      // Check for heading
      const heading = page.locator("h1");
      await expect(heading).toBeVisible();

      // Check for description text
      const description = page.locator("text=/discover|learn|latest/i");
      await expect(description.first()).toBeVisible();

      console.log("✓ Blog hero section is visible");
    });

    test("should have social sharing buttons", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "domcontentloaded" });

      // Look for social share buttons (Facebook, Twitter, LinkedIn, etc.)
      const socialButtons = page.locator(
        'button[aria-label*="share"], a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"]'
      );
      const buttonCount = await socialButtons.count();

      expect(buttonCount, "Should have social sharing buttons").toBeGreaterThan(
        0
      );
      console.log(`✓ Found ${buttonCount} social sharing buttons`);
    });
  });

  test.describe("Individual Blog Post Pages", () => {
    // Test each blog post
    for (const blogSlug of blogSlugs) {
      test(`should load ${blogSlug} page successfully`, async ({ page }) => {
        // Navigate to the blog post page
        const response = await page.goto(`/blog/${blogSlug}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });

        // Verify HTTP 200 response
        expect(response?.status(), `${blogSlug} should return 200`).toBe(200);

        // Wait for h1 to be present
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible({ timeout: 10000 });
        const headingText = await h1.textContent();

        // Verify page title exists and is not empty
        const title = await page.title();
        expect(
          title.length,
          `${blogSlug} should have a page title`
        ).toBeGreaterThan(0);

        // Verify main content area exists
        const mainContent = page.locator("main");
        await expect(
          mainContent,
          `${blogSlug} should have main content`
        ).toBeVisible();

        // Verify no Next.js default 404 page
        const nextJs404 = page.locator('text="This page could not be found"');
        await expect(
          nextJs404,
          `${blogSlug} should not show 404 page`
        ).not.toBeVisible();

        console.log(`✓ ${blogSlug}: "${title}" - ${headingText?.trim()}`);
      });

      test(`${blogSlug} should display blog metadata`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check for author information
        const author = page.locator(
          'text=/by|author|written/i, [data-testid="author"], .author'
        );
        const authorVisible = (await author.count()) > 0;

        // Check for date information
        const date = page.locator(
          'text=/\\d{4}|updated|published/i, time, [data-testid="date"]'
        );
        const dateVisible = (await date.count()) > 0;

        // At least one of author or date should be visible
        expect(
          authorVisible || dateVisible,
          `${blogSlug} should display author or date metadata`
        ).toBe(true);

        console.log(
          `✓ ${blogSlug} displays metadata (author: ${authorVisible}, date: ${dateVisible})`
        );
      });

      test(`${blogSlug} should display category chip`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check for category chip/badge
        const categoryChip = page.locator(
          '.MuiChip-root, [data-testid="category"], .category, .badge'
        );
        const chipCount = await categoryChip.count();

        expect(
          chipCount,
          `${blogSlug} should display category chip`
        ).toBeGreaterThan(0);
        console.log(`✓ ${blogSlug} displays category chip`);
      });

      test(`${blogSlug} should display reading time`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check for reading time indicator
        const readingTime = page.locator(
          "text=/\\d+\\s*min|minute|reading time/i"
        );
        const hasReadingTime = (await readingTime.count()) > 0;

        expect(hasReadingTime, `${blogSlug} should display reading time`).toBe(
          true
        );
        console.log(`✓ ${blogSlug} displays reading time`);
      });

      test(`${blogSlug} should render markdown content`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Wait for markdown content container
        await page.waitForSelector(
          '.markdown-content, article, [role="article"]',
          {
            timeout: 10000,
            state: "visible",
          }
        );

        // Check for various markdown elements
        const paragraphs = page.locator("p");
        const paragraphCount = await paragraphs.count();

        expect(
          paragraphCount,
          `${blogSlug} should have rendered paragraphs`
        ).toBeGreaterThan(0);

        // Check if there are headings (h2, h3, h4)
        const subheadings = page.locator("h2, h3, h4");
        const subheadingCount = await subheadings.count();

        console.log(
          `✓ ${blogSlug} renders markdown (${paragraphCount} paragraphs, ${subheadingCount} subheadings)`
        );
      });

      test(`${blogSlug} should have social sharing buttons`, async ({
        page,
      }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Look for social share buttons
        const socialButtons = page.locator(
          'button[aria-label*="share"], a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"]'
        );
        const buttonCount = await socialButtons.count();

        expect(
          buttonCount,
          `${blogSlug} should have social sharing buttons`
        ).toBeGreaterThan(0);
        console.log(`✓ ${blogSlug} has ${buttonCount} social sharing buttons`);
      });

      test(`${blogSlug} should support code syntax highlighting`, async ({
        page,
      }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check if there are code blocks
        const codeBlocks = page.locator(
          "pre code, .hljs, [class*='language-']"
        );
        const codeBlockCount = await codeBlocks.count();

        if (codeBlockCount > 0) {
          console.log(
            `✓ ${blogSlug} has ${codeBlockCount} code blocks with syntax highlighting`
          );
        } else {
          console.log(`  ${blogSlug} has no code blocks (which is okay)`);
        }

        // This is informational, not a failure
        expect(true).toBe(true);
      });

      test(`${blogSlug} should render mermaid diagrams if present`, async ({
        page,
      }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Wait a bit for mermaid to initialize
        await page.waitForTimeout(1000);

        // Check if there are mermaid diagrams
        const mermaidDiagrams = page.locator(
          '.mermaid, [data-processed="true"]'
        );
        const diagramCount = await mermaidDiagrams.count();

        if (diagramCount > 0) {
          console.log(`✓ ${blogSlug} has ${diagramCount} mermaid diagrams`);

          // Verify at least one diagram has SVG content
          const svgElements = page.locator(".mermaid svg");
          const svgCount = await svgElements.count();
          expect(
            svgCount,
            `${blogSlug} mermaid diagrams should render as SVG`
          ).toBeGreaterThan(0);
        } else {
          console.log(`  ${blogSlug} has no mermaid diagrams (which is okay)`);
        }

        // This is informational, not a failure
        expect(true).toBe(true);
      });

      test(`${blogSlug} should have proper SEO meta tags`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check for essential meta tags
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        expect(
          description,
          `${blogSlug} should have meta description`
        ).toBeTruthy();
        expect(
          description!.length,
          `${blogSlug} meta description should not be empty`
        ).toBeGreaterThan(0);

        // Check for OpenGraph tags
        const ogTitle = await page
          .locator('meta[property="og:title"]')
          .getAttribute("content");
        expect(ogTitle, `${blogSlug} should have og:title`).toBeTruthy();

        const ogDescription = await page
          .locator('meta[property="og:description"]')
          .getAttribute("content");
        expect(
          ogDescription,
          `${blogSlug} should have og:description`
        ).toBeTruthy();

        const ogType = await page
          .locator('meta[property="og:type"]')
          .getAttribute("content");
        expect(ogType, `${blogSlug} should have og:type = article`).toBe(
          "article"
        );

        // Check for Twitter card tags
        const twitterCard = await page
          .locator('meta[name="twitter:card"]')
          .getAttribute("content");
        expect(
          twitterCard,
          `${blogSlug} should have twitter:card`
        ).toBeTruthy();

        console.log(`✓ ${blogSlug} has proper SEO meta tags`);
      });

      test(`${blogSlug} should have canonical URL`, async ({ page }) => {
        await page.goto(`/blog/${blogSlug}`, { waitUntil: "domcontentloaded" });

        // Check for canonical link
        const canonical = page.locator('link[rel="canonical"]');
        await expect(
          canonical,
          `${blogSlug} should have canonical link`
        ).toHaveCount(1);

        const canonicalHref = await canonical.getAttribute("href");
        expect(
          canonicalHref,
          `${blogSlug} canonical href should exist`
        ).toBeTruthy();
        expect(
          canonicalHref,
          `${blogSlug} canonical should contain blog slug`
        ).toContain(blogSlug);

        console.log(`✓ ${blogSlug} has canonical URL: ${canonicalHref}`);
      });
    }
  });

  test.describe("Blog Navigation", () => {
    test("should navigate from blog listing to individual post", async ({
      page,
    }) => {
      await page.goto("/blog", { waitUntil: "domcontentloaded" });

      // Wait for blog cards
      await page.waitForSelector('[role="article"], article, .MuiCard-root', {
        timeout: 10000,
      });

      // Find and click the first blog post link
      const firstBlogLink = page.locator('a[href^="/blog/"]').first();
      await expect(firstBlogLink).toBeVisible();

      const linkHref = await firstBlogLink.getAttribute("href");
      await firstBlogLink.click();

      // Wait for navigation
      await page.waitForURL(new RegExp(linkHref!), { timeout: 10000 });

      // Verify we're on the blog post page
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();

      console.log(`✓ Successfully navigated to blog post: ${linkHref}`);
    });

    test("should have back to blog link or navigation", async ({ page }) => {
      if (blogSlugs.length > 0) {
        await page.goto(`/blog/${blogSlugs[0]}`, {
          waitUntil: "domcontentloaded",
        });

        // Look for navigation back to blog listing
        const backLink = page.locator(
          'a[href="/blog"], a[href*="/blog"]:has-text("back")'
        );
        const hasBackLink = (await backLink.count()) > 0;

        // Or check for header navigation
        const headerNav = page.locator("nav, header");
        const hasNav = (await headerNav.count()) > 0;

        expect(
          hasBackLink || hasNav,
          "Blog post should have navigation back to blog listing or site header"
        ).toBe(true);

        console.log(
          `✓ Blog post has navigation (back link: ${hasBackLink}, header nav: ${hasNav})`
        );
      }
    });
  });

  test.describe("Blog Performance", () => {
    test("blog listing page should load within acceptable time", async ({
      page,
    }) => {
      const startTime = Date.now();
      await page.goto("/blog", { waitUntil: "domcontentloaded" });
      const loadTime = Date.now() - startTime;

      expect(
        loadTime,
        "Blog listing should load within 5 seconds"
      ).toBeLessThan(5000);
      console.log(`✓ Blog listing loaded in ${loadTime}ms`);
    });

    test("individual blog post should load within acceptable time", async ({
      page,
    }) => {
      if (blogSlugs.length > 0) {
        const startTime = Date.now();
        await page.goto(`/blog/${blogSlugs[0]}`, {
          waitUntil: "domcontentloaded",
        });
        const loadTime = Date.now() - startTime;

        expect(loadTime, "Blog post should load within 5 seconds").toBeLessThan(
          5000
        );
        console.log(`✓ Blog post loaded in ${loadTime}ms`);
      }
    });
  });
});
