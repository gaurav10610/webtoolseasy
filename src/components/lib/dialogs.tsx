import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { JSX } from "react";

export interface DialogProps {
  handleClose?: () => void;
  open: boolean;
  dialogTitle: string;
  dialogContent?: JSX.Element;
  dialogActions?: JSX.Element;
  className?: string;
}

export function DialogWithProps({
  handleClose,
  open,
  dialogTitle,
  dialogContent,
  dialogActions,
  className = "",
}: DialogProps) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className={className}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
}
