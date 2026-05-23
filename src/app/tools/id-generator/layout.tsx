import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID & ULID Generator | Extract Timestamps",
  description: "Generate bulk UUIDv4, UUIDv7, and ULIDs instantly. Decode and extract exact timestamps from UUIDv7 and ULID strings securely in the browser.",
  keywords: "uuid generator, ulid generator online, uuidv7 timestamp extractor, bulk id generator",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/id-generator",
  },
  openGraph: {
    title: "UUID & ULID Generator | Extract Timestamps",
    description: "Generate bulk UUIDv4, UUIDv7, and ULIDs instantly. Decode and extract exact timestamps from UUIDv7 and ULID strings securely in the browser.",
    url: "https://webtoolseasy.com/tools/id-generator",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-id-generator.png",
        width: 1200,
        height: 630,
        alt: "UUID & ULID Generator | Extract Timestamps",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID & ULID Generator | Extract Timestamps",
    description: "Generate bulk UUIDv4, UUIDv7, and ULIDs instantly. Decode and extract exact timestamps from UUIDv7 and ULID strings securely in the browser.",
    images: ["https://webtoolseasy.com/og-images/tools-id-generator.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UUID & ULID Generator",
    "description": "Generate bulk UUIDv4, UUIDv7, and ULIDs instantly. Decode and extract exact timestamps from UUIDv7 and ULID strings securely in the browser.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
