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

const Disclaimer = () => {
  return (
    <div className="w-full flex flex-col gap-1 mb-3">
      <Typography
        variant="body1"
        color="warning"
        className="!font-semibold !text-center"
      >
        Disclaimer
      </Typography>
      <Typography variant="caption" color="textSecondary">
        The web tools provided on this website are offered for free and for
        general informational or utility purposes only. We make no warranties
        about the completeness, reliability, accuracy, or suitability of these
        tools for any particular purpose. Use of these tools is at your sole
        risk.
      </Typography>
      <Typography variant="caption" color="textSecondary">
        <strong>No Data Storage or Transmission:</strong> We do not store,
        collect, or transmit any user data entered into these tools outside of
        your web browser. All processing and calculations occur locally within
        your browser environment.
      </Typography>
      <Typography variant="caption" color="textSecondary">
        <strong>External Links:</strong> This website may contain links to
        external websites. We are not responsible for the content or privacy
        practices of these websites.
      </Typography>
      <Typography variant="caption" color="textSecondary">
        <strong>
          By using this website and its tools, you agree to this disclaimer.
        </strong>
        We reserve the right to modify this disclaimer at any time without
        notice. It is your responsibility to review this disclaimer periodically
        for changes.
      </Typography>
    </div>
  );
};

export async function CommonSiteData({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <SocialFollowButtons />
      <CopyRight />
      <Disclaimer />
    </div>
  );
}
