import { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

type ContentPageLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
  showExploreStrip?: boolean;
  showFooter?: boolean;
  width?: "full" | "contained";
};

export function ContentPageLayout({
  children,
  mainClassName,
  showExploreStrip = true,
  showFooter = true,
  width = "contained",
}: ContentPageLayoutProps) {
  const containerClass =
    width === "contained" ? "mx-auto w-full max-w-7xl" : "w-full";

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <Nav />
      {showExploreStrip ? (
        <div className="border-b border-white/10 bg-[#0E0E10]/80 px-6 py-3">
          <div
            className={`${containerClass} flex flex-wrap items-center gap-2 text-xs`}
          >
            <span className="mr-1 font-semibold uppercase tracking-[0.2em] text-gray-500">
              Explore
            </span>
            <Link
              href="/studio"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              DevLens
            </Link>
            <Link
              href="/canvas"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              ArchCost
            </Link>
            <Link
              href="/tools"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              Tools
            </Link>
            <Link
              href="/jwt/claims"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              JWT Claims
            </Link>
            <Link
              href="/regex/patterns"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              Regex Patterns
            </Link>
            <Link
              href="/calculators"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              Calculators
            </Link>
            <Link
              href="/architectures"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              ArchCost Templates
            </Link>
          </div>
        </div>
      ) : null}
      <main className={mainClassName ?? "px-6 py-12"}>
        <div className={containerClass}>{children}</div>
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}
