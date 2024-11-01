"use client";

import { isMobileDevice } from "@/lib/client-response";
import { useState } from "react";
import { js_beautify } from "js-beautify";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { TwoCodeEditors } from "../codeEditors";

function ControlButtons({
  isMobileView,
  formatJs,
}: Readonly<{
  isMobileView: boolean;
  formatJs: () => void;
}>) {
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
  );
}

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
    <TwoCodeEditors
      buttons={
        <ControlButtons isMobileView={isMobileView} formatJs={formatJs} />
      }
      firstEditorHeading="Javascript Code"
      firstEditorProps={{
        language: "javascript",
        value: initialValue,
        onChange: onRawCodeChange,
        editorOptions,
        theme: themeOption,
        sx: {
          height: "30rem",
        },
      }}
      secondEditorHeading="Formatted Code"
      secondEditorProps={{
        language: "javascript",
        value: formattedCode,
        editorOptions,
        theme: themeOption,
        sx: {
          height: "30rem",
        },
      }}
    />
  );
}
