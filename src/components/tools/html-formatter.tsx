"use client";

import React, { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { TwoCodeEditors } from "../codeEditors";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";
import { html_beautify } from "js-beautify";

export default function HtmlFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<html><head><title>Online HTML Formatter</title></head><body><p>webtoolseasy is awesome!</p></p></body></html>`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [formattedCode, setFormattedCode] = useState(
    html_beautify(codeQueryParam ? decodeText(codeQueryParam) : initialValue)
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const formatJs = () => {
    setFormattedCode(html_beautify(rawCode));
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
      </div>
    );
  }

  return (
    <>
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <TwoCodeEditors
        buttons={<ControlButtons />}
        firstEditorHeading="HTML Code"
        firstEditorProps={{
          language: "html",
          value: rawCode,
          onChange: onRawCodeChange,
          className: "h-[20rem] md:h-[30rem]",
          editorOptions: {
            wordWrap: "on",
          },
        }}
        secondEditorHeading="Formatted Code"
        secondEditorProps={{
          language: "html",
          value: formattedCode,
          className: "h-[20rem] md:h-[30rem]",
          editorOptions: {
            readOnly: true,
          },
        }}
      />
    </>
  );
}
