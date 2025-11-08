import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/code-minifier";
const pageTitle = "Code Minifier - JS/CSS/HTML";
const pageDescription =
  "Minify JavaScript, CSS and HTML online. Remove comments and whitespace to reduce bundle size for production.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/code-minifier.png`;

const keywords =
  "code minifier,minify js,minify css,minify html,online minifier,remove comments,minify code";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.HOSTNAME}${navigationUrl}` },
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
    siteName: "WebToolsEasy",
    images: [{ url: imageUrl, secureUrl: imageUrl, alt: pageTitle }],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: { name: "Gaurav Kumar Yadav" },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Online Code Minifier - Minify JS, CSS or HTML",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.CSS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "code-minifier",
    pageTitle,
    mainHeading: "Online Code Minifier - Minify JS, CSS or HTML",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Code Minifier?",
    blockData: [
      "A code minifier reduces file size by removing whitespace, comments, and unnecessary characters from your source code without changing its functionality. This helps improve load times and reduce bandwidth usage in production deployments.",
    ],
  },
  {
    heading: "How to Use",
    listData: [
      "Select the language (JavaScript, CSS, or HTML)",
      "Paste or write your source code in the left editor",
      "Click 'Minify' to generate compact output on the right",
      "Copy or download the minified result for production builds",
    ],
  },
  {
    heading: "Notes and Limitations",
    blockData: [
      "This tool performs a lightweight minification suitable for general use. For advanced optimization (like obfuscation, dead-code elimination, or module bundling) use specialized build tools like terser, cssnano, or HTML minifiers in your build pipeline.",
    ],
  },
];
