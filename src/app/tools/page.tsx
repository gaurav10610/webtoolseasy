import { Metadata } from "next";
import Link from "next/link";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { TOOL_META } from "@/lib/devlens/toolMeta";

export const metadata: Metadata = {
  title: "Developer Tools Directory | WebToolsEasy",
  description:
    "Browse all WebToolsEasy developer tools including JWT decoder, JSON query, regex tester, Base64, timestamp converter, and more.",
  alternates: {
    canonical: "https://webtoolseasy.com/tools",
  },
  openGraph: {
    title: "Developer Tools Directory | WebToolsEasy",
    description:
      "Browse all WebToolsEasy developer tools including JWT decoder, JSON query, regex tester, Base64, timestamp converter, and more.",
    url: "https://webtoolseasy.com/tools",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools Directory | WebToolsEasy",
    description:
      "Browse all WebToolsEasy developer tools including JWT decoder, JSON query, regex tester, Base64, timestamp converter, and more.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function ToolsIndexPage() {
  const tools = Object.values(TOOL_META).sort((a, b) =>
    a.shortTitle.localeCompare(b.shortTitle),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Developer Tools Directory",
    url: "https://webtoolseasy.com/tools",
    hasPart: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webtoolseasy.com/tools/${tool.slug}`,
      name: tool.shortTitle,
    })),
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="tools-directory-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-white">Developer Tools</h1>
        <p className="mt-3 max-w-3xl text-gray-400">
          Choose a tool and run it directly in your browser. These pages are
          also linked from DevLens, the homepage, and the app navigation for
          faster discovery.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <Link
            href="/jwt/claims"
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-semibold text-gray-100 hover:bg-black/50"
          >
            Explore JWT Claims Reference
          </Link>
          <Link
            href="/regex/patterns"
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-semibold text-gray-100 hover:bg-black/50"
          >
            Explore Regex Pattern Library
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                {tool.eyebrow}
              </div>
              <div className="mt-2 text-lg font-semibold text-white">
                {tool.shortTitle}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
