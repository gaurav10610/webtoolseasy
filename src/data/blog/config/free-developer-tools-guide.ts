import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/free-developer-tools-guide";
const pageTitle =
  "Complete Guide to Free Developer Tools: Code Formatting, Testing & Security";
const pageDescription =
  "Essential developer tools for formatting, encoding, testing, and security. All tools work 100% in your browser - keep your API keys and code private.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/free-developer-tools-guide.png`;
const keywords = [
  "free developer tools",
  "code formatter online",
  "json formatter private",
  "regex tester offline",
  "base64 encoder",
  "jwt decoder secure",
  "hash generator",
  "uuid generator",
  "developer utilities",
  "coding tools free",
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords: keywords.join(", "),
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favion_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "article",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    description: pageDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const blogConfig: BlogConfig = {
  blogId: BlogIds.FREE_DEVELOPER_TOOLS_GUIDE,
  title: pageTitle,
  slug: "free-developer-tools-guide",
  excerpt:
    "Every developer needs a reliable toolkit. From formatting JSON to testing regex patterns, discover 50+ developer tools that work 100% in your browser.",
  category: BlogCategory.WEB_DEVELOPMENT,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2026-01-11T10:00:00.000Z",
  updatedAt: "2026-01-11T10:00:00.000Z",
  readingTimeMinutes: 15,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [BlogIds.CLIENT_SIDE_JSON_FORMATTING_GUIDE],
  contentFile: "free-developer-tools-guide.md",
  metadata,
};
