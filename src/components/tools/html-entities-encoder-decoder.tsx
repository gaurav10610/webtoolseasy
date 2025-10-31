"use client";

import { useState, useCallback, useMemo } from "react";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

const HTML_ENTITIES: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "¢": "&cent;",
  "£": "&pound;",
  "¥": "&yen;",
  "€": "&euro;",
  "©": "&copy;",
  "®": "&reg;",
  "™": "&trade;",
  "°": "&deg;",
  "±": "&plusmn;",
  "×": "&times;",
  "÷": "&divide;",
  µ: "&micro;",
  "¶": "&para;",
  "§": "&sect;",
  "·": "&middot;",
  "¼": "&frac14;",
  "½": "&frac12;",
  "¾": "&frac34;",
};

export default function HtmlEntitiesEncoderDecoder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<div class="example">
  <h1>Hello & Welcome!</h1>
  <p>This is a "test" with special characters: <>&</p>
  <p>Price: $100 © 2024</p>
</div>`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [output, setOutput] = useState("");

  // Handle code change
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
    },
    [toolState]
  );

  const handleOutputChange = useCallback((value: string) => {
    setOutput(value);
  }, []);

  // Editor configuration for input
  const inputEditorProps = useEditorConfig({
    language: "html",
    value: toolState.code,
    onChange: handleCodeChange,
  });

  // Editor configuration for output
  const outputEditorProps = useEditorConfig({
    language: "html",
    value: output,
    onChange: handleOutputChange,
  });

  const encodeHtml = useCallback(() => {
    if (!toolState.code) {
      toolState.actions.showMessage("Please enter text to encode");
      return;
    }

    let encoded = toolState.code;

    // First encode ampersands
    encoded = encoded.replace(/&/g, HTML_ENTITIES["&"]);

    // Then encode other entities
    Object.entries(HTML_ENTITIES).forEach(([char, entity]) => {
      if (char !== "&") {
        encoded = encoded.replace(new RegExp(char, "g"), entity);
      }
    });

    setOutput(encoded);
    toolState.actions.showMessage("Text encoded successfully!");
  }, [toolState]);

  const decodeHtml = useCallback(() => {
    if (!toolState.code) {
      toolState.actions.showMessage("Please enter text to decode");
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.innerHTML = toolState.code;
    const decoded = textarea.value;

    setOutput(decoded);
    toolState.actions.showMessage("Text decoded successfully!");
  }, [toolState]);

  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Encode",
        onClick: encodeHtml,
        icon: <CodeIcon />,
        variant: "contained" as const,
        color: "primary" as const,
      },
      {
        type: "custom" as const,
        text: "Decode",
        onClick: decodeHtml,
        icon: <CodeOffIcon />,
        variant: "contained" as const,
        color: "secondary" as const,
      },
      ...createCommonButtons({
        onCopy: () => toolState.actions.copyText(output || toolState.code),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [toolState, output, encodeHtml, decodeHtml]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="HTML Entities Encoder Decoder"
        description="Encode special characters to HTML entities and decode HTML entities back to text. Essential for web development and security."
        exampleCode='<div>Hello & "World"</div>'
        exampleOutput='&lt;div&gt;Hello &amp; "World"&lt;/div&gt;'
      />

      <div className="flex flex-col gap-4 w-full">
        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        <CodeEditorLayout
          isFullScreen={toolState.isFullScreen}
          leftPanel={
            <SingleCodeEditorWithHeaderV2
              codeEditorProps={inputEditorProps}
              themeOption="vs-dark"
              editorHeading="Input"
              className={
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }
            />
          }
          rightPanel={
            <SingleCodeEditorWithHeaderV2
              codeEditorProps={outputEditorProps}
              themeOption="vs-dark"
              editorHeading="Output"
              className={
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }
            />
          }
        />

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-gray-700">
            <strong>Common HTML Entities:</strong>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              <div>
                <code>&lt;</code> = <code>&amp;lt;</code>
              </div>
              <div>
                <code>&gt;</code> = <code>&amp;gt;</code>
              </div>
              <div>
                <code>&amp;</code> = <code>&amp;amp;</code>
              </div>
              <div>
                <code>&quot;</code> = <code>&amp;quot;</code>
              </div>
              <div>
                <code>&apos;</code> = <code>&amp;#39;</code>
              </div>
              <div>
                <code>©</code> = <code>&amp;copy;</code>
              </div>
              <div>
                <code>®</code> = <code>&amp;reg;</code>
              </div>
              <div>
                <code>€</code> = <code>&amp;euro;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
