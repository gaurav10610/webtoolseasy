import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "Privacy | WebToolsEasy",
  description:
    "How WebToolsEasy keeps developer data local-first and minimizes server-side exposure.",
  alternates: {
    canonical: "https://webtoolseasy.com/privacy",
  },
  openGraph: {
    title: "Privacy | WebToolsEasy",
    description:
      "How WebToolsEasy keeps developer data local-first and minimizes server-side exposure.",
    url: "https://webtoolseasy.com/privacy",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy | WebToolsEasy",
    description:
      "How WebToolsEasy keeps developer data local-first and minimizes server-side exposure.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function PrivacyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy | WebToolsEasy",
    description:
      "How WebToolsEasy keeps developer data local-first and minimizes server-side exposure.",
    url: "https://webtoolseasy.com/privacy",
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-16 text-white">
      <script
        id="privacy-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-300">
          Privacy
        </div>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Local-first by design.
        </h1>
        <p className="mt-6 text-base leading-8 text-gray-400 md:text-lg">
          DevLens and ArchCost are built to keep sensitive data on your machine
          whenever possible. The core workflows run in the browser, and sharing
          is focused on configuration rather than raw payloads.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-7 text-gray-300">
          <p>What we do:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>
              Process developer data locally in the browser for the core tools.
            </li>
            <li>
              Keep shared URLs focused on tool configuration and architecture
              state.
            </li>
            <li>
              Keep sharing payloads URL-based so architecture context stays
              transparent and portable.
            </li>
          </ul>
          <p>What we do not do:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Upload pasted secrets or payloads just to render a result.</li>
            <li>
              Build user profiles or inspect private tool input for analytics.
            </li>
            <li>Require accounts for the basic workflows.</li>
          </ul>
        </div>
      </div>
    </ContentPageLayout>
  );
}
