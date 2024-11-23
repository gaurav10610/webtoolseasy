"use client";

import { isMobileDevice } from "@/lib/client-response";
import React, { useState } from "react";
import { ButtonWithHandler } from "../lib/buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import { TwoCodeEditors } from "../codeEditors";
import {
  compressStringToBase64,
  copyToClipboard,
  decodeText,
  encodeText,
} from "@/util/commonUtils";
import { usePathname } from "next/navigation";
import { SnackBarWithPosition } from "../lib/snackBar";
import { ToolComponentProps } from "@/types/component";
import { Code } from "@mui/icons-material";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { Checkbox, Typography } from "@mui/material";

export default function XmlToJsonConverter({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const isMobileView = isMobileDevice();

  const initialValue = `
  <?xml version="1.0"?>
  <customers>
     <customer id="101">
        <name>WebToolsEasy</name>
        <address>
           <street>101 Last1</street>
           <city>Framingham</city>
           <state>MA</state>
           <zip>0001</zip>
        </address>
        <address>
           <street>101 Last1</street>
           <city>Framingham</city>
           <state>MA</state>
           <zip>0002</zip>
        </address>
        <address>
           <street>101 Last1</street>
           <state>MA</state>
           <zip>0003</zip>
        </address>
     </customer>
  </customers>
  `;

  const codeQueryParam = queryParams.content;
  const currentPath = usePathname();

  const [parserOptions, setParserOptions] = useState<X2jOptions>({
    ignoreAttributes: true,
    ignoreDeclaration: true,
  });

  const handleParserOptionsChange = (
    propertyName: string,
    propertyValue: boolean
  ) => {
    setParserOptions({
      ...parserOptions,
      [propertyName]: propertyValue,
    });
  };

  const [rawCode, setRawCode] = useState(
    codeQueryParam ? decodeText(codeQueryParam) : initialValue
  );

  const [convertedJson, setConvertedJson] = useState(
    JSON.stringify(
      new XMLParser(parserOptions).parse(
        codeQueryParam ? decodeText(codeQueryParam) : initialValue
      ),
      null,
      4
    )
  );

  const onRawCodeChange = (value: string) => {
    setRawCode(value);
  };

  const convertXml = () => {
    setConvertedJson(
      JSON.stringify(new XMLParser(parserOptions).parse(rawCode), null, 4)
    );
  };

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleFormattedCodeCopy = () => {
    copyToClipboard(convertedJson);
    setSnackBarMessage("Copied Formatted Code to Clipboard!");
    setIsSnackBarOpen(true);
  };

  const handleLinkCopy = () => {
    compressStringToBase64(rawCode).then((compressedData) => {
      copyToClipboard(
        `${hostname}${currentPath}?content=${encodeText(compressedData)}`
      );
      setSnackBarMessage("Copied Link to Clipboard!");
      setIsSnackBarOpen(true);
    });
  };

  function ControlButtons() {
    return (
      <div
        className="row-display inner-flex-gap full-width"
        style={{
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        <ButtonWithHandler
          buttonText="Convert Xml Code"
          variant="contained"
          onClick={convertXml}
          size="small"
          startIcon={<Code />}
        />
        <ButtonWithHandler
          buttonText="Copy Json Code"
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleFormattedCodeCopy}
        />
        <ButtonWithHandler
          buttonText="Copy Shareable Link"
          variant="outlined"
          size="small"
          startIcon={<LinkIcon />}
          onClick={handleLinkCopy}
        />
      </div>
    );
  }

  return (
    <>
      <SnackBarWithPosition
        message={snackBarMessage}
        open={isSnackBarOpen}
        autoHideDuration={2000}
        handleClose={handleSnackBarClose}
      />
      <TwoCodeEditors
        buttons={<ControlButtons />}
        firstEditorHeading="Xml Code"
        firstEditorProps={{
          language: "xml",
          value: rawCode,
          onChange: onRawCodeChange,
          sx: {
            height: isMobileView ? "20rem" : "30rem",
          },
        }}
        secondEditorHeading="Json Code"
        secondEditorProps={{
          language: "json",
          value: convertedJson,
          sx: {
            height: isMobileView ? "20rem" : "30rem",
          },
          editorOptions: {
            readOnly: true,
          },
        }}
      />
      <div
        className="row-display flex-hz-center w-full base-flex-gap"
        style={{
          flexDirection: isMobileView ? "column" : "row",
        }}
      >
        <div className="row-display flex-hz-center inner-flex-gap flex-vr-center">
          <Checkbox
            defaultChecked
            onChange={(e) => {
              handleParserOptionsChange("ignoreAttributes", e.target.checked);
            }}
            name="ignoreAttributes"
          />
          <Typography variant="body2">Ignore Attributes</Typography>
        </div>
        <div className="row-display flex-hz-center inner-flex-gap flex-vr-center">
          <Checkbox
            defaultChecked
            onChange={(e) => {
              handleParserOptionsChange("ignoreDeclaration", e.target.checked);
            }}
            name="ignoreDeclaration"
          />
          <Typography variant="body2">Ignore Declaration</Typography>
        </div>
      </div>
    </>
  );
}
