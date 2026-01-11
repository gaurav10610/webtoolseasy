import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/secure-password-generation-guide";
const pageTitle =
  "Secure Password Generation: Why Browser-Based Tools Are Best";
const pageDescription =
  "Discover why generating passwords locally is more secure. Create strong passwords without exposing your needs to servers.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/secure-password-generation-guide.png`;
const keywords = [
  "secure password generator",
  "private password tool",
  "client-side password generation",
  "offline password generator",
  "browser password creation",
  "secure password practices",
  "no upload password tool",
  "strong password generator",
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
  blogId: BlogIds.SECURE_PASSWORD_GENERATION_GUIDE,
  title: "Secure Password Generation: Why Browser-Based Tools Are Best",
  slug: "secure-password-generation-guide",
  excerpt:
    "Understand why generating passwords locally in your browser is more secure than using online password generators. Learn password security best practices.",
  category: BlogCategory.SECURITY,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readingTimeMinutes: 9,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [],
  contentFile: "secure-password-generation-guide.md",
  metadata,
};
