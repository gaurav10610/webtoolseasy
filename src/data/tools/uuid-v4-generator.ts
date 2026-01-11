import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v4-generator";
const pageTitle =
  "Private UUID Generator - Generate UUIDs Offline | No Upload | Free";
const pageDescription =
  "100% client-side UUID v4 generator - your data never leaves your browser. Generate single or bulk random UUIDs privately. Works offline.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v4-generator.png`;

const keywords =
  "uuid v4 generator,uuid generator,generate uuid online,random uuid,unique identifier generator,bulk uuid,uuid creator,guid generator,private,offline,client-side,secure,no upload,browser-based";

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
      : "https://webtoolseasy.com"
  ),
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
  mainHeading:
    "UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v4-generator",
    pageTitle,
    mainHeading:
      "UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Are the generated UUIDs cryptographically secure?",
        answer:
          "Yes, our UUID v4 generator uses your browser's built-in crypto.getRandomValues() API, which provides cryptographically strong random number generation for maximum security.",
      },
      {
        question: "Is there a limit on how many UUIDs I can generate?",
        answer:
          "No, you can generate unlimited UUIDs completely free. Generate single UUIDs or bulk generate thousands at once with no restrictions.",
      },
      {
        question: "Are the generated UUIDs stored or logged anywhere?",
        answer:
          "No, all UUIDs are generated locally in your browser and are never sent to any server. Your generated identifiers remain completely private.",
      },
      {
        question: "Are UUID v4 identifiers truly unique?",
        answer:
          "Yes, UUID v4 has 122 random bits, giving approximately 5.3 × 10^36 possible combinations. The probability of generating duplicate UUIDs is astronomically low.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "UUID Version 4 Generator - Random UUIDs",
    blockData: [
      "Generate RFC 4122 compliant UUID version 4 identifiers using cryptographically strong random number generation. Our free UUID v4 generator creates universally unique identifiers perfect for database keys, API tokens, session management, and distributed system identification.",
      "UUID v4 uses pure randomness to ensure uniqueness across different systems, applications, and time periods. Each generated UUID has extremely low collision probability, making them ideal for microservices, cloud applications, and any system requiring guaranteed unique identifiers.",
    ],
  },
  {
    heading: "UUID Version 4 Specifications",
    listData: [
      "RFC 4122 compliant random UUID generation",
      "128-bit identifier with 122 random bits",
      "Standard format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      "Cryptographically secure random number generation",
      "Version 4 indicator in the 13th hexadecimal digit",
      "Variant bits set according to RFC standards",
      "Bulk generation up to 1000 UUIDs at once",
    ],
  },
  {
    heading: "When to Use UUID Version 4",
    blockData: [
      "• **Database Design**: Primary keys for distributed databases and sharding",
      "• **API Development**: Request tracking, resource identification, and session tokens",
      "• **Microservices**: Service-to-service communication and event correlation",
      "• **File Systems**: Unique file naming and temporary resource identification",
      "• **Security**: Non-sequential identifiers that don't reveal creation patterns",
    ],
  },
  {
    heading: "UUID v4 vs Other Versions",
    listData: [
      "No dependency on MAC address or timestamp (unlike v1)",
      "Maximum privacy - no machine-identifying information",
      "Completely random - unpredictable sequence generation",
      "Suitable for public-facing systems and APIs",
      "Better for security-sensitive applications",
      "Ideal when you need pure randomness over time-based ordering",
    ],
  },
];
