import type { MetadataRoute } from "next";
import { getAllSitemapEntries } from "@/data/sitemapUrls";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries();
}
