import { Metadata } from "next";
import { Studio } from "@/components/devlens/Studio";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "DevLens Studio | WebToolsEasy",
  description:
    "Smart Paste workbench for JWT, JSON, Base64, timestamps, regex, and more. Inspect data locally in your browser.",
  keywords: [
    "smart paste tool",
    "jwt decoder online",
    "json formatter",
    "regex tester",
    "base64 decoder",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/studio",
  },
  openGraph: {
    title: "DevLens Studio | WebToolsEasy",
    description:
      "Inspect JWT, JSON, regex, Base64, timestamps, certs, and more with Smart Paste.",
    url: "https://webtoolseasy.com/studio",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLens Studio | WebToolsEasy",
    description:
      "Smart Paste workbench for JWT, JSON, Base64, timestamps, regex, and more. Inspect data locally in your browser.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function StudioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLens Studio",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://webtoolseasy.com/studio",
    description:
      "Smart paste workbench for decoding and inspecting developer payloads including JWT, JSON, regex, Base64, and certificates.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <ContentPageLayout
      showExploreStrip={false}
      mainClassName="py-0"
      showFooter={false}
    >
      <script
        id="studio-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Studio />
    </ContentPageLayout>
  );
}
