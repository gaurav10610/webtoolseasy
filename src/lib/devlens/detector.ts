export type DetectedType =
  | "jwt"
  | "json"
  | "base64-data-url"
  | "base64"
  | "url"
  | "timestamp"
  | "uuid"
  | "ip"
  | "hex-color"
  | "regex"
  | "yaml"
  | "xml"
  | "csv"
  | "env"
  | "cron"
  | "sql"
  | "pem-certificate"
  | "pem-private-key"
  | "unknown";

export type DetectionResult = {
  type: DetectedType;
  confidence: "high" | "medium" | "low";
  meta?: Record<string, unknown>;
};

const JWT_PATTERN = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const IPV4_PATTERN =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}(\/\d{1,2})?$/;
const IPV6_PATTERN = /^[0-9a-f:.]+(%[0-9a-z]+)?(\/\d{1,3})?$/i;
const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const BASE64_DATA_URL_PATTERN = /^data:[^;]+;base64,/i;
const PEM_CERT_PATTERN = /-----BEGIN CERTIFICATE-----/;
const PEM_PRIVATE_KEY_PATTERN =
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;

function base64Decode(input: string): string | null {
  try {
    const normalized = input.replace(/\s+/g, "");
    const decoded = atob(normalized);
    return decoded;
  } catch {
    return null;
  }
}

function isLikelyJson(input: string): boolean {
  const trimmed = input.trim();
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

function isLikelyBase64(input: string): boolean {
  const trimmed = input.trim().replace(/\s+/g, "");
  if (trimmed.length < 16 || trimmed.length % 4 !== 0) return false;
  if (!/^[A-Za-z0-9+/=]+$/.test(trimmed)) return false;
  const decoded = base64Decode(trimmed);
  return decoded !== null && decoded.length > 0;
}

function isLikelyUrlEncoded(input: string): boolean {
  const matches = input.match(/%[0-9A-Fa-f]{2}/g) ?? [];
  return matches.length >= 2;
}

function isLikelyTimestamp(input: string): boolean {
  return /^(\d{10}|\d{13}|\d{16})$/.test(input.trim());
}

function isLikelyCron(input: string): boolean {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 5 && parts.length !== 6) return false;
  return parts.every((part) => part === "*" || /^[\d\-*/,?LW#]+$/.test(part));
}

function isLikelySql(input: string): boolean {
  return /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i.test(
    input.trim(),
  );
}

function isLikelyXml(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.startsWith("<?xml") || /^<[A-Za-z_][\w:.-]*/.test(trimmed);
}

function isLikelyYaml(input: string): boolean {
  const lines = input.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return false;
  return lines.some((line) => /^\s*[^#\s][^:]*:\s*.*$/.test(line));
}

function isLikelyCsv(input: string): boolean {
  const lines = input.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2 || lines.length > 200) return false;
  const delimiters = [",", "\t", ";", "|"];
  return delimiters.some((delimiter) => {
    const counts = lines
      .slice(0, 5)
      .map((line) => line.split(delimiter).length);
    return counts.every((count) => count === counts[0]) && counts[0] >= 2;
  });
}

function isLikelyEnv(input: string): boolean {
  const lines = input.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return false;
  return lines.every(
    (line) =>
      /^\s*(?:export\s+)?[A-Z0-9_]+\s*=/.test(line) || /^\s*#/.test(line),
  );
}

function detectJwtMeta(input: string): Record<string, unknown> | undefined {
  const [headerPart, payloadPart] = input.split(".");
  const header = base64Decode(headerPart);
  const payload = base64Decode(payloadPart);
  return {
    headerLength: header?.length ?? 0,
    payloadLength: payload?.length ?? 0,
  };
}

export function detect(input: string): DetectionResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { type: "unknown", confidence: "low" };
  }

  if (JWT_PATTERN.test(trimmed)) {
    return { type: "jwt", confidence: "high", meta: detectJwtMeta(trimmed) };
  }

  if (BASE64_DATA_URL_PATTERN.test(trimmed)) {
    return { type: "base64-data-url", confidence: "high" };
  }

  if (isLikelyJson(trimmed)) {
    return { type: "json", confidence: "high" };
  }

  if (PEM_CERT_PATTERN.test(trimmed)) {
    return { type: "pem-certificate", confidence: "high" };
  }

  if (PEM_PRIVATE_KEY_PATTERN.test(trimmed)) {
    return { type: "pem-private-key", confidence: "high" };
  }

  if (HEX_COLOR_PATTERN.test(trimmed)) {
    return { type: "hex-color", confidence: "high" };
  }

  if (UUID_PATTERN.test(trimmed)) {
    return { type: "uuid", confidence: "high", meta: { version: trimmed[14] } };
  }

  if (isLikelyTimestamp(trimmed)) {
    return {
      type: "timestamp",
      confidence: "high",
      meta: {
        unit:
          trimmed.length === 13
            ? "milliseconds"
            : trimmed.length === 16
              ? "microseconds"
              : "seconds",
      },
    };
  }

  if (
    IPV4_PATTERN.test(trimmed) ||
    (trimmed.includes(":") && IPV6_PATTERN.test(trimmed))
  ) {
    return { type: "ip", confidence: "high" };
  }

  if (isLikelyCron(trimmed)) {
    return { type: "cron", confidence: "high" };
  }

  if (isLikelySql(trimmed)) {
    return { type: "sql", confidence: "high" };
  }

  if (isLikelyCsv(trimmed)) {
    return { type: "csv", confidence: "medium" };
  }

  if (isLikelyEnv(trimmed)) {
    return { type: "env", confidence: "medium" };
  }

  if (isLikelyXml(trimmed)) {
    return { type: "xml", confidence: "medium" };
  }

  if (isLikelyYaml(trimmed)) {
    return { type: "yaml", confidence: "medium" };
  }

  if (isLikelyUrlEncoded(trimmed)) {
    return { type: "url", confidence: "medium" };
  }

  if (trimmed.startsWith("/") && /\/[a-z]*$/.test(trimmed)) {
    return { type: "regex", confidence: "medium" };
  }

  if (isLikelyBase64(trimmed)) {
    return { type: "base64", confidence: "medium" };
  }

  return { type: "unknown", confidence: "low" };
}
