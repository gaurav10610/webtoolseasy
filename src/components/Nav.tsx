"use client";

import { useState } from "react";
import Link from "next/link";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 mx-auto border-b border-white/8 px-6">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">
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

        <div className="hidden items-center gap-6 md:flex">
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

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="nav-mobile-menu"
          className="mx-auto flex max-w-7xl flex-col gap-2 pb-4 md:hidden"
        >
          <Link
            href="/studio"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen(false)}
          >
            DevLens
          </Link>
          <Link
            href="/canvas"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen(false)}
          >
            ArchCost
          </Link>
          <a
            href="https://github.com/gaurav10610/webtoolseasy"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>
      ) : null}
    </nav>
  );
}
