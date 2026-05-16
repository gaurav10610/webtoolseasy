import { jwtClaims } from "@/data/jwtClaims";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export function generateStaticParams() {
  return jwtClaims.map((claim) => ({
    claim: claim.id,
  }));
}

type Props = {
  params: Promise<{
    claim: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { claim } = await params;
  const claimData = jwtClaims.find((c) => c.id === claim);
  if (!claimData) return { title: "Not Found" };

  return {
    title: `JWT ${claimData.name} Claim (${claimData.fullName}) | WebToolsEasy`,
    description: claimData.description,
    alternates: {
      canonical: `https://webtoolseasy.com/jwt/claims/${claim}`,
    },
  };
}

export default async function JwtClaimPage({ params }: Props) {
  const { claim: claimId } = await params;
  const claim = jwtClaims.find((c) => c.id === claimId);

  if (!claim) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white py-12 px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/jwt/claims"
          className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-flex items-center gap-2"
        >
          &larr; Back to all claims
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-4xl font-bold">
            <code className="text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-lg">
              {claim.name}
            </code>
          </h1>
          <span className="text-2xl text-gray-400">{claim.fullName}</span>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Description
            </h2>
            <p className="text-gray-300 leading-7">{claim.description}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Expected Type
              </h2>
              <code className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                {claim.type}
              </code>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                Example Value
              </h2>
              <code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded break-all">
                {claim.example}
              </code>
            </div>
          </section>

          {claim.securityNote && (
            <section className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-4">
                Security Note
              </h2>
              <p className="text-rose-200/80 leading-7">{claim.securityNote}</p>
            </section>
          )}

          <div className="flex gap-4 pt-4">
            <Link
              href="/tools/jwt-decoder"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold hover:bg-indigo-500 transition-colors"
            >
              Test in JWT Decoder
            </Link>
            {claim.rfcLink && (
              <a
                href={claim.rfcLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Read RFC 7519
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
