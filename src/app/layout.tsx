import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://webtoolseasy.com"),
  title: "WebToolsEasy | DevLens and ArchCost",
  description:
    "A privacy-first developer studio for smart data inspection and cloud cost planning. DevLens and ArchCost run locally first with shareable configurations.",
  keywords:
    "DevLens, ArchCost, JWT decoder, JSON inspector, Base64 encoder, cloud cost planner, privacy-first developer tools",
  openGraph: {
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "A privacy-first developer studio for smart data inspection and cloud cost planning.",
    type: "website",
    url: "https://webtoolseasy.com",
    siteName: "WebToolsEasy",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "A privacy-first developer studio for smart data inspection and cloud cost planning.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.className} bg-[#0A0A0B] text-gray-100 antialiased`}
      >
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
