import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/sql-formatter";
const pageTitle = "SQL Formatter - Beautify & Format SQL";
const pageDescription =
  "Format and tidy SQL queries for better readability. Convert compact SQL into indented, easy-to-read queries with clause separation and basic formatting.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/sql-formatter.png`;

const keywords =
  "sql formatter,format sql online,sql beautifier,sql prettify,format sql query,sql formatting tool";

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

export const componentConfig: ApplicationConfig = {
  mainHeading: "SQL Formatter - Format and Beautify SQL Queries Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [
    ApplicationIds.SQL_PRACTICE_EDITOR,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.JS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "sql-formatter",
    pageTitle,
    mainHeading: "SQL Formatter - Format and Beautify SQL Queries Online",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is SQL Formatting?",
    blockData: [
      "SQL formatting converts compact or minified SQL queries into readable, well-indented formats. Use this tool to improve readability, debug complex queries, and maintain consistent SQL style.",
    ],
  },
  {
    heading: "How to use",
    listData: [
      "Paste or type your SQL query in the input area",
      "Click 'Format SQL' to apply clause separation and basic indentation",
      "Copy or share the formatted SQL using the toolbar buttons",
    ],
  },
  {
    heading: "Why use this tool",
    blockData: [
      "Fast, client-side SQL formatting with no data sent to servers. Ideal for developers, data analysts, and DBAs who want readable queries instantly.",
    ],
  },
  {
    heading: "Common use cases",
    listData: [
      "Format SQL for code reviews and pull requests",
      "Tidy queries copied from logs or console output",
      "Prepare readable SQL snippets for documentation or reports",
    ],
  },
];
