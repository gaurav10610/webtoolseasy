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

      <div className="flex flex-col w-full gap-6">
        {/* Error message */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body2" className="text-red-800 font-medium">
              ⚠️ {error}
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

        {/* Example */}
        <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="body2" className="text-blue-800 break-all">
            💡 <strong>Example output:</strong>{" "}
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVR4nGNgGAWjYBSMwFgYwB...
          </Typography>
        </div>

        {/* Output */}
        <div className="flex flex-col w-full gap-3">
          <Typography
            variant="body1"
            className="!text-lg !font-semibold flex items-center gap-2"
          >
            <span>📄</span>
            <span>Base64 Encoded Data</span>
          </Typography>
          <div className="w-full border-2 border-gray-300 rounded-lg p-4 min-h-[120px] bg-gray-50">
            <Typography
              variant="body2"
              className="break-all font-mono text-sm"
              style={{ wordBreak: "break-all" }}
            >
              {base64Data ||
                "Upload a file to see the Base64 encoded data here..."}
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
