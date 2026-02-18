import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/text-compare";
const pageTitle =
  "Text Compare Online - Find Differences Between Two Texts Free";
const pageDescription =
  "Compare two texts side by side and highlight differences instantly. Free online text comparison tool shows additions, deletions, and changes. Perfect for comparing code, documents, and content.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/text-diff.png`;
const keywords =
  "text compare,text compare online,compare two texts,text diff,text comparison tool,find differences between two texts,compare text online,diff checker,text diff online,compare documents online,side by side comparison,text difference finder";

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
    "Free Online Text Compare Tool: Find Differences Between Two Texts Easily",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.WORD_COUNTER],
  structuredData: createToolStructuredData({
    pageUrl: "text-compare",
    pageTitle,
    mainHeading:
      "Free Online Text Compare Tool: Find Differences Between Two Texts Easily",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Advanced Text Comparison and Diff Tool",
    blockData: [
      "Our free online text comparison tool provides detailed side-by-side text analysis, highlighting differences, additions, and deletions between two documents. Perfect for comparing versions, detecting changes, and analyzing text similarity with precise word-level and character-level diff visualization.",
      "Whether you're a developer comparing code versions, a writer checking document revisions, or a student analyzing text variations, our tool delivers comprehensive comparison results with highlighted differences and similarity percentages.",
    ],
  },
  {
    heading: "Comprehensive Text Analysis Features",
    listData: [
      "Side-by-side text comparison with highlighted differences",
      "Word-level and character-level diff detection",
      "Similarity percentage calculation and analysis",
      "Color-coded highlighting for additions, deletions, and changes",
      "Line-by-line comparison for structured text analysis",
      "Export comparison results in multiple formats",
      "Real-time comparison as you type or paste text",
    ],
  },
  {
    heading: "Perfect for Multiple Use Cases",
    blockData: [
      "• **Document Review**: Compare contract versions, policy updates, and legal documents",
      "• **Content Writing**: Check article revisions, blog post updates, and copy variations",
      "• **Academic Work**: Analyze text differences for research and plagiarism detection",
      "• **Code Comparison**: Compare code snippets, configuration files, and scripts",
      "• **Translation Work**: Compare original and translated text versions",
    ],
  },
  {
    heading: "Advanced Comparison Options",
    listData: [
      "Ignore whitespace and formatting differences",
      "Case-sensitive or case-insensitive comparison modes",
      "Highlight-only mode for additions and deletions",
      "Statistical analysis with word count and character count",
      "Unified diff format output for technical users",
      "Split-view and inline comparison layouts",
    ],
  },
];
