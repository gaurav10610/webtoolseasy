import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "WebToolsEasy | DevLens and ArchCost",
  description:
    "A privacy-first developer studio for smart data inspection and cloud cost planning. Paste anything, understand everything, and plan confidently.",
  keywords: [
    "developer tools",
    "jwt decoder online",
    "regex tester",
    "json formatter",
    "base64 decoder",
    "aws cost calculator",
    "cloud architecture cost estimator",
  ],
  alternates: {
    canonical: "https://webtoolseasy.com/",
  },
  openGraph: {
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "Smart paste developer tools and visual AWS cost planning, local-first.",
    url: "https://webtoolseasy.com/",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolsEasy | DevLens and ArchCost",
    description:
      "Smart paste developer tools and visual AWS cost planning, local-first.",
    images: ["https://webtoolseasy.com/opengraph-image"],
  },
};

const featureGroups = [
  {
    title: "DevLens",
    eyebrow: "Smart Paste Workbench",
    description:
      "A local-first data inspector that auto-detects JWTs, JSON, Base64, timestamps, UUIDs, URLs, CSV, .env files, cron expressions, and more.",
    bullets: [
      "Auto-detects pasted data",
      "Explains what the data means",
      "Runs entirely in the browser",
    ],
    cta: { href: "/studio", label: "Open DevLens" },
  },
  {
    title: "ArchCost",
    eyebrow: "Visual Cloud Planner",
    description:
      "A canvas for designing AWS architectures, tracking cost in real time, and sharing diagrams without exposing private data.",
    bullets: [
      "Undo, redo, share, export",
      "Pricing that can be synced automatically",
      "Built for solo founders and small teams",
    ],
    cta: { href: "/canvas", label: "Open ArchCost" },
  },
];

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WebToolsEasy",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://webtoolseasy.com",
    description:
      "Privacy-first developer studio for JWT decoding, JSON query, regex testing, and AWS cloud cost estimation.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const hubsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WebToolsEasy Core Hubs",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://webtoolseasy.com/studio",
        name: "DevLens Studio",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://webtoolseasy.com/canvas",
        name: "ArchCost Canvas",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://webtoolseasy.com/calculators",
        name: "AWS Cost Calculators",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://webtoolseasy.com/architectures",
        name: "Architecture Templates",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are WebToolsEasy tools client-side and privacy-first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Core inspection and estimation flows run in-browser so your pasted technical payloads stay local by default.",
        },
      },
      {
        "@type": "Question",
        name: "Which high-intent developer tools are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JWT decoder, JSON query and formatter, regex tester, timestamp converter, Base64 encoder and decoder, certificate inspector, env file editor, and AWS architecture cost planning.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0B] text-white">
      <script
        id="home-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        id="home-hubs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubsSchema) }}
      />
      <script
        id="home-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pointer-events-none absolute left-[-12%] top-[-18%] h-[50%] w-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[18%] h-[40%] w-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[18%] h-[40%] w-[60%] rounded-full bg-orange-600/10 blur-[120px]" />

      <Nav />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="max-w-4xl">
          <Badge variant="info">Privacy-first developer studio</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl md:leading-[0.96]">
            Paste anything.
            <span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-orange-300 bg-clip-text text-transparent">
              Understand everything.
            </span>
            Plan confidently.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
            WebToolsEasy is being rebuilt as a focused developer studio: DevLens
            for local-first data inspection, and ArchCost for visual cloud
            planning with live cost awareness.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Open DevLens
            </Link>
            <Link
              href="/canvas"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open ArchCost
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2">
        {featureGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[28px] border border-white/10 bg-[#121214]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-md"
          >
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
              {group.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
              {group.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
              {group.description}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-gray-200">
              {group.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={group.cta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {group.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 rounded-[24px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold text-white mb-3">
            Popular Developer Tools
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Fast access to high-intent workflows developers search for daily.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/tools/jwt-decoder"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              JWT Decoder
            </Link>
            <Link
              href="/tools/json-query"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              JSON Query Tool
            </Link>
            <Link
              href="/tools/regex-tester"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              Regex Tester
            </Link>
            <Link
              href="/tools/base64"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              Base64 Encoder and Decoder
            </Link>
            <Link
              href="/tools/timestamp-converter"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              Unix Timestamp Converter
            </Link>
            <Link
              href="/tools/certificate-inspector"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/50"
            >
              X.509 Certificate Inspector
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
              Why this exists
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              The old product became a generic tool factory. The new direction
              is narrower, deeper, and designed around real developer pain
              points.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
              Privacy model
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              Core data processing happens locally in the browser. Sharing is
              about configuration, not user payloads.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
              Growth model
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              Organic traffic comes from deep tool pages, specific long-tail
              guides, and useful programmatic pages rather than shallow volume.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
