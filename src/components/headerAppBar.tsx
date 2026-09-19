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

            <div className="hidden xl:flex items-center gap-2">
              <AppChip label="110+ tools" color="primary" variant="outlined" />
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
