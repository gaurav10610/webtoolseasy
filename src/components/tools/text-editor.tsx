"use client";

import { useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function TextEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `Welcome to the Online Text Editor!

This is a simple yet powerful text editor where you can:
• Write and edit plain text
• Count words and characters
• Copy text to clipboard
• Share your text via link

Start typing your content here...

Features:
- Real-time word and character counting
- Syntax highlighting for plain text
- Full-screen editing mode
- Copy and share functionality

Perfect for:
✓ Quick note-taking
✓ Text drafting
✓ Content writing
✓ Code documentation
✓ Meeting notes`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  // Calculate text statistics
  const textStats = useMemo(() => {
    const text = toolState.code;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
    };
  }, [toolState.code]);

  const clearText = useCallback(() => {
    toolState.setCode("");
    toolState.actions.showMessage("Text cleared!");
  }, [toolState]);

  const downloadText = useCallback(() => {
    const blob = new Blob([toolState.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-document.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Text file downloaded successfully!");
  }, [toolState.code, toolState.actions]);

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "plaintext",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Clear Text",
        onClick: clearText,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "Text copied to clipboard!"
          ),
        onDownload: downloadText,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [clearText, downloadText, toolState]
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
        title="Online Text Editor"
        description="Free online text editor with word count, character count, and text statistics. Write, edit and format your text online."
        exampleCode={initialValue}
        exampleOutput={`Text Statistics: ${textStats.words} words, ${textStats.characters} characters`}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Editor - takes 3/4 of the width */}
        <div className="lg:col-span-3">
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={editorProps}
            themeOption="vs-light"
            editorHeading="Text Editor"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        </div>

        {/* Statistics Panel - takes 1/4 of the width */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h3 className="font-semibold mb-3 text-gray-800">
              📊 Text Statistics
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Characters:</span>
                <span className="font-medium">
                  {textStats.characters.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Characters (no spaces):</span>
                <span className="font-medium">
                  {textStats.charactersNoSpaces.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Words:</span>
                <span className="font-medium">
                  {textStats.words.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Lines:</span>
                <span className="font-medium">
                  {textStats.lines.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Paragraphs:</span>
                <span className="font-medium">
                  {textStats.paragraphs.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold mb-2 text-blue-800">💡 Tips</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• Use Ctrl+A to select all text</div>
              <div>• Use Ctrl+Z to undo changes</div>
              <div>• Use F11 for fullscreen mode</div>
              <div>• Text is auto-saved as you type</div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold mb-2 text-green-800">🎯 Use Cases</h3>
            <div className="text-sm text-green-700 space-y-1">
              <div>• Note taking</div>
              <div>• Content writing</div>
              <div>• Text drafting</div>
              <div>• Documentation</div>
              <div>• Meeting notes</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
