import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/pdf-editor";
const pageTitle = "PDF Editor Online - Edit, Merge & Split PDFs Free";
const pageDescription =
  "Edit, merge, split, rotate, and annotate PDF files online for free. Add text, combine multiple PDFs, extract pages without registration or downloads.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-editor.png`;

const keywords =
  "pdf editor,merge pdf,split pdf,pdf annotate,edit pdf online,pdf merger,rotate pdf,combine pdf,pdf splitter";

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
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  mainHeading: "Free Online PDF Editor: Edit, Merge, Split & Annotate PDFs",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [
    {
      iconName: "pdf-editor",
      iconRelativeUrl: "markdown.svg",
    },
  ],
  relatedTools: [
    ApplicationIds.IMAGE_TO_TEXT,
    ApplicationIds.QR_CODE_GENERATOR,
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.BASE64_ENCODE,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a PDF Editor?",
    blockData: [
      "A PDF editor is a tool that allows you to modify, annotate, merge, split, and manipulate PDF documents. Our online PDF editor provides comprehensive editing capabilities without requiring any software downloads or installations.",
    ],
  },
  {
    heading: "Why Use an Online PDF Editor?",
    listData: [
      "Edit PDFs instantly without downloading software. Access powerful PDF editing tools directly from your web browser.",
      "Merge multiple PDF files into a single document. Combine contracts, reports, or presentations effortlessly.",
      "Split large PDF files into individual pages or custom sections. Extract specific content from lengthy documents.",
      "Add text annotations and comments for collaboration. Mark up documents for review and feedback.",
      "Rotate pages to correct orientation issues. Fix scanned documents with proper alignment.",
      "Maintain privacy with client-side processing. Your files never leave your device.",
    ],
  },
  {
    heading: "Features of Our Online PDF Editor",
    listData: [
      "Free to use with no registration required. Edit PDFs without creating accounts or providing email.",
      "Comprehensive PDF manipulation tools. Merge, split, rotate, and annotate documents professionally.",
      "Support for large files up to 10MB. Handle substantial documents with ease.",
      "Real-time preview and editing. See changes instantly as you work.",
      "Client-side processing for security. Your documents remain private on your device.",
      "Cross-platform compatibility. Works on Windows, Mac, Linux, and mobile devices.",
      "No watermarks on processed files. Download clean, professional PDFs.",
    ],
  },
  {
    heading: "How to Use Our PDF Editor",
    listData: [
      'Upload your PDF files by dragging and dropping or clicking "Browse Files".',
      "Select the operation you want to perform: merge, split, rotate, or annotate.",
      "Use the preview to review your changes before applying them.",
      "Add text annotations by enabling annotation mode and clicking on the PDF.",
      "Rotate pages using the rotation controls for proper orientation.",
      'Download your edited PDF by clicking the "Download" button.',
    ],
  },
  {
    heading: "Common PDF Editing Use Cases",
    listData: [
      "Merge contracts and legal documents for complete file organization.",
      "Split reports into separate chapters or sections for distribution.",
      "Add review comments and annotations for collaborative document editing.",
      "Rotate scanned documents to correct orientation and improve readability.",
      "Combine multiple files for presentations or comprehensive reports.",
      "Extract specific pages from large documents for focused sharing.",
      "Prepare documents for digital signatures and approval workflows.",
    ],
  },
  {
    blockData: [
      "Our free online PDF editor provides professional-grade tools for all your PDF editing needs. Whether you're merging documents, adding annotations, or splitting files, our secure and user-friendly interface makes PDF editing simple and efficient.",
    ],
  },
];
