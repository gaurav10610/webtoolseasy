import { BlogCategory, BlogConfig, BlogIds } from "@/types/blog-config";
import { Metadata } from "next";

const slug = "technical-seo-quick-audit-workflow-playbook";
const navigationUrl = `/blog/${slug}`;
const title = "Technical SEO Quick Audit Workflow Playbook";
const description =
  "A concise SEO workflow playbook covering metadata checks, robots/sitemap validation, schema review, and report exports.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/${slug}.png`;

const keywords = [
  "technical seo workflow",
  "seo quick audit checklist",
  "robots sitemap validation workflow",
  "schema audit playbook",
  "workflow seo report",
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
  blogId: BlogIds.TECHNICAL_SEO_QUICK_AUDIT_WORKFLOW_PLAYBOOK,
  title,
  slug,
  excerpt:
    "Run a repeatable technical SEO quick-audit workflow and export action-ready findings in minutes.",
  category: BlogCategory.TUTORIALS,
  tags: keywords,
  author: { name: "Gaurav Kumar Yadav", gender: "M" },
  publishedAt: "2026-05-12T00:00:00.000Z",
  updatedAt: "2026-05-12T00:00:00.000Z",
  readingTimeMinutes: 7,
  isFeatured: true,
  contentFile: `${slug}.md`,
  relatedPosts: [BlogIds.FREE_DEVELOPER_TOOLS_GUIDE],
  metadata,
};
