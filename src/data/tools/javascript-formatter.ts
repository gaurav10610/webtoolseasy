import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/javascript-formatter";
const pageTitle = "JavaScript Formatter - Beautify & Format JS Code";
const pageDescription =
  "Format and beautify JavaScript code online for free. Clean, indent, and organize JS code with proper structure. Improve code readability instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/js-format.png`;

const keywords =
  "javascript formatter,js formatter,beautify javascript,format javascript online,javascript beautifier,javascript prettifier,js code formatter";

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
    "Free Online JavaScript Beautifier and Formatter: Beautify and Format Your JavaScript Code with Ease",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.CSS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "javascript-formatter",
    pageTitle,
    mainHeading: "Free Online JavaScript Beautifier and Formatter: Beautify and Format Your JavaScript Code with Ease",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is JavaScript Code Formatting?",
    blockData: [
      "JavaScript formatting transforms messy, minified, or inconsistent JavaScript code into clean, readable, and properly indented code. Our free online JavaScript formatter instantly beautifies your JS code with proper spacing, line breaks, and indentation.",
      "Professional code formatting is essential for debugging, code reviews, and maintaining large JavaScript projects. Use our tool to make your code more readable and follow industry standards.",
    ],
  },
  {
    heading: "How to Format JavaScript Code",
    listData: [
      "Paste your minified or unformatted JavaScript code into the input area",
      "Choose your preferred indentation style (spaces or tabs)",
      "Click 'Format' to instantly beautify your JavaScript code",
      "Copy the formatted code or download it as a .js file",
      "Works with ES6, ES2017, Node.js, and all modern JavaScript syntax",
    ],
  },
  {
    heading: "Why Use Our JavaScript Formatter?",
    listData: [
      "100% free online tool with no limitations or premium features",
      "Supports latest JavaScript syntax including async/await and arrow functions",
      "Customizable formatting options for different coding standards",
      "Instant results with syntax highlighting for better code visualization",
      "No file uploads required - all processing happens in your browser",
      "Mobile-friendly interface for formatting code on any device",
    ],
  },
  {
    heading: "JavaScript Formatting Best Practices",
    blockData: [
      "• **Consistent Indentation**: Use 2 or 4 spaces consistently throughout your codebase",
      "• **Meaningful Variable Names**: Format helps reveal unclear variable naming patterns",
      "• **Function Structure**: Proper formatting makes function boundaries and scope clear",
      "• **Code Reviews**: Well-formatted code is easier to review and understand",
      "• **Team Collaboration**: Consistent formatting reduces merge conflicts and improves teamwork",
    ],
  },
];
