import { Metadata } from "next";
import { ApplicationConfig } from "@/types/config";
import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/background-remover";
const pageTitle = "Background Remover - Private & Offline | No Upload | Free";
const pageDescription =
  "Remove image backgrounds with 100% client-side processing. Your images never leave your browser - no server uploads, complete privacy. Create transparent PNGs instantly.";
const keywords =
  "background remover,remove background,bg remover,background eraser,remove bg,photo background remover,transparent background,image background remover,private,offline,client-side,secure,no upload,browser-based";

export const metadata: Metadata = {
  alternates: {
    canonical: navigationUrl,
  },
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  metadataBase: new URL(`https://webtoolseasy.com${navigationUrl}`),
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: navigationUrl,
    images: [
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "Background Remover Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: ["/web-app-manifest-512x512.png"],
  },
  authors: [{ name: "Gaurav Kumar Yadav" }],
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Free Background Remover - Remove Image Backgrounds Online",
  navigationUrl: navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.IMAGE_CROPPER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "background-remover",
    pageTitle,
    mainHeading: "Free Background Remover - Remove Image Backgrounds Online",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Do you upload my images to remove backgrounds?",
        answer:
          "No, the AI processing runs entirely in your browser using client-side technology. Your images never leave your device, ensuring complete privacy.",
      },
      {
        question: "Is this background remover free?",
        answer:
          "Yes, completely free with no limits, no watermarks, and no registration required. Process as many images as you need.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "The tool supports JPEG, PNG, and WebP formats for input. Output is always a PNG file with transparent background.",
      },
      {
        question: "How accurate is the background removal?",
        answer:
          "The tool uses advanced edge detection algorithms with adjustable threshold and edge smoothing controls for precise, professional results.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Background Remover?",
    blockData: [
      "Background Remover is a free online tool that automatically removes backgrounds from images in seconds. Using advanced edge detection algorithms, it identifies and removes unwanted backgrounds, leaving you with clean, transparent PNG images perfect for professional use. All processing happens securely in your browser.",
    ],
  },
  {
    heading: "How to Remove Background from Images",
    listData: [
      "Upload your image (JPG, PNG, or WEBP format)",
      "Adjust the threshold slider to control background detection",
      "Fine-tune edge smoothing for cleaner edges",
      "Click 'Remove Background' to process your image",
      "Preview the result with transparency grid",
      "Download as PNG with transparent background",
    ],
  },
  {
    heading: "Key Features",
    listData: [
      "Automatic background removal in seconds",
      "Adjustable threshold for precise control",
      "Edge smoothing for professional results",
      "Real-time preview with transparency grid",
      "Download high-quality PNG with alpha channel",
      "100% free with no watermarks",
      "Complete privacy - all processing happens locally",
      "No file size limits or registration required",
    ],
  },
  {
    heading: "Common Use Cases",
    listData: [
      "E-commerce product photos with clean backgrounds",
      "Profile pictures for social media",
      "Marketing materials and advertisements",
      "Presentation slides and graphics",
      "Website images and banners",
      "Photo editing and compositing",
      "Print materials and designs",
      "App icons and UI elements",
    ],
  },
  {
    heading: "Tips for Best Results",
    listData: [
      "Use images with clear subject-background separation",
      "Start with threshold around 128 and adjust as needed",
      "Higher threshold removes more background (less selective)",
      "Lower threshold preserves more details but may keep background",
      "Use edge smoothing (2-3) for most photos",
      "Increase smoothing for softer, more natural edges",
      "Best results with solid or simple backgrounds",
      "Download as PNG to preserve transparency",
    ],
  },
  {
    heading: "Why Choose Our Background Remover?",
    blockData: [
      "Unlike online services that upload your photos to their servers, our tool processes everything locally in your browser. You get instant results with complete privacy, no watermarks, no sign-up required, and no limitations. Perfect for e-commerce, social media, presentations, and professional design work.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your images never leave your device. All background removal operations happen entirely in your web browser using client-side JavaScript. No data is sent to servers, no accounts needed, and your files are automatically cleared from memory after processing.",
    ],
  },
];
