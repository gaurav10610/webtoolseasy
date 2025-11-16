import { Metadata } from "next";
import { ApplicationConfig } from "@/types/config";
import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/barcode-generator";
const pageTitle = "Barcode Generator - Create Barcodes Online Free";
const pageDescription =
  "Generate barcodes online instantly. Create Code128, EAN13, UPC, and more barcode formats. Download as PNG or SVG for free in your browser.";
const keywords =
  "barcode generator,create barcode,barcode maker,free barcode generator,barcode creator,generate barcode,online barcode,barcode tool";

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
    type: "website",
    url: navigationUrl,
    images: [
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "Barcode Generator",
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
  mainHeading: "Barcode Generator",
  navigationUrl: navigationUrl,
  pageTitle: pageTitle,
  tags: keywords.split(","),
  relatedTools: [
    ApplicationIds.QR_CODE_GENERATOR,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.IMAGE_COMPRESSOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "barcode-generator",
    pageTitle: pageTitle,
    mainHeading: "Barcode Generator",
    keywords: keywords.split(","),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Barcode Generator?",
    blockData: [
      "Barcode Generator is a free online tool that creates professional barcodes in multiple formats including Code128, EAN13, UPC-A, Code39, and more. Generate scannable barcodes for products, inventory, assets, or any identification needs. Download as high-quality PNG or scalable SVG files directly in your browser.",
    ],
  },
  {
    heading: "How to Generate Barcodes",
    listData: [
      "Enter your barcode data (numbers, text, or product code)",
      "Select barcode format (Code128, EAN13, UPC, etc.)",
      "Customize width, height, and text display options",
      "Preview your barcode in real-time",
      "Download as PNG image or SVG vector file",
      "Print or integrate into your documents",
    ],
  },
  {
    heading: "Supported Barcode Types",
    listData: [
      "Code128: Universal alphanumeric barcode for general use",
      "EAN13: European Article Number for retail products",
      "UPC-A: Universal Product Code for North American products",
      "Code39: Industrial barcode supporting letters and numbers",
      "Code93: Compact alphanumeric barcode",
      "ITF-14: Shipping container codes",
      "MSI: Inventory and shelf marking barcode",
      "Pharmacode: Pharmaceutical packaging identification",
    ],
  },
  {
    heading: "Common Uses",
    listData: [
      "Product labeling and packaging",
      "Inventory and warehouse management",
      "Asset tracking and identification",
      "Retail point of sale systems",
      "Library book cataloging",
      "Event tickets and admission passes",
      "Shipping and logistics labels",
      "Healthcare patient identification",
    ],
  },
  {
    heading: "Barcode Best Practices",
    listData: [
      "Choose the right format for your industry standard",
      "Ensure sufficient contrast between bars and background",
      "Test scannability with actual barcode scanners",
      "Include human-readable text below barcode",
      "Use appropriate size for printing application",
      "Verify data accuracy before mass printing",
      "Save as SVG for scalable, high-quality printing",
      "Add quiet zones (white space) around barcode edges",
    ],
  },
  {
    heading: "Why Choose Our Barcode Generator?",
    blockData: [
      "Generate professional barcodes instantly without expensive software or subscriptions. Our tool supports all major barcode standards used in retail, manufacturing, healthcare, and logistics. Create unlimited barcodes with no watermarks, no registration, and complete privacy - all processing happens locally in your browser.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "Your barcode data never leaves your device. All barcode generation happens entirely in your web browser using client-side JavaScript. No data is transmitted to servers, ensuring complete confidentiality for sensitive product codes and identification numbers.",
    ],
  },
];
