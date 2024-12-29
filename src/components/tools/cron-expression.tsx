"use client";

import { Typography } from "@mui/material";
import { useState } from "react";
import Cron from "react-cron-generator";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CronExpression() {
  const [state, setState] = useState<{ value?: string }>({});
  return (
    <div className="flex flex-col w-full items-center gap-3">
      <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
        <Typography variant="h4" color="secondary" className="text-center">
          {state.value}
        </Typography>
        <ButtonWithHandler
          buttonText="Copy Cron Expression"
          startIcon={<ContentCopyIcon />}
          size="small"
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
