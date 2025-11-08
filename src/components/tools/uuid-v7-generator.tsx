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

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              className="font-bold text-teal-900"
            >
              UUID v7 Generator
            </Typography>
            <Typography variant="h6" className="text-teal-700">
              Generate time-ordered UUIDs for databases and distributed systems
            </Typography>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Column - Generator */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-teal-200">
              <Typography
                variant="h5"
                className="mb-4 text-teal-800 font-semibold"
              >
                Current UUID v7
              </Typography>

              <TextField
                fullWidth
                value={toolState.code}
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "1.1rem",
                      color: "#0f766e",
                    },
                  },
                }}
                className="mb-4 bg-teal-50"
              />

              {/* Timestamp Display */}
              <div className="mb-4 p-4 bg-cyan-50 rounded border border-cyan-200">
                <Typography
                  variant="body2"
                  className="text-cyan-800 font-semibold mb-1"
                >
                  Embedded Timestamp:
                </Typography>
                <Typography variant="body1" className="font-mono text-cyan-900">
                  {extractTimestamp(toolState.code)}
                </Typography>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="contained"
                  onClick={generateNewUuid}
                  startIcon={<RefreshIcon />}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Generate New
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    toolState.actions.copyText(
                      toolState.code,
                      "UUID copied to clipboard!"
                    )
                  }
                  startIcon={<ContentCopyIcon />}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  Copy UUID
                </Button>
              </div>

              <Divider className="my-6 bg-teal-200" />

              {/* Info Panel */}
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-4 rounded border border-teal-200">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-teal-800 mb-2"
                >
                  ✨ UUID v7 Features
                </Typography>
                <Typography variant="body2" className="text-teal-700 mb-2">
                  • <strong>Time-Ordered:</strong> Sorts chronologically by
                  creation time
                </Typography>
                <Typography variant="body2" className="text-teal-700 mb-2">
                  • <strong>Database-Friendly:</strong> Reduces index
                  fragmentation
                </Typography>
                <Typography variant="body2" className="text-teal-700 mb-2">
                  • <strong>Millisecond Precision:</strong> Embedded timestamp
                  for ordering
                </Typography>
                <Typography variant="body2" className="text-teal-700">
                  • <strong>RFC 9562 Compliant:</strong> Latest UUID standard
                  (2024)
                </Typography>
              </div>
            </div>

            {/* Right Column - Bulk Generation */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-teal-200">
              <Typography
                variant="h5"
                className="mb-4 text-teal-800 font-semibold"
              >
                Bulk Generation
              </Typography>

              <TextField
                fullWidth
                type="number"
                label="Number of UUIDs"
                value={bulkCount}
                onChange={(e) =>
                  setBulkCount(
                    Math.min(Math.max(1, parseInt(e.target.value) || 1), 1000)
                  )
                }
                slotProps={{
                  htmlInput: {
                    min: 1,
                    max: 1000,
                  },
                }}
                className="mb-4"
                helperText="Generate 1-1000 UUIDs at once"
              />

              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  variant="contained"
                  onClick={generateBulkUuids}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Generate Bulk
                </Button>
                <Button
                  variant="outlined"
                  onClick={copyCurrentUuid}
                  startIcon={<ContentCopyIcon />}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  Copy All
                </Button>
                <Button
                  variant="outlined"
                  onClick={downloadUuids}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  Download
                </Button>
              </div>

              <Divider className="mb-4 bg-teal-200" />

              {/* UUID List */}
              <div className="bg-teal-50 rounded p-4 max-h-96 overflow-y-auto border border-teal-200">
                <Typography
                  variant="subtitle2"
                  className="font-semibold text-teal-800 mb-2"
                >
                  Generated UUIDs ({uuidList.length})
                </Typography>
                {uuidList.map((uuid, index) => (
                  <div key={index} className="mb-2">
                    <Typography
                      variant="body2"
                      className="font-mono text-teal-900 break-all"
                    >
                      {uuid}
                    </Typography>
                    <Typography variant="caption" className="text-teal-600">
                      {extractTimestamp(uuid)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Benefits Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-teal-200">
            <Typography
              variant="h5"
              className="mb-4 text-teal-800 font-semibold"
            >
              🚀 Database Performance Benefits
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-cyan-50 p-4 rounded border border-cyan-200">
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-cyan-900 mb-2"
                >
                  Sequential Inserts
                </Typography>
                <Typography variant="body2" className="text-cyan-800">
                  UUID v7&apos;s time-ordered nature means new records append
                  near the end of B-tree indexes, reducing page splits and
                  improving write performance by up to 50%.
                </Typography>
              </div>
              <div className="bg-teal-50 p-4 rounded border border-teal-200">
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-teal-900 mb-2"
                >
                  Better Cache Locality
                </Typography>
                <Typography variant="body2" className="text-teal-800">
                  Sequential UUIDs improve cache hit rates during reads, as
                  related records created around the same time are stored
                  physically close together.
                </Typography>
              </div>
              <div className="bg-cyan-50 p-4 rounded border border-cyan-200">
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-cyan-900 mb-2"
                >
                  Natural Ordering
                </Typography>
                <Typography variant="body2" className="text-cyan-800">
                  No need for separate &apos;created_at&apos; columns - the UUID
                  itself contains timestamp information, enabling efficient
                  range queries on the primary key.
                </Typography>
              </div>
              <div className="bg-teal-50 p-4 rounded border border-teal-200">
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-teal-900 mb-2"
                >
                  Index Efficiency
                </Typography>
                <Typography variant="body2" className="text-teal-800">
                  Reduces index fragmentation compared to random v4 UUIDs,
                  leading to smaller index sizes and faster query execution.
                </Typography>
              </div>
            </div>
          </div>

          {/* SEO Content */}
        </div>
      </div>
    </ToolLayout>
  );
}
