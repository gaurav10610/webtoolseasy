import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/json-formatter";
const pageTitle =
  "JSON Formatter & Validator Online - Beautify, Minify & Validate JSON Free";
const pageDescription =
  "Format, beautify, validate, and minify JSON data online. Real-time JSON validation with error line detection, structure stats, and syntax highlighting. Free JSON formatter with no signup required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/json-format.png`;

const keywords =
  "json formatter,json formatter online,json beautifier,json validator,format json,beautify json,minify json,json prettifier,json lint,json checker,json parser,validate json online,json syntax checker,json viewer online,json formatter free,json minifier,pretty print json";

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
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
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
    "JSON Formatter, Validator & Beautifier: Format, Validate and Minify JSON Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
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
      "JSON Formatter, Validator & Beautifier: Format, Validate and Minify JSON Online",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Does this JSON formatter also validate JSON?",
        answer:
          "Yes, our tool validates your JSON in real-time as you type. It shows whether your JSON is valid or invalid, highlights error positions with line and column numbers, and displays structure stats including key count, nesting depth, and data size.",
      },
      {
        question:
          "What is the difference between formatting and minifying JSON?",
        answer:
          "Formatting (beautifying) adds proper indentation and line breaks to make JSON human-readable. Minifying removes all whitespace and line breaks to create the smallest possible JSON string, which is ideal for APIs and data transfer.",
      },
      {
        question: "Is this JSON formatter private?",
        answer:
          "Yes, our JSON formatter is 100% client-side. Your data never leaves your browser and is never uploaded to any server, ensuring complete privacy.",
      },
      {
        question: "Can I use this for large JSON files?",
        answer:
          "Yes, our JSON formatter handles large JSON files efficiently using browser-based processing. It works with JSON data up to several megabytes in size with real-time formatting and validation.",
      },
      {
        question: "What JSON errors does the validator detect?",
        answer:
          "Our validator detects all JSON syntax errors including missing commas, unclosed brackets, invalid property names, trailing commas, duplicate keys, and malformed strings. Error positions are shown with exact line and column numbers.",
      },
    ],
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
