import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/csv-to-json";
const pageTitle = "CSV to JSON Converter - Free Online CSV JSON Tool";
const pageDescription =
  "Convert CSV to JSON instantly. Free online tool with customizable delimiters and headers. Supports nested objects, arrays, large files. No upload needed.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/csv-to-json.png`;

const keywords =
  "csv to json, csv json converter, convert csv to json, csv to json online, csv json tool, csv file converter, csv parser, json generator";

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
  mainHeading: "CSV to JSON Converter - Free Online Tool",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_TO_CSV,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "csv-to-json",
    pageTitle,
    mainHeading: "CSV to JSON Converter - Free Online Tool",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is CSV to JSON Converter?",
    blockData: [
      "CSV to JSON Converter is a free online tool that transforms CSV (Comma-Separated Values) data into JSON (JavaScript Object Notation) format. Our browser-based converter processes files entirely on your device with no server uploads, ensuring complete privacy.",
      "Perfect for developers, data analysts, and anyone who needs to convert spreadsheet data, Excel exports, or CSV files into JSON format for APIs, databases, or web applications.",
    ],
  },
  {
    heading: "Features of Our CSV to JSON Tool",
    blockData: [
      "• Paste CSV or upload CSV files",
      "• Real-time conversion and preview",
      "• Customizable delimiter (comma, semicolon, tab, pipe)",
      "• First row as header option",
      "• Format output (minified or pretty-printed)",
      "• Automatic data type detection",
      "• Download as .json file instantly",
      "• No file size limits",
      "• 100% client-side processing",
      "• Free with no registration",
    ],
  },
  {
    heading: "How to Convert CSV to JSON",
    blockData: [
      "1. Paste your CSV data or upload a CSV file",
      "2. Select the delimiter (comma, semicolon, tab, or pipe)",
      "3. Choose whether the first row contains headers",
      "4. Click 'Convert to JSON' to generate JSON output",
      "5. Review the formatted JSON in the output panel",
      "6. Download the JSON file or copy to clipboard",
    ],
  },
  {
    heading: "Customization Options",
    blockData: [
      "• Delimiter Selection: Support for comma, semicolon, tab, and pipe delimiters",
      "• Header Row: Use first row as JSON object keys or generate numeric indices",
      "• Output Format: Choose between pretty-printed (readable) or minified (compact) JSON",
      "• Data Types: Automatic detection of numbers, booleans, and null values",
    ],
  },
  {
    heading: "Use Cases",
    blockData: [
      "Convert Excel exports to JSON for APIs, transform spreadsheet data for web apps, prepare data for MongoDB or NoSQL databases, convert analytics reports for visualization tools, migrate data between systems, and process CSV files for JavaScript applications.",
    ],
  },
  {
    heading: "Why Convert CSV to JSON?",
    blockData: [
      "JSON is the standard data format for modern web APIs and applications. Converting CSV to JSON allows you to integrate spreadsheet data with web services, mobile apps, and cloud platforms. JSON's hierarchical structure makes it ideal for nested data and complex relationships.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your CSV data never leaves your device. All conversion happens locally in your browser. No data is uploaded to any server, ensuring complete confidentiality of your data.",
    ],
  },
];
