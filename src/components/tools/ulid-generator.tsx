"use client";

import { useCallback, useState } from "react";
import { Typography, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";

// Lightweight ULID generator (no external deps) - Crockford base32
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function encodeRandom(len: number) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += ENCODING[Math.floor(Math.random() * 32)];
  }
  return out;
}

function generateUlid(): string {
  // 48-bit timestamp in milliseconds -> 10 chars base32
  const time = Date.now();
  let ts = time;
  const timeChars = new Array(10);
  for (let i = 9; i >= 0; i--) {
    timeChars[i] = ENCODING[ts % 32];
    ts = Math.floor(ts / 32);
  }
  return timeChars.join("") + encodeRandom(16);
}

export default function UlidGenerator({ hostname, queryParams }: Readonly<ToolComponentProps>) {
  const generateULID = useCallback(() => {
    return generateUlid();
  }, []);

  const initialValue = generateULID();

  const toolState = useToolState({ hostname: hostname || "", queryParams, initialValue });

  const [ulidList, setUlidList] = useState<string[]>([initialValue]);
  const [bulkCount, setBulkCount] = useState(10);

  const generateNewUlid = useCallback(() => {
    const newId = generateULID();
    toolState.setCode(newId);
    setUlidList((prev) => [newId, ...prev.slice(0, -1)]);
    toolState.actions.showMessage("New ULID generated!");
  }, [generateULID, toolState]);

  const copyCurrentUlids = useCallback(() => {
    const all = ulidList.join("\n");
    toolState.actions.copyText(all, `${ulidList.length} ULIDs copied to clipboard!`);
  }, [ulidList, toolState]);

  const generateBulkUlids = useCallback(() => {
    const count = Math.min(Math.max(1, bulkCount), 1000);
    const newIds = Array.from({ length: count }, () => generateULID());
    setUlidList(newIds);
    toolState.setCode(newIds[0]);
    toolState.actions.showMessage(`Generated ${count} ULIDs!`);
  }, [bulkCount, generateULID, toolState]);

  const downloadUlids = useCallback(() => {
    const all = ulidList.join("\n");
    const blob = new Blob([all], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ulid-list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage(`${ulidList.length} ULIDs downloaded successfully!`);
  }, [ulidList, toolState.actions]);

  return (
    <ToolLayout
      snackBar={{ open: toolState.snackBar.open, message: toolState.snackBar.message, onClose: toolState.snackBar.close }}
    >
      <SEOContent
        title="ULID Generator"
        description="Generate time-sortable ULIDs (Universally Unique Lexicographically Sortable Identifiers) online. Create single or bulk ULIDs quickly for databases and systems."
        exampleCode={initialValue}
        exampleOutput={`Generated ULID: ${initialValue}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Current ULID
            </Typography>
            <TextField fullWidth value={toolState.code} InputProps={{ readOnly: true }} variant="outlined" className="font-mono" />
            <Button variant="contained" onClick={generateNewUlid} startIcon={<RefreshIcon />} className="mt-3" fullWidth>
              Generate New ULID
            </Button>
          </div>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-3">
              📝 Bulk Generation
            </Typography>
            <div className="flex gap-2 mb-3">
              <TextField
                type="number"
                label="Count"
                value={bulkCount}
                onChange={(e) => setBulkCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                size="small"
                inputProps={{ min: 1, max: 1000 }}
              />
              <Button variant="outlined" onClick={generateBulkUlids} className="whitespace-nowrap">
                Generate {bulkCount} ULIDs
              </Button>
            </div>
            <Button variant="outlined" onClick={downloadUlids} fullWidth disabled={ulidList.length === 0}>
              Download ULIDs
            </Button>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About ULIDs:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Time-sortable 26-character identifier</div>
              <div>• Higher lexicographic order for later timestamps</div>
              <div>• Useful for ordered database keys and distributed systems</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h6">📋 Generated ULIDs ({ulidList.length})</Typography>

          <Button variant="outlined" onClick={copyCurrentUlids} startIcon={<ContentCopyIcon />} fullWidth>
            Copy All ULIDs
          </Button>

          <div className="border border-gray-300 rounded max-h-96 overflow-auto">
            {ulidList.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No ULIDs generated yet</div>
            ) : (
              <div className="divide-y">
                {ulidList.map((id, index) => (
                  <div key={index} className="p-3 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">{id}</span>
                      <span className="text-xs text-gray-400">#{index + 1}</span>
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
