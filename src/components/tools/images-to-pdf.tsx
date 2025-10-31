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
  List,
  ListItem,
  IconButton,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  CardContent,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  DragIndicator as DragIndicatorIcon,
} from "@mui/icons-material";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { PDFDocument } from "pdf-lib";

interface ImageFileInfo {
  id: string;
  file: File;
  name: string;
  preview: string;
}

type PageSize = "A4" | "Letter" | "Legal" | "A3" | "A5";
type Orientation = "portrait" | "landscape";
type ImageFit = "fit" | "fill" | "original";

const PAGE_SIZES: Record<PageSize, [number, number]> = {
  A4: [595, 842], // A4 in points (72 DPI)
  Letter: [612, 792], // Letter in points
  Legal: [612, 1008], // Legal in points
  A3: [842, 1191], // A3 in points
  A5: [420, 595], // A5 in points
};

export default function ImagesToPDF({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [images, setImages] = useState<ImageFileInfo[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [imageFit, setImageFit] = useState<ImageFit>("fit");
  const [processing, setProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newImages: ImageFileInfo[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          newImages.push({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            preview,
          });
        }
      }

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
        toolState.actions.showMessage(`Added ${newImages.length} images`);
      } else {
        toolState.actions.showMessage("Please select valid image files");
      }

      event.target.value = "";
    },
    [toolState.actions]
  );

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return filtered;
    });
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === index) return;

      setImages((prev) => {
        const newImages = [...prev];
        const draggedItem = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedItem);
        return newImages;
      });
      setDraggedIndex(index);
    },
    [draggedIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const createPDF = useCallback(async () => {
    if (images.length === 0) {
      toolState.actions.showMessage("Please add images first");
      return;
    }

    setProcessing(true);
    toolState.actions.showMessage("Creating PDF...");

    try {
      const pdfDoc = await PDFDocument.create();

      // Get page dimensions based on size and orientation
      let [width, height] = PAGE_SIZES[pageSize];
      if (orientation === "landscape") {
        [width, height] = [height, width];
      }

      for (const imageInfo of images) {
        // Read image file
        const arrayBuffer = await imageInfo.file.arrayBuffer();

        // Embed image based on type
        let image;
        const fileType = imageInfo.file.type;

        if (fileType === "image/jpeg" || fileType === "image/jpg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (fileType === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // For other types, convert to canvas then to PNG
          const img = await createImageBitmap(imageInfo.file);
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);

          const pngBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), "image/png");
          });
          const pngBuffer = await pngBlob.arrayBuffer();
          image = await pdfDoc.embedPng(pngBuffer);
        }

        // Add page with specified dimensions
        const page = pdfDoc.addPage([width, height]);

        // Calculate image dimensions based on fit option
        const imgDims = image.scale(1);
        let imgWidth = imgDims.width;
        let imgHeight = imgDims.height;
        let x = 0;
        let y = 0;

        if (imageFit === "fit") {
          // Fit image to page while maintaining aspect ratio
          const scale = Math.min(width / imgWidth, height / imgHeight);
          imgWidth = imgWidth * scale;
          imgHeight = imgHeight * scale;
          x = (width - imgWidth) / 2;
          y = (height - imgHeight) / 2;
        } else if (imageFit === "fill") {
          // Fill page, may crop image
          const scale = Math.max(width / imgWidth, height / imgHeight);
          imgWidth = imgWidth * scale;
          imgHeight = imgHeight * scale;
          x = (width - imgWidth) / 2;
          y = (height - imgHeight) / 2;
        } else {
          // Original size, centered
          x = (width - imgWidth) / 2;
          y = (height - imgHeight) / 2;
        }

        // Draw image on page
        page.drawImage(image, {
          x,
          y,
          width: imgWidth,
          height: imgHeight,
        });
      }

      // Save PDF
      const pdfBytes = await pdfDoc.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      toolState.actions.showMessage(
        `PDF created successfully with ${images.length} pages`
      );
    } catch (error) {
      console.error("PDF creation error:", error);
      toolState.actions.showMessage("Error creating PDF");
    } finally {
      setProcessing(false);
    }
  }, [images, pageSize, orientation, imageFit, toolState.actions]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "images-combined.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toolState.actions.showMessage("PDF downloaded successfully");
  }, [pdfUrl, toolState.actions]);

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Images to PDF"
        description="Combine multiple images (JPG, PNG) into a single PDF document. Customize page size and layout."
        exampleCode="Upload multiple images"
        exampleOutput="Single PDF with all images"
      />

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {/* Upload Section */}
        <Card className="border border-gray-200">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <PdfIcon color="primary" fontSize="large" />
              <Typography variant="h6" color="primary">
                Add Images
              </Typography>
            </div>

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="images-file-input"
              type="file"
              multiple
              onChange={handleFileSelect}
            />
            <label htmlFor="images-file-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                size="large"
                fullWidth
              >
                Select Images
              </Button>
            </label>

            {images.length > 0 && (
              <Typography variant="body2" className="mt-4 text-gray-600">
                {images.length} image{images.length > 1 ? "s" : ""} added. Drag
                to reorder.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Image List */}
        {images.length > 0 && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-3">
                Images ({images.length})
              </Typography>
              <List className="space-y-2">
                {images.map((img, index) => (
                  <ListItem
                    key={img.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`border rounded p-2 cursor-move hover:bg-gray-50 ${
                      draggedIndex === index ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <DragIndicatorIcon className="text-gray-400" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div className="flex-1 min-w-0">
                        <Typography variant="body2" className="truncate">
                          {img.name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Image {index + 1}
                        </Typography>
                      </div>
                      <IconButton
                        onClick={() => handleRemoveImage(img.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Settings Section */}
        {images.length > 0 && (
          <Card className="border border-gray-200">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                PDF Settings
              </Typography>

              <div className="flex flex-col gap-4">
                {/* Page Size */}
                <FormControl fullWidth>
                  <FormLabel>Page Size</FormLabel>
                  <Select
                    value={pageSize}
                    onChange={(e: SelectChangeEvent<PageSize>) =>
                      setPageSize(e.target.value as PageSize)
                    }
                  >
                    <MenuItem value="A4">A4 (210 × 297 mm)</MenuItem>
                    <MenuItem value="Letter">Letter (8.5 × 11 in)</MenuItem>
                    <MenuItem value="Legal">Legal (8.5 × 14 in)</MenuItem>
                    <MenuItem value="A3">A3 (297 × 420 mm)</MenuItem>
                    <MenuItem value="A5">A5 (148 × 210 mm)</MenuItem>
                  </Select>
                </FormControl>

                {/* Orientation */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Orientation</FormLabel>
                  <RadioGroup
                    row
                    value={orientation}
                    onChange={(e) =>
                      setOrientation(e.target.value as Orientation)
                    }
                  >
                    <FormControlLabel
                      value="portrait"
                      control={<Radio />}
                      label="Portrait"
                    />
                    <FormControlLabel
                      value="landscape"
                      control={<Radio />}
                      label="Landscape"
                    />
                  </RadioGroup>
                </FormControl>

                {/* Image Fit */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Image Fit</FormLabel>
                  <RadioGroup
                    row
                    value={imageFit}
                    onChange={(e) => setImageFit(e.target.value as ImageFit)}
                  >
                    <FormControlLabel
                      value="fit"
                      control={<Radio />}
                      label="Fit to Page"
                    />
                    <FormControlLabel
                      value="fill"
                      control={<Radio />}
                      label="Fill Page"
                    />
                    <FormControlLabel
                      value="original"
                      control={<Radio />}
                      label="Original Size"
                    />
                  </RadioGroup>
                </FormControl>

                {/* Create PDF Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={createPDF}
                  disabled={processing}
                  startIcon={
                    processing ? <CircularProgress size={20} /> : <PdfIcon />
                  }
                >
                  {processing ? "Creating PDF..." : "Create PDF"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {pdfUrl && (
          <Card className="border-2 border-green-500">
            <CardContent>
              <div className="text-center">
                <Typography variant="h6" className="text-green-700 mb-2">
                  ✓ PDF Created Successfully!
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Your PDF with {images.length} images is ready
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
