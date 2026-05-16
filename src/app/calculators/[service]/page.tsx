import { calculatorPages } from "@/data/calculatorPages";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export function generateStaticParams() {
  return calculatorPages.map((calc) => ({
    service: calc.service.toLowerCase(),
  }));
}

type Props = {
  params: Promise<{
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const calcData = calculatorPages.find(
    (c) => c.service.toLowerCase() === service,
  );
  if (!calcData) return { title: "Not Found" };
  const imageUrl = `https://webtoolseasy.com/calculators/${service}/opengraph-image`;

  return {
    title: `${calcData.name} (${calcData.service}) Pricing Calculator | WebToolsEasy`,
    description: calcData.description,
    keywords: [
      `${calcData.service} cost calculator`,
      `${calcData.service} pricing estimator`,
      "aws monthly cost",
      "cloud cost calculator",
    ],
    alternates: {
      canonical: `https://webtoolseasy.com/calculators/${service}`,
    },
    openGraph: {
      title: `${calcData.name} (${calcData.service}) Pricing Calculator | WebToolsEasy`,
      description: calcData.description,
      url: `https://webtoolseasy.com/calculators/${service}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${calcData.name} pricing calculator preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${calcData.name} (${calcData.service}) Pricing Calculator | WebToolsEasy`,
      description: calcData.description,
      images: [imageUrl],
    },
  };
}

export default async function CalculatorServicePage({ params }: Props) {
  const { service } = await params;
  const calc = calculatorPages.find((c) => c.service.toLowerCase() === service);

  if (!calc) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${calc.name} (${calc.service}) Pricing Calculator`,
    description: calc.description,
    url: `https://webtoolseasy.com/calculators/${service}`,
    about: [
      { "@type": "Thing", name: calc.service },
      { "@type": "Thing", name: "AWS Pricing" },
    ],
    publisher: {
      "@type": "Organization",
      name: "WebToolsEasy",
      url: "https://webtoolseasy.com",
    },
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="calculator-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl">
        <Link
          href="/calculators"
          className="text-amber-400 hover:text-amber-300 text-sm mb-6 inline-flex items-center gap-2"
        >
          &larr; Back to all calculators
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-4xl font-bold">{calc.name} Pricing Calculator</h1>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Service Overview
            </h2>
            <p className="text-gray-300 leading-7">{calc.description}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-4">
                Cost Components
              </h2>
              <ul className="list-inside list-disc space-y-2 text-amber-100/80">
                {calc.costComponents.map((component, i) => (
                  <li key={i}>{component}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-4">
                Optimization Best Practices
              </h2>
              <ul className="list-inside list-disc space-y-2 text-emerald-100/80">
                {calc.bestPractices.map((practice, i) => (
                  <li key={i}>{practice}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Scenario Presets
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {calc.scenarioPresets.map((preset) => (
                <article
                  key={preset.name}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm font-semibold text-white">
                    {preset.name}
                  </div>
                  <div className="mt-1 text-lg font-bold text-amber-300">
                    ~${preset.monthlyEstimate.toFixed(0)}/mo
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-gray-400">
                    {preset.assumptions.map((item) => (
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
              {calc.assumptionNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to estimate costs?
            </h2>
            <p className="text-indigo-200 mb-6">
              Use our visual ArchCost canvas to drag and drop {calc.name} nodes
              and configure them for real-time pricing estimates.
            </p>
            <Link
              href="/canvas"
              className="inline-flex rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Open ArchCost Canvas
            </Link>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/architectures"
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-200 hover:bg-black/50"
              >
                Browse architecture templates
              </Link>
              <Link
                href="/tools/json-query"
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-200 hover:bg-black/50"
              >
                Model config inputs with JSON Query
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
