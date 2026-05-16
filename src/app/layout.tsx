import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://webtoolseasy.com"),
  title: "WebToolsEasy | DevLens and ArchCost",
  description:
    "A privacy-first developer studio for smart data inspection and cloud cost planning. DevLens and ArchCost run locally first with shareable configurations.",
  keywords:
    "developer tools, jwt decoder online, regex tester, json formatter, base64 decoder, timestamp converter, env file editor, aws cost calculator, cloud architecture cost estimator, privacy-first developer tools",
  openGraph: {
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "A privacy-first developer studio for smart data inspection and cloud cost planning.",
    type: "website",
    url: "https://webtoolseasy.com",
    siteName: "WebToolsEasy",
    images: [
      {
        url: "https://webtoolseasy.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WebToolsEasy DevLens and ArchCost",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "A privacy-first developer studio for smart data inspection and cloud cost planning.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId =
    process.env.GA_CODE?.trim() || process.env.NEXT_PUBLIC_GA_ID?.trim();
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebToolsEasy",
    url: "https://webtoolseasy.com",
    description:
      "Privacy-first developer studio with DevLens smart paste tooling and ArchCost AWS architecture cost planning.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://webtoolseasy.com/tools/{query}",
      "query-input": "required name=query",
    },
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.className} bg-[#0A0A0B] text-gray-100 antialiased`}
      >
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
