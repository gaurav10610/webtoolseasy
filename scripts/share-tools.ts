#!/usr/bin/env node
/**
 * scripts/share-tools.ts
 *
 * Creates share URLs for each tool and optionally posts to social platforms
 * if API credentials are provided via environment variables.
 *
 * Usage:
 *   node ./scripts/share-tools.ts
 *
 * Environment variables (via .env - gitignored):
 *   SHARE_BASE_URL - base site URL (default http://localhost:3000)
 *
 * Optional API credentials (when present the script will attempt to POST):
 *   X_BEARER_TOKEN - X/Twitter Bearer Token (for posting tweets via v2 API)
 *   LINKEDIN_ACCESS_TOKEN - OAuth2 access token for LinkedIn
 *   LINKEDIN_OWNER_URN - owner URN for LinkedIn (e.g. urn:li:person:xxxx)
 *   FB_PAGE_ACCESS_TOKEN - Facebook page access token
 *   FB_PAGE_ID - Facebook page id to post to
 *   TELEGRAM_BOT_TOKEN - Telegram bot token
 *   TELEGRAM_CHAT_ID - Telegram chat id or username to send messages to
 *
 */

// Load configuration from a JSON file (default: ./share-config.json).
// If the JSON file is missing the script will fall back to environment variables.
import fs from "fs";
import path from "path";

const configPath =
  process.env.SHARE_CONFIG_PATH ||
  path.join(process.cwd(), "share-config.json");
let fileConfig: Record<string, string> = {};
try {
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, "utf8");
    fileConfig = JSON.parse(raw);
    console.log(`Loaded share config from ${configPath}`);
  } else {
    console.log(
      `No config file at ${configPath}, falling back to env variables.`
    );
  }
} catch (err) {
  console.warn(`Failed to load config at ${configPath}:`, err);
  fileConfig = {};
}
import { values } from "lodash-es";
import fetch from "node-fetch";
import { apps } from "../src/data/apps";

type AppConfig = {
  applicationId: string;
  displayText: string;
  navigateUrl: string;
  iconRelativeUrl?: string;
  category?: string;
};

const SHARE_BASE =
  fileConfig.SHARE_BASE_URL ||
  process.env.SHARE_BASE_URL ||
  "http://localhost:3000";

function buildUrl(app: AppConfig) {
  // Ensure no leading slash duplication
  return `${SHARE_BASE.replace(/\/$/, "")}/${app.navigateUrl.replace(
    /^\//,
    ""
  )}`;
}

function shareUrlsForApp(app: AppConfig) {
  const url = buildUrl(app);
  const text = `${app.displayText} — ${url}`;

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      app.displayText
    )}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(app.displayText)}`,
  };
}

async function postToX(text: string) {
  const token = fileConfig.X_BEARER_TOKEN || process.env.X_BEARER_TOKEN;
  if (!token) return { ok: false, reason: "no-token" };

  try {
    const res = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, err };
  }
}

async function postToFacebook(link: string, message: string) {
  const token =
    fileConfig.FB_PAGE_ACCESS_TOKEN || process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = fileConfig.FB_PAGE_ID || process.env.FB_PAGE_ID;
  if (!token || !pageId) return { ok: false, reason: "missing-credentials" };

  try {
    const res = await fetch(`https://graph.facebook.com/${pageId}/feed`, {
      method: "POST",
      body: new URLSearchParams({
        link,
        message,
        access_token: token,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, err };
  }
}

async function postToLinkedIn(link: string, text: string) {
  const token =
    fileConfig.LINKEDIN_ACCESS_TOKEN || process.env.LINKEDIN_ACCESS_TOKEN;
  const owner = fileConfig.LINKEDIN_OWNER_URN || process.env.LINKEDIN_OWNER_URN; // e.g. urn:li:person:xxxx
  if (!token || !owner) return { ok: false, reason: "missing-credentials" };

  try {
    const body = {
      author: owner,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "ARTICLE",
          media: [{ status: "READY", originalUrl: link }],
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    };

    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, err };
  }
}

async function postToTelegram(text: string, link: string) {
  const bot = fileConfig.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chat = fileConfig.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
  if (!bot || !chat) return { ok: false, reason: "missing-credentials" };

  try {
    const res = await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: `${text} \n${link}` }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, err };
  }
}

async function main() {
  console.log("Share tools script starting...");

  const appList = values(apps) as unknown as AppConfig[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: Record<string, any> = {};

  for (const app of appList) {
    const url = buildUrl(app);
    const text = `${app.displayText} — ${url}`;
    const urls = shareUrlsForApp(app);

    console.log(`\nTool: ${app.displayText}`);
    console.log(` URL: ${url}`);
    console.log(" Share URLs:");
    console.log(`  - facebook: ${urls.facebook}`);
    console.log(`  - whatsapp: ${urls.whatsapp}`);
    console.log(`  - x: ${urls.x}`);
    console.log(`  - linkedin: ${urls.linkedin}`);
    console.log(`  - telegram: ${urls.telegram}`);

    // Optionally post via APIs
    if (process.env.X_BEARER_TOKEN) {
      console.log("  -> Posting to X/Twitter via API...");
      results[app.applicationId] = results[app.applicationId] || {};
      results[app.applicationId].x = await postToX(text);
      console.log("   result:", results[app.applicationId].x);
    }

    if (process.env.FB_PAGE_ACCESS_TOKEN && process.env.FB_PAGE_ID) {
      console.log("  -> Posting to Facebook page via Graph API...");
      results[app.applicationId] = results[app.applicationId] || {};
      results[app.applicationId].facebook = await postToFacebook(
        url,
        app.displayText
      );
      console.log("   result:", results[app.applicationId].facebook);
    }

    if (process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_OWNER_URN) {
      console.log("  -> Posting to LinkedIn via API...");
      results[app.applicationId] = results[app.applicationId] || {};
      results[app.applicationId].linkedin = await postToLinkedIn(
        url,
        app.displayText
      );
      console.log("   result:", results[app.applicationId].linkedin);
    }

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      console.log("  -> Posting to Telegram via Bot API...");
      results[app.applicationId] = results[app.applicationId] || {};
      results[app.applicationId].telegram = await postToTelegram(
        app.displayText,
        url
      );
      console.log("   result:", results[app.applicationId].telegram);
    }
  }

  console.log("\nDone. Summary:");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
