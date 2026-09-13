import { readdirSync } from "fs";
import path from "path";
import { getAllCategorySlugs } from "./categories";
import type { MetadataRoute } from "next";

export const HOSTNAME = "https://webtoolseasy.com";

// Redirected, consolidated, or pruned tools that MUST NOT be in the sitemap
export const EXCLUDED_SITEMAP_TOOLS = new Set([
  "uuid-v1-generator",
  "uuid-v3-generator",
  "uuid-v5-generator",
  "uuid-v7-generator",
  "guid-generator",
  "ulid-generator",
  "base64-decode",
  "tip-calculator",
  "fraction-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "gpa-calculator",
]);

export function getAllSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  // Tools
  const toolsDir = path.join(process.cwd(), "src/data/tools");
  const toolFiles = readdirSync(toolsDir).filter((file) => file.endsWith(".ts"));
  const toolEntries: MetadataRoute.Sitemap = toolFiles
    .map((file) => file.replace(".ts", ""))
    .filter((tool) => !EXCLUDED_SITEMAP_TOOLS.has(tool))
    .map((tool) => ({
      url: `${HOSTNAME}/tools/${tool}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Blog posts
  const blogDir = path.join(process.cwd(), "src/data/blog/config");
  const blogFiles = readdirSync(blogDir).filter((file) => file.endsWith(".ts"));
  const blogEntries: MetadataRoute.Sitemap = blogFiles.map((file) => ({
    url: `${HOSTNAME}/blog/${file.replace(".ts", "")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Categories
  const categorySlugs = getAllCategorySlugs();
  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${HOSTNAME}/tools/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${HOSTNAME}/`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${HOSTNAME}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...categoryEntries,
    ...toolEntries,
    ...blogEntries,
  ];
}

export function getAllSitemapUrls(): string[] {
  return getAllSitemapEntries().map((entry) => entry.url);
}
