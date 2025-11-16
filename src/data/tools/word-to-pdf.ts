import { Metadata } from "next";
import { ApplicationConfig } from "@/types/config";
import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/word-to-pdf";
const pageTitle = "Word to PDF Converter - Convert DOCX to PDF Free";
const pageDescription =
  "Convert Word documents to PDF format online. Free DOCX to PDF converter with perfect formatting preservation directly in your browser.";
const keywords =
  "word to pdf,docx to pdf,convert word to pdf,doc to pdf,word to pdf converter,docx to pdf online,free word to pdf,doc to pdf converter";

export const metadata: Metadata = {
  alternates: {
    canonical: navigationUrl,
  },
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  metadataBase: new URL(`https://webtoolseasy.com${navigationUrl}`),
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: navigationUrl,
    images: [
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "Word to PDF Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: ["/web-app-manifest-512x512.png"],
  },
  authors: [{ name: "Gaurav Kumar Yadav" }],
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Word to PDF Converter",
  navigationUrl: navigationUrl,
  pageTitle: pageTitle,
  tags: keywords.split(","),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.PDF_SPLIT,
    ApplicationIds.PDF_MERGE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "word-to-pdf",
    pageTitle: pageTitle,
    mainHeading: "Word to PDF Converter",
    keywords: keywords.split(","),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Word to PDF Converter?",
    blockData: [
      "Our Word to PDF converter transforms Microsoft Word documents (DOCX, DOC) into professional PDF files while preserving all formatting, images, tables, and layout. Convert Word files to PDF format directly in your browser with no installations required. Perfect for sharing documents that need to look the same on every device.",
    ],
  },
  {
    heading: "How to Convert Word to PDF",
    listData: [
      "Upload your Word document (DOCX or DOC file)",
      "Wait for the tool to process and render your document",
      "Preview the PDF output to verify formatting",
      "Click 'Download PDF' to save your converted file",
      "Share or print your PDF with confidence",
    ],
  },
  {
    heading: "Key Features",
    listData: [
      "Fast DOCX to PDF conversion in your browser",
      "Preserves all formatting, fonts, and styles",
      "Maintains images, tables, and charts exactly",
      "Header and footer support",
      "No file size limitations",
      "100% free with no watermarks",
      "Works offline after initial load",
      "Compatible with all Word versions",
    ],
  },
  {
    heading: "When to Use Word to PDF Converter",
    listData: [
      "Share documents that shouldn't be edited",
      "Create professional reports and proposals",
      "Submit applications and forms",
      "Archive important documents securely",
      "Email contracts that need signatures",
      "Print documents with guaranteed formatting",
      "Convert resumes for job applications",
      "Create portable versions of manuals",
    ],
  },
  {
    heading: "Conversion Tips",
    listData: [
      "Ensure all fonts are standard for best results",
      "Complex tables convert accurately to PDF",
      "Images are embedded at original quality",
      "Page breaks are preserved exactly",
      "Review PDF before sending to recipients",
      "Large documents may take longer to process",
      "Use PDF Merge to combine multiple Word files",
      "Password protect sensitive PDFs after conversion",
    ],
  },
  {
    heading: "Why Choose Our Word to PDF Converter?",
    blockData: [
      "Unlike online services that upload your documents to unknown servers, our tool converts everything locally in your browser. Your sensitive business documents, contracts, and personal files never leave your device. Get instant conversion with perfect formatting, no registration required, and complete privacy protection.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All Word to PDF conversion happens entirely in your web browser. No files are uploaded to servers, ensuring complete confidentiality for sensitive documents. Your Word files are automatically cleared from memory after conversion, leaving no trace.",
    ],
  },
];
