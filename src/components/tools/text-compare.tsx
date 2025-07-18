"use client";

import { DiffEditorsWithHeader } from "../codeEditors";
import { DiffEditorProps } from "../lib/editor";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";

export default function TextCompare() {
  const originalText = `This was original data!\nwebtoolseasy is awesome`;
  const modifiedText = `This was modified data!\nwebtoolseasy is super cool`;

  const diffEditorProps: DiffEditorProps = {
    original: originalText,
    value: modifiedText,
    language: "text/plain",
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  function ControlButtons() {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
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
      <ControlButtons />
      <div
        className={`w-full h-[20rem] md:h-[30rem] ${
          isFullScreen ? "md:h-full" : ""
        }`}
      >
        <DiffEditorsWithHeader
          firstTextHeading="Original"
          secondTextHeading="Modified"
          themeOption="light"
          diffEditorProps={diffEditorProps}
          className="w-[80%] md:w-full"
        />
      </div>
    </div>
  );
}
