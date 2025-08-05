"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Alert,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

enum RecordingState {
  IDLE = "idle",
  PREPARING = "preparing",
  RECORDING = "recording",
  PAUSED = "paused",
  STOPPING = "stopping",
  COMPLETED = "completed",
}

interface RecordingConfig {
  includeScreen: boolean;
  includeCamera: boolean;
  includeMicrophone: boolean;
  includeSystemAudio: boolean;
}

export default function ScreenRecorder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [recordingState, setRecordingState] = useState<RecordingState>(
    RecordingState.IDLE
  );
  const [recordingConfig, setRecordingConfig] = useState<RecordingConfig>({
    includeScreen: true,
    includeCamera: false,
    includeMicrophone: true,
    includeSystemAudio: false,
  });
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamsRef = useRef<MediaStream[]>([]);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup streams
  const cleanupStreams = useCallback(() => {
    streamsRef.current.forEach((stream) => {
      stream.getTracks().forEach((track) => track.stop());
    });
    streamsRef.current = [];
  }, []);

  // Format recording time
  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Get screen capture stream
  const getScreenStream = useCallback(async (): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: recordingConfig.includeSystemAudio,
      });
    } catch {
      throw new Error(
        "Failed to capture screen. Please ensure you grant permission."
      );
    }
  }, [recordingConfig.includeSystemAudio]);

  // Get camera and microphone stream
  const getUserMediaStream = useCallback(async (): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: recordingConfig.includeCamera
          ? {
              width: { ideal: 640 },
              height: { ideal: 480 },
              frameRate: { ideal: 30 },
            }
          : false,
        audio: recordingConfig.includeMicrophone,
      });
    } catch {
      throw new Error(
        "Failed to access camera/microphone. Please ensure you grant permission."
      );
    }
  }, [recordingConfig.includeCamera, recordingConfig.includeMicrophone]);

  // Combine multiple streams
  const combineStreams = useCallback((streams: MediaStream[]): MediaStream => {
    const combinedStream = new MediaStream();

    streams.forEach((stream) => {
      stream.getTracks().forEach((track) => {
        combinedStream.addTrack(track);
      });
    });

    return combinedStream;
  }, []);

  // Start recording timer
  const startTimer = useCallback(() => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  // Stop recording timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setRecordingState(RecordingState.PREPARING);
      setError("");
      chunksRef.current = [];

      // Get required streams
      const streams: MediaStream[] = [];

      if (recordingConfig.includeScreen) {
        const screenStream = await getScreenStream();
        streams.push(screenStream);
        streamsRef.current.push(screenStream);
      }

      if (recordingConfig.includeCamera || recordingConfig.includeMicrophone) {
        const userMediaStream = await getUserMediaStream();
        streams.push(userMediaStream);
        streamsRef.current.push(userMediaStream);
      }

      if (streams.length === 0) {
        throw new Error("At least one recording source must be selected");
      }

      // Combine streams
      const combinedStream = combineStreams(streams);

      // Create media recorder
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp9",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        setRecordingState(RecordingState.COMPLETED);
        cleanupStreams();
        stopTimer();
        toolState.actions.showMessage("Recording completed successfully!");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Recording failed. Please try again.");
        setRecordingState(RecordingState.IDLE);
        cleanupStreams();
        stopTimer();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // Collect data every second

      setRecordingState(RecordingState.RECORDING);
      startTimer();
      toolState.actions.showMessage("Recording started!");
    } catch (error) {
      console.error("Failed to start recording:", error);
      setError(
        error instanceof Error ? error.message : "Failed to start recording"
      );
      setRecordingState(RecordingState.IDLE);
      cleanupStreams();
    }
  }, [
    recordingConfig,
    getScreenStream,
    getUserMediaStream,
    combineStreams,
    cleanupStreams,
    startTimer,
    stopTimer,
    toolState.actions,
  ]);

  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      recordingState === RecordingState.RECORDING
    ) {
      mediaRecorderRef.current.pause();
      setRecordingState(RecordingState.PAUSED);
      stopTimer();
      toolState.actions.showMessage("Recording paused");
    }
  }, [recordingState, stopTimer, toolState.actions]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === RecordingState.PAUSED) {
      mediaRecorderRef.current.resume();
      setRecordingState(RecordingState.RECORDING);
      startTimer();
      toolState.actions.showMessage("Recording resumed");
    }
  }, [recordingState, startTimer, toolState.actions]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      (recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED)
    ) {
      setRecordingState(RecordingState.STOPPING);
      mediaRecorderRef.current.stop();
    }
  }, [recordingState]);

  const downloadRecording = useCallback(() => {
    if (!recordedBlob) {
      toolState.actions.showMessage("No recording to download");
      return;
    }

    const url = URL.createObjectURL(recordedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `screen-recording-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toolState.actions.showMessage("Recording downloaded successfully!");
  }, [recordedBlob, toolState.actions]);

  const resetRecording = useCallback(() => {
    cleanupStreams();
    stopTimer();
    setRecordingState(RecordingState.IDLE);
    setRecordedBlob(null);
    setRecordingTime(0);
    setError("");

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
  }, [cleanupStreams, stopTimer]);

  // Check browser support
  const isSupported = useMemo(() => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
  }, []);

  // Button configuration
  const buttons = useMemo(() => {
    const commonButtons = createCommonButtons({
      onFullScreen: toolState.toggleFullScreen,
    });

    if (recordingState === RecordingState.IDLE) {
      return [
        {
          type: "custom" as const,
          text: "Start Recording",
          onClick: startRecording,
          icon: <PlayArrowIcon />,
          disabled: !isSupported,
        },
        ...commonButtons,
      ];
    }

    if (recordingState === RecordingState.RECORDING) {
      return [
        {
          type: "custom" as const,
          text: "Pause",
          onClick: pauseRecording,
          icon: <PauseIcon />,
        },
        {
          type: "custom" as const,
          text: "Stop",
          onClick: stopRecording,
          icon: <StopIcon />,
        },
        ...commonButtons,
      ];
    }

    if (recordingState === RecordingState.PAUSED) {
      return [
        {
          type: "custom" as const,
          text: "Resume",
          onClick: resumeRecording,
          icon: <PlayArrowIcon />,
        },
        {
          type: "custom" as const,
          text: "Stop",
          onClick: stopRecording,
          icon: <StopIcon />,
        },
        ...commonButtons,
      ];
    }

    if (recordingState === RecordingState.COMPLETED) {
      return [
        {
          type: "custom" as const,
          text: "Download Recording",
          onClick: downloadRecording,
          icon: <DownloadIcon />,
        },
        {
          type: "custom" as const,
          text: "New Recording",
          onClick: resetRecording,
          icon: <PlayArrowIcon />,
        },
        ...commonButtons,
      ];
    }

    return commonButtons;
  }, [
    recordingState,
    isSupported,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    downloadRecording,
    resetRecording,
    toolState,
  ]);

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
        title="Screen Recorder"
        description="Record your screen, camera, and audio online. Capture presentations, tutorials, or demonstrations with high-quality video recording."
        exampleCode="Configure recording settings → Start recording → Download video file"
        exampleOutput="High-quality WebM video files with screen capture and audio"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="w-full space-y-6">
        {/* Browser Support Check */}
        {!isSupported && (
          <Alert severity="error">
            Your browser doesn&apos;t support screen recording. Please use a
            modern browser like Chrome, Firefox, or Edge.
          </Alert>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Recording Configuration */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <ScreenShareIcon /> Recording Configuration
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeScreen}
                    onChange={(e) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeScreen: e.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<ScreenShareIcon />}
                    checkedIcon={<ScreenShareIcon />}
                  />
                }
                label="Screen Capture"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeCamera}
                    onChange={(e) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeCamera: e.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<VideocamIcon />}
                    checkedIcon={<VideocamIcon />}
                  />
                }
                label="Camera"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeMicrophone}
                    onChange={(e) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeMicrophone: e.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<MicIcon />}
                    checkedIcon={<MicIcon />}
                  />
                }
                label="Microphone"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeSystemAudio}
                    onChange={(e) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeSystemAudio: e.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<VolumeUpIcon />}
                    checkedIcon={<VolumeUpIcon />}
                  />
                }
                label="System Audio"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recording Status */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Recording Status
            </Typography>

            <div className="space-y-4">
              {/* State Display */}
              <div className="flex items-center justify-between">
                <Typography variant="body1">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {recordingState}
                  </span>
                </Typography>

                {(recordingState === RecordingState.RECORDING ||
                  recordingState === RecordingState.PAUSED) && (
                  <Typography variant="body1" className="font-mono text-lg">
                    {formatTime(recordingTime)}
                  </Typography>
                )}
              </div>

              {/* Progress Indicators */}
              {recordingState === RecordingState.PREPARING && (
                <Box>
                  <Typography variant="body2" className="mb-2">
                    Preparing recording streams...
                  </Typography>
                  <LinearProgress />
                </Box>
              )}

              {recordingState === RecordingState.STOPPING && (
                <Box>
                  <Typography variant="body2" className="mb-2">
                    Processing recording...
                  </Typography>
                  <LinearProgress />
                </Box>
              )}

              {recordingState === RecordingState.RECORDING && (
                <Box>
                  <Typography variant="body2" className="mb-2 text-red-600">
                    🔴 Recording in progress...
                  </Typography>
                  <LinearProgress color="secondary" />
                </Box>
              )}

              {recordingState === RecordingState.PAUSED && (
                <Typography variant="body2" className="text-orange-600">
                  ⏸️ Recording paused
                </Typography>
              )}

              {recordingState === RecordingState.COMPLETED && recordedBlob && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <Typography variant="body2" className="text-green-800">
                    ✅ Recording completed successfully!
                  </Typography>
                  <Typography variant="caption" className="text-green-600">
                    Size: {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB |
                    Duration: {formatTime(recordingTime)}
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              How to Use
            </Typography>
            <Typography variant="body2" className="text-gray-600 space-y-2">
              <div>1. Configure your recording settings above</div>
              <div>
                2. Click &quot;Start Recording&quot; and grant necessary
                permissions
              </div>
              <div>3. Select the screen/window to capture when prompted</div>
              <div>4. Use pause/resume controls as needed</div>
              <div>
                5. Click &quot;Stop&quot; when finished and download your
                recording
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
