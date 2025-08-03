import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/guid-generator";
const pageTitle = "GUID Generator Online - Generate Single or Bulk GUIDs";
const pageDescription =
  "Generate globally unique identifiers (GUIDs) instantly. Create single or bulk GUIDs for your development projects. Copy and download results easily.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/guid-generator.png`;

const keywords =
  "guid generator,guid generator online,uuid generator,globally unique identifier,generate guid,bulk guid generator,unique id generator";

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
    "Online GUID Generator - Generate Single or Bulk Globally Unique Identifiers (GUIDs)",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.UUID_VERSION4_GENERATOR,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a GUID and Why Use One?",
    blockData: [
      "A GUID (Globally Unique Identifier) is a 128-bit identifier used to uniquely identify objects, entities, or resources across distributed systems. Our free online GUID generator creates cryptographically strong unique identifiers perfect for databases, APIs, software development, and system integration.",
      "GUIDs ensure uniqueness across different systems without requiring central coordination. They're essential for database primary keys, session tokens, file identifiers, and distributed computing environments where collision-free identification is critical.",
    ],
  },
  {
    heading: "How to Generate GUIDs Online",
    listData: [
      "Enter the number of GUIDs needed (1-100 at once)",
      "Choose your preferred GUID format (standard, uppercase, lowercase)",
      "Click 'Generate' to create unique identifiers instantly",
      "Copy individual GUIDs or download the entire list",
      "Use bulk generation for large-scale applications",
    ],
  },
  {
    heading: "GUID Format Options Available",
    listData: [
      "Standard Format: 12345678-1234-5678-9ABC-123456789ABC",
      "Uppercase: ALL LETTERS IN CAPITAL FORMAT",
      "Lowercase: all letters in small format",
      "No Hyphens: 123456781234567589AB123456789ABC",
      "Braces: {12345678-1234-5678-9ABC-123456789ABC}",
      "Custom formatting for specific programming languages",
    ],
  },
  {
    heading: "Common Use Cases for GUIDs",
    blockData: [
      "• **Database Keys**: Primary keys for distributed databases and microservices",
      "• **API Development**: Unique request IDs and resource identifiers",
      "• **File Systems**: Unique file and directory identification",
      "• **Session Management**: Secure user session tokens and cookies",
      "• **Software Development**: Component IDs, version tracking, and debugging",
    ],
  },
];
