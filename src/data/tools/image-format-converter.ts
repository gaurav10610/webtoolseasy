import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/image-format-converter";
const pageTitle =
  "Image Converter Online - Convert JPG, PNG, WebP, GIF & BMP Free";
const pageDescription =
  "Convert images between JPG, PNG, WebP, GIF, BMP, and SVG formats instantly. Free online image format converter with batch conversion, quality control, and instant download.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-format-converter.png`;

const keywords =
  "image converter,image converter online,convert jpg to png,convert png to jpg,webp converter,image format converter,jpg to webp,png to webp,gif to png,image converter free,convert image format online,change image format,bmp to jpg,heic to jpg,batch image converter";

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
    "Free Online Image Format Converter: Convert JPG, PNG, WEBP, GIF & More",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.IMAGE_CROPPER,
    ApplicationIds.IMAGE_TO_TEXT,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "image-format-converter",
    pageTitle,
    mainHeading:
      "Free Online Image Format Converter: Convert JPG, PNG, WEBP, GIF & More",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Online Image Format Converter",
    blockData: [
      "Convert your images between different formats instantly with our free online image format converter. Support for popular formats including JPG, PNG, WEBP, GIF, BMP, and ICO. No software installation required - everything works directly in your browser.",
    ],
  },
  {
    heading: "Supported Image Formats",
    blockData: [
      "Our converter supports all major image formats: JPEG/JPG for photos with compression, PNG for images with transparency, WEBP for modern web optimization, GIF for animations, BMP for uncompressed images, and ICO for icons and favicons.",
    ],
  },
  {
    heading: "Key Features",
    listData: [
      "Convert between 6+ image formats",
      "Batch conversion support",
      "Maintain image quality",
      "Instant preview",
      "No file uploads to servers",
      "Works offline",
      "Free and unlimited usage",
      "Mobile-friendly interface",
    ],
  },
  {
    heading: "How to Convert Image Formats",
    listData: [
      "Upload your image files using drag-and-drop or file selector",
      "Choose your desired output format (JPG, PNG, WEBP, GIF, BMP, ICO)",
      "Adjust quality settings if needed",
      "Click convert to process your images",
      "Download the converted files instantly",
    ],
  },
  {
    heading: "Common Use Cases",
    blockData: [
      "Perfect for web developers optimizing images for websites, designers preparing graphics for different platforms, photographers converting between formats, and anyone needing to change image file types for compatibility or size optimization.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All image conversions happen locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security. Works offline once loaded, making it perfect for sensitive image processing.",
    ],
  },
];
