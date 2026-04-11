import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/free-image-editing-tools-guide";
const pageTitle =
  "Ultimate Guide to Free Image Editing Tools: Compress, Resize, Convert & More";
const pageDescription =
  "Professional image editing without expensive software or privacy concerns. Compress, resize, convert, and edit images entirely in your browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/free-image-editing-tools-guide.png`;
const keywords = [
  "free image editor",
  "image compressor online",
  "resize image free",
  "image converter",
  "background remover",
  "gif maker free",
  "crop image online",
  "photo editing tools",
  "image optimization",
  "webp converter",
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
  blogId: BlogIds.FREE_IMAGE_EDITING_TOOLS_GUIDE,
  title: pageTitle,
  slug: "free-image-editing-tools-guide",
  excerpt:
    "Images are everywhere online. Learn about free, browser-based image tools that compress, resize, convert, and edit without uploading to servers.",
  category: BlogCategory.DESIGN,
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
  relatedPosts: [BlogIds.PRIVATE_IMAGE_COMPRESSION_GUIDE],
  contentFile: "free-image-editing-tools-guide.md",
  metadata,
};
