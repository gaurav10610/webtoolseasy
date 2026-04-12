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
import { ToolLayout } from "@/components/common/ToolLayout";
import { FILE_SIZE_PRESETS, FILE_TYPE_PRESETS } from "@/util/fileValidation";
import {
  AUDIO_FORMAT_MAP,
  AUDIO_FORMAT_LIST,
} from "@/data/config/audio-config";
import { getOutputFileName, getMimeType } from "@/util/videoConverterUtils";
import { formatBytes, getFormattedFileName } from "@/util/commonUtils";
import { CircularProgress, SelectChangeEvent, Typography } from "@mui/material";
import { isEmpty, find, isNil, includes } from "lodash-es";

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
  const selectOptions = useMemo(
    () =>
      AUDIO_FORMAT_LIST.map((format) => ({
        key: String(format.id),
        value: String(format.id),
        label: format.displayName,
      })),
    [],
  );

  const currentConversionData =
    audioFileData.convertedData[audioFileData.selectedTargetFormatId];
  const isProcessing = includes(
    [
      ConversionState.INITIALISING_CONVERTER,
      ConversionState.FILE_LOADING,
      ConversionState.IN_PROGRESS,
      ConversionState.FAILED,
      ConversionState.FILE_READING,
    ],
    currentConversionData.conversionState,
  );

  const handleFormatChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onTargetFormatChange(event.target.value, audioFileData.id);
    },
    [onTargetFormatChange, audioFileData.id],
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
          [
            ConversionState.INITIALISING_CONVERTER,
            ConversionState.FILE_LOADING,
          ],
          currentConversionData.conversionState,
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
    [],
  );

  const handleSnackBarClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      snackBar: { ...prev.snackBar, open: false },
    }));
  }, []);

  const defaultFormatId = AUDIO_FORMAT_LIST[0].id;

  const handleFileSelect = useCallback((files: FileList) => {
    const newFiles = Array.from(files).map((file) => {
      const formattedFileName = getFormattedFileName(file.name);
      const outputFileName = getOutputFileName({
        fileName: formattedFileName,
        targetFormatid: defaultFormatId,
      });

      const audioFileData: VideoFileData = {
        id: crypto.randomUUID(),
        originalFile: file,
        formattedFileName,
        convertedData: {
          [defaultFormatId]: {
            formatId: defaultFormatId,
            isConverted: false,
            formatName: AUDIO_FORMAT_MAP.get(defaultFormatId)!.displayName,
            conversionProgress: 0,
            conversionState: ConversionState.NOT_CONVERTED,
            outputFileName,
          },
        },
        formatName: file.name.split(".").pop()?.toUpperCase() ?? "Audio",
        formatId: defaultFormatId,
        selectedTargetFormatId: defaultFormatId,
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
                    formatName: AUDIO_FORMAT_MAP.get(Number(selectedFormatId))!
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
    [],
  );

  const onAudioConvert = useCallback(
    async (fileId: string) => {
      const audioFileData = find(state.fileList, (file) => file.id === fileId);
      if (isEmpty(audioFileData)) return;

      const targetFormatId = audioFileData!.selectedTargetFormatId;

      setState((prev) => ({
        ...prev,
        fileList: prev.fileList.map((f) =>
          f.id === fileId
            ? {
                ...f,
                convertedData: {
                  ...f.convertedData,
                  [targetFormatId]: {
                    ...f.convertedData[targetFormatId],
                    conversionState: ConversionState.INITIALISING_CONVERTER,
                    conversionProgress: 0,
                  },
                },
              }
            : f,
        ),
      }));

      try {
        const { encodeAudioFile } =
          await import("@/service/webCodecsAudioService");

        const { blob } = await encodeAudioFile(
          audioFileData!.originalFile,
          targetFormatId,
          {
            onProgress: (pct) => {
              setState((prev) => ({
                ...prev,
                fileList: prev.fileList.map((f) =>
                  f.id === fileId
                    ? {
                        ...f,
                        convertedData: {
                          ...f.convertedData,
                          [targetFormatId]: {
                            ...f.convertedData[targetFormatId],
                            conversionState:
                              pct < 5
                                ? ConversionState.FILE_LOADING
                                : ConversionState.IN_PROGRESS,
                            conversionProgress: pct,
                          },
                        },
                      }
                    : f,
                ),
              }));
            },
          },
        );

        const outputFileName = getOutputFileName({
          fileName: audioFileData!.formattedFileName,
          targetFormatid: targetFormatId,
        });

        const arrayBuffer = await blob.arrayBuffer();
        setState((prev) => ({
          ...prev,
          fileList: prev.fileList.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  convertedData: {
                    ...f.convertedData,
                    [targetFormatId]: {
                      ...f.convertedData[targetFormatId],
                      conversionState: ConversionState.CONVERTED,
                      conversionProgress: 100,
                      isConverted: true,
                      outputFileName,
                      data: new Uint8Array(arrayBuffer),
                    },
                  },
                }
              : f,
          ),
        }));
        showMessage("Conversion complete!");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Conversion failed";
        setState((prev) => ({
          ...prev,
          fileList: prev.fileList.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  convertedData: {
                    ...f.convertedData,
                    [targetFormatId]: {
                      ...f.convertedData[targetFormatId],
                      conversionState: ConversionState.FAILED,
                      error: msg,
                    },
                  },
                }
              : f,
          ),
        }));
        showMessage(msg, "error");
      }
    },
    [state.fileList, showMessage],
  );

  const downloadConvertedFile = useCallback(
    (fileId: string) => {
      const audioFileData = find(state.fileList, (file) => file.id === fileId);
      if (!audioFileData) return;

      const convData =
        audioFileData.convertedData[audioFileData.selectedTargetFormatId];
      const file = new Blob([convData.data! as unknown as ArrayBuffer], {
        type: getMimeType(audioFileData.selectedTargetFormatId),
      });

      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = convData.outputFileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    },
    [state.fileList],
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
    [handleFileSelect],
  );

  return (
    <ToolLayout
      snackBar={{
        open: state.snackBar.open,
        message: state.snackBar.message,
        onClose: handleSnackBarClose,
      }}
    >
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
          title="Upload Audio or Video Files to Convert"
          subtitle="Drag and drop your files here or click to browse"
          supportText="Converts to MP3, Opus WebM, AAC/M4A, or WAV — all processing runs locally in your browser"
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
