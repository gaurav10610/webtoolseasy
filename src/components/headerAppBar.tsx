import Link from "next/link";
import { CustomSvgIcon } from "./lib/icons";
import AppMenu from "./appMenu";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { ThemeModeToggleCompact } from "./ThemeModeToggle";
import { AppText } from "./lib/ui";
import { MobileNavDrawer } from "./MobileNavDrawer";

export default function HeaderAppBar({
  className = "",
}: Readonly<{ className?: string }>) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--mui-palette-divider)] bg-[color:color-mix(in_srgb,var(--mui-palette-background-paper)_88%,transparent)]/95 backdrop-blur ${className}`}
    >
      <div className="mx-auto w-full max-w-[1720px] px-3 md:px-5">
        <div className="flex h-14 items-center justify-between gap-2 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            title="WebToolsEasy — Privacy-first browser tools, no signup required"
            rel="home"
            className="group flex shrink-0 items-center gap-2.5 no-underline"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--mui-palette-divider)] bg-gradient-to-br from-sky-100 to-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 dark:from-slate-800 dark:to-slate-900">
              <CustomSvgIcon
                size="small"
                className="text-[var(--mui-palette-primary-main)]"
              >
                <ApplicationIcon />
              </CustomSvgIcon>
            </div>
            <div>
              <AppText className="!text-base !font-bold !leading-tight tracking-tight">
                WebToolsEasy
              </AppText>
              <AppText className="hidden !text-[11px] !leading-tight !text-[var(--mui-palette-text-secondary)] sm:block">
                Privacy-first browser tools
              </AppText>
            </div>
          </Link>

          {/* Desktop nav — hidden on small screens */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-1">
            <AppMenu />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Theme toggle — always visible but compact */}
            <ThemeModeToggleCompact />
            {/* Hamburger — only on mobile/tablet */}
            <div className="md:hidden">
              <MobileNavDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
