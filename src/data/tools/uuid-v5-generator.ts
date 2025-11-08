import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v5-generator";
const pageTitle = "UUID v5 Generator - SHA-1 Name-Based UUID";
const pageDescription =
  "Generate UUID v5 identifiers using SHA-1 hash with namespace and name. Create reproducible, name-based UUIDs for APIs, databases, and systems.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v5-generator.png`;

const keywords =
  "uuid v5 generator,uuid v5 generator online,name-based uuid,sha-1 uuid,namespace uuid,deterministic uuid,reproducible uuid,uuid from string";

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
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "UUID v5 Generator Tool",
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
  mainHeading: "UUID v5 Generator - Create Name-Based UUIDs with SHA-1 Hashing",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v5-generator",
    pageTitle,
    mainHeading:
      "UUID v5 Generator - Create Name-Based UUIDs with SHA-1 Hashing",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is UUID Version 5?",
    blockData: [
      "UUID v5 is a name-based universally unique identifier that uses SHA-1 hashing to generate deterministic UUIDs from a namespace and name combination. Unlike random UUID v4, UUID v5 produces the same identifier every time you use the same namespace and name inputs, making it perfect for creating reproducible, consistent identifiers across distributed systems.",
      "The UUID v5 specification follows RFC 4122 standards and generates 128-bit identifiers in the standard format: xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx, where the '5' indicates version 5. This deterministic nature makes UUID v5 ideal for creating stable identifiers based on URLs, domain names, or any string-based data.",
    ],
  },
  {
    heading: "UUID v5 Namespaces Explained",
    listData: [
      "DNS Namespace (6ba7b810-9dad-11d1-80b4-00c04fd430c8): For domain names like example.com",
      "URL Namespace (6ba7b811-9dad-11d1-80b4-00c04fd430c8): For complete URLs like https://example.com/path",
      "OID Namespace (6ba7b812-9dad-11d1-80b4-00c04fd430c8): For ISO Object Identifiers",
      "X500 Namespace (6ba7b814-9dad-11d1-80b4-00c04fd430c8): For X.500 Distinguished Names",
      "Custom UUID Namespace: Use any valid UUID as a custom namespace for your specific needs",
    ],
  },
  {
    heading: "When to Use UUID v5",
    blockData: [
      "UUID v5 is ideal when you need deterministic, reproducible identifiers. Use UUID v5 for API endpoints that need consistent IDs based on resource names, database records where the same logical entity should always have the same UUID, caching systems that benefit from predictable keys, or distributed systems requiring synchronized identifiers without central coordination.",
      "Examples include generating user IDs from email addresses, creating resource identifiers from URLs, generating consistent test data, implementing content-addressable storage, or building federation systems where multiple nodes need to independently arrive at the same UUID for the same entity.",
    ],
  },
  {
    heading: "UUID v5 vs UUID v4: Key Differences",
    listData: [
      "UUID v4: Completely random, different every time, unpredictable, no input required",
      "UUID v5: Deterministic, same inputs produce same UUID, predictable, requires namespace and name",
      "UUID v4: Best for truly unique one-time identifiers like session IDs or transaction IDs",
      "UUID v5: Best for reproducible identifiers like resource IDs based on names or URLs",
      "UUID v4: Cannot recreate the same UUID intentionally",
      "UUID v5: Can always regenerate the exact same UUID with same inputs",
    ],
  },
  {
    heading: "How UUID v5 Generation Works",
    blockData: [
      "UUID v5 generation follows a precise algorithm: First, the namespace UUID is converted to its 16-byte binary representation. The name string is encoded as UTF-8 bytes. These are concatenated together and hashed using SHA-1, producing a 160-bit hash. The first 128 bits of this hash become the UUID, with specific version and variant bits set according to RFC 4122 standards.",
      "The version bits (4 bits set to '0101' for version 5) are placed in the time_hi_and_version field. The variant bits (2 bits set to '10') are placed in the clock_seq_hi_and_reserved field. This ensures the resulting UUID is RFC 4122 compliant and universally recognizable as a version 5 UUID.",
    ],
  },
  {
    heading: "Practical UUID v5 Use Cases",
    listData: [
      "RESTful APIs: Generate consistent resource IDs from endpoint paths",
      "User Management: Create stable user IDs from email addresses or usernames",
      "Content Systems: Generate article or document IDs from titles or slugs",
      "Distributed Caching: Create cache keys that are identical across all cache nodes",
      "Federation: Ensure different systems generate the same ID for the same entity",
      "Testing: Generate consistent test data UUIDs for reproducible test scenarios",
      "Data Migration: Map old system IDs to new UUIDs deterministically",
    ],
  },
  {
    heading: "UUID v5 Security Considerations",
    blockData: [
      "While UUID v5 uses SHA-1 hashing, it's not designed for cryptographic security. The deterministic nature means anyone who knows the namespace and name can generate the same UUID. Don't use UUID v5 for security tokens, passwords, or any security-critical identifiers where unpredictability is required.",
      "UUID v5 is perfect for identification and consistency, not for security. For security-sensitive applications, use UUID v4 (random) or dedicated cryptographic methods. The SHA-1 algorithm, while considered weak for collision resistance in security contexts, is sufficient for UUID v5's intended purpose of creating reproducible identifiers.",
    ],
  },
  {
    heading: "Best Practices for UUID v5",
    listData: [
      "Choose the appropriate namespace: DNS for domains, URL for web resources, custom for application-specific needs",
      "Use consistent name formatting: Always lowercase or uppercase, consistent encoding",
      "Document your namespace choices: Keep track of which namespaces are used for which purposes",
      "Validate inputs: Ensure names are properly formatted before UUID generation",
      "Consider uniqueness: Same namespace + name always produces same UUID, ensure logical uniqueness",
      "Test reproducibility: Verify that your UUID v5 generation is consistent across different systems",
      "Use URL namespace for web resources: Most appropriate for REST API endpoints and web entities",
      "Store the generation parameters: Keep records of what namespace and name generated each UUID",
    ],
  },
];
