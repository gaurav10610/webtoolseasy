"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { Button } from "@mui/material";
import { SnackBarWithPosition } from "./lib/snackBar";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";

export const SocialShareButtons = ({
  pageUrl,
  heading = "",
}: Readonly<{
  pageUrl: string;
  heading?: string;
}>) => {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <div className="flex flex-row gap-3 w-full items-center justify-end">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <ShareIcon fontSize="medium" />
      <FacebookShareButton
        url={pageUrl}
        quote={heading}
        hashtag={"#naukrinotify"}
        blankTarget={true}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={pageUrl} title={heading} blankTarget={true}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TwitterShareButton url={pageUrl} title={heading}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={pageUrl} title={heading}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TelegramShareButton url={pageUrl} title={heading}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <Button
        size="small"
        variant="outlined"
        color="info"
        sx={{
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          minWidth: "32px",
          padding: 0,
        }}
        onClick={() => {
          navigator.clipboard.writeText(pageUrl);
          setIsSnackBarOpen(true);
          setSnackBarMessage("Link copied to clipboard");
        }}
      >
        <LinkRoundedIcon />
      </Button>
    </div>
  );
};
