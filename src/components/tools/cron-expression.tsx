"use client";

import { Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import Cron from "react-cron-generator";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import { useToolState } from "@/hooks/useToolState";

export default function CronExpression() {
  const [cronValue, setCronValue] = useState<string>("0 0 12 * * ?");

  const toolState = useToolState({
    hostname: "",
    queryParams: {},
    initialValue: "",
  });

  const onCronChange = useCallback((value: string) => {
    setCronValue(value);
  }, []);

  const copyCronExpression = useCallback(() => {
    toolState.actions.copyText(
      cronValue,
      "Cron Expression copied to clipboard!"
    );
  }, [toolState.actions, cronValue]);

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "copy" as const,
        text: "Copy Cron Expression",
        onClick: copyCronExpression,
      },
    ],
    [copyCronExpression]
  );

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Cron Expression Generator"
        description="Generate cron expressions with visual builder. Easy-to-use cron job scheduler with human-readable descriptions."
        exampleCode="0 0 12 * * ?"
        exampleOutput="At 12:00 PM every day"
      />

      <div className="flex flex-col w-full items-center gap-6">
        <div className="flex flex-col gap-4 w-full md:flex-row md:justify-center md:items-center">
          <div className="flex flex-col gap-2 items-center">
            <Typography variant="h6" color="textSecondary">
              Cron Expression
            </Typography>
            <Typography
              variant="h4"
              color="secondary"
              className="text-center font-mono bg-gray-100 px-4 py-2 rounded"
            >
              {cronValue || "* * * * * *"}
            </Typography>
          </div>

          <ToolControls buttons={buttons} />
        </div>

        <div className="w-full max-w-4xl">
          <Cron
            onChange={onCronChange}
            value={cronValue}
            showResultText={true}
            showResultCron={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
