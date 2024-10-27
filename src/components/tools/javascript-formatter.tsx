"use client";

import { Typography } from "@mui/material";
import { CodeEditor } from "../lib/editor";
import { isMobileDevice } from "@/lib/client-response";
import { useState } from "react";

export default function JavaScriptFormatter() {
  const isMobileView = isMobileDevice();

  const initialValue =
    "if(value==='webtoolseasy'){formatjs();}else{console.log('this is awesome');}";
  const [formattedCode, setFormattedCode] = useState("");
  const [editorOptions, setEditorOptions] = useState({
    fontSize: 16,
  });
  const [themeOption, setThemeOption] = useState("vs-dark");

  const [rawCode, setRawCode] = useState(initialValue);

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  return (
    <div className="column-display base-flex-gap full-width flex-vr-center">
      <div
        className="row-display base-flex-gap flex-hz-center"
        style={{
          width: "80%",
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        {/* Unformatted Javascript Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "100%" : "48%",
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
            width: isMobileView ? "100%" : "48%",
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
