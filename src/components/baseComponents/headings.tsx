import { Typography } from "@mui/material";

export function H1Heading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <Typography
      variant="h1"
      className="text-center !text-2xl md:!text-4xl !font-normal"
    >
      {heading}
    </Typography>
  );
}

export function H2Heading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <Typography
      variant="h2"
      className="text-center !text-xl md:!text-2xl !font-normal"
      color="textSecondary"
    >
      {heading}
    </Typography>
  );
}
