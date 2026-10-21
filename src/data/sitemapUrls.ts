import { readdirSync } from "fs";
import path from "path";
import type { MetadataRoute } from "next";

export const HOSTNAME = "https://webtoolseasy.com";

/**
 * Focused Sitemap for Maximum Search Engine Crawl Budget Efficiency.
 * Legacy tools remain 100% live and discoverable behind /tools/* and the /tools hub directory,
 * but are intentionally omitted from sitemap.xml to prevent search engine bots
 * from exhausting crawl quota on static legacy calculators.
 */
export function getAllSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core Flagship WebRTC Suites & Hubs
  const flagshipEntries: MetadataRoute.Sitemap = [
    {
      url: `${HOSTNAME}/`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/drop`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/beam`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/codepair`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/studio`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${HOSTNAME}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Pillar Blog Guides (high-traffic SEO content)
  const blogDir = path.join(process.cwd(), "src/data/blog/config");
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const blogFiles = readdirSync(blogDir).filter((file) => file.endsWith(".ts"));
    blogEntries = blogFiles.map((file) => ({
      url: `${HOSTNAME}/blog/${file.replace(".ts", "")}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.warn("Could not read blog directory for sitemap:", err);
  }

  return [
    ...flagshipEntries,
    ...blogEntries,
  ];
}

export function getAllSitemapUrls(): string[] {
  return getAllSitemapEntries().map((entry) => entry.url);
}
