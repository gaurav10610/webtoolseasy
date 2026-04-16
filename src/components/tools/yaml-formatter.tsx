"use client";

import { useCallback, useMemo, useState } from "react";
import { Alert, TextField } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, CodeEditorLayout } from "../common/ToolLayout";
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
  const [schemaText, setSchemaText] = useState(`type: object
required:
  - name
  - age
properties:
  name:
    type: string
  age:
    type: number
  skills:
    type: array`);
  const [schemaIssues, setSchemaIssues] = useState<string[]>([]);
  const [schemaChecked, setSchemaChecked] = useState(false);

  const getValueType = useCallback((value: unknown): string => {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  }, []);

  const validateSchemaObject = useCallback(
    (value: unknown, schema: Record<string, unknown>, path = "root") => {
      const issues: string[] = [];
      const expectedType = schema.type as string | undefined;
      const actualType = getValueType(value);

      if (expectedType && actualType !== expectedType) {
        issues.push(
          `${path} should be ${expectedType}, received ${actualType}.`,
        );
        return issues;
      }

      if (
        Array.isArray(schema.required) &&
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        for (const key of schema.required as string[]) {
          if (!(key in (value as Record<string, unknown>))) {
            issues.push(`${path}.${key} is required.`);
          }
        }
      }

      if (
        schema.properties &&
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        Object.entries(
          schema.properties as Record<string, Record<string, unknown>>,
        ).forEach(([key, childSchema]) => {
          if (key in (value as Record<string, unknown>)) {
            issues.push(
              ...validateSchemaObject(
                (value as Record<string, unknown>)[key],
                childSchema,
                `${path}.${key}`,
              ),
            );
          }
        });
      }

      if (schema.items && Array.isArray(value)) {
        value.forEach((item, index) => {
          issues.push(
            ...validateSchemaObject(
              item,
              schema.items as Record<string, unknown>,
              `${path}[${index}]`,
            ),
          );
        });
      }

      return issues;
    },
    [getValueType],
  );

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

  const validateSchemaCheck = useCallback(() => {
    try {
      const parsedYaml = jsYamlLoad(toolState.code);
      const parsedSchema = jsYamlLoad(schemaText) as Record<string, unknown>;
      const issues = validateSchemaObject(parsedYaml, parsedSchema);
      setSchemaIssues(issues);
      setSchemaChecked(true);
      toolState.actions.showMessage(
        issues.length === 0
          ? "Schema check passed successfully!"
          : `Schema check found ${issues.length} issue(s).`,
      );
      setSnackBarColor(issues.length === 0 ? "success" : "warning");
    } catch (e) {
      const msg = (e as Error)?.message || "Invalid schema definition";
      setSchemaIssues([msg]);
      setSchemaChecked(true);
      toolState.actions.showMessage(msg);
      setSnackBarColor("error");
    }
  }, [schemaText, toolState, validateSchemaObject]);

  const copyFormatted = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted YAML copied to clipboard!",
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
        text: "Schema Check",
        onClick: validateSchemaCheck,
      },

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
    [formatYaml, validateYaml, validateSchemaCheck, copyFormatted, toolState],
  );

  const formattedPreview =
    formattedCode || "Formatted YAML output will appear here.";

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
      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <TextField
          label="Optional schema (YAML or JSON)"
          multiline
          minRows={6}
          fullWidth
          value={schemaText}
          onChange={(event) => {
            setSchemaText(event.target.value);
            setSchemaChecked(false);
          }}
        />
        {schemaChecked && (
          <Alert
            severity={schemaIssues.length === 0 ? "success" : "warning"}
            className="mt-3"
          >
            {schemaIssues.length === 0
              ? "Schema check passed — the YAML matches the supplied structure."
              : schemaIssues.join(" ")}
          </Alert>
        )}
      </div>

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

      <section className="app-shell-section mt-4 flex flex-col gap-2">
        <h2 className="text-base font-semibold">Formatted YAML Preview</h2>
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-background-paper)] p-4 text-sm text-[var(--mui-palette-text-primary)]">
          {formattedPreview}
        </pre>
      </section>
    </ToolLayout>
  );
}
