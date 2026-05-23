import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://webtoolseasy.com"),
  title: "WebToolsEasy | 20+ Free Developer Workbenches & Mock APIs",
  description:
    "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
  keywords:
    "developer tools, mock apis, json to zod converter, css glassmorphism generator, jwt debugger local, regex explainer, mock api generator, sql formatter online, svg to react converter, docker compose builder",
  openGraph: {
    title: "WebToolsEasy | 20+ Free Developer Workbenches",
    description:
      "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
    type: "website",
    url: "https://webtoolseasy.com",
    siteName: "WebToolsEasy",
    images: [
      {
        url: "https://webtoolseasy.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WebToolsEasy Free Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy | 20+ Free Developer Workbenches",
    description:
      "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches including JSON/Zod converters, SQL formatters, JWT debuggers, CSS generators, and instant Mock APIs.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon_48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/favicon_512.png",
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
      "The ultimate free hub for frontend developers. Access 20+ locally-sandboxed workbenches and instant Mock APIs.",
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
