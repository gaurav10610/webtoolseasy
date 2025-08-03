import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/uuid-v4-generator";
const pageTitle = "UUID v4 Generator - Generate Random UUIDs Online";
const pageDescription =
  "Generate random UUID v4 identifiers instantly. Create single or bulk UUIDs for development projects. Copy, download multiple unique identifiers easily.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v4-generator.png`;

const keywords =
  "uuid v4 generator,uuid generator,generate uuid online,random uuid,unique identifier generator,bulk uuid,uuid creator,guid generator";

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
  mainHeading:
    "UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
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
