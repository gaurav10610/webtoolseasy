import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/privacy-first-pdf-tools-guide";
const pageTitle =
  "Privacy-First PDF Tools: Complete Guide to Secure Document Processing";
const pageDescription =
  "Learn how to edit, merge, split, and convert PDF documents without uploading to servers. Complete guide to client-side PDF tools that protect your privacy.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/privacy-first-pdf-tools-guide.png`;
const keywords = [
  "privacy pdf tools",
  "offline pdf editor",
  "client-side pdf",
  "secure pdf processing",
  "pdf merge offline",
  "pdf split private",
  "pdf compress local",
  "no upload pdf",
  "browser pdf tools",
  "GDPR compliant pdf",
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
  blogId: BlogIds.PRIVACY_FIRST_PDF_TOOLS_GUIDE,
  title: pageTitle,
  slug: "privacy-first-pdf-tools-guide",
  excerpt:
    "PDF documents often contain the most sensitive information. Learn how to edit, merge, split, and convert PDFs without uploading to servers using privacy-first tools.",
  category: BlogCategory.SECURITY,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2026-01-11T10:00:00.000Z",
  updatedAt: "2026-01-11T10:00:00.000Z",
  readingTimeMinutes: 10,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [BlogIds.PDF_TO_WORD_PRIVACY_GUIDE],
  contentFile: "privacy-first-pdf-tools-guide.md",
  metadata,
};
