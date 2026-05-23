import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Explainer & Tester | Visual Regular Expressions",
  description: "Visually break down and test complex Regular Expressions. Provides an interactive AST tree to help you understand exact regex matches.",
  keywords: "regex explainer, regular expression tester, regex visualizer, test regex online",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/regex-explainer",
  },
  openGraph: {
    title: "Regex Explainer & Tester | Visual Regular Expressions",
    description: "Visually break down and test complex Regular Expressions. Provides an interactive AST tree to help you understand exact regex matches.",
    url: "https://webtoolseasy.com/tools/regex-explainer",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-regex-explainer.png",
        width: 1200,
        height: 630,
        alt: "Regex Explainer & Tester | Visual Regular Expressions",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Explainer & Tester | Visual Regular Expressions",
    description: "Visually break down and test complex Regular Expressions. Provides an interactive AST tree to help you understand exact regex matches.",
    images: ["https://webtoolseasy.com/og-images/tools-regex-explainer.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Regex Explainer & Tester",
    "description": "Visually break down and test complex Regular Expressions. Provides an interactive AST tree to help you understand exact regex matches.",
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
