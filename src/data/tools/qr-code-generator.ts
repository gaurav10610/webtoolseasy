import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/qr-code-generator";
const pageTitle = "QR Code Generator - Create Custom QR Codes Free";
const pageDescription =
  "Generate QR codes for text, URLs, WiFi, contact info instantly. Free QR code creator with customization options. Download PNG, SVG formats easily.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/cron-expression.png`;

const keywords =
  "qr code generator,create qr code,qr code maker,free qr generator,qr code creator,custom qr code,generate qr online,qr builder";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
  mainHeading: "Free QR Code Generator: Generate QR Codes with Free Text",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a QR Code Generator?",
    blockData: [
      "A QR code generator creates Quick Response codes that can store website URLs, contact information, WiFi passwords, and plain text. Our free online QR code generator instantly creates scannable codes for smartphones and tablets.",
      "QR codes bridge the gap between physical and digital worlds, making it easy to share information without typing. Generate custom QR codes for marketing, business cards, events, and personal use with our user-friendly tool.",
    ],
  },
  {
    heading: "How to Create QR Codes Online",
    listData: [
      "Enter your text, URL, or data into the input field",
      "Choose your preferred QR code size and error correction level",
      "Generate the QR code instantly with real-time preview",
      "Download in multiple formats: PNG, JPEG, SVG, or WEBP",
      "Test your QR code with any smartphone camera or QR scanner app",
    ],
  },
  {
    heading: "Why Choose Our QR Code Generator?",
    listData: [
      "Completely free with unlimited QR code generation",
      "High-quality output suitable for print and digital use",
      "Multiple download formats for different use cases",
      "No registration required - start creating QR codes immediately",
      "Mobile-optimized interface works on all devices",
      "Customizable size and error correction for optimal scanning",
    ],
  },
  {
    heading: "Popular QR Code Use Cases",
    blockData: [
      "• **Business Marketing**: Add QR codes to business cards, flyers, and promotional materials",
      "• **Restaurant Menus**: Create contactless digital menus for safer dining experiences",
      "• **WiFi Sharing**: Generate QR codes for easy WiFi password sharing with guests",
      "• **Event Registration**: Streamline event check-ins and information sharing",
      "• **Social Media**: Quick links to your social profiles and contact information",
      "• **Product Information**: Link physical products to digital content and reviews",
    ],
  },
];
