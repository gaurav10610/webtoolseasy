import { chromium, devices } from "@playwright/test";

async function verifyMobileHeader() {
  console.log("=== VERIFYING MOBILE & DESKTOP HEADER ===");
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Test (1280x800)
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const desktopBlog = await desktopPage.locator("header").getByText("Blog").count();
  const desktopSearch = await desktopPage.locator("header").getByText("Search").count();
  console.log(`Desktop Header: 'Blog' count = ${desktopBlog}, 'Search' count = ${desktopSearch}`);

  await desktopPage.screenshot({ path: "test-results/desktop-clean-header.png" });

  // 2. Mobile Test (iPhone 14, 390x844)
  const mobileDevice = devices["iPhone 14"];
  const mobileCtx = await browser.newContext({ ...mobileDevice });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Check horizontal overflow
  const hasHorizontalScroll = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Mobile: horizontal overflow detected = ${hasHorizontalScroll}`);

  // Take screenshot of mobile header closed
  await mobilePage.screenshot({ path: "test-results/mobile-header-closed.png" });

  // Click hamburger menu to open drawer
  const menuButton = mobilePage.getByRole("button", { name: "Toggle navigation menu" });
  await menuButton.click();
  await mobilePage.waitForTimeout(500);

  // Take screenshot of mobile header open
  await mobilePage.screenshot({ path: "test-results/mobile-header-open.png" });

  const mobileBlog = await mobilePage.getByRole("link", { name: "Blog" }).count();
  const mobileSearch = await mobilePage.getByRole("button", { name: /search/i }).count();
  console.log(`Mobile Drawer: 'Blog' link count = ${mobileBlog}, 'Search' count = ${mobileSearch}`);

  await desktopCtx.close();
  await mobileCtx.close();
  await browser.close();

  console.log("Mobile and desktop header verification complete!");
}

verifyMobileHeader().catch(console.error);
