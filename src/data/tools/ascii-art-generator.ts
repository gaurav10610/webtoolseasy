import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/ascii-art-generator";
const pageTitle = "ASCII Art Generator - Text to ASCII Art Converter";
const pageDescription =
  "Convert text to ASCII art online. Create cool ASCII text art with multiple fonts and styles. Free ASCII generator for banners and designs.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/ascii-art-generator.png`;

const keywords =
  "ascii art generator,text to ascii,ascii art maker,ascii text generator,ascii art converter,ascii banner,text art generator";

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
  mainHeading: "ASCII Art Generator: Convert Text to ASCII Art Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.CASE_CONVERETR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "ascii-art-generator",
    pageTitle,
    mainHeading: "ASCII Art Generator: Convert Text to ASCII Art Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is ASCII Art?",
    blockData: [
      "ASCII art is a graphic design technique that uses printable ASCII characters to create visual representations. Our ASCII art generator converts regular text into stylized art using various fonts and characters, perfect for banners, signatures, social media posts, and code comments.",
    ],
  },
  {
    heading: "Why Use Our ASCII Art Generator?",
    listData: [
      "Multiple font styles - Choose from various ASCII art fonts",
      "Instant conversion - See results in real-time as you type",
      "Copy with one click - Easy copying to clipboard",
      "Preview different styles - Compare multiple fonts side by side",
      "No installation needed - Create ASCII art directly in browser",
      "Free and unlimited - Generate as much ASCII art as you want",
      "Perfect formatting - Maintains spacing and alignment",
    ],
  },
  {
    heading: "How to Create ASCII Art?",
    listData: [
      "Enter your text in the input field",
      "Choose from available ASCII art fonts",
      "Preview your ASCII art in real-time",
      "Adjust text or try different fonts",
      "Copy the generated ASCII art",
      "Paste into your project, email, or social media",
    ],
  },
  {
    heading: "ASCII Art Use Cases",
    listData: [
      "Code comments - Make your source code headers stand out",
      "README files - Create eye-catching project documentation",
      "Email signatures - Add personality to your emails",
      "Social media - Create unique text-based posts",
      "Terminal banners - Welcome messages for CLI applications",
      "Text files - Add visual elements to plain text documents",
      "Retro designs - Create nostalgic computer art",
    ],
  },
  {
    heading: "ASCII Art Tips",
    listData: [
      "Keep text short for better readability",
      "Test different fonts to find the best style",
      "Use monospace fonts when displaying ASCII art",
      "Consider your output width - some fonts are wider",
      "Preview in your target application before using",
      "ASCII art works best with simple, clear text",
      "Use uppercase for more dramatic effects",
    ],
  },
];
