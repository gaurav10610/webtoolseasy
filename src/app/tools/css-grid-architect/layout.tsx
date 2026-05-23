import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Grid Architect | Visual Grid Layout Generator",
  description: "Visually design complex CSS Grid layouts. Add columns, rows, and manage fractional units interactively to generate raw CSS code instantly.",
  keywords: "css grid generator, visual css grid, build grid layout online, css layout generator",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/css-grid-architect",
  },
  openGraph: {
    title: "CSS Grid Architect | Visual Grid Layout Generator",
    description: "Visually design complex CSS Grid layouts. Add columns, rows, and manage fractional units interactively to generate raw CSS code instantly.",
    url: "https://webtoolseasy.com/tools/css-grid-architect",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-css-grid-architect.png",
        width: 1200,
        height: 630,
        alt: "CSS Grid Architect | Visual Grid Layout Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Grid Architect | Visual Grid Layout Generator",
    description: "Visually design complex CSS Grid layouts. Add columns, rows, and manage fractional units interactively to generate raw CSS code instantly.",
    images: ["https://webtoolseasy.com/og-images/tools-css-grid-architect.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSS Grid Architect",
    "description": "Visually design complex CSS Grid layouts. Add columns, rows, and manage fractional units interactively to generate raw CSS code instantly.",
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
