import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSA Key Pair Generator | Secure Local Crypto",
  description: "Generate secure RSA-OAEP public and private key pairs entirely within your browser using the native Web Crypto API. No backend, total privacy.",
  keywords: "rsa key generator, generate public private key, web crypto api, secure key pair online",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/rsa-generator",
  },
  openGraph: {
    title: "RSA Key Pair Generator | Secure Local Crypto",
    description: "Generate secure RSA-OAEP public and private key pairs entirely within your browser using the native Web Crypto API. No backend, total privacy.",
    url: "https://webtoolseasy.com/tools/rsa-generator",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-rsa-generator.png",
        width: 1200,
        height: 630,
        alt: "RSA Key Pair Generator | Secure Local Crypto",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RSA Key Pair Generator | Secure Local Crypto",
    description: "Generate secure RSA-OAEP public and private key pairs entirely within your browser using the native Web Crypto API. No backend, total privacy.",
    images: ["https://webtoolseasy.com/og-images/tools-rsa-generator.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RSA Key Pair Generator",
    "description": "Generate secure RSA-OAEP public and private key pairs entirely within your browser using the native Web Crypto API. No backend, total privacy.",
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
