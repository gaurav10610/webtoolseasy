import Link from "next/link";
import { type ToolMeta } from "@/lib/devlens/toolMeta";
import { Badge } from "@/components/ui/Badge";

type ToolLandingLayoutProps = {
  meta: ToolMeta;
  toolSlot: React.ReactNode;
};

export function ToolLandingLayout({ meta, toolSlot }: ToolLandingLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0B] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed left-[-12%] top-[-18%] h-[50%] w-[50%] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-10%] top-[18%] h-[40%] w-[40%] rounded-full bg-cyan-600/8 blur-[120px]" />

      {/* Slim nav */}
      <nav className="relative z-20 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="text-sm font-semibold text-white hover:text-gray-300"
          >
            WebToolsEasy
          </Link>
          <Link
            href="/studio"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Open DevLens Studio
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-16 md:pb-14 md:pt-20">
          <Badge variant="neutral">{meta.eyebrow}</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            {meta.shortTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            {meta.description}
          </p>
        </section>

        {/* Inline tool */}
        <section className="mx-auto max-w-5xl px-6 pb-14">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#121214]/90 shadow-2xl shadow-black/30 backdrop-blur-md">
            <div className="border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Live tool — runs in your browser
                </span>
              </div>
            </div>
            <div className="p-6">{toolSlot}</div>
          </div>
        </section>

        {/* About section */}
        <section className="mx-auto max-w-5xl px-6 pb-14">
          <div className="rounded-[24px] border border-white/10 bg-[#121214]/60 p-8">
            <h2 className="text-xl font-bold text-white">
              About {meta.shortTitle}
            </h2>
            <p className="mt-3 leading-7 text-gray-400">
              {meta.longDescription}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-6 pb-14">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {meta.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-[#121214]/60"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-white marker:content-none hover:text-indigo-300">
                  {faq.question}
                  <span className="ml-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-7 text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        {meta.relatedSlugs.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 pb-20">
            <h2 className="mb-5 text-lg font-bold text-white">Related Tools</h2>
            <div className="flex flex-wrap gap-3">
              {meta.relatedSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/tools/${slug}`}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {slug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} WebToolsEasy &mdash; All tools run
          locally in your browser.
        </p>
        <p className="mt-1">
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-gray-400"
          >
            Home
          </Link>{" "}
          &middot;{" "}
          <Link
            href="/studio"
            className="underline underline-offset-2 hover:text-gray-400"
          >
            DevLens Studio
          </Link>{" "}
          &middot;{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-gray-400"
          >
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
}
