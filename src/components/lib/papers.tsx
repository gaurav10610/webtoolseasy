import Paper from "@mui/material/Paper";

export function PaperWithChildren({
  children,
  elevation = 12,
  variant = "elevation",
  square = true,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  elevation?: number;
  variant?: "elevation" | "outlined";
  square?: boolean;
  className?: string;
}>) {
  return (
    <Paper
      elevation={elevation}
      variant={variant}
      square={square}
      className={className}
    >
      {children}
    </Paper>
  );
}
