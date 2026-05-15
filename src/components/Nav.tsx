import Link from "next/link";

export function Nav() {
  return (
    <nav className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between border-b border-white/8 px-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-indigo-600 shadow-[0_0_20px_rgba(249,115,22,0.35)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        </div>
        <div>
          <div className="text-lg font-bold tracking-tight text-white">
            WebToolsEasy
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">
            Developer Studio
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/studio"
          className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
        >
          DevLens
        </Link>
        <Link
          href="/canvas"
          className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
        >
          ArchCost
        </Link>
        <a
          href="https://github.com/gaurav10610/webtoolseasy"
          className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
