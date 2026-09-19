"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AppChip, AppText } from "./lib/ui";
import { apps } from "@/data/apps";
import { getRecentTools, clearRecentTools } from "@/util/recentTools";
import { AppNavigationConfig } from "@/types/config";

const allAppsList = Object.values(apps);

function findAppByPageUrl(urlOrId: string): AppNavigationConfig | undefined {
  const cleanUrl = urlOrId.replace(/^tools\//, "");
  return allAppsList.find(
    (app) =>
      app.navigateUrl === `tools/${cleanUrl}` ||
      app.navigateUrl === cleanUrl ||
      app.applicationId === cleanUrl
  );
}

export function RecentlyUsedTools() {
  const [recentApps, setRecentApps] = useState<AppNavigationConfig[]>([]);

  const refreshRecent = useCallback(() => {
    const toolUrls = getRecentTools();
    const matched = toolUrls
      .map((url) => findAppByPageUrl(url))
      .filter((app): app is AppNavigationConfig => Boolean(app));
    setRecentApps(matched);
  }, []);

  useEffect(() => {
    refreshRecent();
    window.addEventListener("webtoolseasy:recent_tools_updated", refreshRecent);
    return () => {
      window.removeEventListener(
        "webtoolseasy:recent_tools_updated",
        refreshRecent
      );
    };
  }, [refreshRecent]);

  if (recentApps.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Recently used tools"
      className="w-full rounded-2xl border border-sky-100/80 bg-gradient-to-r from-sky-50/60 via-indigo-50/40 to-blue-50/50 p-4 shadow-sm backdrop-blur-sm transition-all dark:border-sky-900/40 dark:from-sky-950/20 dark:via-indigo-950/15 dark:to-blue-950/20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">
            ⚡
          </span>
          <AppText className="!text-sm !font-bold !tracking-tight !text-slate-800 dark:!text-slate-200">
            Recently Used
          </AppText>
          <AppChip
            label={`${recentApps.length}`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </div>
        <button
          type="button"
          onClick={() => clearRecentTools()}
          className="text-xs text-[var(--mui-palette-text-secondary)] hover:text-red-500 transition-colors underline cursor-pointer bg-transparent border-0"
          aria-label="Clear recently used tools history"
        >
          Clear history
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {recentApps.map((app) => (
          <Link
            key={app.applicationId}
            href={`/${app.navigateUrl}`}
            prefetch={false}
            className="group flex items-center gap-2.5 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[var(--mui-palette-primary-main)] hover:shadow-md hover:-translate-y-0.5 transition-all no-underline"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
              <img
                src={`/icons/${app.iconRelativeUrl}`}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <AppText className="!text-xs !font-medium truncate group-hover:text-[var(--mui-palette-primary-main)]">
                {app.displayText}
              </AppText>
              <AppText className="!text-[10px] !text-[var(--mui-palette-text-secondary)] truncate">
                {app.category || "Tool"}
              </AppText>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
