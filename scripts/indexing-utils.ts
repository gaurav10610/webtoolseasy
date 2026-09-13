import { getAllSitemapUrls } from "../src/data/sitemapUrls";

export const getAllUrlsFromSitemap = async (): Promise<string[]> => {
  return getAllSitemapUrls();
};
