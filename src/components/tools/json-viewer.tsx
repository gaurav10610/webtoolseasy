"use client";

import { ToolComponentProps } from "@/types/component";
import { Typography } from "@mui/material";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import { allExpanded, defaultStyles, JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { SnackBarWithPosition } from "../lib/snackBar";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function JsonViewer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `{"role":"admin","issuer":"sample issuer","username":"username@webtoolseasy.com","exp":1668942423,"iat":1668942423,"colors":{"primary":"indigo","warn":"red","accent":"pink"}}`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const onRawCodeChange = (value: string) => {
    try {
      JSON.parse(value);
      setRawCode(value);
    } catch (e) {
      console.error(`invalid json`, e);
    }
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleFormattedCodeCopy = () => {
    copyToClipboard(JSON.stringify(JSON.parse(rawCode), null, 2));
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
        <div className="flex flex-col gap-2 h-full w-[80%] md:w-[49%]">
          <Typography
            variant="body1"
            color="textSecondary"
            className="!text-xl !font-semibold"
          >
            Json Viewer
          </Typography>
          <JsonView
            data={JSON.parse(rawCode)}
            shouldExpandNode={allExpanded}
            style={{
              ...defaultStyles,
              container:
                "w-full h-full overflow-y-scroll border-2 border-gray-300 p-2",
            }}
          />
        </div>
      </div>
    </div>
  );
}
