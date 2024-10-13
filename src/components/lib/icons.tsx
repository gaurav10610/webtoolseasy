import SvgIcon from "@mui/material/SvgIcon";

export function CustomSvgIcon({
  children,
  sx = {},
}: Readonly<{ children: React.ReactNode; sx: Record<string, unknown> }>) {
  return (
    <SvgIcon
      sx={{
        ...sx,
      }}
    >
      {children}
    </SvgIcon>
  );
}
