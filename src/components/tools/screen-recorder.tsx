"use client";

import { ButtonWithHandler } from "@/components/lib/buttons";
import { CustomSvgIcon } from "@/components/lib/icons";
import MonitorIcon from "@/data/icons/monitor.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import { CircularProgress, Typography } from "@mui/material";
import { VideoStreamMerger } from "video-stream-merger";
import { CheckBoxWithLabel } from "@/components/lib/checkBoxes";
import { clear, get, set } from "idb-keyval";
import { SnackBarWithPosition } from "../lib/snackBar";
import {
  configureStreamRecorder,
  getCameraAndMicrophoneStream,
  getScreenStream,
  mergeMediaStreams,
} from "@/util/screenRecorderUtils";

enum RecordingState {
  NOT_RECORDING,
  RECORDING,
  PAUSED,
  PROCESSING_RECORDING,
}

export default function ScreenRecorder() {
  const cameraVideoOptions: Record<string, number> = {
    width: 150,
    height: 150,
  };

  const mediaRecoderOptionsConfig: Record<string, MediaRecorderOptions> = {
    webm: {
      mimeType: "video/webm; codecs=vp9",
    },
    mp4: {
      mimeType: "video/mp4",
    },
  };

  const RECORDING_START_DELAY_MS = 5000;
  const RECORDER_TIME_SLICE_MS = 100;

  let videoChunksIds: number[] = [];

  const [isSupported, setIsSupported] = useState(true);
  const [recordedVideoExtension, setRecordedVideoExtension] = useState("webm");

  const [recordingState, setRecordingState] = useState(
    RecordingState.NOT_RECORDING
  );
  const [includeMicrophoneAudio, setIncludeMicrophoneAudio] = useState(false);
  const [includeSystemAudio, setIncludeSystemAudio] = useState(false);
  const [includeCameraVideo, setIncludeCameraVideo] = useState(false);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const startRecording = async () => {
    setRecordingState(RecordingState.RECORDING);

    // reset videoChunksIds
    videoChunksIds = [];

    await clear();

    let screenStream: MediaStream | undefined;
    try {
      screenStream = await getScreenStream({
        includeSystemAudio,
      });
    } catch (error) {
      setSnackBarMessage("Error starting recording");
      setIsSnackBarOpen(true);
      setRecordingState(RecordingState.NOT_RECORDING);
    }

    let webcamStream: MediaStream | undefined;
    if (includeCameraVideo || includeMicrophoneAudio) {
      try {
        webcamStream = await getCameraAndMicrophoneStream({
          includeCameraVideo,
          includeMicrophoneAudio,
        });
      } catch (error) {
        setSnackBarMessage("Error starting recording");
        setIsSnackBarOpen(true);
        setRecordingState(RecordingState.NOT_RECORDING);
      }

      if (screenStream) {
        configureStreamStopListener(screenStream);
      }

      let mergedMediaStream: MediaStream | null;
      if (webcamStream) {
        configureStreamStopListener(webcamStream);

        mergedMediaStream = mergeMediaStreams({
          screenStream,
          webcamStream,
          includeSystemAudio,
          includeMicrophoneAudio,
          cameraVideoOptions,
        });
      } else {
        mergedMediaStream = screenStream!;
      }

      const mediaRecorder = new MediaRecorder(
        mergedMediaStream!,
        mediaRecoderOptionsConfig[recordedVideoExtension]
      );

      if (screenStream && webcamStream && !mergedMediaStream) {
        stopRecording({
          screenStream,
          webcamStream,
          mergedMediaStream,
          mediaRecorder,
          setRecordingState,
        });
      }

      if (mergedMediaStream) {
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          const id = Date.now();
          /**
           * write data in index db
           */
          set(id, event.data);
          videoChunksIds.push(id);
        };
      }
    }
  };

  const stopRecording = ({
    screenStream,
    webcamStream,
    mergedMediaStream,
    mediaRecorder,
    setRecordingState,
  }: Readonly<{
    screenStream: MediaStream | undefined;
    webcamStream: MediaStream | undefined;
    mergedMediaStream: MediaStream | null;
    mediaRecorder: MediaRecorder;
    setRecordingState: React.Dispatch<React.SetStateAction<RecordingState>>;
  }>) => {
    mediaRecorder?.stop();
    screenStream?.getTracks().forEach((track) => track.stop());
    webcamStream?.getTracks().forEach((track) => track.stop());
    mergedMediaStream?.getTracks().forEach((track) => track.stop());

    setRecordingState(RecordingState.PROCESSING_RECORDING);
  };

  const processRecordingVideo = ({
    setRecordingState,
  }: Readonly<{
    setRecordingState: React.Dispatch<React.SetStateAction<RecordingState>>;
  }>) => {
    setRecordingState(RecordingState.PROCESSING_RECORDING);
  };

  const configureStreamStopListener = (mediaStream: MediaStream) => {
    mediaStream.getTracks().forEach((track) => {
      track.addEventListener("ended", (event) => {
        console.log(`media stream track has ended`);

        /**
         * If recording is in progress, stop recording
         */
        if (recordingState === RecordingState.RECORDING) {
          setRecordingState(RecordingState.NOT_RECORDING);
        }
      });
    });
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
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
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
      {recordingState === RecordingState.PROCESSING_RECORDING && (
        <PreparingRecording />
      )}
    </div>
  );
}
