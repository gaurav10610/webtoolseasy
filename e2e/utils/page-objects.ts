import { Page, expect } from "@playwright/test";
import { TEST_CONSTANTS } from "./constants";

export class PageObject {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    this.baseUrl = baseUrl || TEST_CONSTANTS.BASE_URL;
  }

  async goto(path: string): Promise<void> {
    const response = await this.page.goto(`${this.baseUrl}${path}`, {
      waitUntil: "domcontentloaded",
      timeout: TEST_CONSTANTS.TIMEOUT_NAVIGATION,
    });
    expect(response?.status()).toBe(200);
  }

  async checkPageLoaded(): Promise<void> {
    const h1 = this.page.locator("h1").first();
    await expect(h1).toBeVisible({
      timeout: TEST_CONSTANTS.TIMEOUT_COMPONENT,
    });

    const title = await this.page.title();
    expect(title.length).toBeGreaterThan(0);

    const mainContent = this.page.locator("main");
    await expect(mainContent).toBeVisible({
      timeout: TEST_CONSTANTS.TIMEOUT_COMPONENT,
    });

    const nextJs404 = this.page.locator('text="This page could not be found"');
    await expect(nextJs404).not.toBeVisible();
  }

  async checkA11y(): Promise<void> {
    const h1 = this.page.locator("h1");
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);

    const main = this.page.locator("main");
    await expect(main).toBeVisible();

    const nav = this.page.locator("nav, header");
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getHeading(): Promise<string | null> {
    const h1 = this.page.locator("h1").first();
    return h1.textContent();
  }
}

export class ToolPage extends PageObject {
  constructor(
    page: Page,
    private toolName: string,
  ) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto(`/tools/${this.toolName}`);
  }

  getToolName(): string {
    return this.toolName;
  }
}

export class BlogPage extends PageObject {
  constructor(
    page: Page,
    private blogSlug: string,
  ) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto(`/blog/${this.blogSlug}`);
  }

  getBlogSlug(): string {
    return this.blogSlug;
  }

  async checkBlogMetadata(): Promise<void> {
    await this.checkPageLoaded();
    const authorText = this.page.getByText(/by|author|written/i);
    const authorElement = this.page.locator('[data-testid="author"], .author');
    const authorVisible =
      (await authorText.count()) > 0 || (await authorElement.count()) > 0;

    const dateText = this.page.getByText(/\d{4}|updated|published/i);
    const dateElement = this.page.locator('time, [data-testid="date"]');
    const dateVisible =
      (await dateText.count()) > 0 || (await dateElement.count()) > 0;

    expect(authorVisible || dateVisible).toBe(true);
  }

  async checkBlogContent(): Promise<void> {
    const content = this.page.locator("main");
    const text = await content.textContent();
    expect(text?.length || 0).toBeGreaterThan(100);
  }
}

export class BlogListPage extends PageObject {
  async goto(): Promise<void> {
    await super.goto("/blog");
  }

  async checkBlogCards(): Promise<number> {
    await this.checkPageLoaded();
    const blogCards = this.page.locator(
      '[role="article"], article, .MuiCard-root',
    );
    return blogCards.count();
  }
}

export class HomePage extends PageObject {
  async goto(): Promise<void> {
    await super.goto("/");
  }

  async checkSearch(): Promise<void> {
    const searchInput = this.page.locator('input[name="search"]');
    const hasSearch = (await searchInput.count()) > 0;
    expect(hasSearch).toBe(true);
  }

  async checkCategories(): Promise<void> {
    const categories = this.page.locator(
      '[data-testid="category-filter"], .category-link, [aria-label*="category"]',
    );
    const categoryCount = await categories.count();
    expect(categoryCount).toBeGreaterThan(0);
  }
}

export class CategoryPage extends PageObject {
  constructor(
    page: Page,
    private categorySlug: string,
  ) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto(`/tools/category/${this.categorySlug}`);
  }

  async checkToolsList(): Promise<number> {
    await this.checkPageLoaded();
    await this.page.waitForSelector("main", {
      timeout: TEST_CONSTANTS.TIMEOUT_COMPONENT,
    });

    const toolLinks = this.page.locator(
      'a[href^="/tools/"]:not([href*="/tools/category/"])',
    );
    const count = await toolLinks.count();
    expect(count).toBeGreaterThan(0);
    return count;
  }
}
