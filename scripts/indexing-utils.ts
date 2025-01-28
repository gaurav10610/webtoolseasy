import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";
import { map } from "lodash-es";

export const getAllUrlsFromSitemap = async (sitemapPath: string) => {
  const siteMapData = readFileSync(sitemapPath, "utf8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false,
  });

  const jObj = parser.parse(siteMapData);
  const urlSet = jObj.urlset.url;

  return map(urlSet, (urlObj: Record<string, string>) => urlObj.loc);
};
