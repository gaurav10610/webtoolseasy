"use client";

import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useState, useCallback } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import DownloadIcon from "@mui/icons-material/Download";
import { PDFDocument } from "pdf-lib";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { useToolState } from "@/hooks/useToolState";
import { ToolComponentProps } from "@/types/component";

export default function PDFSplit({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRanges, setPageRanges] = useState<string>("1-5");
  const [splitPdfUrls, setSplitPdfUrls] = useState<
    { url: string; name: string }[]
  >([]);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || file.type !== "application/pdf") {
        toolState.actions.showMessage("Please select a valid PDF file");
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        setPdfFile(file);
        setTotalPages(pageCount);
        setPageRanges(`1-${pageCount}`);
        setSplitPdfUrls([]);
      } catch {
        toolState.actions.showMessage("Failed to load PDF file");
      }
    },
    [toolState.actions]
  );

  const parsePageRanges = (rangesStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const ranges = rangesStr.split(",").map((r) => r.trim());

    for (const range of ranges) {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map((n) => parseInt(n.trim()));
        if (start && end && start <= end && start > 0 && end <= maxPages) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const page = parseInt(range);
        if (page > 0 && page <= maxPages) {
          pages.add(page);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplitPDF = useCallback(async () => {
    if (!pdfFile) {
      toolState.actions.showMessage("Please select a PDF file");
      return;
    }

    const pages = parsePageRanges(pageRanges, totalPages);
    if (pages.length === 0) {
      toolState.actions.showMessage("Invalid page range");
      return;
    }

    try {
      setProcessing(true);
      setSplitPdfUrls([]);

      const arrayBuffer = await pdfFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const urls: { url: string; name: string }[] = [];

      // Create new PDF with selected pages
      const newPdf = await PDFDocument.create();
      for (const pageNum of pages) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const fileName = pdfFile.name.replace(".pdf", "");
      urls.push({
        url,
        name: `${fileName}_pages_${pages[0]}-${pages[pages.length - 1]}.pdf`,
      });

      setSplitPdfUrls(urls);
      toolState.actions.showMessage("PDF split successfully!");
    } catch {
      toolState.actions.showMessage("Failed to split PDF. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [pdfFile, pageRanges, totalPages, toolState.actions]);

  const handleDownload = useCallback((url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  }, []);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="PDF Split"
        description="Extract specific pages from PDF files. Split PDF by page ranges."
        exampleCode="Upload PDF and specify pages (e.g., 1-5, 10, 15-20)"
        exampleOutput="New PDF with selected pages"
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {/* Upload Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <PictureAsPdfIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Select PDF File to Split
              </Typography>
            </div>

            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="pdf-upload"
              type="file"
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
                Select PDF File
              </Button>
            </label>

            {pdfFile && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <Typography variant="body2" className="text-gray-700">
                  <strong>File:</strong> {pdfFile.name}
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  <strong>Total Pages:</strong> {totalPages}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Page Range Section */}
        {pdfFile && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-3 text-gray-800">
                Select Pages to Extract
              </Typography>

              <TextField
                label="Page Ranges"
                variant="outlined"
                fullWidth
                value={pageRanges}
                onChange={(e) => setPageRanges(e.target.value)}
                placeholder="e.g., 1-5, 10, 15-20"
                helperText="Enter page numbers or ranges separated by commas"
                className="mb-4"
              />

              <div className="mb-4 flex flex-wrap gap-2">
                <Chip
                  label="All Pages"
                  onClick={() => setPageRanges(`1-${totalPages}`)}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="First Page"
                  onClick={() => setPageRanges("1")}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Last Page"
                  onClick={() => setPageRanges(totalPages.toString())}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Odd Pages"
                  onClick={() =>
                    setPageRanges(
                      Array.from(
                        { length: Math.ceil(totalPages / 2) },
                        (_, i) => i * 2 + 1
                      )
                        .filter((p) => p <= totalPages)
                        .join(",")
                    )
                  }
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Even Pages"
                  onClick={() =>
                    setPageRanges(
                      Array.from(
                        { length: Math.floor(totalPages / 2) },
                        (_, i) => (i + 1) * 2
                      )
                        .filter((p) => p <= totalPages)
                        .join(",")
                    )
                  }
                  color="primary"
                  variant="outlined"
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={
                  processing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <ContentCutIcon />
                  )
                }
                onClick={handleSplitPDF}
                disabled={processing}
              >
                {processing ? "Splitting PDF..." : "Split PDF"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {splitPdfUrls.length > 0 && (
          <Card className="border-2 border-green-500">
            <CardContent>
              <Typography variant="h6" className="text-green-700 mb-3">
                ✓ PDF Split Successfully!
              </Typography>

              {splitPdfUrls.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <PictureAsPdfIcon color="error" />
                    <Typography variant="body2" className="truncate">
                      {pdf.name}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(pdf.url, pdf.name)}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
