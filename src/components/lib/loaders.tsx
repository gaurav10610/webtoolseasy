import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export function CircularLoader({
  color = "primary",
  sx = {},
}: Readonly<{
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  sx?: Record<string, unknown>;
}>) {
  return (
    <div
      className="column-display full-width flex-vr-center"
      style={{
        padding: "20px",
        ...sx,
      }}
    >
      <CircularProgress color={color} />
      <Typography color={color} fontSize={"inherit"}>
        Loading...
      </Typography>
    </div>
  );
}
