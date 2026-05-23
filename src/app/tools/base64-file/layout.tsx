import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 File Converter | Encode & Decode Files Online",
  description: "Instantly convert images, PDFs, and files to Base64 encoded strings natively in your browser. 100% secure, files never leave your computer.",
  keywords: "base64 file converter, encode image to base64, base64 to file decode, secure base64 online",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/base64-file",
  },
  openGraph: {
    title: "Base64 File Converter | Encode & Decode Files Online",
    description: "Instantly convert images, PDFs, and files to Base64 encoded strings natively in your browser. 100% secure, files never leave your computer.",
    url: "https://webtoolseasy.com/tools/base64-file",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-base64-file.png",
        width: 1200,
        height: 630,
        alt: "Base64 File Converter | Encode & Decode Files Online",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 File Converter | Encode & Decode Files Online",
    description: "Instantly convert images, PDFs, and files to Base64 encoded strings natively in your browser. 100% secure, files never leave your computer.",
    images: ["https://webtoolseasy.com/og-images/tools-base64-file.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 File Converter",
    "description": "Instantly convert images, PDFs, and files to Base64 encoded strings natively in your browser. 100% secure, files never leave your computer.",
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
