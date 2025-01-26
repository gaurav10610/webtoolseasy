"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { ToolComponentProps } from "@/types/component";
import { SnackBarWithPosition } from "../lib/snackBar";
import { usePathname } from "next/navigation";

export default function MarkdownEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `
- ***Online Markdown Editor***
- ***ReadME Editor***
- ***GitHub ReadME***
- ***Bitbucket ReadME***  

[WebToolsEasy](https://webtoolseasy.com) - Free web tools to make work super easy
  `;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState<string | undefined>(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleTextCopy = () => {
    copyToClipboard(rawCode!);
    setSnackBarMessage("Copied Formatted Code to Clipboard!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = () => {
    compressStringToBase64(rawCode!).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  const handleDownloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([rawCode!], { type: "plain/text" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <ButtonWithHandler
          buttonText="Copy Markdown"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleTextCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
        <ButtonWithHandler
          buttonText="Download ReadME File"
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadTextFile}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <ControlButtons />
      <div className="w-full h-[20rem] md:h-[30rem]">
        <MDEditor
          value={rawCode}
          onChange={setRawCode}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          height={"100%"}
        />
      </div>
    </div>
  );
}
