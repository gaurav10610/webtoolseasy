import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import React from "react";
import { Link, Typography } from "@mui/material";

export async function AppHomeCard({
  config,
  className = "",
}: Readonly<{
  config: AppNavigationConfig;
  className?: string;
}>) {
  const svgIcon = await import(`@/data/icons/${config.iconRelativeUrl}`);
  return (
    <PaperWithChildren variant="elevation" elevation={3} className={className}>
      <Link
        href={config.navigateUrl}
        className="!no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col gap-2 w-full items-center">
          {React.createElement(svgIcon.default, {
            className: "MuiSvgIcon-root MuiSvgIcon-fontSizeLarge",
            focusable: "false",
            "aria-hidden": "true",
            style: {
              fontSize: "2.1875rem",
              width: "1em",
              height: "1em",
              display: "inline-block",
              fill: "currentColor",
              flexShrink: 0,
              transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              userSelect: "none",
            },
          })}
          <Typography fontWeight={500} className="!text-center">
            {config.displayText}
          </Typography>
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
    <PaperWithChildren variant="elevation" elevation={3} className={className}>
      <Link href={`../${config.navigateUrl}`} className="!no-underline">
        <div className="flex flex-row gap-2 w-full justify-center items-center p-3 overflow-hidden">
          {React.createElement(svgIcon.default, {
            className: "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium",
            focusable: "false",
            "aria-hidden": "true",
            style: {
              fontSize: "1.5rem",
              width: "1em",
              height: "1em",
              display: "inline-block",
              fill: "currentColor",
              flexShrink: 0,
              transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              userSelect: "none",
            },
          })}
          <Typography className="truncate whitespace-nowrap text-center flex-1 min-w-0">
            {config.displayText}
          </Typography>
        </div>
      </Link>
    </PaperWithChildren>
  );
}
