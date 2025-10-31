import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/signature-generator";
const pageTitle = "Free Signature Generator - Create Digital Signatures";
const pageDescription =
  "Create digital signatures online free. Draw, type, or upload your signature. Download as transparent PNG. Perfect for documents and forms.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/signature-generator.png`;
const keywords =
  "signature generator,digital signature,create signature online,signature maker,electronic signature,esignature,sign document online";

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
  mainHeading: "Free Signature Generator - Create Digital Signatures Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.PDF_MERGE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "signature-generator",
    pageTitle,
    mainHeading: "Free Signature Generator - Create Digital Signatures Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Signature Generator?",
    blockData: [
      "A Signature Generator is a free online tool that helps you create professional digital signatures for documents, contracts, and forms. Our browser-based tool offers three methods: draw with your mouse or touchscreen, type your name in stylish fonts, or upload an existing signature image.",
      "Perfect for signing PDFs, contracts, forms, letters, or any document requiring a signature. All processing happens in your browser - your signature never leaves your device, ensuring complete privacy and security.",
    ],
  },
  {
    heading: "Features of Our Signature Generator",
    blockData: [
      "• Draw your signature with mouse or touchscreen",
      "• Type your name in multiple elegant fonts",
      "• Upload existing signature images",
      "• Adjust pen thickness and color",
      "• Transparent background PNG export",
      "• Multiple signature styles and fonts",
      "• Clear and redo options",
      "• Download in high quality",
      "• 100% free with no watermarks",
      "• No registration required",
    ],
  },
  {
    heading: "How to Create Your Digital Signature",
    blockData: [
      "1. Choose your preferred method: Draw, Type, or Upload",
      "2. If drawing: Use your mouse or finger to sign in the canvas area",
      "3. If typing: Enter your name and select a font style",
      "4. If uploading: Select an image file of your existing signature",
      "5. Adjust pen color and thickness if needed",
      "6. Preview your signature in real-time",
      "7. Click 'Clear' to start over if needed",
      "8. Click 'Download' to save as transparent PNG",
      "9. Use the downloaded signature on documents and forms",
    ],
  },
  {
    heading: "Why Use a Digital Signature?",
    blockData: [
      "• Sign documents instantly without printing",
      "• Work remotely and sign from anywhere",
      "• Eco-friendly - save paper and reduce printing",
      "• Professional appearance for business documents",
      "• Faster document processing and workflows",
      "• Easy to store and reuse signatures",
      "• Compatible with PDF editors and document tools",
      "• Legally acceptable for most non-critical documents",
    ],
  },
  {
    heading: "Use Cases for Digital Signatures",
    blockData: [
      "Our signature generator is perfect for contracts and agreements, business letters and memos, PDF forms and applications, email signatures, invoices and receipts, permission slips and consent forms, cover letters and resumes, and personal correspondence.",
      "The transparent background makes it easy to place your signature on any document without white boxes or backgrounds showing.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All signature creation happens entirely in your browser using HTML5 Canvas. Your signature is never uploaded to any server, and we don't store, view, or have access to your signature image.",
      "This ensures complete privacy and security, making our tool safe for business signatures, personal signatures, and any confidential use. Download your signature and use it with confidence.",
    ],
  },
];
