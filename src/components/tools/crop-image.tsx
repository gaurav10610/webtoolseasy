/* eslint-disable @next/next/no-img-element */
"use client";

import { find, isEmpty, isNil, map, toUpper } from "lodash-es";
import { useState } from "react";
import { ImagesPreview, NoFilesState } from "../fileComponents";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ButtonWithHandler } from "../lib/buttons";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { BaseImageData } from "@/types/file";

export default function CropImage() {
  const [fileList, setFileList] = useState<BaseImageData[]>([]);
  const [selectedFile, setSelectedFile] = useState<BaseImageData | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const formatList = ["png", "jpeg", "webp", "bmp", "ico"];
  const [imageFormat, setImageFormat] = useState<string>(formatList[0]);

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;
    const newFiles = map(Array.from(files), (file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
    }));
    setFileList([...fileList, ...newFiles]);
    if (isNil(selectedFile)) {
      setSelectedFile(newFiles[0]);
    }
  };

  const openFileDialog = () => {
    const input = document.getElementById("file") as HTMLInputElement;
    input.type = "file";
    input.click();
  };

  const croppedImage = ({
    crop,
    selectedFile,
    callback,
  }: Readonly<{
    crop: Crop;
    selectedFile: BaseImageData;
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
          cropHeight, // Source rectangle
          0,
          0,
          cropWidth,
          cropHeight // Destination rectangle
        );

        canvas.toBlob(callback);
      }
    };
  };

  const formatOptions = map(formatList, (item) => {
    return (
      <MenuItem key={item} value={item}>
        {toUpper(item)}
      </MenuItem>
    );
  });

  const handleImageFormatChange = (event: SelectChangeEvent<string>) => {
    setImageFormat(event.target.value);
  };

  const downloadCallback = (blob: Blob | null) => {
    if (!blob) {
      return;
    }

    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `cropped-image.${imageFormat}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadImage = ({
    crop,
    selectedFile,
    imageFormat,
    callback,
  }: Readonly<{
    crop: Crop;
    selectedFile: BaseImageData;
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
  };

  const DownloadImageButtons = () => {
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
              crop,
              selectedFile: selectedFile!,
              imageFormat,
              callback: downloadCallback,
            });
          }}
          size="small"
        />
      </div>
    );
  };

  const selectImageHandler = (id: string) => {
    setSelectedFile(find(fileList, { id }) || null);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <input
        id="file"
        type="file"
        className="hidden"
        onChange={onFilesSelection}
        multiple
        accept=".jpg,.jpeg,.png,.webp,.bmp"
      />
      {isEmpty(fileList) && <NoFilesState openFileDialog={openFileDialog} />}
      {!isEmpty(fileList) && (
        <div className="w-full flex flex-row justify-end">
          <ButtonWithHandler
            buttonText="Add More Images"
            onClick={openFileDialog}
            size="small"
            startIcon={<AddIcon />}
          />
        </div>
      )}
      {!isEmpty(fileList) && (
        <Typography variant="h5" color="primary">
          Selected Images
        </Typography>
      )}
      {!isEmpty(fileList) && (
        <ImagesPreview
          fileList={fileList}
          selectImageHandler={selectImageHandler}
        />
      )}
      {!isNil(selectedFile) && (
        <Typography variant="h5" color="primary">
          Crop & Preview
        </Typography>
      )}

      {!isNil(selectedFile) && <DownloadImageButtons />}
      {!isNil(selectedFile) && (
        <ReactCrop
          crop={crop}
          onChange={(c) => {
            setCrop({
              ...crop,
              ...c,
            });
          }}
          className="w-full max-h-fit border-solid border-2 border-gray-300"
        >
          <img
            id="image-cropper-preview"
            src={URL.createObjectURL(selectedFile.originalFile)}
            alt={selectedFile.originalFile.name}
            className="h-full w-full object-cover"
          />
        </ReactCrop>
      )}
    </div>
  );
}
