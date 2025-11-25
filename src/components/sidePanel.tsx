"use client";

import { AppNavigationConfig } from "@/types/config";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { groupBy, keysIn, map, values } from "lodash-es";
import Link from "next/link";
import { useState } from "react";

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
    (app) => selectedPageUrl === app.navigateUrl
  );

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onToggle}
      elevation={0}
      disableGutters
      sx={{
        "&:before": { display: "none" },
        backgroundColor: "transparent",
      }}
    >
      <AccordionSummary
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
        <Typography
          variant="body1"
          sx={{
            fontWeight: hasActiveLink ? 600 : 400,
            color: hasActiveLink ? "primary.main" : "text.primary",
          }}
        >
          {category}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 12px 12px 24px" }}>
        <div className="flex flex-col gap-2 border-l-2 pl-3">
          {map(appList, (app) => (
            <Link href={`../${app.navigateUrl}`} key={app.applicationId}>
              <Typography
                color={
                  selectedPageUrl === app.navigateUrl
                    ? "primary"
                    : "textSecondary"
                }
                variant="body2"
                sx={{
                  fontWeight: selectedPageUrl === app.navigateUrl ? 600 : 400,
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {app.displayText}
              </Typography>
            </Link>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
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
      (app) => selectedPageUrl === app.navigateUrl
    )
  );

  // State to manage which accordion is expanded
  const [expandedIndex, setExpandedIndex] = useState<number>(
    activeCategoryIndex >= 0 ? activeCategoryIndex : -1
  );

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className={`flex flex-col gap-1 p-3 ${className}`}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
      >
        Tools by Category
      </Typography>
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
  );
}
