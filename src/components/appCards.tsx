import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import React from "react";
import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";

export function AppHomeCard({
  config,
  className = "",
  isPriority = false,
}: Readonly<{
  config: AppNavigationConfig;
  className?: string;
  isPriority?: boolean;
}>) {
  return (
    <PaperWithChildren
      variant="outlined"
      className={`overflow-hidden rounded-[20px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Link
        href={`/${config.navigateUrl}`}
        prefetch={false}
        className="block h-full no-underline"
      >
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[var(--mui-palette-primary-main)] dark:bg-slate-800">
              <img
                src={`/icons/${config.iconRelativeUrl}`}
                alt=""
                width={32}
                height={32}
                loading={isPriority ? "eager" : "lazy"}
                decoding="async"
                className="w-8 h-8 object-contain"
              />
            </div>
            <AppChip
              label={config.category || "Tool"}
              size="small"
              variant="outlined"
              color="primary"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <AppText className="!text-base !font-semibold !leading-6">
              {config.displayText}
            </AppText>
            <AppText className="!text-sm !text-[var(--mui-palette-text-secondary)]">
              Free online {config.displayText.toLowerCase()} — no signup, runs
              in your browser.
            </AppText>
          </div>
        </div>
      </Link>
    </PaperWithChildren>
  );
}

export function RelatedToolCard({
  config,
  className = "",
}: Readonly<{
  config: AppNavigationConfig;
  className?: string;
}>) {
  return (
    <PaperWithChildren
      variant="outlined"
      className={`rounded-[18px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <Link
        href={`/${config.navigateUrl}`}
        prefetch={false}
        className="block no-underline"
      >
        <div className="flex flex-row items-center gap-3 overflow-hidden p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[var(--mui-palette-primary-main)] dark:bg-slate-800">
            <img
              src={`/icons/${config.iconRelativeUrl}`}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="w-6 h-6 object-contain"
            />
          </div>
          <AppText className="min-w-0 flex-1 truncate !font-medium">
            {config.displayText}
          </AppText>
        </div>
      </Link>
    </PaperWithChildren>
  );
}
