import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "WebToolsEasy | DevLens and ArchCost",
  description:
    "A privacy-first developer studio for smart data inspection and cloud cost planning. Paste anything, understand everything, and plan confidently.",
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
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0B] text-white">
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
