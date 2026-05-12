import { createHmac, timingSafeEqual } from "node:crypto";

export interface RecipeLinkPayload {
  recipeId: string;
  workflowSlug: string;
  version: string;
  issuedAt: number;
  expiresAt: number;
  encrypted: boolean;
}

export const RECIPE_LINK_LIMITS = {
  maxPayloadBytes: 2048,
  maxTokenBytes: 4096,
  maxTtlMs: 1000 * 60 * 60 * 24 * 30,
};

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string): string {
  const padded = input + "=".repeat((4 - (input.length % 4 || 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf8");
}

function signPart(part: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(part)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function _encodeSignedRecipeLink(
  payload: RecipeLinkPayload,
  secret: string,
): { token: string; sizeBytes: number } {
  const json = JSON.stringify(payload);
  const payloadBytes = Buffer.byteLength(json, "utf8");

  if (payloadBytes > RECIPE_LINK_LIMITS.maxPayloadBytes) {
    throw new Error("Recipe link payload exceeds size limit");
  }

  if (payload.expiresAt - payload.issuedAt > RECIPE_LINK_LIMITS.maxTtlMs) {
    throw new Error("Recipe link TTL exceeds maximum allowed limit");
  }

  const encodedPayload = toBase64Url(json);
  const signature = signPart(encodedPayload, secret);
  const token = `${encodedPayload}.${signature}`;

  const sizeBytes = Buffer.byteLength(token, "utf8");
  if (sizeBytes > RECIPE_LINK_LIMITS.maxTokenBytes) {
    throw new Error("Recipe link token exceeds size limit");
  }

  return { token, sizeBytes };
}

export function _decodeAndVerifyRecipeLink(
  token: string,
  secret: string,
  nowMs: number = Date.now(),
): { valid: boolean; payload?: RecipeLinkPayload; reason?: string } {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "Malformed token" };
  }

  const [encodedPayload, signature] = parts;
  const expectedSig = signPart(encodedPayload, secret);

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSig);
  if (
    sigBuf.length !== expectedBuf.length ||
    !timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return { valid: false, reason: "Invalid signature" };
  }

  let payload: RecipeLinkPayload;
  try {
    payload = JSON.parse(fromBase64Url(encodedPayload)) as RecipeLinkPayload;
  } catch {
    return { valid: false, reason: "Invalid payload encoding" };
  }

  if (nowMs > payload.expiresAt) {
    return { valid: false, reason: "Token expired" };
  }

  if (payload.expiresAt - payload.issuedAt > RECIPE_LINK_LIMITS.maxTtlMs) {
    return { valid: false, reason: "TTL policy violation" };
  }

  return { valid: true, payload };
}
