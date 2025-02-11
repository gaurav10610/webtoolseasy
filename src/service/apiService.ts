import { BlogEntityOverview } from "@/types/domain-entities";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import xmlFormat from "xml-formatter";
import { find, isNil } from "lodash-es";

export async function saveJsonFile({
  folder,
  fileName,
  data,
}: Readonly<{
  folder: string;
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}>) {
  const filePath = `${process.cwd()}/src/data/${folder}/${fileName}.json`;

  if (existsSync(filePath)) {
    throw new Error("File already exist!");
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2));

  return { success: true };
}

export async function updateJsonFile({
  folder,
  fileName,
  data,
}: Readonly<{
  folder: string;
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}>) {
  const filePath = `${process.cwd()}/src/data/${folder}/${fileName}.json`;

  if (!existsSync(filePath)) {
    throw new Error("File Not Found!");
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2));

  if (data.isDisabled === "YES") {
    return { success: true };
  }

  const { pageUrl } = data;

  const blogListPath = `${process.cwd()}/src/data/blogList.json`;
  const blogListData = readFileSync(blogListPath, "utf8");
  const blogListJson = JSON.parse(blogListData) as BlogEntityOverview[];

  const blogListEntry: BlogEntityOverview | undefined = find(
    blogListJson,
    (entry: { pageUrl: string }) => entry.pageUrl === `/${folder}/${fileName}`
  );

  if (isNil(blogListEntry)) {
    blogListJson.push({
      pageUrl: `/${folder}/${fileName}`,
      heading: data.heading,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
    });
  } else {
    blogListEntry.heading = data.heading;
    blogListEntry.updatedAt = data.updatedAt;
    blogListEntry.updatedBy = data.updatedBy;
    blogListEntry.pageUrl = `/${folder}/${fileName}`;
  }

  writeFileSync(blogListPath, JSON.stringify(blogListJson, null, 2));

  // Update the sitemap with the new pageUrl
  await updateUrlInSitemap(pageUrl);

  return { success: true };
}

async function updateUrlInSitemap(url: string) {
  const hostname = "https://webtoolseasy.com";
  const pageUrl = `${hostname}${url}`;
  const lastModifed = new Date().toISOString().split("T")[0];

  const sitemapPath = `${process.cwd()}/public/sitemap.xml`;
  const siteMapData = readFileSync(sitemapPath, "utf8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false,
  });

  const jObj = parser.parse(siteMapData);
  const urlSet = jObj.urlset.url;

  const urlIndex = urlSet.findIndex(
    (url: { loc: string }) => url.loc === pageUrl
  );

  if (urlIndex > -1) {
    urlSet[urlIndex].lastmod = lastModifed;
  } else {
    urlSet.push({
      loc: pageUrl,
      lastmod: lastModifed,
    });
  }

  const builderOptions = {
    ignoreAttributes: false,
    ignoreDeclaration: false,
  };

  const builder = new XMLBuilder(builderOptions);

  const xmlContent = xmlFormat(builder.build(jObj));

  // write updated sitemap
  writeFileSync(sitemapPath, xmlContent, "utf8");
}
