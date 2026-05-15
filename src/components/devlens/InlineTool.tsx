"use client";

import { useState } from "react";
import { JwtView } from "./views/JwtView";
import { JsonView } from "./views/JsonView";
import { Base64View } from "./views/Base64View";
import { UrlEncodedView } from "./views/UrlEncodedView";
import { TimestampView } from "./views/TimestampView";
import { UuidView } from "./views/UuidView";
import { ColorView } from "./views/ColorView";
import { IpView } from "./views/IpView";
import { RegexView } from "./views/RegexView";
import { YamlView } from "./views/YamlView";
import { XmlView } from "./views/XmlView";
import { EnvView } from "./views/EnvView";
import { CronView } from "./views/CronView";
import { SqlView } from "./views/SqlView";
import { CsvView } from "./views/CsvView";
import { PemView } from "./views/PemView";

type SupportedType =
  | "jwt"
  | "json"
  | "base64"
  | "url"
  | "timestamp"
  | "uuid"
  | "hex-color"
  | "ip"
  | "regex"
  | "yaml"
  | "xml"
  | "env"
  | "cron"
  | "sql"
  | "csv"
  | "pem-certificate";

const PLACEHOLDER: Record<SupportedType, string> = {
  jwt: "Paste a JWT token here (eyJ…)",
  json: "Paste any JSON here",
  base64: "Paste Base64-encoded text or plain text to encode",
  url: "Paste a URL or percent-encoded string",
  timestamp: "Paste a Unix timestamp (seconds or ms)",
  uuid: "Paste a UUID (e.g., 550e8400-e29b-41d4-a716-446655440000)",
  "hex-color": "Paste a hex color (e.g., #3b82f6)",
  ip: "Paste an IP address (IPv4 or IPv6, with optional CIDR)",
  regex: "Paste a regex pattern (e.g., ^[a-z]+\\d{2,4}$)",
  yaml: "Paste YAML content here",
  xml: "Paste XML content here",
  env: "Paste your .env file content here",
  cron: "Paste a cron expression (e.g., */5 * * * *)",
  sql: "Paste a SQL query here",
  csv: "Paste CSV or TSV data here",
  "pem-certificate": "Paste a PEM certificate (-----BEGIN CERTIFICATE-----)",
};

function ViewRouter({ type, input }: { type: SupportedType; input: string }) {
  if (!input.trim()) return null;
  switch (type) {
    case "jwt":
      return <JwtView input={input} />;
    case "json":
      return <JsonView input={input} />;
    case "base64":
      return <Base64View input={input} />;
    case "url":
      return <UrlEncodedView input={input} />;
    case "timestamp":
      return <TimestampView input={input} />;
    case "uuid":
      return <UuidView input={input} />;
    case "hex-color":
      return <ColorView input={input} />;
    case "ip":
      return <IpView input={input} />;
    case "regex":
      return <RegexView input={input} />;
    case "yaml":
      return <YamlView input={input} />;
    case "xml":
      return <XmlView input={input} />;
    case "env":
      return <EnvView input={input} />;
    case "cron":
      return <CronView input={input} />;
    case "sql":
      return <SqlView input={input} />;
    case "csv":
      return <CsvView input={input} />;
    case "pem-certificate":
      return <PemView input={input} />;
    default:
      return null;
  }
}

type InlineToolProps = {
  toolType: SupportedType;
  defaultInput?: string;
};

export function InlineTool({ toolType, defaultInput = "" }: InlineToolProps) {
  const [input, setInput] = useState(defaultInput);

  return (
    <div className="space-y-4">
      <textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER[toolType]}
        className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
      />
      {input.trim() && <ViewRouter type={toolType} input={input} />}
      {!input.trim() && (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center text-sm text-gray-500">
          Paste your data above to inspect it
        </div>
      )}
    </div>
  );
}
