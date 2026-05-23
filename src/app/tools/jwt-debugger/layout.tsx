import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Debugger | Decode JSON Web Tokens Online",
  description: "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. Sensitive JWT payloads never touch a server.",
  keywords: "jwt debugger, decode jwt online, secure json web token reader, local jwt inspector",
  alternates: {
    canonical: "https://webtoolseasy.com/tools/jwt-debugger",
  },
  openGraph: {
    title: "JWT Debugger | Decode JSON Web Tokens Online",
    description: "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. Sensitive JWT payloads never touch a server.",
    url: "https://webtoolseasy.com/tools/jwt-debugger",
    images: [
      {
        url: "https://webtoolseasy.com/og-images/tools-jwt-debugger.png",
        width: 1200,
        height: 630,
        alt: "JWT Debugger | Decode JSON Web Tokens Online",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Debugger | Decode JSON Web Tokens Online",
    description: "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. Sensitive JWT payloads never touch a server.",
    images: ["https://webtoolseasy.com/og-images/tools-jwt-debugger.png"]
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Inject JSON-LD structured data for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JWT Debugger",
    "description": "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. Sensitive JWT payloads never touch a server.",
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
