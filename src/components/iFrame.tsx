import { Typography } from "@mui/material";

export default function IFrameWithLabel({
  iFrameSourceDoc,
  heading = "Preview HTML",
  className = "",
}: Readonly<{
  iFrameSourceDoc: string;
  heading?: string;
  className?: string;
}>) {
  return (
    <div className={`flex flex-col justify-end h-full gap-2 ${className}`}>
      <Typography
        variant="body1"
        color="textSecondary"
        className="!text-xl !font-semibold"
      >
        {heading}
      </Typography>
      <iframe
        srcDoc={iFrameSourceDoc}
        className="w-full h-full scroll-auto border-2 border-gray-300"
      />
    </div>
  );
}
