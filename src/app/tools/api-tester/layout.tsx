import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API & Network Sandbox | Free Browser API Client",
  description: "Test your localhost APIs instantly from the browser. A lightweight Postman alternative that runs securely on your local network. No backend required.",
  keywords: "api tester online, browser api client, local postman alternative, test localhost api, fetch sandbox",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/api-tester",
  },
  openGraph: {
    title: "API & Network Sandbox | Free Browser API Client",
    description: "Test your localhost APIs instantly from the browser. A lightweight Postman alternative that runs securely on your local network. No backend required.",
    url: "https://webtoolseasy.com/tools/api-tester",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-api-tester.png",
        width: 1200,
        height: 630,
        alt: "API & Network Sandbox | Free Browser API Client",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "API & Network Sandbox | Free Browser API Client",
    description: "Test your localhost APIs instantly from the browser. A lightweight Postman alternative that runs securely on your local network. No backend required.",
    images: ["https://webtoolseasy.com/og-images/tools-api-tester.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "API & Network Sandbox",
    "description": "Test your localhost APIs instantly from the browser. A lightweight Postman alternative that runs securely on your local network. No backend required.",
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
