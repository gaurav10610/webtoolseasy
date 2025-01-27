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
  Slider,
  Typography,
} from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { BaseFileData } from "@/types/file";
import imageCompression from "browser-image-compression";
import { formatBytes } from "@/util/commonUtils";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";

interface CompressOptions {
  signal: AbortSignal;
  maxSizeMB: number;
  useWebWorker: boolean;
}

interface ImageFileData extends BaseFileData {
  compressedFile?: Blob;
  compressProgress: number;
  isCompressed: boolean;
  compressOptions: CompressOptions;
  inProgress: boolean;
  error?: unknown;
  compressionRate: number;
  maxFileSize: number;
}

export default function ImageCompress() {
  const [fileList, setFileList] = useState<ImageFileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<ImageFileData | null>(null);

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;

    const newFiles = map(Array.from(files), (file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
      compressProgress: 0,
      isCompressed: false,
      inProgress: false,
      compressOptions: {
        signal: new AbortController().signal,
        maxSizeMB: (0.9 * file.size) / 1024 / 1024,
        useWebWorker: true,
      },
      compressionRate: 10,
      maxFileSize: 0.9 * file.size,
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

  const compressImage = () => {
    const compresstionRateSlider = document.getElementById(
      "compression-rate-slider"
    ) as HTMLSpanElement;

    const compressionRate = Number(compresstionRateSlider.innerText);
    const compressionRatio: number = 100 - compressionRate;
    const maxFileSize =
      (compressionRatio / 100) * selectedFile!.originalFile.size;
    const maxSizeMB = maxFileSize / 1024 / 1024;

    const imageFileData: ImageFileData = {
      ...selectedFile!,
      compressOptions: {
        ...selectedFile!.compressOptions,
        maxSizeMB,
      },
      inProgress: true,
      compressProgress: 0,
      compressionRate,
      maxFileSize,
    };

    setSelectedFile({
      ...imageFileData,
    });

    imageCompression(imageFileData.originalFile, {
      ...imageFileData.compressOptions,
      onProgress: (progress: number) => {
        imageFileData.compressProgress = progress;
        setSelectedFile({ ...imageFileData });
      },
    })
      .then((compressedFile) => {
        imageFileData.compressedFile = compressedFile;
        imageFileData.isCompressed = true;
        imageFileData.inProgress = false;
        setSelectedFile({
          ...imageFileData,
        });
      })
      .catch((error) => {
        imageFileData.error = error;
        imageFileData.inProgress = false;
        setSelectedFile({
          ...imageFileData,
        });
      });
  };

  const selectImageHandler = (id: string) => {
    setSelectedFile(find(fileList, { id }) || null);
  };

  const CompressionSettings = ({
    selectedFile,
  }: Readonly<{
    selectedFile: ImageFileData;
  }>) => {
    return (
      <div className="flex flex-col gap-3 w-full items-center p-2 border-solid border-2 border-gray-300 mdp-4 rounded-sm">
        <Typography variant="h5" color="textSecondary">
          Compression Options
        </Typography>
        <div className="flex flex-col gap-3 w-full items-center">
          <div className="flex flex-row gap-3 w-full justify-center items-center">
            <Typography variant="body2" color="primary" className="text-start">
              Compression Level
            </Typography>
            <Slider
              id="compression-rate-slider"
              aria-label="Compression slider"
              defaultValue={selectedFile.compressionRate}
              color="primary"
              size="small"
              draggable
              valueLabelDisplay="on"
            />
          </div>
          <div className="flex flex-row gap-2 w-full">
            <Typography variant="body2" color="primary">
              Original Image Size
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {formatBytes(selectedFile.originalFile.size)}
            </Typography>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <Typography variant="body2" color="primary">
              Compressed Image Size
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {formatBytes(selectedFile.maxFileSize)}
            </Typography>
          </div>
        </div>
        <div>
          <ButtonWithHandler
            buttonText="Apply Options & Compress"
            onClick={compressImage}
            size="small"
            startIcon={<SettingsIcon />}
            variant="outlined"
          />
        </div>
      </div>
    );
  };

  const CompressedImagePreview = ({
    compressedFile,
  }: Readonly<{
    compressedFile: Blob;
  }>) => {
    return (
      <>
        <Typography variant="h5" color="primary">
          Compress & Preview
        </Typography>
        <DownloadImageButtons />
        <div className="w-full max-h-fit gap-3 border-solid border-2 border-gray-300">
          <img
            id="image-cropper-preview"
            src={URL.createObjectURL(compressedFile)}
            alt="Compressed image preview"
            className="h-full w-full object-cover"
          />
        </div>
      </>
    );
  };

  const formatList = ["png", "jpeg", "webp", "bmp", "ico"];
  const [imageFormat, setImageFormat] = useState<string>(formatList[0]);

  const handleImageFormatChange = (event: SelectChangeEvent<string>) => {
    setImageFormat(event.target.value);
  };

  const formatOptions = map(formatList, (item) => {
    return (
      <MenuItem key={item} value={item}>
        {toUpper(item)}
      </MenuItem>
    );
  });

  const downloadImage = (blob: Blob) => {
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
            downloadImage(selectedFile!.compressedFile!);
          }}
          size="small"
        />
      </div>
    );
  };

  const ProgressLoader = () => {
    return (
      <div className="flex flex-col w-full items-center gap-3">
        <div className="w-full flex flex-row justify-center items-center gap-3">
          <Typography variant="body1" color="secondary">
            Compressing...
          </Typography>
          <div className="w-full flex flex-row justify-center items-center">
            <progress
              value={selectedFile!.compressProgress}
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    );
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
        <Typography variant="h5" color="textSecondary">
          Selected Images
        </Typography>
      )}
      {!isEmpty(fileList) && (
        <ImagesPreview
          selectedFile={selectedFile}
          fileList={map(fileList, ({ id, originalFile }) => ({
            id,
            originalFile,
          }))}
          selectImageHandler={selectImageHandler}
        />
      )}
      {!isNil(selectedFile) && (
        <CompressionSettings selectedFile={selectedFile} />
      )}
      {!isNil(selectedFile) && selectedFile.inProgress && <ProgressLoader />}
      {!isNil(selectedFile) &&
        !isNil(selectedFile.compressedFile) &&
        !selectedFile.inProgress && (
          <CompressedImagePreview
            compressedFile={selectedFile.compressedFile}
          />
        )}
    </div>
  );
}
