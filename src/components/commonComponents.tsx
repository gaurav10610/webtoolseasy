import { getRandomId } from "@/util/commonUtils";
import Typography from "@mui/material/Typography";

export function AppHeading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <Typography
      key={getRandomId()}
      variant="h1"
      sx={{
        fontSize: "2rem",
        textAlign: "center",
      }}
    >
      {heading}
    </Typography>
  );
}
