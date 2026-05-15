"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type JwtViewProps = {
  input: string;
};

const claimNotes: Record<
  string,
  { label: string; note: string; securityNote?: string }
> = {
  sub: {
    label: "Subject",
    note: "Identifies the principal that the token refers to.",
  },
  iss: {
    label: "Issuer",
    note: "The entity that issued the token.",
    securityNote: "Should match the expected identity provider.",
  },
  aud: {
    label: "Audience",
    note: "The intended recipient of the token.",
    securityNote: "Verify the token was minted for this application.",
  },
  exp: {
    label: "Expiration",
    note: "After this time the token should be rejected.",
    securityNote: "Expired tokens should never be accepted by the backend.",
  },
  iat: { label: "Issued At", note: "When the token was created." },
  nbf: { label: "Not Before", note: "Token is invalid before this time." },
  jti: { label: "JWT ID", note: "Unique identifier for this token." },
  name: { label: "Name", note: "Human-readable subject name." },
  email: { label: "Email", note: "User email associated with the token." },
  roles: {
    label: "Roles",
    note: "Authorization roles attached to the subject.",
  },
  scope: {
    label: "Scope",
    note: "Permissions or access scope granted to the token.",
  },
  azp: {
    label: "Authorized Party",
    note: "The client the token was issued to.",
  },
  sid: {
    label: "Session ID",
    note: "Session identifier used for logout or revocation.",
  },
};

function decodePart(part: string): string {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

function formatRelativeTime(targetSeconds: number, nowSeconds: number) {
  const delta = targetSeconds - nowSeconds;
  const absolute = Math.abs(delta);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absolute < 60) return rtf.format(delta, "second");
  if (absolute < 3600) return rtf.format(Math.round(delta / 60), "minute");
  if (absolute < 86400) return rtf.format(Math.round(delta / 3600), "hour");
  return rtf.format(Math.round(delta / 86400), "day");
}

function decodeJwt(input: string) {
  const parts = input.trim().split(".");

  if (parts.length !== 3 || parts.some((part) => !part)) {
    return {
      error: "Invalid JWT structure",
      header: null as Record<string, unknown> | null,
      payload: null as Record<string, unknown> | null,
      rawHeader: "",
      rawPayload: "",
      signaturePart: "",
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const rawHeader = decodePart(headerPart);
    const rawPayload = decodePart(payloadPart);
    const header = JSON.parse(rawHeader) as Record<string, unknown>;

    try {
      const payload = JSON.parse(rawPayload) as Record<string, unknown>;
      return {
        error: null as string | null,
        header,
        payload,
        rawHeader,
        rawPayload,
        signaturePart,
      };
    } catch {
      return {
        error: "Payload is not valid JSON",
        header,
        payload: null as Record<string, unknown> | null,
        rawHeader,
        rawPayload,
        signaturePart,
      };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to decode token",
      header: null as Record<string, unknown> | null,
      payload: null as Record<string, unknown> | null,
      rawHeader: "",
      rawPayload: "",
      signaturePart,
    };
  }
}

export function JwtView({ input }: JwtViewProps) {
  const decoded = useMemo(() => decodeJwt(input), [input]);
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    if (!decoded.payload) return;

    const interval = window.setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [decoded.payload]);

  if (decoded.error || !decoded.header || !decoded.payload) {
    return (
      <Panel title="JWT" subtitle="Unable to decode token">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {decoded.error ?? "Invalid JWT structure"}
          </p>
          {decoded.rawHeader || decoded.rawPayload ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Header bytes
                </div>
                <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100">
                  {decoded.rawHeader || "Unable to decode header bytes"}
                </pre>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Payload bytes
                </div>
                <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100">
                  {decoded.rawPayload || "Unable to decode payload bytes"}
                </pre>
              </div>
            </div>
          ) : null}
          <CopyButton text={input} label="Copy raw JWT" />
        </div>
      </Panel>
    );
  }

  const payloadEntries = Object.entries(
    decoded.payload as Record<string, unknown>,
  );
  const alg = String(decoded.header.alg ?? "unknown");
  const exp = Number(decoded.payload.exp);
  const iat = Number(decoded.payload.iat);
  const hasExp = Number.isFinite(exp);
  const hasIat = Number.isFinite(iat);

  return (
    <div className="space-y-4">
      <Panel
        title="JWT Header"
        subtitle="Unsigned view only"
        action={<CopyButton text={JSON.stringify(decoded.header, null, 2)} />}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
            <Badge variant="info">ALG {alg.toUpperCase()}</Badge>
            <Badge variant={decoded.signaturePart ? "warning" : "neutral"}>
              Signature {decoded.signaturePart ? "present" : "missing"}
            </Badge>
            <span className="text-xs text-gray-500">Not verified</span>
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
            {JSON.stringify(decoded.header, null, 2)}
          </pre>
        </div>
      </Panel>

      <Panel
        title="JWT Payload"
        action={<CopyButton text={JSON.stringify(decoded.payload, null, 2)} />}
      >
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {hasExp ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Expires
                </div>
                <p className="mt-2 text-sm text-white">
                  {formatRelativeTime(exp, now)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(exp * 1000).toISOString()}
                </p>
              </div>
            ) : null}
            {hasIat ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Issued
                </div>
                <p className="mt-2 text-sm text-white">
                  {formatRelativeTime(iat, now)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(iat * 1000).toISOString()}
                </p>
              </div>
            ) : null}
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
            {JSON.stringify(decoded.payload, null, 2)}
          </pre>
          <div className="grid gap-3 md:grid-cols-2">
            {payloadEntries.map(([key, value]) => {
              const note = claimNotes[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">
                      {key}
                    </div>
                    <CopyButton text={String(value)} label="Copy" />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                    {note?.label ?? "Claim"}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {note?.note ??
                      "Standard JWT claim or application-specific field."}
                  </p>
                  {note?.securityNote ? (
                    <p className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-100">
                      {note.securityNote}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      <Panel title="Signature">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Signature segment present: {decoded.signaturePart ? "yes" : "no"}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            No verification performed
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            alg: {alg}
          </span>
        </div>
      </Panel>
    </div>
  );
}
