"use client";

import { AppNavigationConfig } from "@/types/config";
import { groupBy, keysIn, map, values } from "lodash-es";
import Link from "next/link";
import { useState } from "react";

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const SectionLinks = ({
  category,
  appList,
  pageUrl,
  isExpanded,
  onToggle,
}: {
  category: string;
  appList: AppNavigationConfig[];
  pageUrl: string;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const selectedPageUrl = `tools/${pageUrl}`;
  const hasActiveLink = appList.some(
    (app) => selectedPageUrl === app.navigateUrl,
  );

  return (
    <div className="border-b border-[var(--mui-palette-divider)] last:border-b-0 py-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left cursor-pointer transition-colors group"
      >
        <span
          className={`text-sm transition-colors ${
            hasActiveLink
              ? "font-bold text-[var(--mui-palette-primary-main)]"
              : "font-medium text-[var(--mui-palette-text-primary)] group-hover:text-[var(--mui-palette-primary-main)]"
          }`}
        >
          {category}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="pb-3 pl-3 pt-1 border-l-2 border-[var(--mui-palette-divider)] ml-2 flex flex-col gap-2">
          {map(appList, (app) => {
            const isSelected = selectedPageUrl === app.navigateUrl;
            return (
              <Link
                href={`/${app.navigateUrl}`}
                key={app.applicationId}
                prefetch={false}
                className={`text-xs no-underline transition-colors hover:text-[var(--mui-palette-primary-main)] ${
                  isSelected
                    ? "font-bold text-[var(--mui-palette-primary-main)]"
                    : "text-[var(--mui-palette-text-secondary)]"
                }`}
              >
                {app.displayText}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function SidePanel({
  className = "",
  appConfigJson,
  pageUrl,
}: Readonly<{
  className?: string;
  appConfigJson: Record<string, AppNavigationConfig>;
  pageUrl: string;
}>) {
  const categoryWiseAppList = groupBy(values(appConfigJson), "category");

  delete categoryWiseAppList["undefined"];

  const categories = keysIn(categoryWiseAppList);
  const selectedPageUrl = `tools/${pageUrl}`;

  const activeCategoryIndex = categories.findIndex((category) =>
    (categoryWiseAppList[category] as AppNavigationConfig[]).some(
      (app) => selectedPageUrl === app.navigateUrl,
    ),
  );

  const [expandedIndex, setExpandedIndex] = useState<number>(
    activeCategoryIndex >= 0 ? activeCategoryIndex : -1,
  );

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div
      className={`rounded-[20px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-3 md:p-4 shadow-sm ${className}`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-[var(--mui-palette-text-primary)]">
          Browse tools
        </h3>
        <p className="mb-2 text-sm text-[var(--mui-palette-text-secondary)]">
          Jump to similar workflows with a consistent enterprise-style layout.
        </p>
        {map(categories, (category, index) => (
          <SectionLinks
            key={category}
            category={category}
            appList={categoryWiseAppList[category] as AppNavigationConfig[]}
            pageUrl={pageUrl}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
}
