import { jwtClaims } from "@/data/jwtClaims";
import Link from "next/link";
import { Metadata } from "next";

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
};

export default function JwtClaimsIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "JWT Claims Reference",
    url: "https://webtoolseasy.com/jwt/claims",
    hasPart: jwtClaims.map((claim, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webtoolseasy.com/jwt/claims/${claim.id}`,
      name: claim.fullName,
    })),
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white py-12 px-6">
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

        <div className="grid gap-4 md:grid-cols-2">
          {jwtClaims.map((claim) => (
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
        </div>
      </div>
    </main>
  );
}
