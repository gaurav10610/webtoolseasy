import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-merge";
const pageTitle = "PDF Merge - Combine PDF Files Online Free";
const pageDescription =
  "Free online PDF merger. Combine multiple PDF files into one document. Fast, secure, browser-based with no upload required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-merge.png`;
const keywords =
  "pdf merge,combine pdf,merge pdf online,join pdf,pdf combiner,merge pdf files,combine pdf files online,pdf joiner";

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
  mainHeading: "PDF Merge: Combine PDF Files Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.PDF_EDITOR, ApplicationIds.PDF_SPLIT],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-merge",
    pageTitle,
    mainHeading: "PDF Merge: Combine PDF Files Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF Merge?",
    blockData: [
      "PDF Merge is a free online tool that combines multiple PDF documents into a single PDF file. Our browser-based merger uses pdf-lib to process files entirely on your device - no server uploads, ensuring complete privacy and security.",
      "Perfect for combining contracts, reports, invoices, scanned documents, or any PDF files you need merged into one convenient document.",
    ],
  },
  {
    heading: "Features of Our PDF Merger",
    blockData: [
      "• Merge unlimited PDF files",
      "• Drag and drop to reorder pages",
      "• Preview all PDFs before merging",
      "• No file upload - 100% client-side processing",
      "• No file size limits",
      "• Fast and secure merging",
      "• Free with no watermarks",
      "• Works offline once loaded",
    ],
  },
  {
    heading: "How to Merge PDF Files",
    blockData: [
      "1. Click 'Select PDF Files' or drag and drop multiple PDF files",
      "2. View the list of added PDFs in order",
      "3. Drag to reorder PDFs if needed",
      "4. Click 'Merge PDFs' to combine all files",
      "5. Wait for processing to complete",
      "6. Click 'Download' to save your merged PDF",
      "7. Your original files remain unchanged",
    ],
  },
  {
    heading: "Why Merge PDF Files?",
    blockData: [
      "• Combine multiple invoices or receipts",
      "• Merge chapters or sections of reports",
      "• Consolidate scanned documents",
      "• Create comprehensive portfolios",
      "• Organize contracts and agreements",
      "• Combine assignment pages for submission",
      "• Simplify file management and sharing",
      "• Reduce email attachments from multiple to one",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your PDFs never leave your device. All merging happens in your browser using JavaScript and WebAssembly. We don't store, view, or have access to your files.",
      "This makes our PDF merger perfect for sensitive documents like legal contracts, medical records, financial statements, or confidential business documents.",
    ],
  },
];
