import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export function CircularLoader({
  color = "primary",
  className = "",
}: Readonly<{
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  className?: string;
}>) {
  return (
    <div className={`flex flex-col w-full items-center p-5 ${className}`}>
      <CircularProgress color={color} />
      <Typography color={color} fontSize={"inherit"}>
        Loading...
      </Typography>
    </div>
  );
}
