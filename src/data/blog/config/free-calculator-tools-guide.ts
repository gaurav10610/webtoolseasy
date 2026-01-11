import { BlogConfig, BlogIds, BlogCategory } from "@/types/blog-config";
import { Metadata } from "next";

const navigationUrl = "/blog/free-calculator-tools-guide";
const pageTitle =
  "Free Calculator Tools: Financial, Math & Everyday Calculators";
const pageDescription =
  "Free calculators for loans, mortgages, percentages, BMI, and more. All calculations happen in your browser - your financial data stays completely private.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/blog/free-calculator-tools-guide.png`;
const keywords = [
  "free calculator online",
  "emi calculator",
  "mortgage calculator",
  "percentage calculator",
  "bmi calculator",
  "compound interest",
  "tip calculator",
  "unit converter",
  "financial calculator",
  "retirement calculator",
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
  blogId: BlogIds.FREE_CALCULATOR_TOOLS_GUIDE,
  title: pageTitle,
  slug: "free-calculator-tools-guide",
  excerpt:
    "From calculating loan payments to converting units, calculators are essential. Discover free, browser-based calculator tools that protect your financial data.",
  category: BlogCategory.TOOLS,
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
  contentFile: "free-calculator-tools-guide.md",
  metadata,
};
