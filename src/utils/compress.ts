import {
  compress as gzipCompress,
  decompress as gzipDecompress,
  strToU8,
  strFromU8,
} from "fflate";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export function compress(value: string): string {
  const input = strToU8(value);
  const output = gzipCompress(input, { level: 9 });
  return toBase64Url(output);
}

export function decompress(value: string): string {
  const input = fromBase64Url(value);
  const output = gzipDecompress(input);
  return strFromU8(output);
}
