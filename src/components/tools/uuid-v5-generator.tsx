"use client";

import { useState, useCallback } from "react";
import {
  Typography,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { v5 as uuidv5 } from "uuid";

// Standard UUID v5 namespaces
const NAMESPACES = {
  DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
};

export default function UuidV5Generator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [namespace, setNamespace] = useState<string>("URL");
  const [customNamespace, setCustomNamespace] = useState<string>("");
  const [name, setName] = useState<string>("example.com");
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkNamePrefix, setBulkNamePrefix] = useState<string>("item-");

  const generateUuidV5 = useCallback(
    (inputName: string) => {
      const namespaceUuid =
        namespace === "CUSTOM"
          ? customNamespace
          : NAMESPACES[namespace as keyof typeof NAMESPACES];
      return uuidv5(inputName, namespaceUuid);
    },
    [namespace, customNamespace]
  );

  const currentUuid = name ? generateUuidV5(name) : "";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: currentUuid,
  });

  const generateNewUuid = useCallback(() => {
    if (!name) {
      toolState.actions.showMessage("Please enter a name to generate UUID v5");
      return;
    }

    if (namespace === "CUSTOM" && !customNamespace) {
      toolState.actions.showMessage("Please enter a custom namespace UUID");
      return;
    }

    try {
      const newUuid = generateUuidV5(name);
      toolState.setCode(newUuid);
      // Update the list to include the new UUID
      setUuidList((prevList) => {
        const newList = [newUuid, ...prevList.slice(0, 999)];
        return newList;
      });
      toolState.actions.showMessage("UUID v5 generated!");
    } catch {
      toolState.actions.showMessage(
        "Error generating UUID. Check your inputs."
      );
    }
  }, [name, namespace, customNamespace, generateUuidV5, toolState]);

  const copyCurrentUuid = useCallback(() => {
    if (uuidList.length === 0) {
      toolState.actions.showMessage("No UUIDs to copy. Generate some first!");
      return;
    }
    const allUuids = uuidList.join("\n");
    toolState.actions.copyText(
      allUuids,
      `${uuidList.length} UUIDs copied to clipboard!`
    );
  }, [uuidList, toolState]);

  const generateBulkUuids = useCallback(() => {
    if (!bulkNamePrefix) {
      toolState.actions.showMessage(
        "Please enter a name prefix for bulk generation"
      );
      return;
    }

    if (namespace === "CUSTOM" && !customNamespace) {
      toolState.actions.showMessage("Please enter a custom namespace UUID");
      return;
    }

    try {
      const count = Math.min(Math.max(1, bulkCount), 1000);
      const newUuids = Array.from({ length: count }, (_, i) =>
        generateUuidV5(`${bulkNamePrefix}${i + 1}`)
      );
      setUuidList(newUuids);
      toolState.setCode(newUuids[0]);
      toolState.actions.showMessage(`Generated ${count} UUIDs!`);
    } catch {
      toolState.actions.showMessage(
        "Error generating UUIDs. Check your inputs."
      );
    }
  }, [
    bulkCount,
    bulkNamePrefix,
    namespace,
    customNamespace,
    generateUuidV5,
    toolState,
  ]);

  const downloadUuids = useCallback(() => {
    if (uuidList.length === 0) {
      toolState.actions.showMessage(
        "No UUIDs to download. Generate some first!"
      );
      return;
    }
    const allUuids = uuidList.join("\n");
    const blob = new Blob([allUuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuid-v5-list.txt";
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
        title="UUID v5 Generator"
        description="Generate name-based UUID v5 using SHA-1 hash. Create reproducible UUIDs from namespace and name combinations."
        exampleCode={`Namespace: ${namespace}\nName: ${name}`}
        exampleOutput={`Generated UUID v5: ${currentUuid}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Configuration & Generation */}
        <div className="space-y-4">
          {/* Namespace Selection */}
          <div>
            <Typography variant="h6" className="mb-3">
              🔧 Configuration
            </Typography>
            <FormControl fullWidth className="mb-3">
              <InputLabel>Namespace</InputLabel>
              <Select
                value={namespace}
                label="Namespace"
                onChange={(e) => setNamespace(e.target.value)}
              >
                <MenuItem value="DNS">
                  DNS - Domain Names (e.g., example.com)
                </MenuItem>
                <MenuItem value="URL">
                  URL - Web Addresses (e.g., https://example.com)
                </MenuItem>
                <MenuItem value="OID">OID - ISO Object Identifiers</MenuItem>
                <MenuItem value="X500">
                  X500 - X.500 Distinguished Names
                </MenuItem>
                <MenuItem value="CUSTOM">Custom UUID Namespace</MenuItem>
              </Select>
            </FormControl>

            {namespace === "CUSTOM" && (
              <TextField
                fullWidth
                label="Custom Namespace UUID"
                value={customNamespace}
                onChange={(e) => setCustomNamespace(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="mb-3"
                helperText="Enter a valid UUID to use as namespace"
              />
            )}

            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name for UUID generation"
              helperText="Same namespace + name always produces the same UUID"
            />
          </div>

          {/* Current UUID Display */}
          <div>
            <Typography variant="h6" className="mb-3">
              🆔 Generated UUID v5
            </Typography>
            <TextField
              fullWidth
              value={currentUuid}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              className="font-mono"
              placeholder="Configure namespace and name above"
            />
            <Button
              variant="contained"
              onClick={generateNewUuid}
              startIcon={<RefreshIcon />}
              className="mt-3"
              fullWidth
              disabled={!name || (namespace === "CUSTOM" && !customNamespace)}
            >
              Generate & Add to List
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
              <TextField
                label="Name Prefix"
                value={bulkNamePrefix}
                onChange={(e) => setBulkNamePrefix(e.target.value)}
                size="small"
                placeholder="item-"
                helperText="Will generate: prefix1, prefix2, ..."
              />
            </div>
            <Button
              variant="outlined"
              onClick={generateBulkUuids}
              className="whitespace-nowrap"
              fullWidth
              disabled={
                !bulkNamePrefix || (namespace === "CUSTOM" && !customNamespace)
              }
            >
              Generate {bulkCount} UUIDs
            </Button>
          </div>

          {/* UUID v5 Info */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              About UUID v5:
            </Typography>
            <div className="text-sm space-y-1 text-gray-700">
              <div>• Name-based UUID using SHA-1 hash</div>
              <div>• Deterministic - same inputs = same UUID</div>
              <div>• Format: 8-4-4-4-12 hexadecimal digits</div>
              <div>• Perfect for reproducible identifiers</div>
            </div>
          </div>
        </div>

        {/* Right Panel - UUID List */}
        <div className="space-y-4">
          <Typography variant="h6">
            📋 Generated UUIDs ({uuidList.length})
          </Typography>

          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={copyCurrentUuid}
              startIcon={<ContentCopyIcon />}
              fullWidth
              disabled={uuidList.length === 0}
            >
              Copy All
            </Button>
            <Button
              variant="outlined"
              onClick={downloadUuids}
              fullWidth
              disabled={uuidList.length === 0}
            >
              Download
            </Button>
          </div>

          <div className="border border-gray-300 rounded max-h-96 overflow-auto">
            {uuidList.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No UUIDs generated yet. Configure and generate above.
              </div>
            ) : (
              <div className="divide-y">
                {uuidList.map((uuid, index) => (
                  <div key={index} className="p-3 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600">{uuid}</span>
                      <span className="text-xs text-gray-400">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Namespace Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <Typography variant="subtitle2" className="mb-2">
              Current Namespace:
            </Typography>
            <div className="text-xs font-mono text-gray-700 break-all">
              {namespace === "CUSTOM"
                ? customNamespace || "Not configured"
                : NAMESPACES[namespace as keyof typeof NAMESPACES]}
            </div>
            <Typography variant="caption" className="mt-2 block text-gray-600">
              {namespace === "DNS" && "Use for domain names"}
              {namespace === "URL" && "Use for complete web URLs"}
              {namespace === "OID" && "Use for ISO OIDs"}
              {namespace === "X500" && "Use for X.500 DNs"}
              {namespace === "CUSTOM" && "Your custom namespace"}
            </Typography>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
