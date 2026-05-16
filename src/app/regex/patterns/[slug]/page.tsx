import { regexPatterns } from "@/data/regexPatterns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export function generateStaticParams() {
  return regexPatterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const patternData = regexPatterns.find((p) => p.slug === slug);
  if (!patternData) return { title: "Not Found" };

  return {
    title: `${patternData.name} Regex Pattern | WebToolsEasy`,
    description: patternData.description,
    keywords: [
      `${patternData.name} regex`,
      "regular expression pattern",
      "regex examples",
      "regex tester",
    ],
    alternates: {
      canonical: `https://webtoolseasy.com/regex/patterns/${slug}`,
    },
    openGraph: {
      title: `${patternData.name} Regex Pattern | WebToolsEasy`,
      description: patternData.description,
      url: `https://webtoolseasy.com/regex/patterns/${slug}`,
      images: ["https://webtoolseasy.com/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${patternData.name} Regex Pattern | WebToolsEasy`,
      description: patternData.description,
      images: ["https://webtoolseasy.com/opengraph-image"],
    },
  };
}

export default async function RegexPatternPage({ params }: Props) {
  const { slug } = await params;
  const pattern = regexPatterns.find((p) => p.slug === slug);

  if (!pattern) {
    notFound();
  }

  // Use the first passing example as the default test string in the link
  const defaultTestString = pattern.testExamples.passing[0] || "";
  const testerUrl = `/tools/regex-tester?pattern=${encodeURIComponent(pattern.pattern)}&flags=${encodeURIComponent(pattern.flags)}&testString=${encodeURIComponent(defaultTestString)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${pattern.name} Regex Pattern`,
    description: pattern.description,
    url: `https://webtoolseasy.com/regex/patterns/${slug}`,
    about: [
      { "@type": "Thing", name: "Regular Expressions" },
      { "@type": "Thing", name: pattern.name },
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
        id="regex-pattern-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/regex/patterns"
          className="text-pink-400 hover:text-pink-300 text-sm mb-6 inline-flex items-center gap-2"
        >
          &larr; Back to all patterns
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{pattern.name}</h1>
          <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-4 font-mono text-lg text-pink-300 overflow-x-auto whitespace-pre">
            /{pattern.pattern}/{pattern.flags}
          </div>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Description
            </h2>
            <p className="text-gray-300 leading-7">{pattern.description}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-4">
                Passing Examples
              </h2>
              <ul className="space-y-2">
                {pattern.testExamples.passing.map((example, i) => (
                  <li
                    key={i}
                    className="font-mono text-sm text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded break-all"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-4">
                Failing Examples
              </h2>
              <ul className="space-y-2">
                {pattern.testExamples.failing.map((example, i) => (
                  <li
                    key={i}
                    className="font-mono text-sm text-rose-300 bg-rose-500/10 px-2 py-1 rounded break-all"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Common Use Cases
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-300">
              {pattern.useCases.map((useCase, i) => (
                <li key={i}>{useCase}</li>
              ))}
            </ul>
          </section>

          <div className="pt-4">
            <Link
              href={testerUrl}
              className="inline-flex rounded-xl bg-pink-600 px-8 py-4 text-sm font-bold hover:bg-pink-500 transition-colors shadow-lg shadow-pink-600/20"
            >
              Open in Interactive Regex Tester
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
