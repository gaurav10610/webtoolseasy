"use client";

import { ToolComponentProps } from "@/types/component";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CodeEditorPropsV2 } from "../lib/editor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import { ButtonWithHandler } from "../lib/buttons";
import { SnackBarWithPosition } from "../lib/snackBar";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import IFrameWithLabel from "../iFrame";
import { html_beautify } from "js-beautify";
import CodeIcon from "@mui/icons-material/Code";

export default function HtmlEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>This is an Online HTML Editor</h1>
    <p style="color:red">
        WebToolsEasy is Great. Explore more such free tools.
    </p>
</body>
</html>`;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const [codeEditorProps, setCodeEditorProps] = useState<CodeEditorPropsV2>({
    language: "html",
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

  const formatCode = () => {
    setRawCode(
      html_beautify(rawCode, {
        indent_size: 10,
        wrap_line_length: 80,
      })
    );
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <ButtonWithHandler
          buttonText="Format Code"
          variant="contained"
          size="small"
          startIcon={<CodeIcon />}
          onClick={formatCode}
        />
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <ControlButtons />
      <div className="flex flex-col gap-2 w-full items-center md:flex-row">
        <div className="w-[80%] h-[20rem] md:w-[49%] md:h-[30rem]">
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={codeEditorProps}
            themeOption="vs-dark"
            editorHeading="HTML Code"
          />
        </div>
        <div className="w-[80%] h-[20rem] md:w-[49%] md:h-[30rem]">
          <IFrameWithLabel iFrameSourceDoc={rawCode} heading="HTML Preview" />
        </div>
      </div>
    </div>
  );
}
