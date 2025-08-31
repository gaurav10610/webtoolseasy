"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ButtonWithHandler } from "@/components/lib/buttons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { map } from "lodash-es";

const TOP_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "America/Sao_Paulo",
];

// A curated list of common IANA timezones for the searchable dropdown
const ALL_TIMEZONES = [
  ...TOP_TIMEZONES,
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Seoul",
  "Asia/Singapore",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Kuala_Lumpur",
  "Asia/Manila",
  "Asia/Ho_Chi_Minh",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Amsterdam",
  "Europe/Moscow",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "America/Chicago",
  "America/Denver",
  "America/Argentina/Buenos_Aires",
  "America/Mexico_City",
  "America/Montevideo",
  "America/Caracas",
  "America/Halifax",
  "America/Anchorage",
  "Pacific/Honolulu",
];

function formatTime(date: Date, tz: string, use24: boolean) {
  try {
    const opts: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: !use24,
      timeZone: tz,
    };
    return new Intl.DateTimeFormat(undefined, opts).format(date);
  } catch {
    return "--:--";
  }
}

export default function TimezoneConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = "";
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });
  const [use24, setUse24] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());

  // local form state for date/time inputs
  const [dateStr, setDateStr] = useState<string>("");
  const [timeStr, setTimeStr] = useState<string>("");
  const [inputTz, setInputTz] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  });

  // output timezones selected (multi) - default to TOP_TIMEZONES
  const [outputTzs, setOutputTzs] = useState<string[]>(() =>
    TOP_TIMEZONES.slice()
  );

  // output date-only (kept in sync with input date by default)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Helpers to format date/time for native inputs
  const pad = useCallback((n: number) => (n < 10 ? `0${n}` : `${n}`), []);

  const toDateInputValue = useCallback(
    (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    [pad]
  );

  const toTimeInputValue = useCallback(
    (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    [pad]
  );

  // Sync local inputs from toolState.code when it changes (e.g., from share links)
  useEffect(() => {
    if (!toolState.code || !toolState.code.trim()) {
      setDateStr("");
      setTimeStr("");
      return;
    }
    const d = new Date(toolState.code.trim());
    if (Number.isNaN(d.getTime())) {
      // invalid input -> keep as empty
      setDateStr("");
      setTimeStr("");
      return;
    }
    setDateStr(toDateInputValue(d));
    setTimeStr(toTimeInputValue(d));
  }, [toolState.code, toDateInputValue, toTimeInputValue]);

  // When date/time inputs change, update toolState.code to an ISO-like string
  useEffect(() => {
    if (!dateStr || !timeStr) {
      toolState.setCode("");
      return;
    }
    // combine as local datetime string (YYYY-MM-DDTHH:MM)
    const combined = `${dateStr}T${timeStr}`;
    toolState.setCode(combined);
  }, [dateStr, timeStr, toolState]);

  // output date is kept in sync with input date by default (no separate state)

  // Determine which timezones to render: use outputTzs if set, otherwise show TOP_TIMEZONES
  const displayedTimezones = useMemo(() => {
    return outputTzs && outputTzs.length > 0 ? outputTzs : TOP_TIMEZONES;
  }, [outputTzs]);

  // Use MUI Autocomplete for reliable searchable single/multi select behavior

  const parsedInput = useMemo(() => {
    if (!toolState.code || !toolState.code.trim()) return null;
    const d = new Date(toolState.code.trim());
    if (Number.isNaN(d.getTime())) return { valid: false, date: null };
    return { valid: true, date: d };
  }, [toolState.code]);

  const baseDate =
    parsedInput && parsedInput.valid && parsedInput.date
      ? parsedInput.date
      : now;

  const toggleClock = useCallback(() => setUse24((s) => !s), []);

  const buttons = useMemo(() => {
    const custom = [
      {
        type: "custom" as const,
        text: use24 ? "Switch to 12 hr" : "Switch to 24 hr",
        icon: <AccessTimeIcon />,
        onClick: toggleClock,
      },
    ];

    return [
      ...custom,
      ...createCommonButtons({
        onCopy: () => toolState.actions.copyText(toolState.code, "Copied"),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ];
  }, [use24, toggleClock, toolState]);

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Timezone Converter - Convert time across zones"
        description="Convert times between major world time zones. View current time across top global time zones with 12/24 hour toggle."
        exampleCode="Asia/Kolkata"
        exampleOutput="12:00 PM"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Input</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  From timezone
                </label>
                <Autocomplete
                  size="small"
                  options={ALL_TIMEZONES}
                  value={inputTz}
                  onChange={(_e, v: string | null) => setInputTz(v || "UTC")}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select timezone" />
                  )}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  To timezones
                </label>
                <Autocomplete
                  multiple
                  size="small"
                  options={ALL_TIMEZONES}
                  value={outputTzs}
                  onChange={(_e, v: string[]) => setOutputTzs(v)}
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option.replace(/_/g, " ")}
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select output timezones"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-1 block">Date</label>
                <TextField
                  type="date"
                  size="small"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full"
                  InputLabelProps={{ shrink: false }}
                  inputProps={{ "aria-label": "Input date" }}
                />
              </div>

              <div className="w-40">
                <label className="text-sm text-gray-600 mb-1 block">Time</label>
                <TextField
                  type="time"
                  size="small"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full"
                  inputProps={{ "aria-label": "Input time" }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <ButtonWithHandler
                size="small"
                variant="outlined"
                color="primary"
                buttonText="Use now"
                onClick={() => {
                  const d = new Date();
                  setDateStr(toDateInputValue(d));
                  setTimeStr(toTimeInputValue(d));
                }}
                className="px-3 py-1"
              />

              <ButtonWithHandler
                size="small"
                variant="outlined"
                color="error"
                buttonText="Clear"
                onClick={() => {
                  setDateStr("");
                  setTimeStr("");
                }}
                startIcon={<CloseIcon />}
                className="px-3 py-1"
              />
            </div>

            <div className="mt-3 text-sm text-gray-600">
              Example: 2025-08-31 for date and 10:00 for time.
            </div>
          </div>
        </div>

        <div>
          <div className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Converted Times</h3>
              <div className="text-sm text-gray-600">
                Mode: {use24 ? "24 hr" : "12 hr"}
              </div>
            </div>

            <div className="mb-2 text-sm text-gray-600">
              {parsedInput === null
                ? `Showing current time in ${inputTz}`
                : parsedInput.valid && parsedInput.date
                ? `Showing converted time for ${parsedInput.date.toISOString()} (interpreted in ${inputTz})`
                : `Invalid timestamp, showing current time in ${inputTz} instead`}
            </div>

            {/* First row: input and primary output date-only display */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 p-2 border rounded">
                <div className="text-xs text-gray-500">Input ({inputTz})</div>
                <div className="text-lg font-mono">
                  {formatTime(baseDate, inputTz, use24)}
                </div>
              </div>

              <div className="flex-1 p-2 border rounded">
                <div className="text-xs text-gray-500">Primary output</div>
                <div className="text-lg font-mono">
                  {formatTime(baseDate, displayedTimezones[0], use24)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {map(displayedTimezones, (tz) => (
                <div
                  key={tz}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div className="font-medium">
                    {tz.replace("_/", "/").replace(/_/g, " ")}
                  </div>
                  <div className="text-right text-lg font-mono">
                    {formatTime(baseDate, tz, use24)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
