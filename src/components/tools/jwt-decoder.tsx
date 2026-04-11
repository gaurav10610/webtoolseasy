"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { ToolLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";
import { isNil } from "lodash-es";
import { decodeJwt, decodeProtectedHeader } from "jose";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";
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
          2,
        ),
      };
    } catch (error) {
      return { error };
    }
  }, []);

  const { decodedToken, decodedTokenHeaders, error } = useMemo(
    () => decodeJwtToken(toolState.code),
    [decodeJwtToken, toolState.code],
  );

  const [decodedJwtToken, setDecodedToken] = useState<string>(
    isNil(error) ? decodedToken! : "",
  );
  const [decodedJwtTokenHeaders, setDecodedTokenHeaders] = useState<string>(
    isNil(error) ? decodedTokenHeaders! : "",
  );

  const tokenError = !isNil(error);
  const [signHeader, setSignHeader] = useState(
    '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
  );
  const [signPayload, setSignPayload] = useState(
    decodedJwtToken ||
      '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true\n}',
  );
  const [signSecret, setSignSecret] = useState("my-secret-key");

  const signJwtToken = useCallback(async () => {
    try {
      const encoder = new TextEncoder();
      const header = JSON.parse(signHeader);
      const payload = JSON.parse(signPayload);

      const toBase64Url = (obj: unknown) =>
        btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/g, "");

      const headerPart = toBase64Url(header);
      const payloadPart = toBase64Url(payload);
      const signingInput = `${headerPart}.${payloadPart}`;

      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(signSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(signingInput),
      );
      const signatureBytes = new Uint8Array(signature);
      const signaturePart = btoa(String.fromCharCode(...signatureBytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");

      const token = `${signingInput}.${signaturePart}`;
      toolState.setCode(token);
      setDecodedToken(JSON.stringify(payload, null, 2));
      setDecodedTokenHeaders(JSON.stringify(header, null, 2));
      toolState.actions.showMessage("JWT signed successfully!");
    } catch (err) {
      toolState.actions.showMessage(
        err instanceof Error ? err.message : "JWT signing failed",
      );
    }
  }, [signHeader, signPayload, signSecret, toolState]);

  const onRawCodeChange = useCallback(
    (value: string) => {
      toolState.setCode(value);
      const { decodedToken, decodedTokenHeaders, error } =
        decodeJwtToken(value);
      setDecodedToken(isNil(error) ? decodedToken! : "");
      setDecodedTokenHeaders(isNil(error) ? decodedTokenHeaders! : "");
    },
    [toolState, decodeJwtToken],
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
    [copyDecodedToken, toolState],
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
            toolState.isFullScreen
              ? "h-full min-h-[320px]"
              : "h-[35vh] min-h-[280px]"
          }
        />
      </div>

      {/* JWT Sign / Encode */}
      <Card className="mb-6 w-full">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sign / Encode JWT (HS256)
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <TextField
              label="Header JSON"
              multiline
              minRows={5}
              value={signHeader}
              onChange={(e) => setSignHeader(e.target.value)}
              slotProps={{ input: { sx: { fontFamily: "monospace" } } }}
            />
            <TextField
              label="Payload JSON"
              multiline
              minRows={5}
              value={signPayload}
              onChange={(e) => setSignPayload(e.target.value)}
              slotProps={{ input: { sx: { fontFamily: "monospace" } } }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <TextField
              label="Secret Key"
              value={signSecret}
              onChange={(e) => setSignSecret(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={() => void signJwtToken()}>
              Generate HS256 JWT
            </Button>
          </div>
          <Alert severity="info" sx={{ mt: 2 }}>
            This encoder signs tokens locally in your browser using HMAC-SHA256.
          </Alert>
        </CardContent>
      </Card>

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
