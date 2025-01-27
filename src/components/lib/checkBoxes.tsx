import { Checkbox, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export function CheckBoxWithLabel({
  label,
  value,
  onChange,
  color = "textSecondary",
  className = "",
}: Readonly<{
  label: string;
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  className?: string;
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
    <div className={`flex flex-row items-center ${className}`}>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
      <Typography variant="body2" color={color}>
        {label}
      </Typography>
    </div>
  );
}
