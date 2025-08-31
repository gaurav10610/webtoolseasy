import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/ulid-generator";
const pageTitle = "ULID Generator - Time-sortable IDs";
const pageDescription =
  "Generate time-sortable ULIDs online. Create single or bulk ULIDs for databases, ordered keys, and distributed systems.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/ulid-generator.png`;

const keywords =
  "ulid generator,ulid generator online,time-sortable id,ulid bulk generator,unique id generator,ulid vs uuid,lexicographically sortable ids,ordered id generator";

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
    siteName: "WebToolsEasy",
    locale: "en_US",
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
    creator: "@gaurav10610",
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
    "Online ULID Generator - Generate Time-sortable Unique Identifiers (ULIDs)",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [
    ApplicationIds.GUID_GENERATOR,
    ApplicationIds.UUID_VERSION4_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "ulid-generator",
    pageTitle,
    mainHeading:
      "Online ULID Generator - Generate Time-sortable Unique Identifiers (ULIDs)",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a ULID?",
    blockData: [
      "A ULID (Universally Unique Lexicographically Sortable Identifier) is a 26-character string that preserves roughly sortable order based on creation time. ULIDs are useful as database keys and identifiers in distributed systems where time-based ordering is desired.",
    ],
  },
  {
    heading: "How to Use",
    listData: [
      "Click 'Generate New ULID' to create a single identifier",
      "Use bulk generation to create many ULIDs at once (up to 1000)",
      "Copy or download the generated list for use in your apps",
    ],
  },
  {
    heading: "Why ULIDs?",
    blockData: [
      "ULIDs are lexicographically sortable, compact, and URL-friendly. They combine a time component and randomness, making them good for indexed database keys and distributed systems.",
    ],
  },
];
