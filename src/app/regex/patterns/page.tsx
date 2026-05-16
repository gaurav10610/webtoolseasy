import { regexPatterns } from "@/data/regexPatterns";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "Regex Patterns Library | WebToolsEasy",
  description:
    "A library of common regular expression patterns for email, UUID, IP addresses, and more.",
  keywords: [
    "regex patterns library",
    "regular expression examples",
    "email regex",
    "uuid regex",
    "ip address regex",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/regex/patterns",
  },
  openGraph: {
    title: "Regex Patterns Library | WebToolsEasy",
    description:
      "A library of common regular expression patterns for email, UUID, IP addresses, and more.",
    url: "https://webtoolseasy.com/regex/patterns",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Patterns Library | WebToolsEasy",
    description:
      "A library of common regular expression patterns for email, UUID, IP addresses, and more.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

type RegexPatternsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RegexPatternsIndex({
  searchParams,
}: RegexPatternsPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const filteredPatterns = regexPatterns.filter((pattern) => {
    if (!query) return true;
    const haystack = [
      pattern.name,
      pattern.slug,
      pattern.pattern,
      pattern.description,
      ...pattern.useCases,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Regex Patterns Library",
    url: "https://webtoolseasy.com/regex/patterns",
    hasPart: filteredPatterns.map((pattern, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webtoolseasy.com/regex/patterns/${pattern.slug}`,
      name: pattern.name,
    })),
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="regex-patterns-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Regex Patterns Library</h1>
        <p className="text-gray-400 mb-8">
          A collection of common regular expressions ready to use. Click on any
          pattern to view details, test cases, and test it in our Regex Tester.
        </p>

        <form className="mb-6" action="/regex/patterns" method="get">
          <label htmlFor="regex-pattern-search" className="sr-only">
            Search regex patterns
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="regex-pattern-search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by use case, name, or pattern"
              className="w-full rounded-xl border border-white/10 bg-[#121214] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-pink-500/60"
            />
            <button
              type="submit"
              className="rounded-xl bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500"
            >
              Search
            </button>
          </div>
        </form>

        <p className="mb-6 text-xs text-gray-500">
          Showing {filteredPatterns.length} of {regexPatterns.length} patterns
          {query ? ` for "${q}"` : ""}.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPatterns.map((pattern) => (
            <Link
              key={pattern.slug}
              href={`/regex/patterns/${pattern.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              <h2 className="text-lg font-bold mb-2">{pattern.name}</h2>
              <code className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-pink-400 bg-pink-400/10 px-2 py-1 rounded mb-3">
                /{pattern.pattern}/{pattern.flags}
              </code>
              <p className="text-sm text-gray-400 line-clamp-2">
                {pattern.description}
              </p>
            </Link>
          ))}

          {filteredPatterns.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-gray-400">
              No patterns matched that search. Try broader terms like "email",
              "url", or "date".
            </div>
          ) : null}
        </div>
      </div>
    </ContentPageLayout>
  );
}
