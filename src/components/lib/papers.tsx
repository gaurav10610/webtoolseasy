import Paper from "@mui/material/Paper";

export function PaperWithChildren({
  children,
  elevation = 12,
  variant = "elevation",
  square = true,
  sx = {},
  classes = "",
}: Readonly<{
  children: React.ReactNode;
  elevation?: number;
  variant?: "elevation" | "outlined";
  square?: boolean;
  sx?: Record<string, unknown>;
  classes?: string;
}>) {
  return (
    <Paper
      elevation={elevation}
      variant={variant}
      square={square}
      sx={{
        ...sx,
      }}
      className={classes}
    >
      {children}
    </Paper>
  );
}
