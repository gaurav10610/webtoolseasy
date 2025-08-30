import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/yaml-formatter";
const pageTitle = "YAML Formatter & Validator";
const pageDescription =
  "Format, validate and convert YAML online. Beautify YAML, detect syntax errors, and convert to JSON in the browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/yaml-formatter.png`;

const keywords =
  "yaml formatter,yaml validator,yaml beautifier,format yaml online,convert yaml to json,yaml lint,yaml prettify";

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
  mainHeading: "Free Online YAML Formatter, Validator and Converter",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.CSS_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "yaml-formatter",
    pageTitle,
    mainHeading: "Free Online YAML Formatter, Validator and Converter",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is YAML Formatting and Validation?",
    blockData: [
      "YAML formatting transforms human-readable configuration files into standardized, properly indented YAML. Our free online YAML formatter validates syntax, highlights errors, and helps convert YAML to JSON.",
      "Use this tool to clean, validate, and convert YAML configuration files for APIs, CI/CD, and application configs before deployment.",
    ],
  },
  {
    heading: "How to Use the YAML Formatter",
    listData: [
      "Paste or type YAML into the input editor",
      "Click 'Format YAML' to beautify and validate the syntax",
      "Click 'Convert to JSON' to transform YAML into JSON format",
      "Copy formatted YAML or download the output for your projects",
    ],
  },
  {
    heading: "Why Use Our YAML Formatter",
    listData: [
      "Fast, browser-based YAML formatting and validation",
      "Secure client-side processing - your data stays in your browser",
      "Useful for DevOps, configuration files, and API payloads",
      "Convenient convert to JSON feature for integration with tools",
    ],
  },
];
