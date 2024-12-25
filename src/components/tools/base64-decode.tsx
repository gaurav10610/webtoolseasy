"use client";

import { TextField, Typography } from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import { useState } from "react";
import { isEmpty } from "lodash-es";
import { SnackBarWithPosition } from "../lib/snackBar";

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

export default function Base64Decode() {
  /**
   * base64 content in format data:text/csv;base64,assafcasfewfewf
   */
  const [base64InputData, setBase64InputData] = useState<string>("");
  const [decodeError, setDecodeError] = useState<string>("");
  const [fileBlob, setFileBlob] = useState<Blob>();
  const [fileName, setFileName] = useState("");

  const decodeBase64ToFile = () => {
    if (isEmpty(base64InputData)) {
      return;
    }
    /**
     * string base64 string
     */
    const base64Data: string = base64InputData.split(",")[1];
    const mimeType: string = getMimeType(base64InputData);

    console.log("mimeType: ", mimeType);
    const fileName = `decodedFile.${mimeType.split("/").pop()}`;

    try {
      const blob = base64toBlob(base64Data, mimeType);
      setFileBlob(blob);
      setDecodeError("");
      setIsSnackBarOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.toString());
        setDecodeError(error.toString());
      } else {
        console.error("Error:", error);
      }
    }

    setFileName(fileName);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBase64InputData(e.target.value);
  };

  const downloadFile = () => {
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = URL.createObjectURL(fileBlob!);
    downloadAnchor.download = fileName;
    downloadAnchor.click();
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "Decoded base64 data successfully!";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <TextField
        id="base64-data"
        label="Base64 to File (Paste Base64 Data URI)"
        multiline
        maxRows={5}
        minRows={5}
        onChange={onTextChange}
      />
      <ButtonWithHandler
        buttonText="decode base64 to file"
        onClick={decodeBase64ToFile}
      />
      {!isEmpty(decodeError) && (
        <Typography variant="body2" color="error">
          Decoding error: {decodeError}
        </Typography>
      )}
      {fileBlob && (
        <ButtonWithHandler
          buttonText={fileName}
          variant="text"
          onClick={downloadFile}
        />
      )}
    </div>
  );
}
