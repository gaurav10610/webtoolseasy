"use client";

import { useState } from "react";
import { ConversionState, VideoFileData } from "@/types/file";
import { FFMPEG_FORMATS } from "@/data/config/ffmpeg-config";
import { cloneDeep, find, includes, isEmpty, isNil, map } from "lodash-es";
import { FFmpegFormat } from "@/types/ffmpeg";
import { NoFilesState } from "../fileComponents";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { PaperWithChildren } from "../lib/papers";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { CircularProgress, SelectChangeEvent, Typography } from "@mui/material";
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
  getMimeType,
  getOutputFileName,
} from "@/util/videoConverterUtils";
import { transcodeVideo } from "@/service/ffmpegService";
import DownloadIcon from "@mui/icons-material/Download";
import { SnackBarWithPosition } from "../lib/snackBar";
import { CircularProgressWithLabel } from "../lib/progress";

export default function VideoToAudioConverter() {
  const [fileList, setFileList] = useState<VideoFileData[]>([]);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarColor, setSnackBarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;
    const newFiles: VideoFileData[] = map(Array.from(files), (file) => {
      const fileExtension = getFileExtension(file.name);
      const formatId = getFileFormatId(fileExtension);

      const defaultTargetFormatId = getEligibleFormatIds(
        file.name,
        "Audio"
      )![0];
      const formattedFileName = getFormattedFileName(file.name);
      const outputFileName = getOutputFileName({
        fileName: formattedFileName,
        targetFormatid: defaultTargetFormatId,
      });

      const videoFileData: VideoFileData = {
        id: crypto.randomUUID(),
        originalFile: file,
        formattedFileName,
        convertedData: {
          [defaultTargetFormatId]: {
            formatId: defaultTargetFormatId,
            isConverted: false,
            formatName: FFMPEG_FORMATS.get(defaultTargetFormatId)!.displayName,
            conversionProgress: 0,
            conversionState: ConversionState.NOT_CONVERTED,
            outputFileName,
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
                  outputFileName: getOutputFileName({
                    fileName: fileData.formattedFileName,
                    targetFormatid: Number(selectedFormatId),
                  }),
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

    /**
     * Clone the video file data to avoid state mutation
     */
    transcodeVideo({
      videoFileData: cloneDeep(videoFileData!),
      setFileList,
      setIsSnackBarOpen,
      setSnackBarMessage,
      setSnackBarColor,
    });
  };

  const downloadConvertedFile = async (fileId: string) => {
    const videoFileData = find(fileList, (file) => file.id === fileId);
    const element = document.createElement("a");
    const file = new Blob(
      [
        videoFileData!.convertedData[videoFileData!.selectedTargetFormatId]!
          .data!,
      ],
      {
        type: getMimeType(videoFileData!.selectedTargetFormatId),
      }
    );
    element.href = URL.createObjectURL(file);

    element.download =
      videoFileData!.convertedData[
        videoFileData!.selectedTargetFormatId
      ].outputFileName;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const VideoFile = ({
    videoFileData,
  }: Readonly<{
    videoFileData: VideoFileData;
  }>) => {
    const eligibleFormats = getEligibleFormatIds(
      videoFileData.originalFile.name,
      "Audio"
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
        className="flex flex-col gap-3 w-full p-3 md:gap-1 md:items-start md:flex-row"
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
            {includes(
              [
                ConversionState.INITIALISING_FFMPEG,
                ConversionState.FILE_LOADING,
                ConversionState.IN_PROGRESS,
                ConversionState.FAILED,
                ConversionState.FILE_READING,
              ],
              videoFileData.convertedData[videoFileData.selectedTargetFormatId]
                .conversionState
            ) && (
              <div
                className="flex flex-row gap-2 items-center"
                key={getRandomId()}
              >
                <Typography variant="caption" color="textPrimary">
                  State:{" "}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  fontStyle={"italic"}
                >
                  {
                    videoFileData.convertedData[
                      videoFileData.selectedTargetFormatId
                    ].conversionState
                  }
                </Typography>
              </div>
            )}
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
            className="w-[10rem]"
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
            <CircularProgressWithLabel
              value={
                videoFileData.convertedData[
                  videoFileData.selectedTargetFormatId
                ].conversionProgress
              }
              color="success"
            />
          )}
          {videoFileData.convertedData[videoFileData.selectedTargetFormatId]
            .data && (
            <ButtonWithHandler
              buttonText="Download"
              size="medium"
              variant="outlined"
              onClick={() => {
                downloadConvertedFile(videoFileData.id);
              }}
              startIcon={<DownloadIcon />}
              color="success"
            />
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
          <VideoFile key={videoFileData.id} videoFileData={videoFileData} />
        ))}
      </div>
    );
  };

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
        color={snackBarColor}
      />
      <input
        id="file"
        type="file"
        className="hidden"
        onChange={onFilesSelection}
        multiple
        accept=".mp4,.webm,.ogv,.mkv,.ogm,.avi"
      />
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
