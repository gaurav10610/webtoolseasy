"use client";

import { Typography, Card, CardContent, Chip } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import Cron from "react-cron-generator";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import { useToolState } from "@/hooks/useToolState";

/** Parse a single cron field to a sorted unique array of allowed values. */
function parseCronField(field: string, min: number, max: number): number[] {
  if (field === "*" || field === "?" || field === "L") {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }
  const values = new Set<number>();
  for (const part of field.split(",")) {
    if (part.includes("/")) {
      const [rangeStr, stepStr] = part.split("/");
      const step = parseInt(stepStr) || 1;
      const rangeFrom =
        rangeStr === "*" ? min : parseInt(rangeStr.split("-")[0]);
      const rangeTo = rangeStr.includes("-")
        ? parseInt(rangeStr.split("-")[1])
        : max;
      for (let i = rangeFrom; i <= rangeTo; i += step) values.add(i);
    } else if (part.includes("-")) {
      const [from, to] = part.split("-").map(Number);
      for (let i = from; i <= to; i++) values.add(i);
    } else if (!isNaN(Number(part))) {
      values.add(Number(part));
    }
  }
  return Array.from(values).sort((a, b) => a - b);
}

/** Get next N occurrences for a quartz-style cron (6 fields: sec min hr dom mon dow). */
function getNextCronOccurrences(cronStr: string, count = 8): Date[] {
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length < 5) return [];

  let secField: string,
    minField: string,
    hrField: string,
    domField: string,
    monField: string,
    dowField: string;
  if (parts.length >= 6) {
    [secField, minField, hrField, domField, monField, dowField] = parts;
  } else {
    secField = "0";
    [minField, hrField, domField, monField, dowField] = parts;
  }

  const seconds = parseCronField(secField ?? "0", 0, 59);
  const minutes = parseCronField(minField, 0, 59);
  const hours = parseCronField(hrField, 0, 23);
  const months = parseCronField(monField, 1, 12);
  const doms = parseCronField(domField, 1, 31);
  const isDomStar = domField === "*" || domField === "?";
  const isDowStar = dowField === "*" || dowField === "?";
  const dows = parseCronField(dowField ?? "*", 0, 6);

  const results: Date[] = [];
  const now = new Date();
  // Start search 1 second ahead
  let cursor = new Date(now.getTime() + 1000);
  cursor.setMilliseconds(0);

  let limit = 0;
  while (results.length < count && limit++ < 100000) {
    if (!months.includes(cursor.getMonth() + 1)) {
      cursor.setMonth(cursor.getMonth() + 1, 1);
      cursor.setHours(0, 0, 0);
      continue;
    }
    const dayOk = isDomStar
      ? dows.includes(cursor.getDay())
      : isDowStar
        ? doms.includes(cursor.getDate())
        : doms.includes(cursor.getDate()) || dows.includes(cursor.getDay());
    if (!dayOk) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(0, 0, 0);
      continue;
    }
    if (!hours.includes(cursor.getHours())) {
      cursor.setHours(cursor.getHours() + 1, 0, 0);
      continue;
    }
    if (!minutes.includes(cursor.getMinutes())) {
      cursor.setMinutes(cursor.getMinutes() + 1, 0);
      continue;
    }
    if (!seconds.includes(cursor.getSeconds())) {
      cursor.setSeconds(cursor.getSeconds() + 1);
      continue;
    }
    results.push(new Date(cursor));
    cursor.setSeconds(cursor.getSeconds() + 1);
  }
  return results;
}

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

  const nextOccurrences = useMemo(() => {
    try {
      return getNextCronOccurrences(cronValue, 8);
    } catch {
      return [];
    }
  }, [cronValue]);

  const copyCronExpression = useCallback(() => {
    toolState.actions.copyText(
      cronValue,
      "Cron Expression copied to clipboard!",
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
    [copyCronExpression],
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
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <Typography
            variant="h6"
            color="textSecondary"
            className="text-center"
          >
            Cron Expression
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex-shrink-0">
              <Typography
                variant="h4"
                color="secondary"
                className="text-center font-mono bg-gray-100 px-4 py-2 rounded whitespace-nowrap min-w-0"
              >
                {cronValue || "* * * * * *"}
              </Typography>
            </div>
            <div className="flex-shrink-0">
              <ToolControls buttons={buttons} color="primary" size="medium" />
            </div>
          </div>
        </div>

        <div className="w-full justify-center flex">
          <Cron
            key={cronValue}
            onChange={onCronChange}
            value={cronValue}
            showResultText
            showResultCron={false}
          />
        </div>

        {nextOccurrences.length > 0 && (
          <Card className="w-full max-w-xl">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Next {nextOccurrences.length} Scheduled Runs
              </Typography>
              <div className="flex flex-col gap-2">
                {nextOccurrences.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Chip
                      label={`#${i + 1}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ minWidth: 36 }}
                    />
                    <Typography variant="body2" className="font-mono">
                      {d.toLocaleString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
