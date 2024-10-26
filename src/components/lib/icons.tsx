import SvgIcon from "@mui/material/SvgIcon";

export function CustomSvgIcon({
  children,
  size = "small",
  sx = {},
}: Readonly<{
  children: React.ReactNode;
  size?: "inherit" | "large" | "medium" | "small";
  sx?: Record<string, unknown>;
}>) {
  return (
    <SvgIcon
      fontSize={size}
      sx={{
        ...sx,
      }}
    >
      {children}
    </SvgIcon>
  );
}
