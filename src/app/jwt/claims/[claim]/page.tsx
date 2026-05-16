import { jwtClaims } from "@/data/jwtClaims";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";

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
  const claimParam = Array.isArray(claim) ? claim[0] : claim;
  const claimData = jwtClaims.find((c) => c.id === claimParam);
  if (!claimData) return { title: "Not Found" };
  const imageUrl = `https://webtoolseasy.com/jwt/claims/${claimParam}/opengraph-image`;

  return {
    title: `JWT ${claimData.name} Claim (${claimData.fullName}) | WebToolsEasy`,
    description: claimData.description,
    keywords: [
      `jwt ${claimData.name} claim`,
      "jwt claims reference",
      "json web token claims",
      "jwt decoder",
    ],
    alternates: {
      canonical: `https://webtoolseasy.com/jwt/claims/${claimParam}`,
    },
    openGraph: {
      title: `JWT ${claimData.name} Claim (${claimData.fullName}) | WebToolsEasy`,
      description: claimData.description,
      url: `https://webtoolseasy.com/jwt/claims/${claimParam}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `JWT ${claimData.name} claim reference preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `JWT ${claimData.name} Claim (${claimData.fullName}) | WebToolsEasy`,
      description: claimData.description,
      images: [imageUrl],
    },
  };
}

export default async function JwtClaimPage({ params }: Props) {
  const { claim: rawClaim } = await params;
  const claimId = Array.isArray(rawClaim) ? rawClaim[0] : rawClaim;
  const claim = jwtClaims.find((c) => c.id === claimId);

  if (!claim) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: claim.name,
    description: claim.description,
    termCode: claim.name,
    inDefinedTermSet: "https://webtoolseasy.com/jwt/claims",
    url: `https://webtoolseasy.com/jwt/claims/${claimId}`,
  };

  const relatedLinks = [
    { href: "/tools/jwt-decoder", label: "Decode a live token" },
    {
      href: "/tools/timestamp-converter",
      label: "Validate exp/iat timestamps",
    },
    { href: "/regex/patterns", label: "Find claim validation regex" },
    { href: "/tools/regex-tester", label: "Test your claim regex" },
  ];

  return (
    <ContentPageLayout mainClassName="px-6 py-12">
      <script
        id="jwt-claim-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Related Workflows
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-200 hover:bg-black/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ContentPageLayout>
  );
}
