"use client";

import { ButtonWithHandler } from "../lib/buttons";
import { CustomSvgIcon } from "../lib/icons";
import MonitorIcon from "@/data/icons/monitor.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { CheckBoxWithLabel } from "../lib/checkboxes";
import PauseIcon from "@mui/icons-material/Pause";
import { CircularProgress, Typography } from "@mui/material";

enum RecordingState {
  NOT_RECORDING,
  RECORDING,
  PAUSED,
  PREPARING_RECORDING,
}

export default function ScreenRecorder() {
  const [recordingState, setRecordingState] = useState(
    RecordingState.NOT_RECORDING
  );
  const [includeMicrophoneAudio, setIncludeMicrophoneAudio] = useState(false);
  const [includeSystemAudio, setIncludeSystemAudio] = useState(false);
  const [includeCameraVideo, setIncludeCameraVideo] = useState(false);

  const startRecording = () => {
    setRecordingState(RecordingState.RECORDING);
  };

  const stopRecording = () => {
    setRecordingState(RecordingState.PREPARING_RECORDING);
  };

  const PreparingRecording = () => {
    return (
      <div className="flex flex-row gap-3 items-center">
        <CircularProgress color="primary" size={40} />
        <Typography variant="body1" color="secondary">
          Preparing recording...
        </Typography>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <CustomSvgIcon sx={{ fontSize: "10rem" }}>
        <MonitorIcon />
      </CustomSvgIcon>
      <div className="flex flex-col gap-2 md:flex-row md:justify-center">
        <CheckBoxWithLabel
          label="Include Microphone Audio"
          value={includeMicrophoneAudio}
          onChange={setIncludeMicrophoneAudio}
          color="textPrimary"
        />
        <CheckBoxWithLabel
          label="Include System Audio"
          value={includeSystemAudio}
          onChange={setIncludeSystemAudio}
          color="textPrimary"
        />
        <CheckBoxWithLabel
          label="Include Camera Video"
          value={includeCameraVideo}
          onChange={setIncludeCameraVideo}
          color="textPrimary"
        />
      </div>
      {recordingState === RecordingState.NOT_RECORDING && (
        <ButtonWithHandler
          onClick={startRecording}
          buttonText="Start Recording"
          variant="outlined"
          startIcon={<PlayArrowIcon />}
        />
      )}
      {recordingState === RecordingState.RECORDING && (
        <ButtonWithHandler
          onClick={stopRecording}
          buttonText="Stop Recording"
          startIcon={<PauseIcon />}
          color="error"
        />
      )}
      {recordingState === RecordingState.PREPARING_RECORDING && (
        <PreparingRecording />
      )}
    </div>
  );
}
