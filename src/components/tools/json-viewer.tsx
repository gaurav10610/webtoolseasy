"use client";

import { ToolComponentProps } from "@/types/component";
import { SingleCodeEditorWithHeader } from "../codeEditors";
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <ControlButtons />
      <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center">
        <SingleCodeEditorWithHeader
          editorHeading="Json Code"
          themeOption="vs-dark"
          editorOptions={{
            fontSize: 14,
          }}
          codeEditorProps={{
            language: "json",
            value: rawCode,
            onChange: onRawCodeChange,
            className: "h-[20rem] md:h-[30rem]",
            editorOptions: {
              wordWrap: "on",
            },
          }}
        />
        <div className="flex flex-col gap-2 w-[80%] md:w-[49%]">
          <Typography variant="body2" fontSize={"inherit"} color="primary">
            Json Viewer
          </Typography>
          <div className="flex flex-col gap-2 w-full h-[20rem] md:h-[30rem] border-2 border-gray-300">
            <JsonView
              data={JSON.parse(rawCode)}
              shouldExpandNode={allExpanded}
              style={{
                ...defaultStyles,
                container: "w-full h-full overflow-y-scroll",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
