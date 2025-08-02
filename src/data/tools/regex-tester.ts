import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const pageTitle = "Regex Tester Online - Test Regular Expressions Free";
const pageDescription =
  "Free regex tester & validator. Test regular expressions with real-time matching, flags support, and detailed match results online.";
const keywords =
  "regex tester, regular expression tester, regex validator, regex checker, regex debugger, regex online, pattern matching, regex flags, regex groups, regex tutorial";
const navigationUrl = "/tools/regex-tester";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/regex-tester.png`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
  icons: [],
  relatedTools: [
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.CASE_CONVERETR,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
  ],
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
