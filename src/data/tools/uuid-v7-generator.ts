import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v7-generator";
const pageTitle = "UUID v7 Generator - Time-Ordered UUID Online";
const pageDescription =
  "Generate UUID v7 with timestamp ordering. Perfect for database keys, distributed systems, and sortable unique identifiers with chronological ordering.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v7-generator.png`;

const keywords =
  "uuid v7 generator,uuid v7 generator online,time-ordered uuid,sortable uuid,database uuid,timestamp uuid,uuidv7,distributed systems uuid";

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
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    siteName: "WebToolsEasy.com",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "UUID v7 Generator Tool",
      },
    ],
    url: navigationUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig = {
  mainHeading: "UUID v7 Generator - Create Time-Ordered UUIDs for Databases",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.UUID_VERSION5_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v7-generator",
    pageTitle,
    mainHeading: "UUID v7 Generator - Create Time-Ordered UUIDs for Databases",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is UUID Version 7?",
    blockData: [
      "UUID v7 is the newest UUID variant defined in RFC 9562 (2024), designed specifically for modern distributed systems and databases. Unlike random UUIDs (v4), v7 incorporates a Unix timestamp in the first 48 bits, ensuring natural chronological ordering.",
      "This makes v7 UUIDs ideal for use as primary keys in databases, as they maintain insertion order and improve query performance. The remaining bits contain random data for uniqueness, providing the best of both worlds: time-based ordering and collision resistance.",
    ],
  },
  {
    heading: "Time-Ordered Sortability",
    blockData: [
      "The key advantage of UUID v7 is its lexicographic sortability. When stored as strings or sorted in databases, v7 UUIDs automatically arrange in creation order because the timestamp occupies the most significant bits.",
      "This eliminates the need for separate 'created_at' columns and enables efficient range queries on UUID primary keys. Unlike v1 (which also includes timestamps), v7 uses a standard Unix timestamp format and lacks MAC address concerns, making it more suitable for distributed cloud environments.",
    ],
  },
  {
    heading: "Database Performance Benefits",
    blockData: [
      "UUID v7 significantly improves database performance compared to random v4 UUIDs. Traditional random UUIDs cause index fragmentation in B-tree structures because insertions are scattered randomly across the index space.",
      "V7's sequential nature means new records append near the end of indexes, reducing page splits and improving write performance by up to 50% in some benchmarks. This is particularly beneficial for high-throughput systems with frequent inserts. Additionally, sequential UUIDs improve cache locality during reads.",
    ],
  },
  {
    heading: "UUID v7 vs UUID v4",
    blockData: [
      "While v4 generates purely random 122-bit identifiers, v7 uses 48 bits for a millisecond-precision timestamp and 74 bits for randomness. V4 offers maximum unpredictability and works well for distributed generation without coordination, but lacks ordering.",
      "V7 sacrifices some randomness for chronological ordering, making it superior for database primary keys, log entries, and time-series data. Both provide adequate collision resistance for practical purposes - the birthday paradox suggests collision risks remain negligible even with billions of generated IDs.",
    ],
  },
  {
    heading: "UUID v7 vs UUID v1",
    blockData: [
      "Both v7 and v1 include timestamps, but v7 is designed for modern requirements. V1 uses a 60-bit timestamp with 100-nanosecond precision plus a MAC address, which raises privacy concerns and requires network interface access.",
      "V7 uses a 48-bit Unix timestamp (millisecond precision) and random data instead of MAC addresses, making it more privacy-friendly and easier to implement in cloud environments. V7 also provides better sortability because the timestamp occupies the most significant bits in standard UUID byte order, unlike v1's mixed field layout.",
    ],
  },
  {
    heading: "Use Cases for UUID v7",
    listData: [
      "Database Primary Keys - Replace auto-incrementing integers with globally unique IDs that maintain insertion order",
      "Distributed Systems - Generate sortable IDs across multiple nodes without coordination",
      "Event Sourcing - Track events with naturally ordered identifiers",
      "Time-Series Data - Store metrics, logs, or IoT data with built-in chronological ordering",
      "API Resources - Create resource IDs that reveal creation order while remaining opaque",
      "Migration from v4 - Upgrade systems using random UUIDs to gain ordering benefits without breaking uniqueness guarantees",
    ],
  },
  {
    heading: "Generation Algorithm",
    blockData: [
      "UUID v7 generation follows RFC 9562 specification: (1) Obtain current Unix timestamp in milliseconds (48 bits), (2) Generate 74 bits of cryptographically strong random data, (3) Set version bits to 0111 (7) in the time_hi_and_version field, (4) Set variant bits to 10 in the clock_seq_hi_and_reserved field.",
      "The resulting format is: timestamp_ms (48 bits) | version (4 bits) | random_a (12 bits) | variant (2 bits) | random_b (62 bits). This structure ensures the first 48 bits sort chronologically while maintaining sufficient entropy for uniqueness.",
    ],
  },
  {
    heading: "Best Practices",
    listData: [
      "Use v7 for Database Keys - Replace sequential integers with v7 UUIDs for globally unique, sortable primary keys",
      "Prefer v7 over v4 - Unless you specifically need maximum randomness, v7's ordering benefits outweigh the minimal reduction in entropy",
      "Clock Considerations - Ensure system clocks are reasonably synchronized in distributed systems; even with clock skew, the random component prevents collisions",
      "Avoid v1 - V7 supersedes v1 for most use cases with better privacy and sortability",
      "Storage Optimization - Store UUIDs as binary (16 bytes) rather than strings (36 bytes) for efficiency",
      "Indexing Strategy - Take advantage of v7's sequential nature when designing database schemas - clustered indexes work exceptionally well",
      "Migration Path - When transitioning from v4 to v7, maintain backward compatibility by checking UUID versions during processing",
    ],
  },
];
