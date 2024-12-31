"use client";

import { isEmpty, isNil, map } from "lodash-es";
import { useState } from "react";
import { NoFilesState } from "../fileComponents";
import { Typography } from "@mui/material";
import { ButtonWithHandler } from "../lib/buttons";
import AddIcon from "@mui/icons-material/Add";
import { BaseImageData } from "@/types/file";

interface CompressOptions {
  signal: AbortSignal;
  maxSizeMB: number;
  useWebWorker: boolean;
}

interface ImageFileData extends BaseImageData {
  compressedFile: Blob;
  compressProgress: number;
  isCompressed: boolean;
  compressOptions: CompressOptions;
}

export default function ImageCompress() {
  const [fileList, setFileList] = useState<ImageFileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFilesSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;

    const newFiles = map(Array.from(files), (file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
      compressedFile: new Blob(),
      compressProgress: 0,
      isCompressed: false,
      compressOptions: {
        signal: new AbortController().signal,
        maxSizeMB: (0.9 * file.size) / 1024 / 1024,
        useWebWorker: true,
      },
    }));

    setFileList([...fileList, ...newFiles]);
    if (isNil(selectedFile)) {
      setSelectedFile(files[0]);
    }
  };

  const openFileDialog = () => {
    const input = document.getElementById("file") as HTMLInputElement;
    input.type = "file";
    input.click();
  };

  const selectImageHandler = (file: File) => {
    setSelectedFile(file);
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
      {/* {!isEmpty(fileList) && (
        <ImagesPreview
          fileList={fileList}
          selectImageHandler={selectImageHandler}
        />
      )} */}
    </div>
  );
}
