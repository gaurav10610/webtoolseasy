import { PropTypes } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";

export function ResponsiveAppBar({
  children,
  color = "primary",
  position = "sticky",
  className = "",
}: Readonly<{
  children?: ReactNode;
  color?: PropTypes.Color;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  sx?: Record<string, unknown>;
  className?: string;
}>) {
  return (
    <AppBar position={position} color={color} className={className}>
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  );
}
