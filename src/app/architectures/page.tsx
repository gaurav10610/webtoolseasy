import { architectureTemplates } from "@/data/architectureTemplates";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "AWS Architecture Templates | WebToolsEasy",
  description:
    "Browse pre-configured AWS cloud architecture templates and instantly load them into the ArchCost canvas for cost estimation.",
  keywords: [
    "aws architecture templates",
    "cloud architecture examples",
    "aws reference architecture cost",
    "cloud cost planning templates",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/architectures",
  },
  openGraph: {
    title: "AWS Architecture Templates | WebToolsEasy",
    description:
      "Browse pre-configured AWS cloud architecture templates and instantly load them into the ArchCost canvas for cost estimation.",
    url: "https://webtoolseasy.com/architectures",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Architecture Templates | WebToolsEasy",
    description:
      "Browse pre-configured AWS cloud architecture templates and instantly load them into the ArchCost canvas for cost estimation.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

export default function ArchitecturesIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AWS Architecture Templates",
    url: "https://webtoolseasy.com/architectures",
    hasPart: architectureTemplates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webtoolseasy.com/architectures/${template.slug}`,
      name: template.name,
    })),
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="architectures-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-sm text-indigo-100">
          These are starter examples for ArchCost. Pick a template, then load it
          into the canvas and customize it for your environment.
          <Link
            href="/canvas"
            className="ml-2 inline-flex font-semibold text-indigo-300 hover:text-indigo-200"
          >
            Open ArchCost Canvas
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">Architecture Templates</h1>
        <p className="text-gray-400 mb-8">
          Browse common cloud architectures, view their estimated monthly costs,
          and load them into the ArchCost canvas to customize for your own
          needs.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {architectureTemplates.map((template) => (
            <Link
              key={template.slug}
              href={`/architectures/${template.slug}`}
              className="block rounded-3xl border border-white/10 bg-[#121214] overflow-hidden hover:bg-white/5 transition-colors group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold">{template.name}</h2>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-400 border border-emerald-500/20">
                    ${template.estimatedCost.toFixed(2)}/mo
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
