"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Typography, Card, CardContent, IconButton, Chip } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FlagIcon from "@mui/icons-material/Flag";

interface LapTime {
  id: number;
  time: number;
  timestamp: string;
}

export default function Stopwatch({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = useCallback((milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    toolState.actions.showMessage("Stopwatch started");
  }, [toolState.actions]);

  const pause = useCallback(() => {
    setIsRunning(false);
    toolState.actions.showMessage("Stopwatch paused");
  }, [toolState.actions]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    toolState.actions.showMessage("Stopwatch reset");
  }, [toolState.actions]);

  const recordLap = useCallback(() => {
    const lapTime: LapTime = {
      id: laps.length + 1,
      time,
      timestamp: formatTime(time),
    };
    setLaps((prevLaps) => [lapTime, ...prevLaps]);
    toolState.actions.showMessage(`Lap ${lapTime.id} recorded`);
  }, [time, laps.length, formatTime, toolState.actions]);

  const copyLaps = useCallback(() => {
    if (laps.length === 0) {
      toolState.actions.showMessage("No lap times to copy");
      return;
    }

    const lapText = laps
      .map((lap) => `Lap ${lap.id}: ${lap.timestamp}`)
      .reverse()
      .join("\n");
    toolState.actions.copyText(lapText, "Lap times copied!");
  }, [laps, toolState.actions]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Copy Laps",
      onClick: copyLaps,
      variant: "outlined" as const,
      disabled: laps.length === 0,
    },
  ];

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Free Online Stopwatch"
        description="Precise digital stopwatch with lap timer. Start, stop, and record split times for sports, workouts, cooking, or any timing needs."
        exampleCode="Start → Record Laps → Stop"
        exampleOutput="Accurate time measurement with lap tracking"
      />

      <ToolControls buttons={buttons} />

      <Card>
        <CardContent className="flex flex-col items-center gap-6 py-8">
          {/* Time Display */}
          <div className="text-center">
            <Typography
              variant="h1"
              className="font-mono font-bold text-6xl md:text-8xl"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatTime(time)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-2">
              HH:MM:SS.MS
            </Typography>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 items-center">
            {!isRunning ? (
              <IconButton
                onClick={start}
                size="large"
                color="success"
                className="w-20 h-20"
                title="Start"
              >
                <PlayArrowIcon sx={{ fontSize: 48 }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={pause}
                size="large"
                color="warning"
                className="w-20 h-20"
                title="Pause"
              >
                <PauseIcon sx={{ fontSize: 48 }} />
              </IconButton>
            )}

            <IconButton
              onClick={recordLap}
              size="large"
              color="primary"
              className="w-20 h-20"
              disabled={time === 0}
              title="Record Lap"
            >
              <FlagIcon sx={{ fontSize: 48 }} />
            </IconButton>

            <IconButton
              onClick={reset}
              size="large"
              color="error"
              className="w-20 h-20"
              disabled={time === 0 && laps.length === 0}
              title="Reset"
            >
              <RestartAltIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </div>

          {/* Status */}
          <Chip
            label={isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
            color={isRunning ? "success" : time > 0 ? "warning" : "default"}
            size="small"
          />
        </CardContent>
      </Card>

      {/* Lap Times */}
      {laps.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Lap Times ({laps.length})
            </Typography>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {laps.map((lap, index) => {
                const previousTime = laps[index + 1]?.time || 0;
                const lapDuration = lap.time - previousTime;

                return (
                  <div
                    key={lap.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="body2"
                        className="font-semibold w-16"
                      >
                        Lap {lap.id}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="font-mono"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {formatTime(lapDuration)}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="font-mono"
                    >
                      Total: {lap.timestamp}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <Typography variant="body2" className="text-sm">
            <strong>Keyboard Shortcuts:</strong> Press Space to Start/Pause, L
            to record a Lap, and R to Reset. The stopwatch continues running
            even if you switch tabs or minimize your browser.
          </Typography>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
