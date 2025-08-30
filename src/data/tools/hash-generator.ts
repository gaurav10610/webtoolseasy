import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/hash-generator";
const pageTitle = "Hash Generator - MD5, SHA-1, SHA-256"; // <=55 chars
const pageDescription =
  "Generate MD5, SHA-1 and SHA-256 hashes online. Compute, copy, or download hash results securely in your browser."; // <=150 chars
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/hash-generator.png`;

const keywords =
  "hash generator,md5,sha1,sha256,hash online,generate hash,crypto hash,checksum";

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
    description: pageDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
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
  mainHeading: "Hash Generator: MD5, SHA-1 & SHA-256",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [ApplicationIds.JWT_DECODER],
  structuredData: createToolStructuredData({
    pageUrl: "hash-generator",
    pageTitle,
    mainHeading: "Hash Generator: MD5, SHA-1 & SHA-256",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Generate secure hashes instantly",
    blockData: [
      "Create MD5, SHA-1, and SHA-256 hashes directly in your browser without uploading data to any server.",
      "Use the tool to verify checksums, generate hashes for testing, or produce fingerprints for data integrity checks.",
    ],
  },
  {
    heading: "How to use",
    listData: [
      "Enter text into the left input area or paste your data.",
      "Click 'Compute Hashes' to generate MD5, SHA-1 and SHA-256 values instantly.",
      "Copy individual hashes using the Copy buttons or use 'Copy All' to copy every hash at once.",
      "Download a text file containing the input and all computed hashes for safekeeping.",
    ],
  },
  {
    heading: "Why use this tool",
    listData: [
      "Fast browser-based hashing using Web Crypto (SHA-1/SHA-256) and crypto-js for MD5.",
      "No data leaves your device — secure and private processing in the browser.",
      "Useful for checksums, verifying file integrity, or quick cryptographic fingerprints.",
    ],
  },
];
