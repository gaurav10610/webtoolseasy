import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/client-side-json-formatting-guide";
const pageTitle = "Client-Side JSON Formatting: The Private Way to Format Data";
const pageDescription =
  "Learn why formatting JSON with client-side tools is safer. Keep your data private while formatting and validating JSON.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/client-side-json-formatting-guide.png`;
const keywords = [
  "client-side json formatting",
  "private json formatter",
  "secure json formatting",
  "offline json format",
  "browser json tools",
  "no upload json formatter",
  "json validation privacy",
  "secure api testing",
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
    ],
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
  blogId: BlogIds.CLIENT_SIDE_JSON_FORMATTING_GUIDE,
  title: "Client-Side JSON Formatting: The Private Way to Format Data",
  slug: "client-side-json-formatting-guide",
  excerpt:
    "Discover why formatting JSON in your browser protects your data. Learn about client-side JSON tools and why they're essential for secure API development.",
  category: BlogCategory.WEB_DEVELOPMENT,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readingTimeMinutes: 8,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [],
  contentFile: "client-side-json-formatting-guide.md",
  metadata,
};
