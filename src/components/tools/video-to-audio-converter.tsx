"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { BaseFileData } from "@/types/file";
import {
  ELIGIBLE_TARGET_FORMATS,
  FFMPEG_FORMATS,
} from "@/data/config/ffmpeg-config";
import { find, isEmpty, isNil, map } from "lodash-es";
import { FFmpegFormat } from "@/types/ffmpeg";
import { NoFilesState } from "../fileComponents";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { PaperWithChildren } from "../lib/papers";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { LinearProgress, SelectChangeEvent, Typography } from "@mui/material";
import { formatBytes, getRandomId } from "@/util/commonUtils";
import { SelectItem, SelectWithLabel } from "../lib/select";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface ConvertedFileData {
  data?: Blob;
  formatName: string;
  formatId: number;
  isConverted: boolean;
}

interface VideoFileData extends BaseFileData {
  error?: unknown;
  convertedData: Record<number, ConvertedFileData>;
  formatId: number;
  formatName: string;
  //   eligbleFormats: SelectItem[];
  selectedTargetFormatId: number;
}

function _getFileFormatId(fileExtension: string): number {
  return (
    find(
      Array.from(FFMPEG_FORMATS.entries()),
      ([, format]) => format.targetFormat === fileExtension
    )?.[0] ?? 6
  );
}

function _getFileExtension(fileName: string): string {
  return fileName.split(".").pop()!;
}

function _getEligibleFormatIds(fileName: string): number[] | undefined {
  const fileExtension = _getFileExtension(fileName);
  const fileFormatId = _getFileFormatId(fileExtension!);
  const fileFormat = FFMPEG_FORMATS.get(fileFormatId) as FFmpegFormat;
  return ELIGIBLE_TARGET_FORMATS.get(fileFormat.targetFormat);
}

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
      const fileExtension = _getFileExtension(file.name);
      const formatId = _getFileFormatId(fileExtension);

      const defaultTargetFormatId = _getEligibleFormatIds(file.name)![0];

      const videoFileData: VideoFileData = {
        id: crypto.randomUUID(),
        originalFile: file,
        convertedData: {
          [defaultTargetFormatId]: {
            formatId: defaultTargetFormatId,
            isConverted: false,
            formatName: FFMPEG_FORMATS.get(defaultTargetFormatId)!.displayName,
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
                [selectedFormatId]: {
                  formatId: selectedFormatId,
                  isConverted: false,
                  formatName: FFMPEG_FORMATS.get(Number(selectedFormatId))!
                    .displayName,
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

  const onVideoConvert = async (fileId: string) => {
    console.log("Started converting file: ", {
      fileData: find(fileList, (file) => file.id === fileId),
    });
  };

  const VideoFile = ({
    videoFileData,
  }: Readonly<{
    videoFileData: VideoFileData;
  }>) => {
    const eligibleFormats = _getEligibleFormatIds(
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
          <ButtonWithHandler
            buttonText="Convert"
            size="medium"
            onClick={() => {
              onVideoConvert(videoFileData.id);
            }}
            endIcon={<PlayArrowIcon />}
          />
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
