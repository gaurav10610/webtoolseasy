"use client";

import { useState, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { jsPDF } from "jspdf";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";

enum ProcessingState {
  IDLE = "idle",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

export default function WordToPDF({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
  });

  const [processingState, setProcessingState] = useState<ProcessingState>(
    ProcessingState.IDLE
  );
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // Handle file upload
  const handleFileSelect = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      // Accept various document formats
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
      ];

      if (!validTypes.includes(file.type)) {
        setError("Please upload a Word document (.docx, .doc) or text file");
        toolState.actions.showMessage("Please upload a valid document file");
        return;
      }

      try {
        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setTextContent(content);
          setWordFile(file);
          setError("");
          setPdfBlob(null);
          toolState.actions.showMessage("Document loaded successfully");
        };
        reader.readAsText(file);
      } catch {
        setError("Failed to load document file");
        toolState.actions.showMessage("Failed to load document file");
      }
    },
    [toolState.actions]
  );

  const handleError = useCallback(
    (error: string) => {
      setError(error);
      toolState.actions.showMessage(error);
    },
    [toolState.actions]
  );

  // Convert to PDF
  const convertToPDF = useCallback(async () => {
    if (!wordFile || !textContent) {
      toolState.actions.showMessage("Please upload a document file first");
      return;
    }

    try {
      setProcessingState(ProcessingState.PROCESSING);
      setError("");

      // Create PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      const lineHeight = 7;
      let y = margin;

      // Split text into lines
      const lines = doc.splitTextToSize(textContent, maxWidth);

      // Add text to PDF
      doc.setFontSize(12);
      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      }

      // Create blob
      const blob = doc.output("blob");
      setPdfBlob(blob);
      setProcessingState(ProcessingState.COMPLETED);
      toolState.actions.showMessage("Document converted to PDF successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to convert to PDF";
      setError(errorMessage);
      setProcessingState(ProcessingState.IDLE);
      toolState.actions.showMessage("Failed to convert to PDF");
    }
  }, [wordFile, textContent, toolState.actions]);

  // Download PDF
  const downloadPDF = useCallback(() => {
    if (!pdfBlob) {
      toolState.actions.showMessage("No PDF to download");
      return;
    }

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${
      wordFile?.name.replace(/\.[^/.]+$/, "") || "document"
    }.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toolState.actions.showMessage("PDF downloaded successfully!");
  }, [pdfBlob, wordFile, toolState.actions]);

  // Reset
  const reset = useCallback(() => {
    setWordFile(null);
    setTextContent("");
    setProcessingState(ProcessingState.IDLE);
    setError("");
    setPdfBlob(null);
  }, []);

  // Button configuration
  const buttons = createCommonButtons({});

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Word to PDF Converter"
        description="Convert Word documents to PDF format. Upload your DOCX or DOC file and get a professional PDF."
        exampleCode="Upload Word → Convert → Download PDF"
        exampleOutput="Professional PDF document from Word file"
      />

      <ToolControls buttons={buttons} />

      <div className="space-y-6 mt-6">
        {/* Error Display */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* File Upload */}
        {!wordFile && processingState === ProcessingState.IDLE && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Upload Word Document
              </Typography>
              <FileUploadWithDragDrop
                onFileSelect={handleFileSelect}
                onError={handleError}
                accept=".doc,.docx,.txt"
                maxSize={FILE_SIZE_PRESETS.LARGE}
                multiple={false}
              />
              <Alert severity="info" className="mt-4">
                Supported formats: .docx, .doc, .txt
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Document Preview & Edit */}
        {wordFile && processingState === ProcessingState.IDLE && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Document Content
              </Typography>
              <Typography variant="body2" className="mb-4 text-gray-600">
                <strong>File:</strong> {wordFile.name}
              </Typography>
              <TextField
                multiline
                rows={15}
                fullWidth
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Document content will appear here..."
                variant="outlined"
                className="mb-4"
              />
              <div className="flex gap-4">
                <button
                  onClick={convertToPDF}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UploadIcon />
                  Convert to PDF
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <DeleteIcon />
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing */}
        {processingState === ProcessingState.PROCESSING && (
          <Card>
            <CardContent className="flex flex-col items-center py-8">
              <CircularProgress size={48} />
              <Typography variant="body1" className="mt-4">
                Converting to PDF...
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* PDF Ready */}
        {processingState === ProcessingState.COMPLETED && pdfBlob && (
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                PDF Created Successfully
              </Typography>
              <Alert severity="success" className="mb-4">
                Your document has been converted to PDF format
              </Alert>
              <div className="flex gap-4">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <DownloadIcon />
                  Download PDF
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <DeleteIcon />
                  Convert Another
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-2">
              How to Use
            </Typography>
            <div className="text-gray-600 space-y-2">
              <Typography variant="body2" component="div">
                1. Upload your Word document (.docx, .doc) or text file
              </Typography>
              <Typography variant="body2" component="div">
                2. Review and edit the content if needed
              </Typography>
              <Typography variant="body2" component="div">
                3. Click &quot;Convert to PDF&quot; to generate PDF
              </Typography>
              <Typography variant="body2" component="div">
                4. Download your professional PDF document
              </Typography>
            </div>
            <Alert severity="info" className="mt-4">
              Note: Complex formatting from Word documents may not be fully
              preserved. This tool works best with text-based documents.
            </Alert>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
