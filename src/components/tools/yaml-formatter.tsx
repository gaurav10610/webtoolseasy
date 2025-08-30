"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

type JsYamlLoadFn = (input: string) => unknown;
type JsYamlDumpFn = (input: unknown) => string;
let jsYamlLoad: JsYamlLoadFn = () => {
  throw new Error("js-yaml not available");
};
let jsYamlDump: JsYamlDumpFn = () => {
  throw new Error("js-yaml not available");
};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const mod = require("js-yaml");
  if (mod) {
    jsYamlLoad = mod.load as JsYamlLoadFn;
    jsYamlDump = mod.dump as JsYamlDumpFn;
  }
} catch {
  // dependency missing; exceptions will be thrown if used
}

export default function YamlFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `name: John Doe\nage: 30\nskills:\n  - JavaScript\n  - React\n  - Node.js\nactive: true`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      const obj = jsYamlLoad(toolState.code);
      return jsYamlDump(obj);
    } catch {
      return "";
    }
  });

  const formatYaml = useCallback(() => {
    try {
      const parsed = jsYamlLoad(toolState.code);
      const formatted = jsYamlDump(parsed);
      setFormattedCode(formatted);
      toolState.actions.showMessage("YAML formatted successfully!");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid YAML format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
      setFormattedCode("Invalid YAML");
    }
  }, [toolState]);

  const validateYaml = useCallback(() => {
    try {
      jsYamlLoad(toolState.code);
      toolState.actions.showMessage("YAML is valid");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid YAML format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [toolState]);

  const copyFormatted = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted YAML copied to clipboard!"
    );
  }, [formattedCode, toolState.actions]);

  const [snackBarColor, setSnackBarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const rawEditorProps = useEditorConfig({
    language: "yaml",
    value: toolState.code,
    onChange: toolState.setCode,
  });
  const formattedEditorProps = useEditorConfig({
    language: formattedCode.trim().startsWith("{") ? "json" : "yaml",
    value: formattedCode,
    onChange: () => {},
  });

  const buttons = useMemo(
    () => [
      { type: "custom" as const, text: "Format YAML", onClick: formatYaml },
      { type: "custom" as const, text: "Validate YAML", onClick: validateYaml },

      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormatted,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatYaml, validateYaml, copyFormatted, toolState]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
        color: snackBarColor,
      }}
    >
      <SEOContent
        title="YAML Formatter & Validator"
        description="Format, validate and convert YAML online. Beautify YAML, detect syntax errors, and convert to JSON in the browser."
        exampleCode={initialValue}
        exampleOutput={jsYamlDump(jsYamlLoad(initialValue))}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="Raw YAML"
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            editorHeading="Formatted Output"
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
