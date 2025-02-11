import Chip from "@mui/material/Chip";
import Link from "next/link";

export function ClickableChip({
  label,
  variant = "outlined",
  handleClick,
  color = "primary",
  sx = {},
  size = "small",
}: Readonly<{
  label: string;
  variant?: "filled" | "outlined";
  handleClick: () => void;
  color?: "default" | "primary" | "secondary";
  sx?: Record<string, unknown>;
  size?: "small" | "medium";
}>) {
  return (
    <Chip
      label={label}
      variant={variant}
      onClick={handleClick}
      color={color}
      size={size}
      sx={{
        ...sx,
      }}
    />
  );
}

export function BasicChip({
  label,
  variant = "outlined",
  color = "primary",
  sx = {},
  size = "small",
}: Readonly<{
  label: string;
  variant?: "filled" | "outlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  sx?: Record<string, unknown>;
  size?: "small" | "medium";
}>) {
  return (
    <Chip
      label={label}
      variant={variant}
      color={color}
      size={size}
      sx={{
        ...sx,
      }}
    />
  );
}

export function ChipWithLink({
  label,
  href,
  variant = "outlined",
  color = "primary",
  sx = {},
  size = "small",
  onChipClick,
}: Readonly<{
  label: string;
  variant?: "filled" | "outlined";
  href: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  sx?: Record<string, unknown>;
  size?: "small" | "medium";
  onChipClick?: (label: string) => void;
}>) {
  return (
    <Link href={href}>
      <Chip
        label={label}
        variant={variant}
        color={color}
        size={size}
        onClick={() => {
          if (onChipClick) {
            onChipClick(label);
          }
        }}
        sx={{
          ...sx,
        }}
      />
    </Link>
  );
}
