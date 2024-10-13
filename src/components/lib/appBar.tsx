import { PropTypes } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";

export function ResponsiveAppBar({
  children,
  color = "primary",
  position = "sticky",
  sx = {},
}: Readonly<{
  children?: ReactNode;
  color?: PropTypes.Color;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  sx?: Record<string, unknown>;
}>) {
  return (
    <AppBar
      position={position}
      color={color}
      sx={{
        ...sx,
      }}
    >
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  );
}
