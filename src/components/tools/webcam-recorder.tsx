"use client";

import { idbSet, idbGet, idbDel, idbKeys } from "@/util/nativeIdb";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VideocamIcon from "@mui/icons-material/Videocam";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import {
  getDownloadExtensionFromMimeType,
  getPreferredRecordingMimeInfo,
} from "@/util/screenRecorderUtils";
import { ToolLayout } from "../common/ToolLayout";
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

interface SavedRecording {
  key: string;
  blob: Blob;
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
    RecordingState.IDLE,
  );
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingMimeType, setRecordingMimeType] = useState("");
  const [savedRecordings, setSavedRecordings] = useState<SavedRecording[]>([]);
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
  const [videoFilter, setVideoFilter] = useState<string>("none");
  const [mirrorVideo, setMirrorVideo] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved recordings from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const allKeys = await idbKeys();
      const recordings: SavedRecording[] = [];

      for (const key of allKeys) {
        if (!key.startsWith("webcam-recording-")) continue;
        const blob = await idbGet(key);
        if (blob instanceof Blob) {
          recordings.push({ key, blob });
        }
      }

      recordings.sort((a, b) => b.key.localeCompare(a.key));
      setSavedRecordings(recordings);
    })();
  }, []);

  const downloadSavedRecording = useCallback(
    (key: string, blob: Blob) => {
      const ext = getDownloadExtensionFromMimeType(blob.type);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = key.includes(".") ? key : `${key}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toolState.actions.showMessage("Recording downloaded!");
    },
    [toolState.actions],
  );

  const deleteSavedRecording = useCallback(
    async (key: string) => {
      await idbDel(key);
      setSavedRecordings((prev) => prev.filter((r) => r.key !== key));
      toolState.actions.showMessage("Recording deleted.");
    },
    [toolState.actions],
  );

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
  const startTimer = useCallback((reset = false) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (reset) {
      setRecordingTime(0);
    }

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

      const mimeInfo = getPreferredRecordingMimeInfo();
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, {
        mimeType: mimeInfo.mimeType,
        videoBitsPerSecond: videoQuality === "1080p" ? 8_000_000 : 4_000_000,
        audioBitsPerSecond: 192_000,
      });
      setRecordingMimeType(mimeInfo.mimeType);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onpause = () => {
        try {
          mediaRecorder.requestData();
        } catch {
          // Ignore browsers that only flush on stop.
        }
      };

      mediaRecorder.onstop = async () => {
        const finalMimeType = mediaRecorder.mimeType || mimeInfo.mimeType;
        const blob = new Blob(chunksRef.current, { type: finalMimeType });
        setRecordedBlob(blob);
        setRecordingMimeType(finalMimeType);
        setRecordingState(RecordingState.COMPLETED);
        cleanupStream();
        stopTimer();
        // Save to IndexedDB for persistence
        const extension = getDownloadExtensionFromMimeType(finalMimeType);
        const key = `webcam-recording-${Date.now()}.${extension}`;
        await idbSet(key, blob);
        setSavedRecordings((prev) => [{ key, blob }, ...prev]);
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
      mediaRecorder.start();

      setRecordingState(RecordingState.RECORDING);
      startTimer(true);
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
      try {
        mediaRecorderRef.current.requestData();
      } catch {
        // Ignore requestData issues and continue pausing.
      }
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

    const extension = getDownloadExtensionFromMimeType(
      recordingMimeType || recordedBlob.type,
    );
    const url = URL.createObjectURL(recordedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `webcam-recording-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toolState.actions.showMessage("Recording downloaded successfully!");
  }, [recordedBlob, recordingMimeType, toolState.actions]);

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

              <div>
                <Typography variant="body2" className="mb-1 font-medium">
                  Camera Filter
                </Typography>
                <ToggleButtonGroup
                  value={videoFilter}
                  exclusive
                  onChange={(_, v) => {
                    if (v !== null) setVideoFilter(v);
                  }}
                  size="small"
                  className="flex-wrap"
                >
                  <ToggleButton value="none">None</ToggleButton>
                  <ToggleButton value="grayscale(1)">Grayscale</ToggleButton>
                  <ToggleButton value="sepia(1)">Sepia</ToggleButton>
                  <ToggleButton value="invert(1)">Invert</ToggleButton>
                  <ToggleButton value="hue-rotate(180deg)">
                    Hue Shift
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div>
                <Typography variant="body2" className="mb-1 font-medium">
                  Mirror
                </Typography>
                <ToggleButtonGroup
                  value={mirrorVideo ? "mirror" : "none"}
                  exclusive
                  onChange={(_, v) => setMirrorVideo(v === "mirror")}
                  size="small"
                >
                  <ToggleButton value="none">Normal</ToggleButton>
                  <ToggleButton value="mirror">Mirror</ToggleButton>
                </ToggleButtonGroup>
              </div>
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
                style={{
                  filter: videoFilter !== "none" ? videoFilter : undefined,
                  transform: mirrorVideo ? "scaleX(-1)" : undefined,
                }}
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

        {/* Saved Recordings */}
        {savedRecordings.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Saved Recordings
              </Typography>
              <div className="space-y-2">
                {savedRecordings.map((rec) => (
                  <div
                    key={rec.key}
                    className="flex flex-wrap items-center gap-2 rounded bg-gray-50 dark:bg-gray-800 p-2"
                  >
                    <span className="flex-1 truncate text-sm">{rec.key}</span>
                    <Chip
                      label={`${(rec.blob.size / (1024 * 1024)).toFixed(1)} MB`}
                      size="small"
                      variant="outlined"
                    />
                    <Tooltip title="Download">
                      <IconButton
                        size="small"
                        onClick={() =>
                          downloadSavedRecording(rec.key, rec.blob)
                        }
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteSavedRecording(rec.key)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
