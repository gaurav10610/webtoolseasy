import { forEach, isNil } from "lodash-es";
import fs from "fs";
import puppeteer from "puppeteer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const takeScreenshot = async (url: string, delayInMs: number = 0) => {
  console.log(`Taking screenshot of ${url}...`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1640, height: 856 });
  await page.goto(url);
  await delay(delayInMs);
  const screenshot = await page.screenshot();
  await browser.close();
  console.log(`Screenshot of ${url} taken successfully!!`);
  return { screenshot };
};

const generateScreenshots = async () => {
  console.log("Generating screenshots...");

  const baseFolderPath = `${process.cwd()}/public/screenshots`;

  const dataFolders = ["component-config", "blog"];
  const screenshotsUrls: { url: string; fileName: string; folder?: string }[] =
    [
      ...[
        { url: "http://localhost:3000", fileName: "home" },
        { url: "http://localhost:3000/blog", fileName: "blog" },
      ],
    ];

  const dataFolderPath = `${process.cwd()}/src/data`;

  forEach(dataFolders, (folder) => {
    const folderPath = `${dataFolderPath}/${folder}`;
    const files = fs.readdirSync(folderPath);

    files
      .map((file) => file.replace(".json", ""))
      .map((file) => file.replace(".ts", ""))
      .forEach((file) => {
        const url = `http://localhost:3000/${folder}/${file}`;
        screenshotsUrls.push({
          url,
          fileName: file,
          folder,
        });
      });
  });

  for (let i = 0; i < screenshotsUrls.length; i++) {
    const { url, fileName, folder } = screenshotsUrls[i];
    const { screenshot } = await takeScreenshot(
      url,
      folder === "component-config" ? 3000 : 0
    );

    if (isNil(folder)) {
      fs.writeFileSync(`${baseFolderPath}/${fileName}.png`, screenshot);
    } else {
      if (!fs.existsSync(`${baseFolderPath}/${folder}`)) {
        fs.mkdirSync(`${baseFolderPath}/${folder}`);
      }
      fs.writeFileSync(
        `${baseFolderPath}/${folder}/${fileName}.png`,
        screenshot
      );
    }
  }

  console.log("Screenshots generated successfully!!");
};

generateScreenshots();
