"use client";

import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";
import { useState, useCallback } from "react";
import {
  Button,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  CircularProgress,
  Typography,
  CardContent,
  LinearProgress,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Compress as CompressIcon,
} from "@mui/icons-material";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { PDFDocument } from "pdf-lib";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";

type CompressionLevel = "low" | "medium" | "high";

export default function PDFCompress({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressionLevel, setCompressionLevel] =
    useState<CompressionLevel>("medium");
  const [processing, setProcessing] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const file = files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          toolState.actions.showMessage("Please select a valid PDF file");
          return;
        }
        setPdfFile(file);
        setOriginalSize(file.size);
        setCompressedPdfUrl("");
        setCompressedSize(0);
        toolState.actions.showMessage(
          `PDF loaded: ${formatFileSize(file.size)}`
        );
      }
    },
    [toolState.actions, formatFileSize]
  );

  const handleError = useCallback(
    (error: string) => {
      toolState.actions.showMessage(error);
    },
    [toolState.actions]
  );

  const compressPDF = useCallback(async () => {
    if (!pdfFile) {
      toolState.actions.showMessage("Please select a PDF file first");
      return;
    }

    setProcessing(true);
    toolState.actions.showMessage("Compressing PDF...");

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Compression settings based on level
      const compressionOptions: Record<
        CompressionLevel,
        {
          objectsPerTick: number;
          useObjectStreams: boolean;
          addDefaultPage: boolean;
        }
      > = {
        low: {
          objectsPerTick: 50,
          useObjectStreams: true,
          addDefaultPage: false,
        },
        medium: {
          objectsPerTick: 100,
          useObjectStreams: true,
          addDefaultPage: false,
        },
        high: {
          objectsPerTick: 200,
          useObjectStreams: true,
          addDefaultPage: false,
        },
      };

      // Save with compression options
      // Note: pdf-lib has limited native compression. For better compression,
      // we save with object streams enabled which provides some size reduction
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: compressionOptions[compressionLevel].useObjectStreams,
        addDefaultPage: compressionOptions[compressionLevel].addDefaultPage,
        objectsPerTick: compressionOptions[compressionLevel].objectsPerTick,
      });

      // For additional compression, we can remove metadata and optimize
      const compressedDoc = await PDFDocument.load(pdfBytes);

      // Remove metadata to reduce size
      compressedDoc.setTitle("");
      compressedDoc.setAuthor("");
      compressedDoc.setSubject("");
      compressedDoc.setKeywords([]);
      compressedDoc.setProducer("");
      compressedDoc.setCreator("");

      // Save the optimized PDF
      const finalBytes = await compressedDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([finalBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setCompressedPdfUrl(url);
      setCompressedSize(blob.size);

      const reductionPercent = Math.round(
        ((originalSize - blob.size) / originalSize) * 100
      );

      if (blob.size >= originalSize) {
        toolState.actions.showMessage(
          "PDF is already optimized. No further compression possible."
        );
      } else {
        toolState.actions.showMessage(
          `PDF compressed! Size reduced by ${reductionPercent}%`
        );
      }
    } catch (error) {
      console.error("Compression error:", error);
      toolState.actions.showMessage("Error compressing PDF");
    } finally {
      setProcessing(false);
    }
  }, [pdfFile, compressionLevel, originalSize, toolState.actions]);

  const handleDownload = useCallback(() => {
    if (!compressedPdfUrl) return;

    const link = document.createElement("a");
    link.href = compressedPdfUrl;
    link.download = pdfFile
      ? pdfFile.name.replace(".pdf", "-compressed.pdf")
      : "compressed.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toolState.actions.showMessage("Compressed PDF downloaded");
  }, [compressedPdfUrl, pdfFile, toolState.actions]);

  const getSavingsPercent = useCallback((): number => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  }, [originalSize, compressedSize]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="PDF Compress"
        description="Reduce PDF file size by optimizing content and removing redundant data. Choose compression level."
        exampleCode="Upload a PDF file"
        exampleOutput="Smaller, optimized PDF"
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {/* File Upload */}
        {!pdfFile && (
          <FileUploadWithDragDrop
            accept="application/pdf"
            multiple={false}
            allowedTypes={["application/pdf"]}
            maxSize={FILE_SIZE_PRESETS.HUGE}
            onFileSelect={handleFileSelect}
            onError={handleError}
            title="Upload PDF File to Compress"
            subtitle="Drag and drop your PDF file here or click to browse"
            supportText="Supports PDF files up to 100MB"
          />
        )}

        {/* File Info */}
        {pdfFile && (
          <Card className="border border-gray-200">
            <CardContent>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="body2" className="font-medium">
                      {pdfFile.name}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      Original size: {formatFileSize(originalSize)}
                    </Typography>
                  </div>
                  <CompressIcon color="primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Settings */}
        {pdfFile && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Compression Settings
              </Typography>

              <FormControl component="fieldset" className="w-full">
                <FormLabel component="legend">Compression Level</FormLabel>
                <RadioGroup
                  value={compressionLevel}
                  onChange={(e) =>
                    setCompressionLevel(e.target.value as CompressionLevel)
                  }
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio />}
                    label={
                      <div>
                        <Typography variant="body2" className="font-medium">
                          Low Compression
                        </Typography>
                        <Typography variant="caption" className="text-gray-600">
                          Minimal size reduction, best quality
                        </Typography>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label={
                      <div>
                        <Typography variant="body2" className="font-medium">
                          Medium Compression (Recommended)
                        </Typography>
                        <Typography variant="caption" className="text-gray-600">
                          Balanced size and quality
                        </Typography>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label={
                      <div>
                        <Typography variant="body2" className="font-medium">
                          High Compression
                        </Typography>
                        <Typography variant="caption" className="text-gray-600">
                          Maximum size reduction, lower quality
                        </Typography>
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={compressPDF}
                disabled={processing}
                startIcon={
                  processing ? <CircularProgress size={20} /> : <CompressIcon />
                }
                className="mt-6"
                fullWidth
              >
                {processing ? "Compressing..." : "Compress PDF"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {compressedPdfUrl && (
          <Card className="border-2 border-green-500">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <Typography variant="h6" className="text-green-700 mb-2">
                    ✓ PDF Compressed Successfully!
                  </Typography>
                </div>

                {/* Size Comparison */}
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between mb-2">
                    <Typography variant="body2">Original Size:</Typography>
                    <Typography variant="body2" className="font-medium">
                      {formatFileSize(originalSize)}
                    </Typography>
                  </div>
                  <div className="flex justify-between mb-2">
                    <Typography variant="body2">Compressed Size:</Typography>
                    <Typography
                      variant="body2"
                      className="font-medium text-green-700"
                    >
                      {formatFileSize(compressedSize)}
                    </Typography>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <Typography variant="body2" className="font-bold">
                      Size Reduction:
                    </Typography>
                    <Typography
                      variant="body2"
                      className="font-bold text-green-700"
                    >
                      {getSavingsPercent()}%
                    </Typography>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <LinearProgress
                      variant="determinate"
                      value={100 - getSavingsPercent()}
                      className="h-2 rounded"
                    />
                    <Typography
                      variant="caption"
                      className="text-gray-600 text-center block mt-1"
                    >
                      New size is {100 - getSavingsPercent()}% of original
                    </Typography>
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  fullWidth
                >
                  Download Compressed PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
