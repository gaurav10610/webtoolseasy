import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/html-formatter";
const pageTitle = "HTML Formatter Online - Beautify & Format HTML Code";
const pageDescription =
  "Format and beautify HTML code online for free. Clean, indent, and organize HTML markup with proper structure. Improve code readability instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/html-format.png`;

const keywords =
  "html formatter,html beautifier,format html online,html code formatter,beautify html,html prettifier,clean html code,indent html";

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
  mainHeading:
    "Free Online HTML Beautifier and Formatter: Beautify and Format HTML Code",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.CSS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "html-formatter",
    pageTitle,
    mainHeading: "Free Online HTML Beautifier and Formatter: Beautify and Format HTML Code",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is HTML Formatting and Beautification?",
    blockData: [
      "HTML formatting (also called HTML beautification) transforms minified or messy HTML code into clean, readable, and properly indented markup. Our free online HTML formatter helps developers organize HTML code with consistent spacing, line breaks, and proper tag alignment.",
      "Well-formatted HTML improves code readability, makes debugging easier, and ensures consistent coding standards across development teams. Whether you're working with generated HTML, legacy code, or compressed markup, our tool instantly beautifies your HTML structure.",
    ],
  },
  {
    heading: "How to Use Our HTML Formatter Tool",
    listData: [
      "Paste your HTML code into the input editor",
      "Click 'Format' to automatically beautify and organize your code",
      "Choose indentation preferences (spaces or tabs)",
      "Copy the formatted HTML or download as a file",
      "Preview the rendered output to verify formatting accuracy",
    ],
  },
  {
    heading: "Key Features of Our HTML Beautifier",
    listData: [
      "Intelligent auto-indentation with customizable spacing",
      "Proper tag nesting and hierarchy visualization",
      "Preserves HTML structure while improving readability",
      "Supports HTML5 and legacy HTML standards",
      "Real-time formatting with instant preview",
      "Works with embedded CSS and JavaScript code",
    ],
  },
  {
    heading: "Benefits for Web Developers",
    blockData: [
      "**Code Maintenance**: Easily read and modify complex HTML structures",
      "**Team Collaboration**: Ensure consistent code formatting across projects",
      "**Debugging**: Quickly identify HTML syntax errors and nesting issues",
      "**Learning**: Understand HTML structure and best practices through formatted examples",
      "**SEO Optimization**: Clean HTML improves search engine crawling and indexing",
    ],
  },
];
