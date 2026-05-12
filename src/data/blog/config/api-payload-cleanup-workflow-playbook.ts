import { BlogCategory, BlogConfig, BlogIds } from "@/types/blog-config";
import { Metadata } from "next";

const slug = "api-payload-cleanup-workflow-playbook";
const navigationUrl = `/blog/${slug}`;
const title = "API Payload Cleanup Workflow Playbook";
const description =
  "A practical workflow playbook for validating, normalizing, diffing, and exporting API payloads with local-first privacy.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/${slug}.png`;

const keywords = [
  "api payload cleanup workflow",
  "json normalization workflow",
  "private api payload tooling",
  "json diff and export",
  "workflow playbook",
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title,
  description,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title,
    type: "article",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    description,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title,
    description,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  keywords: keywords.join(", "),
  robots: "index, follow",
};

export const blogConfig: BlogConfig = {
  blogId: BlogIds.API_PAYLOAD_CLEANUP_WORKFLOW_PLAYBOOK,
  title,
  slug,
  excerpt:
    "Run API payload cleanup as a repeatable workflow with validation gates, deterministic transforms, and export-ready output manifests.",
  category: BlogCategory.WEB_DEVELOPMENT,
  tags: keywords,
  author: { name: "Gaurav Kumar Yadav", gender: "M" },
  publishedAt: "2026-05-12T00:00:00.000Z",
  updatedAt: "2026-05-12T00:00:00.000Z",
  readingTimeMinutes: 8,
  isFeatured: true,
  contentFile: `${slug}.md`,
  relatedPosts: [BlogIds.CLIENT_SIDE_JSON_FORMATTING_GUIDE],
  metadata,
};
