"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout, SEOContent, CodeEditorLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { isNil } from "lodash-es";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

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

  const downloadDecodedToken = useCallback(() => {
    const decoded = {
      headers: JSON.parse(decodedJwtTokenHeaders || "{}"),
      payload: JSON.parse(decodedJwtToken || "{}"),
    };
    const blob = new Blob([JSON.stringify(decoded, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decoded-jwt.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Decoded JWT downloaded successfully!");
  }, [decodedJwtToken, decodedJwtTokenHeaders, toolState.actions]);

  // Editor configurations
  const inputEditorProps = useEditorConfig({
    language: "text",
    value: toolState.code,
    onChange: onRawCodeChange,
  });

  const headersEditorProps = useEditorConfig({
    language: "json",
    value: decodedJwtTokenHeaders,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  const tokenEditorProps = useEditorConfig({
    language: "json",
    value: decodedJwtToken,
    onChange: () => {}, // Read-only
    readOnly: true,
  });

  // Button configuration
  const buttons = useMemo(
    () => [
      ...createCommonButtons({
        onCopy: copyDecodedToken,
        onDownload: downloadDecodedToken,
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
      }),
    ],
    [copyDecodedToken, downloadDecodedToken, toolState]
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
        <div className="flex flex-row gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <ErrorIcon color="error" />
          <Typography variant="h6" color="error">
            Token is invalid!
          </Typography>
        </div>
      )}

      <CodeEditorLayout
        isFullScreen={toolState.isFullScreen}
        leftPanel={
          <SingleCodeEditorWithHeaderV2
            codeEditorProps={inputEditorProps}
            themeOption="vs-dark"
            editorHeading="JWT Token"
            className={
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }
          />
        }
        rightPanel={
          <div
            className={`flex flex-col gap-2 w-full ${
              toolState.isFullScreen ? "h-full" : "h-[65vh] min-h-[320px]"
            }`}
          >
            <SingleCodeEditorWithHeaderV2
              codeEditorProps={headersEditorProps}
              themeOption="vs-dark"
              editorHeading="Headers (Algorithm & Token Type)"
              className="w-full h-1/2"
            />
            <SingleCodeEditorWithHeaderV2
              codeEditorProps={tokenEditorProps}
              themeOption="vs-dark"
              editorHeading="Token Data"
              className="w-full h-1/2"
            />
          </div>
        }
      />
    </ToolLayout>
  );
}
