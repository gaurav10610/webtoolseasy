import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/base64-decode";
const pageTitle = "Base64 Decoder Free - Convert Base64 to File Online";
const pageDescription =
  "Decode Base64 to images, PDFs, text files instantly. Free online Base64 decoder supports all formats. No uploads, secure browser-based conversion.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/base64-decode.png`;

const keywords =
  "base64 decoder,decode base64 online,base64 to file,base64 to image,base64 to pdf,base64 converter,base64 decode tool,online decoder,file decoder";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
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
  keywords,
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
    "Free Online Base64 to File Decoder: Convert Base64 to Image, Text, PDF and File",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.BASE64_ENCODE],
  structuredData: createToolStructuredData({
    pageUrl: "base64-decode",
    pageTitle,
    mainHeading:
      "Free Online Base64 to File Decoder: Convert Base64 to Image, Text, PDF and File",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Base64 Decoding?",
    blockData: [
      "Base64 decoding converts encoded Base64 strings back to their original file format. Our free online Base64 decoder helps you convert Base64 encoded data to images, PDFs, text files, and other document types instantly.",
      "Base64 encoding is commonly used in web applications, email attachments, and data transmission. When you need to decode Base64 strings, our tool provides secure, browser-based conversion without uploading files to servers.",
    ],
  },
  {
    heading: "How to Use Our Base64 to File Decoder",
    listData: [
      "Paste your Base64 encoded string into the input field",
      "The tool automatically detects the file type and shows a preview",
      "Download the decoded file or copy the text content",
      "Works with images (JPG, PNG, GIF), documents (PDF, TXT), and other file formats",
      "No file size limits or registration required",
    ],
  },
  {
    heading: "Why Choose Our Online Base64 Decoder?",
    listData: [
      "100% free with no hidden costs or premium features",
      "Secure processing - all decoding happens in your browser",
      "Supports all Base64 variants including URL-safe and MIME encoding",
      "Instant results with real-time preview for supported file types",
      "Works on desktop, tablet, and mobile devices",
      "No software installation or account creation needed",
    ],
  },
  {
    heading: "Common Use Cases for Base64 Decoding",
    blockData: [
      "**Web Development**: Decode Base64 images embedded in CSS or HTML",
      "**Email Processing**: Extract attachments from Base64 encoded email content",
      "**API Integration**: Process Base64 data from REST APIs and web services",
      "**Data Recovery**: Restore files from Base64 backup strings",
      "**Debugging**: Analyze encoded data during development and testing",
    ],
  },
];
