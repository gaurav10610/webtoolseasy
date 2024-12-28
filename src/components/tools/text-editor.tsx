"use client";

import { useState } from "react";
import { SingleCodeEditorWithHeader } from "../codeEditors";
import { CodeEditorProps } from "../lib/editor";
import { SnackBarWithPosition } from "../lib/snackBar";
import { usePathname } from "next/navigation";
import { isMobileDevice } from "@/lib/client-response";
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

export default function TextEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const isMobileView = isMobileDevice();

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

  const [codeEditorProps, setCodeEditorProps] = useState<CodeEditorProps>({
    language: "text",
    value: rawCode,
    onChange: onRawCodeChange,
    sx: {
      height: isMobileView ? "20rem" : "30rem",
    },
    editorOptions: {
      wordWrap: "on",
    },
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
    const file = new Blob([rawCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text-editor.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Remove the element after download
  };

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
    <div className="flex flex-col gap-2 w-full items-center">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <ControlButtons />
      {/* <CodeEditorOptions /> */}
      <SingleCodeEditorWithHeader
        isMobileView={isMobileView}
        codeEditorProps={codeEditorProps}
        themeOption="vs-dark"
        className="w-full"
        sx={{
          height: isMobileView ? "20rem" : "30rem",
          width: isMobileView ? "80%" : "100%",
        }}
      />
    </div>
  );
}
