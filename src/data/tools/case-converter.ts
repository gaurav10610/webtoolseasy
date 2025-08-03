import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/case-converter";
const pageTitle = "Text Case Converter - Upper Lower Title Case Online";
const pageDescription =
  "Convert text to uppercase, lowercase, title case, or sentence case instantly. Free online case converter tool for all your text formatting needs.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/case-converter.png`;

const keywords =
  "case converter,text case converter,uppercase converter,lowercase converter,title case,sentence case,text formatter,convert case online";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
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
    "Online Case Converter: Convert Text to Lowercase, Uppercase, Sentence Case & Title Case",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Text Case Conversion?",
    blockData: [
      "Text case conversion transforms text between different letter cases including uppercase, lowercase, title case, sentence case, and camelCase. Our free online case converter tool helps writers, developers, and content creators quickly format text for various purposes without manual retyping.",
      "Whether you're formatting headings, coding variable names, or preparing content for publication, our case converter handles multiple text transformations instantly. It supports advanced formatting options like alternating case, inverse case, and programming-specific formats.",
    ],
  },
  {
    heading: "Available Text Case Formats",
    listData: [
      "UPPERCASE - Converts all letters to capital letters",
      "lowercase - Converts all letters to small letters",
      "Title Case - Capitalizes First Letter Of Each Word",
      "Sentence case - Capitalizes only the first letter",
      "camelCase - Removes spaces and capitalizes each word except first",
      "PascalCase - Like camelCase but capitalizes the first word too",
      "snake_case - Replaces spaces with underscores and uses lowercase",
      "kebab-case - Replaces spaces with hyphens and uses lowercase",
    ],
  },
  {
    heading: "Use Cases for Case Conversion",
    blockData: [
      "**Programming**: Convert variable names between camelCase, snake_case, and PascalCase",
      "**Content Writing**: Format titles, headings, and social media posts correctly",
      "**Data Processing**: Standardize text data for databases and spreadsheets",
      "**SEO Optimization**: Create properly formatted URLs and meta tags",
      "**Documentation**: Ensure consistent formatting across technical documents",
    ],
  },
  {
    heading: "Why Use Our Case Converter Tool?",
    listData: [
      "Instant conversion between 8+ different text formats",
      "Preserves text structure while changing case",
      "Handles special characters and numbers correctly",
      "Perfect for bulk text processing and formatting",
      "No character limits or usage restrictions",
      "Works on any device with copy/paste functionality",
    ],
  },
];
