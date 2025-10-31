"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";

export default function UnixTimestampConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [inputTimestamp, setInputTimestamp] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");
  const [convertedData, setConvertedData] = useState<{
    timestamp: number;
    date: Date;
    iso: string;
    utc: string;
    local: string;
    readable: string;
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const convertTimestampToDate = (timestamp: string) => {
    try {
      let ts = parseInt(timestamp);
      if (isNaN(ts)) {
        toolState.actions.showMessage("Invalid timestamp");
        return;
      }

      // Handle milliseconds timestamp (13 digits)
      if (ts.toString().length === 13) {
        ts = Math.floor(ts / 1000);
      }

      const date = new Date(ts * 1000);

      if (isNaN(date.getTime())) {
        toolState.actions.showMessage("Invalid timestamp");
        return;
      }

      setConvertedData({
        timestamp: ts,
        date,
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        readable: date.toString(),
      });

      toolState.actions.showMessage("Timestamp converted successfully!");
    } catch (error) {
      toolState.actions.showMessage("Error converting timestamp");
      console.error(error);
    }
  };

  const convertDateToTimestamp = () => {
    try {
      if (!inputDate) {
        toolState.actions.showMessage("Please select a date");
        return;
      }

      const date = new Date(inputDate);

      if (isNaN(date.getTime())) {
        toolState.actions.showMessage("Invalid date");
        return;
      }

      const ts = Math.floor(date.getTime() / 1000);

      setConvertedData({
        timestamp: ts,
        date,
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        readable: date.toString(),
      });

      toolState.actions.showMessage("Date converted successfully!");
    } catch (error) {
      toolState.actions.showMessage("Error converting date");
      console.error(error);
    }
  };

  const useCurrentTime = () => {
    const date = new Date();
    const ts = Math.floor(date.getTime() / 1000);

    setConvertedData({
      timestamp: ts,
      date,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      readable: date.toString(),
    });

    toolState.actions.showMessage("Current time loaded!");
  };

  const copyValue = (value: string, label: string) => {
    toolState.actions.copyText(value, `${label} copied!`);
  };

  const buttons = [
    {
      type: "custom" as const,
      text: "Use Current Time",
      onClick: useCurrentTime,
      icon: <RefreshIcon />,
      variant: "contained" as const,
      color: "primary" as const,
    },
  ];

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
        title="UNIX Timestamp Converter"
        description="Convert between UNIX timestamps and human-readable dates. Supports seconds and milliseconds. Perfect for developers."
      />

      <div className="flex flex-col gap-4 w-full">
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <AccessTimeIcon color="primary" fontSize="large" />
              <div>
                <Typography variant="subtitle2" className="text-gray-600">
                  Current UNIX Timestamp
                </Typography>
                <Typography variant="h5" className="font-mono font-bold">
                  {currentTimestamp}
                </Typography>
              </div>
            </div>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyValue(currentTimestamp.toString(), "Timestamp")
              }
              size="small"
            >
              Copy
            </Button>
          </CardContent>
        </Card>

        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <Typography variant="h6" className="text-lg font-semibold">
                Timestamp to Date
              </Typography>
              <TextField
                label="UNIX Timestamp"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="1609459200 or 1609459200000"
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    style: {
                      fontFamily: "monospace",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => convertTimestampToDate(inputTimestamp)}
                fullWidth
              >
                Convert to Date
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="flex flex-col gap-3">
              <Typography variant="h6" className="text-lg font-semibold">
                Date to Timestamp
              </Typography>
              <TextField
                type="datetime-local"
                label="Date and Time"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={convertDateToTimestamp}
                fullWidth
              >
                Convert to Timestamp
              </Button>
            </CardContent>
          </Card>
        </div>

        {convertedData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-600"
                  >
                    UNIX Timestamp
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() =>
                      copyValue(convertedData.timestamp.toString(), "Timestamp")
                    }
                  >
                    Copy
                  </Button>
                </div>
                <Typography className="font-mono text-lg">
                  {convertedData.timestamp}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-600"
                  >
                    Milliseconds
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() =>
                      copyValue(
                        (convertedData.timestamp * 1000).toString(),
                        "Milliseconds"
                      )
                    }
                  >
                    Copy
                  </Button>
                </div>
                <Typography className="font-mono text-lg">
                  {convertedData.timestamp * 1000}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-600"
                  >
                    ISO 8601
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyValue(convertedData.iso, "ISO 8601")}
                  >
                    Copy
                  </Button>
                </div>
                <Typography className="font-mono text-sm break-all">
                  {convertedData.iso}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-600"
                  >
                    UTC
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyValue(convertedData.utc, "UTC")}
                  >
                    Copy
                  </Button>
                </div>
                <Typography className="text-sm break-all">
                  {convertedData.utc}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 md:col-span-2">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Typography
                    variant="subtitle2"
                    className="font-semibold text-gray-600"
                  >
                    Local Time
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyValue(convertedData.local, "Local Time")}
                  >
                    Copy
                  </Button>
                </div>
                <Typography className="text-sm break-all">
                  {convertedData.local}
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="border border-blue-200 bg-blue-50">
          <CardContent>
            <Typography variant="body2" className="text-gray-700">
              <strong>Note:</strong> UNIX timestamps are in seconds (10 digits)
              or milliseconds (13 digits). The tool automatically detects the
              format. All times are calculated from January 1, 1970, 00:00:00
              UTC.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
