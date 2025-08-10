import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-protect";
const pageTitle = "PDF Protect Tool - Add Password Security to PDF Files";
const pageDescription =
  "Free online PDF protection tool. Add password security to your PDF files instantly. Secure browser-based processing, no uploads.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-protect.png`;

const keywords =
  "pdf protect,pdf password protection,secure pdf,encrypt pdf,pdf security,password protect pdf,lock pdf,protect pdf file,pdf encryption tool,secure pdf online";

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
  mainHeading: "PDF Protect Tool: Add Password Security to PDF Files Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.PDF_UNLOCK,
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.BASE64_ENCODE,
    ApplicationIds.PASSWORD_GENERATOR,
    ApplicationIds.JSON_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-protect",
    pageTitle,
    mainHeading: "PDF Protect Tool: Add Password Security to PDF Files Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF Password Protection?",
    blockData: [
      "PDF password protection adds security layers to your documents by requiring a password to access the content. Our free online PDF protect tool helps you secure sensitive documents with password encryption for enhanced privacy and data protection.",
      "Password-protected PDFs prevent unauthorized access to confidential information. Whether you're sharing business documents, personal files, or sensitive data, adding password protection ensures only authorized users can view your PDF content.",
    ],
  },
  {
    heading: "PDF Security Features",
    listData: [
      "Password Protection - Require password to open PDF documents",
      "User Access Control - Restrict who can view the document",
      "Document Encryption - Secure PDF content with encryption",
      "Privacy Protection - Keep sensitive information confidential",
      "Business Security - Protect corporate documents and contracts",
      "Personal Privacy - Secure personal documents and files",
    ],
  },
  {
    heading: "How to Use the PDF Protect Tool",
    blockData: [
      "Protecting your PDF with a password is simple and secure. Upload your PDF file, enter a strong password, confirm it, and our tool will create a password-protected version of your document.",
      "The entire process happens in your browser, ensuring your sensitive documents never leave your device. Once protected, you can download the secured PDF and share it knowing only those with the password can access it.",
    ],
  },
  {
    heading: "Benefits of PDF Password Protection",
    listData: [
      "Enhanced document security and privacy protection",
      "Control access to sensitive business information",
      "Comply with data protection and privacy regulations",
      "Prevent unauthorized copying or sharing of content",
      "Secure client-side processing without server uploads",
      "Professional document security for business use",
    ],
  },
  {
    heading: "PDF Protection Best Practices",
    blockData: [
      "Use strong passwords with a combination of letters, numbers, and special characters. Avoid common passwords or easily guessable information like names or dates.",
      "Store passwords securely using a password manager. Share passwords through secure channels separate from the protected document to maintain security integrity.",
    ],
  },
  {
    heading: "Common PDF Protection Use Cases",
    listData: [
      "Protect confidential business documents and contracts",
      "Secure personal financial records and statements",
      "Safeguard medical records and health information",
      "Protect academic papers and research documents",
      "Secure legal documents and court filings",
      "Control access to proprietary information and trade secrets",
    ],
  },
];
