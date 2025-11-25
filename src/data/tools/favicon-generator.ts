import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/favicon-generator";
const pageTitle = "Favicon Generator - Create Favicon from Image Online";
const pageDescription =
  "Generate favicon from any image. Create .ico, PNG favicons in multiple sizes (16x16, 32x32, 64x64). Free online favicon maker.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/favicon-generator.png`;

const keywords =
  "favicon generator,create favicon,favicon maker,ico generator,favicon from image,favicon converter,website favicon,favicon tool";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
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
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
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

export const componentConfig: ApplicationConfig = {
  mainHeading: "Favicon Generator: Create Website Favicons from Images",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.IMAGE_RESIZER,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.IMAGE_COMPRESSOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "favicon-generator",
    pageTitle,
    mainHeading: "Favicon Generator: Create Website Favicons from Images",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Favicon?",
    blockData: [
      "A favicon (favorite icon) is a small image displayed in browser tabs, bookmarks, and address bars to represent a website. Our favicon generator creates professional favicons in multiple sizes and formats from any image, ensuring your website looks polished across all devices and browsers.",
    ],
  },
  {
    heading: "Why Use Our Favicon Generator?",
    listData: [
      "Multiple sizes - Generate 16x16, 32x32, 48x48, and 64x64 favicons",
      ".ICO format support - Create traditional .ico files for broad compatibility",
      "PNG export - Modern PNG format for better quality",
      "Instant preview - See how your favicon looks in different contexts",
      "No upload required - Process images directly in your browser",
      "Free and unlimited - Generate as many favicons as you need",
      "Perfect quality - Optimized for web display",
    ],
  },
  {
    heading: "How to Create a Favicon?",
    listData: [
      "Upload or drag & drop your image (JPG, PNG, or SVG)",
      "Preview how it looks at different sizes",
      "Adjust or crop if needed for better visibility",
      "Download in your preferred format (.ico or PNG)",
      "Add the favicon to your website's HTML",
      "Test in different browsers to ensure compatibility",
    ],
  },
  {
    heading: "Favicon Best Practices",
    listData: [
      "Use simple, recognizable designs that work at small sizes",
      "Choose high-contrast colors for better visibility",
      "Test your favicon at 16x16 pixels (smallest size)",
      "Avoid complex details that won't be visible when small",
      "Use your brand colors for consistency",
      "Keep file size small for faster loading",
      "Provide multiple sizes for different use cases",
    ],
  },
  {
    heading: "Where Are Favicons Used?",
    listData: [
      "Browser tabs - Helps users identify and switch between tabs",
      "Bookmarks bar - Makes saved pages easily recognizable",
      "History list - Improves navigation through browsing history",
      "Mobile home screen - When users add your site to their device",
      "Search engine results - Sometimes displayed in search listings",
      "Browser suggestions - Shown in address bar autocomplete",
    ],
  },
];
