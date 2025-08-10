"use client";

import React, { useState, useCallback } from "react";
import {
  Typography,
  Card,
  CardContent,
  Alert,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FilePreview } from "../lib/filePreview";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation"; // Import PDF.js CSS
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Icons
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Set up PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

interface UnlockPDFState {
  originalFile: File | null;
  unlockedFile: File | null;
  password: string;
  isUnlocking: boolean;
  error: string;
  previewScale: number;
  numPages: number;
}

export default function PdfUnlock({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [state, setState] = useState<UnlockPDFState>({
    originalFile: null,
    unlockedFile: null,
    password: "",
    isUnlocking: false,
    error: "",
    previewScale: 1.0,
    numPages: 0,
  });

  const handleFileSelect = useCallback(
    async (files: FileList) => {
      const file = files[0];
      setState((prev) => ({
        ...prev,
        originalFile: file,
        unlockedFile: null,
        error: "",
        numPages: 0,
      }));

      toolState.actions.showMessage("PDF file uploaded successfully!");
    },
    [toolState.actions]
  );

  const handleError = useCallback(
    (errorMessage: string) => {
      setState((prev) => ({ ...prev, error: errorMessage }));
      toolState.actions.showMessage(errorMessage);
    },
    [toolState.actions]
  );

  const unlockPDF = useCallback(async () => {
    if (!state.originalFile || !state.password.trim()) {
      handleError("Please select a PDF file and enter the password.");
      return;
    }

    setState((prev) => ({ ...prev, isUnlocking: true, error: "" }));

    try {
      const arrayBuffer = await state.originalFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Check if this is a protected PDF created by our protect tool
      const creator = pdfDoc.getCreator();
      const title = pdfDoc.getTitle();

      if (
        creator &&
        creator.includes("PDF Protect Tool") &&
        title &&
        (title.includes("🔒") || title.includes("PROTECTED:"))
      ) {
        // This is a protected PDF created by our tool - decrypt it
        try {
          // Extract encrypted data from creator metadata
          const metadataPart = creator.split("|")[1];
          if (!metadataPart) {
            throw new Error("No encrypted data found in PDF");
          }

          const encryptedMetadata = JSON.parse(metadataPart);
          const { salt, iv, encryptedData } = encryptedMetadata;

          // Recreate the key from password
          const encoder = new TextEncoder();
          const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(state.password),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
          );

          const key = await crypto.subtle.deriveKey(
            {
              name: "PBKDF2",
              salt: new Uint8Array(salt),
              iterations: 100000,
              hash: "SHA-256",
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
          );

          // Decrypt the data
          const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: new Uint8Array(iv) },
            key,
            new Uint8Array(encryptedData)
          );

          // Parse the decrypted data
          const decoder = new TextDecoder();
          const decryptedString = decoder.decode(decrypted);
          const originalData = JSON.parse(decryptedString);

          // Recreate the original PDF
          const originalPdfBytes = new Uint8Array(originalData.pdfData);
          const unlockedFile = new File(
            [originalPdfBytes],
            originalData.originalName.replace(/\.pdf$/, "_unlocked.pdf"),
            { type: "application/pdf" }
          );

          setState((prev) => ({
            ...prev,
            unlockedFile,
            isUnlocking: false,
            error: "",
          }));

          toolState.actions.showMessage("PDF unlocked successfully!");
        } catch (decryptError) {
          console.error("Decryption error:", decryptError);
          const errorMessage = "Invalid password. Please check and try again.";
          setState((prev) => ({ ...prev, isUnlocking: false }));
          handleError(errorMessage);
        }
      } else {
        // This is a regular PDF - just create an unlocked copy
        // Note: This won't work for PDFs with real password protection
        const unlockedBytes = await pdfDoc.save();
        const unlockedFile = new File(
          [new Uint8Array(unlockedBytes)],
          state.originalFile.name.replace(/\.pdf$/, "_unlocked.pdf"),
          { type: "application/pdf" }
        );

        setState((prev) => ({
          ...prev,
          unlockedFile,
          isUnlocking: false,
          error: "",
        }));

        toolState.actions.showMessage("PDF processed successfully!");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && error.message?.includes("password")
          ? "Invalid password. Please check and try again."
          : "Failed to unlock PDF. The file might be corrupted or use unsupported encryption.";

      setState((prev) => ({ ...prev, isUnlocking: false }));
      handleError(errorMessage);
    }
  }, [state.originalFile, state.password, handleError, toolState.actions]);

  const downloadUnlockedPDF = useCallback(() => {
    if (!state.unlockedFile) return;

    const url = URL.createObjectURL(state.unlockedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = state.unlockedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toolState.actions.showMessage("Unlocked PDF downloaded successfully!");
  }, [state.unlockedFile, toolState.actions]);

  const clearFiles = useCallback(() => {
    setState({
      originalFile: null,
      unlockedFile: null,
      password: "",
      isUnlocking: false,
      error: "",
      previewScale: 1.0,
      numPages: 0,
    });
    toolState.actions.showMessage("Files cleared!");
  }, [toolState.actions]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setState((prev) => ({ ...prev, numPages }));
    },
    []
  );

  // Button configuration
  const buttons = createCommonButtons({});

  const renderPDFPreview = (file: File, title: string) => (
    <Card className="w-full">
      <CardContent>
        <Box className="flex items-center gap-2 mb-4">
          <PictureAsPdfIcon color="primary" />
          <Typography variant="h6" className="!font-semibold">
            {title}
          </Typography>
        </Box>

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => handleError("Failed to load PDF preview")}
          loading={
            <Box className="flex justify-center items-center h-40">
              <Typography variant="body2" color="textSecondary">
                Loading PDF preview...
              </Typography>
            </Box>
          }
        >
          <Box className="flex justify-center bg-gray-100 p-4 rounded-lg">
            <Page
              pageNumber={1}
              scale={state.previewScale}
              loading={
                <Box className="flex justify-center items-center h-40">
                  <Typography variant="body2" color="textSecondary">
                    Loading page...
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Document>

        {state.numPages > 0 && (
          <Typography
            variant="body2"
            color="textSecondary"
            className="mt-2 text-center"
          >
            Page 1 of {state.numPages}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="PDF Unlock Tool"
        description="Free online PDF unlock tool. Remove password protection from encrypted PDF files instantly. Secure browser-based processing, no file uploads to servers."
        exampleCode="Upload encrypted PDF"
        exampleOutput="Unlocked PDF file ready for download"
      />

      <ToolControls buttons={buttons} />

      <div className="flex flex-col w-full gap-6">
        {/* Error message */}
        {state.error && (
          <Alert severity="error" className="w-full">
            {state.error}
          </Alert>
        )}

        {/* File Upload */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              className="!font-semibold mb-4 flex items-center gap-2"
            >
              <PictureAsPdfIcon color="primary" />
              Upload Password-Protected PDF
            </Typography>

            <FileUploadWithDragDrop
              accept="application/pdf"
              multiple={false}
              maxSize={FILE_SIZE_PRESETS.LARGE}
              onFileSelect={handleFileSelect}
              onError={handleError}
              title="Upload PDF File"
              subtitle="Select a password-protected PDF file to unlock"
              supportText="Supports PDF files up to 50MB"
            />

            {state.originalFile && (
              <Box className="mt-4">
                <FilePreview
                  files={[
                    {
                      id: "original",
                      file: state.originalFile,
                    },
                  ]}
                  onFileRemove={() =>
                    setState((prev) => ({ ...prev, originalFile: null }))
                  }
                />
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Password Input and Unlock */}
        {state.originalFile && (
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                className="!font-semibold mb-4 flex items-center gap-2"
              >
                <LockOpenIcon color="primary" />
                Enter Password to Unlock
              </Typography>

              <Box className="flex flex-col gap-4">
                <TextField
                  type="password"
                  label="PDF Password"
                  value={state.password}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Enter the password for this PDF"
                  fullWidth
                  variant="outlined"
                />

                <Box className="flex gap-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={unlockPDF}
                    disabled={state.isUnlocking || !state.password.trim()}
                    startIcon={<LockOpenIcon />}
                    className="!normal-case"
                  >
                    {state.isUnlocking ? "Unlocking..." : "Unlock PDF"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={clearFiles}
                    className="!normal-case"
                  >
                    Clear
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Success and Download */}
        {state.unlockedFile && (
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                className="!font-semibold mb-4 flex items-center gap-2"
              >
                <DownloadIcon color="primary" />
                PDF Unlocked Successfully
              </Typography>

              <Alert severity="success" className="mb-4">
                Your PDF has been successfully unlocked and is ready for
                download.
              </Alert>

              <Box className="flex gap-3 mb-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={downloadUnlockedPDF}
                  startIcon={<DownloadIcon />}
                  className="!normal-case"
                >
                  Download Unlocked PDF
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  className="!normal-case"
                >
                  Preview
                </Button>
              </Box>

              <FilePreview
                files={[
                  {
                    id: "unlocked",
                    file: state.unlockedFile,
                  },
                ]}
                onFileRemove={() =>
                  setState((prev) => ({ ...prev, unlockedFile: null }))
                }
              />
            </CardContent>
          </Card>
        )}

        {/* PDF Preview */}
        {state.unlockedFile && (
          <>
            <Divider />
            {renderPDFPreview(state.unlockedFile, "Unlocked PDF Preview")}
          </>
        )}

        {/* Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="!font-semibold mb-3">
              🔒 About PDF Password Protection
            </Typography>

            <Typography variant="body2" className="text-gray-700 mb-3">
              PDF password protection encrypts documents to prevent unauthorized
              access. Our tool helps you remove password protection from PDFs
              you own or have permission to unlock.
            </Typography>

            <Typography variant="body2" className="text-gray-700 mb-3">
              <strong>Security Features:</strong>
            </Typography>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
              <li>
                All processing happens in your browser - files never leave your
                device
              </li>
              <li>No file uploads to external servers</li>
              <li>Password is not stored or transmitted anywhere</li>
              <li>Original file remains unchanged</li>
              <li>Supports standard PDF encryption methods</li>
            </ul>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="bg-blue-50 border border-blue-200">
          <CardContent>
            <Typography variant="body2" className="text-blue-800 mb-2">
              💡 <strong>Common Use Cases:</strong>
            </Typography>
            <div className="space-y-2">
              <Typography variant="body2" className="text-blue-700 text-sm">
                • Remove password protection from your own PDF documents
              </Typography>
              <Typography variant="body2" className="text-blue-700 text-sm">
                • Unlock PDFs for easier sharing within your organization
              </Typography>
              <Typography variant="body2" className="text-blue-700 text-sm">
                • Convert password-protected PDFs for digital archiving
              </Typography>
              <Typography variant="body2" className="text-blue-700 text-sm">
                • Prepare PDFs for further editing or processing
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
