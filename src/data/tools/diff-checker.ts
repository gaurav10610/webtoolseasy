import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/diff-checker";
const pageTitle = "Diff Checker - Compare Text & Code Differences Online";
const pageDescription =
  "Compare two text files or code blocks instantly. Free diff checker tool highlights differences side-by-side for easy comparison and debugging.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/diff-checker.png`;

const keywords =
  "diff checker,text compare,code diff,difference checker,file comparison,text diff,compare files,diff tool";

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
  mainHeading: "Free Diff Checker: Compare Text & Code Online Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.CODE_MINIFIER,
    ApplicationIds.JS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "diff-checker",
    pageTitle,
    mainHeading: "Free Diff Checker: Compare Text & Code Online Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Compare Text and Code Differences Instantly",
    blockData: [
      "Our free diff checker tool helps you compare two text blocks or code files and instantly highlights the differences between them. Perfect for developers reviewing code changes, writers comparing document versions, or anyone needing to spot differences between two text sources quickly and accurately.",
      "The side-by-side comparison view makes it easy to see what's been added, removed, or modified. Whether you're debugging code, reviewing edits, or merging changes, our diff tool provides clear visual indicators to help you understand exactly what changed.",
    ],
  },
  {
    heading: "How to Use the Diff Checker",
    listData: [
      "Paste your original text or code in the left panel",
      "Paste the modified version in the right panel",
      "View highlighted differences in real-time",
      "Added lines shown in green, removed in red",
      "Navigate through changes easily",
      "Copy results or export comparison report",
    ],
  },
  {
    heading: "Diff Checker Features",
    listData: [
      "Side-by-side text and code comparison",
      "Real-time difference highlighting",
      "Line-by-line comparison view",
      "Support for large text files",
      "Works with any programming language",
      "Character-level diff precision",
      "No file size limits",
      "100% free with no registration",
      "Privacy-focused: all processing in browser",
      "Export comparison results",
    ],
  },
  {
    heading: "Why Use a Diff Checker?",
    blockData: [
      "Diff checkers are essential tools for developers working with version control systems like Git. They help you review code changes before committing, understand what modifications were made by team members, and identify bugs introduced in recent updates. The visual comparison makes complex changes easier to comprehend than reading raw diff output.",
      "Beyond programming, diff tools are valuable for content creators, editors, and anyone managing documents. Compare contract versions, track article revisions, verify translations, or audit configuration files. The ability to quickly spot differences saves time and prevents errors from slipping through.",
    ],
  },
  {
    heading: "Common Use Cases",
    listData: [
      "Code review: Compare pull request changes before merging",
      "Debugging: Identify what changed between working and broken code",
      "Document comparison: Track revisions in articles or contracts",
      "Configuration files: Verify settings between environments",
      "Data validation: Compare API responses or database exports",
      "Translation review: Check translated vs original text",
      "Merge conflicts: Resolve differences when merging branches",
      "Quality assurance: Verify copied content matches source",
    ],
  },
  {
    heading: "Understanding Diff Output",
    blockData: [
      "Our diff checker uses color coding to make changes obvious at a glance. Green highlighting indicates added lines or characters that appear in the modified version but not the original. Red highlighting shows removed content that existed in the original but was deleted in the new version.",
      "Unchanged lines appear with normal formatting, allowing you to focus on what actually changed. Line numbers help you locate specific modifications in larger files. The side-by-side view lets you see context around changes, making it easier to understand why modifications were made.",
    ],
  },
  {
    heading: "Tips for Effective Comparison",
    blockData: [
      "Format your code consistently before comparing to avoid false differences from whitespace or indentation variations. Many diff tools can ignore whitespace changes if needed, focusing only on actual code modifications.",
      "When comparing large files, use your browser's search function to quickly jump to specific sections. Look for keywords or function names to navigate to areas of interest without scrolling through the entire comparison.",
      "For complex changes, review differences in small sections rather than trying to understand everything at once. Focus on one function or paragraph at a time to maintain accuracy and avoid missing important changes.",
    ],
  },
];
