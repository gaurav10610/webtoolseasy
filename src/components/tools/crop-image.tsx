/* eslint-disable @next/next/no-img-element */
"use client";

import { find, isEmpty, isNil, map, toUpper } from "lodash-es";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { FileUploadWithDragDrop } from "../lib/fileUpload";
import { FilePreview } from "../lib/filePreview";
import {
  FILE_TYPE_PRESETS,
  FILE_SIZE_PRESETS,
} from "../../util/fileValidation";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Slider,
  Box,
} from "@mui/material";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ButtonWithHandler } from "../lib/buttons";
import { SelectWithLabel } from "../lib/select";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CropIcon from "@mui/icons-material/Crop";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { BaseFileData } from "@/types/file";

export default function CropImageOptimized() {
  const [fileList, setFileList] = useState<BaseFileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<BaseFileData | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [cropUnit, setCropUnit] = useState<"px" | "%">("px");
  const [originalImageDimensions, setOriginalImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const formatList = useMemo(() => ["png", "jpeg", "webp", "bmp", "ico"], []);
  const [imageFormat, setImageFormat] = useState<string>("png");
  const [error, setError] = useState("");

  const imgRef = useRef<HTMLImageElement>(null);

  // Memoized constants
  const aspectRatioPresets = useMemo(
    () => [
      { key: "free", value: "free", label: "Free Crop" },
      { key: "1:1", value: "1", label: "1:1 (Square)" },
      { key: "16:9", value: "1.7778", label: "16:9 (Widescreen)" },
      { key: "4:3", value: "1.3333", label: "4:3 (Standard)" },
      { key: "3:2", value: "1.5", label: "3:2 (Photo)" },
      { key: "2:1", value: "2", label: "2:1 (Panoramic)" },
      { key: "9:16", value: "0.5625", label: "9:16 (Portrait)" },
    ],
    []
  );

  const formatOptions = useMemo(
    () =>
      map(formatList, (item) => (
        <MenuItem key={item} value={item}>
          {toUpper(item)}
        </MenuItem>
      )),
    [formatList]
  );

  const selectedFileUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile.originalFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  // Optimized event handlers
  const handleFileSelect = useCallback((files: FileList) => {
    const newFiles = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
    }));
    setFileList((prev) => [...prev, ...newFiles]);
    setSelectedFile((current) => current || newFiles[0] || null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const resetCrop = useCallback(() => {
    setCrop({
      unit: cropUnit,
      x: 25,
      y: 25,
      width: 50,
      height: 50,
    });
    setAspectRatio(undefined);
  }, [cropUnit]);

  const handleAspectRatioChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      if (value === "free") {
        setAspectRatio(undefined);
      } else {
        const ratio = parseFloat(value);
        setAspectRatio(ratio);
        setCrop((prevCrop) => ({
          ...prevCrop,
          height: prevCrop.width / ratio,
        }));
      }
    },
    []
  );

  const handleCropUnitChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newUnit = event.target.value as "px" | "%";
      setCropUnit(newUnit);
      setCrop((prev) => ({
        ...prev,
        unit: newUnit,
      }));
    },
    []
  );

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      setOriginalImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    },
    []
  );

  const handleImageFormatChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setImageFormat(event.target.value);
    },
    []
  );

  // Optimized crop handlers with debouncing effect
  const updateCrop = useCallback((updates: Partial<Crop>) => {
    setCrop((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSliderChange = useCallback(
    (field: keyof Crop, value: number) => {
      if (field === "width" && aspectRatio) {
        updateCrop({
          width: value,
          height: value / aspectRatio,
        });
      } else if (field === "height" && aspectRatio) {
        updateCrop({
          height: value,
          width: value * aspectRatio,
        });
      } else {
        updateCrop({ [field]: value });
      }
    },
    [aspectRatio, updateCrop]
  );

  // Individual optimized handlers for each control
  const handleXChange = useCallback(
    (value: number) => handleSliderChange("x", value),
    [handleSliderChange]
  );
  const handleYChange = useCallback(
    (value: number) => handleSliderChange("y", value),
    [handleSliderChange]
  );
  const handleWidthChange = useCallback(
    (value: number) => handleSliderChange("width", value),
    [handleSliderChange]
  );
  const handleHeightChange = useCallback(
    (value: number) => handleSliderChange("height", value),
    [handleSliderChange]
  );

  // Optimized text field handlers - direct implementations to prevent lag
  const handleXTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (isNaN(value)) return;
      updateCrop({ x: value });
    },
    [updateCrop]
  );

  const handleYTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (isNaN(value)) return;
      updateCrop({ y: value });
    },
    [updateCrop]
  );

  const handleWidthTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (isNaN(value)) return;

      if (aspectRatio) {
        updateCrop({
          width: value,
          height: value / aspectRatio,
        });
      } else {
        updateCrop({ width: value });
      }
    },
    [aspectRatio, updateCrop]
  );

  const handleHeightTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (isNaN(value)) return;

      if (aspectRatio) {
        updateCrop({
          height: value,
          width: value * aspectRatio,
        });
      } else {
        updateCrop({ height: value });
      }
    },
    [aspectRatio, updateCrop]
  );

  const croppedImage = ({
    crop,
    selectedFile,
    callback,
  }: Readonly<{
    crop: Crop;
    selectedFile: BaseFileData;
    imageFormat: string;
    callback: (blob: Blob | null) => void;
  }>) => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = URL.createObjectURL(selectedFile.originalFile);

    image.onload = () => {
      const previewImage = document.getElementById(
        "image-cropper-preview"
      ) as HTMLImageElement;
      if (!previewImage) {
        return;
      }

      const scaleX = image.naturalWidth / previewImage.width;
      const scaleY = image.naturalHeight / previewImage.height;

      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;
      const cropWidth = crop.width * scaleX;
      const cropHeight = crop.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );

        canvas.toBlob(callback);
      }
    };
  };

  const downloadCallback = useCallback(
    (blob: Blob | null) => {
      if (!blob) {
        return;
      }

      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = `cropped-image.${imageFormat}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    },
    [imageFormat]
  );

  const downloadImage = useCallback(
    ({
      crop,
      selectedFile,
      imageFormat,
      callback,
    }: Readonly<{
      crop: Crop;
      selectedFile: BaseFileData;
      imageFormat: string;
      callback: (blob: Blob | null) => void;
    }>) => {
      if (!selectedFile) {
        return;
      }

      croppedImage({
        crop,
        selectedFile,
        imageFormat,
        callback,
      });
    },
    []
  );

  const DownloadImageButtons = useCallback(() => {
    return (
      <div className="flex flex-row w-full gap-2 justify-end">
        <div className="w-[8rem]">
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel size="small">Output Format</InputLabel>
            <Select
              value={imageFormat}
              label="Output Format"
              onChange={handleImageFormatChange}
              size="small"
            >
              {formatOptions}
            </Select>
          </FormControl>
        </div>

        <ButtonWithHandler
          buttonText="Download Image"
          startIcon={<DownloadIcon />}
          onClick={() => {
            downloadImage({
              crop: completedCrop || crop,
              selectedFile: selectedFile!,
              imageFormat,
              callback: downloadCallback,
            });
          }}
          size="small"
        />
      </div>
    );
  }, [
    imageFormat,
    formatOptions,
    handleImageFormatChange,
    downloadImage,
    completedCrop,
    crop,
    selectedFile,
    downloadCallback,
  ]);

  // Memoized CropControls to prevent re-renders that cause focus loss
  const CropControls = useMemo(() => {
    if (!selectedFile) return null;

    const maxX =
      crop.unit === "%" ? 100 : originalImageDimensions?.width || 500;
    const maxY =
      crop.unit === "%" ? 100 : originalImageDimensions?.height || 500;
    const maxWidth =
      crop.unit === "%" ? 100 : originalImageDimensions?.width || 500;
    const maxHeight =
      crop.unit === "%" ? 100 : originalImageDimensions?.height || 500;

    return (
      <Card className="mb-4">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <CropIcon color="primary" />
            <Typography variant="h6">Crop Controls</Typography>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className="flex items-center gap-2 mb-2">
                <AspectRatioIcon fontSize="small" />
                <Typography variant="subtitle2">Aspect Ratio</Typography>
              </div>
              <SelectWithLabel
                selectLabel="Aspect Ratio"
                options={aspectRatioPresets}
                value={aspectRatio?.toString() || "free"}
                onChange={handleAspectRatioChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" className="mb-2">
                Crop Unit
              </Typography>
              <SelectWithLabel
                selectLabel="Unit"
                options={[
                  { key: "px", value: "px", label: "Pixels (px)" },
                  { key: "%", value: "%", label: "Percentage (%)" },
                ]}
                value={cropUnit}
                onChange={handleCropUnitChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" className="mb-2">
                Position
              </Typography>
              <Box className="space-y-3">
                <div>
                  <Typography variant="caption" className="block mb-1">
                    X Position: {Math.round(crop.x)}
                    {crop.unit}
                  </Typography>
                  <Slider
                    value={crop.x}
                    onChange={(_, value) => handleXChange(value as number)}
                    min={0}
                    max={maxX}
                    size="small"
                    valueLabelDisplay="auto"
                  />
                </div>
                <div>
                  <Typography variant="caption" className="block mb-1">
                    Y Position: {Math.round(crop.y)}
                    {crop.unit}
                  </Typography>
                  <Slider
                    value={crop.y}
                    onChange={(_, value) => handleYChange(value as number)}
                    min={0}
                    max={maxY}
                    size="small"
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" className="mb-2">
                Size
              </Typography>
              <Box className="space-y-3">
                <div>
                  <Typography variant="caption" className="block mb-1">
                    Width: {Math.round(crop.width)}
                    {crop.unit}
                  </Typography>
                  <Slider
                    value={crop.width}
                    onChange={(_, value) => handleWidthChange(value as number)}
                    min={1}
                    max={maxWidth}
                    size="small"
                    valueLabelDisplay="auto"
                  />
                </div>
                <div>
                  <Typography variant="caption" className="block mb-1">
                    Height: {Math.round(crop.height)}
                    {crop.unit}
                  </Typography>
                  <Slider
                    value={crop.height}
                    onChange={(_, value) => handleHeightChange(value as number)}
                    min={1}
                    max={maxHeight}
                    size="small"
                    valueLabelDisplay="auto"
                    disabled={!!aspectRatio}
                  />
                </div>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" className="mb-2">
                Manual Input
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    key="x-field"
                    label={`X (${crop.unit})`}
                    type="number"
                    size="small"
                    value={Math.round(crop.x)}
                    onChange={handleXTextChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    key="y-field"
                    label={`Y (${crop.unit})`}
                    type="number"
                    size="small"
                    value={Math.round(crop.y)}
                    onChange={handleYTextChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    key="width-field"
                    label={`Width (${crop.unit})`}
                    type="number"
                    size="small"
                    value={Math.round(crop.width)}
                    onChange={handleWidthTextChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    key="height-field"
                    label={`Height (${crop.unit})`}
                    type="number"
                    size="small"
                    value={Math.round(crop.height)}
                    onChange={handleHeightTextChange}
                    fullWidth
                    disabled={!!aspectRatio}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className="flex gap-2 justify-end">
                <ButtonWithHandler
                  buttonText="Reset Crop"
                  startIcon={<RestartAltIcon />}
                  onClick={resetCrop}
                  size="small"
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }, [
    selectedFile,
    crop.unit,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    aspectRatio,
    cropUnit,
    originalImageDimensions,
    aspectRatioPresets,
    handleAspectRatioChange,
    handleCropUnitChange,
    handleXChange,
    handleYChange,
    handleWidthChange,
    handleHeightChange,
    handleXTextChange,
    handleYTextChange,
    handleWidthTextChange,
    handleHeightTextChange,
    resetCrop,
  ]);

  const selectImageHandler = useCallback(
    (id: string) => {
      const foundFile = find(fileList, { id });
      setSelectedFile(foundFile || null);
    },
    [fileList]
  );

  const handleCropChange = useCallback((c: PixelCrop) => {
    setCrop((prevCrop) => ({
      ...prevCrop,
      ...c,
    }));
  }, []);

  const handleCropComplete = useCallback((c: PixelCrop) => {
    setCompletedCrop(c);
  }, []);

  const handleAddMoreImages = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) handleFileSelect(files);
    };
    input.click();
  }, [handleFileSelect]);

  const handleFileRemove = useCallback(
    (id: string) => {
      setFileList((prevFileList) => {
        const newFileList = prevFileList.filter((f) => f.id !== id);
        if (selectedFile?.id === id) {
          setSelectedFile(newFileList.length > 0 ? newFileList[0] : null);
        }
        return newFileList;
      });
    },
    [selectedFile?.id]
  );

  return (
    <div className="flex flex-col w-full gap-3">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <Typography variant="body2" className="text-red-800">
            {error}
          </Typography>
        </div>
      )}

      {isEmpty(fileList) && (
        <FileUploadWithDragDrop
          accept="image/*"
          multiple={true}
          allowedTypes={FILE_TYPE_PRESETS.IMAGES}
          maxSize={FILE_SIZE_PRESETS.LARGE}
          onFileSelect={handleFileSelect}
          onError={handleError}
          title="Upload Images to Crop"
          subtitle="Drag and drop your images here or click to browse"
          supportText="Supports JPG, PNG, WebP, GIF formats up to 10MB each"
        />
      )}

      {!isEmpty(fileList) && (
        <div className="w-full flex flex-row justify-end">
          <ButtonWithHandler
            buttonText="Add More Images"
            onClick={handleAddMoreImages}
            size="small"
            startIcon={<AddIcon />}
          />
        </div>
      )}

      {!isEmpty(fileList) && (
        <>
          <Typography variant="h5" color="textSecondary">
            Selected Images
          </Typography>
          <FilePreview
            files={fileList.map((file) => ({
              id: file.id,
              file: file.originalFile,
              preview: URL.createObjectURL(file.originalFile),
              isSelected: selectedFile?.id === file.id,
            }))}
            onFileSelect={selectImageHandler}
            onFileRemove={handleFileRemove}
            previewSize="medium"
            layout="grid"
          />
        </>
      )}

      {!isNil(selectedFile) && (
        <Typography variant="h5" color="textSecondary">
          Crop & Preview
        </Typography>
      )}

      {!isNil(selectedFile) && CropControls}
      {!isNil(selectedFile) && <DownloadImageButtons />}
      {!isNil(selectedFile) && (
        <ReactCrop
          crop={crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
          aspect={aspectRatio}
          className="w-full max-h-fit border-solid border-2 border-gray-300"
        >
          <img
            ref={imgRef}
            id="image-cropper-preview"
            src={selectedFileUrl || ""}
            alt={selectedFile?.originalFile.name || ""}
            className="h-full w-full object-cover"
            onLoad={handleImageLoad}
          />
        </ReactCrop>
      )}
    </div>
  );
}
