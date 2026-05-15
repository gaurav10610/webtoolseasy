"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type JwtViewProps = {
  input: string;
};

const claimNotes: Record<string, { label: string; note: string }> = {
  sub: {
    label: "Subject",
    note: "Identifies the principal that the token refers to.",
  },
  iss: { label: "Issuer", note: "The entity that issued the token." },
  aud: { label: "Audience", note: "The intended recipient of the token." },
  exp: {
    label: "Expiration",
    note: "After this time the token should be rejected.",
  },
  iat: { label: "Issued At", note: "When the token was created." },
  nbf: { label: "Not Before", note: "Token is invalid before this time." },
};

function decodePart(part: string): string {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function JwtView({ input }: JwtViewProps) {
  const decoded = useMemo(() => {
    const [headerPart, payloadPart, signaturePart] = input.split(".");

    try {
      const header = JSON.parse(decodePart(headerPart));
      const payload = JSON.parse(decodePart(payloadPart));
      return { header, payload, signaturePart, error: null };
    } catch (error) {
      return {
        header: null,
        payload: null,
        signaturePart,
        error:
          error instanceof Error ? error.message : "Unable to decode token",
      };
    }
  }, [input]);

  if (decoded.error || !decoded.header || !decoded.payload) {
    return (
      <Panel title="JWT" subtitle="Unable to decode token">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {decoded.error ?? "Invalid JWT structure"}
          </p>
          <CopyButton text={input} label="Copy raw JWT" />
        </div>
      </Panel>
    );
  }

  const payloadEntries = Object.entries(
    decoded.payload as Record<string, unknown>,
  );

  return (
    <div className="space-y-4">
      <Panel
        title="JWT Header"
        action={<CopyButton text={JSON.stringify(decoded.header, null, 2)} />}
      >
        <pre className="overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
          {JSON.stringify(decoded.header, null, 2)}
        </pre>
      </Panel>

      <Panel
        title="JWT Payload"
        action={<CopyButton text={JSON.stringify(decoded.payload, null, 2)} />}
      >
        <div className="space-y-3">
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
        </div>
      </Panel>
    </div>
  );
}
