import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-unlock";
const pageTitle = "PDF Unlock Tool - Remove Password Protection from PDF Files";
const pageDescription =
  "Free online PDF unlock tool to remove password protection from PDF files. Upload your password-protected PDF, enter the password, and download the unlocked version instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-unlock.png`;

const keywords =
  "pdf unlock,pdf password remover,unlock pdf,remove pdf password,decrypt pdf,pdf protection removal,password protected pdf,unlock encrypted pdf,pdf password breaker,remove pdf security";

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
    "PDF Unlock Tool: Remove Password Protection from PDF Files Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.PDF_PROTECT,
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.BASE64_ENCODE,
    ApplicationIds.BASE64_DECODE,
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.JSON_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-unlock",
    pageTitle,
    mainHeading:
      "PDF Unlock Tool: Remove Password Protection from PDF Files Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF Password Protection?",
    blockData: [
      "PDF password protection is a security feature that encrypts PDF documents to prevent unauthorized access. Our free online PDF unlock tool helps you remove password protection from PDF files when you have the correct password.",
      "Password-protected PDFs use encryption to secure sensitive documents. There are two types of PDF passwords: user passwords (open passwords) that control document access, and owner passwords that restrict editing, printing, and copying. Our tool can remove user passwords to make PDFs freely accessible.",
    ],
  },
  {
    heading: "PDF Security Features Explained",
    listData: [
      "User Password - Controls who can open and view the PDF document",
      "Owner Password - Restricts editing, printing, and copying permissions",
      "128-bit Encryption - Standard encryption level for PDF security",
      "256-bit Encryption - Advanced encryption for highly sensitive documents",
      "Digital Signatures - Verify document authenticity and integrity",
      "Certificate Security - Enterprise-level PDF protection methods",
    ],
  },
  {
    heading: "How to Use the PDF Unlock Tool",
    blockData: [
      "Using our PDF unlock tool is simple and secure. Upload your password-protected PDF file, enter the correct password, and our tool will remove the password protection while maintaining the original document quality and formatting.",
      "The entire process happens in your browser, ensuring your sensitive documents never leave your device. Once unlocked, you can download the password-free PDF and share it without restrictions.",
    ],
  },
  {
    heading: "Benefits of Removing PDF Password Protection",
    listData: [
      "Easier document sharing without password requirements",
      "Simplified backup and archival processes",
      "Enhanced workflow efficiency for document processing",
      "Compatibility with automated document systems",
      "Reduced risk of password loss or forgotten credentials",
      "Seamless integration with document management systems",
    ],
  },
  {
    heading: "PDF Security Best Practices",
    blockData: [
      "While removing password protection can be useful, it's important to maintain document security when needed. Only unlock PDFs when you have legitimate access and consider the sensitivity of the content.",
      "For highly confidential documents, consider using alternative security measures like access controls, digital rights management, or secure document sharing platforms instead of removing all protection.",
    ],
  },
  {
    heading: "Common PDF Password Issues",
    listData: [
      "Forgotten passwords preventing document access",
      "Multiple password requirements for different operations",
      "Compatibility issues with older PDF readers",
      "Workflow disruptions due to password prompts",
      "Difficulty sharing protected documents with teams",
      "Problems with automated document processing systems",
    ],
  },
];
