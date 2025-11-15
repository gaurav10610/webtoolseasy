"use client";

import { useCallback, useMemo, useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
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
  // dependency missing
}

export default function JsonToYaml({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>): React.ReactElement {
  const initialJsonValue = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "skills": ["JavaScript", "React", "Node.js"],
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  }
}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialJsonValue,
  });

  const [outputCode, setOutputCode] = useState("");
  const [outputLanguage, setOutputLanguage] = useState<"yaml" | "json">("yaml");
  const [snackBarColor, setSnackBarColor] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  // Convert JSON to YAML
  const convertToYaml = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const yamlOutput = jsYamlDump(parsed);
      setOutputCode(yamlOutput);
      setOutputLanguage("yaml");
      toolState.actions.showMessage("Converted to YAML successfully!");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid JSON format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [toolState]);

  // Convert YAML to JSON
  const convertToJson = useCallback(() => {
    try {
      const parsed = jsYamlLoad(toolState.code);
      const jsonOutput = JSON.stringify(parsed, null, 2);
      setOutputCode(jsonOutput);
      setOutputLanguage("json");
      toolState.actions.showMessage("Converted to JSON successfully!");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid YAML format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [toolState]);

  // Format JSON
  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const formatted = JSON.stringify(parsed, null, 2);
      toolState.setCode(formatted);
      toolState.actions.showMessage("JSON formatted successfully!");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid JSON format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [toolState]);

  // Format YAML
  const formatYaml = useCallback(() => {
    try {
      const parsed = jsYamlLoad(toolState.code);
      const formatted = jsYamlDump(parsed);
      toolState.setCode(formatted);
      toolState.actions.showMessage("YAML formatted successfully!");
      setSnackBarColor("success");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid YAML format";
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [toolState]);

  // Copy output
  const copyOutput = useCallback(() => {
    toolState.actions.copyText(
      outputCode,
      `${outputLanguage.toUpperCase()} copied to clipboard!`
    );
  }, [outputCode, outputLanguage, toolState.actions]);

  // Download output
  const downloadOutput = useCallback(() => {
    const blob = new Blob([outputCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${outputLanguage === "yaml" ? "yml" : "json"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(`Downloaded as ${a.download}`);
  }, [outputCode, outputLanguage, toolState.actions]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language:
      toolState.code.trim().startsWith("{") ||
      toolState.code.trim().startsWith("[")
        ? "json"
        : "yaml",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const outputEditorProps = useEditorConfig({
    language: outputLanguage,
    value: outputCode,
    onChange: () => {}, // Read-only
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Convert to YAML",
        onClick: convertToYaml,
        icon: <SwapHorizIcon />,
      },
      {
        type: "custom" as const,
        text: "Convert to JSON",
        onClick: convertToJson,
        icon: <SwapHorizIcon />,
      },
      {
        type: "custom" as const,
        text: "Format JSON",
        onClick: formatJson,
        icon: <FormatAlignCenterIcon />,
      },
      {
        type: "custom" as const,
        text: "Format YAML",
        onClick: formatYaml,
        icon: <FormatAlignCenterIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy Output",
        onClick: copyOutput,
      },
      {
        type: "custom" as const,
        text: "Download",
        onClick: downloadOutput,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      convertToYaml,
      convertToJson,
      formatJson,
      formatYaml,
      copyOutput,
      downloadOutput,
      toolState,
    ]
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
        title="JSON to YAML Converter"
        description="Convert between JSON and YAML formats online. Free bidirectional converter with validation and formatting."
        exampleCode='{"name": "John", "age": 30}'
        exampleOutput="name: John\nage: 30"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={inputEditorProps}
            themeOption="vs-dark"
            editorHeading="Input (JSON or YAML)"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={outputEditorProps}
            themeOption="vs-dark"
            editorHeading={`Output (${outputLanguage.toUpperCase()})`}
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
