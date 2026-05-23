import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAML ⇄ JSON Converter | Bi-directional Parser",
  description: "Instantly convert YAML to JSON and JSON to YAML. Fully local, highly performant converter for DevOps and configuration files.",
  keywords: "yaml to json, json to yaml converter, online yaml parser, local json formatter",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/yaml-json-converter",
  },
  openGraph: {
    title: "YAML ⇄ JSON Converter | Bi-directional Parser",
    description: "Instantly convert YAML to JSON and JSON to YAML. Fully local, highly performant converter for DevOps and configuration files.",
    url: "https://webtoolseasy.com/tools/yaml-json-converter",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-yaml-json-converter.png",
        width: 1200,
        height: 630,
        alt: "YAML ⇄ JSON Converter | Bi-directional Parser",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "YAML ⇄ JSON Converter | Bi-directional Parser",
    description: "Instantly convert YAML to JSON and JSON to YAML. Fully local, highly performant converter for DevOps and configuration files.",
    images: ["https://webtoolseasy.com/og-images/tools-yaml-json-converter.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YAML ⇄ JSON Converter",
    "description": "Instantly convert YAML to JSON and JSON to YAML. Fully local, highly performant converter for DevOps and configuration files.",
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
