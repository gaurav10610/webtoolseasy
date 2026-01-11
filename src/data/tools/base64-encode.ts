import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/base64-encode";
const pageTitle =
  "Private Base64 Encoder - Encode Files Offline | No Upload | Free";
const pageDescription =
  "100% client-side Base64 encoder - your files never leave your browser. Convert images, PDFs, and documents to Base64 privately. Works offline.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/base64-encode.png`;

const keywords =
  "base64 encoder,file to base64,base64 converter,encode file online,base64 encoding tool,image to base64,pdf to base64,text to base64,online encoder,private,offline,client-side,secure,no upload,browser-based";

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
    "Free Online File to Base64 Encoder: Convert Image, Text, PDF and File to Base64",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.BASE64_DECODE],
  structuredData: createToolStructuredData({
    pageUrl: "base64-encode",
    pageTitle,
    mainHeading:
      "Free Online File to Base64 Encoder: Convert Image, Text, PDF and File to Base64",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Is Base64 encoding secure?",
        answer:
          "Base64 is encoding, not encryption - it transforms data into a text format but doesn't protect it. For privacy, our tool runs entirely in your browser, so your data never leaves your device.",
      },
      {
        question: "Does this tool upload my data to any server?",
        answer:
          "No, all encoding happens 100% client-side in your browser. Your files and data are never uploaded to any server, ensuring complete privacy.",
      },
      {
        question: "Is this Base64 encoder free to use?",
        answer:
          "Yes, our Base64 encoder is completely free with no limits on file size or number of conversions. No signup or registration required.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Base64 Encoding?",
    blockData: [
      "Base64 encoding converts files and binary data into ASCII text strings for safe transmission and storage. Our free online Base64 encoder transforms images, documents, and other files into Base64 format instantly.",
      "This encoding method is essential for web development, API integrations, and data storage where binary data needs to be represented as text. Use our tool to convert any file to Base64 without uploading to external servers.",
    ],
  },
  {
    heading: "How to Convert Files to Base64",
    listData: [
      "Select or drag and drop your file into the upload area",
      "Choose your preferred output format (with or without data URI prefix)",
      "Click encode to generate the Base64 string instantly",
      "Copy the result or download as a text file",
      "Supports images, PDFs, documents, and other file types up to 50MB",
    ],
  },
  {
    heading: "Why Use Our File to Base64 Encoder?",
    listData: [
      "Completely free with no file size restrictions or premium features",
      "Client-side processing ensures your files never leave your device",
      "Supports all file formats including images, documents, audio, and video",
      "Generate clean Base64 strings or data URIs for immediate use",
      "Mobile-friendly interface works on all devices and browsers",
      "No registration, installation, or software download required",
    ],
  },
  {
    heading: "Common Use Cases for Base64 Encoding",
    blockData: [
      "**Web Development**: Embed images directly in CSS and HTML files",
      "**API Integration**: Send binary data through JSON APIs and web services",
      "**Email Attachments**: Include files in email systems and MIME encoding",
      "**Data Storage**: Store binary data in text-based databases and configurations",
      "**Cross-Platform Transfer**: Share files between different systems and platforms",
    ],
  },
];
