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
  TextField,
  CircularProgress,
  Slider,
  Typography,
  Grid,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { Document, pdfjs } from "react-pdf";
import { FileUploadWithDragDrop } from "@/components/lib/fileUpload";
import { FILE_SIZE_PRESETS } from "@/util/fileValidation";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface ConvertedImage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
}

export default function PdfToImages({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [pageRange, setPageRange] = useState<string>("all");
  const [customPages, setCustomPages] = useState<string>("");
  const [quality, setQuality] = useState<number>(0.92);
  const [scale, setScale] = useState<number>(2);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const file = files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          toolState.actions.showMessage("Please select a valid PDF file");
          return;
        }
        setPdfFile(file);
        setConvertedImages([]);
      }
    },
    [toolState.actions]
  );

  const handleError = useCallback(
    (error: string) => {
      toolState.actions.showMessage(error);
    },
    [toolState.actions]
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      toolState.actions.showMessage(`PDF loaded: ${numPages} pages`);
    },
    [toolState.actions]
  );

  const parsePageNumbers = useCallback(
    (input: string, total: number): number[] => {
      const pages: Set<number> = new Set();
      const parts = input.split(",").map((p) => p.trim());

      for (const part of parts) {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.max(1, start); i <= Math.min(total, end); i++) {
              pages.add(i);
            }
          }
        } else {
          const page = parseInt(part);
          if (!isNaN(page) && page >= 1 && page <= total) {
            pages.add(page);
          }
        }
      }

      return Array.from(pages).sort((a, b) => a - b);
    },
    []
  );

  const getPageNumbers = useCallback((): number[] => {
    if (pageRange === "all") {
      return Array.from({ length: numPages }, (_, i) => i + 1);
    } else {
      return parsePageNumbers(customPages, numPages);
    }
  }, [pageRange, customPages, numPages, parsePageNumbers]);

  const convertPageToImage = useCallback(
    async (pageNumber: number): Promise<ConvertedImage | null> => {
      try {
        // Create a temporary canvas to render the PDF page
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context || !pdfFile) return null;

        // Load the PDF page
        const loadingTask = pdfjs.getDocument(URL.createObjectURL(pdfFile));
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);

        // Calculate viewport with scale
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Convert canvas to blob
        return new Promise<ConvertedImage>((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const dataUrl = canvas.toDataURL(`image/${format}`, quality);
                resolve({
                  pageNumber,
                  dataUrl,
                  blob,
                });
              }
            },
            `image/${format}`,
            quality
          );
        });
      } catch (error) {
        console.error(`Error converting page ${pageNumber}:`, error);
        return null;
      }
    },
    [pdfFile, format, quality, scale]
  );

  const handleConvert = useCallback(async () => {
    if (!pdfFile) {
      toolState.actions.showMessage("Please select a PDF file first");
      return;
    }

    const pages = getPageNumbers();
    if (pages.length === 0) {
      toolState.actions.showMessage("Please specify valid page numbers");
      return;
    }

    setConverting(true);
    toolState.actions.showMessage(`Converting ${pages.length} pages...`);

    try {
      const images: ConvertedImage[] = [];

      for (const pageNum of pages) {
        const image = await convertPageToImage(pageNum);
        if (image) {
          images.push(image);
        }
      }

      setConvertedImages(images);
      toolState.actions.showMessage(
        `Successfully converted ${
          images.length
        } pages to ${format.toUpperCase()}`
      );
    } catch (error) {
      console.error("Conversion error:", error);
      toolState.actions.showMessage("Error converting PDF to images");
    } finally {
      setConverting(false);
    }
  }, [pdfFile, format, getPageNumbers, convertPageToImage, toolState.actions]);

  const handleDownloadImage = useCallback(
    (image: ConvertedImage) => {
      const link = document.createElement("a");
      link.href = image.dataUrl;
      link.download = `page-${image.pageNumber}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [format]
  );

  const handleDownloadAll = useCallback(() => {
    convertedImages.forEach((image) => {
      setTimeout(() => handleDownloadImage(image), 100 * image.pageNumber);
    });
    toolState.actions.showMessage(
      `Downloading ${convertedImages.length} images...`
    );
  }, [convertedImages, handleDownloadImage, toolState.actions]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="PDF to Images"
        description="Convert PDF pages to high-quality PNG or JPG images. Customize quality and resolution."
        exampleCode="Upload a PDF file"
        exampleOutput="PNG or JPG images for each page"
      />

      <div className="flex flex-col gap-6">
        {/* File Upload */}
        {!pdfFile && (
          <FileUploadWithDragDrop
            accept="application/pdf"
            multiple={false}
            allowedTypes={["application/pdf"]}
            maxSize={FILE_SIZE_PRESETS.HUGE}
            onFileSelect={handleFileSelect}
            onError={handleError}
            title="Upload PDF File to Convert to Images"
            subtitle="Drag and drop your PDF file here or click to browse"
            supportText="Supports PDF files up to 100MB"
          />
        )}

        {/* File Info */}
        {pdfFile && (
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ImageIcon fontSize="small" />
              <span>
                {pdfFile.name} ({numPages} pages)
              </span>
            </div>
          </Card>
        )}

        {/* Conversion Settings */}
        {pdfFile && numPages > 0 && (
          <Card className="p-6">
            <div className="flex flex-col gap-6">
              <Typography variant="h6">Conversion Settings</Typography>

              {/* Format Selection */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Output Format</FormLabel>
                <RadioGroup
                  row
                  value={format}
                  onChange={(e) => setFormat(e.target.value as "png" | "jpeg")}
                >
                  <FormControlLabel
                    value="png"
                    control={<Radio />}
                    label="PNG (Lossless)"
                  />
                  <FormControlLabel
                    value="jpeg"
                    control={<Radio />}
                    label="JPG (Smaller Size)"
                  />
                </RadioGroup>
              </FormControl>

              {/* Page Range Selection */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Pages to Convert</FormLabel>
                <RadioGroup
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All Pages"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom Pages"
                  />
                </RadioGroup>
              </FormControl>

              {pageRange === "custom" && (
                <TextField
                  label="Page Numbers"
                  placeholder="e.g., 1-5, 8, 10-12"
                  value={customPages}
                  onChange={(e) => setCustomPages(e.target.value)}
                  helperText="Enter page numbers or ranges separated by commas"
                  fullWidth
                />
              )}

              {/* Quality Slider (for JPG) */}
              {format === "jpeg" && (
                <div>
                  <Typography gutterBottom>
                    Quality: {Math.round(quality * 100)}%
                  </Typography>
                  <Slider
                    value={quality}
                    onChange={(_, value) => setQuality(value as number)}
                    min={0.1}
                    max={1}
                    step={0.05}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                  />
                </div>
              )}

              {/* Scale/Resolution Slider */}
              <div>
                <Typography gutterBottom>Resolution: {scale}x</Typography>
                <Slider
                  value={scale}
                  onChange={(_, value) => setScale(value as number)}
                  min={1}
                  max={4}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}x`}
                />
                <Typography variant="caption" color="textSecondary">
                  Higher resolution = larger file size but better quality
                </Typography>
              </div>

              {/* Convert Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleConvert}
                disabled={converting}
                size="large"
                startIcon={
                  converting ? <CircularProgress size={20} /> : <ImageIcon />
                }
              >
                {converting ? "Converting..." : "Convert to Images"}
              </Button>
            </div>
          </Card>
        )}

        {/* Converted Images Preview */}
        {convertedImages.length > 0 && (
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6">
                  Converted Images ({convertedImages.length})
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadAll}
                >
                  Download All
                </Button>
              </div>

              <Grid container spacing={2}>
                {convertedImages.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.pageNumber}>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.dataUrl}
                          alt={`Page ${image.pageNumber}`}
                          className="w-full h-auto border border-gray-300 rounded"
                        />
                        <div className="flex items-center justify-between">
                          <Typography variant="body2">
                            Page {image.pageNumber}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownloadImage(image)}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Card>
        )}

        {/* Hidden Document for loading PDF info */}
        {pdfFile && (
          <div style={{ display: "none" }}>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
