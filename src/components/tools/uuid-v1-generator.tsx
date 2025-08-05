"use client";

import { TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { v1 as generateUUID } from "uuid";
import LoopIcon from "@mui/icons-material/Loop";
import { isEmpty, map } from "lodash-es";
import { getRandomId } from "@/util/commonUtils";
import { ToolLayout } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import { useToolState } from "@/hooks/useToolState";

export default function UUIDV1Generator() {
  const [uuid, setUuid] = useState<string>(generateUUID());
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);
  const [bulkUuidsCount, setBulkUuidsCount] = useState<number>(5);

  const toolState = useToolState({
    hostname: "",
    queryParams: {},
    initialValue: "",
  });

  const generateNewUUID = useCallback(() => {
    setUuid(generateUUID());
  }, []);

  const generateBulkUUIDs = useCallback(() => {
    const uuids = Array.from({ length: bulkUuidsCount }, () => generateUUID());
    setBulkUuids(uuids);
  }, [bulkUuidsCount]);

  const downloadUUIDs = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([bulkUuids.join("\n")], { type: "plain/text" });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-uuids-v1-webtoolseasy.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [bulkUuids]);

  const copyUUID = useCallback(() => {
    toolState.actions.copyText(uuid, "UUID copied to clipboard!");
  }, [toolState.actions, uuid]);

  return (
    <ToolLayout>
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
          <Typography color="secondary" className="text-center" variant="h5">
            {uuid}
          </Typography>
        </div>

        <ToolControls
          buttons={[
            {
              type: "copy",
              text: "Copy UUID",
              onClick: copyUUID,
            },
            {
              type: "custom",
              text: "Generate New UUID",
              onClick: generateNewUUID,
              icon: <LoopIcon />,
              variant: "outlined",
            },
          ]}
        />

        <div className="flex flex-col gap-3 mt-4 w-full md:w-fit">
          <Typography
            variant="h5"
            color="textSecondary"
            className="text-center"
          >
            Bulk Version 1 UUID Generator
          </Typography>

          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
            <TextField
              label="Enter UUIDs count"
              variant="outlined"
              required={true}
              value={bulkUuidsCount}
              onChange={(event) =>
                setBulkUuidsCount(Number(event.target.value))
              }
              size="small"
              inputProps={{ min: 1, max: 1000 }}
            />
          </div>

          <ToolControls
            buttons={[
              {
                type: "custom",
                text: "Generate Bulk UUIDs",
                onClick: generateBulkUUIDs,
                icon: <LoopIcon />,
              },
              {
                type: "download",
                text: "Download bulk UUIDs to file",
                onClick: downloadUUIDs,
                disabled: isEmpty(bulkUuids),
              },
            ]}
          />

          {!isEmpty(bulkUuids) && (
            <div className="flex flex-col gap-2 w-full items-center overflow-y-auto max-h-[20rem] md:border-2 md:rounded-md md:p-4">
              {map(bulkUuids, (uuid) => (
                <Typography
                  key={getRandomId()}
                  variant="caption"
                  color="textSecondary"
                >
                  {uuid}
                </Typography>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
