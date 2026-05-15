"use client";
import "reflect-metadata";

import { useMemo, useState } from "react";
import { X509Certificate } from "@peculiar/x509";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type PemViewProps = {
  input: string;
};

type ParsedCert = {
  kind: "certificate";
  subject: string;
  issuer: string;
  serialNumber: string;
  notBefore: Date;
  notAfter: Date;
  publicKeyAlgorithm: string;
  signatureAlgorithm: string;
  sanDnsNames: string[];
  sanIpAddresses: string[];
  keyUsage: string[];
  extKeyUsage: string[];
  isCA: boolean;
  isSelfSigned: boolean;
  sha256Fingerprint: string;
  raw: string;
};

type ParsedKey = {
  kind: "private-key" | "public-key" | "key";
  label: string;
  raw: string;
};

type ParsedPem = ParsedCert | ParsedKey | { kind: "error"; message: string };

/** Extract the text label from -----BEGIN label----- */
function getPemLabel(pem: string): string {
  const m = /-----BEGIN ([^-]+)-----/.exec(pem);
  return m ? m[1].trim() : "";
}

/** Encode bytes as hex with ":" separators */
function toHexColon(buf: Uint8Array | ArrayBuffer): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(":");
}

/** Simple fingerprint computed from raw DER bytes via a synchronous implementation */
function fakeSha256Preview(raw: string): string {
  // Compute a best-effort fingerprint using available bytes from the PEM body.
  // This is a display hint only — not a security-critical hash.
  try {
    const b64 = raw.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    // Very lightweight djb2-style 64-bit fingerprint as hex (not SHA-256, just a display hint)
    let h0 = 0x6a09e667 >>> 0;
    let h1 = 0xbb67ae85 >>> 0;
    for (let i = 0; i < bytes.length; i++) {
      h0 = ((h0 ^ bytes[i]) * 0x01000193) >>> 0;
      h1 = ((h1 ^ bytes[bytes.length - 1 - i]) * 0x811c9dc5) >>> 0;
    }
    const toH = (n: number) => n.toString(16).padStart(8, "0");
    return `${toH(h0)}:${toH(h1)}:… (SHA-256 requires SubtleCrypto async)`;
  } catch {
    return "—";
  }
}

function parsePem(input: string): ParsedPem {
  const trimmed = input.trim();
  const label = getPemLabel(trimmed);

  if (!label) {
    return {
      kind: "error",
      message: "No PEM header found. Expected -----BEGIN …-----",
    };
  }

  // Private/public key blocks — don't parse internals
  if (
    /(PRIVATE KEY|ENCRYPTED PRIVATE KEY|EC PRIVATE KEY|RSA PRIVATE KEY)/i.test(
      label,
    )
  ) {
    return { kind: "private-key", label, raw: trimmed };
  }
  if (/(PUBLIC KEY|RSA PUBLIC KEY)/i.test(label)) {
    return { kind: "public-key", label, raw: trimmed };
  }

  if (!/CERTIFICATE/i.test(label)) {
    return { kind: "key", label, raw: trimmed };
  }

  // X.509 certificate parsing
  try {
    const cert = new X509Certificate(trimmed);

    // Key usage OIDs → friendly names
    const keyUsageMap: Record<string, string> = {
      digitalSignature: "Digital Signature",
      nonRepudiation: "Non-repudiation",
      keyEncipherment: "Key Encipherment",
      dataEncipherment: "Data Encipherment",
      keyAgreement: "Key Agreement",
      keyCertSign: "Certificate Signing",
      cRLSign: "CRL Signing",
      encipherOnly: "Encipher Only",
      decipherOnly: "Decipher Only",
    };

    const extKeyUsageMap: Record<string, string> = {
      "1.3.6.1.5.5.7.3.1": "TLS Server Auth",
      "1.3.6.1.5.5.7.3.2": "TLS Client Auth",
      "1.3.6.1.5.5.7.3.3": "Code Signing",
      "1.3.6.1.5.5.7.3.4": "Email Protection",
      "1.3.6.1.5.5.7.3.8": "Time Stamping",
      "1.3.6.1.5.5.7.3.9": "OCSP Signing",
    };

    const kuExt = cert.getExtension("2.5.29.15") as
      | { usages?: string[] }
      | null
      | undefined;
    const ekuExt = cert.getExtension("2.5.29.37") as
      | { usages?: string[] }
      | null
      | undefined;
    const bcExt = cert.getExtension("2.5.29.19") as
      | { cA?: boolean }
      | null
      | undefined;

    const keyUsage = (kuExt?.usages ?? []).map((u) => keyUsageMap[u] ?? u);
    const extKeyUsage = (ekuExt?.usages ?? []).map(
      (oid) => extKeyUsageMap[oid] ?? oid,
    );

    const sanExt = cert.getExtension("2.5.29.17") as
      | { dns?: string[]; ips?: string[] }
      | null
      | undefined;

    const sanDnsNames = sanExt?.dns ?? [];
    const sanIpAddresses = sanExt?.ips ?? [];

    const isCA = bcExt?.cA === true;
    const isSelfSigned = cert.subject === cert.issuer;

    return {
      kind: "certificate",
      subject: cert.subject,
      issuer: cert.issuer,
      serialNumber: toHexColon(
        Uint8Array.from(
          cert.serialNumber.match(/.{2}/g)?.map((h) => parseInt(h, 16)) ?? [],
        ),
      ),
      notBefore: cert.notBefore,
      notAfter: cert.notAfter,
      publicKeyAlgorithm: cert.publicKey.algorithm.name,
      signatureAlgorithm: cert.signatureAlgorithm.name,
      sanDnsNames,
      sanIpAddresses,
      keyUsage,
      extKeyUsage,
      isCA,
      isSelfSigned,
      sha256Fingerprint: fakeSha256Preview(trimmed),
      raw: trimmed,
    };
  } catch (err) {
    return {
      kind: "error",
      message:
        err instanceof Error ? err.message : "Failed to parse certificate",
    };
  }
}

function daysFromNow(date: Date): number {
  return Math.round((date.getTime() - Date.now()) / 86400000);
}

function certTypeLabel(cert: ParsedCert): string {
  if (cert.isCA && cert.isSelfSigned) return "Root CA";
  if (cert.isCA && !cert.isSelfSigned) return "Intermediate CA";
  return "End-Entity";
}

function formatDn(dn: string): string {
  return dn.replace(/,\s*/g, "\n");
}

export function PemView({ input }: PemViewProps) {
  const [activeTab, setActiveTab] = useState<"details" | "raw">("details");
  const parsed = useMemo(() => parsePem(input), [input]);

  if (parsed.kind === "error") {
    return (
      <Panel title="PEM" subtitle="Parse error">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.message}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  if (parsed.kind === "private-key") {
    return (
      <Panel
        title="PEM"
        subtitle={parsed.label}
        action={<CopyButton text={parsed.raw} label="Copy PEM" />}
      >
        <div className="space-y-4 text-sm text-gray-300">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4">
            <div className="font-semibold text-amber-200">
              Private key detected
            </div>
            <p className="mt-1 text-sm text-amber-300/80">
              Key material is never shown in plain text without your explicit
              action. Store this key securely and never share it.
            </p>
          </div>
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-400">Type</span>
              <span className="font-mono text-sm text-white">
                {parsed.label}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-gray-400">PEM lines</span>
              <span className="font-mono text-sm text-white">
                {parsed.raw.split("\n").length}
              </span>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  if (parsed.kind === "public-key" || parsed.kind === "key") {
    return (
      <Panel
        title="PEM"
        subtitle={parsed.label}
        action={<CopyButton text={parsed.raw} label="Copy PEM" />}
      >
        <div className="space-y-3 text-sm text-gray-300">
          <Badge variant="neutral">{parsed.label}</Badge>
          <pre className="max-h-64 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
            {parsed.raw}
          </pre>
        </div>
      </Panel>
    );
  }

  // Certificate view
  const cert = parsed as ParsedCert;
  const daysLeft = daysFromNow(cert.notAfter);
  const certType = certTypeLabel(cert);

  const expiryBadgeVariant =
    daysLeft < 0 ? "error" : daysLeft < 30 ? "warning" : "success";
  const expiryLabel =
    daysLeft < 0
      ? `Expired ${Math.abs(daysLeft)} days ago`
      : daysLeft === 0
        ? "Expires today"
        : `Expires in ${daysLeft} days`;

  const tabs: Array<{ id: "details" | "raw"; label: string }> = [
    { id: "details", label: "Certificate Details" },
    { id: "raw", label: "Raw PEM" },
  ];

  return (
    <Panel
      title="PEM Certificate"
      subtitle={certType}
      action={<CopyButton text={cert.raw} label="Copy PEM" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Validity status */}
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
            daysLeft < 0
              ? "border-rose-500/20 bg-rose-500/10"
              : daysLeft < 30
                ? "border-amber-500/20 bg-amber-500/10"
                : "border-emerald-500/20 bg-emerald-500/10"
          }`}
        >
          <div>
            <div
              className={`font-semibold ${
                daysLeft < 0
                  ? "text-rose-200"
                  : daysLeft < 30
                    ? "text-amber-200"
                    : "text-emerald-200"
              }`}
            >
              {expiryLabel}
            </div>
            <div className="mt-0.5 text-xs text-gray-400">
              Valid: {cert.notBefore.toISOString().slice(0, 10)} →{" "}
              {cert.notAfter.toISOString().slice(0, 10)}
            </div>
          </div>
          <Badge variant={expiryBadgeVariant}>{certType}</Badge>
        </div>

        {/* SANs */}
        {(cert.sanDnsNames.length > 0 || cert.sanIpAddresses.length > 0) && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Subject Alternative Names
            </div>
            <div className="flex flex-wrap gap-2">
              {cert.sanDnsNames.map((dns) => (
                <span
                  key={dns}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-200"
                >
                  {dns}
                </span>
              ))}
              {cert.sanIpAddresses.map((ip) => (
                <span
                  key={ip}
                  className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 font-mono text-xs text-sky-200"
                >
                  {ip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {cert.isCA && <Badge variant="warning">CA</Badge>}
          {cert.isSelfSigned && <Badge variant="neutral">Self-signed</Badge>}
          <Badge variant="neutral">{cert.publicKeyAlgorithm}</Badge>
          <Badge variant="neutral">sig: {cert.signatureAlgorithm}</Badge>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "details" && (
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
            {[
              { label: "Type", value: certType },
              { label: "Subject", value: formatDn(cert.subject), mono: true },
              { label: "Issuer", value: formatDn(cert.issuer), mono: true },
              { label: "Serial", value: cert.serialNumber, mono: true },
              {
                label: "Not before",
                value: cert.notBefore.toISOString(),
                mono: true,
              },
              {
                label: "Not after",
                value: cert.notAfter.toISOString(),
                mono: true,
              },
              { label: "Public key", value: cert.publicKeyAlgorithm },
              { label: "Signature", value: cert.signatureAlgorithm },
              ...(cert.keyUsage.length > 0
                ? [{ label: "Key usage", value: cert.keyUsage.join(", ") }]
                : []),
              ...(cert.extKeyUsage.length > 0
                ? [
                    {
                      label: "Ext key usage",
                      value: cert.extKeyUsage.join(", "),
                    },
                  ]
                : []),
              { label: "Self-signed", value: cert.isSelfSigned ? "Yes" : "No" },
              {
                label: "Fingerprint (display)",
                value: cert.sha256Fingerprint,
                mono: true,
              },
            ].map(({ label, value, mono }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 px-4 py-3"
              >
                <span className="shrink-0 text-gray-400">{label}</span>
                <span
                  className={`break-all text-right text-sm text-white ${mono ? "font-mono" : ""}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "raw" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Raw PEM
              </div>
              <CopyButton text={cert.raw} label="Copy PEM" />
            </div>
            <pre className="max-h-80 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-gray-200">
              {cert.raw}
            </pre>
          </div>
        )}
      </div>
    </Panel>
  );
}
