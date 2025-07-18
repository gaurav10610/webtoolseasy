"use client";

import React, { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JsonFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [formattedCode, setFormattedCode] = useState(
    JSON.stringify(
      JSON.parse(codeQueryParam ? decodeText(codeQueryParam) : initialValue),
      null,
      4
    )
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const formatJs = () => {
    setFormattedCode(JSON.stringify(JSON.parse(rawCode), null, 4));
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleFormattedCodeCopy = () => {
    copyToClipboard(formattedCode);
    setSnackBarMessage("Copied Formatted Code to Clipboard!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = () => {
    compressStringToBase64(rawCode).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  function ControlButtons() {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <ButtonWithHandler
          buttonText="Format Code"
          variant="contained"
          onClick={formatJs}
          size="small"
          startIcon={<FormatAlignCenterIcon />}
        />
        <ButtonWithHandler
          buttonText="Copy Formatted Code"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleFormattedCodeCopy}
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
      />
      <ControlButtons />
      <div
        className={`flex flex-col w-full h-[20rem] md:h-[30rem] items-center md:flex-row gap-2 ${
          isFullScreen ? "md:h-full" : ""
        }`}
      >
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={{
            language: "json",
            value: rawCode,
            onChange: onRawCodeChange,
            editorOptions: {
              wordWrap: "on",
            },
            className: "w-full h-full",
          }}
          themeOption="vs-dark"
          editorHeading="JSON Code"
          className="w-[80%] md:w-[49%]"
        />
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={{
            language: "json",
            value: formattedCode,
            editorOptions: {
              wordWrap: "on",
            },
            className: "w-full h-full",
          }}
          themeOption="vs-dark"
          editorHeading="Formatted Code"
          className="w-[80%] md:w-[49%]"
        />
      </div>
    </div>
  );
}
