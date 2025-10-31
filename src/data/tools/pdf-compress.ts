import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-compress";
const pageTitle = "PDF Compress - Reduce PDF File Size Online Free";
const pageDescription =
  "Free online PDF compressor. Reduce PDF file size without losing quality. Compress large PDFs for email, web upload in your browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-compress.png`;
const keywords =
  "pdf compress,compress pdf,reduce pdf size,pdf compressor,shrink pdf,make pdf smaller,pdf size reducer,optimize pdf";

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
  mainHeading: "PDF Compress: Reduce PDF File Size Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.IMAGE_RESIZER,
    ApplicationIds.PDF_MERGE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-compress",
    pageTitle,
    mainHeading: "PDF Compress: Reduce PDF File Size Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF Compress?",
    blockData: [
      "PDF Compress is a free online tool that reduces PDF file size while maintaining acceptable quality. Our browser-based compressor uses advanced techniques to optimize images, remove redundant data, and compress fonts - all on your device without uploading files to a server.",
      "Perfect for compressing large PDFs for email attachments (usually 25MB limit), faster web uploads, reduced storage use, or meeting file size requirements for online forms and applications.",
    ],
  },
  {
    heading: "Compression Features",
    blockData: [
      "• Multiple compression levels (Low, Medium, High)",
      "• Image quality optimization",
      "• Remove unused resources",
      "• Font subsetting and compression",
      "• Object stream compression",
      "• Real-time size comparison",
      "• No file upload - 100% client-side",
      "• No file size limits",
      "• Free with no watermarks",
    ],
  },
  {
    heading: "How to Compress a PDF",
    blockData: [
      "1. Click 'Select PDF File' to upload",
      "2. View original file size",
      "3. Choose compression level (Low/Medium/High)",
      "4. Click 'Compress PDF' to process",
      "5. Preview compressed result and size reduction",
      "6. Compare original vs compressed size",
      "7. Download optimized PDF",
    ],
  },
  {
    heading: "When to Compress PDFs",
    blockData: [
      "• Email attachments exceeding size limits",
      "• Faster website loading times",
      "• Reduce cloud storage usage",
      "• Meet upload size requirements",
      "• Optimize PDFs for mobile viewing",
      "• Archive documents efficiently",
      "• Share large files more easily",
      "• Improve PDF loading speed",
    ],
  },
  {
    heading: "Compression Level Guide",
    blockData: [
      "Low Compression: Minimal size reduction (10-20%) with near-original quality. Best for PDFs with important images or diagrams where quality is critical.",
      "Medium Compression: Balanced size reduction (30-50%) with good quality. Recommended for most documents, suitable for general use and email attachments.",
      "High Compression: Maximum size reduction (50-70%) with acceptable quality. Best for text-heavy PDFs or when file size is more important than image quality.",
    ],
  },
];
