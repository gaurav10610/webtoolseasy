"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  LinearProgress,
  Grid,
  TextField,
} from "@mui/material";
import {
  CloudUpload,
  Download,
  Merge,
  CallSplit,
  Delete,
  PictureAsPdf,
} from "@mui/icons-material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";

interface PdfFile {
  id: string;
  file: File;
  pageCount: number;
  isProcessing: boolean;
  error?: string;
}

export default function PdfEditor({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [mergedPdf, setMergedPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [splitPageRange, setSplitPageRange] = useState<string>("");
  const [selectedFileId, setSelectedFileId] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newPdfFiles: PdfFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type !== "application/pdf") {
          setError(`${file.name} is not a PDF file`);
          continue;
        }

        const pdfFile: PdfFile = {
          id: crypto.randomUUID(),
          file,
          pageCount: 0,
          isProcessing: true,
        };

        newPdfFiles.push(pdfFile);
      }

      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      setError("");

      // Process files to get page counts
      for (const pdfFile of newPdfFiles) {
        try {
          // Dynamic import for PDF-lib
          const { PDFDocument } = await import("pdf-lib");
          const arrayBuffer = await pdfFile.file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const pageCount = pdf.getPageCount();

          setPdfFiles((prev) =>
            prev.map((f) =>
              f.id === pdfFile.id ? { ...f, pageCount, isProcessing: false } : f
            )
          );
        } catch {
          setPdfFiles((prev) =>
            prev.map((f) =>
              f.id === pdfFile.id
                ? { ...f, isProcessing: false, error: "Failed to load PDF" }
                : f
            )
          );
        }
      }

      toolState.actions.showMessage(
        `${newPdfFiles.length} PDF file(s) uploaded successfully!`
      );
    },
    [toolState.actions]
  );

  const removePdf = useCallback((id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const mergePdfs = useCallback(async () => {
    if (pdfFiles.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Dynamic import for PDF-lib
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        if (pdfFile.error) continue;

        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      setMergedPdf(url);
      toolState.actions.showMessage("PDFs merged successfully!");
    } catch {
      setError("Failed to merge PDFs");
    } finally {
      setLoading(false);
    }
  }, [pdfFiles, toolState.actions]);

  const splitPdf = useCallback(async () => {
    const selectedFile = pdfFiles.find((f) => f.id === selectedFileId);
    if (!selectedFile || !splitPageRange) {
      setError("Please select a PDF file and specify page range");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Dynamic import for PDF-lib
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await selectedFile.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      // Parse page range (e.g., "1-5", "1,3,5", "1-3,6-8")
      const pageRanges = splitPageRange.split(",").map((range) => range.trim());
      const pageIndices: number[] = [];

      for (const range of pageRanges) {
        if (range.includes("-")) {
          const [start, end] = range
            .split("-")
            .map((n) => parseInt(n.trim()) - 1);
          for (let i = start; i <= end; i++) {
            if (i >= 0 && i < selectedFile.pageCount) {
              pageIndices.push(i);
            }
          }
        } else {
          const pageIndex = parseInt(range) - 1;
          if (pageIndex >= 0 && pageIndex < selectedFile.pageCount) {
            pageIndices.push(pageIndex);
          }
        }
      }

      if (pageIndices.length === 0) {
        setError("Invalid page range specified");
        setLoading(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(sourcePdf, pageIndices);
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      // Download split PDF
      const link = document.createElement("a");
      link.href = url;
      link.download = `split_${selectedFile.file.name}`;
      link.click();

      toolState.actions.showMessage("PDF split successfully!");
    } catch {
      setError("Failed to split PDF");
    } finally {
      setLoading(false);
    }
  }, [pdfFiles, selectedFileId, splitPageRange, toolState.actions]);

  const downloadMerged = useCallback(() => {
    if (mergedPdf) {
      const link = document.createElement("a");
      link.href = mergedPdf;
      link.download = "merged.pdf";
      link.click();
    }
  }, [mergedPdf]);

  const buttons = useMemo(
    () => [
      ...(pdfFiles.length >= 2
        ? [
            {
              type: "custom" as const,
              text: "Merge PDFs",
              onClick: mergePdfs,
              icon: <Merge />,
              disabled: loading,
            },
          ]
        : []),
      ...(selectedFileId && splitPageRange
        ? [
            {
              type: "custom" as const,
              text: "Split PDF",
              onClick: splitPdf,
              icon: <CallSplit />,
              disabled: loading,
            },
          ]
        : []),
      ...(mergedPdf
        ? [
            {
              type: "custom" as const,
              text: "Download Merged",
              onClick: downloadMerged,
              icon: <Download />,
            },
          ]
        : []),
      ...createCommonButtons({
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [
      pdfFiles.length,
      selectedFileId,
      splitPageRange,
      mergedPdf,
      loading,
      toolState,
      mergePdfs,
      splitPdf,
      downloadMerged,
    ]
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
        title="PDF Editor"
        description="Merge multiple PDF files or split PDF pages online. Easy-to-use PDF manipulation tool."
        exampleCode="Upload PDF files and merge them or split specific pages"
        exampleOutput="Merged PDF file or split PDF with selected pages"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="w-full space-y-6">
        {/* File Upload */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload PDF Files
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,application/pdf"
            multiple
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            fullWidth
            sx={{ mb: 2 }}
          >
            Choose PDF Files
          </Button>
          <Typography variant="body2" color="text.secondary">
            Select one or more PDF files to merge or split
          </Typography>
        </Paper>

        {/* Loading */}
        {loading && (
          <Paper sx={{ p: 3 }}>
            <Typography gutterBottom>Processing PDFs...</Typography>
            <LinearProgress />
          </Paper>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* PDF Files List */}
        {pdfFiles.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              PDF Files ({pdfFiles.length})
            </Typography>
            <List>
              {pdfFiles.map((pdfFile) => (
                <ListItem
                  key={pdfFile.id}
                  sx={{
                    border:
                      selectedFileId === pdfFile.id
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                    borderRadius: 1,
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedFileId(pdfFile.id)}
                >
                  <PictureAsPdf sx={{ mr: 2, color: "error.main" }} />
                  <ListItemText
                    primary={pdfFile.file.name}
                    secondary={
                      pdfFile.isProcessing
                        ? "Processing..."
                        : pdfFile.error
                        ? `Error: ${pdfFile.error}`
                        : `${pdfFile.pageCount} pages • ${(
                            pdfFile.file.size /
                            1024 /
                            1024
                          ).toFixed(2)} MB`
                    }
                  />
                  {pdfFile.isProcessing && (
                    <LinearProgress sx={{ width: 100, mr: 2 }} />
                  )}
                  {pdfFile.error && (
                    <Chip
                      label="Error"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  )}
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePdf(pdfFile.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Split Controls */}
        {pdfFiles.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Split PDF
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  Selected file:{" "}
                  {pdfFiles.find((f) => f.id === selectedFileId)?.file.name ||
                    "None"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Page Range"
                  placeholder="e.g., 1-5, 1,3,5, or 1-3,6-8"
                  value={splitPageRange}
                  onChange={(e) => setSplitPageRange(e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Click on a PDF file above to select it for splitting. Specify page
              numbers (1-based) to extract.
            </Typography>
          </Paper>
        )}

        {/* Merged PDF Result */}
        {mergedPdf && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Merged PDF Ready
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              Your PDFs have been successfully merged! Click download to save
              the file.
            </Alert>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={downloadMerged}
                size="large"
              >
                Download Merged PDF
              </Button>
            </Box>
          </Paper>
        )}
      </div>
    </ToolLayout>
  );
}
