"use client";

import { ButtonWithHandler } from "@/components/lib/buttons";
import { CustomSvgIcon } from "@/components/lib/icons";
import MonitorIcon from "@/data/icons/monitor.svg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import { CircularProgress, Typography } from "@mui/material";
import { CheckBoxWithLabel } from "@/components/lib/checkBoxes";
import { clear, get, set } from "idb-keyval";
import { SnackBarWithPosition } from "../lib/snackBar";
import {
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

export default function ScreenRecorder() {
  const cameraVideoOptions: Record<string, number> = {
    width: 300,
    height: 300,
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

  // const [isSupported, setIsSupported] = useState(true);
  const recordedVideoExtension = "webm";

  const [recordingState, setRecordingState] = useState(
    RecordingState.NOT_RECORDING
  );
  const [includeMicrophoneAudio, setIncludeMicrophoneAudio] = useState(false);
  const [includeSystemAudio, setIncludeSystemAudio] = useState(false);
  const [includeCameraVideo, setIncludeCameraVideo] = useState(false);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarColor, setSnackBarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const streamContextRef = useRef<Record<string, MediaStream>>({});
  const mediaRecorderContextRef = useRef<Record<string, MediaRecorder>>({});
  const videoChunksIdsRef = useRef<number[]>([]);

  const startRecording = async () => {
    // reset videoChunksIds
    videoChunksIdsRef.current = [];

    await clear();

    console.log("context while starting recording", {
      streamContext: streamContextRef.current,
      mediaRecorderContext: mediaRecorderContextRef.current,
    });

    /**
     * Reset context before starting recording
     */
    streamContextRef.current = {};
    mediaRecorderContextRef.current = {};

    console.log("context after reset", {
      streamContext: streamContextRef.current,
      mediaRecorderContext: mediaRecorderContextRef.current,
    });

    let screenStream: MediaStream | undefined;
    try {
      screenStream = await getScreenStream({
        includeSystemAudio,
      });
      streamContextRef.current["screenStream"] = screenStream;
    } catch (error) {
      console.error("Error getting screen stream", error);
      setSnackBarMessage("Error starting recording");
      setSnackBarColor("error");
      setIsSnackBarOpen(true);
      setRecordingState(RecordingState.NOT_RECORDING);
      return;
    }

    let webcamStream: MediaStream | undefined;
    if (includeCameraVideo || includeMicrophoneAudio) {
      try {
        webcamStream = await getCameraAndMicrophoneStream({
          includeCameraVideo,
          includeMicrophoneAudio,
        });
        streamContextRef.current["webcamStream"] = webcamStream;
      } catch (error) {
        console.error("Error getting camera or microphone stream", error);
        setSnackBarMessage("Error starting recording");
        setSnackBarColor("error");
        setIsSnackBarOpen(true);
        setRecordingState(RecordingState.NOT_RECORDING);
        return;
      }
    }
    if (screenStream) {
      configureStreamStopListener(screenStream, true);
    }

    let mergedMediaStream: MediaStream | null;
    if (webcamStream) {
      configureStreamStopListener(webcamStream, false);

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

    streamContextRef.current["mergedMediaStream"] = mergedMediaStream!;

    const mediaRecorder = new MediaRecorder(
      mergedMediaStream!,
      mediaRecoderOptionsConfig[recordedVideoExtension]
    );

    mediaRecorderContextRef.current["mediaRecorder"] = mediaRecorder;

    if (screenStream && webcamStream && !mergedMediaStream) {
      stopRecording(false);
    }

    if (mergedMediaStream) {
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        console.log("media recorder data available event triggered..");
        const id = Date.now();
        /**
         * write data in index db
         */
        set(id, event.data);
        videoChunksIdsRef.current.push(id);
      };
    }

    mediaRecorder.start(RECORDER_TIME_SLICE_MS);
    setRecordingState(RecordingState.RECORDING);
  };

  const stopRecording = (triggerProcessRecording: boolean) => {
    console.log("stop recording triggered..");
    const { screenStream, webcamStream, mergedMediaStream } =
      streamContextRef.current;
    const { mediaRecorder } = mediaRecorderContextRef.current;
    mediaRecorder?.stop();
    screenStream?.getTracks().forEach((track) => track.stop());
    webcamStream?.getTracks().forEach((track) => track.stop());
    mergedMediaStream?.getTracks().forEach((track) => track.stop());

    if (triggerProcessRecording) {
      setRecordingState(RecordingState.PROCESSING_RECORDING);
      processRecordingVideo();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downloadRecording = (videoFileBuffer: any[]) => {
    const videoBlob = new Blob(videoFileBuffer, {
      type: `video/${recordedVideoExtension}`,
    });

    const videoUrl = URL.createObjectURL(videoBlob);
    const element = document.createElement("a");
    element.href = videoUrl;
    element.download = `webtoolseasy_recording.${recordedVideoExtension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const processRecordingVideo = () => {
    setRecordingState(RecordingState.PROCESSING_RECORDING);
    setTimeout(async () => {
      try {
        const videoFileBuffer = [];
        videoChunksIdsRef.current.sort(function (a, b) {
          return a - b;
        });

        const totalChunks = videoChunksIdsRef.current.length;

        for (let index = 0; index < totalChunks; index++) {
          videoFileBuffer.push(await get(videoChunksIdsRef.current[index]));
        }

        downloadRecording(videoFileBuffer);
        clear();

        setRecordingState(RecordingState.NOT_RECORDING);
      } catch (error) {
        console.error("Error processing recording", error);
        setSnackBarMessage("Error processing recording");
        setSnackBarColor("error");
        setIsSnackBarOpen(true);
        setRecordingState(RecordingState.NOT_RECORDING);
      }
    }, RECORDING_START_DELAY_MS);
  };

  const configureStreamStopListener = (
    mediaStream: MediaStream,
    triggerStopRecording: boolean
  ) => {
    mediaStream.getTracks().forEach((track) => {
      track.addEventListener("ended", () => {
        console.log(`media stream track has ended`);
        console.log("configureStreamStopListener recordingState: ", {
          recordingState,
        });

        if (triggerStopRecording) {
          stopRecording(triggerStopRecording);
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
        color={snackBarColor}
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
          onClick={() => stopRecording(true)}
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
