"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function MarkdownToHtmlConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `# Markdown to HTML Converter

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- Lists and code blocks

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### List
1. First item
2. Second item
3. Third item

> This is a blockquote

---

Happy converting!`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [htmlOutput, setHtmlOutput] = useState("");
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");

  // Handle code change
  const handleCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
    },
    [toolState]
  );

  // Editor configuration for Markdown
  const markdownEditorProps = useEditorConfig({
    language: "markdown",
    value: toolState.code,
    onChange: handleCodeChange,
  });

  // Editor configuration for HTML output
  const htmlEditorProps = useEditorConfig({
    language: "html",
    value: htmlOutput,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  // Simple Markdown to HTML converter
  const convertMarkdownToHtml = (markdown: string): string => {
    let html = markdown;

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Code blocks (must come before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || "text"}">${escapeHtml(
        code.trim()
      )}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, (_, code) => {
      return `<code>${escapeHtml(code)}</code>`;
    });

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

    // Horizontal rule
    html = html.replace(/^---$/gm, "<hr />");
    html = html.replace(/^\*\*\*$/gm, "<hr />");

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" />'
    );

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, (match) => {
      return `<li>${match.replace(/^\d+\.\s+/, "")}</li>`;
    });
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      return `<ol>\n${match}</ol>\n`;
    });

    // Unordered lists
    html = html.replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      if (!match.includes("<ol>")) {
        return `<ul>\n${match}</ul>\n`;
      }
      return match;
    });

    // Paragraphs (wrap non-HTML lines)
    const lines = html.split("\n");
    const processed: string[] = [];
    let inBlock = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (
        trimmed.startsWith("<") ||
        trimmed === "" ||
        trimmed.startsWith("</")
      ) {
        inBlock =
          trimmed.startsWith("<pre") ||
          trimmed.startsWith("<ol") ||
          trimmed.startsWith("<ul");
        processed.push(line);
      } else if (!inBlock && !trimmed.startsWith("<")) {
        processed.push(`<p>${line}</p>`);
      } else {
        processed.push(line);
      }
    });

    html = processed.join("\n");

    // Clean up extra newlines
    html = html.replace(/\n{3,}/g, "\n\n");

    return html.trim();
  };

  useEffect(() => {
    const html = convertMarkdownToHtml(toolState.code);
    setHtmlOutput(html);
  }, [toolState.code]);

  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: () => toolState.actions.copyText(htmlOutput),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [toolState, htmlOutput]
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
        title="Markdown to HTML Converter"
        description="Convert Markdown syntax to clean HTML code. Real-time conversion with live preview. Perfect for bloggers and developers."
        exampleCode="# Hello\n**Bold** and *italic*"
        exampleOutput="<h1>Hello</h1>\n<p><strong>Bold</strong> and <em>italic</em></p>"
      />

      <div className="flex flex-col gap-4 w-full">
        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        <CodeEditorLayout
          isFullScreen={toolState.isFullScreen}
          leftPanel={
            <SingleCodeEditorWithHeaderV2
              codeEditorProps={markdownEditorProps}
              themeOption="vs-dark"
              editorHeading="Markdown Input"
              className={
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }
            />
          }
          rightPanel={
            <div
              className={`flex flex-col gap-2 ${
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }`}
            >
              <div className="flex items-center justify-between">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="!text-sm md:!text-lg lg:!text-xl !font-semibold"
                >
                  HTML Output
                </Typography>
                <Tabs
                  value={viewMode}
                  onChange={(_, value) => setViewMode(value)}
                  variant="standard"
                >
                  <Tab
                    icon={<CodeIcon />}
                    iconPosition="start"
                    label="Code"
                    value="code"
                    className="!min-h-0 !py-1 !px-3 !text-xs"
                  />
                  <Tab
                    icon={<VisibilityIcon />}
                    iconPosition="start"
                    label="Preview"
                    value="preview"
                    className="!min-h-0 !py-1 !px-3 !text-xs"
                  />
                </Tabs>
              </div>

              {viewMode === "code" ? (
                <div className="flex-1 min-h-[200px] md:min-h-[280px]">
                  <SingleCodeEditorWithHeaderV2
                    codeEditorProps={htmlEditorProps}
                    themeOption="vs-dark"
                    editorHeading=""
                    className="h-full"
                  />
                </div>
              ) : (
                <div className="flex-1 min-h-[200px] md:min-h-[280px] w-full border-2 border-gray-300 rounded-lg bg-white p-4 overflow-auto">
                  <div
                    dangerouslySetInnerHTML={{ __html: htmlOutput }}
                    className="prose prose-sm max-w-none"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  />
                </div>
              )}
            </div>
          }
        />

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-gray-700">
            <strong>Supported Markdown Syntax:</strong>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 font-mono text-xs">
              <div># Header 1 → &lt;h1&gt;</div>
              <div>**bold** → &lt;strong&gt;</div>
              <div>*italic* → &lt;em&gt;</div>
              <div>[link](url) → &lt;a&gt;</div>
              <div>- List item → &lt;li&gt;</div>
              <div>`code` → &lt;code&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
