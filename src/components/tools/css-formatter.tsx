"use client";

import { isMobileDevice } from "@/lib/client-response";
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
import { css_beautify } from "js-beautify";

export default function CssFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const isMobileView = isMobileDevice();

  const initialValue = `@media screen and (min-width:735px){.encoded-token-field{margin-right:30px}}@media screen and (max-width:735px){.token-area-container{flex-direction:column}.encoded-token-field{margin-bottom:20px}}.token-parent-div{width:40%;height:30em}`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [formattedCode, setFormattedCode] = useState(
    css_beautify(codeQueryParam ? decodeText(codeQueryParam) : initialValue)
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const formatJs = () => {
    setFormattedCode(css_beautify(rawCode));
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
      <div
        className="row-display inner-flex-gap full-width"
        style={{
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
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
        firstEditorHeading="Css Code"
        firstEditorProps={{
          language: "css",
          value: rawCode,
          onChange: onRawCodeChange,
          sx: {
            height: isMobileView ? "20rem" : "30rem",
          },
        }}
        secondEditorHeading="Formatted Code"
        secondEditorProps={{
          language: "css",
          value: formattedCode,
          sx: {
            height: isMobileView ? "20rem" : "30rem",
          },
          editorOptions: {
            readOnly: true,
          },
        }}
      />
    </>
  );
}
