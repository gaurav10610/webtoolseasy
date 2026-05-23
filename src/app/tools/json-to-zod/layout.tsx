import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Zod Schema Converter | TypeScript Schema Generator",
  description: "Instantly convert complex JSON objects into strongly-typed Zod schemas with nested TypeScript interfaces. Perfect for modern full-stack development.",
  keywords: "json to zod, generate zod schema, json to typescript, zod online converter",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/json-to-zod",
  },
  openGraph: {
    title: "JSON to Zod Schema Converter | TypeScript Schema Generator",
    description: "Instantly convert complex JSON objects into strongly-typed Zod schemas with nested TypeScript interfaces. Perfect for modern full-stack development.",
    url: "https://webtoolseasy.com/tools/json-to-zod",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-json-to-zod.png",
        width: 1200,
        height: 630,
        alt: "JSON to Zod Schema Converter | TypeScript Schema Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to Zod Schema Converter | TypeScript Schema Generator",
    description: "Instantly convert complex JSON objects into strongly-typed Zod schemas with nested TypeScript interfaces. Perfect for modern full-stack development.",
    images: ["https://webtoolseasy.com/og-images/tools-json-to-zod.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON to Zod Schema Converter",
    "description": "Instantly convert complex JSON objects into strongly-typed Zod schemas with nested TypeScript interfaces. Perfect for modern full-stack development.",
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
