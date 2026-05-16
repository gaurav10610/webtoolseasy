import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { jwtClaims } from "../src/data/jwtClaims";
import { regexPatterns } from "../src/data/regexPatterns";
import { calculatorPages } from "../src/data/calculatorPages";
import { architectureTemplates } from "../src/data/architectureTemplates";

const HOST = "https://webtoolseasy.com";

function convertDateFormat(isoDate: string) {
  const date = new Date(isoDate);
  const isoString = date.toISOString();
  const trimmed = isoString.split(".")[0];
  return `${trimmed}+00:00`;
}

function generateSitemap(
  urlList: { loc: string; lastmod: string; priority?: string; changefreq?: string }[],
) {
  const header =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const footer = `</urlset>`;

  const body = urlList
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq || "weekly"}</changefreq>
    <priority>${url.priority || "0.7000"}</priority>
  </url>`,
    )
    .join("\n");

  return header + body + "\n" + footer;
}

function getMostRecentMtime(paths: string[]) {
  const mtimes = paths
    .filter((filePath) => existsSync(filePath))
    .map((filePath) => statSync(filePath).mtime.getTime());

  return convertDateFormat(
    new Date(
      mtimes.length > 0 ? Math.max(...mtimes) : Date.now(),
    ).toISOString(),
  );
}

function getToolDirs() {
  const toolsPath = resolve(process.cwd(), "src/app/tools");
  if (!existsSync(toolsPath)) return [];
  return readdirSync(toolsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function updateSitemap() {
  const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
  const existingUrlMap = new Map<
    string,
    { lastmod?: string; priority?: string; changefreq?: string }
  >();

  if (existsSync(sitemapPath)) {
    try {
      const xml = readFileSync(sitemapPath, "utf-8");
      const urlRegex = /<url>([\s\S]*?)<\/url>/g;
      let match: RegExpExecArray | null;
      while ((match = urlRegex.exec(xml)) !== null) {
        const block = match[1];
        const locMatch = block.match(/<loc>(.*?)<\/loc>/);
        if (!locMatch) continue;
        const loc = locMatch[1].trim();
        existingUrlMap.set(loc, {
          lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim(),
          priority: block.match(/<priority>(.*?)<\/priority>/)?.[1]?.trim(),
          changefreq: block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1]?.trim(),
        });
      }
    } catch {
      console.warn("Failed to parse existing sitemap.xml. Proceeding without preserving metadata.");
    }
  }

  const urlList: any[] = [];

  // Core Pages
  const coreUrls = [
    { path: "", priority: "1.0000", changefreq: "daily" },
    { path: "/studio", priority: "0.9000", changefreq: "daily" },
    { path: "/canvas", priority: "0.9000", changefreq: "daily" },
    { path: "/privacy", priority: "0.5000", changefreq: "monthly" },
  ];

  coreUrls.forEach(({ path, priority, changefreq }) => {
    const loc = `${HOST}${path}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), `src/app${path || "/page"}.tsx`)]),
      priority: existingUrlMap.get(loc)?.priority || priority,
      changefreq: existingUrlMap.get(loc)?.changefreq || changefreq,
    });
  });

  // Tools Pages
  const tools = getToolDirs();
  tools.forEach((tool) => {
    const loc = `${HOST}/tools/${tool}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), `src/app/tools/${tool}/page.tsx`)]),
      priority: existingUrlMap.get(loc)?.priority || "0.8000",
      changefreq: existingUrlMap.get(loc)?.changefreq || "weekly",
    });
  });

  // Programmatic Index Pages
  const indexes = [
    { path: "/jwt/claims", src: "src/app/jwt/claims/page.tsx" },
    { path: "/regex/patterns", src: "src/app/regex/patterns/page.tsx" },
    { path: "/calculators", src: "src/app/calculators/page.tsx" },
    { path: "/architectures", src: "src/app/architectures/page.tsx" },
  ];
  indexes.forEach(({ path, src }) => {
    const loc = `${HOST}${path}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), src)]),
      priority: existingUrlMap.get(loc)?.priority || "0.7000",
      changefreq: existingUrlMap.get(loc)?.changefreq || "weekly",
    });
  });

  // Programmatic Details Pages
  // 1. JWT Claims
  jwtClaims.forEach((claim) => {
    const loc = `${HOST}/jwt/claims/${claim.id}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), "src/data/jwtClaims.ts")]),
      priority: existingUrlMap.get(loc)?.priority || "0.6000",
      changefreq: "monthly",
    });
  });

  // 2. Regex Patterns
  regexPatterns.forEach((pattern) => {
    const loc = `${HOST}/regex/patterns/${pattern.slug}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), "src/data/regexPatterns.ts")]),
      priority: existingUrlMap.get(loc)?.priority || "0.6000",
      changefreq: "monthly",
    });
  });

  // 3. Calculators
  calculatorPages.forEach((calc) => {
    const loc = `${HOST}/calculators/${calc.service.toLowerCase()}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), "src/data/calculatorPages.ts")]),
      priority: existingUrlMap.get(loc)?.priority || "0.6000",
      changefreq: "monthly",
    });
  });

  // 4. Architectures
  architectureTemplates.forEach((template) => {
    const loc = `${HOST}/architectures/${template.slug}`;
    urlList.push({
      loc,
      lastmod: getMostRecentMtime([resolve(process.cwd(), "src/data/architectureTemplates.ts")]),
      priority: existingUrlMap.get(loc)?.priority || "0.6000",
      changefreq: "monthly",
    });
  });

  const sitemap = generateSitemap(urlList);
  writeFileSync(sitemapPath, sitemap);
  console.log(`Generated sitemap with ${urlList.length} URLs.`);
}

updateSitemap();
