import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export function ButtonWithHandler({
  size = "medium",
  variant = "contained",
  color = "primary",
  buttonText,
  onClick,
  startIcon,
  endIcon,
  className = "",
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
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  className?: string;
}>): JSX.Element {
  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      {...(onClick && { onClick })}
      {...(startIcon && { startIcon })}
      {...(endIcon && { endIcon })}
      className={className}
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
  className = "",
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
  className?: string;
}>): JSX.Element {
  return (
    <Link href={href} className={className}>
      <Button size={size} variant={variant} color={color} className="w-full">
        {buttonText}
      </Button>
    </Link>
  );
}
