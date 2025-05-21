import { isNil } from "lodash-es";
import fs, { readdirSync } from "fs";
import puppeteer, { Page } from "puppeteer";

const takeScreenshot = async (url: string, page: Page) => {
  console.log(`Taking screenshot of ${url}...`);
  await page.goto(url, { waitUntil: "networkidle2" });
  const screenshot = await page.screenshot();
  console.log(`Screenshot of ${url} taken successfully!!`);
  return { screenshot };
};

const generateScreenshots = async () => {
  console.log("Generating screenshots...");

  const baseFolderPath = `${process.cwd()}/public/screenshots`;

  const commonUrls = [
    { url: "http://localhost:3000", fileName: "home" },
    { url: "http://localhost:3000/blog", fileName: "blog" },
  ];

  const screenshotsUrls: {
    url: string;
    fileName: string | undefined;
    folder?: string | undefined;
  }[] = ["tools", "blog"]
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

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1640, height: 856 });

  try {
    for (let i = 0; i < screenshotsUrls.length; i++) {
      const { url, fileName, folder } = screenshotsUrls[i];
      const { screenshot } = await takeScreenshot(url, page);

      if (isNil(folder)) {
        fs.writeFileSync(`${baseFolderPath}/${fileName}.png`, screenshot);
        continue;
      }

      if (!fs.existsSync(`${baseFolderPath}/${folder}`)) {
        fs.mkdirSync(`${baseFolderPath}/${folder}`);
      }

      fs.writeFileSync(
        `${baseFolderPath}/${folder}/${fileName}.png`,
        screenshot
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
    await browser.close();
  }

  console.log("Screenshots generated successfully!!");
};

generateScreenshots();
