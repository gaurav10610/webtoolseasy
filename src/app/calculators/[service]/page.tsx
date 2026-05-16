import { calculatorPages } from "@/data/calculatorPages";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

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
      images: ["https://webtoolseasy.com/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${calcData.name} (${calcData.service}) Pricing Calculator | WebToolsEasy`,
      description: calcData.description,
      images: ["https://webtoolseasy.com/opengraph-image"],
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
    <main className="min-h-screen bg-[#0A0A0B] text-white py-12 px-6">
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
          </div>
        </div>
      </div>
    </main>
  );
}
