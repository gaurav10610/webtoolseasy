"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";
import { SimpleTabs } from "@/components/ui/Tabs";

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
  nbf: {
    label: "Not Before",
    note: "Token is invalid before this time.",
    securityNote: "Reject tokens that are not yet valid.",
  },
  jti: {
    label: "JWT ID",
    note: "Unique identifier for this token.",
    securityNote:
      "Can be used to prevent token replay attacks by maintaining a revocation list.",
  },
  name: { label: "Name", note: "Human-readable subject name." },
  email: {
    label: "Email",
    note: "User email associated with the token.",
    securityNote:
      "Do not use email as sole identity — verify email_verified claim.",
  },
  roles: {
    label: "Roles",
    note: "Authorization roles attached to the subject.",
    securityNote:
      "Validate roles server-side — never trust client-side role claims alone.",
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
  nonce: {
    label: "Nonce",
    note: "Value used to associate a client session with an ID token for OIDC.",
    securityNote:
      "Must be verified to prevent replay attacks in OpenID Connect flows.",
  },
  at_hash: {
    label: "Access Token Hash",
    note: "Hash of the access token (OpenID Connect).",
  },
  c_hash: {
    label: "Code Hash",
    note: "Hash of the authorization code (OpenID Connect).",
  },
  auth_time: {
    label: "Authentication Time",
    note: "Time when the end-user authentication occurred.",
  },
  acr: {
    label: "Authentication Context Class Reference",
    note: "Identifier for the authentication context class that was satisfied.",
  },
  amr: {
    label: "Authentication Methods References",
    note: "JSON array of authentication methods used.",
  },
  typ: {
    label: "Token Type",
    note: "Type of the token (e.g., JWT, at+jwt).",
  },
  email_verified: {
    label: "Email Verified",
    note: "Whether the email address has been verified.",
  },
  preferred_username: {
    label: "Preferred Username",
    note: "Short name by which the user wishes to be referred to.",
  },
  given_name: {
    label: "Given Name",
    note: "First/given name of the user.",
  },
  family_name: {
    label: "Family Name",
    note: "Surname/family name of the user.",
  },
  picture: {
    label: "Picture",
    note: "URL of the user's profile picture.",
  },
  locale: {
    label: "Locale",
    note: "End-user's locale (e.g., en-US).",
  },
  zoneinfo: {
    label: "Timezone",
    note: "End-user's timezone (e.g., America/Los_Angeles).",
  },
  updated_at: {
    label: "Updated At",
    note: "Time the user's information was last updated.",
  },
};

const ALG_INFO: Record<
  string,
  { name: string; type: string; strength: string }
> = {
  HS256: { name: "HMAC SHA-256", type: "Symmetric", strength: "Standard" },
  HS384: { name: "HMAC SHA-384", type: "Symmetric", strength: "Strong" },
  HS512: { name: "HMAC SHA-512", type: "Symmetric", strength: "Strong" },
  RS256: {
    name: "RSA SHA-256",
    type: "Asymmetric (RSA)",
    strength: "Standard",
  },
  RS384: { name: "RSA SHA-384", type: "Asymmetric (RSA)", strength: "Strong" },
  RS512: { name: "RSA SHA-512", type: "Asymmetric (RSA)", strength: "Strong" },
  ES256: {
    name: "ECDSA P-256 SHA-256",
    type: "Asymmetric (EC)",
    strength: "Standard",
  },
  ES384: {
    name: "ECDSA P-384 SHA-384",
    type: "Asymmetric (EC)",
    strength: "Strong",
  },
  ES512: {
    name: "ECDSA P-521 SHA-512",
    type: "Asymmetric (EC)",
    strength: "Very Strong",
  },
  PS256: {
    name: "RSA-PSS SHA-256",
    type: "Asymmetric (RSA-PSS)",
    strength: "Standard",
  },
  PS384: {
    name: "RSA-PSS SHA-384",
    type: "Asymmetric (RSA-PSS)",
    strength: "Strong",
  },
  PS512: {
    name: "RSA-PSS SHA-512",
    type: "Asymmetric (RSA-PSS)",
    strength: "Strong",
  },
  EdDSA: {
    name: "EdDSA (Ed25519/Ed448)",
    type: "Asymmetric (EdDSA)",
    strength: "Very Strong",
  },
  none: { name: "None (Unsigned)", type: "None", strength: "⚠️ Insecure" },
};

function decodePart(part: string): string {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function formatRelativeTime(targetSeconds: number, nowSeconds: number) {
  const delta = targetSeconds - nowSeconds;
  const absolute = Math.abs(delta);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absolute < 60) return rtf.format(delta, "second");
  if (absolute < 3600) return rtf.format(Math.round(delta / 60), "minute");
  if (absolute < 86400) return rtf.format(Math.round(delta / 3600), "hour");
  return rtf.format(Math.round(delta / 86400), "day");
}

export function getExpColor(exp: number, now: number): string {
  const delta = exp - now;
  if (delta < 0) return "text-rose-400";
  if (delta < 300) return "text-amber-400";
  return "text-emerald-400";
}

export function decodeJwt(input: string) {
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
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!decoded.payload) return;

    const interval = window.setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [decoded.payload]);

  if (decoded.error && decoded.error === "Payload is not valid JSON") {
    return (
      <Panel title="JWT" subtitle="Payload decode error">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {decoded.error}
          </p>
          {decoded.rawPayload ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Raw decoded payload bytes
              </div>
              <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100">
                {decoded.rawPayload}
              </pre>
            </div>
          ) : null}
          {decoded.header ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Header (valid)
              </div>
              <pre className="mt-2 overflow-x-auto text-xs leading-6 text-gray-100">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
          ) : null}
          <CopyButton text={input} label="Copy raw JWT" />
        </div>
      </Panel>
    );
  }

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
  const algInfo = ALG_INFO[alg.toUpperCase()];
  const exp = Number(decoded.payload.exp);
  const iat = Number(decoded.payload.iat);
  const hasExp = Number.isFinite(exp);
  const hasIat = Number.isFinite(iat);

  const tabs = ["Overview", "Claims", "Raw"];

  return (
    <div className="space-y-4">
      <SimpleTabs tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />

      {activeTab === 0 ? (
        <div className="grid gap-4 xl:grid-cols-3">
          <Panel
            title="Header"
            subtitle="Unsigned view only"
            action={
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            }
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                <Badge
                  variant={alg.toLowerCase() === "none" ? "error" : "info"}
                >
                  {alg.toUpperCase()}
                </Badge>
                {algInfo ? (
                  <>
                    <Badge variant="neutral">{algInfo.type}</Badge>
                    <Badge
                      variant={
                        algInfo.strength.includes("Insecure")
                          ? "error"
                          : algInfo.strength === "Very Strong"
                            ? "success"
                            : "info"
                      }
                    >
                      {algInfo.strength}
                    </Badge>
                  </>
                ) : null}
                <Badge variant={decoded.signaturePart ? "warning" : "neutral"}>
                  Signature {decoded.signaturePart ? "present" : "missing"}
                </Badge>
                <span className="text-xs text-gray-500">Not verified</span>
              </div>
              {algInfo ? (
                <p className="text-xs leading-5 text-gray-400">
                  {algInfo.name} — {algInfo.type} signing algorithm.
                </p>
              ) : null}
              <pre className="overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
          </Panel>

          <Panel
            title="Payload"
            action={
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            }
          >
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                {hasExp ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Expires
                    </div>
                    <p
                      className={`mt-2 text-sm font-semibold ${getExpColor(exp, now)}`}
                    >
                      {exp < now ? "⚠️ " : ""}
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
            </div>
          </Panel>

          <Panel title="Signature">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Signature segment present:{" "}
                  {decoded.signaturePart ? "yes" : "no"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  No verification performed
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  alg: {alg}
                </span>
              </div>
              {alg.toLowerCase() === "none" ? (
                <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs leading-5 text-rose-200">
                  ⚠️ This token uses the &quot;none&quot; algorithm. The
                  alg:none attack is a well-known JWT vulnerability. Never
                  accept unsigned tokens in production.
                </p>
              ) : null}
            </div>
          </Panel>
        </div>
      ) : null}

      {activeTab === 1 ? (
        <Panel title="Claim Explanations">
          <div className="space-y-3">
            {payloadEntries.map(([key, value]) => {
              const note = claimNotes[key];
              return (
                <details
                  key={key}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {key}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                        {note?.label ?? "Claim"}
                      </div>
                    </div>
                    <CopyButton text={String(value)} label="Copy" />
                  </summary>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-100">
                      <span className="mr-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                        Value
                      </span>
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </div>
                    {(key === "exp" ||
                      key === "iat" ||
                      key === "nbf" ||
                      key === "auth_time" ||
                      key === "updated_at") &&
                    typeof value === "number" ? (
                      <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-100">
                        <span className="mr-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                          Date
                        </span>
                        {new Date(value * 1000).toISOString()} (
                        {formatRelativeTime(value, now)})
                      </div>
                    ) : null}
                    <p className="text-sm leading-6 text-gray-300">
                      {note?.note ??
                        "Standard JWT claim or application-specific field."}
                    </p>
                    {note?.securityNote ? (
                      <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-100">
                        🔒 {note.securityNote}
                      </p>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </Panel>
      ) : null}

      {activeTab === 2 ? (
        <Panel
          title="Raw JWT"
          action={<CopyButton text={input} label="Copy raw JWT" />}
        >
          <pre className="max-h-[420px] overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-100 break-all whitespace-pre-wrap">
            {input}
          </pre>
        </Panel>
      ) : null}
    </div>
  );
}
