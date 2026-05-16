import { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy | WebToolsEasy",
  description:
    "How WebToolsEasy keeps developer data local-first and minimizes server-side exposure.",
  alternates: {
    canonical: "https://webtoolseasy.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-300">
          Privacy
        </div>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Local-first by design.
        </h1>
        <p className="mt-6 text-base leading-8 text-gray-400 md:text-lg">
          DevLens and ArchCost are built to keep sensitive data on your machine
          whenever possible. The core workflows run in the browser, and sharing
          is focused on configuration rather than raw payloads.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-7 text-gray-300">
          <p>What we do:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>
              Process developer data locally in the browser for the core tools.
            </li>
            <li>
              Keep shared URLs focused on tool configuration and architecture
              state.
            </li>
            <li>
              Use optional server-side storage only for explicitly saved,
              shareable artifacts.
            </li>
          </ul>
          <p>What we do not do:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Upload pasted secrets or payloads just to render a result.</li>
            <li>
              Build user profiles or inspect private tool input for analytics.
            </li>
            <li>Require accounts for the basic workflows.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
