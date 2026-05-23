import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron Expression Generator & Explainer | Free Online Utility",
  description: "Translate complex Cron expressions into plain English instantly. Build schedules interactively without memorizing cron syntax.",
  keywords: "cron explainer, cron expression generator, translate cron to english, cronstrue online",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/cron-explainer",
  },
  openGraph: {
    title: "Cron Expression Generator & Explainer | Free Online Utility",
    description: "Translate complex Cron expressions into plain English instantly. Build schedules interactively without memorizing cron syntax.",
    url: "https://webtoolseasy.com/tools/cron-explainer",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-cron-explainer.png",
        width: 1200,
        height: 630,
        alt: "Cron Expression Generator & Explainer | Free Online Utility",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Expression Generator & Explainer | Free Online Utility",
    description: "Translate complex Cron expressions into plain English instantly. Build schedules interactively without memorizing cron syntax.",
    images: ["https://webtoolseasy.com/og-images/tools-cron-explainer.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cron Expression Generator & Explainer",
    "description": "Translate complex Cron expressions into plain English instantly. Build schedules interactively without memorizing cron syntax.",
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
