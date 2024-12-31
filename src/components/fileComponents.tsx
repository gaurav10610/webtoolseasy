import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { Typography } from "@mui/material";
import { ButtonWithHandler } from "./lib/buttons";
import Image from "next/image";
import { BaseImageData } from "@/types/file";

export const NoFilesState = ({
  openFileDialog,
}: {
  openFileDialog: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full border-solid border-2 border-gray-300 rounded-sm p-4">
      <InsertDriveFileRoundedIcon fontSize="large" />
      <Typography variant="body2">or</Typography>
      <ButtonWithHandler
        onClick={openFileDialog}
        buttonText="Browse Files"
        size="small"
        variant="outlined"
      />
    </div>
  );
};

export const ImagesPreview = ({
  fileList,
  selectImageHandler,
}: {
  fileList: BaseImageData[];
  selectImageHandler: (id: string) => void;
}) => {
  return (
    <div className="flex flex-row gap-4 overflow-y-auto w-full h-36 md:h-50">
      {fileList.map((baseFileData, index) => (
        <Image
          key={index}
          src={URL.createObjectURL(baseFileData.originalFile)}
          alt={baseFileData.originalFile.name}
          className="h-full object-cover rounded-md border-2 border-gray-300"
          width={128}
          height={128}
          onClick={() => selectImageHandler(baseFileData.id)}
        />
      ))}
    </div>
  );
};
