"use client";

import { useState, useCallback } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { v7 as uuidv7 } from "uuid";

export default function UuidV7Generator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const generateUuidV7 = () => {
    return uuidv7();
  };

  const initialValue = generateUuidV7();

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [uuidList, setUuidList] = useState<string[]>([initialValue]);
  const [bulkCount, setBulkCount] = useState(10);

  // Format timestamp from UUID v7
  const extractTimestamp = (uuid: string) => {
    try {
      // Extract timestamp from first 12 hex characters (48 bits)
      const timestampHex = uuid.replace(/-/g, "").slice(0, 12);
      const timestamp = parseInt(timestampHex, 16);
      return new Date(timestamp).toISOString();
    } catch {
      return "Invalid UUID";
    }
  };

  const generateNewUuid = useCallback(() => {
    const newUuid = generateUuidV7();
    toolState.setCode(newUuid);
    setUuidList((prevList) => {
      const newList = [newUuid, ...prevList.slice(0, -1)];
      return newList;
    });
    toolState.actions.showMessage("New UUID v7 generated!");
  }, [toolState]);

  const copyCurrentUuid = useCallback(() => {
    const allUuids = uuidList.join("\n");
    toolState.actions.copyText(
      allUuids,
      `${uuidList.length} UUIDs copied to clipboard!`
    );
  }, [uuidList, toolState]);

  const generateBulkUuids = useCallback(() => {
    const count = Math.min(Math.max(1, bulkCount), 1000);
    const newUuids = Array.from({ length: count }, () => generateUuidV7());
    setUuidList(newUuids);
    toolState.setCode(newUuids[0]);
    toolState.actions.showMessage(`Generated ${count} UUIDs!`);
  }, [bulkCount, toolState]);

  const downloadUuids = useCallback(() => {
    const allUuids = uuidList.join("\n");
    const blob = new Blob([allUuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuid-v7-list.txt";
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
        title="UUID v7 Generator"
        description="Generate time-ordered UUID v7 with millisecond-precision timestamps. Perfect for database primary keys and distributed systems."
        exampleCode="generateUuidV7()"
        exampleOutput={`Generated UUID v7: ${
          toolState.code
        }\nTimestamp: ${extractTimestamp(toolState.code)}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Single UUID */}
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Current UUID v7
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

            {/* Timestamp Display */}
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
              <Typography
                variant="body2"
                className="text-blue-800 font-semibold mb-1"
              >
                Embedded Timestamp:
              </Typography>
              <Typography variant="body2" className="font-mono text-blue-900">
                {extractTimestamp(toolState.code)}
              </Typography>
            </div>

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
            <Button
              variant="outlined"
              onClick={downloadUuids}
              fullWidth
              disabled={uuidList.length === 0}
            >
              Download UUIDs
            </Button>
          </div>

          {/* UUID Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About UUID v7:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Time-ordered with 48-bit timestamp</div>
              <div>• Format: 8-4-4-4-12 hexadecimal digits</div>
              <div>• Perfect for database primary keys</div>
              <div>• Reduces index fragmentation</div>
              <div>• RFC 9562 (2024) standard</div>
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
                  <div key={index} className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-blue-600">
                        {uuid}
                      </span>
                      <span className="text-xs text-gray-400">
                        #{index + 1}
                      </span>
                    </div>
                    <Typography variant="caption" className="text-gray-500">
                      {extractTimestamp(uuid)}
                    </Typography>
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
