/**
 * Compress and decompress architecture state for URL sharing.
 *
 * Flow: JSON → compress (fflate) → base64url encode → ?arch= param
 * URL limit: 8KB compressed payload max.
 */
import { deflateSync, inflateSync } from "fflate";

const MAX_PAYLOAD_BYTES = 8 * 1024; // 8KB max for URL length safety

export type ArchPayload = {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    animated?: boolean;
  }>;
};

/**
 * Serialize and compress architecture data for URL sharing.
 * Returns null if the payload is too large (> 8KB compressed).
 */
export function compressArchitecture(
  payload: ArchPayload,
): { encoded: string } | { error: string } {
  try {
    const json = JSON.stringify(payload);
    const data = new TextEncoder().encode(json);
    const compressed = deflateSync(data, { level: 9 });

    if (compressed.length > MAX_PAYLOAD_BYTES) {
      return {
        error: `Architecture too large for URL sharing (${(compressed.length / 1024).toFixed(1)}KB > ${MAX_PAYLOAD_BYTES / 1024}KB). Remove some nodes/edges or export as PNG/PDF.`,
      };
    }

    // Base64url encode (no padding, URL-safe chars)
    const base64 = btoa(String.fromCharCode(...compressed))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return { encoded: base64 };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to compress architecture",
    };
  }
}

/**
 * Decompress architecture data from a URL parameter.
 */
export function decompressArchitecture(
  encoded: string,
): { payload: ArchPayload } | { error: string } {
  try {
    // Restore standard base64 from base64url
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // Restore padding
    const padLength = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padLength);

    const binary = atob(base64);
    const compressed = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      compressed[i] = binary.charCodeAt(i);
    }

    const decompressed = inflateSync(compressed);
    const json = new TextDecoder().decode(decompressed);
    const payload = JSON.parse(json) as ArchPayload;

    // Basic validation
    if (!Array.isArray(payload.nodes) || !Array.isArray(payload.edges)) {
      return { error: "Invalid architecture data structure" };
    }

    return { payload };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to decompress architecture",
    };
  }
}

/**
 * Build a share URL with the architecture encoded in the ?arch= param.
 */
export function buildShareUrl(
  payload: ArchPayload,
): string | { error: string } {
  const result = compressArchitecture(payload);
  if ("error" in result) return result;

  const url = new URL(window.location.href);
  url.pathname = "/canvas";
  url.search = `?arch=${result.encoded}`;
  url.hash = "";
  return url.toString();
}

/**
 * Extract and decompress architecture from URL search params.
 */
export function parseShareUrl(
  searchParams: URLSearchParams,
): ArchPayload | null {
  const encoded = searchParams.get("arch");
  if (!encoded) return null;

  const result = decompressArchitecture(encoded);
  if ("error" in result) {
    console.warn("Failed to parse shared architecture:", result.error);
    return null;
  }

  return result.payload;
}
