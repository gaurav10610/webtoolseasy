import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/offline-web-tools-guide";
const pageTitle = "Offline Web Tools: Why Browser-Based Tools Are the Future";
const pageDescription =
  "Discover web tools that work offline without internet. Learn about client-side processing, privacy benefits, and the future of browser-based apps.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/offline-web-tools-guide.png`;
const keywords = [
  "offline web tools",
  "browser-based tools",
  "client-side apps",
  "no internet tools",
  "offline first apps",
  "pwa tools",
  "local processing",
  "privacy web apps",
  "webassembly tools",
  "free offline tools",
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
  blogId: BlogIds.OFFLINE_WEB_TOOLS_GUIDE,
  title: pageTitle,
  slug: "offline-web-tools-guide",
  excerpt:
    "The internet has created dependency on cloud services. Discover powerful tools that work offline, protect your privacy, and never require you to trust third parties.",
  category: BlogCategory.PRODUCTIVITY,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2026-01-11T10:00:00.000Z",
  updatedAt: "2026-01-11T10:00:00.000Z",
  readingTimeMinutes: 12,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [],
  contentFile: "offline-web-tools-guide.md",
  metadata,
};
