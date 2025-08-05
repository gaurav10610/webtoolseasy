"use client";

import { TextField, Typography } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { ButtonWithHandler } from "../lib/buttons";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import { isEmpty, map } from "lodash-es";
import { Guid } from "guid-ts";
import { getRandomId } from "@/util/commonUtils";

export default function GuidGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const generateGUID = useCallback(() => {
    return Guid.newGuid().toString();
  }, []);

  const initialValue = generateGUID();

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const [bulkGuids, setBulkGuids] = useState<string[]>([]);
  const [bulkGuidsCount, setBulkGuidsCount] = useState<number>(5);

  const generateNewGuid = useCallback(() => {
    const newGuid = generateGUID();
    toolState.setCode(newGuid);
    toolState.actions.showMessage("New GUID generated!");
  }, [generateGUID, toolState]);

  const copyGuid = useCallback(() => {
    toolState.actions.copyText(toolState.code, "GUID copied to clipboard!");
  }, [toolState]);

  const generateBulkGuids = useCallback(() => {
    const uuids = Array.from({ length: bulkGuidsCount }, () => generateGUID());
    setBulkGuids(uuids);
    toolState.actions.showMessage(`Generated ${bulkGuidsCount} GUIDs!`);
  }, [bulkGuidsCount, generateGUID, toolState.actions]);

  const downloadGUIDs = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([bulkGuids.join("\n")], {
      type: "plain/text",
    });
    element.href = URL.createObjectURL(file);
    element.download = "bulk-guids-webtoolseasy.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toolState.actions.showMessage("GUIDs downloaded!");
  }, [bulkGuids, toolState.actions]);

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyGuid,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyGuid, toolState]
  );

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="GUID Generator"
        description="Free online GUID/UUID generator. Generate single or bulk GUIDs with download option."
        exampleCode="Generate"
        exampleOutput="123e4567-e89b-12d3-a456-426614174000"
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div className="flex flex-col gap-4 w-full">
        {/* Single GUID Section */}
        <div className="flex flex-col gap-3 items-center md:border-2 md:rounded-md md:p-4">
          <div className="flex flex-col gap-2 w-full md:flex-row md:justify-center md:items-center">
            <Typography
              color="secondary"
              className="text-center break-all"
              variant="h5"
            >
              {toolState.code}
            </Typography>
          </div>

          <ButtonWithHandler
            buttonText="Generate New GUID"
            onClick={generateNewGuid}
            size="small"
            variant="outlined"
            startIcon={<LoopIcon />}
            className="w-full md:w-fit"
          />
        </div>

        {/* Bulk GUID Section */}
        <div className="flex flex-col gap-3 w-full">
          <Typography
            variant="h5"
            color="textSecondary"
            className="text-center"
          >
            Bulk GUID Generator
          </Typography>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
            <TextField
              label="Enter GUIDs count"
              variant="outlined"
              required={true}
              value={bulkGuidsCount}
              onChange={(event) =>
                setBulkGuidsCount(Number(event.target.value))
              }
              size="small"
              type="number"
              inputProps={{ min: 1, max: 1000 }}
            />
            <ButtonWithHandler
              buttonText="Generate Bulk GUIDs"
              onClick={generateBulkGuids}
              startIcon={<LoopIcon />}
            />
          </div>

          {!isEmpty(bulkGuids) && (
            <div className="flex flex-col gap-2 w-full items-center overflow-y-auto max-h-[20rem] md:border-2 md:rounded-md md:p-4">
              {map(bulkGuids, (guid) => {
                return (
                  <Typography
                    key={getRandomId()}
                    variant="caption"
                    color="textSecondary"
                    className="break-all"
                  >
                    {guid}
                  </Typography>
                );
              })}
            </div>
          )}

          {!isEmpty(bulkGuids) && (
            <ButtonWithHandler
              buttonText="Download bulk guids to file"
              variant="outlined"
              onClick={downloadGUIDs}
              startIcon={<DownloadIcon />}
            />
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
