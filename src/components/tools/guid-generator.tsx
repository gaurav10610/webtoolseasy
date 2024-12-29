"use client";

import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SnackBarWithPosition } from "../lib/snackBar";
import { copyToClipboard } from "@/util/commonUtils";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import { isEmpty, map } from "lodash-es";
import { Guid } from "guid-ts";

export default function GuidGenerator() {
  const generateGUID = () => {
    return Guid.newGuid().toString();
  };
  const [guid, setGuid] = useState<string>(generateGUID());
  const [bulkGuids, setBulkGuids] = useState<string[]>([]);
  const [bulkGuidsCount, setBulkGuidsCount] = useState<number>(5);

  const onCopyHandler = () => {
    copyToClipboard(guid);
    setIsSnackBarOpen(true);
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const snackBarMessage = "GUID copied to clipboard";

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const downloadGUIDs = () => {
    const element = document.createElement("a");
    const file = new Blob([bulkGuids.join("\n")], {
      type: "plain/text",
    });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-guids-webtoolseasy.txt";
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
          {guid}
        </Typography>
        <ButtonWithHandler
          buttonText="Copy GUID"
          startIcon={<ContentCopyIcon />}
          size="small"
          onClick={onCopyHandler}
        />
      </div>

      <ButtonWithHandler
        buttonText="Generate New GUID"
        onClick={() => setGuid(generateGUID())}
        size="small"
        variant="outlined"
        startIcon={<LoopIcon />}
        classes="w-full md:w-fit"
      />
      <div className="flex flex-col gap-3 mt-4 w-full md:w-fit">
        <Typography variant="h5" color="textSecondary" className="text-center">
          Bulk GUID Generator
        </Typography>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
          <TextField
            label="Enter GUIDs count"
            variant="outlined"
            required={true}
            value={bulkGuidsCount}
            onChange={(event) => setBulkGuidsCount(Number(event.target.value))}
            size="small"
          />
          <ButtonWithHandler
            buttonText="Generate Bulk GUIDs"
            onClick={() => {
              const uuids = Array.from({ length: bulkGuidsCount }, () =>
                generateGUID()
              );
              setBulkGuids(uuids);
            }}
            startIcon={<LoopIcon />}
          />
        </div>

        {!isEmpty(bulkGuids) && (
          <div className="flex flex-col gap-2 w-full items-center overflow-y-auto max-h-[20rem] md:border-2 md:rounded-md md:p-4">
            {map(bulkGuids, (uuid, index) => {
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
          onClick={downloadGUIDs}
          startIcon={<DownloadIcon />}
        />
      </div>
    </div>
  );
}
