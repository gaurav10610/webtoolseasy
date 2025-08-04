import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/crop-image";
const pageTitle = "Image Cropper Online - Crop Photos Free & Precision";
const pageDescription =
  "Crop images online with precision tools and aspect ratio presets. Free photo cropper supports JPG, PNG, WEBP. No registration required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-cropper.png`;

const keywords =
  "image cropper,crop image online,photo cropper,crop photos,image crop tool,online image editor,photo editing,aspect ratio cropper";

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
  mainHeading: "Free Online Image Cropper - Crop Your Photos Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.IMAGE_COMPRESSOR, ApplicationIds.IMAGE_TO_TEXT],
  structuredData: createToolStructuredData({
    pageUrl: "crop-image",
    pageTitle,
    mainHeading: "Free Online Image Cropper - Crop Your Photos Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Use Our Free Image Cropper?",
    listData: [
      "Crop images online without downloading software or creating accounts.",
      "Professional quality results with precise positioning and aspect ratio controls.",
      "Perfect for social media posts, profile pictures, and website images.",
      "Support for popular formats including JPEG, PNG, WEBP, and BMP files.",
      "Mobile-friendly interface that works on phones, tablets, and computers.",
      "Instant preview shows exactly how your cropped image will look.",
    ],
  },
  {
    heading: "Powerful Features for Perfect Photo Cropping",
    listData: [
      "Smart aspect ratio presets for Instagram (1:1), YouTube (16:9), and standard formats.",
      "Drag and drop multiple images for quick batch photo editing.",
      "Manual input controls for exact pixel positioning and sizing.",
      "Real-time sliders make adjusting crop area smooth and intuitive.",
      "Switch between pixel and percentage measurements for different workflows.",
      "One-click reset to start over if you want to try different crop settings.",
      "Download in multiple formats optimized for web, print, or social sharing.",
    ],
  },
  {
    heading: "How to Crop Images Online (Step by Step)",
    listData: [
      "Upload your photo by dragging it onto the page or clicking browse.",
      "Choose an aspect ratio preset or select 'Free Crop' for custom dimensions.",
      "Drag the crop box or use sliders to position and resize the selection.",
      "Use manual input fields for precise measurements when needed.",
      "Preview your cropped image in real-time as you make adjustments.",
      "Select your preferred output format (PNG, JPEG, WEBP, BMP, or ICO).",
      "Click download to save your perfectly cropped image to your device.",
    ],
  },
  {
    heading: "Best Practices for Image Cropping",
    listData: [
      "Use 1:1 square crops for Instagram posts and profile pictures across social platforms.",
      "Choose 16:9 widescreen ratio for YouTube thumbnails and landscape website headers.",
      "Apply 4:3 standard ratio for traditional photo frames and presentations.",
      "Enable aspect ratio lock to maintain proportions when resizing crop area.",
      "Save originals before cropping so you can create different versions later.",
      "Consider the main subject when positioning your crop for better composition.",
    ],
  },
  {
    blockData: [
      "Our free image cropper combines ease of use with professional features, making it the perfect tool for content creators, social media managers, bloggers, and anyone who needs to crop photos quickly. Whether you're preparing images for Instagram, creating website graphics, or editing personal photos, our online tool delivers high-quality results without the need for expensive photo editing software.",
    ],
  },
];
