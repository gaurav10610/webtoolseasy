"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { BaseFileData } from "@/types/file";
import { FFMPEG_FORMATS } from "@/data/config/ffmpeg-config";
import { find, isEmpty, isNil, map } from "lodash-es";
import { FFmpegFormat } from "@/types/ffmpeg";
import { NoFilesState } from "../fileComponents";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { PaperWithChildren } from "../lib/papers";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Typography } from "@mui/material";
import { formatBytes } from "@/util/commonUtils";

interface ConvertedFileData {
  file: Blob;
  fileType: string;
}

interface VideoFileData extends BaseFileData {
  error?: unknown;
  convertedData: ConvertedFileData[];
}

function _getFileFormatId(fileExtension: string): number {
  return (
    find(
      Array.from(FFMPEG_FORMATS.entries()),
      ([, format]) => format.targetFormat === fileExtension
    )?.[0] ?? 6
  );
}

export default function VideoToAudioConverter() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  const onComponentLoad = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.7/dist/umd";

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
    });
    setIsFFmpegLoaded(true);
  };

  useEffect(() => {
    onComponentLoad();
  }, []);

  const [fileList, setFileList] = useState<BaseFileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<BaseFileData | null>(null);

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;
    const newFiles = map(Array.from(files), (file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
    }));
    setFileList([...fileList, ...newFiles]);
    if (isNil(selectedFile)) {
      setSelectedFile(newFiles[0]);
    }
  };

  const openFileDialog = () => {
    const input = document.getElementById("file") as HTMLInputElement;
    input.type = "file";
    input.click();
  };

  const VideoFile = ({
    videoFileData,
  }: Readonly<{
    videoFileData: BaseFileData;
  }>) => {
    return (
      <PaperWithChildren
        classes="flex flex-row gap-1 w-full p-3 items-start"
        variant="elevation"
      >
        <VideoLibraryIcon fontSize="large" color="warning" />
        <div className="flex flex-col gap-1">
          <Typography variant="body2" color="primary">
            {videoFileData.originalFile.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {formatBytes(videoFileData.originalFile.size)}
          </Typography>
        </div>
      </PaperWithChildren>
    );
  };

  const VideoFiles = ({
    fileList,
  }: Readonly<{
    fileList: BaseFileData[];
  }>) => {
    return (
      <div className="flex flex-col w-full gap-3">
        {map(fileList, (videoFileData) => (
          <VideoFile videoFileData={videoFileData} />
        ))}
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
      {isEmpty(fileList) && <NoFilesState openFileDialog={openFileDialog} />}
      {!isEmpty(fileList) && (
        <div className="w-full flex flex-row justify-end">
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
