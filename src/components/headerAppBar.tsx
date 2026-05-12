import Link from "next/link";
import { CustomSvgIcon } from "./lib/icons";
import AppMenu from "./appMenu";
import ApplicationIcon from "@/data/icons/app-icon.svg";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { AppChip, AppText } from "./lib/ui";

export default function HeaderAppBar({
  className = "",
}: Readonly<{ className?: string }>) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--mui-palette-divider)] bg-[color:color-mix(in_srgb,var(--mui-palette-background-paper)_88%,transparent)]/95 backdrop-blur ${className}`}
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
                Privacy-first browser workflows — no signup, no upload
              </AppText>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2">
            <AppChip
              label="Workflow packs"
              color="primary"
              variant="outlined"
            />
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
          <AppChip
            label="Workflow packs"
            size="small"
            color="primary"
            variant="outlined"
          />
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
}
