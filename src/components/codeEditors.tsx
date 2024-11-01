"use client";

import { isMobileDevice } from "@/lib/client-response";
import { CodeEditor, CodeEditorProps } from "./lib/editor";
import { Typography } from "@mui/material";

export function TwoCodeEditors({
  buttons,
  firstEditorHeading,
  firstEditorProps,
  secondEditorHeading,
  secondEditorProps,
}: Readonly<{
  buttons?: React.ReactNode;
  firstEditorHeading?: string;
  firstEditorProps: CodeEditorProps;
  secondEditorHeading?: string;
  secondEditorProps: CodeEditorProps;
}>) {
  const isMobileView = isMobileDevice();

  return (
    <div className="column-display base-flex-gap full-width flex-vr-center">
      {/* Buttons group */}
      {buttons && (
        <div
          className="row-display inner-flex-gap full-width"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          {buttons}
        </div>
      )}
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
          {firstEditorHeading && (
            <Typography variant="body2" fontSize={"inherit"}>
              {firstEditorHeading}
            </Typography>
          )}
          <CodeEditor
            language={firstEditorProps.language}
            value={firstEditorProps.value}
            onChange={firstEditorProps.onChange}
            sx={firstEditorProps.sx}
            editorOptions={firstEditorProps.editorOptions}
            theme={firstEditorProps.theme}
            handleEditorDidMount={firstEditorProps.handleEditorDidMount}
          />
        </div>

        {/* Formatted Javascript Block */}
        <div
          className="column-display base-flex-gap"
          style={{
            width: isMobileView ? "80%" : "49%",
          }}
        >
          {secondEditorHeading && (
            <Typography variant="body2" fontSize={"inherit"}>
              {secondEditorHeading}
            </Typography>
          )}
          <CodeEditor
            language={secondEditorProps.language}
            value={secondEditorProps.value}
            onChange={secondEditorProps.onChange}
            sx={secondEditorProps.sx}
            editorOptions={secondEditorProps.editorOptions}
            theme={secondEditorProps.theme}
            handleEditorDidMount={secondEditorProps.handleEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
}
