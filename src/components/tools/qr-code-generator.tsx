"use client";

import { ToolComponentProps } from "@/types/component";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { TextField, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ButtonWithHandler } from "../lib/buttons";
import LinkIcon from "@mui/icons-material/Link";
import { toCanvas, toString, toDataURL, QRCodeToDataURLOptions } from "qrcode";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function _base64toBlob(base64Data: string, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const byteString = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: mimeType });
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
}

export default function QrCodeGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `https://webtoolseasy.com/`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [text, setText] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const canvasRef = useRef(null);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      toCanvas(canvas, text);
    }
  }, [text]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleLinkCopy = () => {
    compressStringToBase64(text).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  const handleSvgCopy = () => {
    toString(text, {
      type: "svg",
    }).then(copyToClipboard);
  };

  const downloadImage = (imageType: "jpeg" | "webp" | "png") => {
    const mimeType = `image/${imageType}`;
    const options: QRCodeToDataURLOptions = {
      type: mimeType as "image/jpeg" | "image/webp" | "image/png",
    };

    toDataURL(text, options).then((dataUrl) => {
      const base64Data = dataUrl.split(",")[1];
      _base64toBlob(base64Data, mimeType).then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `qr-code.${imageType}`;
        document.body.appendChild(a); // Append the element to the document body
        a.click();
        document.body.removeChild(a); // Remove the element after triggering the download
      });
    });
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col gap-2 w-full justify-center md:flex-row">
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        <ButtonWithHandler
          buttonText="Copy SVG"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleSvgCopy}
        />
        <ButtonWithHandler
          buttonText="Download JPEG"
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={() => downloadImage("jpeg")}
        />
        <ButtonWithHandler
          buttonText="Download PNG"
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={() => downloadImage("png")}
        />
        <ButtonWithHandler
          buttonText="Download WEBP"
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={() => downloadImage("webp")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-3 items-center">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <Typography
        variant="body1"
        color="textSecondary"
        className="!text-xl !font-semibold !w-full"
      >
        QR Code Free Text
      </Typography>
      <TextField
        multiline
        rows={5}
        onChange={onTextChange}
        value={text}
        className="w-full"
      />
      <canvas id="qrCanvas" ref={canvasRef} />
      <ControlButtons />
    </div>
  );
}
