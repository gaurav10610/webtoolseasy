import { readdirSync, writeFileSync } from "fs";

function convertDateFormat(isoDate) {
  const date = new Date(isoDate);
  const isoString = date.toISOString(); // Example: 2025-05-06T11:52:24.125Z
  const trimmed = isoString.split(".")[0]; // Remove milliseconds: "2025-05-06T11:52:24"
  return `${trimmed}+00:00`;
}

function generateSitemap(
  urlList: { loc: string; lastmod: string; priority?: string }[]
) {
  const header =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n` +
    `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n` +
    `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  const footer = `</urlset>`;

  const body = urlList
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority || "0.7000"}</priority>
  </url>`
    )
    .join("\n");

  return header + body + "\n" + footer;
}

function updateSitemap() {
  const urlList = ["tools", "blog"]
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
      loc: `https://webtoolseasy.com/${fileName}`,
      lastmod: convertDateFormat(new Date().toISOString()),
    }));

  const commonUrls = [
    {
      loc: `https://webtoolseasy.com`,
      lastmod: convertDateFormat(new Date().toISOString()),
      priority: "1.0000",
    },
    {
      loc: `https://webtoolseasy.com/blog`,
      lastmod: convertDateFormat(new Date().toISOString()),
      priority: "0.8000",
    },
  ];

  urlList.unshift(...commonUrls);

  const sitemap = generateSitemap(urlList);

  writeFileSync(`${process.cwd()}/public/sitemap.xml`, sitemap);
}

updateSitemap();
