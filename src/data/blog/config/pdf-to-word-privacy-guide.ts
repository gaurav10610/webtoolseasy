import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/pdf-to-word-privacy-guide";
const pageTitle =
  "Convert PDF to Word Without Uploading: Privacy-First Guide 2025";
const pageDescription =
  "Learn how to convert PDF to Word documents without uploading files online. Protect your privacy with client-side conversion tools and secure methods.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/pdf-to-word-privacy-guide.png`;
const keywords = [
  "convert PDF to Word",
  "PDF to Word without upload",
  "private PDF converter",
  "PDF to Word offline",
  "secure PDF conversion",
  "client-side PDF converter",
  "PDF privacy",
  "convert PDF locally",
  "PDF to DOCX",
  "document conversion security",
  "offline document converter",
  "no upload PDF tools",
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
  blogId: BlogIds.PDF_TO_WORD_PRIVACY_GUIDE,
  title: "Convert PDF to Word Without Uploading: Privacy-First Guide 2025",
  slug: "pdf-to-word-privacy-guide",
  excerpt:
    "Discover secure methods to convert PDF to Word documents without uploading sensitive files to online servers. Learn about client-side conversion tools and privacy-first approaches.",
  category: BlogCategory.TUTORIALS,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: "2025-11-25T10:00:00.000Z",
  updatedAt: "2025-11-25T10:00:00.000Z",
  readingTimeMinutes: 10,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [BlogIds.DECODING_JWT_COMPREHENSIVE_GUIDE],
  contentFile: "pdf-to-word-privacy-guide.md",
  metadata,
};
