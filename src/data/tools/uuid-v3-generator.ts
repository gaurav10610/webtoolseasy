import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v3-generator";
const pageTitle = "UUID v3 Generator - MD5 Name-Based UUID";
const pageDescription =
  "Generate UUID v3 identifiers using MD5 hash with namespace and name. Create reproducible, deterministic UUIDs for legacy systems and databases.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v3-generator.png`;

const keywords =
  "uuid v3 generator,uuid v3 generator online,name-based uuid,md5 uuid,namespace uuid,deterministic uuid,legacy uuid,uuid from string";

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
        alt: "UUID v3 Generator Tool",
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
  mainHeading: "UUID v3 Generator - Create Name-Based UUIDs with MD5 Hashing",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v3-generator",
    pageTitle,
    mainHeading: "UUID v3 Generator - Create Name-Based UUIDs with MD5 Hashing",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is UUID Version 3?",
    blockData: [
      "UUID v3 is a name-based universally unique identifier that uses MD5 hashing to generate deterministic UUIDs from a namespace and name combination. Like UUID v5, UUID v3 produces the same identifier every time you use the same namespace and name inputs, making it suitable for creating consistent identifiers in legacy systems and applications requiring backward compatibility.",
      "The UUID v3 specification follows RFC 4122 standards and generates 128-bit identifiers in the standard format: xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx, where the '3' indicates version 3. While UUID v5 (SHA-1) is now preferred for new applications, UUID v3 remains important for maintaining compatibility with existing systems that use MD5-based UUID generation.",
    ],
  },
  {
    heading: "UUID v3 Namespaces Explained",
    listData: [
      "DNS Namespace (6ba7b810-9dad-11d1-80b4-00c04fd430c8): For domain names like example.com",
      "URL Namespace (6ba7b811-9dad-11d1-80b4-00c04fd430c8): For complete URLs like https://example.com/path",
      "OID Namespace (6ba7b812-9dad-11d1-80b4-00c04fd430c8): For ISO Object Identifiers",
      "X500 Namespace (6ba7b814-9dad-11d1-80b4-00c04fd430c8): For X.500 Distinguished Names",
      "Custom UUID Namespace: Use any valid UUID as a custom namespace for application-specific needs",
    ],
  },
  {
    heading: "When to Use UUID v3",
    blockData: [
      "UUID v3 should be used primarily for backward compatibility with legacy systems that already use MD5-based UUID generation. If you're maintaining an existing application that generates UUID v3 identifiers, continue using v3 to ensure consistency. However, for new projects, UUID v5 (SHA-1) is recommended as it provides better collision resistance.",
      "Common use cases include legacy database migrations where existing UUID v3 identifiers must be regenerated, maintaining compatibility with older APIs or systems, working with third-party systems that specifically require UUID v3, or supporting legacy protocols and standards that mandate MD5-based UUIDs.",
    ],
  },
  {
    heading: "UUID v3 vs UUID v5: Understanding the Difference",
    listData: [
      "UUID v3: Uses MD5 hashing (128-bit hash algorithm)",
      "UUID v5: Uses SHA-1 hashing (160-bit hash algorithm)",
      "UUID v3: Older standard, less collision-resistant",
      "UUID v5: Newer standard, more secure hash function",
      "UUID v3: Use for legacy system compatibility",
      "UUID v5: Use for all new applications and systems",
      "Both: Same namespace + name produces same UUID deterministically",
      "Both: Use standard RFC 4122 namespaces (DNS, URL, OID, X500)",
    ],
  },
  {
    heading: "How UUID v3 Generation Works",
    blockData: [
      "UUID v3 generation follows a specific algorithm: The namespace UUID is converted to its 16-byte binary representation. The name string is encoded as UTF-8 bytes. These are concatenated and hashed using MD5, producing a 128-bit hash. This entire hash becomes the UUID, with specific version and variant bits set according to RFC 4122 standards.",
      "The version bits (4 bits set to '0011' for version 3) are placed in the time_hi_and_version field. The variant bits (2 bits set to '10') are placed in the clock_seq_hi_and_reserved field. This ensures the resulting UUID is RFC 4122 compliant and universally recognizable as a version 3 UUID.",
    ],
  },
  {
    heading: "Practical UUID v3 Use Cases",
    listData: [
      "Legacy Database Systems: Maintain compatibility with existing MD5-based UUID schemas",
      "Third-Party Integration: Work with systems that specifically require UUID v3",
      "Data Migration: Regenerate UUIDs during migration from legacy systems",
      "Backward Compatibility: Support older APIs and protocols requiring MD5 UUIDs",
      "Cross-Platform Consistency: Ensure identical UUIDs across systems using v3",
      "Historical Data: Match existing UUID v3 identifiers in archived data",
      "Protocol Compliance: Meet requirements of older standards mandating UUID v3",
    ],
  },
  {
    heading: "UUID v3 Security and Limitations",
    blockData: [
      "UUID v3 uses MD5 hashing, which is considered cryptographically weak in modern security contexts. MD5 has known collision vulnerabilities where different inputs can produce the same hash. However, for UUID generation purposes where the goal is reproducible identifiers rather than cryptographic security, UUID v3 is acceptable for legacy compatibility.",
      "Never use UUID v3 for security-sensitive applications, password hashing, or cryptographic purposes. The deterministic nature combined with MD5 weaknesses makes it unsuitable for security tokens or authentication. For new projects requiring deterministic UUIDs, always prefer UUID v5 (SHA-1) which offers better collision resistance while maintaining the same deterministic properties.",
    ],
  },
  {
    heading: "Best Practices for UUID v3",
    listData: [
      "Prefer UUID v5 for all new applications unless legacy compatibility requires v3",
      "Use standard namespaces: DNS for domains, URL for web resources",
      "Document why UUID v3 is used instead of v5 (usually legacy compatibility)",
      "Maintain consistent name formatting across your application",
      "Test compatibility with legacy systems before deployment",
      "Consider migration path from UUID v3 to UUID v5 for long-term projects",
      "Validate namespace UUIDs before generation to avoid errors",
      "Store generation parameters for reproducibility and debugging",
    ],
  },
];
