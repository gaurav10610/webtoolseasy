"use client";

import { useState, useCallback, useMemo } from "react";
import { Typography } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FILE_SIZE_PRESETS } from "../../util/fileValidation";

export default function Base64Encode({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [base64Data, setBase64Data] = useState<string>("");
  const [error, setError] = useState("");

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result as string;
        setBase64Data(base64Data);
        setError("");
        toolState.actions.showMessage("File encoded successfully!");
      };
      reader.onerror = () => {
        setError("Failed to read file");
        toolState.actions.showMessage("Error reading file");
      };
    },
    [toolState.actions]
  );

  const handleError = useCallback(
    (errorMessage: string) => {
      setError(errorMessage);
      toolState.actions.showMessage(errorMessage);
    },
    [toolState.actions]
  );

  const copyBase64Data = useCallback(() => {
    toolState.actions.copyText(base64Data, "Base64 data copied!");
  }, [toolState.actions, base64Data]);

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyBase64Data,
        onShareLink: () => toolState.actions.copyShareableLink(base64Data),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyBase64Data, toolState, base64Data]
  );

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
        title="Base64 Encoder"
        description="Free online base64 encoder. Convert any file to base64 encoding with data URI format."
        exampleCode="File Upload"
        exampleOutput="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQ..."
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col w-full gap-3">
        {/* Error message */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body2" className="text-red-800">
              {error}
            </Typography>
          </div>
        )}

        {/* File Upload */}
        <FileUploadWithDragDrop
          accept="*/*"
          multiple={false}
          maxSize={FILE_SIZE_PRESETS.LARGE}
          onFileSelect={handleFileSelect}
          onError={handleError}
          title="Upload File to Encode"
          subtitle="Drag and drop your file here or click to browse"
          supportText="Supports any file type up to 10MB"
        />

        <div className="flex flex-col w-full gap-1">
          <Typography
            color="textSecondary"
            variant="caption"
            sx={{ overflowWrap: "anywhere" }}
          >
            Base64 data example:
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVR4nGNgGAWjYBSMwFgYwB...
          </Typography>
        </div>

        <div className="flex flex-col w-full">
          <Typography variant="h3" sx={{ fontSize: "inherit" }} color="primary">
            Base64 Encoded Data
          </Typography>
          <div className="w-full border-solid border-2 border-lightgrey rounded-sm p-4 min-h-[100px]">
            <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
              {base64Data ||
                "Upload a file to see the Base64 encoded data here..."}
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
