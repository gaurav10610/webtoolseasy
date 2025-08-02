"use client";

import React, { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import { SnackBarWithPosition } from "../lib/snackBar";
import {
  ContentCopy,
  Link as LinkIcon,
  OpenInFull as OpenInFullIcon,
  CloseFullscreen as CloseFullscreenIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";
import { usePathname } from "next/navigation";
import {
  compressStringToBase64,
  copyToClipboard,
  encodeText,
} from "@/util/commonUtils";
import TurndownService from "turndown";

const turndownService = new TurndownService();

function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}

const HtmlToMarkdown: React.FC = () => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
  <head>
    <title>Sample HTML</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a <strong>sample</strong> HTML snippet.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </body>
</html>`);
  const [markdown, setMarkdown] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const currentPath = usePathname();
  const hostname = typeof window !== "undefined" ? window.location.origin : "";

  const handleConvert = () => {
    try {
      const md = htmlToMarkdown(html);
      setMarkdown(md);
      setSnackBarMessage("HTML converted to Markdown successfully!");
      setIsSnackBarOpen(true);
    } catch (e) {
      console.error("Conversion error:", e);
      setSnackBarMessage("Invalid HTML input.");
      setIsSnackBarOpen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setSnackBarMessage("Markdown copied!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = () => {
    compressStringToBase64(html).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <ButtonWithHandler
          buttonText="Convert"
          variant="contained"
          onClick={handleConvert}
          size="small"
          startIcon={<SwapHorizIcon />}
        />
        <ButtonWithHandler
          buttonText="Copy Markdown"
          variant="outlined"
          size="small"
          startIcon={<ContentCopy />}
          onClick={handleCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        <ButtonWithHandler
          buttonText={showPreview ? "Markdown Output" : "Preview Markdown"}
          variant="outlined"
          size="small"
          startIcon={showPreview ? <CodeIcon /> : <VisibilityIcon />}
          onClick={() => setShowPreview((prev) => !prev)}
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
            language: "html",
            value: html,
            onChange: setHtml,
            editorOptions: {
              wordWrap: "on",
            },
            className: "w-full h-full",
          }}
          themeOption="vs-dark"
          editorHeading="HTML Input"
          className="w-[80%] md:w-[49%]"
        />
        {!showPreview ? (
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={{
              language: "markdown",
              value: markdown,
              onChange: () => {},
              editorOptions: {
                readOnly: true,
              },
              className: "w-full h-full",
            }}
            themeOption="vs-dark"
            editorHeading="Markdown Output"
            className="w-[80%] md:w-[49%]"
          />
        ) : (
          <div className="w-[80%] md:w-[49%] h-full flex flex-col gap-2 justify-end">
            <Typography
              variant="body1"
              color="textSecondary"
              className="!text-xl !font-semibold flex items-center"
            >
              <VisibilityIcon className="mr-2 text-gray-500" fontSize="small" />
              Markdown Preview
            </Typography>
            <div className="flex-1 overflow-auto bg-white border-2 border-gray-300 rounded-md p-4 prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlToMarkdown;
