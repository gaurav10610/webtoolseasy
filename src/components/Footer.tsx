import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-white/8 px-6 py-8 text-sm text-gray-500">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-gray-200">WebToolsEasy</div>
          <div className="mt-1 max-w-xl leading-6">
            All data processed locally - nothing ever sent to our servers for
            the core tools.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/studio" className="transition-colors hover:text-white">
            DevLens Studio
          </Link>
          <Link href="/canvas" className="transition-colors hover:text-white">
            ArchCost Canvas
          </Link>
          <Link href="/tools" className="transition-colors hover:text-white">
            Tools
          </Link>
          <Link
            href="/tools/jwt-decoder"
            className="transition-colors hover:text-white"
          >
            JWT
          </Link>
          <Link
            href="/tools/regex-tester"
            className="transition-colors hover:text-white"
          >
            Regex
          </Link>
          <Link
            href="/jwt/claims"
            className="transition-colors hover:text-white"
          >
            JWT Claims
          </Link>
          <Link
            href="/regex/patterns"
            className="transition-colors hover:text-white"
          >
            Regex Patterns
          </Link>
          <Link
            href="/calculators"
            className="transition-colors hover:text-white"
          >
            AWS Calculators
          </Link>
          <Link
            href="/architectures"
            className="transition-colors hover:text-white"
          >
            Templates
          </Link>
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
