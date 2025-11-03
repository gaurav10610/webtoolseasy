import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/images-to-pdf";
const pageTitle = "Images to PDF - Convert JPG/PNG to PDF Online Free";
const pageDescription =
  "Free online image to PDF converter. Combine multiple JPG, PNG images into a single PDF file. Rearrange order, adjust layout in browser.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/images-to-pdf.png`;
const keywords =
  "images to pdf,jpg to pdf,png to pdf,convert images to pdf,image to pdf converter,pictures to pdf,photos to pdf,combine images to pdf";

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
  mainHeading: "Images to PDF: Convert JPG/PNG to PDF Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.PDF_TO_IMAGES,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "images-to-pdf",
    pageTitle,
    mainHeading: "Images to PDF: Convert JPG/PNG to PDF Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Images to PDF Converter?",
    blockData: [
      "Images to PDF is a free online tool that combines multiple image files (JPG, PNG, GIF, BMP) into a single PDF document. Our browser-based converter uses pdf-lib to process files entirely on your device - no server uploads, ensuring complete privacy and security.",
      "Perfect for creating photo albums, combining scanned documents, creating presentations, or consolidating multiple images for easy sharing and printing.",
    ],
  },
  {
    heading: "Features of Our Image to PDF Converter",
    blockData: [
      "• Support for JPG, PNG, GIF, BMP, WEBP formats",
      "• Drag and drop to reorder images",
      "• Custom page size (A4, Letter, Legal, Custom)",
      "• Choose orientation (Portrait or Landscape)",
      "• Fit images to page or maintain original size",
      "• Preview before creating PDF",
      "• No file upload - 100% client-side processing",
      "• No file size or quantity limits",
      "• Free with no watermarks",
    ],
  },
  {
    heading: "How to Convert Images to PDF",
    blockData: [
      "1. Click 'Select Images' to upload your files",
      "2. Drag and drop to rearrange image order",
      "3. Choose page size (A4, Letter, etc.)",
      "4. Select orientation (Portrait/Landscape)",
      "5. Choose image fit option",
      "6. Click 'Create PDF' to process",
      "7. Preview the generated PDF",
      "8. Download your PDF file",
    ],
  },
  {
    heading: "Common Use Cases",
    blockData: [
      "• Combine scanned documents into one PDF",
      "• Create photo albums or portfolios",
      "• Convert multiple receipts to PDF",
      "• Combine screenshots for reports",
      "• Create PDF presentations from images",
      "• Convert charts and diagrams to PDF",
      "• Merge product photos for catalogs",
      "• Combine signatures and forms",
    ],
  },
  {
    heading: "Page Size and Orientation Guide",
    blockData: [
      "A4 (210 × 297 mm) is the international standard page size, ideal for most documents and reports.",
      "Letter (8.5 × 11 inches) is the North American standard, commonly used for business documents.",
      "Legal (8.5 × 14 inches) is used for legal documents and longer forms.",
      "Portrait orientation is best for tall images and standard documents. Landscape orientation works well for wide images, charts, and presentations.",
    ],
  },
];
