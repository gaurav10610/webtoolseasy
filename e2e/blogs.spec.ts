import { test, expect } from "@playwright/test";
import { getAllBlogs } from "./utils/test-data";
import { BlogPage, BlogListPage } from "./utils/page-objects";

const blogs = getAllBlogs();
console.log(`Found ${blogs.length} blogs to test`);

test.describe("Blog E2E Tests", () => {
  test("Blog listing loads with cards", async ({ page }) => {
    const blogList = new BlogListPage(page);
    await blogList.goto();
    await blogList.checkPageLoaded();
    const cardCount = await blogList.checkBlogCards();
    expect(cardCount).toBeGreaterThan(0);
    console.log(`✓ Blog listing displays ${cardCount} blog cards`);
  });

  for (const blogSlug of blogs) {
    test(`${blogSlug}: loads with metadata`, async ({ page }) => {
      const blog = new BlogPage(page, blogSlug);
      await blog.goto();
      await blog.checkPageLoaded();
      await blog.checkA11y();
      await blog.checkBlogMetadata();
      const title = await blog.getTitle();
      console.log(`✓ ${blogSlug}: loads "${title}"`);
    });

    test(`${blogSlug}: displays content`, async ({ page }) => {
      const blog = new BlogPage(page, blogSlug);
      await blog.goto();
      await blog.checkBlogContent();
      console.log(`✓ ${blogSlug}: renders markdown content`);
    });
  }
});
