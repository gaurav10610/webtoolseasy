import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Accessibility Checker | WCAG Contrast Generator",
  description: "Generate beautiful, WCAG-compliant color palettes instantly. Check color contrast ratios for AA and AAA accessibility standards natively in the browser.",
  keywords: "color a11y checker, wcag contrast ratio, accessible color palette generator",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/color-a11y",
  },
  openGraph: {
    title: "Color Accessibility Checker | WCAG Contrast Generator",
    description: "Generate beautiful, WCAG-compliant color palettes instantly. Check color contrast ratios for AA and AAA accessibility standards natively in the browser.",
    url: "https://webtoolseasy.com/tools/color-a11y",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-color-a11y.png",
        width: 1200,
        height: 630,
        alt: "Color Accessibility Checker | WCAG Contrast Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Accessibility Checker | WCAG Contrast Generator",
    description: "Generate beautiful, WCAG-compliant color palettes instantly. Check color contrast ratios for AA and AAA accessibility standards natively in the browser.",
    images: ["https://webtoolseasy.com/og-images/tools-color-a11y.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Accessibility Checker",
    "description": "Generate beautiful, WCAG-compliant color palettes instantly. Check color contrast ratios for AA and AAA accessibility standards natively in the browser.",
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
