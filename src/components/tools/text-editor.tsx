"use client";

import { useState } from "react";
import { SnackBarWithPosition } from "../lib/snackBar";
import { usePathname } from "next/navigation";
import { ToolComponentProps } from "@/types/component";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { CodeEditorPropsV2 } from "../lib/editor";

export default function TextEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue =
    "This is an online text editor offered by WebToolsEasy. Write your text here....";

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const [codeEditorProps, setCodeEditorProps] = useState<CodeEditorPropsV2>({
    language: "text/plain",
    value: rawCode,
    onChange: onRawCodeChange,
    editorOptions: {
      wordWrap: "on",
    },
    className: "w-full h-full",
  });

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleTextCopy = () => {
    copyToClipboard(rawCode);
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

  const handleDownloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([rawCode], { type: "plain/text" });
    element.href = URL.createObjectURL(file);
    element.download = "text-editor.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Remove the element after download
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  function ControlButtons() {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <ButtonWithHandler
          buttonText="Copy Text"
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
          buttonText="Download Text File"
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadTextFile}
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

  const handleFontSizeChange = (event: SelectChangeEvent<number>) => {
    setCodeEditorProps({
      ...codeEditorProps,
      editorOptions: {
        ...codeEditorProps.editorOptions,
        fontSize: event.target.value as number,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const CodeEditorOptions = () => {
    return (
      <div className="flex flex-row w-full">
        <FormControl
          variant="outlined"
          size="small"
          classes={{ root: "w-full md:w-1/5" }}
        >
          <InputLabel id="font-size-label">Font Size</InputLabel>
          <Select
            labelId="font-size-label"
            id="font-size"
            value={14}
            onChange={handleFontSizeChange}
            label="Font Size"
            color="primary"
          >
            {[10, 12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col gap-3 w-full items-center ${
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
      <SingleCodeEditorWithHeaderV2
        codeEditorProps={codeEditorProps}
        themeOption="vs-dark"
        editorHeading="Javascript Code"
        className={`w-[80%] md:w-full h-[30rem] ${
          isFullScreen ? "md:h-full" : ""
        }`}
      />
    </div>
  );
}
