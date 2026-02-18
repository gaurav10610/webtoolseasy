import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const pageTitle = "Regex Tester Online - Test & Debug Regular Expressions Free";
const pageDescription =
  "Test regular expressions with real-time matching and highlighting. Free online regex tester with match groups, flags support, and common pattern library. Debug regex patterns instantly.";
const keywords =
  "regex tester,regex tester online,regular expression tester,regex checker,regex debugger,test regex,regex validator,regex online,regex editor,regex pattern tester,regex match,regex replace,regex101 alternative,regex tester free,regular expression checker";
const navigationUrl = "/tools/regex-tester";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/regex-tester.png`;

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
  mainHeading:
    "Free Online Regex Tester - Test Regular Expressions & Validate Patterns",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.CASE_CONVERETR,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "regex-tester",
    pageTitle,
    mainHeading:
      "Free Online Regex Tester - Test Regular Expressions & Validate Patterns",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Is my test data private when using this regex tester?",
        answer:
          "Yes, all regex testing happens 100% in your browser. Your patterns and test strings are never uploaded to any server, ensuring complete privacy for sensitive data.",
      },
      {
        question: "Does this regex tester work offline?",
        answer:
          "Yes, once the page loads, you can use the regex tester completely offline. All pattern matching is done locally using JavaScript's built-in regex engine.",
      },
      {
        question: "What regex flavors are supported?",
        answer:
          "This tool uses JavaScript's native regex engine (ECMAScript), which supports features like lookahead, lookbehind, named capture groups, and Unicode property escapes.",
      },
      {
        question: "Is this regex tester free to use?",
        answer:
          "Yes, our regex tester is completely free with no limits. Test as many patterns as you need with no signup or registration required.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Regex Tester?",
    blockData: [
      "A regex tester is an online tool that allows you to test and validate regular expressions (regex) against sample text. It helps developers and data analysts verify that their regex patterns work correctly before implementing them in code.",
      "Our free regex tester provides real-time feedback, showing matches, groups, and capture details as you type. It supports all common regex flags and provides detailed information about each match found in your test string.",
    ],
  },
  {
    heading: "Key Features of Our Regex Tester",
    blockData: [
      "• Real-time regex testing with instant feedback",
      "• Support for all regex flags (global, ignore case, multiline, etc.)",
      "• Detailed match information including position and groups",
      "• Syntax highlighting for matched text",
      "• Named capture groups support",
      "• Error detection and validation",
      "• Copy and share functionality",
      "• Quick regex reference guide",
    ],
  },
  {
    heading: "How to Use the Regex Tester",
    blockData: [
      "1. Enter your regular expression pattern in the regex input field",
      "2. Select appropriate flags (global, ignore case, multiline, etc.)",
      "3. Input your test string in the text area",
      "4. View real-time results with highlighted matches",
      "5. Examine detailed match information including groups and positions",
      "6. Use the reference guide for common regex patterns",
      "7. Copy your regex or share a link to your test",
    ],
  },
  {
    heading: "Common Regex Patterns",
    blockData: [
      "• Email validation: \\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
      "• Phone numbers: \\+?[1-9]\\d{1,14}",
      "• URLs: https?://[\\w\\-\\.]+\\.[a-z]{2,}[/\\w\\-\\._~:/?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=]*",
      "• Dates (YYYY-MM-DD): \\d{4}-\\d{2}-\\d{2}",
      "• IP addresses: \\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
      "• Credit card numbers: \\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}",
    ],
  },
  {
    heading: "Regex Flags Explained",
    blockData: [
      "• Global (g): Finds all matches instead of stopping after the first",
      "• Ignore Case (i): Makes the pattern case-insensitive",
      "• Multiline (m): ^ and $ match start/end of each line, not just string",
      "• Dot All (s): Makes . match newline characters",
      "• Unicode (u): Enables full Unicode support",
      "• Sticky (y): Matches only from the index indicated by lastIndex",
    ],
  },
  {
    heading: "Why Use Our Regex Tester?",
    blockData: [
      "• Free and no registration required",
      "• Works entirely in your browser - no data sent to servers",
      "• Real-time testing and validation",
      "• Comprehensive match details and debugging info",
      "• Built-in regex reference for learning",
      "• Copy and share functionality for collaboration",
      "• Mobile-friendly responsive design",
      "• Fast and lightweight interface",
    ],
  },
];
