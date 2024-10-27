import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export function ButtonWithHandler({
  size = "medium",
  variant = "contained",
  color = "primary",
  buttonText,
  onClick,
  sx = {},
  startIcon,
  endIcon,
}: Readonly<{
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  buttonText: string;
  onClick?: () => void;
  sx?: Record<string, unknown>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}>): JSX.Element {
  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      {...(onClick && { onClick })}
      sx={sx}
      {...(startIcon && { startIcon })}
      {...(endIcon && { endIcon })}
    >
      {buttonText}
    </Button>
  );
}

export function ButtonWithLink({
  size = "medium",
  variant = "contained",
  color = "primary",
  buttonText,
  href,
  sx,
}: Readonly<{
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  buttonText: string;
  href: string;
  sx?: Record<string, unknown>;
}>): JSX.Element {
  return (
    <Link
      href={href}
      sx={{
        width: "100%",
      }}
    >
      <Button size={size} variant={variant} color={color} sx={sx}>
        {buttonText}
      </Button>
    </Link>
  );
}
