"use client";

import Link from "next/link";
import { CustomSvgIcon } from "./lib/icons";
import AppMenu from "./appMenu";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { AppChip, AppText } from "./lib/ui";
import { CommandPalette, openCommandPalette } from "./CommandPalette";

export default function HeaderAppBar({
  className = "",
}: Readonly<{ className?: string }>) {
  return (
    <>
      <CommandPalette />
      <header
        className={`sticky top-0 z-40 border-b border-[var(--mui-palette-divider)] bg-[color:color-mix(in_srgb,var(--mui-palette-background-paper)_88%,transparent)]/95 backdrop-blur ${className}`}
      >
        <div className="mx-auto w-full max-w-[1720px] px-3 md:px-5">
          <div className="flex min-h-[72px] items-center justify-between gap-3 py-2">
            <Link
              href="/"
              title="Go to WebToolsEasy home page"
              rel="home"
              className="group flex min-w-0 items-center gap-3 no-underline"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--mui-palette-divider)] bg-gradient-to-br from-sky-100 to-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 dark:from-slate-800 dark:to-slate-900">
                <CustomSvgIcon
                  size="large"
                  className="text-[var(--mui-palette-primary-main)]"
                >
                  <ApplicationIcon />
                </CustomSvgIcon>
              </div>

              <div className="min-w-0">
                <AppText className="!text-base !font-bold tracking-tight sm:!text-xl">
                  WebToolsEasy
                </AppText>
                <AppText className="hidden !text-xs !text-[var(--mui-palette-text-secondary)] md:block">
                  Free browser tools — no signup, no upload
                </AppText>
              </div>
            </Link>

            {/* Quick Search Trigger (Cmd+K) */}
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-default)]/80 hover:border-[var(--mui-palette-primary-main)] text-[var(--mui-palette-text-secondary)] hover:text-[var(--mui-palette-primary-main)] text-sm transition-all duration-150 cursor-pointer shadow-xs hover:shadow-sm"
              aria-label="Search all tools (Command K)"
            >
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:inline text-xs font-medium">
                Search tools...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-[var(--mui-palette-action-hover)] rounded border border-[var(--mui-palette-divider)]">
                ⌘K
              </kbd>
            </button>

            {/* Flagship High-Performance Suites */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                href="/drop"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition shadow-xs"
                title="Fast, private P2P file & folder transfer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                DropStream
              </Link>
              <Link
                href="/beam"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60 transition shadow-xs"
                title="Wireless Phone Camera & Screen to OBS"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                BeamSuite
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition shadow-xs"
                title="Lossless Video Cutter & Audio Tools"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                LocalStudio
              </Link>
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <Link href="/tools" className="no-underline">
                <AppChip
                  label="All 110+ tools"
                  color="primary"
                  variant="outlined"
                  className="cursor-pointer hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                />
              </Link>
              <AppChip
                label="Private by default"
                color="success"
                variant="outlined"
              />
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:block">
                <ThemeModeToggle />
              </div>
              <AppMenu />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-[var(--mui-palette-divider)] py-2 md:hidden">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--mui-palette-divider)] text-xs text-[var(--mui-palette-text-secondary)] hover:border-[var(--mui-palette-primary-main)]"
              aria-label="Search tools"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search tools</span>
            </button>
            <ThemeModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
