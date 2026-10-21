"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomSvgIcon } from "./lib/icons";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { CommandPalette, openCommandPalette } from "./CommandPalette";

const navigationItems = [
  {
    name: "DropStream",
    href: "/drop",
    badge: "P2P",
    description: "Unlimited browser-to-browser transfer",
  },
  {
    name: "BeamSuite",
    href: "/beam",
    badge: "OBS",
    description: "Wireless camera & screen to OBS",
  },
  {
    name: "LocalStudio",
    href: "/studio",
    badge: "Lossless",
    description: "Instant in-browser video & audio tools",
  },
  {
    name: "Tools Directory",
    href: "/tools",
    badge: "110+",
    description: "110+ client-side utilities",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Guides & product releases",
  },
];

export default function HeaderAppBar({
  className = "",
}: Readonly<{ className?: string }>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <CommandPalette />
      <header
        className={`sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors ${className}`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                title="WebToolsEasy Home"
                className="group flex items-center gap-2.5 no-underline"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-xs transition-transform duration-150 group-hover:scale-105">
                  <CustomSvgIcon
                    size="medium"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <ApplicationIcon />
                  </CustomSvgIcon>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                    WebToolsEasy
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Zero-Cloud
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-medium">
                {navigationItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-semibold ${
                            isActive
                              ? "bg-blue-200/60 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Button */}
              <button
                type="button"
                onClick={openCommandPalette}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:border-blue-500/50 hover:text-slate-800 dark:hover:text-slate-200 transition-all cursor-pointer shadow-2xs"
                aria-label="Search tools (⌘K)"
              >
                <svg
                  className="h-3.5 w-3.5 text-slate-400"
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
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Mode Toggle (Compact Segmented) */}
              <div className="hidden sm:block">
                <ThemeModeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex lg:hidden items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </span>
              <ThemeModeToggle showLabels={false} />
            </div>

            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                          {item.description}
                        </div>
                      )}
                    </div>
                    {item.badge && (
                      <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
