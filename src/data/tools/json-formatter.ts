import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/json-formatter";
const pageTitle = "JSON Formatter - Beautify & Format JSON Data Online";
const pageDescription =
  "Format and beautify JSON data with our free online JSON formatter. Clean, indent, and validate JSON with syntax highlighting and error detection.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/json-format.png`;

const keywords =
  "json formatter,json beautifier,format json online,json validator,beautify json,json prettifier,json parser,validate json";

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
  mainHeading:
    "Free Online JSON Beautifier and Formatter: Beautify and Format Your JSON Data",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.CSS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "json-formatter",
    pageTitle,
    mainHeading:
      "Free Online JSON Beautifier and Formatter: Beautify and Format Your JSON Data",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is JSON Formatting and Validation?",
    blockData: [
      "JSON formatting transforms compact or minified JSON data into readable, properly indented format with syntax highlighting. Our free online JSON formatter instantly beautifies JSON while validating syntax errors and structure.",
      "Professional JSON formatting is crucial for API development, configuration files, and data analysis. Use our tool to make JSON data more readable and catch formatting errors before deployment.",
    ],
  },
  {
    heading: "How to Format and Validate JSON",
    listData: [
      "Paste your minified or unformatted JSON data into the input area",
      "Choose indentation style (2 or 4 spaces) for consistent formatting",
      "Click 'Format JSON' to beautify and validate your data instantly",
      "View syntax errors highlighted with detailed error messages",
      "Copy formatted JSON or download as .json file for your projects",
    ],
  },
  {
    heading: "Why Use Our JSON Formatter?",
    listData: [
      "Free online tool with advanced syntax validation and error detection",
      "Supports large JSON files up to 10MB with fast processing",
      "Real-time syntax highlighting makes errors easy to spot and fix",
      "Customizable formatting options for different coding standards",
      "Secure browser-based processing - your data never leaves your device",
      "Works perfectly on mobile, tablet, and desktop devices",
    ],
  },
  {
    heading: "JSON Formatting Best Practices",
    blockData: [
      "• **Consistent Indentation**: Use consistent spacing (2 or 4 spaces) throughout JSON files",
      "• **Property Names**: Always use double quotes for JSON property names",
      "• **Data Types**: Validate that strings, numbers, booleans are properly formatted",
      "• **API Development**: Format JSON responses for better debugging and testing",
      "• **Configuration Files**: Well-formatted JSON configs are easier to maintain and update",
    ],
  },
];
