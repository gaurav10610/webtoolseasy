"use client";

import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { v1 as generateUUID } from "uuid";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SnackBarWithPosition } from "../lib/snackBar";
import { copyToClipboard } from "@/util/commonUtils";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import { isEmpty, map } from "lodash-es";

export default function UUIDV1Generator() {
  const [uuid, setUuid] = useState<string>(generateUUID());
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);
  const [bulkUuidsCount, setBulkUuidsCount] = useState<number>(5);

  const onCopyHandler = () => {
    copyToClipboard(uuid);
    setIsSnackBarOpen(true);
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "UUID copied to clipboard";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const downloadUUIDs = () => {
    const element = document.createElement("a");
    const file = new Blob([bulkUuids.join("\n")], {
      type: "plain/text",
    });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-uuids-v1-webtoolseasy.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Remove the element after download
  };

  return (
    <div className="flex flex-col gap-3 items-center md:border-2 md:rounded-md md:p-4">
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
        <Typography color="secondary" className="text-center" variant="h5">
          {uuid}
        </Typography>
        <ButtonWithHandler
          buttonText="Copy UUID"
          startIcon={<ContentCopyIcon />}
          size="small"
          onClick={onCopyHandler}
        />
      </div>

      <ButtonWithHandler
        buttonText="Generate New UUID"
        onClick={() => setUuid(generateUUID())}
        size="small"
        variant="outlined"
        startIcon={<LoopIcon />}
        classes="w-full md:w-fit"
      />
      <div className="flex flex-col gap-3 mt-4 w-full md:w-fit">
        <Typography variant="h5" color="textSecondary" className="text-center">
          Bulk Version 1 UUID Generator
        </Typography>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
          <TextField
            label="Enter UUIDs count"
            variant="outlined"
            required={true}
            value={bulkUuidsCount}
            onChange={(event) => setBulkUuidsCount(Number(event.target.value))}
            size="small"
          />
          <ButtonWithHandler
            buttonText="Generate Bulk UUIDs"
            onClick={() => {
              const uuids = Array.from({ length: bulkUuidsCount }, () =>
                generateUUID()
              );
              setBulkUuids(uuids);
            }}
            startIcon={<LoopIcon />}
          />
        </div>

        {!isEmpty(bulkUuids) && (
          <div className="flex flex-col gap-2 w-full items-center overflow-y-auto max-h-[20rem] md:border-2 md:rounded-md md:p-4">
            {map(bulkUuids, (uuid, index) => {
              return (
                <Typography variant="caption" color="textSecondary">
                  {index + 1}. {uuid}
                </Typography>
              );
            })}
          </div>
        )}

        <ButtonWithHandler
          buttonText="Download bulk uuids to file"
          variant="outlined"
          onClick={downloadUUIDs}
          startIcon={<DownloadIcon />}
        />
      </div>
    </div>
  );
}
