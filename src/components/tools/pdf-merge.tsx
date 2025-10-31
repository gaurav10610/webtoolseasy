"use client";

import {
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState, useCallback } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import MergeIcon from "@mui/icons-material/Merge";
import DownloadIcon from "@mui/icons-material/Download";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { PDFDocument } from "pdf-lib";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

interface PDFFileInfo {
  id: string;
  file: File;
  name: string;
  pages: number;
}

export default function PDFMerge({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [pdfFiles, setPdfFiles] = useState<PDFFileInfo[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newPdfFiles: PDFFileInfo[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "application/pdf") {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pageCount = pdfDoc.getPageCount();

            newPdfFiles.push({
              id: crypto.randomUUID(),
              file,
              name: file.name,
              pages: pageCount,
            });
          } catch {
            toolState.actions.showMessage("Failed to load: " + file.name);
          }
        }
      }

      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      event.target.value = "";
    },
    [toolState.actions]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setPdfFiles((prev) => prev.filter((pdf) => pdf.id !== id));
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === index) return;

      setPdfFiles((prev) => {
        const newFiles = [...prev];
        const draggedFile = newFiles[draggedIndex];
        newFiles.splice(draggedIndex, 1);
        newFiles.splice(index, 0, draggedFile);
        return newFiles;
      });
      setDraggedIndex(index);
    },
    [draggedIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleMergePDFs = useCallback(async () => {
    if (pdfFiles.length < 2) {
      toolState.actions.showMessage("Please add at least 2 PDF files");
      return;
    }

    try {
      setProcessing(true);
      setMergedPdfUrl("");

      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([mergedPdfBytes as any], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);
      toolState.actions.showMessage("PDFs merged successfully!");
    } catch {
      toolState.actions.showMessage("Failed to merge PDFs. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [pdfFiles, toolState.actions]);

  const handleDownload = useCallback(() => {
    if (!mergedPdfUrl) return;

    const link = document.createElement("a");
    link.href = mergedPdfUrl;
    link.download = "merged.pdf";
    link.click();
  }, [mergedPdfUrl]);

  const totalPages = pdfFiles.reduce((sum, pdf) => sum + pdf.pages, 0);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="PDF Merge"
        description="Combine multiple PDF files into one document. Drag and drop to reorder before merging."
        exampleCode="Upload 2 or more PDF files"
        exampleOutput="Single merged PDF file"
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {/* Upload Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <PictureAsPdfIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Select PDF Files to Merge
              </Typography>
            </div>

            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="pdf-upload"
              type="file"
              multiple
              onChange={handleFileSelect}
            />
            <label htmlFor="pdf-upload">
              <Button
                variant="contained"
                component="span"
                size="large"
                fullWidth
                startIcon={<PictureAsPdfIcon />}
              >
                Select PDF Files
              </Button>
            </label>

            {pdfFiles.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <Typography variant="body2" className="text-gray-700">
                  <strong>{pdfFiles.length}</strong> PDF file(s) added •{" "}
                  <strong>{totalPages}</strong> total pages
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PDF List */}
        {pdfFiles.length > 0 && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-3 text-gray-800">
                PDF Files ({pdfFiles.length})
              </Typography>
              <Typography variant="body2" className="mb-3 text-gray-600">
                Drag files to reorder them before merging
              </Typography>

              <List className="space-y-2">
                {pdfFiles.map((pdf, index) => (
                  <ListItem
                    key={pdf.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className="bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
                    sx={{ padding: 2 }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <DragIndicatorIcon className="text-gray-400" />
                      <div className="flex items-center gap-2 flex-1">
                        <PictureAsPdfIcon color="error" />
                        <div className="flex-1 min-w-0">
                          <Typography
                            variant="body1"
                            className="truncate font-medium"
                          >
                            {index + 1}. {pdf.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
                            {pdf.pages} page{pdf.pages !== 1 ? "s" : ""}
                          </Typography>
                        </div>
                      </div>
                      <IconButton
                        onClick={() => handleRemoveFile(pdf.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={
                  processing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <MergeIcon />
                  )
                }
                onClick={handleMergePDFs}
                disabled={processing || pdfFiles.length < 2}
                className="mt-4"
              >
                {processing ? "Merging PDFs..." : "Merge PDFs"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {mergedPdfUrl && (
          <Card className="border-2 border-green-500">
            <CardContent>
              <div className="text-center">
                <Typography variant="h6" className="text-green-700 mb-2">
                  ✓ PDFs Merged Successfully!
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Your merged PDF is ready to download
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download Merged PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
