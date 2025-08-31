"use client";

import { useCallback, useMemo, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { SelectWithLabel } from "@/components/lib/select";

type Lang = "javascript" | "css" | "html";

const SAMPLE: Record<Lang, string> = {
  javascript: `// Example JavaScript\nfunction greet(name) {\n  // greet user\n  console.log('Hello, ' + name);\n}\n\ngreet('World');`,
  css: `/* Example CSS */\n.container {\n  display: flex;\n  margin: 10px;\n}\n.item {\n  color: #333;\n}`,
  html: `<!-- Example HTML -->\n<!doctype html>\n<html>\n  <head>\n    <title>Example</title>\n  </head>\n  <body>\n    <div class=\"container\">\n      <p>Hello World</p>\n    </div>\n  </body>\n</html>`,
};

function minifyJs(input: string) {
  if (!input) return "";
  let s = input.replace(/\/\*[\s\S]*?\*\//g, ""); // remove block comments
  s = s.replace(/\/\/.*$/gm, ""); // remove line comments
  s = s.replace(/\s+/g, " ");
  s = s.replace(/\s*([=+\-*/{}();,:<>\[\]])\s*/g, "$1");
  return s.trim();
}

function minifyCss(input: string) {
  if (!input) return "";
  let s = input.replace(/\/\*[\s\S]*?\*\//g, "");
  s = s.replace(/\s+/g, " ");
  s = s.replace(/\s*([{}:;,])\s*/g, "$1");
  s = s.replace(/;}/g, "}");
  return s.trim();
}

function minifyHtml(input: string) {
  if (!input) return "";
  let s = input.replace(/<!--([\s\S]*?)-->/g, "");
  s = s.replace(/>\s+</g, "><");
  s = s.replace(/\s{2,}/g, " ");
  return s.trim();
}

export default function CodeMinifier({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialLang: Lang = "javascript";
  const initialValue = SAMPLE[initialLang];

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [lang, setLang] = useState<Lang>(initialLang);
  const [minified, setMinified] = useState<string>("");

  const rawEditorProps = useEditorConfig({
    language:
      lang === "javascript" ? "javascript" : lang === "css" ? "css" : "html",
    value: toolState.code,
    onChange: toolState.setCode,
  });
  const minifiedEditorProps = useEditorConfig({
    language: rawEditorProps.language,
    value: minified,
    onChange: () => {},
  });

  const doMinify = useCallback(() => {
    const src = toolState.code || "";
    let res = "";
    if (lang === "javascript") res = minifyJs(src);
    else if (lang === "css") res = minifyCss(src);
    else res = minifyHtml(src);
    setMinified(res);
    toolState.actions.showMessage("Minified successfully");
  }, [lang, toolState]);

  const doClear = useCallback(() => {
    toolState.setCode("");
    setMinified("");
    toolState.actions.showMessage("Cleared");
  }, [toolState]);

  const copyMinified = useCallback(() => {
    toolState.actions.copyText(minified, "Minified code copied to clipboard!");
  }, [minified, toolState.actions]);

  const buttons = useMemo(() => {
    const custom = [
      { type: "custom" as const, text: "Minify", onClick: doMinify },
      {
        type: "custom" as const,
        text: "Copy Minified",
        onClick: copyMinified,
        icon: <ContentCopyIcon />,
      },
      {
        type: "custom" as const,
        text: "Clear",
        onClick: doClear,
        icon: <CloseIcon />,
        variant: "outlined" as const,
        color: "error" as const,
      },
    ];
    return [
      ...custom,
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ];
  }, [doMinify, copyMinified, doClear, toolState]);

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
        title="Code Minifier"
        description="Minify JavaScript, CSS, and HTML online. Remove comments and whitespace to reduce file size for production."
        exampleCode={initialValue}
        exampleOutput={"Minified output"}
      />

      <div className="flex flex-col gap-3 mb-3 md:flex-row md:items-center md:justify-between">
        <SelectWithLabel
          options={[
            { key: "js", value: "javascript", label: "JavaScript" },
            { key: "css", value: "css", label: "CSS" },
            { key: "html", value: "html", label: "HTML" },
          ]}
          value={lang}
          onChange={(e: SelectChangeEvent<string>) => {
            const v = e.target.value as Lang;
            setLang(v);
            toolState.setCode(SAMPLE[v]);
          }}
          selectLabel="Language"
          className="w-full md:w-48"
        />
        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />
      </div>

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw Code"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={minifiedEditorProps}
            themeOption="vs-dark"
            editorHeading="Minified Code"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
