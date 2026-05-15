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
import { DevLensPanel } from "@/store/useDevLensStore";

type PanelContainerProps = {
  panel: DevLensPanel;
  onChange: (input: string) => void;
  onRemove: () => void;
  footer?: ReactNode;
};

export function PanelContainer({
  panel,
  onChange,
  onRemove,
  footer,
}: PanelContainerProps) {
  const isUnknown = panel.detection.type === "unknown";
  const isJwt = panel.detection.type === "jwt";
  const isJson = panel.detection.type === "json";
  const isBase64 =
    panel.detection.type === "base64" ||
    panel.detection.type === "base64-data-url";
  const isUrlEncoded = panel.detection.type === "url";
  const isTimestamp = panel.detection.type === "timestamp";
  const isUuid = panel.detection.type === "uuid";
  const isHexColor = panel.detection.type === "hex-color";
  const isIp = panel.detection.type === "ip";
  const isRegex = panel.detection.type === "regex";
  const isYaml = panel.detection.type === "yaml";
  const isXml = panel.detection.type === "xml";
  const isEnv = panel.detection.type === "env";
  const isCron = panel.detection.type === "cron";
  const isSql = panel.detection.type === "sql";
  const isCsv = panel.detection.type === "csv";

  return (
    <Panel
      title={
        <span className="flex items-center gap-2">
          Panel{" "}
          <TypeBadge
            type={panel.detection.type}
            confidence={panel.detection.confidence}
          />
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
