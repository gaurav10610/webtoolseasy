import Box from "@mui/material/Box";
import { type SxProps, type Theme } from "@mui/material/styles";
import React from "react";

const iconSizes = {
  inherit: "1em",
  small: "1.25rem",
  medium: "1.5rem",
  large: "2rem",
} as const;

export function CustomSvgIcon({
  children,
  size = "small",
  sx,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  size?: "inherit" | "large" | "medium" | "small";
  sx?: SxProps<Theme>;
  className?: string;
}>) {
  const normalizedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<React.SVGProps<SVGSVGElement>>(child)) {
      return child;
    }

    return React.cloneElement(child, {
      width: "100%",
      height: "100%",
      focusable: "false",
      "aria-hidden": true,
    });
  });

  return (
    <Box
      component="span"
      className={className}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: iconSizes[size],
        width: "1em",
        height: "1em",
        lineHeight: 0,
        flexShrink: 0,
        "& svg": {
          display: "block",
          width: "100%",
          height: "100%",
        },
        ...sx,
      }}
    >
      {normalizedChildren}
    </Box>
  );
}
