"use client";

import { TextField, Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash-es";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

/* Method to convert Base64Data Url as Image Blob */
const base64toBlob = (dataURI: string, mimeType: string): Blob => {
  const byteString = atob(dataURI);
  const int8Array = Uint8Array.from(byteString, (char) => char.charCodeAt(0));
  const blob = new Blob([int8Array], { type: mimeType });
  return blob;
};

/**
 * get mimeType from base64 data URI
 * @param base64Content
 * @returns
 */
function getMimeType(base64Content: string): string {
  return base64Content.substring(
    base64Content.indexOf(":") + 1,
    base64Content.indexOf(";")
  );
}

export default function Base64Decode({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [decodeError, setDecodeError] = useState<string>("");
  const [fileBlob, setFileBlob] = useState<Blob>();
  const [fileName, setFileName] = useState("");

  const decodeBase64ToFile = useCallback(() => {
    if (isEmpty(toolState.code)) {
      toolState.actions.showMessage("Please enter base64 data");
      return;
    }

    try {
      /**
       * string base64 string
       */
      const base64Data: string = toolState.code.split(",")[1];
      const mimeType: string = getMimeType(toolState.code);
      const fileName = `decodedFile.${mimeType.split("/").pop()}`;

      const blob = base64toBlob(base64Data, mimeType);
      setFileBlob(blob);
      setDecodeError("");
      setFileName(fileName);
      toolState.actions.showMessage("Decoded base64 data successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.toString() : "Decoding error";
      setDecodeError(errorMessage);
      toolState.actions.showMessage(errorMessage);
    }
  }, [toolState]);

  const downloadFile = useCallback(() => {
    if (fileBlob) {
      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = URL.createObjectURL(fileBlob);
      downloadAnchor.download = fileName;
      downloadAnchor.click();
    }
  }, [fileBlob, fileName]);

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onRun: decodeBase64ToFile,
        onDownload: fileBlob ? downloadFile : undefined,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [decodeBase64ToFile, downloadFile, fileBlob, toolState]
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
        title="Base64 Decoder"
        description="Free online base64 decoder. Convert base64 encoded data back to original file format."
        exampleCode="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQ..."
        exampleOutput="Decoded file download"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col w-full gap-3">
        <TextField
          id="base64-data"
          label="Base64 to File (Paste Base64 Data URI)"
          multiline
          maxRows={5}
          minRows={5}
          value={toolState.code}
          onChange={(e) => toolState.setCode(e.target.value)}
        />

        {!isEmpty(decodeError) && (
          <Typography variant="body2" color="error">
            Decoding error: {decodeError}
          </Typography>
        )}

        {fileBlob && (
          <div className="flex flex-col gap-2">
            <Typography variant="body2" color="primary">
              File ready for download: {fileName}
            </Typography>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
