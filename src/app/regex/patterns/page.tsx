import { regexPatterns } from "@/data/regexPatterns";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Patterns Library | WebToolsEasy",
  description:
    "A library of common regular expression patterns for email, UUID, IP addresses, and more.",
  alternates: {
    canonical: "https://webtoolseasy.com/regex/patterns",
  },
};

export default function RegexPatternsIndex() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Regex Patterns Library</h1>
        <p className="text-gray-400 mb-8">
          A collection of common regular expressions ready to use. Click on any
          pattern to view details, test cases, and test it in our Regex Tester.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {regexPatterns.map((pattern) => (
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
        </div>
      </div>
    </main>
  );
}
