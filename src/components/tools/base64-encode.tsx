"use client";

import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { useState } from "react";
import { Typography } from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import { copyToClipboard } from "@/util/commonUtils";
import { SnackBarWithPosition } from "../lib/snackBar";

export default function Base64Encode() {
  const [base64Data, setBase64Data] = useState<string>("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "Base64 Data Copied!";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result;
      setBase64Data(base64Data as string);
    };
  };

  const openFileDialog = () => {
    const input = document.getElementById("file") as HTMLInputElement;
    input.type = "file";
    input.click();
  };

  const copyBase64DataURI = () => {
    copyToClipboard(base64Data);
    setIsSnackBarOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <div className="flex flex-col items-center justify-center w-full border-solid border-2 border-lightgrey rounded-sm p-4">
        <InsertDriveFileRoundedIcon fontSize="large" />
        <Typography variant="body2">or</Typography>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleSelectFile}
        />
        <ButtonWithHandler
          onClick={openFileDialog}
          buttonText="Browse File"
          size="small"
          variant="outlined"
        />
      </div>

      <div className="flex flex-col w-full justify-end gap-2">
        <ButtonWithHandler
          buttonText="Copy Base64 Data"
          onClick={copyBase64DataURI}
          size="small"
          variant="contained"
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <Typography
          color="textSecondary"
          variant="caption"
          sx={{ overflowWrap: "anywhere" }}
        >
          Base64 data example:
          iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVR4nGNgGAWjYBSMwFgYwB
          ...
        </Typography>
      </div>

      <div className="flex flex-col w-full">
        <Typography variant="h3" sx={{ fontSize: "inherit" }} color="primary">
          Base64 Encoded Data
        </Typography>
        <div className="w-full border-solid border-2 border-lightgrey rounded-sm p-4">
          <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
            {base64Data}
          </Typography>
        </div>
      </div>
    </div>
  );
}
