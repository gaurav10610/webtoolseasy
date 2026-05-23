import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text & JSON Diff Checker | Compare Files Online",
  description: "Compare text and JSON files instantly. High-performance, side-by-side local diff tool for developers. 100% secure, data never leaves your browser.",
  keywords: "diff checker online, compare json files, text diff tool, local diff checker",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/diff-checker",
  },
  openGraph: {
    title: "Text & JSON Diff Checker | Compare Files Online",
    description: "Compare text and JSON files instantly. High-performance, side-by-side local diff tool for developers. 100% secure, data never leaves your browser.",
    url: "https://webtoolseasy.com/tools/diff-checker",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-diff-checker.png",
        width: 1200,
        height: 630,
        alt: "Text & JSON Diff Checker | Compare Files Online",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Text & JSON Diff Checker | Compare Files Online",
    description: "Compare text and JSON files instantly. High-performance, side-by-side local diff tool for developers. 100% secure, data never leaves your browser.",
    images: ["https://webtoolseasy.com/og-images/tools-diff-checker.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text & JSON Diff Checker",
    "description": "Compare text and JSON files instantly. High-performance, side-by-side local diff tool for developers. 100% secure, data never leaves your browser.",
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
