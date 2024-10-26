import Paper from "@mui/material/Paper";

export function PaperWithChildren({
  children,
  elevation = 12,
  variant = "elevation",
  square = true,
  sx = {},
}: Readonly<{
  children: React.ReactNode;
  elevation?: number;
  variant?: "elevation" | "outlined";
  square?: boolean;
  sx?: Record<string, unknown>;
}>) {
  return (
    <Paper
      elevation={elevation}
      variant={variant}
      square={square}
      sx={{
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
