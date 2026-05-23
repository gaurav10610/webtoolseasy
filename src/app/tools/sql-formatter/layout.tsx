import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL Formatter & Validator | Beautify SQL Queries",
  description: "Instantly format and beautify complex SQL queries. Supports dialect-specific parsing and catches syntax errors completely client-side.",
  keywords: "sql formatter, beautify sql query, format sql online, sql syntax checker",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/sql-formatter",
  },
  openGraph: {
    title: "SQL Formatter & Validator | Beautify SQL Queries",
    description: "Instantly format and beautify complex SQL queries. Supports dialect-specific parsing and catches syntax errors completely client-side.",
    url: "https://webtoolseasy.com/tools/sql-formatter",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-sql-formatter.png",
        width: 1200,
        height: 630,
        alt: "SQL Formatter & Validator | Beautify SQL Queries",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Formatter & Validator | Beautify SQL Queries",
    description: "Instantly format and beautify complex SQL queries. Supports dialect-specific parsing and catches syntax errors completely client-side.",
    images: ["https://webtoolseasy.com/og-images/tools-sql-formatter.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SQL Formatter & Validator",
    "description": "Instantly format and beautify complex SQL queries. Supports dialect-specific parsing and catches syntax errors completely client-side.",
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
