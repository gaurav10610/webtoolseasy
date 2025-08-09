"use client";

import { useState, useCallback, useMemo } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import DownloadIcon from "@mui/icons-material/Download";
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
    toolState.code
  );

  const handleMarkdownChange = useCallback(
    (value?: string) => {
      setMarkdownContent(value);
      toolState.setCode(value || "");
    },
    [toolState]
  );

  const copyMarkdown = useCallback(() => {
    toolState.actions.copyText(
      markdownContent || "",
      "Markdown copied to clipboard!"
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
    ],
    [copyMarkdown, downloadReadme, toolState]
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

      <div
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
