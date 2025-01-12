import SvgIcon from "@mui/material/SvgIcon";

export function CustomSvgIcon({
  children,
  size = "small",
  sx = {},
  className = "",
}: Readonly<{
  children: React.ReactNode;
  size?: "inherit" | "large" | "medium" | "small";
  sx?: Record<string, unknown>;
  className?: string;
}>) {
  return (
    <SvgIcon
      fontSize={size}
      sx={{
        ...sx,
      }}
      className={className}
    >
      {children}
    </SvgIcon>
  );
}
