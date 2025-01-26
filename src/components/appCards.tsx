import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import { CustomSvgIcon } from "./lib/icons";
import React from "react";
import { Link } from "@mui/material";

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
      <div className="flex flex-col gap-2 w-full items-center">
        <CustomSvgIcon size="large">
          {React.createElement(svgIcon.default)}
        </CustomSvgIcon>
        <Link href={config.navigateUrl} className="text-center">
          {config.displayText}
        </Link>
      </div>
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
      <div className="flex flex-row gap-2 w-full justify-center items-center">
        <CustomSvgIcon size="medium">
          {React.createElement(svgIcon.default)}
        </CustomSvgIcon>
        <Link href={`../${config.navigateUrl}`}>{config.displayText}</Link>
      </div>
    </PaperWithChildren>
  );
}
