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
    <div
      className={`flex flex-col justify-end w-full h-full gap-2 ${className}`}
    >
      <Typography variant="body2" fontSize={"inherit"} color="primary">
        {heading}
      </Typography>
      <iframe
        srcDoc={iFrameSourceDoc}
        className="w-full h-full scroll-auto border-2 border-gray-300"
      />
    </div>
  );
}
