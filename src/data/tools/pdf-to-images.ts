import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/pdf-to-images";
const pageTitle = "PDF to Images - Convert PDF to PNG/JPG Online Free";
const pageDescription =
  "Free online PDF to image converter. Convert PDF pages to PNG or JPG images. High quality conversion in your browser with no upload.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/pdf-to-images.png`;
const keywords =
  "pdf to image,pdf to png,pdf to jpg,convert pdf to image,pdf to jpeg,pdf image converter,extract images from pdf,pdf to pictures";

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
  mainHeading: "PDF to Images: Convert PDF Pages to PNG/JPG Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.IMAGES_TO_PDF,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "pdf-to-images",
    pageTitle,
    mainHeading: "PDF to Images: Convert PDF Pages to PNG/JPG Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is PDF to Images Converter?",
    blockData: [
      "PDF to Images is a free online tool that converts PDF pages into high-quality PNG or JPG image files. Our browser-based converter uses react-pdf and canvas to process files entirely on your device - no server uploads, ensuring complete privacy and security.",
      "Perfect for extracting diagrams, charts, infographics, or any PDF content you need as standalone image files for presentations, websites, or social media.",
    ],
  },
  {
    heading: "Features of Our PDF to Image Converter",
    blockData: [
      "• Convert PDF to PNG or JPG format",
      "• High-quality image output",
      "• Convert all pages or specific pages",
      "• Adjustable image quality and resolution",
      "• Preview before downloading",
      "• No file upload - 100% client-side processing",
      "• No file size limits",
      "• Free with no watermarks",
    ],
  },
  {
    heading: "How to Convert PDF to Images",
    blockData: [
      "1. Click 'Select PDF File' to upload your document",
      "2. Choose output format (PNG or JPG)",
      "3. Select pages to convert (all or specific pages)",
      "4. Adjust quality settings if needed",
      "5. Click 'Convert to Images' to process",
      "6. Preview converted images",
      "7. Download individual images or all as ZIP",
    ],
  },
  {
    heading: "Why Convert PDF to Images?",
    blockData: [
      "• Share PDF content on social media",
      "• Extract diagrams or charts for presentations",
      "• Convert slides for web embedding",
      "• Create image thumbnails of PDF pages",
      "• Extract infographics for blog posts",
      "• Convert certificates or awards for display",
      "• Make PDF content accessible in image galleries",
      "• Convert forms to fillable image templates",
    ],
  },
  {
    heading: "PNG vs JPG Format Guide",
    blockData: [
      "PNG format is best for documents with text, line art, or transparent backgrounds. It provides lossless compression and sharp text rendering.",
      "JPG format is ideal for PDF pages with photos or complex images. It creates smaller file sizes with good quality, perfect for web use.",
      "Choose PNG for diagrams, charts, technical drawings, and text-heavy pages. Choose JPG for photo-heavy pages or when file size matters.",
    ],
  },
];
