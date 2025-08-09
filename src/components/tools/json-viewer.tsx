"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Typography,
  Box,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

interface JsonNode {
  key: string;
  value: unknown;
  type: string;
  path: string;
  isRoot?: boolean;
}

export default function JsonViewer({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialJson = `{
  "name": "WebToolsEasy JSON Viewer",
  "version": "2.0.0",
  "description": "Free online JSON viewer with tree structure and search",
  "features": {
    "treeView": true,
    "search": true,
    "validation": true,
    "statistics": true
  },
  "categories": ["Programming", "Development", "JSON"],
  "tools": [
    {
      "id": 1,
      "name": "JSON Formatter",
      "url": "/tools/json-formatter"
    },
    {
      "id": 2,
      "name": "JavaScript Editor",
      "url": "/tools/javascript-editor"
    }
  ],
  "metadata": {
    "created": "2024-01-01T00:00:00Z",
    "updated": "2025-08-09T12:00:00Z",
    "author": "WebToolsEasy Team"
  },
  "stats": {
    "users": 10000,
    "countries": 50,
    "satisfaction": 4.8
  }
}`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: initialJson,
  });

  const [jsonTree, setJsonTree] = useState<JsonNode[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Parse JSON and create tree structure
  const parseJsonToTree = useCallback(
    (obj: unknown, parentKey = "", path = ""): JsonNode[] => {
      if (obj === null)
        return [{ key: parentKey, value: null, type: "null", path }];
      if (typeof obj !== "object") {
        return [{ key: parentKey, value: obj, type: typeof obj, path }];
      }

      const nodes: JsonNode[] = [];

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const currentPath = path ? `${path}[${index}]` : `[${index}]`;
          const children = parseJsonToTree(item, `[${index}]`, currentPath);
          nodes.push(...children);
        });
      } else {
        Object.entries(obj as Record<string, unknown>).forEach(
          ([key, value]) => {
            const currentPath = path ? `${path}.${key}` : key;
            const children = parseJsonToTree(value, key, currentPath);
            nodes.push(...children);
          }
        );
      }

      return nodes;
    },
    []
  );

  const validateAndParseJson = useCallback(() => {
    try {
      const parsed = JSON.parse(toolState.code);
      const tree = parseJsonToTree(parsed, "root", "");
      setJsonTree(tree);
      setError("");

      // Auto-expand first level
      const firstLevelPaths = new Set(
        tree
          .filter(
            (node) =>
              (!node.path.includes(".") && !node.path.includes("[")) ||
              (node.path.match(/\./g) || []).length === 0
          )
          .map((node) => node.path)
      );
      setExpandedNodes(firstLevelPaths);

      toolState.actions.showMessage("JSON parsed successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid JSON format";
      setError(errorMessage);
      setJsonTree([]);
      toolState.actions.showMessage("JSON validation failed");
    }
  }, [toolState.code, toolState.actions, parseJsonToTree]);

  // Filter tree nodes based on search
  const filteredTree = useMemo(() => {
    if (!searchTerm) return jsonTree;

    return jsonTree.filter(
      (node) =>
        node.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof node.value === "string" &&
          node.value.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jsonTree, searchTerm]);

  // Group nodes by parent for tree structure
  const groupedNodes = useMemo(() => {
    const groups: { [key: string]: JsonNode[] } = {};

    filteredTree.forEach((node) => {
      const pathParts = node.path.split(/[.\[\]]+/).filter(Boolean);
      const parentPath = pathParts.slice(0, -1).join(".");
      const groupKey = parentPath || "root";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(node);
    });

    return groups;
  }, [filteredTree]);

  // Calculate JSON statistics
  const jsonStats = useMemo(() => {
    try {
      const parsed = JSON.parse(toolState.code);

      const countItems = (
        obj: unknown
      ): {
        objects: number;
        arrays: number;
        primitives: number;
        totalKeys: number;
      } => {
        let objects = 0,
          arrays = 0,
          primitives = 0,
          totalKeys = 0;

        if (Array.isArray(obj)) {
          arrays++;
          obj.forEach((item) => {
            const counts = countItems(item);
            objects += counts.objects;
            arrays += counts.arrays;
            primitives += counts.primitives;
            totalKeys += counts.totalKeys;
          });
        } else if (obj !== null && typeof obj === "object") {
          objects++;
          const keys = Object.keys(obj as Record<string, unknown>);
          totalKeys += keys.length;

          keys.forEach((key) => {
            const counts = countItems((obj as Record<string, unknown>)[key]);
            objects += counts.objects;
            arrays += counts.arrays;
            primitives += counts.primitives;
            totalKeys += counts.totalKeys;
          });
        } else {
          primitives++;
        }

        return { objects, arrays, primitives, totalKeys };
      };

      const stats = countItems(parsed);
      const jsonString = JSON.stringify(parsed);
      const sizeInBytes = new Blob([jsonString]).size;
      const levels = Math.max(
        ...jsonTree.map(
          (node) =>
            (node.path.match(/\./g) || []).length +
            (node.path.match(/\[/g) || []).length
        )
      );

      return {
        ...stats,
        size: sizeInBytes,
        characters: jsonString.length,
        levels: levels + 1,
        isValid: true,
      };
    } catch {
      return {
        objects: 0,
        arrays: 0,
        primitives: 0,
        totalKeys: 0,
        size: 0,
        characters: toolState.code.length,
        levels: 0,
        isValid: false,
      };
    }
  }, [toolState.code, jsonTree]);

  const toggleNodeExpansion = useCallback((path: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  const renderJsonValue = useCallback((node: JsonNode) => {
    const { value, type } = node;

    switch (type) {
      case "string":
        return (
          <Chip label={`"${String(value)}"`} size="small" color="success" />
        );
      case "number":
        return <Chip label={String(value)} size="small" color="info" />;
      case "boolean":
        return <Chip label={String(value)} size="small" color="warning" />;
      case "null":
        return <Chip label="null" size="small" color="default" />;
      case "object":
        return (
          <Chip
            label={Array.isArray(value) ? "Array" : "Object"}
            size="small"
            color="primary"
          />
        );
      default:
        return <Chip label={String(value)} size="small" />;
    }
  }, []);

  // Editor configuration
  const editorProps = useEditorConfig({
    language: "json",
    value: toolState.code,
    onChange: toolState.setCode,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "View JSON",
        onClick: validateAndParseJson,
        icon: <VisibilityIcon />,
      },
      ...createCommonButtons({
        onCopy: () =>
          toolState.actions.copyText(
            toolState.code,
            "JSON copied to clipboard!"
          ),
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [validateAndParseJson, toolState]
  );

  // Parse initial JSON on mount
  useEffect(() => {
    try {
      if (initialJson.trim()) {
        const parsed = JSON.parse(initialJson);
        const tree = parseJsonToTree(parsed, "root", "");
        setJsonTree(tree);
        setError("");

        // Auto-expand first level
        const firstLevelPaths = new Set(
          tree
            .filter(
              (node) =>
                (!node.path.includes(".") && !node.path.includes("[")) ||
                (node.path.match(/\./g) || []).length === 0
            )
            .map((node) => node.path)
        );
        setExpandedNodes(firstLevelPaths);
      }
    } catch {
      // Silently handle initial parse errors
      setError("");
      setJsonTree([]);
    }
  }, [parseJsonToTree, initialJson]); // Use initialJson instead of toolState.code

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
        title="JSON Viewer Online"
        description="Free online JSON viewer with tree structure display. View, validate and analyze JSON data with expand/collapse features and search functionality."
        exampleCode={initialJson}
        exampleOutput="Tree structure view with expandable nodes and JSON statistics"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <CodeEditorLayout
        leftPanel={
          <div className="flex flex-col gap-2">
            <Typography variant="h6" className="!text-sm !font-semibold">
              JSON Input
            </Typography>
            <SingleCodeEditorWithHeaderV2
              editorHeading="Paste your JSON data here"
              codeEditorProps={editorProps}
              themeOption="vs-dark"
              className={
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }
            />
          </div>
        }
        rightPanel={
          <div className="flex flex-col gap-2">
            <Typography variant="h6" className="!text-sm !font-semibold">
              JSON Tree View
            </Typography>
            <div
              className={`flex flex-col gap-2 ${
                toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
              }`}
            >
              {/* Search Box */}
              <TextField
                size="small"
                placeholder="Search in JSON..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon className="mr-2 text-gray-400" />,
                }}
                className="mb-2"
              />

              {/* Error Display */}
              {error && (
                <Alert severity="error" className="!mb-2">
                  <Typography variant="body2">
                    <strong>JSON Error:</strong> {error}
                  </Typography>
                </Alert>
              )}

              {/* Tree View */}
              <div className="flex-1 border border-gray-300 rounded p-2 overflow-auto bg-white">
                {jsonTree.length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(groupedNodes).map(([groupKey, nodes]) => (
                      <div key={groupKey}>
                        {groupKey !== "root" && (
                          <Accordion
                            expanded={expandedNodes.has(groupKey)}
                            onChange={() => toggleNodeExpansion(groupKey)}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography variant="body2" className="font-mono">
                                <DataObjectIcon
                                  className="mr-1"
                                  fontSize="small"
                                />
                                {groupKey}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {nodes.map((node, idx) => (
                                <div
                                  key={idx}
                                  className="ml-4 mb-1 flex items-center gap-2"
                                >
                                  <Typography
                                    variant="body2"
                                    className="font-mono text-blue-600"
                                  >
                                    {node.key}:
                                  </Typography>
                                  {renderJsonValue(node)}
                                  <Typography
                                    variant="caption"
                                    className="text-gray-500"
                                  >
                                    ({node.type})
                                  </Typography>
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        )}

                        {groupKey === "root" &&
                          nodes.map((node, idx) => (
                            <div
                              key={idx}
                              className="mb-1 flex items-center gap-2"
                            >
                              <Typography
                                variant="body2"
                                className="font-mono text-blue-600"
                              >
                                {node.key}:
                              </Typography>
                              {renderJsonValue(node)}
                              <Typography
                                variant="caption"
                                className="text-gray-500"
                              >
                                ({node.type})
                              </Typography>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    Enter valid JSON data and click &quot;View JSON&quot; to see
                    the tree structure.
                  </div>
                )}
              </div>

              {/* JSON Statistics */}
              <Box className="p-3 bg-gray-50 border border-gray-200 rounded">
                <Typography
                  variant="h6"
                  className="!text-sm !font-semibold mb-2"
                >
                  📊 JSON Analysis
                </Typography>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Objects:</span>
                    <span className="font-medium">{jsonStats.objects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Arrays:</span>
                    <span className="font-medium">{jsonStats.arrays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keys:</span>
                    <span className="font-medium">{jsonStats.totalKeys}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Levels:</span>
                    <span className="font-medium">{jsonStats.levels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">
                      {(jsonStats.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium ${
                        jsonStats.isValid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {jsonStats.isValid ? "Valid" : "Invalid"}
                    </span>
                  </div>
                </div>
              </Box>

              {/* Tips */}
              <Box className="p-3 bg-blue-50 border border-blue-200 rounded">
                <Typography
                  variant="h6"
                  className="!text-sm !font-semibold mb-2 text-blue-800"
                >
                  💡 JSON Viewer Tips
                </Typography>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>
                    • Use the search box to find specific keys or values
                  </div>
                  <div>
                    • Expand/collapse nodes to explore the JSON structure
                  </div>
                  <div>• Check the analysis panel for JSON statistics</div>
                  <div>• Copy the formatted JSON to your clipboard</div>
                </div>
              </Box>
            </div>
          </div>
        }
        isFullScreen={toolState.isFullScreen}
      />
    </ToolLayout>
  );
}
