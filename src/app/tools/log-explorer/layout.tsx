import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big Data Log Explorer | Fast Virtualized Log Reader",
  description: "Analyze massive CSV/JSON log files natively in the browser. Uses Web Workers and React Virtualization to handle millions of rows without crashing.",
  keywords: "log file reader, large csv viewer, virtualized log explorer, local big data viewer",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/log-explorer",
  },
  openGraph: {
    title: "Big Data Log Explorer | Fast Virtualized Log Reader",
    description: "Analyze massive CSV/JSON log files natively in the browser. Uses Web Workers and React Virtualization to handle millions of rows without crashing.",
    url: "https://webtoolseasy.com/tools/log-explorer",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-log-explorer.png",
        width: 1200,
        height: 630,
        alt: "Big Data Log Explorer | Fast Virtualized Log Reader",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Data Log Explorer | Fast Virtualized Log Reader",
    description: "Analyze massive CSV/JSON log files natively in the browser. Uses Web Workers and React Virtualization to handle millions of rows without crashing.",
    images: ["https://webtoolseasy.com/og-images/tools-log-explorer.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Big Data Log Explorer",
    "description": "Analyze massive CSV/JSON log files natively in the browser. Uses Web Workers and React Virtualization to handle millions of rows without crashing.",
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
