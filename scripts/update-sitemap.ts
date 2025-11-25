import { readdirSync, writeFileSync, readFileSync, existsSync } from "fs";

function convertDateFormat(isoDate: string) {
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
  // Read existing sitemap to preserve lastmod for existing URLs
  const sitemapPath = `${process.cwd()}/public/sitemap.xml`;
  const existingUrlMap = new Map<
    string,
    { lastmod?: string; priority?: string }
  >();

  if (existsSync(sitemapPath)) {
    try {
      const xml = readFileSync(sitemapPath, "utf-8");
      // Naive XML parsing sufficient for our simple structure
      const urlRegex = /<url>([\s\S]*?)<\/url>/g;
      let match: RegExpExecArray | null;
      while ((match = urlRegex.exec(xml)) !== null) {
        const block = match[1];
        const locMatch = block.match(/<loc>(.*?)<\/loc>/);
        if (!locMatch) continue;
        const loc = locMatch[1].trim();
        const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
        const priorityMatch = block.match(/<priority>(.*?)<\/priority>/);
        existingUrlMap.set(loc, {
          lastmod: lastmodMatch?.[1]?.trim(),
          priority: priorityMatch?.[1]?.trim(),
        });
      }
    } catch {
      // If parsing fails, continue with empty map
      console.warn(
        "Warning: Failed to parse existing sitemap.xml. Proceeding without preserving lastmod."
      );
    }
  }

  // Get tools from src/data/tools/*.ts
  const toolsPath = `${process.cwd()}/src/data/tools`;
  const toolUrls = readdirSync(toolsPath)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => {
      const fileName = `tools/${file.replace(".ts", "")}`;
      const loc = `https://webtoolseasy.com/${fileName}`;
      const existing = existingUrlMap.get(loc);
      return {
        loc,
        lastmod:
          existing?.lastmod || convertDateFormat(new Date().toISOString()),
        priority: existing?.priority,
      };
    });

  // Get blogs from src/data/blog/config/*.ts
  const blogConfigPath = `${process.cwd()}/src/data/blog/config`;
  const blogUrls = readdirSync(blogConfigPath)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => {
      const fileName = `blog/${file.replace(".ts", "")}`;
      const loc = `https://webtoolseasy.com/${fileName}`;
      const existing = existingUrlMap.get(loc);
      return {
        loc,
        lastmod:
          existing?.lastmod || convertDateFormat(new Date().toISOString()),
        priority: existing?.priority,
      };
    });

  const urlList = [...toolUrls, ...blogUrls];

  const commonUrls = [
    {
      loc: `https://webtoolseasy.com`,
      lastmod:
        existingUrlMap.get(`https://webtoolseasy.com`)?.lastmod ||
        convertDateFormat(new Date().toISOString()),
      priority: "1.0000",
    },
    {
      loc: `https://webtoolseasy.com/blog`,
      lastmod:
        existingUrlMap.get(`https://webtoolseasy.com/blog`)?.lastmod ||
        convertDateFormat(new Date().toISOString()),
      priority: "0.8000",
    },
  ];

  urlList.unshift(...commonUrls);

  const sitemap = generateSitemap(urlList);

  writeFileSync(`${process.cwd()}/public/sitemap.xml`, sitemap);
}

updateSitemap();
