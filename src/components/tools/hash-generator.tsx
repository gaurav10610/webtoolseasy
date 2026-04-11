"use client";

import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Alert,
  LinearProgress,
  TextField,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout } from "../common/ToolLayout";
import { ToolControls, createCommonButtons } from "../common/ToolControls";
import { SingleCodeEditorWithHeaderV2 } from "../codeEditors";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function shaDigest(
  algorithm: "SHA-1" | "SHA-256" | "SHA-512",
  text: string,
) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return toHex(hashBuffer);
}

async function shaDigestBuffer(
  algorithm: "SHA-1" | "SHA-256" | "SHA-512",
  buffer: ArrayBuffer,
) {
  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  return toHex(hashBuffer);
}

async function md5Digest(text: string) {
  // Native MD5 implementation – no external dependency needed.
  // MD5 is included for legacy/compatibility hashing only; use SHA-256+ for security.
  const str = text;
  function md5(input: string): string {
    function safeAdd(x: number, y: number) {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    }
    function bitRotateLeft(num: number, cnt: number) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    function md5cmn(
      q: number,
      a: number,
      b: number,
      x: number,
      s: number,
      t: number,
    ) {
      return safeAdd(
        bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s),
        b,
      );
    }
    function md5ff(
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ) {
      return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ) {
      return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function strToUint8(s: string): Uint8Array {
      const bytes: number[] = [];
      for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        if (c < 128) bytes.push(c);
        else if (c < 2048) {
          bytes.push(192 | (c >> 6));
          bytes.push(128 | (c & 63));
        } else {
          bytes.push(224 | (c >> 12));
          bytes.push(128 | ((c >> 6) & 63));
          bytes.push(128 | (c & 63));
        }
      }
      return new Uint8Array(bytes);
    }
    const bytes = strToUint8(input);
    const bl = bytes.length * 8;
    const padLen = (bl % 512 < 448 ? 448 - (bl % 512) : 960 - (bl % 512)) / 8;
    const message = new Uint8Array(bytes.length + padLen + 8);
    message.set(bytes);
    message[bytes.length] = 0x80;
    const view = new DataView(message.buffer);
    view.setUint32(message.length - 8, bl, true);
    const M: number[] = [];
    for (let i = 0; i < message.length / 4; i++) {
      M.push(view.getUint32(i * 4, true));
    }
    let a = 0x67452301,
      b = 0xefcdab89,
      c = 0x98badcfe,
      d = 0x10325476;
    for (let i = 0; i < M.length; i += 16) {
      const aa = a,
        bb = b,
        cc = c,
        dd = d;
      a = md5ff(a, b, c, d, M[i], 7, -680876936);
      d = md5ff(d, a, b, c, M[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, M[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, M[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, M[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, M[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, M[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, M[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, M[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, M[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, M[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, M[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, M[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, M[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, M[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, M[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, M[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, M[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, M[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, M[i], 20, -373897302);
      a = md5gg(a, b, c, d, M[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, M[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, M[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, M[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, M[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, M[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, M[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, M[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, M[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, M[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, M[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, M[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, M[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, M[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, M[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, M[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, M[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, M[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, M[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, M[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, M[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, M[i], 11, -358537222);
      c = md5hh(c, d, a, b, M[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, M[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, M[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, M[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, M[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, M[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, M[i], 6, -198630844);
      d = md5ii(d, a, b, c, M[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, M[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, M[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, M[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, M[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, M[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, M[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, M[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, M[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, M[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, M[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, M[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, M[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, M[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, M[i + 9], 21, -343485551);
      a = safeAdd(a, aa);
      b = safeAdd(b, bb);
      c = safeAdd(c, cc);
      d = safeAdd(d, dd);
    }
    const result = new DataView(new ArrayBuffer(16));
    result.setUint32(0, a, true);
    result.setUint32(4, b, true);
    result.setUint32(8, c, true);
    result.setUint32(12, d, true);
    return Array.from(new Uint8Array(result.buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return md5(str);
}

export default function HashGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const defaultExample = "hello world";

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: defaultExample,
  });

  const [results, setResults] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
    sha512: string;
  }>({ md5: "", sha1: "", sha256: "", sha512: "" });

  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    hashes: {
      md5: string;
      sha1: string;
      sha256: string;
      sha512: string;
    } | null;
  } | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hmacKey, setHmacKey] = useState("");
  const [hmacResults, setHmacResults] = useState<{
    "SHA-256": string;
    "SHA-512": string;
  }>({ "SHA-256": "", "SHA-512": "" });

  const computeHmac = useCallback(async (msg: string, key: string) => {
    if (!msg || !key) {
      setHmacResults({ "SHA-256": "", "SHA-512": "" });
      return;
    }
    const enc = new TextEncoder();
    const keyBuf = enc.encode(key);
    const msgBuf = enc.encode(msg);
    const results: Record<string, string> = {};
    for (const alg of ["SHA-256", "SHA-512"] as const) {
      const k = await crypto.subtle.importKey(
        "raw",
        keyBuf,
        { name: "HMAC", hash: alg },
        false,
        ["sign"],
      );
      const sig = await crypto.subtle.sign("HMAC", k, msgBuf);
      results[alg] = toHex(sig);
    }
    setHmacResults(results as typeof hmacResults);
  }, []);

  const computeHashes = useCallback(async (input: string) => {
    if (!input) {
      setResults({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }
    const [md5, sha1, sha256, sha512] = await Promise.all([
      md5Digest(input),
      shaDigest("SHA-1", input),
      shaDigest("SHA-256", input),
      shaDigest("SHA-512", input),
    ]);
    setResults({ md5, sha1, sha256, sha512 });
  }, []);

  // Auto-compute on input change
  useEffect(() => {
    const t = setTimeout(() => computeHashes(toolState.code || ""), 150);
    return () => clearTimeout(t);
  }, [toolState.code, computeHashes]);

  // Auto-compute HMAC when input or key changes
  useEffect(() => {
    const t = setTimeout(() => computeHmac(toolState.code || "", hmacKey), 150);
    return () => clearTimeout(t);
  }, [toolState.code, hmacKey, computeHmac]);

  // Initial compute
  useEffect(() => {
    computeHashes(defaultExample);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileHash = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFileLoading(true);
      setFileInfo({ name: file.name, size: file.size, hashes: null });
      try {
        const buffer = await file.arrayBuffer();
        const enc = new TextDecoder("utf-8", { fatal: false });
        const text = enc.decode(buffer.slice(0, 100000)); // use first 100KB for MD5
        const [md5, sha1, sha256, sha512] = await Promise.all([
          md5Digest(text),
          shaDigestBuffer("SHA-1", buffer),
          shaDigestBuffer("SHA-256", buffer),
          shaDigestBuffer("SHA-512", buffer),
        ]);
        setFileInfo({
          name: file.name,
          size: file.size,
          hashes: { md5, sha1, sha256, sha512 },
        });
      } catch {
        setFileInfo(null);
        toolState.actions.showMessage("Failed to hash file");
      } finally {
        setFileLoading(false);
      }
      e.target.value = "";
    },
    [toolState.actions],
  );

  const copyHash = useCallback(
    (hash: string, label: string) => {
      toolState.actions.copyText(hash, `${label} hash copied!`);
    },
    [toolState.actions],
  );

  const copyAll = useCallback(() => {
    const { md5, sha1, sha256, sha512 } = results;
    if (!md5 && !sha1) {
      toolState.actions.showMessage("Compute hashes first");
      return;
    }
    const text = `MD5:     ${md5}\nSHA-1:   ${sha1}\nSHA-256: ${sha256}\nSHA-512: ${sha512}`;
    toolState.actions.copyText(text, "All hashes copied!");
  }, [results, toolState.actions]);

  const downloadHashes = useCallback(() => {
    const { md5, sha1, sha256, sha512 } = results;
    if (!md5) {
      toolState.actions.showMessage("Compute hashes first");
      return;
    }
    const content = `Input:\n${toolState.code}\n\nMD5:     ${md5}\nSHA-1:   ${sha1}\nSHA-256: ${sha256}\nSHA-512: ${sha512}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Hashes downloaded!");
  }, [results, toolState]);

  const buttons = useMemo(
    () => [
      {
        type: "custom" as const,
        text: "Hash a File",
        onClick: () => fileInputRef.current?.click(),
        icon: <UploadFileIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Copy All",
        onClick: copyAll,
        icon: <ContentCopyIcon />,
        variant: "outlined" as const,
      },
      {
        type: "custom" as const,
        text: "Clear",
        onClick: () => {
          toolState.setCode("");
          setResults({ md5: "", sha1: "", sha256: "", sha512: "" });
        },
        icon: <ClearIcon />,
        variant: "outlined" as const,
        color: "error" as const,
      },
      ...createCommonButtons({
        onShareLink: () => toolState.actions.copyShareableLink(toolState.code),
        onFullScreen: toolState.toggleFullScreen,
        onDownload: downloadHashes,
      }),
    ],
    [copyAll, toolState, downloadHashes],
  );

  const HashRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <Chip label={label} size="small" variant="outlined" color="primary" />
        {value && (
          <Button
            size="small"
            startIcon={<ContentCopyIcon fontSize="small" />}
            onClick={() => copyHash(value, label)}
          >
            Copy
          </Button>
        )}
      </div>
      <span className="font-mono text-xs break-all">
        {value || <span className="text-gray-400 italic">—</span>}
      </span>
    </div>
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
<input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileHash}
      />

      <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

      <div
        className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${toolState.isFullScreen ? "flex-1 min-h-0" : ""}`}
      >
        <div className={toolState.isFullScreen ? "min-h-0" : ""}>
          <SingleCodeEditorWithHeaderV2
            editorHeading="Input Text"
            themeOption="vs-dark"
            codeEditorProps={{
              language: "text",
              value: toolState.code,
              onChange: (v) => toolState.setCode(v),
              className: toolState.isFullScreen
                ? "h-full min-h-[320px]"
                : "h-[48vh] min-h-[200px]",
            }}
          />
        </div>

        <div className="space-y-3">
          <Typography variant="h6">Hash Results</Typography>
          <HashRow label="MD5" value={results.md5} />
          <HashRow label="SHA-1" value={results.sha1} />
          <HashRow label="SHA-256" value={results.sha256} />
          <HashRow label="SHA-512" value={results.sha512} />

          {/* HMAC Section */}
          <Divider />
          <Typography variant="subtitle1" className="font-semibold">
            HMAC (Keyed-Hash)
          </Typography>
          <TextField
            label="HMAC Secret Key"
            size="small"
            fullWidth
            value={hmacKey}
            onChange={(e) => setHmacKey(e.target.value)}
            placeholder="Enter secret key for HMAC"
            helperText="COMPUTES HMAC-SHA256 and HMAC-SHA512 with the secret key above"
          />
          <HashRow label="HMAC-SHA256" value={hmacResults["SHA-256"]} />
          <HashRow label="HMAC-SHA512" value={hmacResults["SHA-512"]} />

          {/* File Hashing Section */}
          <Divider />
          <Typography variant="subtitle1" className="font-semibold">
            File Hashing
          </Typography>
          {fileLoading && <LinearProgress />}
          {fileInfo && !fileLoading && (
            <Card>
              <CardContent>
                <Typography variant="body2" className="font-medium mb-2">
                  {fileInfo.name} ({(fileInfo.size / 1024).toFixed(1)} KB)
                </Typography>
                {fileInfo.hashes ? (
                  <div className="space-y-2">
                    <HashRow label="MD5" value={fileInfo.hashes.md5} />
                    <HashRow label="SHA-1" value={fileInfo.hashes.sha1} />
                    <HashRow label="SHA-256" value={fileInfo.hashes.sha256} />
                    <HashRow label="SHA-512" value={fileInfo.hashes.sha512} />
                  </div>
                ) : (
                  <Alert severity="info">Computing file hashes…</Alert>
                )}
              </CardContent>
            </Card>
          )}
          {!fileInfo && !fileLoading && (
            <Alert severity="info">
              Click &quot;Hash a File&quot; to compute hashes for any file —
              entirely in your browser, nothing is uploaded.
            </Alert>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
