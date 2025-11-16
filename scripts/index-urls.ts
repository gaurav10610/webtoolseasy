import request from "request";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { getAllUrlsFromSitemap } from "./indexing-utils";
import { newToolsUrls } from "./new-tools-urls";

// Load Google service account credentials from environment
// Prefer setting GOOGLE_SERVICE_ACCOUNT_PATH to a local file path (gitignored)
// or GOOGLE_SERVICE_ACCOUNT_JSON to a JSON string (base64 encoded if you prefer).
interface GoogleServiceAccount {
  client_email: string;
  private_key: string;
  [k: string]: unknown;
}

let key: GoogleServiceAccount | undefined = undefined;
if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  try {
    key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } catch (e) {
    console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:", e);
  }
} else if (process.env.GOOGLE_SERVICE_ACCOUNT_PATH) {
  try {
    const p = path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_PATH);
    const raw = fs.readFileSync(p, "utf8");
    key = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read GOOGLE_SERVICE_ACCOUNT_PATH:", e);
  }
} else {
  console.warn(
    "No Google service account provided. Set GOOGLE_SERVICE_ACCOUNT_PATH or GOOGLE_SERVICE_ACCOUNT_JSON to enable Google Indexing API."
  );
}

// Load URLs from new-tools-urls.ts
const getNewToolsUrls = (): string[] => {
  try {
    return newToolsUrls.map((item) => item.url);
  } catch (e) {
    console.warn("No new tools URLs found or error reading file:", e);
    return [];
  }
};

// Clear URLs from new-tools-urls.ts after indexing
const clearNewToolsUrls = (): void => {
  try {
    const newToolsPath = path.join(__dirname, "new-tools-urls.ts");
    const emptyContent = `export interface NewToolUrl {
  url: string;
  createdAt: string;
}

export const newToolsUrls: NewToolUrl[] = [];
`;
    fs.writeFileSync(newToolsPath, emptyContent, "utf8");
    console.log("Cleared new tools URLs from config file");
  } catch (e) {
    console.error("Error clearing new tools URLs:", e);
  }
};

const updatedUrls: string[] = getNewToolsUrls();

export const indexUrlsInGoogle = () => {
  if (!key) {
    console.error(
      "Google service account key not available; skipping Google indexing."
    );
    return;
  }

  const jwtClient = new google.auth.JWT(
    key.client_email,
    undefined,
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    undefined
  );

  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    if (!tokens) {
      console.log("Tokens are undefined");
      return;
    }

    const indexResults: unknown[] = [];

    let urlsToIndex: string[];

    if (process.env.INDEX_ALL_URLS === "true") {
      const sitemapPath = `${process.cwd()}/public/sitemap.xml`;
      urlsToIndex = await getAllUrlsFromSitemap(sitemapPath);
    } else {
      urlsToIndex = updatedUrls;
    }

    urlsToIndex.forEach((urlToIndex: string) => {
      const options = {
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        auth: { bearer: tokens.access_token || "" },
        json: {
          url: urlToIndex,
          type: "URL_UPDATED",
        },
      };
      request(options, function (error, response, body) {
        // Handle the response
        console.log(body);
        indexResults.push({
          url: urlToIndex,
          lastIndexed: new Date().toISOString(),
          response: body,
        });
      });
    });

    // Clear URLs after Google indexing (if not indexing all URLs)
    if (urlsToIndex.length > 0 && process.env.INDEX_ALL_URLS !== "true") {
      clearNewToolsUrls();
    }
  });
};

const indexUrlsInIndexNow = async () => {
  let urlsToIndex: string[];

  if (process.env.INDEX_ALL_URLS === "true") {
    const sitemapPath = `${process.cwd()}/public/sitemap.xml`;
    urlsToIndex = await getAllUrlsFromSitemap(sitemapPath);
  } else {
    urlsToIndex = updatedUrls;
  }

  const indexNowApiKey = "baec1387a4304900bdcac22c4ce740ba";

  const host = "webtoolseasy.com";
  const keyLocation = `https://${host}/${indexNowApiKey}.txt`;

  if (!urlsToIndex || urlsToIndex.length === 0) {
    console.error("No URLs to index");
    return;
  }

  console.log("Indexing URLs in IndexNow:", urlsToIndex);

  const payload = {
    host,
    key: indexNowApiKey,
    keyLocation,
    urlList: urlsToIndex,
  };

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log("URLs submitted successfully");

    // Clear URLs after successful indexing
    if (urlsToIndex.length > 0 && process.env.INDEX_ALL_URLS !== "true") {
      clearNewToolsUrls();
    }
  } catch (error) {
    console.error("Error indexing URLs:", error);
  }
};

indexUrlsInIndexNow().then(() => {
  // indexUrlsInGoogle();
});
