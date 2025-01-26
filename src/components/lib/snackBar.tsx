import React from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

interface SnackBarWithPositionProps {
  open: boolean;
  message: string;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  color?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
  sx?: Record<string, unknown>;
  variant?: "filled" | "outlined" | "standard";
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

export function SnackBarWithPosition({
  open,
  message,
  vertical = "top",
  horizontal = "center",
  color = "success",
  autoHideDuration,
  sx = {},
  variant = "filled",
  handleClose,
}: SnackBarWithPositionProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      key={vertical + horizontal}
      color={color}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={color} variant={variant} sx={{ width: "100%", ...sx }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
