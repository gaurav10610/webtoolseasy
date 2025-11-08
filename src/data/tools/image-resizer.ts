import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/image-resizer";
const pageTitle = "Image Resizer - Resize Images Online Free";
const pageDescription =
  "Free online image resizer. Resize, compress, and optimize images instantly. Support for JPG, PNG, WebP. No upload required - works offline.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-resizer.png`;
const keywords =
  "image resizer,resize image,compress image,reduce image size,optimize image,image optimizer,photo resizer,picture resizer,resize photo online";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Image Resizer Tool",
      },
    ],
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    type: "website",
  },
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
  mainHeading: "Image Resizer: Resize & Compress Images Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "image-resizer",
    pageTitle,
    mainHeading: "Image Resizer: Resize & Compress Images Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Image Resizer?",
    blockData: [
      "An image resizer is a free online tool that allows you to resize, compress, and optimize images without losing quality. Our browser-based image resizer works entirely on your device - no files are uploaded to any server, ensuring complete privacy and security.",
      "Perfect for preparing images for websites, social media, email attachments, or reducing file size while maintaining visual quality. Supports JPG, PNG, WebP and other popular image formats.",
    ],
  },
  {
    heading: "Features of Our Image Resizer",
    blockData: [
      "• Resize images by dimensions (width x height)",
      "• Maintain aspect ratio automatically",
      "• Compress and reduce image file size",
      "• No file upload - 100% client-side processing",
      "• Support for JPG, PNG, WebP, and more",
      "• Preview before and after comparison",
      "• Batch processing for multiple images",
      "• Free and unlimited use",
    ],
  },
  {
    heading: "How to Resize an Image",
    blockData: [
      "1. Click 'Select Image' or drag and drop your image file",
      "2. View current image dimensions and file size",
      "3. Enter desired width and height (or percentage)",
      "4. Enable 'Maintain Aspect Ratio' to prevent distortion",
      "5. Adjust quality slider for compression",
      "6. Preview the resized image",
      "7. Click 'Download' to save the optimized image",
    ],
  },
  {
    heading: "Why Resize Images?",
    blockData: [
      "• Reduce file size for faster website loading",
      "• Meet social media dimension requirements",
      "• Optimize images for email attachments",
      "• Save storage space on devices",
      "• Prepare images for printing at specific sizes",
      "• Create thumbnails and preview images",
      "• Improve page load performance and SEO",
      "• Reduce bandwidth usage and hosting costs",
    ],
  },
  {
    heading: "Image Optimization Tips",
    blockData: [
      "For web use, consider resizing to maximum 1920px width for full-screen displays. Use quality settings of 80-90% for a good balance between file size and visual quality.",
      "JPG format is best for photos with many colors, while PNG is ideal for graphics with transparency. WebP format offers superior compression with excellent quality retention.",
      "Always keep a backup of your original images before resizing, especially if reducing dimensions significantly as you cannot restore lost resolution.",
    ],
  },
];
