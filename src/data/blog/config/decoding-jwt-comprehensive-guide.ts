import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/decoding-jwt-comprehensive-guide";
const pageTitle = "JWT Decoding: A Comprehensive Guide & Free Online Tool";
const pageDescription =
  "Learn about JWT decoding, its importance, and how to easily decode JWTs using WebToolsEasy's free online JWT Decoder. Understand JWT structure, security aspects";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/decoding-jwt-comprehensive-guide.png`;
const keywords = [
  "JWT",
  "JSON Web Token",
  "JWT decoding",
  "decode JWT",
  "JWT decoder",
  "online JWT decoder",
  "JWT security",
  "JWT validation",
  "JWT authentication",
  "JWT tutorial",
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
  blogId: BlogIds.DECODING_JWT_COMPREHENSIVE_GUIDE,
  title: "JWT Decoding: A Comprehensive Guide & Free Online Tool",
  slug: "decoding-jwt-comprehensive-guide",
  excerpt:
    "JSON Web Tokens (JWTs) have become a cornerstone of modern web application security. Learn how to decode JWTs, understand their structure, and use our free online JWT Decoder tool.",
  category: BlogCategory.SECURITY,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2025-02-11T08:25:36.574Z",
  updatedAt: "2025-02-11T08:25:36.574Z",
  readingTimeMinutes: 8,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [],
  contentFile: "decoding-jwt-comprehensive-guide.md",
  metadata,
};
