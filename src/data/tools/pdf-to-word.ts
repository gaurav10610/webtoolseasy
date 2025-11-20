import { Metadata } from "next";
import { ApplicationConfig } from "@/types/config";
import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-to-word";
const pageTitle = "PDF to Word Converter - Convert PDF to DOCX Free";
const pageDescription =
  "Convert PDF files to editable Word documents online. Free PDF to DOCX converter with text and formatting preservation in your browser.";
const keywords =
  "pdf to word,pdf to docx,convert pdf to word,pdf converter,pdf to word converter,pdf to doc,pdf to word online,free pdf to word";

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
    description: pageDescription,
    type: "website",
    url: navigationUrl,
    images: [
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "PDF to Word Converter",
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
  mainHeading: "PDF to Word Converter",
  navigationUrl: navigationUrl,
  pageTitle: pageTitle,
  tags: keywords.split(","),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.PDF_SPLIT,
    ApplicationIds.PDF_MERGE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-to-word",
    pageTitle: pageTitle,
    mainHeading: "PDF to Word Converter",
    keywords: keywords.split(","),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF to Word Converter?",
    blockData: [
      "Our PDF to Word converter is a powerful online tool that transforms your PDF documents into fully editable Microsoft Word files (DOCX format). Convert PDF files to Word documents while preserving text, formatting, tables, and images. All conversion happens securely in your browser with no file uploads to servers.",
    ],
  },
  {
    heading: "How to Convert PDF to Word",
    listData: [
      "Upload your PDF file by clicking 'Upload PDF' button",
      "Wait for the tool to extract text and content from your PDF",
      "Preview the converted content before downloading",
      "Click 'Download DOCX' to save your editable Word document",
      "Open the file in Microsoft Word or compatible editors",
    ],
  },
  {
    heading: "Key Features",
    listData: [
      "Fast PDF to DOCX conversion directly in your browser",
      "Text extraction with formatting preservation",
      "Table and list structure recognition",
      "Image extraction from PDF documents",
      "No file size limits - convert large PDFs",
      "100% free with no watermarks or restrictions",
      "Works offline after initial page load",
      "Compatible with all PDF versions",
    ],
  },
  {
    heading: "When to Use PDF to Word Converter",
    listData: [
      "Edit text content from PDF documents",
      "Reuse PDF content in new Word documents",
      "Extract tables and data for spreadsheets",
      "Modify contracts, reports, or forms",
      "Convert scanned PDF documents (OCR)",
      "Create editable versions of read-only PDFs",
      "Repurpose PDF content for presentations",
      "Archive documents in editable format",
    ],
  },
  {
    heading: "Conversion Tips",
    listData: [
      "Best results with text-based PDFs (not scanned images)",
      "Complex layouts may require minor formatting adjustments",
      "Images are extracted and embedded in Word document",
      "Tables are converted to Word table format",
      "Font matching depends on system fonts available",
      "Review converted document before final use",
      "Use PDF Editor for minor PDF adjustments first",
      "Large PDFs may take longer to process",
    ],
  },
  {
    heading: "Why Choose Our PDF to Word Converter?",
    blockData: [
      "Unlike online converters that upload your sensitive documents to unknown servers, our tool processes everything locally in your browser. You get instant conversion with complete privacy protection, no file size limits, and no registration required. Perfect for business documents, legal contracts, and personal files that require confidentiality.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your PDF files never leave your device. All conversion operations happen entirely in your web browser using client-side JavaScript. No data is sent to servers, ensuring complete privacy for sensitive documents. Your files are automatically cleared from memory after conversion.",
    ],
  },
];
