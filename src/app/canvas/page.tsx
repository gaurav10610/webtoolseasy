import { Metadata } from "next";
import { ArchitectureCanvas } from "@/components/canvas/ArchitectureCanvas";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "Visual Cloud Architecture Estimator | ArchCost",
  description:
    "Drag and drop AWS resources onto a canvas to instantly visualize your architecture and calculate real-time monthly costs.",
  keywords: [
    "aws cost calculator",
    "cloud architecture cost estimator",
    "aws pricing calculator alternative",
    "cloud cost comparison",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/canvas",
  },
  openGraph: {
    title: "Visual Cloud Architecture Estimator | ArchCost",
    description:
      "Design AWS architectures visually with live pricing, transfer costs, and exports.",
    url: "https://webtoolseasy.com/canvas",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Cloud Architecture Estimator | ArchCost",
    description:
      "Drag and drop AWS resources onto a canvas to instantly visualize your architecture and calculate real-time monthly costs.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function CanvasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ArchCost",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://webtoolseasy.com/canvas",
    description:
      "Visual AWS architecture cost estimator with service-level pricing, transfer-cost modeling, and side-by-side comparison mode.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <ContentPageLayout
      showExploreStrip={false}
      showFooter={false}
      width="full"
      mainClassName="p-0"
    >
      <script
        id="canvas-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="h-[calc(100vh-80px)] w-full bg-[#0A0A0B]">
        <ArchitectureCanvas />
      </main>
    </ContentPageLayout>
  );
}
