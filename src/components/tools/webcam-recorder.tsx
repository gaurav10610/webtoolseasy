"use client";

import { set as idbSet, get as idbGet, keys as idbKeys } from "idb-keyval";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Typography, Card, CardContent, Alert } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import VideocamIcon from "@mui/icons-material/Videocam";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SelectWithLabel } from "../lib/select";

enum RecordingState {
  IDLE = "idle",
  PREPARING = "preparing",
  RECORDING = "recording",
  PAUSED = "paused",
  COMPLETED = "completed",
}

interface DeviceInfo {
  deviceId: string;
  label: string;
}

export default function WebcamRecorder({
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
  const [devices, setDevices] = useState<{
    videoDevices: DeviceInfo[];
    audioDevices: DeviceInfo[];
  }>({
    videoDevices: [],
    audioDevices: [],
  });
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [videoQuality, setVideoQuality] = useState<string>("720p");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved recordings from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const allKeys = await idbKeys();
      // Load recordings into IndexedDB for persistence
      for (const key of allKeys) {
        if (String(key).startsWith("webcam-recording-")) {
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

  // Get available devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = deviceList
          .filter((device) => device.kind === "videoinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 5)}`,
          }));
        const audioDevices = deviceList
          .filter((device) => device.kind === "audioinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
          }));

        setDevices({ videoDevices, audioDevices });

        if (videoDevices.length > 0 && !selectedVideoDevice) {
          setSelectedVideoDevice(videoDevices[0].deviceId);
        }
        if (audioDevices.length > 0 && !selectedAudioDevice) {
          setSelectedAudioDevice(audioDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting devices:", err);
      }
    };

    getDevices();
  }, [selectedVideoDevice, selectedAudioDevice]);

  // Format time
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Get video constraints based on quality
  const getVideoConstraints = useCallback(() => {
    const constraints: Record<
      string,
      { width: { ideal: number }; height: { ideal: number } }
    > = {
      "480p": { width: { ideal: 640 }, height: { ideal: 480 } },
      "720p": { width: { ideal: 1280 }, height: { ideal: 720 } },
      "1080p": { width: { ideal: 1920 }, height: { ideal: 1080 } },
    };
    return constraints[videoQuality];
  }, [videoQuality]);

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

  // Cleanup stream
  const cleanupStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Start preview
  const startPreview = useCallback(async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: selectedVideoDevice
          ? {
              deviceId: { exact: selectedVideoDevice },
              ...getVideoConstraints(),
            }
          : getVideoConstraints(),
        audio: selectedAudioDevice
          ? { deviceId: { exact: selectedAudioDevice } }
          : true,
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setRecordingState(RecordingState.PREPARING);
      toolState.actions.showMessage("Camera preview started");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to access camera";
      setError(errorMessage);
      toolState.actions.showMessage("Failed to start preview");
    }
  }, [
    selectedVideoDevice,
    selectedAudioDevice,
    getVideoConstraints,
    toolState.actions,
  ]);

  // Stop preview
  const stopPreview = useCallback(() => {
    cleanupStream();
    setRecordingState(RecordingState.IDLE);
    toolState.actions.showMessage("Preview stopped");
  }, [cleanupStream, toolState.actions]);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setRecordingState(RecordingState.PREPARING);
      setError("");
      chunksRef.current = [];

      if (!mediaStreamRef.current) {
        await startPreview();
      }

      if (!mediaStreamRef.current) {
        throw new Error("Failed to initialize media stream");
      }

      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: "video/webm;codecs=vp9",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        setRecordingState(RecordingState.COMPLETED);
        cleanupStream();
        stopTimer();
        // Save to IndexedDB for persistence
        const key = `webcam-recording-${Date.now()}`;
        await idbSet(key, blob);
        console.log(`Saved recording to IndexedDB: ${key}`);
        toolState.actions.showMessage("Recording completed and saved!");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Recording failed. Please try again.");
        setRecordingState(RecordingState.IDLE);
        cleanupStream();
        stopTimer();
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
  }, [startPreview, startTimer, stopTimer, cleanupStream, toolState.actions]);

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

  // Stop recording
  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      (recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED)
    ) {
      mediaRecorderRef.current.stop();
    }
  }, [recordingState]);

  // Download recording
  const downloadRecording = useCallback(() => {
    if (!recordedBlob) {
      toolState.actions.showMessage("No recording to download");
      return;
    }

    const url = URL.createObjectURL(recordedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `webcam-recording-${Date.now()}.webm`;
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
  }, [cleanupStream, stopTimer]);

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

  // Button configuration
  const buttons = useMemo(() => {
    const commonButtons = createCommonButtons({});

    if (recordingState === RecordingState.IDLE) {
      return [
        {
          type: "custom" as const,
          text: "Start Preview",
          onClick: startPreview,
          icon: <VideocamIcon />,
          disabled: !isSupported,
        },
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

    if (recordingState === RecordingState.PREPARING) {
      return [
        {
          type: "custom" as const,
          text: "Start Recording",
          onClick: startRecording,
          icon: <PlayArrowIcon />,
        },
        {
          type: "custom" as const,
          text: "Stop Preview",
          onClick: stopPreview,
          icon: <StopIcon />,
          color: "error" as const,
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
          color: "error" as const,
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
          color: "error" as const,
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
    startPreview,
    stopPreview,
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
        title="Webcam Recorder"
        description="Record high-quality video and audio from your webcam. Perfect for creating video messages, vlogs, and video content."
        exampleCode="Select camera → Start recording → Download video"
        exampleOutput="High-quality WebM video files with webcam footage and audio"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Browser Support Check */}
        {!isSupported && (
          <Alert severity="error">
            Your browser doesn&apos;t support webcam recording. Please use a
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
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Camera Settings
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectWithLabel
                selectLabel="Camera"
                value={selectedVideoDevice}
                onChange={(e) => setSelectedVideoDevice(e.target.value)}
                options={devices.videoDevices.map((device) => ({
                  key: device.deviceId,
                  value: device.deviceId,
                  label: device.label,
                }))}
              />

              <SelectWithLabel
                selectLabel="Microphone"
                value={selectedAudioDevice}
                onChange={(e) => setSelectedAudioDevice(e.target.value)}
                options={devices.audioDevices.map((device) => ({
                  key: device.deviceId,
                  value: device.deviceId,
                  label: device.label,
                }))}
              />

              <SelectWithLabel
                selectLabel="Video Quality"
                value={videoQuality}
                onChange={(e) => setVideoQuality(e.target.value)}
                options={[
                  { key: "480p", value: "480p", label: "480p (SD)" },
                  { key: "720p", value: "720p", label: "720p (HD)" },
                  { key: "1080p", value: "1080p", label: "1080p (Full HD)" },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Preview */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Camera Preview
            </Typography>

            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain"
              />
              {recordingState === RecordingState.IDLE && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Typography variant="body1" className="text-white">
                    Click &quot;Start Preview&quot; to see your camera
                  </Typography>
                </div>
              )}
              {(recordingState === RecordingState.RECORDING ||
                recordingState === RecordingState.PAUSED) && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <Typography variant="body2">
                    {formatTime(recordingTime)}
                  </Typography>
                </div>
              )}
            </div>

            {recordingState === RecordingState.COMPLETED && recordedBlob && (
              <div className="mt-4">
                <Typography variant="body2" className="text-green-600">
                  Recording complete! Size:{" "}
                  {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB |
                  Duration: {formatTime(recordingTime)}
                </Typography>
              </div>
            )}
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
                1. Select your camera and microphone from the dropdowns
              </Typography>
              <Typography variant="body2" component="div">
                2. Choose your preferred video quality
              </Typography>
              <Typography variant="body2" component="div">
                3. Click &quot;Start Preview&quot; to see your camera feed
              </Typography>
              <Typography variant="body2" component="div">
                4. Click &quot;Start Recording&quot; when ready
              </Typography>
              <Typography variant="body2" component="div">
                5. Use pause/resume controls as needed
              </Typography>
              <Typography variant="body2" component="div">
                6. Click &quot;Stop&quot; when finished and download your video
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
