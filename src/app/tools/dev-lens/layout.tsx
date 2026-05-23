import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevLens Studio | Smart Paste Decoder & Format Workbench",
  description: "A unified, local-first developer workbench. Paste JWT, Base64, JSON, Regex, Cron, SQL, and more. DevLens automatically detects the type and opens a specialized tool.",
  keywords: "smart decoder, dev lens, unified workbench, auto detect json jwt base64, local first developer tools",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/dev-lens",
  },
  openGraph: {
    title: "DevLens Studio | Smart Paste Decoder & Format Workbench",
    description: "A unified, local-first developer workbench. Paste JWT, Base64, JSON, Regex, Cron, SQL, and more. DevLens automatically detects the type and opens a specialized tool.",
    url: "https://webtoolseasy.com/tools/dev-lens",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-dev-lens.png",
        width: 1200,
        height: 630,
        alt: "DevLens Studio | Smart Paste Decoder & Format Workbench",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLens Studio | Smart Paste Decoder & Format Workbench",
    description: "A unified, local-first developer workbench. Paste JWT, Base64, JSON, Regex, Cron, SQL, and more. DevLens automatically detects the type and opens a specialized tool.",
    images: ["https://webtoolseasy.com/og-images/tools-dev-lens.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DevLens Studio",
    "description": "A unified, local-first developer workbench. Paste JWT, Base64, JSON, Regex, Cron, SQL, and more. DevLens automatically detects the type and opens a specialized tool.",
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
