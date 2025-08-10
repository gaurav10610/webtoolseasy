"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { isNil } from "lodash-es";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function JwtDecoder({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const initialValue = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJTYW1wbGUgSXNzdWVyIiwiVXNlcm5hbWUiOiJ1c2VybmFtZUB3ZWJ0b29sc2Vhc3kuY29tIiwiZXhwIjoxNjY4OTQyNDIzLCJpYXQiOjE2Njg5NDI0MjN9.WuKjPKbgXqh_DkGd0aEBQr305Rn8EkMLvd0W7LRE-JM`;

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue,
  });

  const decodeJwtToken = useCallback((token: string) => {
    try {
      return {
        decodedToken: JSON.stringify(decodeJwt(token), null, 2),
        decodedTokenHeaders: JSON.stringify(
          decodeProtectedHeader(token),
          null,
          2
        ),
      };
    } catch (error) {
      return { error };
    }
  }, []);

  const { decodedToken, decodedTokenHeaders, error } = useMemo(
    () => decodeJwtToken(toolState.code),
    [decodeJwtToken, toolState.code]
  );

  const [decodedJwtToken, setDecodedToken] = useState<string>(
    isNil(error) ? decodedToken! : ""
  );
  const [decodedJwtTokenHeaders, setDecodedTokenHeaders] = useState<string>(
    isNil(error) ? decodedTokenHeaders! : ""
  );

  const tokenError = !isNil(error);

  const onRawCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      const { decodedToken, decodedTokenHeaders, error } =
        decodeJwtToken(value);
      setDecodedToken(isNil(error) ? decodedToken! : "");
      setDecodedTokenHeaders(isNil(error) ? decodedTokenHeaders! : "");
    },
    [toolState, decodeJwtToken]
  );

  const copyDecodedToken = useCallback(() => {
    toolState.actions.copyText(decodedJwtToken, "Copied decoded JWT token!");
  }, [toolState.actions, decodedJwtToken]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language: "text",
    value: toolState.code,
    onChange: onRawCodeChange,
    className: "w-full h-full", // Override default height
  });

  const headersEditorProps = useEditorConfig({
    language: "json",
    value: decodedJwtTokenHeaders,
    onChange: () => {}, // Read-only
    readOnly: true,
    className: "w-full h-full", // Override default height
  });

  const tokenEditorProps = useEditorConfig({
    language: "json",
    value: decodedJwtToken,
    onChange: () => {}, // Read-only
    readOnly: true,
    className: "w-full h-full", // Override default height
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Copy Decoded Token",
        onClick: copyDecodedToken,
        icon: <ContentCopyIcon />,
        variant: "outlined" as const,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyDecodedToken, toolState]
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
        title="JWT Decoder"
        description="Free online JWT token decoder. Decode and verify JSON Web Tokens with headers and payload visualization."
        exampleCode={initialValue}
        exampleOutput={JSON.stringify(
          { Role: "Admin", Issuer: "Sample Issuer" },
          null,
          2
        )}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      {tokenError && (
        <div className="flex flex-row gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <ErrorIcon color="error" />
          <Typography variant="h6" color="error">
            Token is invalid!
          </Typography>
        </div>
      )}

      {/* Row 1: JWT Token Editor */}
      <div className="mb-8 w-full">
        <SingleCodeEditorWithHeaderV2
          codeEditorProps={inputEditorProps}
          themeOption="vs-dark"
          editorHeading="JWT Token"
          className={
            toolState.isFullScreen ? "h-[40vh]" : "h-[35vh] min-h-[280px]"
          }
        />
      </div>

      {/* Row 2: Headers and Token Data Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={headersEditorProps}
            themeOption="vs-dark"
            editorHeading="Headers (Algorithm & Token Type)"
            className={
              toolState.isFullScreen ? "h-[45vh]" : "h-[30vh] min-h-[200px]"
            }
          />
        </div>
        <div className="w-full">
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={tokenEditorProps}
            themeOption="vs-dark"
            editorHeading="Token Data"
            className={
              toolState.isFullScreen ? "h-[45vh]" : "h-[30vh] min-h-[200px]"
            }
          />
        </div>
      </div>
    </ToolLayout>
  );
}
