"use client";

import { Button, Typography } from "@mui/material";
import { CodeEditor } from "../lib/editor";
import { isMobileDevice } from "@/lib/client-response";
import { useRef, useState } from "react";
import { monaco } from "react-monaco-editor";
import { js_beautify } from "js-beautify";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

export default function JavaScriptFormatter() {
  const isMobileView = isMobileDevice();

  const initialValue =
    "if(value==='webtoolseasy'){formatjs();}else{console.log('this is awesome');}";

  const [rawCode, setRawCode] = useState(initialValue);
  const [formattedCode, setFormattedCode] = useState(js_beautify(initialValue));
  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
  });
  const [themeOption, setThemeOption] = useState("vs-dark");

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const formatJs = () => {
    setFormattedCode(js_beautify(rawCode));
  };

  return (
    <div className="column-display base-flex-gap full-width flex-vr-center">
      {/* Buttons group */}
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
          buttonText="Copy Code"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
        />
      </div>
      <div
        className="row-display base-flex-gap flex-hz-center full-width flex-vr-center"
        style={{
          flexDirection: isMobileView ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        {/* Unformatted Javascript Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "80%" : "49%",
          }}
        >
          <Typography variant="body2" fontSize={"inherit"}>
            Javascript Code
          </Typography>
          <CodeEditor
            language="javascript"
            value={initialValue}
            onChange={onRawCodeChange}
            sx={{ height: "30rem" }}
            editorOptions={editorOptions}
            theme={themeOption}
          />
        </div>

        {/* Formatted Javascript Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "80%" : "49%",
          }}
        >
          <Typography variant="body2" fontSize={"inherit"}>
            Formatted Javascript
          </Typography>
          <CodeEditor
            language="javascript"
            value={formattedCode}
            sx={{ height: "30rem" }}
            editorOptions={editorOptions}
            theme={themeOption}
          />
        </div>
      </div>
    </div>
  );
}
