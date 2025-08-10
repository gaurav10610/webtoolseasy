"use client";

import { useState, useCallback } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { v1 as generateUUID } from "uuid";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";

export default function UUIDV1Generator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const generateUUIDv1 = useCallback(() => {
    return generateUUID();
  }, []);

  const initialValue = generateUUIDv1();

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [uuidList, setUuidList] = useState<string[]>([initialValue]);
  const [bulkCount, setBulkCount] = useState(10);

  const generateNewUuid = useCallback(() => {
    const newUuid = generateUUIDv1();
    toolState.setCode(newUuid);
    // Update the list to include the new UUID
    setUuidList((prevList) => {
      const newList = [newUuid, ...prevList.slice(0, -1)];
      return newList;
    });
    toolState.actions.showMessage("New UUID v1 generated!");
  }, [generateUUIDv1, toolState]);

  const copyCurrentUuid = useCallback(() => {
    const allUuids = uuidList.join("\n");
    toolState.actions.copyText(
      allUuids,
      `${uuidList.length} UUIDs copied to clipboard!`
    );
  }, [uuidList, toolState]);

  const generateBulkUuids = useCallback(() => {
    const count = Math.min(Math.max(1, bulkCount), 1000); // Limit between 1-1000
    const newUuids = Array.from({ length: count }, () => generateUUIDv1());
    setUuidList(newUuids);
    // Update the current displayed UUID to the first one from the bulk
    toolState.setCode(newUuids[0]);
    toolState.actions.showMessage(`Generated ${count} UUIDs!`);
  }, [bulkCount, generateUUIDv1, toolState]);

  const downloadUuids = useCallback(() => {
    const allUuids = uuidList.join("\n");
    const blob = new Blob([allUuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuid-v1-list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(
      `${uuidList.length} UUIDs downloaded successfully!`
    );
  }, [uuidList, toolState.actions]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="UUID v1 Generator"
        description="Generate random UUID v1 (Time-based UUID) online. Create single or bulk UUIDs for your applications."
        exampleCode={initialValue}
        exampleOutput={`Generated UUID v1: ${initialValue}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Single UUID */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Current UUID v1
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
              Generate New UUID v1
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
            <Button
              variant="outlined"
              onClick={downloadUuids}
              fullWidth
              disabled={uuidList.length === 0}
            >
              Download UUIDs
            </Button>
          </div>

          {/* UUID v1 Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About UUID v1:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Time-based UUID</div>
              <div>• Format: 8-4-4-4-12 hexadecimal digits</div>
              <div>• Contains timestamp and MAC address</div>
              <div>• Guaranteed to be unique within same system</div>
            </div>
          </div>
        </div>

        {/* Right Panel - UUID List */}
        <div className="space-y-4">
          <Typography variant="h6">
            📋 Generated UUIDs ({uuidList.length})
          </Typography>

          <Button
            variant="outlined"
            onClick={copyCurrentUuid}
            startIcon={<ContentCopyIcon />}
            fullWidth
          >
            Copy All UUIDs
          </Button>

          <div className="border border-gray-300 rounded max-h-96 overflow-auto">
            {uuidList.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No UUIDs generated yet
              </div>
            ) : (
              <div className="divide-y">
                {uuidList.map((uuid, index) => (
                  <div key={index} className="p-3 font-mono text-sm">
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
