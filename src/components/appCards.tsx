import { AppNavigationConfig } from "@/types/config";
import { PaperWithChildren } from "./lib/papers";
import { CustomSvgIcon } from "./lib/icons";
import React from "react";
import Link from "@mui/material/Link";

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
