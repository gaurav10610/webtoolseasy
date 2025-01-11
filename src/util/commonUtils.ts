import { nanoid } from "nanoid";
import * as _ from "lodash-es";

export function formatDate(date?: Date): string {
  if (_.isNil(date)) {
    return "";
  }

  const padStart = (num: number): string => num.toString().padStart(2, "0");

  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

export function getRandomId(): string {
  return nanoid();
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function encodeText(text: string): string {
  return encodeURIComponent(text);
}

export function decodeText(text: string): string {
  return decodeURIComponent(text);
}

export async function compressStringToBase64(dataToCompress: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToCompress);

  // Compress using gzip
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(data);
  writer.close();

  const compressedData = await new Response(cs.readable).arrayBuffer();

  // Convert to base64 for clipboard-friendly format
  return Buffer.from(compressedData).toString("base64");
}

export async function decompressStringFromBase64(base64String: string) {
  // Convert base64 to ArrayBuffer
  const binaryString = atob(base64String);
  const compressedData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    compressedData[i] = binaryString.charCodeAt(i);
  }

  // Decompress using gzip
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  writer.write(compressedData);
  writer.close();

  const decompressedData = await new Response(ds.readable).arrayBuffer();
  const decoder = new TextDecoder();
  return decoder.decode(decompressedData);
}

/**
 * format size in to higher terms
 * @param bytes
 * @param decimals
 * @returns
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()!;
}
