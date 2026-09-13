import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v4-generator";
const pageTitle =
  "UUID & GUID Generator Online - UUID v4, v7, v1, GUID & Bulk Identifiers";
const pageDescription =
  "Generate random UUID v4, time-ordered UUID v7, timestamp UUID v1, Microsoft GUIDs, and Nil UUIDs online. Instant single and bulk generation with customizable casing, delimiters, and 100% in-browser privacy.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v4-generator.png`;

const keywords =
  "uuid generator,uuid v7 generator,uuid v4 generator,guid generator,uuid generator online,generate uuid,bulk uuid generator,uuid v1 generator,time ordered uuid,random uuid,unique identifier generator,uuid creator,microsoft guid generator,nil uuid generator,online guid generator";

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
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
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
    "UUID & GUID Generator Studio — UUID v4, v7, v1, Microsoft GUID & ULID",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.BASE64_ENCODE,
    ApplicationIds.JSON_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v4-generator",
    pageTitle,
    mainHeading:
      "UUID & GUID Generator Studio — UUID v4, v7, v1, Microsoft GUID & ULID",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "What is the difference between UUID v4 and UUID v7?",
        answer:
          "UUID v4 is completely random (122 random bits). UUID v7 (RFC 9562) combines a 48-bit Unix epoch millisecond timestamp with 74 random bits. UUID v7 is time-ordered, which prevents B-Tree index fragmentation in databases like PostgreSQL and MySQL while remaining globally unique.",
      },
      {
        question: "What is the difference between a UUID and a Microsoft GUID?",
        answer:
          "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are conceptually identical 128-bit numbers. Microsoft GUIDs traditionally use uppercase letters with curly braces like {D9B08230-29C5-403A-BF02-E213AB99290B}, while standard UUIDs are lowercase without braces.",
      },
      {
        question: "Are the generated UUIDs cryptographically secure?",
        answer:
          "Yes, all UUIDs are generated in your browser using the Web Cryptography API (crypto.getRandomValues and crypto.randomUUID), ensuring cryptographically secure entropy with zero network transmission.",
      },
      {
        question: "Can I generate UUIDs in bulk?",
        answer:
          "Yes, you can generate up to 1,000 UUIDs at a time, toggle between lowercase/uppercase, add or remove hyphens and braces, and copy all or download as a text file.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "UUID & GUID Version Comparison Matrix (RFC 9562)",
    blockData: [
      "• **UUID v4 (Random)**: 122 bits of cryptographic randomness. Best for API request IDs, session tokens, and distributed tracing where time sequence should remain hidden.",
      "• **UUID v7 (Time-Ordered)**: 48-bit millisecond timestamp + 74 random bits (RFC 9562). The modern industry standard for database primary keys because it preserves B-Tree index locality and avoids fragmentation.",
      "• **UUID v1 (Timestamp + Node)**: 60-bit timestamp based on 100-nanosecond intervals + MAC/random node ID. Useful for legacy distributed systems.",
      "• **ULID (Universally Unique Lexicographically Sortable Identifier)**: 128-bit Crockford's Base32 string (26 characters). URL-safe, case-insensitive, and chronological.",
      "• **Microsoft GUID**: Standard 128-bit UUID formatted with uppercase hexadecimal characters and optional curly braces `{...}` for Windows/.NET compatibility.",
    ],
  },
  {
    heading: "Programmatic UUID Generation Recipes",
    blockData: [
      "• **Node.js / Browser**: `crypto.randomUUID()` generates a secure v4 UUID natively without external dependencies.",
      "• **Python**: `import uuid; str(uuid.uuid4())` generates a random v4 identifier.",
      "• **PostgreSQL**: `SELECT gen_random_uuid();` generates a v4 UUID natively in PostgreSQL 13+.",
      "• **Go**: `import \"github.com/google/uuid\"; id := uuid.New().String()`",
    ],
  },
  {
    heading: "Why UUID v7 is Replacing UUID v4 for Database Primary Keys",
    blockData: [
      "Traditional UUID v4 random identifiers cause severe performance degradation when used as clustered primary keys in SQL databases (PostgreSQL, MySQL InnoDB, SQLite). Because v4 is entirely random, new row inserts land at arbitrary leaf nodes in the B-Tree index, triggering constant page splits and cache evictions.",
      "UUID v7 solves this by encoding the current Unix millisecond timestamp in the leading 48 bits. New inserts append monotonically to the right edge of the index tree, maintaining index density and write throughput comparable to auto-incrementing integers while preserving global uniqueness across distributed systems.",
    ],
  },
];
