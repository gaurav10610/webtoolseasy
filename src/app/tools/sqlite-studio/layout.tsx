import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQLite Data Studio | In-Browser Database Client",
  description: "Run a full SQLite database directly in your browser using WebAssembly. Execute complex SQL queries on massive datasets locally with zero backend.",
  keywords: "sqlite online, webassembly database, browser sqlite client, run sql queries locally",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/sqlite-studio",
  },
  openGraph: {
    title: "SQLite Data Studio | In-Browser Database Client",
    description: "Run a full SQLite database directly in your browser using WebAssembly. Execute complex SQL queries on massive datasets locally with zero backend.",
    url: "https://webtoolseasy.com/tools/sqlite-studio",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-sqlite-studio.png",
        width: 1200,
        height: 630,
        alt: "SQLite Data Studio | In-Browser Database Client",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SQLite Data Studio | In-Browser Database Client",
    description: "Run a full SQLite database directly in your browser using WebAssembly. Execute complex SQL queries on massive datasets locally with zero backend.",
    images: ["https://webtoolseasy.com/og-images/tools-sqlite-studio.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SQLite Data Studio",
    "description": "Run a full SQLite database directly in your browser using WebAssembly. Execute complex SQL queries on massive datasets locally with zero backend.",
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
