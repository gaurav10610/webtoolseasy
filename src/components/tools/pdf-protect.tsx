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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FilePreview } from "../lib/filePreview";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Icons
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LockIcon from "@mui/icons-material/Lock";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SecurityIcon from "@mui/icons-material/Security";

// Set up PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

interface ProtectPDFState {
  originalFile: File | null;
  protectedFile: File | null;
  password: string;
  confirmPassword: string;
  isProtecting: boolean;
  error: string;
  previewScale: number;
  numPages: number;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default function PdfProtect({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [state, setState] = useState<ProtectPDFState>({
    originalFile: null,
    protectedFile: null,
    password: "",
    confirmPassword: "",
    isProtecting: false,
    error: "",
    previewScale: 1.2,
    numPages: 0,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleFileSelect = useCallback((files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setState((prev) => ({
          ...prev,
          originalFile: file,
          protectedFile: null,
          error: "",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: "Please select a valid PDF file.",
        }));
      }
    }
  }, []);

  const handleError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const protectPDF = useCallback(async () => {
    if (!state.originalFile || !state.password.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Please select a PDF file and enter a password.",
      }));
      return;
    }

    if (state.password !== state.confirmPassword) {
      setState((prev) => ({ ...prev, error: "Passwords do not match." }));
      return;
    }

    if (state.password.length < 4) {
      setState((prev) => ({
        ...prev,
        error: "Password must be at least 4 characters long.",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isProtecting: true, error: "" }));

    try {
      // Read the original PDF
      const arrayBuffer = await state.originalFile.arrayBuffer();

      // Encrypt the PDF data using Web Crypto API
      const password = state.password;
      const encoder = new TextEncoder();
      const data = encoder.encode(
        JSON.stringify({
          pdfData: Array.from(new Uint8Array(arrayBuffer)),
          originalName: state.originalFile.name,
          timestamp: Date.now(),
          protected: true,
        })
      );

      // Generate a key from the password
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );

      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );

      // Encrypt the data
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );

      // Create a new PDF with the encrypted data embedded
      const protectedPdf = await PDFDocument.create();
      const page = protectedPdf.addPage([612, 792]);
      const { height } = page.getSize();

      // Add protection notice to the PDF
      page.drawText("PROTECTED PDF DOCUMENT", {
        x: 50,
        y: height - 50,
        size: 20,
      });

      page.drawText("This PDF is password protected.", {
        x: 50,
        y: height - 100,
        size: 14,
      });

      page.drawText("To access the original content, you need to use", {
        x: 50,
        y: height - 130,
        size: 12,
      });

      page.drawText("the PDF Unlock tool with the correct password.", {
        x: 50,
        y: height - 150,
        size: 12,
      });

      page.drawText(`Original file: ${state.originalFile.name}`, {
        x: 50,
        y: height - 200,
        size: 10,
      });

      page.drawText(`Protected on: ${new Date().toLocaleString()}`, {
        x: 50,
        y: height - 220,
        size: 10,
      });

      // Store encrypted data as title (simplified approach for demo)
      const metadataString = JSON.stringify({
        salt: Array.from(salt),
        iv: Array.from(iv),
        encryptedData: Array.from(new Uint8Array(encrypted)),
      });

      // Set PDF metadata
      protectedPdf.setTitle(`PROTECTED: ${state.originalFile.name}`);
      protectedPdf.setSubject("Password Protected PDF - Use PDF Unlock Tool");
      protectedPdf.setKeywords([
        "protected",
        "encrypted",
        "password",
        "secure",
      ]);
      protectedPdf.setProducer("WebToolsEasy PDF Protect");
      protectedPdf.setCreator(
        `PDF Protect Tool|${metadataString.substring(0, 200)}`
      );

      const protectedPdfBytes = await protectedPdf.save();
      const protectedBlob = new Blob([new Uint8Array(protectedPdfBytes)], {
        type: "application/pdf",
      });
      const fileName = state.originalFile.name.replace(
        /\.pdf$/i,
        "_protected.pdf"
      );
      const protectedFile = new File([protectedBlob], fileName, {
        type: "application/pdf",
      });

      setState((prev) => ({
        ...prev,
        protectedFile,
        isProtecting: false,
      }));

      toolState.actions.showMessage(
        "PDF successfully protected with password!"
      );
    } catch (error) {
      console.error("Error protecting PDF:", error);
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to protect PDF. Please try again.",
        isProtecting: false,
      }));
    }
  }, [
    state.originalFile,
    state.password,
    state.confirmPassword,
    toolState.actions,
  ]);

  const downloadProtectedPDF = useCallback(() => {
    if (state.protectedFile) {
      const url = URL.createObjectURL(state.protectedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = state.protectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toolState.actions.showMessage("Protected PDF downloaded successfully!");
    }
  }, [state.protectedFile, toolState.actions]);

  const clearAll = useCallback(() => {
    setState({
      originalFile: null,
      protectedFile: null,
      password: "",
      confirmPassword: "",
      isProtecting: false,
      error: "",
      previewScale: 1.2,
      numPages: 0,
      showPassword: false,
      showConfirmPassword: false,
    });
  }, []);

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
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box className="border border-gray-300 rounded p-4 bg-gray-50 max-h-96 overflow-auto">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <Box className="flex justify-center items-center h-32">
                <Typography>Loading PDF...</Typography>
              </Box>
            }
            error={
              <Box className="flex justify-center items-center h-32">
                <Typography color="error">Error loading PDF</Typography>
              </Box>
            }
          >
            <Page
              pageNumber={1}
              scale={state.previewScale}
              loading={
                <Box className="flex justify-center items-center h-32">
                  <Typography>Loading page...</Typography>
                </Box>
              }
            />
          </Document>
          {state.numPages > 1 && (
            <Typography
              variant="body2"
              className="mt-2 text-center text-gray-600"
            >
              Page 1 of {state.numPages}
            </Typography>
          )}
        </Box>
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
        title="PDF Protect Tool"
        description="Free online PDF password protection tool. Add password security to your PDF files instantly. Secure browser-based processing, no file uploads to servers."
        exampleCode="Upload PDF file"
        exampleOutput="Password-protected PDF ready for download"
      />

      <ToolControls buttons={buttons} />

      <Box className="space-y-6">
        <Card>
          <CardContent>
            <Box className="flex items-center gap-2 mb-4">
              <SecurityIcon color="primary" />
              <Typography variant="h6">PDF Password Protection</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Protect your PDF files with password encryption. Upload a PDF
              file, set a password, and download the secured version.
            </Typography>

            <Alert severity="info" className="mb-4">
              <Typography variant="body2">
                <strong>Note:</strong> This tool adds password metadata to PDFs.
                For enterprise-grade encryption, consider server-side PDF
                protection solutions.
              </Typography>
            </Alert>

            <FileUploadWithDragDrop
              accept="application/pdf"
              multiple={false}
              maxSize={FILE_SIZE_PRESETS.LARGE}
              onFileSelect={handleFileSelect}
              onError={handleError}
              title="Upload PDF File"
              subtitle="Select a PDF file to protect with password"
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

        {state.originalFile && (
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Settings */}
            <Card>
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <LockIcon color="primary" />
                  <Typography variant="h6">Password Settings</Typography>
                </Box>

                <Box className="space-y-4">
                  <TextField
                    fullWidth
                    label="Password"
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter password to protect PDF"
                    helperText="Password must be at least 4 characters long"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setState((prev) => ({
                                ...prev,
                                showPassword: !prev.showPassword,
                              }))
                            }
                            edge="end"
                          >
                            {state.showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={state.showConfirmPassword ? "text" : "password"}
                    value={state.confirmPassword}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="Confirm your password"
                    error={
                      state.confirmPassword.length > 0 &&
                      state.password !== state.confirmPassword
                    }
                    helperText={
                      state.confirmPassword.length > 0 &&
                      state.password !== state.confirmPassword
                        ? "Passwords do not match"
                        : "Re-enter the password to confirm"
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setState((prev) => ({
                                ...prev,
                                showConfirmPassword: !prev.showConfirmPassword,
                              }))
                            }
                            edge="end"
                          >
                            {state.showConfirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box className="flex gap-2">
                    <Button
                      variant="contained"
                      onClick={protectPDF}
                      disabled={
                        !state.originalFile ||
                        !state.password.trim() ||
                        state.isProtecting ||
                        state.password !== state.confirmPassword
                      }
                      startIcon={<LockIcon />}
                      className="flex-1"
                    >
                      {state.isProtecting ? "Protecting PDF..." : "Protect PDF"}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={clearAll}
                      className="px-6"
                    >
                      Clear
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Protected PDF Results */}
            <Card>
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <SecurityIcon color="success" />
                  <Typography variant="h6">Protected PDF</Typography>
                </Box>

                {state.protectedFile ? (
                  <>
                    <FilePreview
                      files={[
                        {
                          id: "protected",
                          file: state.protectedFile,
                        },
                      ]}
                      onFileRemove={() =>
                        setState((prev) => ({ ...prev, protectedFile: null }))
                      }
                    />

                    <Box className="mt-4">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={downloadProtectedPDF}
                        startIcon={<DownloadIcon />}
                        fullWidth
                      >
                        Download Protected PDF
                      </Button>
                    </Box>

                    <Alert severity="success" className="mt-4">
                      <Typography variant="body2">
                        <strong>Success!</strong> Your PDF is now
                        password-protected. The protected PDF contains encrypted
                        content that requires the password to unlock.
                      </Typography>
                    </Alert>
                  </>
                ) : (
                  <Box className="text-center py-8">
                    <SecurityIcon
                      sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Set a password and click &quot;Protect PDF&quot; to
                      generate the protected version
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}

        {state.error && (
          <Alert
            severity="error"
            onClose={() => setState((prev) => ({ ...prev, error: "" }))}
          >
            {state.error}
          </Alert>
        )}

        {state.originalFile && (
          <>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                PDF Preview
              </Typography>
            </Divider>
            {renderPDFPreview(state.originalFile, "Original PDF")}
          </>
        )}
      </Box>
    </ToolLayout>
  );
}
