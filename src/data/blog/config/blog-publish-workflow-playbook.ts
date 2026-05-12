import { BlogCategory, BlogConfig, BlogIds } from "@/types/blog-config";
import { Metadata } from "next";

const slug = "blog-publish-workflow-playbook";
const navigationUrl = `/blog/${slug}`;
const title = "Blog Publish Workflow Playbook";
const description =
  "A workflow-first publishing playbook for markdown cleanup, metadata drafting, image prep, and schema exports.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/${slug}.png`;

const keywords = [
  "blog publish workflow",
  "markdown seo workflow",
  "metadata generation playbook",
  "json ld workflow",
  "content operations workflow",
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
  blogId: BlogIds.BLOG_PUBLISH_WORKFLOW_PLAYBOOK,
  title,
  slug,
  excerpt:
    "Ship blog posts faster with a repeatable publish workflow that standardizes content quality, metadata, and SEO-ready outputs.",
  category: BlogCategory.TUTORIALS,
  tags: keywords,
  author: { name: "Gaurav Kumar Yadav", gender: "M" },
  publishedAt: "2026-05-12T00:00:00.000Z",
  updatedAt: "2026-05-12T00:00:00.000Z",
  readingTimeMinutes: 7,
  isFeatured: true,
  contentFile: `${slug}.md`,
  relatedPosts: [BlogIds.TEXT_WRITING_TOOLS_GUIDE],
  metadata,
};
