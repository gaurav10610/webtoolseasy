"use client";

import { useState, useCallback, useMemo } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

export default function UuidV4Generator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const generateUuidV4 = () => {
    return crypto.randomUUID();
  };

  const initialValue = generateUuidV4();

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [uuidList, setUuidList] = useState<string[]>([initialValue]);
  const [bulkCount, setBulkCount] = useState(10);

  const generateNewUuid = useCallback(() => {
    const newUuid = generateUuidV4();
    toolState.setCode(newUuid);
    toolState.actions.showMessage("New UUID v4 generated!");
  }, [toolState]);

  const generateBulkUuids = useCallback(() => {
    const count = Math.min(Math.max(1, bulkCount), 1000); // Limit between 1-1000
    const newUuids = Array.from({ length: count }, () => generateUuidV4());
    setUuidList(newUuids);
    toolState.actions.showMessage(`Generated ${count} UUIDs!`);
  }, [bulkCount, toolState.actions]);

  const copyAllUuids = useCallback(() => {
    const allUuids = uuidList.join("\n");
    toolState.actions.copyText(
      allUuids,
      `${uuidList.length} UUIDs copied to clipboard!`
    );
  }, [uuidList, toolState.actions]);

  const downloadUuids = useCallback(() => {
    const allUuids = uuidList.join("\n");
    const blob = new Blob([allUuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuid-v4-list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(
      `${uuidList.length} UUIDs downloaded successfully!`
    );
  }, [uuidList, toolState.actions]);

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Generate New",
        onClick: generateNewUuid,
        icon: <RefreshIcon />,
      },
      {
        type: "custom" as const,
        text: "Copy All UUIDs",
        onClick: copyAllUuids,
      },
      {
        type: "custom" as const,
        text: "Download UUIDs",
        onClick: downloadUuids,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "UUID copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [generateNewUuid, copyAllUuids, downloadUuids, toolState]
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
        title="UUID v4 Generator"
        description="Generate random UUID v4 (Universally Unique Identifier) online. Create single or bulk UUIDs for your applications."
        exampleCode={initialValue}
        exampleOutput={`Generated UUID: ${initialValue}`}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Single UUID */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Current UUID v4
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
              onClick={generateNewUuid}
              startIcon={<RefreshIcon />}
              className="mt-3"
              fullWidth
            >
              Generate New UUID
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
                onClick={generateBulkUuids}
                className="whitespace-nowrap"
              >
                Generate {bulkCount} UUIDs
              </Button>
            </div>
          </div>

          {/* UUID Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About UUID v4:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Random 128-bit identifier</div>
              <div>• Format: 8-4-4-4-12 hexadecimal digits</div>
              <div>• Virtually guaranteed to be unique</div>
              <div>• Used in databases, APIs, and software systems</div>
            </div>
          </div>
        </div>

        {/* Right Panel - UUID List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h6">
              📋 Generated UUIDs ({uuidList.length})
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={copyAllUuids}
              disabled={uuidList.length === 0}
            >
              Copy All
            </Button>
          </div>

          <div className="border border-gray-300 rounded max-h-96 overflow-auto">
            {uuidList.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No UUIDs generated yet
              </div>
            ) : (
              <div className="divide-y">
                {uuidList.map((uuid, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-50 font-mono text-sm cursor-pointer"
                    onClick={() =>
                      toolState.actions.copyText(
                        uuid,
                        `UUID ${index + 1} copied!`
                      )
                    }
                    title="Click to copy"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600">{uuid}</span>
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
