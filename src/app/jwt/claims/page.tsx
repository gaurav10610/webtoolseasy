import { jwtClaims } from "@/data/jwtClaims";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "JWT Claims Reference | WebToolsEasy",
  description:
    "A comprehensive reference of standard JSON Web Token (JWT) claims, their types, and security implications.",
  keywords: [
    "jwt claims reference",
    "jwt claim meanings",
    "exp claim",
    "iss aud sub jwt",
    "jwt security claims",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/jwt/claims",
  },
  openGraph: {
    title: "JWT Claims Reference | WebToolsEasy",
    description:
      "A comprehensive reference of standard JSON Web Token (JWT) claims, their types, and security implications.",
    url: "https://webtoolseasy.com/jwt/claims",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Claims Reference | WebToolsEasy",
    description:
      "A comprehensive reference of standard JSON Web Token (JWT) claims, their types, and security implications.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

type JwtClaimsIndexProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function JwtClaimsIndex({
  searchParams,
}: JwtClaimsIndexProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const filteredClaims = jwtClaims.filter((claim) => {
    if (!query) return true;
    const haystack = [
      claim.id,
      claim.name,
      claim.fullName,
      claim.description,
      claim.type,
      claim.securityNote ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "JWT Claims Reference",
    url: "https://webtoolseasy.com/jwt/claims",
    hasPart: filteredClaims.map((claim, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webtoolseasy.com/jwt/claims/${claim.id}`,
      name: claim.fullName,
    })),
  };

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="jwt-claims-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">JWT Claims Reference</h1>
        <p className="text-gray-400 mb-8">
          A claim is a piece of information asserted about a subject. A JWT
          contains claims in its payload. Here is a reference of the standard
          IANA registered JWT claims.
        </p>

        <form className="mb-6" action="/jwt/claims" method="get">
          <label htmlFor="jwt-claims-search" className="sr-only">
            Search JWT claims
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="jwt-claims-search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by claim name, purpose, or security note"
              className="w-full rounded-xl border border-white/10 bg-[#121214] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-500/60"
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Search
            </button>
          </div>
        </form>

        <p className="mb-6 text-xs text-gray-500">
          Showing {filteredClaims.length} of {jwtClaims.length} claims
          {query ? ` for "${q}"` : ""}.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredClaims.map((claim) => (
            <Link
              key={claim.id}
              href={`/jwt/claims/${claim.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <code className="text-indigo-400 font-bold bg-indigo-400/10 px-2 py-1 rounded">
                  {claim.name}
                </code>
                <span className="text-sm font-semibold">{claim.fullName}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {claim.description}
              </p>
            </Link>
          ))}

          {filteredClaims.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-gray-400">
              No claims matched that search. Try terms like "expiry", "issuer",
              "mfa", or "audience".
            </div>
          ) : null}
        </div>
      </div>
    </ContentPageLayout>
  );
}
