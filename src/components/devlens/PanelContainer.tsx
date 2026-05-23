"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";
import { TypeBadge } from "./TypeBadge";
import { PasteInput } from "./PasteInput";
import { UnknownView } from "./UnknownView";
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
import { DevLensPanel, useDevLensStore } from "@/store/useDevLensStore";

type PanelContainerProps = {
  panel: DevLensPanel;
  onChange: (input: string) => void;
  onRemove: () => void;
  footer?: ReactNode;
};

const ALL_TYPES = [
  "unknown", "jwt", "json", "base64", "base64-data-url", "url", "timestamp", "uuid", 
  "hex-color", "ip", "regex", "yaml", "xml", "env", "cron", "sql", "csv", 
  "pem-certificate", "pem-private-key"
];

export function PanelContainer({
  panel,
  onChange,
  onRemove,
  footer,
}: PanelContainerProps) {
  const setOverrideType = useDevLensStore((state) => state.setOverrideType);
  const activeType = panel.overrideType ?? panel.detection.type;

  const isUnknown = activeType === "unknown";
  const isJwt = activeType === "jwt";
  const isJson = activeType === "json";
  const isBase64 =
    activeType === "base64" ||
    activeType === "base64-data-url";
  const isUrlEncoded = activeType === "url";
  const isTimestamp = activeType === "timestamp";
  const isUuid = activeType === "uuid";
  const isHexColor = activeType === "hex-color";
  const isIp = activeType === "ip";
  const isRegex = activeType === "regex";
  const isYaml = activeType === "yaml";
  const isXml = activeType === "xml";
  const isEnv = activeType === "env";
  const isCron = activeType === "cron";
  const isSql = activeType === "sql";
  const isCsv = activeType === "csv";
  const isPem =
    activeType === "pem-certificate" ||
    activeType === "pem-private-key";

  return (
    <Panel
      title={
        <span className="flex items-center gap-3">
          Panel{" "}
          <TypeBadge
            type={activeType}
            confidence={panel.overrideType ? 1 : panel.detection.confidence}
          />
          <select
            value={panel.overrideType || ""}
            onChange={(e) => setOverrideType(panel.id, e.target.value || null)}
            className="text-xs bg-black/40 border border-white/10 rounded-md px-2 py-1 text-gray-300 outline-none focus:border-teal-500/50"
          >
            <option value="">Auto-Detect</option>
            {ALL_TYPES.filter(t => t !== "unknown").map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </span>
      }
      subtitle="Local-first inspection. No upload step."
      action={
        <div className="flex items-center gap-2">
          <CopyButton text={panel.input} label="Copy" />
          <Button variant="danger" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4">
        <PasteInput
          value={panel.input}
          onChange={onChange}
          placeholder="Paste developer data here"
        />

        {isUnknown ? (
          <UnknownView input={panel.input} />
        ) : isJwt ? (
          <JwtView input={panel.input} />
        ) : isJson ? (
          <JsonView input={panel.input} />
        ) : isBase64 ? (
          <Base64View input={panel.input} />
        ) : isUrlEncoded ? (
          <UrlEncodedView input={panel.input} />
        ) : isTimestamp ? (
          <TimestampView input={panel.input} />
        ) : isUuid ? (
          <UuidView input={panel.input} />
        ) : isHexColor ? (
          <ColorView input={panel.input} />
        ) : isIp ? (
          <IpView input={panel.input} />
        ) : isRegex ? (
          <RegexView input={panel.input} />
        ) : isYaml ? (
          <YamlView input={panel.input} />
        ) : isXml ? (
          <XmlView input={panel.input} />
        ) : isEnv ? (
          <EnvView input={panel.input} />
        ) : isCron ? (
          <CronView input={panel.input} />
        ) : isSql ? (
          <SqlView input={panel.input} />
        ) : isCsv ? (
          <CsvView input={panel.input} />
        ) : isPem ? (
          <PemView input={panel.input} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Detection metadata
            </div>
            <pre className="mt-3 overflow-x-auto text-[11px] leading-5 text-gray-300">
              {JSON.stringify(panel.detection, null, 2)}
            </pre>
          </div>
        )}

        {footer}
      </div>
    </Panel>
  );
}
