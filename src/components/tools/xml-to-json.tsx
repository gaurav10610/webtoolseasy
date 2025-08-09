"use client";

import React, { useState, useCallback, useMemo } from "react";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { Checkbox, Typography } from "@mui/material";
import { Code } from "@mui/icons-material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

export default function XmlToJsonConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `<?xml version="1.0"?>
<customers>
   <customer id="101">
      <n>WebToolsEasy</n>
      <address>
         <street>101 Last1</street>
         <city>Framingham</city>
         <state>MA</state>
         <zip>0001</zip>
      </address>
      <address>
         <street>101 Last1</street>
         <city>Framingham</city>
         <state>MA</state>
         <zip>0002</zip>
      </address>
      <address>
         <street>101 Last1</street>
         <state>MA</state>
         <zip>0003</zip>
      </address>
   </customer>
</customers>`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [convertedJson, setConvertedJson] = useState("");
  const [parserOptions, setParserOptions] = useState<X2jOptions>({
    ignoreAttributes: true,
    ignoreDeclaration: true,
  });

  const handleParserOptionsChange = useCallback(
    (propertyName: string, propertyValue: boolean) => {
      setParserOptions((prev) => ({
        ...prev,
        [propertyName]: propertyValue,
      }));
    },
    []
  );

  const convertXml = useCallback(() => {
    try {
      const parser = new XMLParser(parserOptions);
      const result = parser.parse(toolState.code);
      const formattedJson = JSON.stringify(result, null, 2);
      setConvertedJson(formattedJson);
      toolState.actions.showMessage("XML converted to JSON successfully!");
    } catch (error) {
      toolState.actions.showMessage(`Error: ${error}`);
      setConvertedJson("Invalid XML");
    }
  }, [toolState, parserOptions]);

  const copyFormattedCode = useCallback(() => {
    toolState.actions.copyText(convertedJson, "JSON copied to clipboard!");
  }, [toolState.actions, convertedJson]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language: "xml",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  const outputEditorProps = useEditorConfig({
    language: "json",
    value: convertedJson,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Convert XML to JSON",
        onClick: convertXml,
        icon: <Code />,
      },
      ...createCommonButtons({
        onCopy: copyFormattedCode,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [convertXml, copyFormattedCode, toolState]
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
        title="XML to JSON Converter"
        description="Convert XML data to JSON format online. Fast and reliable XML to JSON converter with customizable parsing options."
        exampleCode={initialValue}
        exampleOutput={JSON.stringify(
          { customers: { customer: { "@_id": "101", n: "WebToolsEasy" } } },
          null,
          2
        )}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={inputEditorProps}
            themeOption="vs-dark"
            editorHeading="XML Code"
          />
        }
        rightPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={outputEditorProps}
            themeOption="vs-dark"
            editorHeading="JSON Code"
          />
        }
      />

      <div className="flex flex-row gap-4 justify-center w-full mt-4">
        <div className="flex flex-row gap-2 items-center">
          <Checkbox
            defaultChecked
            onChange={(e) => {
              handleParserOptionsChange("ignoreAttributes", e.target.checked);
            }}
            name="ignoreAttributes"
          />
          <Typography variant="body2">Ignore Attributes</Typography>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Checkbox
            defaultChecked
            onChange={(e) => {
              handleParserOptionsChange("ignoreDeclaration", e.target.checked);
            }}
            name="ignoreDeclaration"
          />
          <Typography variant="body2">Ignore Declaration</Typography>
        </div>
      </div>
    </ToolLayout>
  );
}
