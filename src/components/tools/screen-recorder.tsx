"use client";

import { idbSet, idbGet, idbDel, idbKeys } from "@/util/nativeIdb";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Alert,
  Button,
  Chip,
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
import {
  createComposedRecordingStream,
  getDownloadExtensionFromMimeType,
  getPreferredRecordingMimeInfo,
  getRecommendedVideoBitrate,
  getVideoConstraintsForQuality,
  RecordingQuality,
} from "@/util/screenRecorderUtils";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SelectWithLabel } from "../lib/select";

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
  quality: RecordingQuality;
}

interface SavedRecording {
  key: string;
  blob: Blob;
}

export default function ScreenRecorder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const supportedMimeInfo = useMemo(() => getPreferredRecordingMimeInfo(), []);
  const [recordingState, setRecordingState] = useState<RecordingState>(
    RecordingState.IDLE,
  );
  const [recordingConfig, setRecordingConfig] = useState<RecordingConfig>({
    includeScreen: true,
    includeCamera: false,
    includeMicrophone: false,
    includeSystemAudio: false,
    quality: "1080p",
  });
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<SavedRecording[]>([]);
  const [recordingMimeType, setRecordingMimeType] = useState(
    supportedMimeInfo.mimeType,
  );
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamsRef = useRef<MediaStream[]>([]);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const compositionCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!recordedBlob) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(recordedBlob);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [recordedBlob]);

  const downloadBlob = useCallback(
    (blob: Blob, fileName: string, successMessage: string) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toolState.actions.showMessage(successMessage);
    },
    [toolState.actions],
  );

  const downloadSavedRecording = useCallback(
    (key: string, blob: Blob) => {
      const extension = getDownloadExtensionFromMimeType(blob.type);
      downloadBlob(
        blob,
        key.includes(".") ? key : `${key}.${extension}`,
        "Recording downloaded successfully!",
      );
    },
    [downloadBlob],
  );

  const deleteSavedRecording = useCallback(
    async (key: string) => {
      await idbDel(key);
      setSavedRecordings((prev) => prev.filter((rec) => rec.key !== key));
      toolState.actions.showMessage("Recording deleted.");
    },
    [toolState.actions],
  );

  useEffect(() => {
    (async () => {
      const allKeys = await idbKeys();
      const recordings: SavedRecording[] = [];

      for (const key of allKeys) {
        if (!String(key).startsWith("screen-recording-")) {
          continue;
        }

        const blob = await idbGet(key);
        if (blob instanceof Blob) {
          recordings.push({ key: String(key), blob });
        }
      }

      recordings.sort((first, second) => second.key.localeCompare(first.key));
      setSavedRecordings(recordings);
    })();
  }, []);

  const cleanupStreams = useCallback(() => {
    compositionCleanupRef.current?.();
    compositionCleanupRef.current = null;

    streamsRef.current.forEach((stream) => {
      stream.getTracks().forEach((track) => track.stop());
    });
    streamsRef.current = [];

    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
      previewVideoRef.current.srcObject = null;
    }
  }, []);

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

  const getScreenStream = useCallback(async (): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getDisplayMedia({
        video: getVideoConstraintsForQuality(recordingConfig.quality),
        audio: recordingConfig.includeSystemAudio,
      });
    } catch {
      throw new Error(
        "Failed to capture your screen. Please grant permission and try again.",
      );
    }
  }, [recordingConfig.includeSystemAudio, recordingConfig.quality]);

  const getUserMediaStream = useCallback(async (): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: recordingConfig.includeCamera
          ? getVideoConstraintsForQuality(recordingConfig.quality)
          : false,
        audio: recordingConfig.includeMicrophone,
      });
    } catch {
      throw new Error(
        "Failed to access camera or microphone. Please check permissions and try again.",
      );
    }
  }, [
    recordingConfig.includeCamera,
    recordingConfig.includeMicrophone,
    recordingConfig.quality,
  ]);

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

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      if (!recordingConfig.includeScreen && !recordingConfig.includeCamera) {
        throw new Error(
          "Select Screen Capture or Camera to create a video recording.",
        );
      }

      setRecordingState(RecordingState.PREPARING);
      setError("");
      setRecordedBlob(null);
      setPreviewUrl("");
      chunksRef.current = [];
      setRecordingTime(0);

      const screenStream = recordingConfig.includeScreen
        ? await getScreenStream()
        : undefined;
      const userMediaStream =
        recordingConfig.includeCamera || recordingConfig.includeMicrophone
          ? await getUserMediaStream()
          : undefined;

      const activeStreams = [screenStream, userMediaStream].filter(
        Boolean,
      ) as MediaStream[];
      streamsRef.current = activeStreams;

      activeStreams.forEach((stream) => {
        stream.getVideoTracks().forEach((track) => {
          track.addEventListener(
            "ended",
            () => {
              if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state !== "inactive"
              ) {
                setRecordingState(RecordingState.STOPPING);
                mediaRecorderRef.current.stop();
              }
            },
            { once: true },
          );
        });
      });

      const composedSession = await createComposedRecordingStream({
        screenStream,
        webcamStream: userMediaStream,
        includeSystemAudio: recordingConfig.includeSystemAudio,
        includeMicrophoneAudio: recordingConfig.includeMicrophone,
        frameRate: 30,
      });

      compositionCleanupRef.current = composedSession.cleanup;

      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = composedSession.stream;
        previewVideoRef.current.muted = true;
        await previewVideoRef.current.play().catch(() => undefined);
      }

      const mimeInfo = getPreferredRecordingMimeInfo();
      setRecordingMimeType(mimeInfo.mimeType);

      const mediaRecorder = new MediaRecorder(composedSession.stream, {
        mimeType: mimeInfo.mimeType,
        videoBitsPerSecond: getRecommendedVideoBitrate(recordingConfig.quality),
        ...(recordingConfig.includeMicrophone ||
        recordingConfig.includeSystemAudio
          ? { audioBitsPerSecond: 192_000 }
          : {}),
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onpause = () => {
        try {
          mediaRecorder.requestData();
        } catch {
          // Ignore requestData issues for browsers that flush only on stop.
        }
      };

      mediaRecorder.onstop = async () => {
        const finalMimeType = mediaRecorder.mimeType || mimeInfo.mimeType;
        const blob = new Blob(chunksRef.current, { type: finalMimeType });
        const extension = getDownloadExtensionFromMimeType(finalMimeType);
        const key = `screen-recording-${Date.now()}.${extension}`;

        setRecordingMimeType(finalMimeType);
        setRecordedBlob(blob);
        setRecordingState(RecordingState.COMPLETED);
        cleanupStreams();
        stopTimer();

        await idbSet(key, blob);
        setSavedRecordings((prev) => [{ key, blob }, ...prev]);
        toolState.actions.showMessage("Recording completed and saved.");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Recording failed. Please try again.");
        setRecordingState(RecordingState.IDLE);
        cleanupStreams();
        stopTimer();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecordingState(RecordingState.RECORDING);
      startTimer(true);
      toolState.actions.showMessage(
        `Recording started in ${recordingConfig.quality} (${mimeInfo.extension.toUpperCase()}).`,
      );
    } catch (startError) {
      console.error("Failed to start recording:", startError);
      setError(
        startError instanceof Error
          ? startError.message
          : "Failed to start recording.",
      );
      setRecordingState(RecordingState.IDLE);
      cleanupStreams();
      stopTimer();
    }
  }, [
    cleanupStreams,
    getScreenStream,
    getUserMediaStream,
    recordingConfig,
    startTimer,
    stopTimer,
    toolState.actions,
  ]);

  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      recordingState === RecordingState.RECORDING
    ) {
      try {
        mediaRecorderRef.current.requestData();
      } catch {
        // Safe no-op when the browser does not support flushing mid-recording.
      }
      mediaRecorderRef.current.pause();
      setRecordingState(RecordingState.PAUSED);
      stopTimer();
      toolState.actions.showMessage("Recording paused.");
    }
  }, [recordingState, stopTimer, toolState.actions]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === RecordingState.PAUSED) {
      mediaRecorderRef.current.resume();
      setRecordingState(RecordingState.RECORDING);
      startTimer();
      toolState.actions.showMessage("Recording resumed.");
    }
  }, [recordingState, startTimer, toolState.actions]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      (recordingState === RecordingState.RECORDING ||
        recordingState === RecordingState.PAUSED)
    ) {
      setRecordingState(RecordingState.STOPPING);
      try {
        mediaRecorderRef.current.requestData();
      } catch {
        // Ignore flush issues and continue stopping.
      }
      mediaRecorderRef.current.stop();
    }
  }, [recordingState]);

  const downloadRecording = useCallback(() => {
    if (!recordedBlob) {
      toolState.actions.showMessage("No recording is ready to download yet.");
      return;
    }

    const extension = getDownloadExtensionFromMimeType(
      recordingMimeType || recordedBlob.type,
    );

    downloadBlob(
      recordedBlob,
      `screen-recording-${Date.now()}.${extension}`,
      "Recording downloaded successfully!",
    );
  }, [downloadBlob, recordedBlob, recordingMimeType, toolState.actions]);

  const resetRecording = useCallback(() => {
    cleanupStreams();
    stopTimer();
    setRecordingState(RecordingState.IDLE);
    setRecordedBlob(null);
    setRecordingTime(0);
    setError("");
    mediaRecorderRef.current = null;
  }, [cleanupStreams, stopTimer]);

  useEffect(() => {
    return () => {
      cleanupStreams();
      stopTimer();
    };
  }, [cleanupStreams, stopTimer]);

  const isSupported = useMemo(() => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
  }, []);

  const buttons = useMemo(() => {
    const commonButtons = createCommonButtons({});

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
        title="Screen Recorder"
        description="Record your screen, camera, and audio online. Capture presentations, tutorials, demos, or walkthroughs with a native in-browser recording pipeline."
        exampleCode="Configure sources → Start recording → Pause/resume as needed → Download video"
        exampleOutput="Single-track WebM/MP4 recording with camera overlay and synchronized audio"
      />

      <ToolControls buttons={buttons} />

      <div className="w-full space-y-6">
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
                    className="flex flex-wrap items-center gap-2 rounded bg-gray-50 p-2"
                  >
                    <span className="flex-1 truncate text-sm">{rec.key}</span>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => downloadSavedRecording(rec.key, rec.blob)}
                    >
                      <DownloadIcon fontSize="small" /> Download
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => deleteSavedRecording(rec.key)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!isSupported && (
          <Alert severity="error">
            Your browser doesn&apos;t support screen recording. Please use a
            modern browser like Chrome, Edge, Firefox, or Safari 14.1+.
          </Alert>
        )}

        <Alert severity="info">
          Privacy-first recording: screen, camera, and audio are composited and
          exported entirely in your browser using native Canvas and Web Audio
          APIs. Nothing is uploaded to a server.
        </Alert>

        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              Recording Configuration
            </Typography>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeScreen}
                    onChange={(event) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeScreen: event.target.checked,
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
                    onChange={(event) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeCamera: event.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<VideocamIcon />}
                    checkedIcon={<VideocamIcon />}
                  />
                }
                label="Camera Picture-in-Picture"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={recordingConfig.includeMicrophone}
                    onChange={(event) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeMicrophone: event.target.checked,
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
                    onChange={(event) =>
                      setRecordingConfig((prev) => ({
                        ...prev,
                        includeSystemAudio: event.target.checked,
                      }))
                    }
                    disabled={recordingState !== RecordingState.IDLE}
                    icon={<VolumeUpIcon />}
                    checkedIcon={<VolumeUpIcon />}
                  />
                }
                label="System Audio"
              />

              <SelectWithLabel
                selectLabel="Quality Preset"
                value={recordingConfig.quality}
                onChange={(event) =>
                  setRecordingConfig((prev) => ({
                    ...prev,
                    quality: event.target.value as RecordingQuality,
                  }))
                }
                options={[
                  { key: "720p", value: "720p", label: "720p — smaller file" },
                  {
                    key: "1080p",
                    value: "1080p",
                    label: "1080p — best balance",
                  },
                  {
                    key: "1440p",
                    value: "1440p",
                    label: "1440p — maximum detail",
                  },
                ]}
                className="md:max-w-sm"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip label={`${recordingConfig.quality} preset`} size="small" />
              <Chip
                label={`${supportedMimeInfo.extension.toUpperCase()} export`}
                size="small"
                color="primary"
                variant="outlined"
              />
              {recordingConfig.includeCamera && (
                <Chip label="Camera PiP overlay" size="small" />
              )}
              {(recordingConfig.includeSystemAudio ||
                recordingConfig.includeMicrophone) && (
                <Chip label="Mixed audio track" size="small" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Live Preview & Output
            </Typography>

            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-950">
              <video
                ref={previewVideoRef}
                src={
                  recordingState === RecordingState.COMPLETED
                    ? previewUrl
                    : undefined
                }
                autoPlay={recordingState !== RecordingState.COMPLETED}
                controls={recordingState === RecordingState.COMPLETED}
                muted={recordingState !== RecordingState.COMPLETED}
                playsInline
                className="h-full w-full object-contain"
              />

              {recordingState === RecordingState.IDLE && !previewUrl && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white/85">
                  <Typography variant="h6">Ready to record</Typography>
                  <Typography variant="body2">
                    Start a capture to preview your screen, camera overlay, and
                    final in-browser output before download.
                  </Typography>
                </div>
              )}

              {(recordingState === RecordingState.RECORDING ||
                recordingState === RecordingState.PAUSED) && (
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-white shadow-lg">
                  <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
                  <Typography variant="body2" className="font-mono">
                    {formatTime(recordingTime)}
                  </Typography>
                </div>
              )}
            </div>

            {recordingState === RecordingState.COMPLETED && recordedBlob && (
              <div className="mt-4 rounded-lg bg-green-50 p-4">
                <Typography
                  variant="body2"
                  component="div"
                  className="text-green-800"
                >
                  ✅ Recording completed successfully with a single composed
                  video track for smoother seeking and playback.
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                  className="text-green-700"
                >
                  Size: {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB |
                  Duration: {formatTime(recordingTime)} | Format:{" "}
                  {getDownloadExtensionFromMimeType(
                    recordingMimeType,
                  ).toUpperCase()}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Recording Status
            </Typography>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
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

              {recordingState === RecordingState.PREPARING && (
                <Box>
                  <Typography variant="body2" className="mb-2">
                    Preparing your native browser recording pipeline...
                  </Typography>
                  <LinearProgress />
                </Box>
              )}

              {recordingState === RecordingState.STOPPING && (
                <Box>
                  <Typography variant="body2" className="mb-2">
                    Finalizing recording and writing the download file...
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
                  ⏸️ Recording paused — resume whenever you&apos;re ready.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              How to Use
            </Typography>
            <div className="space-y-2 text-gray-600">
              <Typography variant="body2" component="div">
                1. Choose whether to capture your screen, camera, microphone,
                and/or system audio.
              </Typography>
              <Typography variant="body2" component="div">
                2. Pick a quality preset based on whether you want smaller files
                or maximum detail.
              </Typography>
              <Typography variant="body2" component="div">
                3. Click &quot;Start Recording&quot; and grant the browser
                permissions when prompted.
              </Typography>
              <Typography variant="body2" component="div">
                4. Pause and resume as needed — the timer now keeps the true
                elapsed duration.
              </Typography>
              <Typography variant="body2" component="div">
                5. Stop the recording, preview the result, and download the
                finished file locally.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
