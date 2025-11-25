import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/rest-api-jwt-authentication-guide";
const pageTitle =
  "Building Secure REST APIs with JWT Authentication: Complete 2025 Guide";
const pageDescription =
  "Master REST API security with JWT authentication. Learn best practices, implementation patterns, and use free tools to build secure APIs.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/rest-api-jwt-authentication-guide.png`;
const keywords = [
  "REST API security",
  "JWT authentication",
  "API authentication",
  "secure REST API",
  "JWT best practices",
  "API security guide",
  "token-based authentication",
  "REST API tutorial",
  "JWT implementation",
  "API development",
  "backend security",
  "web API security",
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
  blogId: BlogIds.REST_API_JWT_AUTHENTICATION_GUIDE,
  title:
    "Building Secure REST APIs with JWT Authentication: Complete 2025 Guide",
  slug: "rest-api-jwt-authentication-guide",
  excerpt:
    "Learn how to build secure REST APIs using JWT authentication. Complete guide with best practices, implementation examples, and free development tools.",
  category: BlogCategory.WEB_DEVELOPMENT,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2025-11-25T11:00:00.000Z",
  updatedAt: "2025-11-25T11:00:00.000Z",
  readingTimeMinutes: 12,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [BlogIds.DECODING_JWT_COMPREHENSIVE_GUIDE],
  contentFile: "rest-api-jwt-authentication-guide.md",
  metadata,
};
