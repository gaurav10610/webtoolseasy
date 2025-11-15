"use client";

import { set as idbSet, keys as idbKeys, get as idbGet } from "idb-keyval";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import MicIcon from "@mui/icons-material/Mic";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SelectWithLabel } from "../lib/select";

enum RecordingState {
  IDLE = "idle",
  RECORDING = "recording",
  PAUSED = "paused",
  COMPLETED = "completed",
}

interface AudioDevice {
  deviceId: string;
  label: string;
}

export default function AudioRecorder({
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
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  // Saved recordings tracked in IndexedDB - UI implementation pending
  // const [savedRecordings, setSavedRecordings] = useState<
  //   { key: string; blob: Blob }[]
  // >([]);
  const [error, setError] = useState<string>("");
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load saved recordings from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const allKeys = await idbKeys();
      // Load recordings into IndexedDB for persistence
      for (const key of allKeys) {
        if (String(key).startsWith("audio-recording-")) {
          const blob = await idbGet(key);
          if (blob instanceof Blob) {
            // Recording exists in IndexedDB
            console.log(`Loaded recording: ${key}`);
          }
        }
      }
    })();
  }, []);

  // Download a saved recording - UI implementation pending
  // const downloadSavedRecording = useCallback(
  //   (key: string, blob: Blob) => {
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `${key}.webm`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //     toolState.actions.showMessage("Recording downloaded successfully!");
  //   },
  //   [toolState.actions]
  // );

  // Delete a saved recording - UI implementation pending
  // const deleteSavedRecording = useCallback(
  //   async (key: string) => {
  //     await idbDel(key);
  //     setSavedRecordings((prev) => prev.filter((rec) => rec.key !== key));
  //     toolState.actions.showMessage("Recording deleted.");
  //   },
  //   [toolState.actions]
  // );

  // Get available audio devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = deviceList
          .filter((device) => device.kind === "audioinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
          }));

        setAudioDevices(audioInputs);
        if (audioInputs.length > 0 && !selectedDevice) {
          setSelectedDevice(audioInputs[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting devices:", err);
      }
    };

    getDevices();
  }, [selectedDevice]);

  // Format time
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

  // Start timer
  const startTimer = useCallback(() => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Setup audio visualization
  const setupAudioVisualization = useCallback((stream: MediaStream) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setAudioLevel((average / 255) * 100);
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
    } catch (err) {
      console.error("Error setting up audio visualization:", err);
    }
  }, []);

  // Cleanup audio visualization
  const cleanupAudioVisualization = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setAudioLevel(0);
  }, []);

  // Cleanup stream
  const cleanupStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    cleanupAudioVisualization();
  }, [cleanupAudioVisualization]);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setError("");
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
      });

      mediaStreamRef.current = stream;
      setupAudioVisualization(stream);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedBlob(blob);
        setRecordingState(RecordingState.COMPLETED);
        cleanupStream();
        stopTimer();
        // Save to IndexedDB for persistence
        const key = `audio-recording-${Date.now()}`;
        await idbSet(key, blob);
        console.log(`Saved recording to IndexedDB: ${key}`);
        toolState.actions.showMessage("Recording completed and saved!");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Recording failed. Please try again.");
        setRecordingState(RecordingState.IDLE);
        stopTimer();
        cleanupStream();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);

      setRecordingState(RecordingState.RECORDING);
      startTimer();
      toolState.actions.showMessage("Recording started!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to start recording";
      setError(errorMessage);
      setRecordingState(RecordingState.IDLE);
      cleanupStream();
    }
  }, [
    selectedDevice,
    setupAudioVisualization,
    startTimer,
    stopTimer,
    cleanupStream,
    toolState.actions,
  ]);

  // Pause recording
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

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === RecordingState.PAUSED) {
      mediaRecorderRef.current.resume();
      setRecordingState(RecordingState.RECORDING);
      startTimer();
      toolState.actions.showMessage("Recording resumed");
    }
  }, [recordingState, startTimer, toolState.actions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupStream();
      stopTimer();
      if (recordedBlob) {
        URL.revokeObjectURL(URL.createObjectURL(recordedBlob));
      }
    };
  }, [cleanupStream, stopTimer, recordedBlob]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      (recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED)
    ) {
      mediaRecorderRef.current.stop();
      cleanupStream();
    }
  }, [recordingState, cleanupStream]);

  // Download recording
  const downloadRecording = useCallback(() => {
    if (!recordedBlob) {
      toolState.actions.showMessage("No recording to download");
      return;
    }

    const url = URL.createObjectURL(recordedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audio-recording-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toolState.actions.showMessage("Recording downloaded successfully!");
  }, [recordedBlob, toolState.actions]);

  // Reset recording
  const resetRecording = useCallback(() => {
    cleanupStream();
    stopTimer();
    setRecordingState(RecordingState.IDLE);
    setRecordedBlob(null);
    setRecordingTime(0);
    setError("");
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  }, [cleanupStream, stopTimer]);

  // Check browser support
  const isSupported = useMemo(() => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupStream();
      stopTimer();
    };
  }, [cleanupStream, stopTimer]);

  // Create audio URL for playback
  useEffect(() => {
    if (recordedBlob && audioRef.current) {
      const url = URL.createObjectURL(recordedBlob);
      audioRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [recordedBlob]);

  // Button configuration
  const buttons = useMemo(() => {
    const commonButtons = createCommonButtons({});

    if (recordingState === RecordingState.IDLE) {
      return [
        {
          type: "custom" as const,
          text: "Start Recording",
          onClick: startRecording,
          icon: <MicIcon />,
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
          icon: <MicIcon />,
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
  ]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Audio Recorder"
        description="Record high-quality audio from your microphone. Perfect for voice memos, podcasts, interviews, and audio content creation."
        exampleCode="Select microphone → Start recording → Download audio"
        exampleOutput="High-quality WebM audio files with Opus codec"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Browser Support Check */}
        {!isSupported && (
          <Alert severity="error">
            Your browser doesn&apos;t support audio recording. Please use a
            modern browser like Chrome, Firefox, or Edge.
          </Alert>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Device Selection */}
        {recordingState === RecordingState.IDLE && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Microphone Settings
              </Typography>

              <SelectWithLabel
                selectLabel="Select Microphone"
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                options={audioDevices.map((device) => ({
                  key: device.deviceId,
                  value: device.deviceId,
                  label: device.label,
                }))}
              />
            </CardContent>
          </Card>
        )}

        {/* Recording Status */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Recording Status
            </Typography>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Typography variant="body1">
                  Status:{" "}
                  <span className="font-semibold">
                    {recordingState === RecordingState.IDLE && "Ready"}
                    {recordingState === RecordingState.RECORDING && (
                      <span className="text-red-600">Recording</span>
                    )}
                    {recordingState === RecordingState.PAUSED && (
                      <span className="text-yellow-600">Paused</span>
                    )}
                    {recordingState === RecordingState.COMPLETED && (
                      <span className="text-green-600">Completed</span>
                    )}
                  </span>
                </Typography>

                <Typography variant="h5" className="font-mono">
                  {formatTime(recordingTime)}
                </Typography>
              </div>

              {/* Audio Level Meter */}
              {(recordingState === RecordingState.RECORDING ||
                recordingState === RecordingState.PAUSED) && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Typography variant="body2">Audio Level</Typography>
                    <Typography variant="body2">
                      {Math.round(audioLevel)}%
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={audioLevel}
                    className="h-2 rounded"
                  />
                </div>
              )}

              {recordingState === RecordingState.COMPLETED && recordedBlob && (
                <div className="mt-4">
                  <Typography variant="body2" className="text-green-600 mb-2">
                    Recording complete! Size:{" "}
                    {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB |
                    Duration: {formatTime(recordingTime)}
                  </Typography>

                  <div className="mt-4">
                    <Typography variant="body2" className="mb-2">
                      Preview:
                    </Typography>
                    <audio ref={audioRef} controls className="w-full" />
                  </div>
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
            <div className="text-gray-600 space-y-2">
              <Typography variant="body2" component="div">
                1. Select your microphone from the dropdown
              </Typography>
              <Typography variant="body2" component="div">
                2. Click &quot;Start Recording&quot; and allow microphone access
              </Typography>
              <Typography variant="body2" component="div">
                3. Speak or play the audio you want to record
              </Typography>
              <Typography variant="body2" component="div">
                4. Monitor the audio level meter to ensure proper levels
              </Typography>
              <Typography variant="body2" component="div">
                5. Use pause/resume controls as needed
              </Typography>
              <Typography variant="body2" component="div">
                6. Click &quot;Stop&quot; when finished
              </Typography>
              <Typography variant="body2" component="div">
                7. Preview your recording and download it
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
