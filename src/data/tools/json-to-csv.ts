import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/json-to-csv";
const pageTitle = "JSON to CSV Converter - Free Online JSON CSV Tool";
const pageDescription =
  "Convert JSON to CSV instantly. Free online tool with real-time preview. Supports nested objects, arrays, large files. No upload needed.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/json-to-csv.png`;
const keywords =
  "json to csv,json csv converter,convert json to csv,json to csv online,json csv tool,json array to csv,json file converter";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
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
  mainHeading: "JSON to CSV Converter - Free Online Tool",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.XML_TO_JSON,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "json-to-csv",
    pageTitle,
    mainHeading: "JSON to CSV Converter - Free Online Tool",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is JSON to CSV Converter?",
    blockData: [
      "JSON to CSV Converter is a free online tool that transforms JSON (JavaScript Object Notation) data into CSV (Comma-Separated Values) format. Our browser-based converter processes files entirely on your device with no server uploads, ensuring complete privacy.",
      "Perfect for developers, data analysts, and anyone who needs to convert API responses, JSON files, or structured data into spreadsheet-friendly CSV format for Excel, Google Sheets, or data analysis tools.",
    ],
  },
  {
    heading: "Features of Our JSON to CSV Tool",
    blockData: [
      "• Paste JSON or upload JSON files",
      "• Real-time conversion and preview",
      "• Handles nested objects and arrays",
      "• Customizable delimiter options",
      "• Automatic column detection",
      "• Download as .csv file instantly",
      "• No file size limits",
      "• 100% client-side processing",
      "• Free with no registration",
    ],
  },
  {
    heading: "How to Convert JSON to CSV",
    blockData: [
      "1. Paste your JSON data in the input area or upload a .json file",
      "2. The tool automatically validates and parses your JSON",
      "3. Preview the converted CSV data in table format",
      "4. Adjust delimiter settings if needed (comma, semicolon, tab)",
      "5. Click 'Download CSV' to save the converted file",
      "6. Open the CSV file in Excel, Google Sheets, or any spreadsheet app",
      "7. Your original JSON data remains unchanged",
    ],
  },
  {
    heading: "Why Convert JSON to CSV?",
    blockData: [
      "• Import API data into Excel or Google Sheets",
      "• Analyze JSON data in spreadsheet format",
      "• Create reports from JSON database exports",
      "• Share data with non-technical stakeholders",
      "• Import into business intelligence tools",
      "• Perform bulk data operations in spreadsheets",
      "• Convert web scraping results for analysis",
      "• Migrate data between different systems",
    ],
  },
  {
    heading: "Handling Complex JSON Structures",
    blockData: [
      "Our tool intelligently handles nested JSON objects by flattening them with dot notation (e.g., 'user.address.city'). Arrays are converted to comma-separated values within cells.",
      "For deeply nested structures, the converter automatically creates columns for all paths, ensuring no data is lost during conversion. This makes it perfect for complex API responses and multi-level data structures.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All JSON processing happens entirely in your browser using JavaScript. Your data never leaves your device, and we don't store, view, or have access to any content you convert.",
      "This makes our tool perfect for sensitive data like customer information, financial records, API credentials, or confidential business data that cannot be uploaded to external servers.",
    ],
  },
];
