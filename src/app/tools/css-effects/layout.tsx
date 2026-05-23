import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Glassmorphism & Shadow Builder | Tailwind Code Generator",
  description: "Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or standard CSS.",
  keywords: "css glassmorphism generator, css shadow builder, tailwind shadow generator, frosted glass css",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/css-effects",
  },
  openGraph: {
    title: "CSS Glassmorphism & Shadow Builder | Tailwind Code Generator",
    description: "Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or standard CSS.",
    url: "https://webtoolseasy.com/tools/css-effects",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-css-effects.png",
        width: 1200,
        height: 630,
        alt: "CSS Glassmorphism & Shadow Builder | Tailwind Code Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Glassmorphism & Shadow Builder | Tailwind Code Generator",
    description: "Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or standard CSS.",
    images: ["https://webtoolseasy.com/og-images/tools-css-effects.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSS Glassmorphism & Shadow Builder",
    "description": "Design perfect frosted glass and modern multi-layered shadows visually. Instantly export highly-optimized Tailwind CSS classes or standard CSS.",
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
