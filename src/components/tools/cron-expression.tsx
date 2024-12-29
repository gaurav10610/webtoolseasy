"use client";

import { Typography } from "@mui/material";
import { useState } from "react";
import Cron from "react-cron-generator";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/util/commonUtils";
import { SnackBarWithPosition } from "../lib/snackBar";

export default function CronExpression() {
  const [state, setState] = useState<{ value?: string }>({});

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "Cron Expression copied to Clipboard!";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const onCopyHandler = () => {
    copyToClipboard(state.value!);
    setIsSnackBarOpen(true);
  };

  return (
    <div className="flex flex-col w-full items-center gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
        <Typography variant="h4" color="secondary" className="text-center">
          {state.value}
        </Typography>
        <ButtonWithHandler
          buttonText="Copy Cron Expression"
          startIcon={<ContentCopyIcon />}
          size="small"
          onClick={onCopyHandler}
        />
      </div>
      <Cron
        onChange={(e) => {
          setState({ value: e });
        }}
        value={state.value}
        showResultText={false}
        showResultCron={false}
      />
    </div>
  );
}
