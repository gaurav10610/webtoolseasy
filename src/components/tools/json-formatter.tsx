"use client";

import { useState, useCallback, useMemo } from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import {
  Alert,
  Chip,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Collapse,
} from "@mui/material";
import SchemaIcon from "@mui/icons-material/Schema";

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  errorLine?: number;
  errorColumn?: number;
  stats?: {
    keys: number;
    depth: number;
    arrayElements: number;
    sizeBytes: number;
  };
}

function validateAndAnalyze(input: string): ValidationResult {
  if (!input || input.trim().length === 0) {
    return { isValid: false, errorMessage: "Input is empty" };
  }
  try {
    const parsed = JSON.parse(input);
    const sizeBytes = new TextEncoder().encode(JSON.stringify(parsed)).length;

    function countKeys(
      obj: unknown,
      depth = 0,
    ): { keys: number; maxDepth: number; arrays: number } {
      let keys = 0,
        maxDepth = depth,
        arrays = 0;
      if (Array.isArray(obj)) {
        arrays += obj.length;
        for (const item of obj) {
          const sub = countKeys(item, depth + 1);
          keys += sub.keys;
          maxDepth = Math.max(maxDepth, sub.maxDepth);
          arrays += sub.arrays;
        }
      } else if (obj && typeof obj === "object") {
        const entries = Object.entries(obj);
        keys += entries.length;
        for (const [, value] of entries) {
          const sub = countKeys(value, depth + 1);
          keys += sub.keys;
          maxDepth = Math.max(maxDepth, sub.maxDepth);
          arrays += sub.arrays;
        }
      }
      return { keys, maxDepth, arrays };
    }

    const { keys, maxDepth, arrays } = countKeys(parsed);
    return {
      isValid: true,
      stats: { keys, depth: maxDepth, arrayElements: arrays, sizeBytes },
    };
  } catch (e) {
    const error = e as SyntaxError;
    let errorLine: number | undefined;
    let errorColumn: number | undefined;
    const posMatch = error.message.match(/position (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const lines = input.substring(0, pos).split("\n");
      errorLine = lines.length;
      errorColumn = lines[lines.length - 1].length + 1;
    }
    return {
      isValid: false,
      errorMessage: error.message,
      errorLine,
      errorColumn,
    };
  }
}

export default function JsonFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `{"name":"John Doe","age":30,"city":"New York","skills":["JavaScript","React","Node.js"],"isActive":true}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() => {
    try {
      return JSON.stringify(JSON.parse(toolState.code), null, 2);
    } catch {
      return "";
    }
  });
  const [schemaInput, setSchemaInput] = useState("");
  const [showSchemaPanel, setShowSchemaPanel] = useState(false);
  const [schemaValidationResult, setSchemaValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);

  // Real-time validation
  const validation = useMemo(
    () => validateAndAnalyze(toolState.code),
    [toolState.code],
  );

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedCode(formatted);
      toolState.actions.showMessage("JSON formatted successfully!");
    } catch {
      toolState.actions.showMessage("Invalid JSON format");
      setFormattedCode("Invalid JSON");
    }
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted JSON copied to clipboard!",
    );
  }, [formattedCode, toolState.actions]);

  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const minified = JSON.stringify(parsed);
      setFormattedCode(minified);
      toolState.actions.showMessage("JSON minified successfully!");
    } catch {
      toolState.actions.showMessage("Invalid JSON format");
      setFormattedCode("Invalid JSON");
    }
  }, [toolState]);

  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
    },
    [toolState],
  );

  // Editor configurations
  const rawEditorProps = useEditorConfig({
    language: "json",
    value: toolState.code,
    onChange: handleCodeChange,
  });

  const formattedEditorProps = useEditorConfig({
    language: "json",
    value: formattedCode,
    onChange: () => {}, // Read-only
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Format JSON",
        onClick: formatJson,
        icon: <FormatAlignCenterIcon />,
      },
      {
        type: "custom" as const,
        text: "Minify JSON",
        onClick: minifyJson,
      },
      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormattedCode,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [formatJson, minifyJson, copyFormattedCode, toolState],
  );

  // Simple JSON Schema validator (subset: type, required, properties, items, minLength, maxLength, minimum, maximum)
  const validateAgainstSchema = useCallback(
    (data: unknown, schema: Record<string, unknown>, path = "#"): string[] => {
      const errors: string[] = [];
      if (schema.type) {
        const expected = schema.type as string;
        const actual = Array.isArray(data)
          ? "array"
          : data === null
            ? "null"
            : typeof data;
        if (actual !== expected)
          errors.push(`${path}: expected type "${expected}", got "${actual}"`);
      }
      if (
        Array.isArray(schema.required) &&
        data !== null &&
        typeof data === "object" &&
        !Array.isArray(data)
      ) {
        for (const field of schema.required as string[]) {
          if (!Object.prototype.hasOwnProperty.call(data, field)) {
            errors.push(`${path}: missing required field "${field}"`);
          }
        }
      }
      if (
        schema.properties &&
        data !== null &&
        typeof data === "object" &&
        !Array.isArray(data)
      ) {
        for (const [key, subSchema] of Object.entries(
          schema.properties as Record<string, Record<string, unknown>>,
        )) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            errors.push(
              ...validateAgainstSchema(
                (data as Record<string, unknown>)[key],
                subSchema,
                `${path}.${key}`,
              ),
            );
          }
        }
      }
      if (schema.items && Array.isArray(data)) {
        data.forEach((item, i) =>
          errors.push(
            ...validateAgainstSchema(
              item,
              schema.items as Record<string, unknown>,
              `${path}[${i}]`,
            ),
          ),
        );
      }
      if (
        typeof schema.minLength === "number" &&
        typeof data === "string" &&
        data.length < schema.minLength
      ) {
        errors.push(
          `${path}: string length ${data.length} < minLength ${schema.minLength}`,
        );
      }
      if (
        typeof schema.maxLength === "number" &&
        typeof data === "string" &&
        data.length > schema.maxLength
      ) {
        errors.push(
          `${path}: string length ${data.length} > maxLength ${schema.maxLength}`,
        );
      }
      if (
        typeof schema.minimum === "number" &&
        typeof data === "number" &&
        data < schema.minimum
      ) {
        errors.push(`${path}: value ${data} < minimum ${schema.minimum}`);
      }
      if (
        typeof schema.maximum === "number" &&
        typeof data === "number" &&
        data > schema.maximum
      ) {
        errors.push(`${path}: value ${data} > maximum ${schema.maximum}`);
      }
      return errors;
    },
    [],
  );

  const runSchemaValidation = useCallback(() => {
    try {
      const data = JSON.parse(toolState.code);
      const schema = JSON.parse(schemaInput) as Record<string, unknown>;
      const errors = validateAgainstSchema(data, schema);
      setSchemaValidationResult({ valid: errors.length === 0, errors });
    } catch (e) {
      setSchemaValidationResult({
        valid: false,
        errors: [e instanceof Error ? e.message : "Parse error"],
      });
    }
  }, [toolState.code, schemaInput, validateAgainstSchema]);

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
        title="JSON Formatter & Validator"
        description="Free online JSON formatter, validator and beautifier. Format, validate and beautify your JSON data with real-time error detection, stats, and proper indentation."
        exampleCode={initialValue}
        exampleOutput={JSON.stringify(JSON.parse(initialValue), null, 2)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {/* Real-time Validation Status */}
      {toolState.code.trim().length > 0 && (
        <Alert
          severity={validation.isValid ? "success" : "error"}
          icon={validation.isValid ? <CheckCircleIcon /> : <ErrorIcon />}
          className="!rounded-lg w-full"
        >
          {validation.isValid ? (
            <div className="flex flex-wrap items-center gap-2">
              <strong>Valid JSON</strong>
              {validation.stats && (
                <>
                  <Chip
                    label={`${validation.stats.keys} keys`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`depth: ${validation.stats.depth}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${validation.stats.arrayElements} array items`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${validation.stats.sizeBytes} bytes`}
                    size="small"
                    variant="outlined"
                  />
                </>
              )}
            </div>
          ) : (
            <div>
              <strong>Invalid JSON</strong>
              {validation.errorMessage && (
                <Typography variant="body2" className="!mt-1">
                  {validation.errorMessage}
                </Typography>
              )}
              {validation.errorLine && (
                <Typography variant="body2" color="error">
                  Line {validation.errorLine}
                  {validation.errorColumn &&
                    `, Column ${validation.errorColumn}`}
                </Typography>
              )}
            </div>
          )}
        </Alert>
      )}

      {/* JSON Schema Validation Panel */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <SchemaIcon color="primary" fontSize="small" />
              <Typography variant="subtitle2">
                JSON Schema Validation
              </Typography>
            </div>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setShowSchemaPanel((v) => !v)}
            >
              {showSchemaPanel ? "Hide" : "Show"} Schema Validator
            </Button>
          </div>
          <Collapse in={showSchemaPanel}>
            <div className="flex flex-col gap-2 mt-2">
              <TextField
                multiline
                rows={4}
                fullWidth
                size="small"
                placeholder={
                  '{"type":"object","required":["name"],"properties":{"name":{"type":"string"},"age":{"type":"number","minimum":0}}}'
                }
                label="JSON Schema"
                value={schemaInput}
                onChange={(e) => setSchemaInput(e.target.value)}
                slotProps={{
                  input: { sx: { fontFamily: "monospace", fontSize: 12 } },
                }}
              />
              <Button
                variant="contained"
                size="small"
                disabled={!schemaInput.trim() || !validation.isValid}
                onClick={runSchemaValidation}
              >
                Validate Against Schema
              </Button>
              {schemaValidationResult && (
                <Alert
                  severity={schemaValidationResult.valid ? "success" : "error"}
                >
                  {schemaValidationResult.valid ? (
                    <Typography variant="body2">
                      JSON is <strong>valid</strong> against the schema.
                    </Typography>
                  ) : (
                    <div>
                      <Typography variant="body2" fontWeight="bold">
                        Schema Errors ({schemaValidationResult.errors.length}):
                      </Typography>
                      <ul className="list-disc list-inside mt-1">
                        {schemaValidationResult.errors.map((e, i) => (
                          <li key={i}>
                            <Typography variant="caption">{e}</Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Alert>
              )}
            </div>
          </Collapse>
        </CardContent>
      </Card>

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw JSON"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted JSON"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
