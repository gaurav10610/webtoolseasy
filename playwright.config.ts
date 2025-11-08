import { defineConfig, devices } from "@playwright/test";
import { cpus } from "os";

/**
 * Playwright configuration for testing web tools
 *
 * Features:
 * - Configurable parallelism via PLAYWRIGHT_WORKERS env variable
 * - Headed/headless mode via HEADLESS env variable
 * - Tests all web tools for basic functionality
 */

export default defineConfig({
  testDir: "./e2e",

  // Maximum time one test can run for
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,

  // Number of parallel workers - configurable via environment variable
  // Default: half of CPU cores for better performance
  workers: process.env.PLAYWRIGHT_WORKERS
    ? parseInt(process.env.PLAYWRIGHT_WORKERS)
    : process.env.CI
    ? 1
    : Math.floor(cpus().length / 2) || 1,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: [
    ["html"],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],

  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL || "http://localhost:3000",

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Headed/headless mode configurable via environment variable
        headless: process.env.HEADLESS !== "false",
      },
    },
  ],

  // Dev server is managed by custom fixtures in e2e/fixtures.ts
  // This ensures proper startup and cleanup using Node.js child processes
});
