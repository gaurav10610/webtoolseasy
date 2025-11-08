"use client";

import React, { useState, useCallback, useMemo, memo, useRef } from "react";
import { ConversionState, VideoFileData } from "@/types/file";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { ButtonWithHandler } from "@/components/lib/buttons";
import { CircularProgressWithLabel } from "@/components/lib/progress";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { PaperWithChildren } from "@/components/lib/papers";
import { SelectWithLabel } from "@/components/lib/select";
import { ToolLayout, SEOContent } from "@/components/common/ToolLayout";
import { FILE_SIZE_PRESETS, FILE_TYPE_PRESETS } from "@/util/fileValidation";
import { FFMPEG_FORMATS } from "@/data/config/ffmpeg-config";
import { FFmpegFormat } from "@/types/ffmpeg";
import {
  getFileFormatId,
  getOutputFileName,
  getMimeType,
  getEligibleFormatIds,
} from "@/util/videoConverterUtils";
import { formatBytes, getFormattedFileName } from "@/util/commonUtils";
import { CircularProgress, SelectChangeEvent, Typography } from "@mui/material";
import { isEmpty, find, isNil, cloneDeep, includes } from "lodash-es";

interface AudioConverterState {
  fileList: VideoFileData[];
  error: string;
  snackBar: {
    open: boolean;
    message: string;
    color: "success" | "info" | "warning" | "error";
  };
}

// Memoized Audio File Component
const AudioFile = memo(function AudioFile({
  audioFileData,
  onTargetFormatChange,
  onAudioConvert,
  onDownload,
}: {
  audioFileData: VideoFileData;
  onTargetFormatChange: (formatId: string, fileId: string) => void;
  onAudioConvert: (fileId: string) => void;
  onDownload: (fileId: string) => void;
}) {
  const eligibleFormats = useMemo(
    () => getEligibleFormatIds(audioFileData.originalFile.name, "Audio")!,
    [audioFileData.originalFile.name]
  );

  const selectOptions = useMemo(
    () =>
      eligibleFormats.map((formatId) => {
        const format = FFMPEG_FORMATS.get(formatId) as FFmpegFormat;
        return {
          key: String(formatId),
          value: String(formatId),
          label: format.displayName,
        };
      }),
    [eligibleFormats]
  );

  const currentConversionData =
    audioFileData.convertedData[audioFileData.selectedTargetFormatId];
  const isProcessing = includes(
    [
      ConversionState.INITIALISING_FFMPEG,
      ConversionState.FILE_LOADING,
      ConversionState.IN_PROGRESS,
      ConversionState.FAILED,
      ConversionState.FILE_READING,
    ],
    currentConversionData.conversionState
  );

  const handleFormatChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onTargetFormatChange(event.target.value, audioFileData.id);
    },
    [onTargetFormatChange, audioFileData.id]
  );

  const handleConvert = useCallback(() => {
    onAudioConvert(audioFileData.id);
  }, [onAudioConvert, audioFileData.id]);

  const handleDownload = useCallback(() => {
    onDownload(audioFileData.id);
  }, [onDownload, audioFileData.id]);

  return (
    <PaperWithChildren
      className="flex flex-col gap-3 w-full p-3 md:gap-1 md:items-start md:flex-row"
      variant="elevation"
    >
      <div className="flex flex-row gap-2 w-full md:items-center">
        <AudioFileIcon fontSize="large" color="primary" />
        <div className="flex flex-col gap-1 flex-grow">
          <Typography variant="body2" color="primary">
            {audioFileData.originalFile.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {formatBytes(audioFileData.originalFile.size)}
          </Typography>
          {isProcessing && (
            <div className="flex flex-row gap-2 items-center">
              <Typography variant="caption" color="textPrimary">
                State:
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                fontStyle="italic"
              >
                {currentConversionData.conversionState}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <SelectWithLabel
          selectLabel="Output Format"
          options={selectOptions}
          value={String(audioFileData.selectedTargetFormatId)}
          onChange={handleFormatChange}
          className="w-[10rem]"
        />
        {currentConversionData.conversionState ===
          ConversionState.NOT_CONVERTED && (
          <ButtonWithHandler
            buttonText="Convert"
            size="medium"
            onClick={handleConvert}
            endIcon={<PlayArrowIcon />}
          />
        )}
        {includes(
          [ConversionState.INITIALISING_FFMPEG, ConversionState.FILE_LOADING],
          currentConversionData.conversionState
        ) && <CircularProgress size={30} />}
        {currentConversionData.conversionState ===
          ConversionState.IN_PROGRESS && (
          <CircularProgressWithLabel
            value={currentConversionData.conversionProgress}
            color="success"
          />
        )}
        {currentConversionData.data && (
          <ButtonWithHandler
            buttonText="Download"
            size="medium"
            variant="outlined"
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            color="success"
          />
        )}
      </div>
    </PaperWithChildren>
  );
});

// Memoized Audio Files List Component
const AudioFilesList = memo(function AudioFilesList({
  fileList,
  onTargetFormatChange,
  onAudioConvert,
  onDownload,
}: {
  fileList: VideoFileData[];
  onTargetFormatChange: (formatId: string, fileId: string) => void;
  onAudioConvert: (fileId: string) => void;
  onDownload: (fileId: string) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-3">
      {fileList.map((audioFileData) => (
        <AudioFile
          key={audioFileData.id}
          audioFileData={audioFileData}
          onTargetFormatChange={onTargetFormatChange}
          onAudioConvert={onAudioConvert}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
});

export default function AudioConverter() {
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<AudioConverterState>({
    fileList: [],
    error: "",
    snackBar: {
      open: false,
      message: "",
      color: "success",
    },
  });

  const showMessage = useCallback(
    (message: string, color: "success" | "error" = "success") => {
      setState((prev) => ({
        ...prev,
        snackBar: { open: true, message, color },
      }));
    },
    []
  );

  const handleSnackBarClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      snackBar: { ...prev.snackBar, open: false },
    }));
  }, []);

  const handleFileSelect = useCallback((files: FileList) => {
    const newFiles = Array.from(files).map((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const formatId = getFileFormatId(fileExtension!);
      const defaultTargetFormatId = getEligibleFormatIds(
        file.name,
        "Audio"
      )![0];
      const formattedFileName = getFormattedFileName(file.name);
      const outputFileName = getOutputFileName({
        fileName: formattedFileName,
        targetFormatid: defaultTargetFormatId,
      });

      const audioFileData: VideoFileData = {
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
      return audioFileData;
    });

    setState((prev) => ({
      ...prev,
      fileList: [...prev.fileList, ...newFiles],
      error: "",
    }));
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setState((prev) => ({ ...prev, error: errorMessage }));
  }, []);

  const onTargetFormatChange = useCallback(
    (selectedFormatId: string, fileId: string) => {
      setState((prev) => ({
        ...prev,
        fileList: prev.fileList.map((fileData) => {
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
        }),
      }));
    },
    []
  );

  const onAudioConvert = useCallback(
    async (fileId: string) => {
      const audioFileData = find(state.fileList, (file) => file.id === fileId);
      if (isEmpty(audioFileData)) return;

      try {
        // Dynamically import FFmpeg service when needed for lazy loading
        const { transcodeVideo } = await import("@/service/ffmpegService");

        transcodeVideo({
          videoFileData: cloneDeep(audioFileData!),
          setFileList: (updateFn) => {
            setState((prev) => ({
              ...prev,
              fileList:
                typeof updateFn === "function"
                  ? updateFn(prev.fileList)
                  : updateFn,
            }));
          },
          setIsSnackBarOpen: (open) => {
            setState((prev) => ({
              ...prev,
              snackBar: {
                ...prev.snackBar,
                open:
                  typeof open === "function" ? open(prev.snackBar.open) : open,
              },
            }));
          },
          setSnackBarMessage: (message) => {
            setState((prev) => ({
              ...prev,
              snackBar: {
                ...prev.snackBar,
                message:
                  typeof message === "function"
                    ? message(prev.snackBar.message)
                    : message,
              },
            }));
          },
          setSnackBarColor: (color) => {
            setState((prev) => ({
              ...prev,
              snackBar: {
                ...prev.snackBar,
                color:
                  typeof color === "function"
                    ? color(prev.snackBar.color)
                    : color,
              },
            }));
          },
        });
      } catch {
        showMessage("Failed to load audio processing library", "error");
      }
    },
    [state.fileList, showMessage]
  );

  const downloadConvertedFile = useCallback(
    (fileId: string) => {
      const audioFileData = find(state.fileList, (file) => file.id === fileId);
      if (!audioFileData) return;

      const element = document.createElement("a");
      const file = new Blob(
        [
          audioFileData.convertedData[audioFileData.selectedTargetFormatId]!
            .data! as unknown as ArrayBuffer,
        ],
        { type: getMimeType(audioFileData.selectedTargetFormatId) }
      );

      element.href = URL.createObjectURL(file);
      element.download =
        audioFileData.convertedData[
          audioFileData.selectedTargetFormatId
        ].outputFileName;

      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    },
    [state.fileList]
  );

  const handleAddMoreAudio = useCallback(() => {
    addMoreInputRef.current?.click();
  }, []);

  const handleAdditionalFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFileSelect(files);
        // Reset input so same files can be added again
        e.target.value = "";
      }
    },
    [handleFileSelect]
  );

  return (
    <ToolLayout
      snackBar={{
        open: state.snackBar.open,
        message: state.snackBar.message,
        onClose: handleSnackBarClose,
      }}
    >
      <SEOContent
        title="Audio Converter"
        description="Free online audio converter. Convert MP3, WAV, OGG, M4A, AAC, FLAC and more audio formats instantly in your browser."
        exampleCode="audio.mp3"
        exampleOutput="audio.wav"
      />

      {/* Error message */}
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <Typography variant="body2" className="text-red-800">
            {state.error}
          </Typography>
        </div>
      )}

      {/* File Upload */}
      {isEmpty(state.fileList) && (
        <FileUploadWithDragDrop
          accept=".mp3,.wav,.ogg,.m4a,.aac,.flac,.wma,.opus,.ape,.aiff,.alac"
          multiple={true}
          allowedTypes={FILE_TYPE_PRESETS.AUDIO}
          maxSize={FILE_SIZE_PRESETS.LARGE}
          onFileSelect={handleFileSelect}
          onError={handleError}
          title="Upload Audio Files to Convert"
          subtitle="Drag and drop your audio files here or click to browse"
          supportText="Supports MP3, WAV, OGG, M4A, AAC, FLAC formats up to 50MB each"
        />
      )}

      {/* Add More Audio Button */}
      {!isEmpty(state.fileList) && (
        <>
          <input
            ref={addMoreInputRef}
            type="file"
            accept=".mp3,.wav,.ogg,.m4a,.aac,.flac,.wma,.opus,.ape,.aiff,.alac"
            multiple
            style={{ display: "none" }}
            onChange={handleAdditionalFileSelect}
          />
          <div className="w-full flex flex-row justify-end mb-3">
            <ButtonWithHandler
              buttonText="Add More Audio Files"
              onClick={handleAddMoreAudio}
              size="small"
              startIcon={<AddIcon />}
            />
          </div>
        </>
      )}

      {/* Audio Files List */}
      {!isEmpty(state.fileList) && (
        <AudioFilesList
          fileList={state.fileList}
          onTargetFormatChange={onTargetFormatChange}
          onAudioConvert={onAudioConvert}
          onDownload={downloadConvertedFile}
        />
      )}
    </ToolLayout>
  );
}
