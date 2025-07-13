import request from "request";
import { google } from "googleapis";
import key from "../webtoolseasy-452118-670a03d83db4.json";
import { getAllUrlsFromSitemap } from "./indexing-utils";

const updatedUrls: string[] = [];

const indexUrlsInGoogle = () => {
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
  } catch (error) {
    console.error("Error indexing URLs:", error);
  }
};

indexUrlsInIndexNow().then(() => {
  indexUrlsInGoogle();
});
