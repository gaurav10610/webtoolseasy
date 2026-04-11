import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import { CustomSvgIcon } from "./lib/icons";
import React from "react";
import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";

export async function AppHomeCard({
  config,
  className = "",
}: Readonly<{
  config: AppNavigationConfig;
  className?: string;
}>) {
  const svgIcon = await import(`@/data/icons/${config.iconRelativeUrl}`);

  return (
    <PaperWithChildren
      variant="outlined"
      className={`overflow-hidden rounded-[20px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Link
        href={`/${config.navigateUrl}`}
        className="block h-full no-underline"
      >
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[var(--mui-palette-primary-main)] dark:bg-slate-800">
              <CustomSvgIcon size="large">
                {React.createElement(svgIcon.default)}
              </CustomSvgIcon>
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
              Fast, browser-based workflow for{" "}
              {String(config.category || "daily").toLowerCase()} tasks.
            </AppText>
          </div>
        </div>
      </Link>
    </PaperWithChildren>
  );
}

export async function RelatedToolCard({
  config,
  className = "",
}: Readonly<{
  config: AppNavigationConfig;
  className?: string;
}>) {
  const svgIcon = await import(`@/data/icons/${config.iconRelativeUrl}`);

  return (
    <PaperWithChildren
      variant="outlined"
      className={`rounded-[18px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <Link href={`/${config.navigateUrl}`} className="block no-underline">
        <div className="flex flex-row items-center gap-3 overflow-hidden p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[var(--mui-palette-primary-main)] dark:bg-slate-800">
            <CustomSvgIcon size="medium">
              {React.createElement(svgIcon.default)}
            </CustomSvgIcon>
          </div>
          <AppText className="min-w-0 flex-1 truncate !font-medium">
            {config.displayText}
          </AppText>
        </div>
      </Link>
    </PaperWithChildren>
  );
}
