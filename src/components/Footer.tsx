import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-white/8 px-6 py-8 text-sm text-gray-500">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-gray-200">WebToolsEasy</div>
          <div className="mt-1 max-w-xl leading-6">
            All data processed locally whenever possible. Nothing sensitive is
            uploaded to the server for core workflows.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <a
            href="https://github.com/gaurav10610/webtoolseasy"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <span>MIT</span>
        </div>
      </div>
    </footer>
  );
}
