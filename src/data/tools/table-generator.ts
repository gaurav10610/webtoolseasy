import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/table-generator";
const pageTitle = "Table Generator - Create HTML, Markdown, CSV Tables";
const pageDescription =
  "Generate tables online free. Create HTML, Markdown, CSV tables with visual editor. Add rows, columns, customize styling instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/table-generator.png`;

const keywords =
  "table generator,html table generator,markdown table generator,csv table,table maker,create table online,table builder";

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
  mainHeading: "Table Generator: Create HTML, Markdown, CSV Tables Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_TO_CSV,
    ApplicationIds.CSV_TO_JSON,
    ApplicationIds.MARKDOWN_EDITOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "table-generator",
    pageTitle,
    mainHeading: "Table Generator: Create HTML, Markdown, CSV Tables Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Table Generator?",
    blockData: [
      "A table generator is an online tool that helps you create formatted tables for HTML, Markdown, CSV, and other formats. Our visual editor makes it easy to add rows, columns, and customize your table without writing code. Perfect for documentation, websites, reports, and data presentation.",
    ],
  },
  {
    heading: "Why Use Our Table Generator?",
    listData: [
      "Multiple export formats - HTML, Markdown, and CSV",
      "Visual editor - See your table as you build it",
      "Easy row/column management - Add or remove with one click",
      "Header row and column styling - Professional appearance",
      "No coding required - Point and click interface",
      "Instant preview - Real-time table updates",
      "Copy and paste - Quick integration into projects",
    ],
  },
  {
    heading: "How to Create Tables?",
    listData: [
      "Start with the default table or set custom dimensions",
      "Click any cell to edit its content",
      "Use add/remove buttons to insert or delete rows and columns",
      "Toggle header row and column styling",
      "Choose your output format (HTML, Markdown, or CSV)",
      "Copy the generated code and paste into your project",
    ],
  },
  {
    heading: "Use Cases for Table Generator",
    listData: [
      "HTML tables for websites and web applications",
      "Markdown tables for GitHub README files and documentation",
      "CSV tables for Excel, Google Sheets, or database imports",
      "Comparison tables and pricing pages",
      "Feature lists and product specifications",
      "Data grids and analytics reports",
    ],
  },
  {
    heading: "Tips for Better Tables",
    listData: [
      "Keep table headers concise and descriptive",
      "Use consistent formatting within columns",
      "For HTML tables, add custom CSS classes for styling",
      "For Markdown tables, align text using colons in separator row",
      "For CSV tables, avoid special characters in cell content",
      "Test responsive behavior for HTML tables on mobile devices",
      "Use header rows and columns to improve readability",
    ],
  },
];
