"use client";

import React, { useState, useCallback } from "react";
import { Typography, Button } from "@mui/material";
import { Transform, ContentCopy, Refresh, Download } from "@mui/icons-material";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

// Lazy load TurndownService for HTML to Markdown conversion
const loadTurndown = () => import("turndown");

interface HtmlToMarkdownState {
  htmlInput: string;
  markdownOutput: string;
  isConverting: boolean;
  error: string;
}

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
    <title>Sample Document</title>
</head>
<body>
    <h1>Welcome to HTML to Markdown Converter</h1>
    
    <p>This tool converts <strong>HTML</strong> content to <em>Markdown</em> format.</p>
    
    <h2>Features</h2>
    <ul>
        <li>Converts headings (h1-h6)</li>
        <li>Handles <strong>bold</strong> and <em>italic</em> text</li>
        <li>Preserves <a href="https://example.com">links</a></li>
        <li>Converts lists and tables</li>
        <li>Maintains code blocks</li>
    </ul>
    
    <h3>Code Example</h3>
    <pre><code>function hello() {
    console.log("Hello, World!");
}</code></pre>
    
    <blockquote>
        <p>This is a blockquote that will be converted to Markdown format.</p>
    </blockquote>
    
    <table>
        <thead>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell 1</td>
                <td>Cell 2</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`;

export default function HtmlToMarkdown() {
  const [state, setState] = useState<HtmlToMarkdownState>({
    htmlInput: DEFAULT_HTML,
    markdownOutput: "",
    isConverting: false,
    error: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  const showMessage = useCallback((message: string) => {
    setSnackBar({ open: true, message });
  }, []);

  const convertToMarkdown = useCallback(async () => {
    setState((prev) => ({ ...prev, isConverting: true, error: "" }));

    try {
      const TurndownService = (await loadTurndown()).default;
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
      });

      // Custom rules for better conversion
      turndownService.addRule("strikethrough", {
        filter: ["del", "s"],
        replacement: (content) => `~~${content}~~`,
      });

      turndownService.addRule("highlight", {
        filter: ["mark"],
        replacement: (content) => `==${content}==`,
      });

      const markdown = turndownService.turndown(state.htmlInput);

      setState((prev) => ({
        ...prev,
        markdownOutput: markdown,
        isConverting: false,
      }));

      showMessage("HTML converted to Markdown successfully!");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: `Conversion failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
        isConverting: false,
      }));
    }
  }, [state.htmlInput, showMessage]);

  const copyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(state.markdownOutput);
    showMessage("Markdown copied to clipboard!");
  }, [state.markdownOutput, showMessage]);

  const downloadMarkdown = useCallback(() => {
    const blob = new Blob([state.markdownOutput], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage("Markdown file downloaded successfully!");
  }, [state.markdownOutput, showMessage]);

  const handleReset = useCallback(() => {
    setState({
      htmlInput: DEFAULT_HTML,
      markdownOutput: "",
      isConverting: false,
      error: "",
    });
  }, []);

  // Auto-convert on mount
  React.useEffect(() => {
    convertToMarkdown();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToolLayout
      snackBar={{
        open: snackBar.open,
        message: snackBar.message,
        onClose: () => setSnackBar((prev) => ({ ...prev, open: false })),
      }}
    >
      <SEOContent
        title="HTML to Markdown Converter"
        description="Free online HTML to Markdown converter. Convert HTML documents, web pages, and content to clean Markdown format with proper formatting preservation."
        exampleCode={DEFAULT_HTML}
        exampleOutput="# Welcome to HTML to Markdown Converter\n\nThis tool converts **HTML** content to *Markdown* format.\n\n## Features\n- Converts headings (h1-h6)\n- Handles **bold** and *italic* text\n- Preserves [links](https://example.com)\n- Converts lists and tables\n- Maintains code blocks"
      />

      <div className="space-y-4">
        {/* ... rest of content */}
        <div>
          <Typography variant="h5" gutterBottom>
            HTML to Markdown Converter
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Convert HTML content to clean Markdown format
          </Typography>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            startIcon={<Transform />}
            onClick={convertToMarkdown}
            disabled={state.isConverting}
          >
            {state.isConverting ? "Converting..." : "Convert to Markdown"}
          </Button>
          <Button
            startIcon={<ContentCopy />}
            onClick={copyMarkdown}
            disabled={!state.markdownOutput}
            variant="outlined"
          >
            Copy Markdown
          </Button>
          <Button
            startIcon={<Download />}
            onClick={downloadMarkdown}
            disabled={!state.markdownOutput}
            variant="outlined"
          >
            Download .md
          </Button>
          <Button startIcon={<Refresh />} onClick={handleReset} color="error">
            Reset
          </Button>
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <Typography variant="body2" color="error">
              {state.error}
            </Typography>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* HTML Input */}
          <div className="space-y-2">
            <Typography variant="h6">HTML Input</Typography>
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="400px"
                className="md:!h-[500px]"
                defaultLanguage="html"
                value={state.htmlInput}
                onChange={(value: string | undefined) =>
                  setState((prev) => ({ ...prev, htmlInput: value || "" }))
                }
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>

          {/* Markdown Output */}
          <div className="space-y-2">
            <Typography variant="h6">Markdown Output</Typography>
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="400px"
                className="md:!h-[500px]"
                defaultLanguage="markdown"
                value={state.markdownOutput}
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        {state.markdownOutput && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <Typography variant="subtitle2" gutterBottom>
              Conversion Statistics
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">HTML Size:</span>
                <span className="ml-2 font-mono">
                  {state.htmlInput.length} chars
                </span>
              </div>
              <div>
                <span className="text-gray-600">Markdown Size:</span>
                <span className="ml-2 font-mono">
                  {state.markdownOutput.length} chars
                </span>
              </div>
              <div>
                <span className="text-gray-600">Reduction:</span>
                <span className="ml-2 font-mono">
                  {Math.round(
                    (1 - state.markdownOutput.length / state.htmlInput.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <div>
                <span className="text-gray-600">Lines:</span>
                <span className="ml-2 font-mono">
                  {state.markdownOutput.split("\n").length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
