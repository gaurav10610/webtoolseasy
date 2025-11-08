"use client";

import React, { useState, useCallback } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ToolLayout, SEOContent } from "@/components/common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

type TimeFormat = "12" | "24";
type CalculationMode = "difference" | "add" | "subtract";

interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
  period?: "AM" | "PM";
}

export default function TimeDurationCalculator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [mode, setMode] = useState<CalculationMode>("difference");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12");

  // For difference calculation
  const [startTime, setStartTime] = useState<TimeValue>({
    hours: 9,
    minutes: 0,
    seconds: 0,
    period: "AM",
  });
  const [endTime, setEndTime] = useState<TimeValue>({
    hours: 5,
    minutes: 0,
    seconds: 0,
    period: "PM",
  });

  // For add/subtract calculation
  const [baseTime, setBaseTime] = useState<TimeValue>({
    hours: 12,
    minutes: 0,
    seconds: 0,
    period: "PM",
  });
  const [duration, setDuration] = useState<TimeValue>({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalMinutes: number;
    totalSeconds: number;
    decimalHours: number;
    resultTime?: string;
  } | null>(null);

  // Convert time to total seconds for easier calculation
  const timeToSeconds = useCallback(
    (time: TimeValue): number => {
      let hours = time.hours;

      if (timeFormat === "12" && time.period) {
        if (time.period === "PM" && hours !== 12) {
          hours += 12;
        } else if (time.period === "AM" && hours === 12) {
          hours = 0;
        }
      }

      return hours * 3600 + time.minutes * 60 + time.seconds;
    },
    [timeFormat]
  );

  // Convert seconds back to time
  const secondsToTime = useCallback(
    (totalSeconds: number): TimeValue => {
      const absSeconds = Math.abs(totalSeconds);
      const hours = Math.floor(absSeconds / 3600);
      const minutes = Math.floor((absSeconds % 3600) / 60);
      const seconds = absSeconds % 60;

      if (timeFormat === "12") {
        const displayHours = hours % 12 || 12;
        const period = hours < 12 || hours === 24 ? "AM" : "PM";
        return { hours: displayHours, minutes, seconds, period };
      }

      return { hours: hours % 24, minutes, seconds };
    },
    [timeFormat]
  );

  const formatTimeDisplay = useCallback(
    (time: TimeValue): string => {
      const h = time.hours.toString().padStart(2, "0");
      const m = time.minutes.toString().padStart(2, "0");
      const s = time.seconds.toString().padStart(2, "0");

      if (timeFormat === "12" && time.period) {
        return `${h}:${m}:${s} ${time.period}`;
      }
      return `${h}:${m}:${s}`;
    },
    [timeFormat]
  );

  const calculateDuration = useCallback(() => {
    try {
      if (mode === "difference") {
        const startSeconds = timeToSeconds(startTime);
        const endSeconds = timeToSeconds(endTime);
        let diffSeconds = endSeconds - startSeconds;

        // Handle crossing midnight
        if (diffSeconds < 0) {
          diffSeconds += 24 * 3600;
        }

        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        setResult({
          hours,
          minutes,
          seconds,
          totalMinutes: Math.floor(diffSeconds / 60),
          totalSeconds: diffSeconds,
          decimalHours: parseFloat((diffSeconds / 3600).toFixed(2)),
        });
      } else if (mode === "add") {
        const baseSeconds = timeToSeconds(baseTime);
        const durationSeconds =
          duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
        const resultSeconds = (baseSeconds + durationSeconds) % (24 * 3600);

        const resultTime = secondsToTime(resultSeconds);
        const hours = duration.hours;
        const minutes = duration.minutes;
        const seconds = duration.seconds;

        setResult({
          hours,
          minutes,
          seconds,
          totalMinutes: Math.floor(durationSeconds / 60),
          totalSeconds: durationSeconds,
          decimalHours: parseFloat((durationSeconds / 3600).toFixed(2)),
          resultTime: formatTimeDisplay(resultTime),
        });
      } else if (mode === "subtract") {
        const baseSeconds = timeToSeconds(baseTime);
        const durationSeconds =
          duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
        let resultSeconds = baseSeconds - durationSeconds;

        if (resultSeconds < 0) {
          resultSeconds += 24 * 3600;
        }

        const resultTime = secondsToTime(resultSeconds);
        const hours = duration.hours;
        const minutes = duration.minutes;
        const seconds = duration.seconds;

        setResult({
          hours,
          minutes,
          seconds,
          totalMinutes: Math.floor(durationSeconds / 60),
          totalSeconds: durationSeconds,
          decimalHours: parseFloat((durationSeconds / 3600).toFixed(2)),
          resultTime: formatTimeDisplay(resultTime),
        });
      }

      toolState.actions.showMessage("Time calculated successfully!");
    } catch {
      toolState.actions.showMessage(
        "Error calculating time. Please check your inputs."
      );
    }
  }, [
    mode,
    startTime,
    endTime,
    baseTime,
    duration,
    timeToSeconds,
    secondsToTime,
    formatTimeDisplay,
    toolState.actions,
  ]);

  const updateTimeValue = (
    setter: React.Dispatch<React.SetStateAction<TimeValue>>,
    field: keyof TimeValue,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    setter((prev) => ({
      ...prev,
      [field]:
        field === "hours"
          ? Math.max(0, Math.min(timeFormat === "12" ? 12 : 23, numValue))
          : field === "period"
          ? value
          : Math.max(0, Math.min(59, numValue)),
    }));
  };

  const resetCalculator = () => {
    setStartTime({ hours: 9, minutes: 0, seconds: 0, period: "AM" });
    setEndTime({ hours: 5, minutes: 0, seconds: 0, period: "PM" });
    setBaseTime({ hours: 12, minutes: 0, seconds: 0, period: "PM" });
    setDuration({ hours: 2, minutes: 30, seconds: 0 });
    setResult(null);
  };

  return (
    <ToolLayout
      snackBar={
        toolState.snackBar.open
          ? {
              ...toolState.snackBar,
              onClose: toolState.snackBar.close,
            }
          : undefined
      }
    >
      <SEOContent
        title="Time Duration Calculator"
        description="Calculate time duration between hours, add or subtract time, and convert between time formats easily."
      />

      <div className="w-full max-w-4xl mx-auto">
        {/* Mode Selection */}
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Calculation Mode
            </Typography>
            <div className="flex flex-col gap-4">
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, value) => {
                  if (value) {
                    setMode(value);
                    setResult(null);
                  }
                }}
                fullWidth
              >
                <ToggleButton value="difference">Time Difference</ToggleButton>
                <ToggleButton value="add">Add Time</ToggleButton>
                <ToggleButton value="subtract">Subtract Time</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                value={timeFormat}
                exclusive
                onChange={(_, value) => {
                  if (value) {
                    setTimeFormat(value);
                    resetCalculator();
                  }
                }}
                fullWidth
              >
                <ToggleButton value="12">12-Hour (AM/PM)</ToggleButton>
                <ToggleButton value="24">24-Hour</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Time Difference Mode */}
        {mode === "difference" && (
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calculate Time Between Two Times
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Start Time */}
                <div>
                  <Typography variant="subtitle2" className="mb-2">
                    Start Time
                  </Typography>
                  <div className="grid grid-cols-3 gap-2">
                    <TextField
                      label="Hours"
                      type="number"
                      value={startTime.hours}
                      onChange={(e) =>
                        updateTimeValue(setStartTime, "hours", e.target.value)
                      }
                      inputProps={{
                        min: timeFormat === "12" ? 1 : 0,
                        max: timeFormat === "12" ? 12 : 23,
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Minutes"
                      type="number"
                      value={startTime.minutes}
                      onChange={(e) =>
                        updateTimeValue(setStartTime, "minutes", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                    <TextField
                      label="Seconds"
                      type="number"
                      value={startTime.seconds}
                      onChange={(e) =>
                        updateTimeValue(setStartTime, "seconds", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                  </div>
                  {timeFormat === "12" && (
                    <FormControl fullWidth className="mt-2">
                      <InputLabel>Period</InputLabel>
                      <Select
                        value={startTime.period}
                        label="Period"
                        onChange={(e) =>
                          setStartTime((prev) => ({
                            ...prev,
                            period: e.target.value as "AM" | "PM",
                          }))
                        }
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </div>

                {/* End Time */}
                <div>
                  <Typography variant="subtitle2" className="mb-2">
                    End Time
                  </Typography>
                  <div className="grid grid-cols-3 gap-2">
                    <TextField
                      label="Hours"
                      type="number"
                      value={endTime.hours}
                      onChange={(e) =>
                        updateTimeValue(setEndTime, "hours", e.target.value)
                      }
                      inputProps={{
                        min: timeFormat === "12" ? 1 : 0,
                        max: timeFormat === "12" ? 12 : 23,
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Minutes"
                      type="number"
                      value={endTime.minutes}
                      onChange={(e) =>
                        updateTimeValue(setEndTime, "minutes", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                    <TextField
                      label="Seconds"
                      type="number"
                      value={endTime.seconds}
                      onChange={(e) =>
                        updateTimeValue(setEndTime, "seconds", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                  </div>
                  {timeFormat === "12" && (
                    <FormControl fullWidth className="mt-2">
                      <InputLabel>Period</InputLabel>
                      <Select
                        value={endTime.period}
                        label="Period"
                        onChange={(e) =>
                          setEndTime((prev) => ({
                            ...prev,
                            period: e.target.value as "AM" | "PM",
                          }))
                        }
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </div>
              </div>

              <button
                onClick={calculateDuration}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Calculate Duration
              </button>
            </CardContent>
          </Card>
        )}

        {/* Add/Subtract Mode */}
        {(mode === "add" || mode === "subtract") && (
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {mode === "add" ? "Add" : "Subtract"} Time Duration
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Base Time */}
                <div>
                  <Typography variant="subtitle2" className="mb-2">
                    Base Time
                  </Typography>
                  <div className="grid grid-cols-3 gap-2">
                    <TextField
                      label="Hours"
                      type="number"
                      value={baseTime.hours}
                      onChange={(e) =>
                        updateTimeValue(setBaseTime, "hours", e.target.value)
                      }
                      inputProps={{
                        min: timeFormat === "12" ? 1 : 0,
                        max: timeFormat === "12" ? 12 : 23,
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Minutes"
                      type="number"
                      value={baseTime.minutes}
                      onChange={(e) =>
                        updateTimeValue(setBaseTime, "minutes", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                    <TextField
                      label="Seconds"
                      type="number"
                      value={baseTime.seconds}
                      onChange={(e) =>
                        updateTimeValue(setBaseTime, "seconds", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                  </div>
                  {timeFormat === "12" && (
                    <FormControl fullWidth className="mt-2">
                      <InputLabel>Period</InputLabel>
                      <Select
                        value={baseTime.period}
                        label="Period"
                        onChange={(e) =>
                          setBaseTime((prev) => ({
                            ...prev,
                            period: e.target.value as "AM" | "PM",
                          }))
                        }
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </div>

                {/* Duration to Add/Subtract */}
                <div>
                  <Typography variant="subtitle2" className="mb-2">
                    Duration to {mode === "add" ? "Add" : "Subtract"}
                  </Typography>
                  <div className="grid grid-cols-3 gap-2">
                    <TextField
                      label="Hours"
                      type="number"
                      value={duration.hours}
                      onChange={(e) =>
                        updateTimeValue(setDuration, "hours", e.target.value)
                      }
                      inputProps={{ min: 0 }}
                      fullWidth
                    />
                    <TextField
                      label="Minutes"
                      type="number"
                      value={duration.minutes}
                      onChange={(e) =>
                        updateTimeValue(setDuration, "minutes", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                    <TextField
                      label="Seconds"
                      type="number"
                      value={duration.seconds}
                      onChange={(e) =>
                        updateTimeValue(setDuration, "seconds", e.target.value)
                      }
                      inputProps={{ min: 0, max: 59 }}
                      fullWidth
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={calculateDuration}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Calculate Result
              </button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <Card className="mb-4" style={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {mode === "difference" ? "Time Duration" : "Result"}
              </Typography>

              {result.resultTime && (
                <div className="mb-4 p-4 bg-white rounded-lg">
                  <Typography variant="subtitle2" color="text.secondary">
                    Result Time
                  </Typography>
                  <Typography variant="h4" className="font-bold text-blue-700">
                    {result.resultTime}
                  </Typography>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white rounded-lg">
                  <Typography variant="subtitle2" color="text.secondary">
                    Hours : Minutes : Seconds
                  </Typography>
                  <Typography variant="h5" className="font-bold text-blue-700">
                    {result.hours}h {result.minutes}m {result.seconds}s
                  </Typography>
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Minutes
                  </Typography>
                  <Typography variant="h5" className="font-bold text-green-700">
                    {result.totalMinutes} min
                  </Typography>
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <Typography variant="subtitle2" color="text.secondary">
                    Decimal Hours
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-bold text-purple-700"
                  >
                    {result.decimalHours} hrs
                  </Typography>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg">
                <Typography variant="subtitle2" color="text.secondary">
                  Total Seconds
                </Typography>
                <Typography variant="h6" className="font-bold">
                  {result.totalSeconds} seconds
                </Typography>
              </div>

              <Alert severity="info" className="mt-4">
                Decimal hours ({result.decimalHours} hrs) are useful for payroll
                and billing calculations.
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Usage Tips */}
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Tips
            </Typography>
            <Alert severity="info" className="mb-2">
              <strong>Time Difference:</strong> Calculate hours worked, event
              duration, or elapsed time between two times.
            </Alert>
            <Alert severity="success" className="mb-2">
              <strong>Add Time:</strong> Find end time when you know start time
              and duration (e.g., meeting scheduling).
            </Alert>
            <Alert severity="warning">
              <strong>Subtract Time:</strong> Find start time when you know end
              time and duration, or calculate time remaining.
            </Alert>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <button
          onClick={resetCalculator}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4"
        >
          Reset Calculator
        </button>
      </div>
    </ToolLayout>
  );
}
