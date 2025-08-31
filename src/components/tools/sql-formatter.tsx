"use client";

import { useCallback, useMemo, useState } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { CodeEditorLayout } from "../common/ToolLayout";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import CloseIcon from "@mui/icons-material/Close";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";

// basic SQL keywords to uppercase and break before
const CLAUSES = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "OUTER JOIN",
  "ON",
  "UNION",
  "UNION ALL",
];

function simpleFormatSql(input: string) {
  if (!input) return "";
  // Normalize whitespace
  let sql = input.replace(/\s+/g, " ").trim();

  // Uppercase common keywords (simple approach)
  const keywordRegex = new RegExp(
    "\\b(select|from|where|group by|order by|having|limit|join|left join|right join|inner join|outer join|on|union all|union)\\b",
    "gi"
  );
  sql = sql.replace(keywordRegex, (m) => m.toUpperCase());

  // Insert line breaks before main clauses
  CLAUSES.forEach((c) => {
    const re = new RegExp("\\s+" + c + "\\s+", "g");
    sql = sql.replace(re, "\n" + c + " ");
  });

  // Put commas in SELECT list on new lines
  sql = sql.replace(/SELECT\s+([^\n]+)\n/gi, (m: string, cols: string) => {
    const parts = cols.split(",").map((p: string) => p.trim());
    return "SELECT\n  " + parts.join(",\n  ") + "\n";
  });

  // Basic indentation for ON and JOIN blocks
  sql = sql.replace(/\n(ON) /g, "\n  $1 ");

  return sql;
}

export default function SqlFormatter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue =
    "SELECT id, name, email FROM users WHERE active = 1 ORDER BY created_at DESC";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [formattedCode, setFormattedCode] = useState(() =>
    simpleFormatSql(initialValue)
  );

  const formatSql = useCallback(() => {
    const res = simpleFormatSql(toolState.code || "");
    setFormattedCode(res);
    toolState.actions.showMessage("SQL formatted");
  }, [toolState]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(
      formattedCode,
      "Formatted SQL copied to clipboard!"
    );
  }, [formattedCode, toolState.actions]);

  const doClear = useCallback(() => {
    toolState.setCode("");
    setFormattedCode("");
    toolState.actions.showMessage("Cleared");
  }, [toolState]);

  // Editor configurations
  const rawEditorProps = useEditorConfig({
    language: "sql",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const formattedEditorProps = useEditorConfig({
    language: "sql",
    value: formattedCode,
    onChange: () => {}, // read-only
  });

  const buttons = useMemo(() => {
    const custom = [
      {
        type: "custom" as const,
        text: "Format SQL",
        onClick: formatSql,
        icon: <FormatAlignLeftIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy Formatted",
        onClick: copyFormattedCode,
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
  }, [formatSql, copyFormattedCode, doClear, toolState]);

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
        title="SQL Formatter"
        description="Beautify and format SQL queries for readability. Separate clauses and indent JOIN/ON blocks for easier inspection."
        exampleCode={initialValue}
        exampleOutput={simpleFormatSql(initialValue)}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={rawEditorProps}
            themeOption="vs-dark"
            editorHeading="Raw SQL"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={formattedEditorProps}
            themeOption="vs-dark"
            editorHeading="Formatted SQL"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
      />
    </ToolLayout>
  );
}
