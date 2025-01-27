"use client";

import { ToolComponentProps } from "@/types/component";
import {
  decodeText,
  copyToClipboard,
  compressStringToBase64,
  encodeText,
} from "@/util/commonUtils";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { js_beautify } from "js-beautify";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import IFrameWithLabel from "../iFrame";
import { ButtonWithHandler } from "../lib/buttons";
import { CodeEditorPropsV2 } from "../lib/editor";
import { SnackBarWithPosition } from "../lib/snackBar";

export default function JavascriptCompiler({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const getHtmlTemplate = (jsCode: string) => {
    return `
  <!DOCTYPE html>
  <html>

  <head>
      <title>Page Title</title>
  </head>

  <body>
      <script>
          window.console.log = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.debug = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.error = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.info = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.trace = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          window.console.warn = function(arg, ...optionalParams) {
              let par = document.createElement("p");
              if (optionalParams) {
                  let newText = '';
                  if (Array.isArray(optionalParams)) {
                      for (let i = 0; i < optionalParams.length; i++) {
                          newText = newText + ' ' + JSON.stringify(optionalParams[i]);
                      }
                  } else {
                      newText = JSON.stringify(optionalParams)
                  }

                  arg = arg + " " + newText;
              }
              let text = document.createTextNode(arg);
              par.appendChild(text);
              document.body.appendChild(par);
          };

          try {
              ${jsCode}
          } catch (error) {
              console.log(error);
              console.log(error.stack);
          }
      </script>
  </body>

  </html>
        `;
  };

  const initialValue = `
  /**
   * This is an Online Javascript Compiler offered by WebToolsEasy
   */
  const obj = {
      appName: 'WebToolsEasy'
  }
  
  console.log("Welcome to WebToolsEasy!", obj);
  `;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const [codeEditorProps, setCodeEditorProps] = useState<CodeEditorPropsV2>({
    language: "javascript",
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
      js_beautify(rawCode, {
        indent_size: 10,
        wrap_line_length: 80,
      })
    );
  };

  const [iFrameSourceCode, setIFrameSourceCode] = useState(
    getHtmlTemplate(rawCode)
  );

  const runCode = () => {
    setIFrameSourceCode(getHtmlTemplate(rawCode));
  };

  function ControlButtons() {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <ButtonWithHandler
          buttonText="Run Code"
          variant="contained"
          size="small"
          startIcon={<PlayArrowIcon />}
          onClick={runCode}
        />
        <ButtonWithHandler
          buttonText="Format Code"
          variant="outlined"
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
            editorHeading="Javascript Code"
          />
        </div>
        <div className="w-[80%] h-[20rem] md:w-[49%] md:h-[30rem]">
          <IFrameWithLabel
            iFrameSourceDoc={iFrameSourceCode}
            heading="Console Output"
          />
        </div>
      </div>
    </div>
  );
}
