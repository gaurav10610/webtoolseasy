import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { XMLParser } from "fast-xml-parser";

type SitemapUrlEntry = {
  loc?: string;
};

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

const HOST = "webtoolseasy.com";
const INDEXNOW_KEY = "baec1387a4304900bdcac22c4ce740ba";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

function getUrlsFromSitemap(sitemapPath: string): string[] {
  const xml = readFileSync(sitemapPath, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: true,
  });

  const parsed = parser.parse(xml) as {
    urlset?: { url?: SitemapUrlEntry | SitemapUrlEntry[] };
  };

  const urlNodes = parsed.urlset?.url;
  if (!urlNodes) return [];

  const entries = Array.isArray(urlNodes) ? urlNodes : [urlNodes];
  return entries
    .map((entry) => entry.loc?.trim())
    .filter((loc): loc is string => Boolean(loc));
}

async function submitIndexNow(): Promise<void> {
  if (process.env.INDEXNOW_ENABLED === "false") {
    console.log("IndexNow submission skipped (INDEXNOW_ENABLED=false).");
    return;
  }

  const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
  const urls = getUrlsFromSitemap(sitemapPath);

  if (urls.length === 0) {
    console.warn("IndexNow submission skipped: no URLs found in sitemap.");
    return;
  }

  const payload: IndexNowPayload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      console.warn(
        `IndexNow submission failed (${response.status} ${response.statusText}): ${body}`,
      );
      return;
    }

    console.log(`IndexNow submitted ${urls.length} URL(s) successfully.`);
  } catch (error) {
    console.warn(
      "IndexNow submission failed due to a network/runtime error:",
      error,
    );
  }
}

submitIndexNow().catch((error) => {
  console.warn("Unexpected IndexNow submission error:", error);
});
