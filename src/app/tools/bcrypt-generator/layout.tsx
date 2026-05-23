import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bcrypt Hash Generator | Secure Password Hashing",
  description: "Generate secure Bcrypt hashes online instantly. Choose your salt rounds and verify password matches. 100% client-side for maximum security.",
  keywords: "bcrypt generator, online bcrypt hash, bcrypt password checker, secure hash generator",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/bcrypt-generator",
  },
  openGraph: {
    title: "Bcrypt Hash Generator | Secure Password Hashing",
    description: "Generate secure Bcrypt hashes online instantly. Choose your salt rounds and verify password matches. 100% client-side for maximum security.",
    url: "https://webtoolseasy.com/tools/bcrypt-generator",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-bcrypt-generator.png",
        width: 1200,
        height: 630,
        alt: "Bcrypt Hash Generator | Secure Password Hashing",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bcrypt Hash Generator | Secure Password Hashing",
    description: "Generate secure Bcrypt hashes online instantly. Choose your salt rounds and verify password matches. 100% client-side for maximum security.",
    images: ["https://webtoolseasy.com/og-images/tools-bcrypt-generator.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Bcrypt Hash Generator",
    "description": "Generate secure Bcrypt hashes online instantly. Choose your salt rounds and verify password matches. 100% client-side for maximum security.",
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
