"use client";

import { DiffEditorsWithHeader } from "../codeEditors";
import { DiffEditorProps } from "../lib/editor";

export default function TextCompare() {
  const originalText = `This was original data!\nwebtoolseasy is awesome`;
  const modifiedText = `This was modified data!\nwebtoolseasy is super cool`;

  const diffEditorProps: DiffEditorProps = {
    original: originalText,
    value: modifiedText,
    language: "text/plain",
  };

  return (
    <div className="h-[20rem] w-full flex flex-row justify-center md:h-[30rem]">
      <DiffEditorsWithHeader
        firstTextHeading="Original"
        secondTextHeading="Modified"
        themeOption="light"
        diffEditorProps={diffEditorProps}
        className="w-[80%] md:w-full"
      />
    </div>
  );
}
