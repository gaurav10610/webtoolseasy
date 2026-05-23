import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG to React Converter | JSX Component Generator",
  description: "Instantly convert raw SVG code into clean, accessible React and React Native (Expo) components. Optimizes SVG paths securely in the browser.",
  keywords: "svg to react, svg to jsx, svg to react native converter, accessible svg component",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/svg-to-react",
  },
  openGraph: {
    title: "SVG to React Converter | JSX Component Generator",
    description: "Instantly convert raw SVG code into clean, accessible React and React Native (Expo) components. Optimizes SVG paths securely in the browser.",
    url: "https://webtoolseasy.com/tools/svg-to-react",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-svg-to-react.png",
        width: 1200,
        height: 630,
        alt: "SVG to React Converter | JSX Component Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to React Converter | JSX Component Generator",
    description: "Instantly convert raw SVG code into clean, accessible React and React Native (Expo) components. Optimizes SVG paths securely in the browser.",
    images: ["https://webtoolseasy.com/og-images/tools-svg-to-react.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SVG to React Converter",
    "description": "Instantly convert raw SVG code into clean, accessible React and React Native (Expo) components. Optimizes SVG paths securely in the browser.",
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
