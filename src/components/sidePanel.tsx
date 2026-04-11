"use client";

import { AppNavigationConfig } from "@/types/config";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { groupBy, keysIn, map, values } from "lodash-es";
import Link from "next/link";
import { useState } from "react";
import {
  AppAccordion,
  AppAccordionBody,
  AppAccordionHeader,
  AppSurface,
  AppText,
} from "./lib/ui";

/**
 * This component is used to display the links of the apps in the side panel
 * with categorized accordion sections for better organization
 * @param param0
 * @returns
 */
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
    <AppAccordion
      expanded={isExpanded}
      onChange={onToggle}
      elevation={0}
      disableGutters
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <AppAccordionHeader
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: "auto",
          padding: "8px 12px",
          "&.Mui-expanded": {
            minHeight: "auto",
          },
          "& .MuiAccordionSummary-content": {
            margin: "8px 0",
            "&.Mui-expanded": {
              margin: "8px 0",
            },
          },
        }}
      >
        <AppText
          variant="body1"
          sx={{
            fontWeight: hasActiveLink ? 700 : 500,
            color: hasActiveLink ? "primary.main" : "text.primary",
          }}
        >
          {category}
        </AppText>
      </AppAccordionHeader>
      <AppAccordionBody sx={{ padding: "0 12px 12px 24px" }}>
        <div className="flex flex-col gap-2 border-l-2 border-[var(--mui-palette-divider)] pl-3">
          {map(appList, (app) => (
            <Link
              href={`/${app.navigateUrl}`}
              key={app.applicationId}
              className="no-underline"
            >
              <AppText
                color={
                  selectedPageUrl === app.navigateUrl
                    ? "primary"
                    : "textSecondary"
                }
                variant="body2"
                sx={{
                  fontWeight: selectedPageUrl === app.navigateUrl ? 700 : 400,
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {app.displayText}
              </AppText>
            </Link>
          ))}
        </div>
      </AppAccordionBody>
    </AppAccordion>
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

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  const categories = keysIn(categoryWiseAppList);
  const selectedPageUrl = `tools/${pageUrl}`;

  // Find which category contains the current page and expand it by default
  const activeCategoryIndex = categories.findIndex((category) =>
    (categoryWiseAppList[category] as AppNavigationConfig[]).some(
      (app) => selectedPageUrl === app.navigateUrl,
    ),
  );

  // State to manage which accordion is expanded
  const [expandedIndex, setExpandedIndex] = useState<number>(
    activeCategoryIndex >= 0 ? activeCategoryIndex : -1,
  );

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <AppSurface
      variant="outlined"
      className={`rounded-[20px] border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] shadow-sm ${className}`}
    >
      <div className="flex flex-col gap-1 p-3 md:p-4">
        <AppText className="!text-base !font-semibold">Browse tools</AppText>
        <AppText className="!mb-2 !text-sm !text-[var(--mui-palette-text-secondary)]">
          Jump to similar workflows with a consistent enterprise-style layout.
        </AppText>
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
    </AppSurface>
  );
}
