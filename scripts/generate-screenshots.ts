#!/usr/bin/env tsx

import { isNil } from "lodash-es";
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import puppeteer, { Browser, Page } from "puppeteer";

// Get parallelism from environment variable, default to 4
const PARALLELISM = parseInt(process.env.PARALLELISM || "4", 10);

interface ScreenshotTask {
  url: string;
  fileName: string | undefined;
  folder?: string | undefined;
}

const takeScreenshot = async (url: string, page: Page): Promise<Buffer> => {
  console.log(`📸 Taking screenshot of ${url}...`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  const screenshot = await page.screenshot();
  console.log(`✅ Screenshot of ${url} taken successfully!!`);
  return screenshot as Buffer;
};

const saveScreenshot = (
  baseFolderPath: string,
  screenshot: Buffer,
  fileName: string | undefined,
  folder?: string | undefined
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
  baseFolderPath: string
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
  workerId: number
): Promise<void> => {
  const page = await browser.newPage();
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

  const commonUrls = [
    { url: "http://localhost:3000", fileName: "home" },
    { url: "http://localhost:3000/blog", fileName: "blog" },
  ];

  const screenshotsUrls: ScreenshotTask[] = ["tools", "blog"]
    .map((folder) => `${process.cwd()}/src/data/${folder}`)
    .map((folderPath) => {
      return readdirSync(folderPath).map(
        (file) => `${folderPath.split("/").pop()}/${file}`
      );
    })
    .flat()
    .map((fileName) => fileName.replace(".ts", ""))
    .map((fileName) => fileName.replace(".json", ""))
    .map((fileName) => ({
      url: `http://localhost:3000/${fileName}`,
      fileName: fileName.split("/").pop(),
      folder: fileName.split("/")[0],
    }));

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
        createWorker(browser, screenshotsUrls, baseFolderPath, i + 1)
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
