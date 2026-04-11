import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/text-writing-tools-guide";
const pageTitle =
  "Text & Writing Tools: Word Counter, Case Converter & Productivity Boosters";
const pageDescription =
  "Free text and writing tools for content creators, students, and professionals. Word counter, case converter, text compare, and more - all in your browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/text-writing-tools-guide.png`;
const keywords = [
  "word counter online",
  "case converter",
  "text compare tool",
  "lorem ipsum generator",
  "markdown editor",
  "text to speech",
  "speech to text",
  "writing tools free",
  "character counter",
  "diff checker",
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
      { url: "/favicon_512.png", sizes: "512x512" },
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
  blogId: BlogIds.TEXT_WRITING_TOOLS_GUIDE,
  title: pageTitle,
  slug: "text-writing-tools-guide",
  excerpt:
    "Whether you're a writer, student, or professional, working with text is daily. Discover free, privacy-first text tools that work entirely in your browser.",
  category: BlogCategory.PRODUCTIVITY,
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
  relatedPosts: [],
  contentFile: "text-writing-tools-guide.md",
  metadata,
};
