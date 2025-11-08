import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const pageTitle = "HTML to Markdown Converter - Fast & Accurate Online";
const pageDescription =
  "Convert HTML to Markdown instantly with our free online converter. Accurate, fast conversion works entirely in browser. Perfect for developers and writers.";
const keywords =
  "html to markdown,html to markdown converter,html2md,html markdown online,html to md,html2markdown,html markdown tool,convert html markdown";
const navigationUrl = "/tools/html-to-markdown";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/html-to-markdown.png`;

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
  mainHeading:
    "Free Online HTML to Markdown Converter - Fast, Accurate & Privacy-Friendly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.HTML_TO_MARKDOWN,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "html-to-markdown",
    pageTitle,
    mainHeading:
      "Free Online HTML to Markdown Converter - Fast, Accurate & Privacy-Friendly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an HTML to Markdown Converter?",
    blockData: [
      "An HTML to Markdown converter is a tool that transforms HTML code into clean, readable Markdown format. This is especially useful for developers, writers, and bloggers who want to move content between web and Markdown-based platforms.",
      "Our free converter works entirely in your browser, ensuring privacy and instant results. Paste your HTML, click convert, and get Markdown instantly!",
    ],
  },
  {
    heading: "Key Features of Our HTML to Markdown Tool",
    blockData: [
      "• Instant HTML to Markdown conversion in-browser",
      "• No data sent to servers, privacy guaranteed",
      "• Clean, accurate Markdown output",
      "• Supports all standard HTML tags",
      "• Copy Markdown with one click",
      "• Free and mobile-friendly",
    ],
  },
  {
    heading: "How to Use the HTML to Markdown Converter",
    blockData: [
      "1. Paste or type your HTML code in the input box",
      "2. Click 'Convert HTML to Markdown'",
      "3. View and copy the Markdown output instantly",
      "4. Use the Markdown in your favorite editor or platform",
    ],
  },
  {
    heading: "Why Convert HTML to Markdown?",
    blockData: [
      "• Markdown is easier to read and write than HTML",
      "• Many platforms (GitHub, Notion, blogs) use Markdown",
      "• Simplifies content migration and editing",
      "• Reduces formatting errors and clutter",
    ],
  },
  {
    heading: "Who Should Use This Tool?",
    blockData: [
      "• Developers working with documentation",
      "• Writers and bloggers publishing on Markdown platforms",
      "• Anyone needing quick, accurate HTML to Markdown conversion",
    ],
  },
];
