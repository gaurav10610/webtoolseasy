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

      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-3">
          <Typography
            variant="body1"
            className="!text-lg !font-semibold flex items-center gap-2"
          >
            <span>📥</span>
            <span>Base64 Input</span>
          </Typography>
          <TextField
            id="base64-data"
            label="Paste Base64 Data URI"
            multiline
            rows={8}
            value={toolState.code}
            onChange={(e) => toolState.setCode(e.target.value)}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQ..."
            variant="outlined"
            className="w-full"
          />
        </div>

        {!isEmpty(decodeError) && (
          <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body2" className="text-red-800 font-medium">
              ⚠️ Decoding error: {decodeError}
            </Typography>
          </div>
        )}

        {fileBlob && (
          <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
            <Typography
              variant="body2"
              className="text-green-800 font-medium flex items-center gap-2"
            >
              <span>✅</span>
              <span>
                File ready for download: <strong>{fileName}</strong>
              </span>
            </Typography>
          </div>
        )}

        <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Typography variant="body2" className="text-blue-800">
            💡 <strong>Tip:</strong> Paste a valid Base64 data URI (starting
            with &ldquo;data:&rdquo;) and click &ldquo;Decode &amp;
            Download&rdquo; to convert it back to a file.
          </Typography>
        </div>
      </div>
    </ToolLayout>
  );
}
