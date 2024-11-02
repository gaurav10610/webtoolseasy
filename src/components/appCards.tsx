import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import { CustomSvgIcon } from "./lib/icons";
import React from "react";
import { Link } from "@mui/material";

export async function AppHomeCard({
  config,
  sx = {},
}: Readonly<{
  config: AppNavigationConfig;
  sx?: Record<string, unknown>;
}>) {
  const svgIcon = await import(`@/data/icons/${config.iconRelativeUrl}`);
  return (
    <PaperWithChildren
      variant="elevation"
      elevation={3}
      sx={{
        padding: "15px",
        ...sx,
      }}
    >
      <div className="column-display inner-flex-gap full-width flex-vr-center">
        <CustomSvgIcon size="large">
          {React.createElement(svgIcon.default)}
        </CustomSvgIcon>
        <Link
          href={config.navigateUrl}
          style={{
            textAlign: "center",
          }}
        >
          {config.displayText}
        </Link>
      </div>
    </PaperWithChildren>
  );
}

export async function RelatedToolCard({
  config,
  sx = {},
}: Readonly<{
  config: AppNavigationConfig;
  sx?: Record<string, unknown>;
}>) {
  const svgIcon = await import(`@/data/icons/${config.iconRelativeUrl}`);
  return (
    <PaperWithChildren
      variant="elevation"
      elevation={3}
      sx={{
        padding: "15px",
        ...sx,
      }}
    >
      <div className="row-display inner-flex-gap full-width flex-hz-center flex-vr-center">
        <CustomSvgIcon size="medium">
          {React.createElement(svgIcon.default)}
        </CustomSvgIcon>
        <Link href={`../${config.navigateUrl}`}>{config.displayText}</Link>
      </div>
    </PaperWithChildren>
  );
}
