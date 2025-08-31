/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import {
  Videocam,
  Mic,
  VolumeUp,
  BatteryFull,
  Memory,
  CheckCircle,
  Cancel,
  HelpOutline,
  RadioButtonChecked,
} from "@mui/icons-material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

type Status = "default" | "success" | "error" | "running";

function StatusIcon({ status }: { status: Status }) {
  switch (status) {
    case "success":
      return <CheckCircle color="success" />;
    case "error":
      return <Cancel color="error" />;
    case "running":
      return <RadioButtonChecked color="primary" />;
    default:
      return <HelpOutline color="disabled" />;
  }
}

function TestCard({
  title,
  status,
  children,
}: {
  title: string;
  status: Status;
  children: ReactNode;
}) {
  return (
    <Paper elevation={2} className="p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="flex items-center gap-2">
          <StatusIcon status={status} />
          {title}
        </Typography>
      </div>
      {children}
    </Paper>
  );
}

export default function TestHardware({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [cameraStatus, setCameraStatus] = useState<Status>("default");
  const [micStatus, setMicStatus] = useState<Status>("default");
  const [speakerStatus, setSpeakerStatus] = useState<Status>("default");

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [selectedMicId, setSelectedMicId] = useState<string>("");
  const [batteryInfo, setBatteryInfo] = useState<{
    level?: number;
    charging?: boolean;
  } | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [gpuInfo, setGpuInfo] = useState<string | null>(null);

  const stopMic = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setMicStatus("default");
    setAudioLevel(0);
  }, []);

  const startCamera = useCallback(async () => {
    stopMic();
    setCameraStatus("running");
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedCameraId
          ? { deviceId: { exact: selectedCameraId } }
          : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraStatus("success");
      toolState.actions.showMessage("Camera started successfully.");
    } catch (err) {
      setCameraStatus("error");
      toolState.actions.showMessage(
        "Failed to start camera. Check permissions."
      );
    }
  }, [toolState, selectedCameraId, stopMic]);

  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraStatus("default");
  }, []);

  const startMic = useCallback(async () => {
    stopCamera();
    setMicStatus("running");
    try {
      const constraints: MediaStreamConstraints = {
        audio: selectedMicId ? { deviceId: { exact: selectedMicId } } : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      const context = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)();
      audioContextRef.current = context;
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicStatus("success");
      toolState.actions.showMessage("Mic started successfully.");
    } catch (err) {
      setMicStatus("error");
      toolState.actions.showMessage("Failed to start mic. Check permissions.");
    }
  }, [toolState, selectedMicId, stopCamera]);

  const playTestTone = useCallback(() => {
    setSpeakerStatus("running");
    try {
      const context = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(440, context.currentTime);
      oscillator.connect(gain);
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.1, context.currentTime);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        context.close();
        setSpeakerStatus("success");
      }, 500);
    } catch {
      setSpeakerStatus("error");
      toolState.actions.showMessage("Could not play test tone.");
    }
  }, [toolState]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      } catch (err) {
        // Ignore permission errors, but needed to get device labels
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices);
      if (!selectedCameraId && devices.some((d) => d.kind === "videoinput")) {
        setSelectedCameraId(
          devices.find((d) => d.kind === "videoinput")!.deviceId
        );
      }
      if (!selectedMicId && devices.some((d) => d.kind === "audioinput")) {
        setSelectedMicId(
          devices.find((d) => d.kind === "audioinput")!.deviceId
        );
      }
    };
    getDevices();
  }, []);

  useEffect(() => {
    const getBattery = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bm = await (navigator as any).getBattery();
        setBatteryInfo({ level: bm.level, charging: bm.charging });
        bm.onlevelchange = () =>
          setBatteryInfo({ level: bm.level, charging: bm.charging });
        bm.onchargingchange = () =>
          setBatteryInfo({ level: bm.level, charging: bm.charging });
      } catch {
        setBatteryInfo(null);
      }
    };
    getBattery();
  }, []);

  useEffect(() => {
    const getGpuInfo = () => {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl && "getExtension" in gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        setGpuInfo(
          debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "N/A"
        );
      } else {
        setGpuInfo(null);
      }
    };
    getGpuInfo();
  }, []);

  useEffect(() => {
    let animFrameId: number;
    const updateAudioLevel = () => {
      if (analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const level =
          data.reduce((sum, val) => sum + val, 0) / data.length / 255;
        setAudioLevel(level);
      }
      animFrameId = requestAnimationFrame(updateAudioLevel);
    };
    updateAudioLevel();
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  const buttons = createCommonButtons({
    onShareLink: () => toolState.actions.copyShareableLink(""),
    onFullScreen: toolState.toggleFullScreen,
  });

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
        title="Hardware Tester"
        description="Test your camera, microphone, speakers, and other device hardware directly in your browser."
        exampleCode={""}
        exampleOutput={""}
      />
      <div className="mt-6 grid grid-cols-1 gap-6">
        <TestCard title="Camera Test" status={cameraStatus}>
          <div className="flex flex-col gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Camera</InputLabel>
              <Select
                value={selectedCameraId}
                label="Camera"
                onChange={(e: SelectChangeEvent<string>) =>
                  setSelectedCameraId(e.target.value)
                }
              >
                {devices
                  .filter((d) => d.kind === "videoinput")
                  .map((d) => (
                    <MenuItem key={d.deviceId} value={d.deviceId}>
                      {d.label || `Camera ${d.deviceId.substring(0, 6)}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-md bg-gray-100 border"
              style={{ display: cameraStatus !== "default" ? "block" : "none" }}
            />
            <div className="flex gap-2">
              <Button
                variant="contained"
                onClick={cameraStatus === "default" ? startCamera : stopCamera}
                startIcon={<Videocam />}
              >
                {cameraStatus === "default" ? "Start Camera" : "Stop Camera"}
              </Button>
            </div>
          </div>
        </TestCard>

        <TestCard title="Microphone Test" status={micStatus}>
          <div className="flex flex-col gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Microphone</InputLabel>
              <Select
                value={selectedMicId}
                label="Microphone"
                onChange={(e: SelectChangeEvent<string>) =>
                  setSelectedMicId(e.target.value)
                }
              >
                {devices
                  .filter((d) => d.kind === "audioinput")
                  .map((d) => (
                    <MenuItem key={d.deviceId} value={d.deviceId}>
                      {d.label || `Mic ${d.deviceId.substring(0, 6)}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${audioLevel * 100}%` }}
                />
              </div>
              <Typography variant="caption">
                {Math.round(audioLevel * 100)}%
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                variant="contained"
                onClick={micStatus === "default" ? startMic : stopMic}
                startIcon={<Mic />}
              >
                {micStatus === "default" ? "Start Mic" : "Stop Mic"}
              </Button>
            </div>
          </div>
        </TestCard>

        <TestCard title="Speaker Test" status={speakerStatus}>
          <Button
            variant="contained"
            onClick={playTestTone}
            startIcon={<VolumeUp />}
          >
            Play Test Tone
          </Button>
        </TestCard>

        <TestCard
          title="System Info"
          status={batteryInfo || gpuInfo ? "success" : "default"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {batteryInfo && (
              <div className="flex items-center gap-2">
                <BatteryFull />
                <span>
                  Battery: {Math.round(batteryInfo.level! * 100)}%
                  {batteryInfo.charging ? " (Charging)" : ""}
                </span>
              </div>
            )}
            {gpuInfo && (
              <div className="flex items-center gap-2">
                <Memory />
                <span>GPU: {gpuInfo}</span>
              </div>
            )}
          </div>
        </TestCard>
      </div>
    </ToolLayout>
  );
}
