"use client";

import { ToolComponentProps } from "@/types/component";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SnackBarWithPosition } from "../lib/snackBar";
import { isNil } from "lodash-es";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JwtDecoder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const decodeJwtToken = (token: string) => {
    try {
      return {
        decodedToken: JSON.stringify(decodeJwt(token), null, 2),
        decodedTokenHeaders: JSON.stringify(
          decodeProtectedHeader(token),
          null,
          2
        ),
      };
    } catch (error) {
      return {
        error,
      };
    }
  };

  const { decodedToken, decodedTokenHeaders, error } = decodeJwtToken(rawCode);

  const [decodedJwtToken, setDecodedToken] = useState<string>(
    isNil(error) ? decodedToken! : ""
  );
  const [decodedJwtTokenHeaders, setDecodedTokenHeaders] = useState<string>(
    isNil(error) ? decodedTokenHeaders! : ""
  );

  const [tokenError, setTokenError] = useState(isNil(error) ? false : true);

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
    const { decodedToken, decodedTokenHeaders, error } = decodeJwtToken(value);
    setDecodedToken(isNil(error) ? decodedToken! : "");
    setDecodedTokenHeaders(isNil(error) ? decodedTokenHeaders! : "");
    setTokenError(isNil(error) ? false : true);
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleJwtTokenCopy = () => {
    copyToClipboard(rawCode);
    setSnackBarMessage("Copied Jwt Token to Clipboard!");
    setIsSnackBarOpen(true);
    setSnackbarColor("success");
  };

  const handleDecodedTokenCopy = () => {
    copyToClipboard(decodedJwtToken);
    setSnackBarMessage("Copied Decoded Jwt Token to Clipboard!");
    setIsSnackBarOpen(true);
    setSnackbarColor("success");
  };

  const handleLinkCopy = () => {
    compressStringToBase64(rawCode).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
      setSnackbarColor("success");
    });
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  function ControlButtons() {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <ButtonWithHandler
          buttonText="Copy JWT Token"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleJwtTokenCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Decoded Token Data"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleDecodedTokenCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        {!isFullScreen && (
          <ButtonWithHandler
            buttonText="Enter Full Screen"
            variant="outlined"
            size="small"
            startIcon={<OpenInFullIcon />}
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="!hidden md:!flex"
          />
        )}
        {isFullScreen && (
          <ButtonWithHandler
            buttonText="Close Full Screen"
            variant="outlined"
            size="small"
            startIcon={<CloseFullscreenIcon />}
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="!hidden md:!flex"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 w-full ${
        isFullScreen ? "p-3 fixed inset-0 z-50 bg-white h-full" : ""
      }`}
    >
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
        color={snackbarColor}
      />
      <ControlButtons />

      {tokenError && (
        <div className="flex flex-row gap-2">
          <ErrorIcon color="error" />
          <Typography variant="h6" color="error">
            Token is invalid!
          </Typography>
        </div>
      )}

      <div
        className={`flex flex-col w-full h-[20rem] md:h-[30rem] items-center md:flex-row gap-2 ${
          isFullScreen ? "md:h-full" : ""
        }`}
      >
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={{
            language: "text",
            value: rawCode,
            onChange: onRawCodeChange,
            editorOptions: {
              wordWrap: "on",
            },
            className: "w-full h-full",
          }}
          themeOption="vs-dark"
          editorHeading="JWT Token"
          className="w-[80%] md:w-[49%]"
        />
        <div className="flex flex-col gap-2 items-center w-[80%] md:w-[49%] h-full">
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={{
              language: "json",
              value: decodedJwtTokenHeaders,
              onChange: onRawCodeChange,
              editorOptions: {
                wordWrap: "on",
                readOnly: true,
              },
              className: "w-full h-full",
            }}
            themeOption="vs-dark"
            editorHeading="Headers ( Algorithm & Token Type)"
            className="w-full h-full"
          />

          <SingleCodeEditorWithHeaderV2
            codeEditorProps={{
              language: "json",
              value: decodedJwtToken,
              onChange: onRawCodeChange,
              editorOptions: {
                wordWrap: "on",
                readOnly: true,
              },
              className: "w-full h-full",
            }}
            themeOption="vs-dark"
            editorHeading="Token Data"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
