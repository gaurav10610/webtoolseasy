"use client";

import { useState, useCallback, useMemo } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { Guid } from "guid-ts";

export default function GuidGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const generateGUID = useCallback(() => {
    return Guid.newGuid().toString();
  }, []);

  const initialValue = generateGUID();

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [guidList, setGuidList] = useState<string[]>([initialValue]);
  const [bulkCount, setBulkCount] = useState(10);

  const generateNewGuid = useCallback(() => {
    const newGuid = generateGUID();
    toolState.setCode(newGuid);
    toolState.actions.showMessage("New GUID generated!");
  }, [generateGUID, toolState]);

  const generateBulkGuids = useCallback(() => {
    const count = Math.min(Math.max(1, bulkCount), 1000); // Limit between 1-1000
    const newGuids = Array.from({ length: count }, () => generateGUID());
    setGuidList(newGuids);
    toolState.actions.showMessage(`Generated ${count} GUIDs!`);
  }, [bulkCount, generateGUID, toolState.actions]);

  const copyAllGuids = useCallback(() => {
    const allGuids = guidList.join("\n");
    toolState.actions.copyText(
      allGuids,
      `${guidList.length} GUIDs copied to clipboard!`
    );
  }, [guidList, toolState.actions]);

  const downloadGuids = useCallback(() => {
    const allGuids = guidList.join("\n");
    const blob = new Blob([allGuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guid-list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(
      `${guidList.length} GUIDs downloaded successfully!`
    );
  }, [guidList, toolState.actions]);

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Generate New",
        onClick: generateNewGuid,
        icon: <RefreshIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy All GUIDs",
        onClick: copyAllGuids,
      },
      {
        type: "custom" as const,
        text: "Download GUIDs",
        onClick: downloadGuids,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "GUID copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [generateNewGuid, copyAllGuids, downloadGuids, toolState]
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
        title="GUID Generator"
        description="Generate random GUID (Globally Unique Identifier) online. Create single or bulk GUIDs for your applications."
        exampleCode={initialValue}
        exampleOutput={`Generated GUID: ${initialValue}`}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Single GUID */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Current GUID
            </Typography>
            <TextField
              fullWidth
              value={toolState.code}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              className="font-mono"
            />
            <Button
              variant="contained"
              onClick={generateNewGuid}
              startIcon={<RefreshIcon />}
              className="mt-3"
              fullWidth
            >
              Generate New GUID
            </Button>
          </div>

          <Divider />

          {/* Bulk Generation */}
          <div>
            <Typography variant="h6" className="mb-3">
              📝 Bulk Generation
            </Typography>
            <div className="flex gap-2 mb-3">
              <TextField
                type="number"
                label="Count"
                value={bulkCount}
                onChange={(e) =>
                  setBulkCount(
                    Math.max(1, Math.min(1000, parseInt(e.target.value) || 1))
                  )
                }
                size="small"
                inputProps={{ min: 1, max: 1000 }}
              />
              <Button
                variant="outlined"
                onClick={generateBulkGuids}
                className="whitespace-nowrap"
              >
                Generate {bulkCount} GUIDs
              </Button>
            </div>
          </div>

          {/* GUID Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About GUIDs:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Globally Unique Identifier</div>
              <div>• Format: 8-4-4-4-12 hexadecimal digits</div>
              <div>• Compatible with Microsoft systems</div>
              <div>• Used in COM, .NET, and Windows applications</div>
            </div>
          </div>
        </div>

        {/* Right Panel - GUID List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h6">
              📋 Generated GUIDs ({guidList.length})
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={copyAllGuids}
              disabled={guidList.length === 0}
            >
              Copy All
            </Button>
          </div>

          <div className="border border-gray-300 rounded max-h-96 overflow-auto">
            {guidList.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No GUIDs generated yet
              </div>
            ) : (
              <div className="divide-y">
                {guidList.map((guid, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-50 font-mono text-sm cursor-pointer"
                    onClick={() =>
                      toolState.actions.copyText(
                        guid,
                        `GUID ${index + 1} copied!`
                      )
                    }
                    title="Click to copy"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600">{guid}</span>
                      <span className="text-xs text-gray-400">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
