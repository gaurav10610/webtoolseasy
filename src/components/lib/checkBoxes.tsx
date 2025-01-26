import { Checkbox, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export function CheckBoxWithLabel({
  label,
  value,
  onChange,
  classes = "",
  color = "textSecondary",
}: Readonly<{
  label: string;
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  classes?: string;
  color?:
    | "textPrimary"
    | "textSecondary"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "textDisabled";
}>) {
  return (
    <div className={`flex flex-row items-center ${classes}`}>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
      <Typography variant="body2" color={color}>
        {label}
      </Typography>
    </div>
  );
}
