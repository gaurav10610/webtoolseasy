import { google } from "googleapis";
import fs from "fs";
import path from "path";

const FLAGSHIP_URLS = [
  "https://webtoolseasy.com/",
  "https://webtoolseasy.com/drop",
  "https://webtoolseasy.com/beam",
  "https://webtoolseasy.com/codepair",
  "https://webtoolseasy.com/studio",
  "https://webtoolseasy.com/tools",
  "https://webtoolseasy.com/blog",
];

const SITEMAP_URL = "https://webtoolseasy.com/sitemap.xml";

// 1. IndexNow API Submission (Bing, Yandex, Seznam, Naver)
async function submitToIndexNow() {
  console.log("\n============================================================");
  console.log("  1. SUBMITTING FLAGSHIP URLS TO INDEXNOW API               ");
  console.log("============================================================");

  const indexNowApiKey = "baec1387a4304900bdcac22c4ce740ba";
  const host = "webtoolseasy.com";
  const keyLocation = `https://${host}/${indexNowApiKey}.txt`;

  const payload = {
    host,
    key: indexNowApiKey,
    keyLocation,
    urlList: FLAGSHIP_URLS,
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✓ [IndexNow] Successfully submitted ${FLAGSHIP_URLS.length} URLs to IndexNow! (HTTP ${res.status})`);
    } else {
      console.warn(`⚠ [IndexNow] Status ${res.status}: ${res.statusText}`);
    }
  } catch (err) {
    console.error("✗ [IndexNow Error]:", err);
  }
}

// 2. Google Indexing API Submission
async function submitToGoogleIndexingApi() {
  console.log("\n============================================================");
  console.log("  2. SUBMITTING FLAGSHIP URLS TO GOOGLE INDEXING API        ");
  console.log("============================================================");

  const keyPath = path.resolve(process.cwd(), "indexing-api-project-486117-caa3059e6480.json");
  if (!fs.existsSync(keyPath)) {
    console.error("Service account JSON file not found at:", keyPath);
    return;
  }

  const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));
  console.log(`Using Service Account: ${key.client_email}`);

  const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const tokens = await jwtClient.authorize();
  if (!tokens.access_token) {
    console.error("Failed to obtain Google access token");
    return;
  }

  for (const url of FLAGSHIP_URLS) {
    try {
      const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify({
          url,
          type: "URL_UPDATED",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`✓ [Google Indexing API] ${url} -> URL_UPDATED acknowledged`);
      } else {
        console.warn(`⚠ [Google Indexing API] ${url}:`, response.status, data);
      }
      await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      console.error(`✗ [Google Indexing Error] ${url}:`, e);
    }
  }
}

// 3. Google Search Console Webmasters API (Sitemap Refresh)
async function manageGoogleSearchConsoleSitemaps() {
  console.log("\n============================================================");
  console.log("  3. MANAGING SITEMAPS IN GOOGLE SEARCH CONSOLE             ");
  console.log("============================================================");

  const keyPath = path.resolve(process.cwd(), "indexing-api-project-486117-caa3059e6480.json");
  if (!fs.existsSync(keyPath)) return;

  const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));
  const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });

  await jwtClient.authorize();
  const searchconsole = google.webmasters({ version: "v3", auth: jwtClient });

  // Test both URL-prefix and Domain property formats
  const sitesToTry = [
    "https://webtoolseasy.com/",
    "https://webtoolseasy.com",
    "sc-domain:webtoolseasy.com",
  ];

  for (const siteUrl of sitesToTry) {
    try {
      console.log(`Checking sitemaps for property [${siteUrl}]...`);
      const listRes = await searchconsole.sitemaps.list({ siteUrl });
      console.log(`Current sitemaps on ${siteUrl}:`, listRes.data.sitemap?.map((s) => s.path) || "None");

      // Delete existing sitemap if present
      try {
        console.log(`Deleting previous sitemap ${SITEMAP_URL} on ${siteUrl}...`);
        await searchconsole.sitemaps.delete({ siteUrl, feedpath: SITEMAP_URL });
        console.log(`✓ Deleted old sitemap on ${siteUrl}`);
      } catch (delErr: unknown) {
        console.log(`(Delete info: ${delErr instanceof Error ? delErr.message : String(delErr)})`);
      }

      // Submit new sitemap
      console.log(`Submitting new focused sitemap ${SITEMAP_URL} on ${siteUrl}...`);
      await searchconsole.sitemaps.submit({ siteUrl, feedpath: SITEMAP_URL });
      console.log(`✓ [Search Console] Successfully submitted ${SITEMAP_URL} to ${siteUrl}`);
      break; // Succeeded on this property format!
    } catch (err: unknown) {
      console.warn(`Could not manage sitemap on ${siteUrl}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Also send standard Search Engine Sitemap Pings
  console.log("\nSending sitemap discovery pings to search engines...");
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];
  for (const pingUrl of pingUrls) {
    try {
      const res = await fetch(pingUrl);
      console.log(`✓ Pinged ${new URL(pingUrl).hostname}: HTTP ${res.status}`);
    } catch (e) {
      console.warn(`Ping notice for ${pingUrl}:`, e);
    }
  }
}

async function main() {
  await submitToIndexNow();
  await submitToGoogleIndexingApi();
  await manageGoogleSearchConsoleSitemaps();
  console.log("\n============================================================");
  console.log("  ALL SITEMAP & INDEXING TASKS COMPLETED!                   ");
  console.log("============================================================\n");
}

main().catch(console.error);
