"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { ConversionState, VideoFileData } from "@/types/file";
import { FFMPEG_FORMATS } from "@/data/config/ffmpeg-config";
import { cloneDeep, find, includes, isEmpty, isNil, map } from "lodash-es";
import { FFmpegFormat } from "@/types/ffmpeg";
import { NoFilesState } from "../fileComponents";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { PaperWithChildren } from "../lib/papers";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import {
  CircularProgress,
  LinearProgress,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  formatBytes,
  getFileExtension,
  getFormattedFileName,
  getRandomId,
} from "@/util/commonUtils";
import { SelectWithLabel } from "../lib/select";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  getEligibleFormatIds,
  getFileFormatId,
} from "@/util/videoConverterUtils";
import { transcodeVideo } from "@/service/ffmpegService";

export default function VideoToAudioConverter() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [fileList, setFileList] = useState<VideoFileData[]>([]);

  const onComponentLoad = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });

    setIsFFmpegLoaded(true);
  };

  useEffect(() => {
    onComponentLoad();
  }, []);

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;
    const newFiles: VideoFileData[] = map(Array.from(files), (file) => {
      const fileExtension = getFileExtension(file.name);
      const formatId = getFileFormatId(fileExtension);

      const defaultTargetFormatId = getEligibleFormatIds(file.name)![0];

      const videoFileData: VideoFileData = {
        id: crypto.randomUUID(),
        originalFile: file,
        fomattedFileName: getFormattedFileName(file.name),
        convertedData: {
          [defaultTargetFormatId]: {
            formatId: defaultTargetFormatId,
            isConverted: false,
            formatName: FFMPEG_FORMATS.get(defaultTargetFormatId)!.displayName,
            conversionProgress: 0,
            conversionState: ConversionState.NOT_CONVERTED,
          },
        },
        formatName: FFMPEG_FORMATS.get(formatId)!.displayName,
        formatId,
        selectedTargetFormatId: defaultTargetFormatId,
      };
      return videoFileData;
    });
    setFileList([...fileList, ...newFiles]);
  };

  const openFileDialog = () => {
    const input = document.getElementById("file") as HTMLInputElement;
    input.type = "file";
    input.click();
  };

  const onTargetFormatChange = (selectedFormatId: string, fileId: string) => {
    setFileList((prevList) => {
      return map(prevList, (fileData) => {
        if (fileData.id === fileId) {
          if (isNil(fileData.convertedData[Number(selectedFormatId)])) {
            return {
              ...fileData,
              selectedTargetFormatId: Number(selectedFormatId),
              convertedData: {
                ...fileData.convertedData,
                [Number(selectedFormatId)]: {
                  formatId: Number(selectedFormatId),
                  isConverted: false,
                  formatName: FFMPEG_FORMATS.get(Number(selectedFormatId))!
                    .displayName,
                  conversionState: ConversionState.NOT_CONVERTED,
                  conversionProgress: 0,
                },
              },
            };
          }
          return {
            ...fileData,
            selectedTargetFormatId: Number(selectedFormatId),
          };
        }
        return fileData;
      });
    });
  };

  const onVideoConvert = (fileId: string) => {
    const videoFileData = find(fileList, (file) => file.id === fileId);
    if (isEmpty(videoFileData)) {
      return;
    }

    transcodeVideo({
      videoFileData: cloneDeep(videoFileData!),
      setFileList,
    });
  };

  const VideoFile = ({
    videoFileData,
  }: Readonly<{
    videoFileData: VideoFileData;
  }>) => {
    const eligibleFormats = getEligibleFormatIds(
      videoFileData.originalFile.name
    )!;
    const selectOptions = map(eligibleFormats, (formatId) => {
      const format = FFMPEG_FORMATS.get(formatId) as FFmpegFormat;
      return {
        key: String(formatId),
        value: String(formatId),
        label: format.displayName,
      };
    });

    return (
      <PaperWithChildren
        classes="flex flex-col gap-3 w-full p-3 md:gap-1 md:items-start md:flex-row"
        variant="elevation"
      >
        <div className="flex flex-row gap-2 w-full md:items-center">
          <VideoLibraryIcon fontSize="large" color="warning" />
          <div className="flex flex-col gap-1 flex-grow">
            <Typography variant="body2" color="primary">
              {videoFileData.originalFile.name}
            </Typography>
            <Typography variant="body2" color="secondary">
              {formatBytes(videoFileData.originalFile.size)}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <SelectWithLabel
            selectLabel="Output Format"
            options={selectOptions}
            value={String(videoFileData.selectedTargetFormatId)}
            onChange={(event: SelectChangeEvent<string>) => {
              onTargetFormatChange(event.target.value, videoFileData.id);
            }}
            classes="w-[10rem]"
          />
          {videoFileData.convertedData[videoFileData.selectedTargetFormatId]
            .conversionState === ConversionState.NOT_CONVERTED && (
            <ButtonWithHandler
              buttonText="Convert"
              size="medium"
              onClick={() => {
                onVideoConvert(videoFileData.id);
              }}
              endIcon={<PlayArrowIcon />}
            />
          )}
          {includes(
            [ConversionState.INITIALISING_FFMPEG, ConversionState.FILE_LOADING],
            videoFileData.convertedData[videoFileData.selectedTargetFormatId]
              .conversionState
          ) && <CircularProgress size={30} />}
          {videoFileData.convertedData[videoFileData.selectedTargetFormatId]
            .conversionState === ConversionState.IN_PROGRESS && (
            <CircularProgress
              value={
                videoFileData.convertedData[
                  videoFileData.selectedTargetFormatId
                ].conversionProgress
              }
              size={30}
              variant="determinate"
            />
          )}
          {videoFileData.convertedData[videoFileData.selectedTargetFormatId]
            .conversionState === ConversionState.FAILED && (
            <Typography variant="body2" color="error">
              Conversion Failed
            </Typography>
          )}
        </div>
      </PaperWithChildren>
    );
  };

  const VideoFiles = ({
    fileList,
  }: Readonly<{
    fileList: VideoFileData[];
  }>) => {
    return (
      <div className="flex flex-col w-full gap-3">
        {map(fileList, (videoFileData) => (
          <VideoFile key={getRandomId()} videoFileData={videoFileData} />
        ))}
      </div>
    );
  };

  const ConverterStatus = () => {
    return (
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row gap-2 items-center w-full justify-end">
          <Typography variant="h6" color="primary">
            Converter Status:{" "}
          </Typography>

          <Typography
            variant="h6"
            color={isFFmpegLoaded ? "success" : "secondary"}
          >
            {isFFmpegLoaded ? "Ready" : "Loading..."}
          </Typography>
        </div>
        {!isFFmpegLoaded && <LinearProgress className="w-full" />}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <input
        id="file"
        type="file"
        className="hidden"
        onChange={onFilesSelection}
        multiple
        accept=".mp4,.webm,.ogv,.mkv,.ogm,.avi"
      />
      <ConverterStatus />
      {isEmpty(fileList) && <NoFilesState openFileDialog={openFileDialog} />}
      {!isEmpty(fileList) && (
        <div className="w-full flex flex-row justify-end mb-3">
          <ButtonWithHandler
            buttonText="Add More Images"
            onClick={openFileDialog}
            size="small"
            startIcon={<AddIcon />}
          />
        </div>
      )}
      {!isEmpty(fileList) && <VideoFiles fileList={fileList} />}
    </div>
  );
}
