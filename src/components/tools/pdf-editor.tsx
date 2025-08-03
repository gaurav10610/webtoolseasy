"use client";

import React, { useState, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  TextField,
  Switch,
  FormControlLabel,
  Slider,
  Button,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FilePreview } from "../lib/filePreview";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";

// Import PDF.js CSS
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Icons
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import MergeIcon from "@mui/icons-material/Merge";
import SplitIcon from "@mui/icons-material/CallSplit";
import RotateIcon from "@mui/icons-material/RotateRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

// Set up PDF.js worker
if (typeof window !== "undefined") {
  // Use local worker file to avoid CDN issues
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

interface PDFFile {
  id: string;
  file: File;
  document?: PDFDocument;
  numPages: number;
}

interface TextAnnotation {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  pageIndex: number;
}

export default function PDFEditor({}: Readonly<ToolComponentProps>) {
  // State management
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState("#000000");
  const [error, setError] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfDocumentData, setPdfDocumentData] = useState<File | null>(null);
  const [documentKey, setDocumentKey] = useState<string>("");
  const [currentRotation, setCurrentRotation] = useState<number>(0);

  // Snackbar handler
  const handleSnackBarClose = () => setIsSnackBarOpen(false);

  const showMessage = (message: string) => {
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  // File handling
  const handleFileSelect = useCallback(
    async (files: FileList) => {
      setIsProcessing(true);
      const newFiles: PDFFile[] = [];

      for (const file of Array.from(files)) {
        if (file.type === "application/pdf") {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            const pdfFile: PDFFile = {
              id: crypto.randomUUID(),
              file,
              document: pdfDoc,
              numPages: pdfDoc.getPageCount(),
            };

            newFiles.push(pdfFile);
          } catch (err) {
            console.error("Error loading PDF:", err);
            setError(`Failed to load PDF: ${file.name}`);
          }
        }
      }

      setPdfFiles((prev) => [...prev, ...newFiles]);
      if (newFiles.length > 0 && !selectedFile) {
        setSelectedFile(newFiles[0]);
        setCurrentRotation(0); // Reset rotation for new file
        setNumPages(0); // Reset numPages to trigger fresh onDocumentLoadSuccess
        // Store the original file data for the PDF viewer - use original file
        setPdfDocumentData(newFiles[0].file);
        setDocumentKey(`file-${newFiles[0].id}`); // Use file ID for stable key
      }
      setIsProcessing(false);
    },
    [selectedFile]
  );

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  // PDF Operations
  const mergePDFs = useCallback(async () => {
    if (pdfFiles.length < 2) {
      showMessage("Please upload at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        if (pdfFile.document) {
          const pages = await mergedPdf.copyPages(
            pdfFile.document,
            pdfFile.document.getPageIndices()
          );
          pages.forEach((page) => mergedPdf.addPage(page));
        }
      }

      const pdfBytes = await mergedPdf.save();
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      link.click();

      URL.revokeObjectURL(url);
      showMessage("PDFs merged successfully!");
    } catch (err) {
      console.error("Error merging PDFs:", err);
      setError("Failed to merge PDFs");
    }
    setIsProcessing(false);
  }, [pdfFiles]);

  const splitPDF = useCallback(async () => {
    if (!selectedFile || !selectedFile.document) {
      showMessage("Please select a PDF file to split");
      return;
    }

    setIsProcessing(true);
    try {
      const originalPdf = selectedFile.document;
      const pageCount = originalPdf.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        const uint8Array = new Uint8Array(pdfBytes);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFile.file.name.replace(".pdf", "")}-page-${
          i + 1
        }.pdf`;
        link.click();

        URL.revokeObjectURL(url);
      }

      showMessage(`PDF split into ${pageCount} pages successfully!`);
    } catch (err) {
      console.error("Error splitting PDF:", err);
      setError("Failed to split PDF");
    }
    setIsProcessing(false);
  }, [selectedFile]);

  const rotatePage = useCallback(
    async (rotationDegrees: number) => {
      if (!selectedFile || !selectedFile.document) {
        showMessage("Please select a PDF file");
        return;
      }

      setIsProcessing(true);
      try {
        // Calculate the new total rotation
        const newTotalRotation = (currentRotation + rotationDegrees) % 360;

        const page = selectedFile.document.getPage(currentPage - 1);
        // Set the absolute rotation, not relative
        page.setRotation(degrees(newTotalRotation));

        // Generate updated PDF data to refresh the preview
        const updatedPdfBytes = await selectedFile.document.save();
        const uint8Array = new Uint8Array(updatedPdfBytes);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const updatedFile = new File(
          [blob],
          `rotated_${selectedFile.file.name}`,
          {
            type: "application/pdf",
            lastModified: Date.now(),
          }
        );

        // Update the PDF document data for the viewer
        setPdfDocumentData(updatedFile);
        setDocumentKey(`file-${selectedFile.id}-rotated`); // Stable key for rotated version
        setNumPages(0); // Reset numPages to trigger fresh onDocumentLoadSuccess

        // Also update the selectedFile's document to the rotated version
        // so subsequent rotations are applied to the already rotated document
        const updatedPdfDoc = await PDFDocument.load(updatedPdfBytes);
        const updatedPdfFile: PDFFile = {
          ...selectedFile,
          file: updatedFile,
          document: updatedPdfDoc,
        };

        // Update the selectedFile and the pdfFiles array
        setSelectedFile(updatedPdfFile);
        setPdfFiles((prev) =>
          prev.map((file) =>
            file.id === selectedFile.id ? updatedPdfFile : file
          )
        );

        // Track total rotation
        setCurrentRotation(newTotalRotation);

        showMessage(
          `Page rotated ${rotationDegrees} degrees (Total: ${newTotalRotation}°)`
        );
      } catch (err) {
        console.error("Error rotating page:", err);
        setError("Failed to rotate page");
      }
      setIsProcessing(false);
    },
    [selectedFile, currentPage, currentRotation]
  );

  const addTextAnnotation = useCallback(
    async (x: number, y: number) => {
      if (!textInput.trim()) {
        showMessage("Please enter text to add");
        return;
      }

      const newAnnotation: TextAnnotation = {
        id: crypto.randomUUID(),
        text: textInput,
        x,
        y,
        fontSize,
        color: textColor,
        pageIndex: currentPage - 1,
      };

      setTextAnnotations((prev) => [...prev, newAnnotation]);
      // Don't clear textInput immediately - let user add multiple annotations with same text
      showMessage(
        `Text annotation "${textInput}" added at page ${currentPage}`
      );
    },
    [textInput, fontSize, textColor, currentPage]
  );

  const removeAnnotation = useCallback((annotationId: string) => {
    setTextAnnotations((prev) => prev.filter((ann) => ann.id !== annotationId));
    showMessage("Annotation removed");
  }, []);

  const clearAllAnnotations = useCallback(() => {
    setTextAnnotations([]);
    showMessage("All annotations cleared");
  }, []);

  const saveAnnotatedPDF = useCallback(async () => {
    if (!selectedFile || !selectedFile.document) {
      showMessage("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.load(await selectedFile.document.save());
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add text annotations
      textAnnotations.forEach((annotation) => {
        const page = pdfDoc.getPage(annotation.pageIndex);
        const { height } = page.getSize();

        page.drawText(annotation.text, {
          x: annotation.x,
          y: height - annotation.y,
          size: annotation.fontSize,
          font,
          color: rgb(
            parseInt(annotation.color.slice(1, 3), 16) / 255,
            parseInt(annotation.color.slice(3, 5), 16) / 255,
            parseInt(annotation.color.slice(5, 7), 16) / 255
          ),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedFile.file.name.replace(
        ".pdf",
        ""
      )}-annotated.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      showMessage("Annotated PDF saved successfully!");
    } catch (err) {
      console.error("Error saving annotated PDF:", err);
      setError("Failed to save annotated PDF");
    }
    setIsProcessing(false);
  }, [selectedFile, textAnnotations]);

  const removeFile = useCallback(
    (id: string) => {
      setPdfFiles((prev) => prev.filter((file) => file.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
        setCurrentPage(1);
      }
    },
    [selectedFile]
  );

  const selectFile = useCallback(
    async (id: string) => {
      const file = pdfFiles.find((f) => f.id === id);
      if (file) {
        setSelectedFile(file);
        setCurrentPage(1);
        setCurrentRotation(0); // Reset rotation for new file
        setNumPages(0); // Reset numPages to trigger fresh onDocumentLoadSuccess
        // Load the PDF data for the viewer - use original file
        setPdfDocumentData(file.file);
        setDocumentKey(`file-${file.id}`); // Use file ID for stable key
      }
    },
    [pdfFiles]
  );

  // PDF Document Load Handler
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    // Only reset to page 1 if we're on a page that doesn't exist in the new document
    setCurrentPage((prevPage) => (prevPage > numPages ? 1 : prevPage));
  };

  // Helper function to get the correct page count
  const getTotalPages = () => {
    return numPages > 0 ? numPages : selectedFile?.numPages || 0;
  };

  // PDF Viewer Component - Memoized to prevent unnecessary re-renders
  const PDFViewer = React.memo(() => {
    if (!selectedFile) return null;

    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="flex items-center gap-2">
              <PictureAsPdfIcon color="primary" />
              PDF Viewer - {selectedFile.file.name}
            </Typography>
            <div className="flex items-center gap-2">
              <Button
                startIcon={<ZoomOutIcon />}
                onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
                size="small"
                variant="outlined"
              />
              <Typography variant="body2" className="min-w-12 text-center">
                {Math.round(zoom * 100)}%
              </Typography>
              <Button
                startIcon={<ZoomInIcon />}
                onClick={() => setZoom((prev) => Math.min(2.0, prev + 0.1))}
                size="small"
                variant="outlined"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Typography variant="body2">
              Page {currentPage} of {getTotalPages()}
            </Typography>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                size="small"
                variant="outlined"
              >
                Previous
              </Button>
              <Typography variant="body2" className="flex items-center px-3">
                {currentPage} / {getTotalPages()}
              </Typography>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(getTotalPages(), prev + 1))
                }
                disabled={currentPage === getTotalPages()}
                size="small"
                variant="outlined"
              >
                Next
              </Button>
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 min-h-96 flex justify-center items-center overflow-auto">
            <div className="relative">
              <Document
                key={documentKey} // Use stable document key
                file={pdfDocumentData || selectedFile.file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="text-center py-8">
                    <Typography>Loading PDF...</Typography>
                  </div>
                }
                error={
                  <div className="text-center py-8">
                    <Typography color="error">
                      Failed to load PDF. Please try a different file.
                    </Typography>
                  </div>
                }
              >
                <Page
                  pageNumber={currentPage}
                  scale={zoom}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    if (isAnnotationMode) {
                      const rect = event.currentTarget.getBoundingClientRect();
                      const x = event.clientX - rect.left;
                      const y = event.clientY - rect.top;
                      addTextAnnotation(x, y);
                    }
                  }}
                  className={`cursor-pointer shadow-lg ${
                    isAnnotationMode ? "border-2 border-blue-400" : ""
                  }`}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>

              {/* Overlay annotations for current page */}
              {textAnnotations
                .filter(
                  (annotation) => annotation.pageIndex === currentPage - 1
                )
                .map((annotation) => (
                  <div
                    key={annotation.id}
                    style={{
                      position: "absolute",
                      left: annotation.x,
                      top: annotation.y,
                      fontSize: `${annotation.fontSize * zoom}px`,
                      color: annotation.color,
                      fontFamily: "Helvetica, Arial, sans-serif",
                      pointerEvents: isAnnotationMode ? "auto" : "none",
                      cursor: isAnnotationMode ? "pointer" : "default",
                      backgroundColor: isAnnotationMode
                        ? "rgba(255, 255, 0, 0.3)"
                        : "transparent",
                      padding: isAnnotationMode ? "2px 4px" : "0",
                      borderRadius: isAnnotationMode ? "3px" : "0",
                      maxWidth: "200px",
                      wordWrap: "break-word",
                      userSelect: "none",
                    }}
                    onClick={(e) => {
                      if (isAnnotationMode) {
                        e.stopPropagation();
                        removeAnnotation(annotation.id);
                      }
                    }}
                    title={
                      isAnnotationMode
                        ? "Click to remove this annotation"
                        : annotation.text
                    }
                  >
                    {annotation.text}
                  </div>
                ))}
            </div>
          </div>

          {isAnnotationMode && (
            <Alert severity="info" className="mt-4">
              <strong>Annotation Mode Active:</strong> Click anywhere on the PDF
              to add text annotations. Click on existing annotations to remove
              them. Make sure to enter text in the annotation tools above first.
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  });

  PDFViewer.displayName = "PDFViewer";
  return (
    <div className="flex flex-col w-full gap-4">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={3000}
        handleClose={handleSnackBarClose}
      />

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {isProcessing && (
        <Alert severity="info">Processing PDF... Please wait.</Alert>
      )}

      {/* File Upload Section */}
      {pdfFiles.length === 0 && (
        <Card>
          <CardContent>
            <FileUploadWithDragDrop
              accept="application/pdf"
              multiple={true}
              allowedTypes={FILE_TYPE_PRESETS.DOCUMENTS}
              maxSize={FILE_SIZE_PRESETS.LARGE}
              onFileSelect={handleFileSelect}
              onError={handleError}
              title="Upload PDF Files"
              subtitle="Drag and drop PDF files here or click to browse"
              supportText="Supports PDF files up to 10MB each"
            />
          </CardContent>
        </Card>
      )}

      {/* Main Interface - Show after files are uploaded */}
      {pdfFiles.length > 0 && (
        <div className="space-y-6">
          {/* Top Row - File Management, Operations, and Annotation Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* File Management */}
            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6">PDFs ({pdfFiles.length})</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.multiple = true;
                      input.accept = "application/pdf";
                      input.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files) handleFileSelect(files);
                      };
                      input.click();
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Add More
                  </Button>
                </div>

                <FilePreview
                  files={pdfFiles.map((file) => ({
                    id: file.id,
                    file: file.file,
                    preview: undefined,
                    isSelected: selectedFile?.id === file.id,
                  }))}
                  onFileSelect={selectFile}
                  onFileRemove={removeFile}
                  previewSize="small"
                  layout="list"
                />
              </CardContent>
            </Card>

            {/* PDF Operations */}
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4">
                  PDF Operations
                </Typography>

                <div className="space-y-2">
                  <Button
                    startIcon={<MergeIcon />}
                    onClick={mergePDFs}
                    disabled={pdfFiles.length < 2 || isProcessing}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Merge PDFs
                  </Button>
                  <Button
                    startIcon={<SplitIcon />}
                    onClick={splitPDF}
                    disabled={!selectedFile || isProcessing}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Split PDF
                  </Button>

                  <div className="flex gap-1">
                    <Button
                      startIcon={<RotateIcon />}
                      onClick={() => rotatePage(90)}
                      disabled={!selectedFile || isProcessing}
                      variant="contained"
                      color="info"
                      size="small"
                      className="flex-1"
                    >
                      90°
                    </Button>
                    <Button
                      onClick={() => rotatePage(180)}
                      disabled={!selectedFile || isProcessing}
                      variant="contained"
                      color="info"
                      size="small"
                      className="flex-1"
                    >
                      180°
                    </Button>
                    <Button
                      onClick={() => rotatePage(270)}
                      disabled={!selectedFile || isProcessing}
                      variant="contained"
                      color="info"
                      size="small"
                      className="flex-1"
                    >
                      270°
                    </Button>
                  </div>

                  {currentRotation > 0 && (
                    <Button
                      onClick={() => rotatePage(-currentRotation)}
                      disabled={!selectedFile || isProcessing}
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      Reset (Currently: {currentRotation}°)
                    </Button>
                  )}

                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={saveAnnotatedPDF}
                    disabled={!selectedFile || isProcessing}
                    fullWidth
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Annotation Tools */}
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4">
                  Annotation Tools
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={isAnnotationMode}
                      onChange={(e) => setIsAnnotationMode(e.target.checked)}
                    />
                  }
                  label="Enable Annotations"
                  className="mb-4"
                />

                {isAnnotationMode && (
                  <div className="space-y-3">
                    <TextField
                      label="Text to Add"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="Enter text"
                    />

                    <div className="flex gap-2 items-center">
                      <Typography variant="body2" className="text-xs">
                        Size:
                      </Typography>
                      <Slider
                        value={fontSize}
                        onChange={(_, value) => setFontSize(value as number)}
                        min={8}
                        max={72}
                        valueLabelDisplay="auto"
                        className="flex-1"
                        size="small"
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <Typography variant="body2" className="text-xs">
                        Color:
                      </Typography>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-6 border rounded cursor-pointer"
                      />
                    </div>

                    {textAnnotations.length > 0 && (
                      <div className="space-y-2">
                        <Typography
                          variant="body2"
                          className="text-xs font-medium"
                        >
                          Annotations ({textAnnotations.length}):
                        </Typography>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {textAnnotations.map((annotation) => (
                            <div
                              key={annotation.id}
                              className="flex justify-between items-center p-2 bg-gray-100 rounded text-xs"
                            >
                              <span className="truncate flex-1">
                                Page {annotation.pageIndex + 1}: &ldquo;
                                {annotation.text}&rdquo;
                              </span>
                              <Button
                                size="small"
                                onClick={() => removeAnnotation(annotation.id)}
                                color="error"
                                variant="text"
                                className="text-xs min-w-0 px-1"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={clearAllAnnotations}
                          size="small"
                          variant="outlined"
                          color="secondary"
                          fullWidth
                        >
                          Clear All
                        </Button>
                      </div>
                    )}

                    <Alert severity="info" className="text-xs">
                      Click on PDF to add text. Click on existing annotations to
                      remove them.
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Full Width PDF Viewer */}
          <PDFViewer />
        </div>
      )}
    </div>
  );
}
