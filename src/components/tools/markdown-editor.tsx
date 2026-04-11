"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import DownloadIcon from "@mui/icons-material/Download";
import { TextField, Typography } from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

export default function MarkdownEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `# Markdown Editor - WebToolsEasy

## Features ✨
- **Real-time preview** of your markdown
- **Syntax highlighting** for better readability
- **Export to README.md** file
- **Shareable links** for collaboration

## Getting Started 🚀

### Basic Syntax
- ***Bold italic text***
- **Bold text**
- *Italic text*
- \`inline code\`
- [Links](https://webtoolseasy.com)

### Code Blocks
\`\`\`javascript
// JavaScript example
function hello() {
    console.log("Hello from WebToolsEasy!");
}
\`\`\`

### Lists
1. Numbered lists
2. Are easy to create
   - Nested items
   - Work perfectly

### Tables
| Feature | Status |
|---------|--------|
| Editor  | ✅ Ready |
| Preview | ✅ Live  |
| Export  | ✅ Works |

> **Tip:** This editor supports GitHub-flavored markdown!

---

*Created with [WebToolsEasy](https://webtoolseasy.com) - Free tools to make work super easy* 🛠️`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [markdownContent, setMarkdownContent] = useState<string | undefined>(
    toolState.code,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tableRows, setTableRows] = useState(2);
  const [tableColumns, setTableColumns] = useState(3);

  const handleMarkdownChange = useCallback(
    (value?: string) => {
      setMarkdownContent(value);
      toolState.setCode(value || "");
    },
    [toolState],
  );

  const copyMarkdown = useCallback(() => {
    toolState.actions.copyText(
      markdownContent || "",
      "Markdown copied to clipboard!",
    );
  }, [toolState.actions, markdownContent]);

  const downloadReadme = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([markdownContent || ""], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toolState.actions.showMessage("README.md downloaded successfully!");
  }, [markdownContent, toolState.actions]);

  const markdownToHtml = useCallback((md: string) => {
    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let html = escapeHtml(md);
    html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
    html = html.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");
    html = html.replace(/^---$/gm, "<hr />");
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
    html = html.replace(/^\- (.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
    html = html.replace(/\n\n/g, "</p><p>");
    return `<p>${html}</p>`;
  }, []);

  const downloadHtml = useCallback(() => {
    const content = markdownContent || "";
    const htmlBody = markdownToHtml(content);
    const htmlDoc = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Markdown Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
    pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow: auto; }
    code { background: #f6f8fa; padding: 2px 4px; border-radius: 4px; }
    blockquote { border-left: 4px solid #d0d7de; margin: 0; padding-left: 1rem; color: #57606a; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #d0d7de; padding: 6px 8px; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${htmlBody}
</body>
</html>`;
    const blob = new Blob([htmlDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown-export.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("HTML exported successfully!");
  }, [markdownContent, markdownToHtml, toolState.actions]);

  const downloadPdf = useCallback(() => {
    const content = markdownContent || "";
    const htmlBody = markdownToHtml(content);
    const popup = window.open("", "_blank", "width=960,height=720");

    if (!popup) {
      toolState.actions.showMessage("Please allow pop-ups to export as PDF.");
      return;
    }

    popup.document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Markdown PDF Export</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; line-height: 1.6; }
    pre { background: #f6f8fa; padding: 12px; border-radius: 6px; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #d0d7de; padding: 6px 8px; }
  </style>
</head>
<body>${htmlBody}<script>window.onload = () => setTimeout(() => window.print(), 250);<\/script></body>
</html>`);
    popup.document.close();
    popup.focus();
    toolState.actions.showMessage(
      "Print dialog opened. Choose ‘Save as PDF’ to download.",
    );
  }, [markdownContent, markdownToHtml, toolState.actions]);

  const insertTableTemplate = useCallback(() => {
    const safeRows = Math.max(1, Math.min(8, tableRows));
    const safeColumns = Math.max(2, Math.min(8, tableColumns));
    const header = `| ${Array.from({ length: safeColumns }, (_, index) => `Column ${index + 1}`).join(" | ")} |`;
    const divider = `| ${Array.from({ length: safeColumns }, () => "---").join(" | ")} |`;
    const body = Array.from({ length: safeRows }, (_, rowIndex) => {
      return `| ${Array.from({ length: safeColumns }, (_, columnIndex) => `Value ${rowIndex + 1}.${columnIndex + 1}`).join(" | ")} |`;
    }).join("\n");

    const tableMarkdown = `\n${header}\n${divider}\n${body}\n`;
    const updated = `${markdownContent || ""}${tableMarkdown}`;
    setMarkdownContent(updated);
    toolState.setCode(updated);
    toolState.actions.showMessage("Markdown table inserted!");
  }, [markdownContent, tableRows, tableColumns, toolState]);

  const triggerImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const imageMarkdown = `\n![${file.name}](${reader.result as string})\n`;
        const updated = `${markdownContent || ""}${imageMarkdown}`;
        setMarkdownContent(updated);
        toolState.setCode(updated);
        toolState.actions.showMessage("Image embedded into markdown!");
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },
    [markdownContent, toolState],
  );

  const handleImageDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const imageMarkdown = `\n![${file.name}](${reader.result as string})\n`;
        const updated = `${markdownContent || ""}${imageMarkdown}`;
        setMarkdownContent(updated);
        toolState.setCode(updated);
        toolState.actions.showMessage("Image dropped into markdown!");
      };
      reader.readAsDataURL(file);
    },
    [markdownContent, toolState],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyMarkdown,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
      {
        type: "custom" as const,
        text: "Download README.md",
        onClick: downloadReadme,
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Export HTML",
        onClick: downloadHtml,
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Export PDF",
        onClick: downloadPdf,
        icon: <DownloadIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Insert Table",
        onClick: insertTableTemplate,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Insert Image",
        onClick: triggerImageUpload,
        variant: "outlined" as const,
      },
    ],
    [
      copyMarkdown,
      downloadReadme,
      downloadHtml,
      downloadPdf,
      insertTableTemplate,
      triggerImageUpload,
      toolState,
    ],
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
        title="Markdown Editor"
        description="Online markdown editor with live preview. Create README files, documentation, and GitHub-flavored markdown with real-time preview."
        exampleCode={initialValue}
        exampleOutput="Live markdown preview with GitHub-flavored syntax support"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 md:grid-cols-4">
        <div className="md:col-span-4">
          <Typography variant="subtitle2" className="mb-1">
            Visual table insert
          </Typography>
        </div>
        <TextField
          label="Rows"
          type="number"
          size="small"
          value={tableRows}
          onChange={(event) =>
            setTableRows(Math.max(1, parseInt(event.target.value || "1", 10)))
          }
          inputProps={{ min: 1, max: 8 }}
        />
        <TextField
          label="Columns"
          type="number"
          size="small"
          value={tableColumns}
          onChange={(event) =>
            setTableColumns(
              Math.max(2, parseInt(event.target.value || "2", 10)),
            )
          }
          inputProps={{ min: 2, max: 8 }}
        />
        <div className="md:col-span-2 flex items-center text-sm text-slate-600">
          Insert a ready-to-edit markdown table, then use Export HTML or Export
          PDF when finished.
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        className={`w-full h-[50vh] md:h-[65vh] min-h-[250px] md:min-h-[320px] ${
          toolState.isFullScreen ? "md:h-full" : ""
        }`}
      >
        <MDEditor
          value={markdownContent}
          onChange={handleMarkdownChange}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          height="100%"
          data-color-mode="light"
        />
      </div>
    </ToolLayout>
  );
}
