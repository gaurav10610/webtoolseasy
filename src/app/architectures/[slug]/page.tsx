import { architectureTemplates } from "@/data/architectureTemplates";
import { compressArchitecture } from "@/lib/archcost/shareUrl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export function generateStaticParams() {
  return architectureTemplates.map((template) => ({
    slug: template.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = architectureTemplates.find((t) => t.slug === slug);
  if (!template) return { title: "Not Found" };
  const imageUrl = `https://webtoolseasy.com/architectures/${slug}/opengraph-image`;

  return {
    title: `${template.name} Architecture Template | WebToolsEasy`,
    description: template.description,
    keywords: [
      `${template.name} aws architecture`,
      "aws architecture template",
      "cloud reference architecture",
      "architecture cost estimate",
    ],
    alternates: {
      canonical: `https://webtoolseasy.com/architectures/${slug}`,
    },
    openGraph: {
      title: `${template.name} Architecture Template | WebToolsEasy`,
      description: template.description,
      url: `https://webtoolseasy.com/architectures/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${template.name} architecture template preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} Architecture Template | WebToolsEasy`,
      description: template.description,
      images: [imageUrl],
    },
  };
}

export default async function ArchitectureTemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = architectureTemplates.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  // Compress payload for the canvas share URL
  const compressionResult = compressArchitecture(template.payload);
  const canvasUrl =
    "encoded" in compressionResult
      ? `/canvas?arch=${compressionResult.encoded}`
      : "/canvas";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${template.name} Architecture Template`,
    description: template.description,
    url: `https://webtoolseasy.com/architectures/${slug}`,
    keywords: template.tags.join(", "),
    about: template.tags.map((tag) => ({ "@type": "Thing", name: tag })),
    publisher: {
      "@type": "Organization",
      name: "WebToolsEasy",
      url: "https://webtoolseasy.com",
    },
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="architecture-template-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl">
        <Link
          href="/architectures"
          className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-flex items-center gap-2"
        >
          &larr; Back to all templates
        </Link>

        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{template.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center min-w-[200px]">
            <div className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2">
              Estimated Cost
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              ${template.estimatedCost.toFixed(2)}
              <span className="text-lg text-emerald-400/60 font-normal">
                /mo
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Architecture Overview
            </h2>
            <p className="text-gray-300 leading-7">{template.description}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Resource Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="pb-3 font-semibold">Service</th>
                    <th className="pb-3 font-semibold">Label</th>
                    <th className="pb-3 font-semibold text-right">
                      Est. Monthly Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {template.payload.nodes.map((node: any) => (
                    <tr key={node.id}>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1 text-xs border border-white/10">
                          {node.data.service}
                        </span>
                      </td>
                      <td className="py-4 font-medium text-white">
                        {node.data.label}
                      </td>
                      <td className="py-4 text-right font-mono text-emerald-400">
                        ${(node.data.costPerMonth || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Scenario Variants
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {template.scenarioVariants.map((variant) => (
                <article
                  key={variant.name}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm font-semibold text-white">
                    {variant.name}
                  </div>
                  <div className="mt-1 text-lg font-bold text-indigo-300">
                    ~${variant.monthlyEstimate.toFixed(0)}/mo
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-gray-400">
                    {variant.assumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-4">
              Assumptions & Caveats
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-sky-100/80">
              {template.assumptionNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Customize this architecture
            </h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
              Open this template in the ArchCost visual canvas to adjust
              resources, change instance types, and instantly see how it affects
              your cloud bill.
            </p>
            <Link
              href={canvasUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Open in ArchCost Canvas
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/calculators"
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-200 hover:bg-black/50"
              >
                Compare with service calculators
              </Link>
              <Link
                href="/tools/json-query"
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-200 hover:bg-black/50"
              >
                Tune config payloads in JSON Query
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
