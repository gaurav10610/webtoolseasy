import { forEach } from "lodash-es";
import fs from "fs";
import puppeteer from "puppeteer";

const takeScreenshot = async (url: string, fileName: string) => {
  console.log(`Taking screenshot of ${url}...`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1640, height: 856 });
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });

  const baseFolderPath = `${process.cwd()}/public/screenshots`;

  fs.writeFileSync(`${baseFolderPath}/${fileName}.png`, screenshot);
  await browser.close();
  console.log(`Screenshot of ${url} taken successfully!!`);
};

const getAllUrls = () => {
  const baseFolderPath = `${process.cwd()}/src/components`;
  const dataFolders = ["tools"];

  const hostname = "http://localhost:3000";

  const urls: { url: string; fileName: string }[] = [
    {
      url: hostname,
      fileName: "home",
    },
  ];

  forEach(dataFolders, (folder) => {
    const folderPath = `${baseFolderPath}/${folder}`;

    urls.push({
      url: `${hostname}/${folder}`,
      fileName: folder,
    });

    const files = fs.readdirSync(folderPath);

    files
      .map((file) => file.replace(".tsx", ""))
      .forEach((file) => {
        const url = `${hostname}/${folder}/${file}`;
        urls.push({
          url,
          fileName: file,
        });
      });
  });
  return urls;
};

const generateScreenshots = async () => {
  const urls = getAllUrls();

  console.log("Generating screenshots...");

  for (let i = 0; i < urls.length; i++) {
    const { url, fileName } = urls[i];
    await takeScreenshot(url, fileName);
  }

  console.log("Screenshots generated successfully!!");
};

generateScreenshots();
