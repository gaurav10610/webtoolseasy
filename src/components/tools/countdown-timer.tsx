"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

export default function CountdownTimer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300000); // 5 minutes default
  const [initialTime, setInitialTime] = useState(300000);
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  useEffect(() => {
    // Create audio element for alarm
    audioRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCyAzO/aiTIHHG7A7+OZRQ0PVa7n77RnHAU8ltjzy3QoBS18yO3ZjDsJG2i57+GdSg0NTqvl8LRnHQU9ltjzy3QoBS18yO3ZjDsJG2i57+GdSg0NTqvl8LRnHQU9ltjzy3QoBS18yO3ZjDsJG2i57+GdSg0NTqvl8LRnHQU9ltjzy3QoBS18yO3ZjDsJG2i57+GdSg0NTqvl8A=="
    );
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  const playAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 10;
          if (newTime <= 0) {
            setIsRunning(false);
            playAlarm();
            toolState.actions.showMessage("Time's up!");
            return 0;
          }
          return newTime;
        });
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
  }, [isRunning, timeLeft, playAlarm, toolState.actions]);

  const formatTime = useCallback((milliseconds: number): string => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const start = useCallback(() => {
    if (timeLeft === 0) {
      toolState.actions.showMessage("Please set a time first");
      return;
    }
    setIsRunning(true);
    toolState.actions.showMessage("Timer started");
  }, [timeLeft, toolState.actions]);

  const pause = useCallback(() => {
    setIsRunning(false);
    toolState.actions.showMessage("Timer paused");
  }, [toolState.actions]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    toolState.actions.showMessage("Timer reset");
  }, [initialTime, toolState.actions]);

  const setCustomTime = useCallback(() => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    const totalMs = (h * 3600 + m * 60 + s) * 1000;

    if (totalMs === 0) {
      toolState.actions.showMessage("Please enter a valid time");
      return;
    }

    setInitialTime(totalMs);
    setTimeLeft(totalMs);
    setIsRunning(false);
    toolState.actions.showMessage("Timer set!");
  }, [hours, minutes, seconds, toolState.actions]);

  const setPreset = useCallback(
    (ms: number) => {
      setInitialTime(ms);
      setTimeLeft(ms);
      setIsRunning(false);
      const totalSeconds = ms / 1000;
      setHours(Math.floor(totalSeconds / 3600).toString());
      setMinutes(Math.floor((totalSeconds % 3600) / 60).toString());
      setSeconds((totalSeconds % 60).toString());
      toolState.actions.showMessage("Timer preset loaded");
    },
    [toolState.actions]
  );

  const buttons = [
    {
      type: "custom" as const,
      text: "Full Screen",
      icon: <OpenInFullIcon />,
      onClick: toolState.toggleFullScreen,
      variant: "outlined" as const,
    },
  ];

  const presets = [
    { label: "5 min", ms: 300000 },
    { label: "10 min", ms: 600000 },
    { label: "15 min", ms: 900000 },
    { label: "25 min (Pomodoro)", ms: 1500000 },
    { label: "30 min", ms: 1800000 },
    { label: "1 hour", ms: 3600000 },
  ];

  const progress = initialTime > 0 ? (timeLeft / initialTime) * 100 : 100;
  const isExpired = timeLeft === 0 && !isRunning;

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
        title="Free Countdown Timer Online"
        description="Set custom countdown timer with alarm for cooking, workouts, studying, or any timed activity. Preset options available for quick setup."
        exampleCode="Set time → Start → Get alert"
        exampleOutput="Visual and audio notification when time expires"
      />

      <ToolControls buttons={buttons} />

      {/* Quick Presets */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className="font-semibold mb-2">
            Quick Presets:
          </Typography>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Chip
                key={preset.label}
                label={preset.label}
                onClick={() => setPreset(preset.ms)}
                clickable
                color="primary"
                size="small"
                variant={timeLeft === preset.ms ? "filled" : "outlined"}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card
        className={isExpired ? "border-4 border-red-500 animate-pulse" : ""}
      >
        <CardContent className="flex flex-col items-center gap-6 py-8">
          {/* Progress Bar */}
          <div className="w-full">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  isExpired
                    ? "bg-red-500"
                    : progress > 50
                    ? "bg-green-500"
                    : progress > 25
                    ? "bg-yellow-500"
                    : "bg-orange-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Time Display */}
          <div className="text-center">
            <Typography
              variant="h1"
              className={`font-mono font-bold text-6xl md:text-8xl ${
                isExpired ? "text-red-500" : ""
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatTime(timeLeft)}
            </Typography>
            {isExpired && (
              <Typography variant="h6" className="mt-2 text-red-500 font-bold">
                TIME&apos;S UP!
              </Typography>
            )}
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
              onClick={reset}
              size="large"
              color="error"
              className="w-20 h-20"
              title="Reset"
            >
              <RestartAltIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </div>

          {/* Status */}
          <Chip
            label={
              isExpired
                ? "Expired"
                : isRunning
                ? "Running"
                : timeLeft < initialTime
                ? "Paused"
                : "Ready"
            }
            color={
              isExpired
                ? "error"
                : isRunning
                ? "success"
                : timeLeft < initialTime
                ? "warning"
                : "default"
            }
            size="small"
          />
        </CardContent>
      </Card>

      {/* Custom Time Input */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Set Custom Time
          </Typography>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <TextField
              label="Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              size="small"
              inputProps={{ min: 0, max: 23 }}
              className="w-full md:w-24"
            />
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              size="small"
              inputProps={{ min: 0, max: 59 }}
              className="w-full md:w-24"
            />
            <TextField
              label="Seconds"
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              size="small"
              inputProps={{ min: 0, max: 59 }}
              className="w-full md:w-24"
            />
            <IconButton
              onClick={setCustomTime}
              color="primary"
              size="large"
              title="Set Timer"
              className="md:mb-1"
            >
              <PlayArrowIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="body2" className="text-sm">
            <strong>Tips:</strong> Use preset times for quick setup, or enter a
            custom duration. The timer will continue running even if you switch
            tabs. When time expires, you&apos;ll receive both visual and audio
            notifications.
          </Typography>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
