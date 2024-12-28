import { Typography } from "@mui/material";

export default function IFrameWithLabel({
  iFrameSourceDoc,
  heading = "Preview HTML",
  classes = "",
}: Readonly<{
  iFrameSourceDoc: string;
  heading?: string;
  classes?: string;
}>) {
  return (
    <div className={`flex flex-col justify-end w-full h-full gap-2 ${classes}`}>
      <Typography variant="body2" fontSize={"inherit"} color="primary">
        {heading}
      </Typography>
      <iframe
        srcDoc={iFrameSourceDoc}
        className="w-full h-full border-2 border-gray-300"
      />
    </div>
  );
}
