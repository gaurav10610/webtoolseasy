#!/usr/bin/env tsx

import { isNil } from "lodash-es";
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import puppeteer, { Browser, Page } from "puppeteer";
import { getAllCategorySlugs } from "../src/data/categories";
import { spawn, type ChildProcess, execSync } from "child_process";
import http from "http";
import { promisify } from "util";

// Get parallelism from environment variable, default to 4
const PARALLELISM = parseInt(process.env.PARALLELISM || "4", 10);
const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "localhost";
const BASE_URL = process.env.SCREENSHOT_BASE_URL || `http://${HOST}:${PORT}`;
const MAX_WAIT_TIME = 60000;
const CHECK_INTERVAL = 500;
const sleep = promisify(setTimeout);

let appServerProcess: ChildProcess | null = null;
let startedLocalServer = false;

interface ScreenshotTask {
  url: string;
  fileName: string | undefined;
  folder?: string | undefined;
}

async function checkServerHealth(): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, (res) => {
      const statusCode = res.statusCode ?? 0;
      resolve(statusCode >= 200 && statusCode < 500);
    });

    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(): Promise<boolean> {
  const startTime = Date.now();
  console.log(`⏳ Waiting for app server at ${BASE_URL}...`);

  while (Date.now() - startTime < MAX_WAIT_TIME) {
    if (await checkServerHealth()) {
      console.log("✓ App server is ready for screenshots");
      return true;
    }

    await sleep(CHECK_INTERVAL);
    process.stdout.write(".");
  }

  console.log("\n✗ Timed out waiting for screenshot server");
  return false;
}

async function ensureServerRunning(): Promise<void> {
  if (await checkServerHealth()) {
    console.log(`✓ Reusing existing app server at ${BASE_URL}`);
    return;
  }

  console.log("🏗️ No local server detected. Building app for screenshots...");
  execSync("npm run build", {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: String(PORT),
    },
  });

  console.log(`🚀 Starting app server on ${BASE_URL} ...`);
  startedLocalServer = true;

  appServerProcess = spawn(
    "npm",
    ["run", "start", "--", "--port", String(PORT)],
    {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
      env: {
        ...process.env,
        PORT: String(PORT),
      },
    },
  );

  appServerProcess.stdout?.on("data", (data: Buffer) => {
    process.stdout.write(data.toString());
  });

  appServerProcess.stderr?.on("data", (data: Buffer) => {
    process.stderr.write(data.toString());
  });

  const ready = await waitForServer();
  if (!ready) {
    throw new Error(`Unable to start app server at ${BASE_URL}`);
  }
}

async function cleanupServer(): Promise<void> {
  if (!startedLocalServer || !appServerProcess) {
    return;
  }

  console.log("🛑 Stopping local screenshot server...");

  await new Promise<void>((resolve) => {
    appServerProcess?.once("exit", () => resolve());
    appServerProcess?.kill("SIGTERM");

    setTimeout(() => {
      if (appServerProcess && !appServerProcess.killed) {
        appServerProcess.kill("SIGKILL");
      }
      resolve();
    }, 3000);
  });

  console.log("✓ Screenshot server stopped");
}

const waitForPageReady = async (page: Page): Promise<void> => {
  await page.waitForSelector("main", { timeout: 15000 });

  await page
    .waitForFunction(() => document.readyState === "complete", {
      timeout: 15000,
    })
    .catch(() => undefined);

  await page
    .waitForFunction(
      () => !document.body.innerText.includes("Loading tool..."),
      {
        timeout: 15000,
      },
    )
    .catch(() => undefined);

  await new Promise((resolve) => setTimeout(resolve, 750));
};

const takeScreenshot = async (url: string, page: Page): Promise<Buffer> => {
  console.log(`📸 Taking screenshot of ${url}...`);

  let lastError: unknown;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await waitForPageReady(page);
      const screenshot = await page.screenshot();
      console.log(`✅ Screenshot of ${url} taken successfully!!`);
      return screenshot as Buffer;
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Screenshot attempt ${attempt} failed for ${url}`);

      if (attempt < 2) {
        await page.goto("about:blank", { waitUntil: "load", timeout: 10000 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Failed to take screenshot for ${url}`);
};

const saveScreenshot = (
  baseFolderPath: string,
  screenshot: Buffer,
  fileName: string | undefined,
  folder?: string | undefined,
) => {
  if (isNil(folder)) {
    writeFileSync(`${baseFolderPath}/${fileName}.png`, screenshot);
    return;
  }

  if (!existsSync(`${baseFolderPath}/${folder}`)) {
    mkdirSync(`${baseFolderPath}/${folder}`, { recursive: true });
  }

  writeFileSync(`${baseFolderPath}/${folder}/${fileName}.png`, screenshot);
};

const processScreenshotTask = async (
  task: ScreenshotTask,
  page: Page,
  baseFolderPath: string,
): Promise<void> => {
  try {
    const { url, fileName, folder } = task;
    const screenshot = await takeScreenshot(url, page);
    saveScreenshot(baseFolderPath, screenshot, fileName, folder);
  } catch (error) {
    console.error(`❌ Error processing ${task.url}:`, error);
    throw error;
  }
};

const createWorker = async (
  browser: Browser,
  tasks: ScreenshotTask[],
  baseFolderPath: string,
  workerId: number,
): Promise<void> => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  await page.setViewport({ width: 1640, height: 856 });

  console.log(`🚀 Worker ${workerId} started`);

  try {
    while (tasks.length > 0) {
      const task = tasks.shift();
      if (!task) break;
      await processScreenshotTask(task, page, baseFolderPath);
    }
  } finally {
    await page.close();
    console.log(`✅ Worker ${workerId} finished`);
  }
};

const generateScreenshots = async (): Promise<void> => {
  console.log(`🎬 Generating screenshots with parallelism: ${PARALLELISM}...`);

  const baseFolderPath = `${process.cwd()}/public/screenshots`;

  await ensureServerRunning();

  const commonUrls = [
    { url: `${BASE_URL}`, fileName: "home" },
    { url: `${BASE_URL}/blog`, fileName: "blog" },
  ];

  // Get tools from src/data/tools/*.ts
  const toolsPath = `${process.cwd()}/src/data/tools`;
  const toolFiles = readdirSync(toolsPath)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => ({
      url: `${BASE_URL}/tools/${file.replace(".ts", "")}`,
      fileName: file.replace(".ts", ""),
      folder: "tools",
    }));

  // Get blogs from src/data/blog/config/*.ts
  const blogConfigPath = `${process.cwd()}/src/data/blog/config`;
  const blogFiles = readdirSync(blogConfigPath)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => ({
      url: `${BASE_URL}/blog/${file.replace(".ts", "")}`,
      fileName: file.replace(".ts", ""),
      folder: "blog",
    }));

  // Get category pages from categories configuration
  const categorySlugs = getAllCategorySlugs();
  const categoryFiles = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/tools/category/${slug}`,
    fileName: slug,
    folder: "category",
  }));

  const screenshotsUrls: ScreenshotTask[] = [
    ...toolFiles,
    ...blogFiles,
    ...categoryFiles,
  ];

  screenshotsUrls.unshift(...commonUrls);

  console.log(`📊 Total screenshots to generate: ${screenshotsUrls.length}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // Create workers
    const workers: Promise<void>[] = [];
    for (let i = 0; i < PARALLELISM; i++) {
      workers.push(
        createWorker(browser, screenshotsUrls, baseFolderPath, i + 1),
      );
    }

    // Wait for all workers to complete
    await Promise.all(workers);

    console.log("🎉 Screenshots generated successfully!!");
  } catch (error) {
    console.error("❌ Error generating screenshots:", error);
    process.exit(1);
  } finally {
    await browser.close();
    await cleanupServer();
    console.log("🧹 Browser closed");
  }
};

// Main execution
(async () => {
  try {
    await generateScreenshots();
    console.log("✨ Screenshot generation process completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
})();
