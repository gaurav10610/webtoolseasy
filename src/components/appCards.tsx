import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import { CustomSvgIcon } from "./lib/icons";
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
      <Link href={config.navigateUrl} className="!no-underline">
        <div className="flex flex-col gap-2 w-full items-center">
          <CustomSvgIcon size="large">
            {React.createElement(svgIcon.default)}
          </CustomSvgIcon>
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
      <Link href={`../${config.navigateUrl}`}>
        <div className="flex flex-row gap-2 w-full justify-center items-center p-3">
          <CustomSvgIcon size="medium">
            {React.createElement(svgIcon.default)}
          </CustomSvgIcon>
          {config.displayText}
        </div>
      </Link>
    </PaperWithChildren>
  );
}
