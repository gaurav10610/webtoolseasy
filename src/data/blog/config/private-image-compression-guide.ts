import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/private-image-compression-guide";
const pageTitle = "Private Image Compression: Why Client-Side Tools Are Better";
const pageDescription =
  "Learn why private image compression tools are safer than servers. Reduce file size without risking your photos' privacy.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/private-image-compression-guide.png`;
const keywords = [
  "private image compression",
  "client-side image compression",
  "offline image compressor",
  "secure image compression",
  "compress images privately",
  "image optimization privacy",
  "browser image tools",
  "no upload image compression",
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
  blogId: BlogIds.PRIVATE_IMAGE_COMPRESSION_GUIDE,
  title: "Private Image Compression: Why Client-Side Tools Are Better",
  slug: "private-image-compression-guide",
  excerpt:
    "Discover why using client-side image compression tools keeps your photos private and secure. Learn the benefits of browser-based compression over server uploads.",
  category: BlogCategory.SECURITY,
  tags: keywords,
  author: {
    name: "Gaurav Kumar Yadav",
    gender: "M",
  },
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readingTimeMinutes: 7,
  isFeatured: true,
  isDisabled: false,
  relatedPosts: [],
  contentFile: "private-image-compression-guide.md",
  metadata,
};
