import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-split";
const pageTitle = "PDF Split - Split PDF Pages Online Free";
const pageDescription =
  "Free online PDF splitter. Extract or split PDF pages into separate files. Fast, secure, browser-based with no upload required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-split.png`;
const keywords =
  "pdf split,split pdf,extract pdf pages,pdf page splitter,separate pdf pages,pdf divider,split pdf online,pdf page extractor";

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
  mainHeading: "PDF Split: Extract Pages from PDF Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.PDF_EDITOR, ApplicationIds.PDF_MERGE],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-split",
    pageTitle,
    mainHeading: "PDF Split: Extract Pages from PDF Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF Split?",
    blockData: [
      "PDF Split is a free online tool that allows you to extract specific pages from a PDF or split a PDF into individual page files. Our browser-based splitter uses pdf-lib to process files entirely on your device - no server uploads, ensuring complete privacy.",
      "Perfect for extracting important pages from reports, isolating specific sections, or creating individual files from a multi-page document.",
    ],
  },
  {
    heading: "Features of Our PDF Splitter",
    blockData: [
      "• Split PDF into individual pages",
      "• Extract specific page ranges",
      "• Select multiple pages to extract",
      "• Preview all pages before splitting",
      "• No file upload - 100% client-side processing",
      "• No file size limits",
      "• Fast and secure splitting",
      "• Free with no watermarks",
    ],
  },
  {
    heading: "How to Split PDF Files",
    blockData: [
      "1. Click 'Select PDF File' to upload your document",
      "2. View all pages with thumbnail previews",
      "3. Select pages you want to extract",
      "4. Choose split mode (extract selected or all pages separately)",
      "5. Click 'Split PDF' to process",
      "6. Download individual page files or as a ZIP",
      "7. Your original file remains unchanged",
    ],
  },
  {
    heading: "Why Split PDF Files?",
    blockData: [
      "• Extract important pages from large documents",
      "• Share specific sections without the full file",
      "• Organize document parts separately",
      "• Remove unwanted pages by extracting good ones",
      "• Create single-page invoices or receipts",
      "• Isolate signature pages for signing",
      "• Break up large documents for easier management",
      "• Extract chapters or sections independently",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your PDF never leaves your device. All splitting happens in your browser using JavaScript and WebAssembly. We don't store, view, or have access to your files.",
      "This makes our PDF splitter perfect for sensitive documents like contracts, medical records, financial statements, or confidential business documents.",
    ],
  },
];
