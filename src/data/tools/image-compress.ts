import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/image-compress";
const pageTitle =
  "Image Compressor Online - Compress JPG, PNG & WebP Images Free";
const pageDescription =
  "Compress and optimize images online without losing quality. Reduce JPG, PNG, and WebP file sizes by up to 80%. Free image compressor with batch processing, no signup, and instant download.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-compressor.png`;

const keywords =
  "image compressor,compress image online,image compressor online,compress jpg,compress png,reduce image size,image optimizer,photo compressor,compress webp,image compression tool,reduce file size image,compress image without losing quality,bulk image compressor,image size reducer online free";

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
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
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
    "Free Online Image Compressor: Compress JPEG, PNG, WEBP & BMP Images",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.IMAGE_CROPPER],
  structuredData: createToolStructuredData({
    pageUrl: "image-compress",
    pageTitle,
    mainHeading:
      "Free Online Image Compressor: Compress JPEG, PNG, WEBP & BMP Images",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No, image compression happens entirely in your browser. Your photos never leave your device and are never uploaded to any server.",
      },
      {
        question: "Is this image compressor free?",
        answer:
          "Yes, this image compressor is completely free with no file size limits, no watermarks, and no registration required.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "Our compressor supports JPEG, PNG, WebP, GIF, and BMP formats. You can compress multiple images at once and download them individually or as a ZIP file.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Compress Images for Web Optimization?",
    blockData: [
      "Image compression reduces file sizes while maintaining visual quality, making your website load faster and improving user experience. Our free online image compressor optimizes JPG, PNG, and WEBP images for better web performance.",
      "Smaller image files mean faster page loading times, improved SEO rankings, and reduced bandwidth usage. Compress images before uploading to websites, social media, or sharing online.",
    ],
  },
  {
    heading: "How to Compress Images Online",
    listData: [
      "Upload your images by dragging and dropping or clicking to select files",
      "Choose compression level: high quality, balanced, or maximum compression",
      "Process multiple images simultaneously with batch compression",
      "Download compressed images individually or as a ZIP file",
      "Compare before and after file sizes to see compression results",
    ],
  },
  {
    heading: "Image Compression Features",
    listData: [
      "Free unlimited image compression with no file size restrictions",
      "Supports JPG, PNG, WEBP, and BMP image formats",
      "Advanced compression algorithms preserve image quality",
      "Batch processing for compressing multiple images at once",
      "Client-side processing keeps your images private and secure",
      "Instant results with real-time compression preview",
    ],
  },
  {
    heading: "Image Optimization Best Practices",
    blockData: [
      "• **Web Performance**: Optimize images to achieve faster page load speeds",
      "• **SEO Benefits**: Faster sites rank higher in search engine results",
      "• **Mobile Optimization**: Compressed images load quickly on mobile devices",
      "• **Storage Savings**: Reduce server storage costs and bandwidth usage",
      "• **Social Media**: Meet platform size requirements while maintaining quality",
      "• **Email Attachments**: Compress images to fit email size limits",
    ],
  },
];
