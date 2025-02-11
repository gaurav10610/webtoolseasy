import Typography from "@mui/material/Typography";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

function SocialFollowButtons() {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <Typography variant="caption" color="textSecondary">
        Follow us on social media:
      </Typography>
      <div className="w-full flex flex-row gap-2 justify-center items-center">
        <Link
          href="https://www.facebook.com/people/Webtoolseasy/100088911459047/"
          target="_blank"
          title="Webtoolseasy Facebook Page"
        >
          <FacebookIcon color="primary" fontSize="large" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/webtoolseasy/"
          target="_blank"
          title="Webtoolseasy LinkedIn Page"
        >
          <LinkedInIcon color="primary" fontSize="large" />
        </Link>
        <Link
          href="https://twitter.com/webtoolseasy"
          target="_blank"
          title="Webtoolseasy X Page"
        >
          <XIcon fontSize="medium" />
        </Link>
      </div>
    </div>
  );
}

function CopyRight() {
  return (
    <Typography variant="caption" color="textSecondary">
      © 2024-2025. All rights reserved.{" "}
    </Typography>
  );
}

export async function CommonSiteData({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <SocialFollowButtons />
      <CopyRight />
    </div>
  );
}
