/**
 * Minimal WebM (EBML/Matroska) muxer for packaging raw VP8/VP9 video
 * frames produced by the WebCodecs VideoEncoder into a playable .webm file.
 *
 * Only video tracks are supported — adding audio is not needed because
 * our video-compressor captures audio via the source <video> element's
 * `captureStream()` or drops it intentionally.
 */

/* ------------------------------------------------------------------ */
/*  Low-level EBML helpers                                            */
/* ------------------------------------------------------------------ */

function concat(...parts: Uint8Array[]): Uint8Array {
  const len = parts.reduce((s, p) => s + p.byteLength, 0);
  const out = new Uint8Array(len);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.byteLength;
  }
  return out;
}

/** Encode a non-negative integer as an EBML variable-size integer (1-4 bytes). */
function vint(value: number): Uint8Array {
  if (value <= 0x7e) return new Uint8Array([0x80 | value]);
  if (value <= 0x3ffe)
    return new Uint8Array([0x40 | (value >> 8), value & 0xff]);
  if (value <= 0x1ffffe)
    return new Uint8Array([
      0x20 | (value >> 16),
      (value >> 8) & 0xff,
      value & 0xff,
    ]);
  if (value <= 0x0ffffffe)
    return new Uint8Array([
      0x10 | ((value >>> 24) & 0xff),
      (value >> 16) & 0xff,
      (value >> 8) & 0xff,
      value & 0xff,
    ]);
  throw new RangeError("EBML vint overflow");
}

function eid(bytes: number[]): Uint8Array {
  return new Uint8Array(bytes);
}

/** Master / container element: ID + size(vint) + children */
function el(id: number[], data: Uint8Array): Uint8Array {
  return concat(eid(id), vint(data.byteLength), data);
}

/** Unsigned integer element (fixed-width big-endian) */
function euint(id: number[], value: number, width: number): Uint8Array {
  const bytes = new Uint8Array(width);
  let v = value;
  for (let i = width - 1; i >= 0; i--) {
    bytes[i] = v & 0xff;
    v = Math.floor(v / 256);
  }
  return el(id, bytes);
}

/** Float64 element */
function efloat64(id: number[], value: number): Uint8Array {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setFloat64(0, value);
  return el(id, new Uint8Array(buf));
}

/** UTF-8 string element */
function estr(id: number[], value: string): Uint8Array {
  return el(id, new TextEncoder().encode(value));
}

/* ------------------------------------------------------------------ */
/*  SimpleBlock builder                                               */
/* ------------------------------------------------------------------ */

function simpleBlock(
  trackNum: number,
  relativeMs: number,
  keyframe: boolean,
  data: Uint8Array,
): Uint8Array {
  const trackVint = new Uint8Array([0x80 | trackNum]); // works for track 1-126
  const tsBuf = new ArrayBuffer(2);
  new DataView(tsBuf).setInt16(
    0,
    Math.max(-32768, Math.min(32767, relativeMs)),
  );
  const flags = new Uint8Array([keyframe ? 0x80 : 0x00]);
  return el([0xa3], concat(trackVint, new Uint8Array(tsBuf), flags, data));
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export interface MuxChunk {
  data: Uint8Array;
  timestampUs: number;
  isKey: boolean;
}

/**
 * Build a playable .webm Blob from a list of raw VP8 or VP9 encoded video
 * chunks (as produced by `VideoEncoder`).
 */
export function buildWebM(params: {
  width: number;
  height: number;
  durationMs: number;
  codecId: string; // "V_VP8" | "V_VP9"
  chunks: MuxChunk[];
}): Blob {
  const { width, height, durationMs, codecId, chunks } = params;

  // ---- EBML Header ----
  const ebmlHeader = el(
    [0x1a, 0x45, 0xdf, 0xa3],
    concat(
      euint([0x42, 0x86], 1, 1), // EBMLVersion
      euint([0x42, 0xf7], 1, 1), // EBMLReadVersion
      euint([0x42, 0xf2], 4, 1), // EBMLMaxIDLength
      euint([0x42, 0xf3], 8, 1), // EBMLMaxSizeLength
      estr([0x42, 0x82], "webm"), // DocType
      euint([0x42, 0x87], 4, 1), // DocTypeVersion
      euint([0x42, 0x85], 2, 1), // DocTypeReadVersion
    ),
  );

  // ---- Segment children ----

  const info = el(
    [0x15, 0x49, 0xa9, 0x66],
    concat(
      euint([0x2a, 0xd7, 0xb1], 1_000_000, 4), // TimestampScale 1 ms
      efloat64([0x44, 0x89], durationMs), // Duration
      estr([0x4d, 0x80], "WebToolsEasy"), // MuxingApp
      estr([0x57, 0x41], "WebToolsEasy"), // WritingApp
    ),
  );

  const isAudio = codecId.startsWith("A_");
  const trackType = isAudio ? 2 : 1; // 1 = video, 2 = audio

  let trackSpecific: Uint8Array;
  if (isAudio) {
    // Audio element (0xE1)
    trackSpecific = el(
      [0xe1],
      concat(
        efloat64([0xb5], 48000), // SamplingFrequency
        euint([0x9f], 2, 1), // Channels
      ),
    );
  } else {
    trackSpecific = el(
      [0xe0],
      concat(
        euint([0xb0], width, 2), // PixelWidth
        euint([0xba], height, 2), // PixelHeight
      ),
    );
  }

  const tracks = el(
    [0x16, 0x54, 0xae, 0x6b],
    el(
      [0xae],
      concat(
        euint([0xd7], 1, 1), // TrackNumber
        euint([0x73, 0xc5], 1, 2), // TrackUID
        euint([0x83], trackType, 1), // TrackType
        estr([0x86], codecId), // CodecID
        trackSpecific,
      ),
    ),
  );

  // ---- Clusters (new cluster on each keyframe) ----
  const clusterParts: Uint8Array[] = [];
  let clusterTs = 0;
  let blocks: Uint8Array[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const ms = Math.round(c.timestampUs / 1000);

    if (c.isKey && blocks.length > 0) {
      clusterParts.push(
        el(
          [0x1f, 0x43, 0xb6, 0x75],
          concat(euint([0xe7], clusterTs, 4), ...blocks),
        ),
      );
      blocks = [];
      clusterTs = ms;
    } else if (i === 0) {
      clusterTs = ms;
    }

    blocks.push(simpleBlock(1, ms - clusterTs, c.isKey, c.data));
  }

  if (blocks.length > 0) {
    clusterParts.push(
      el(
        [0x1f, 0x43, 0xb6, 0x75],
        concat(euint([0xe7], clusterTs, 4), ...blocks),
      ),
    );
  }

  // Segment with "unknown size" (8-byte marker) so we don't need total length
  const segmentId = eid([0x18, 0x53, 0x80, 0x67]);
  const unknownSize = new Uint8Array([
    0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  ]);

  const raw = concat(
    ebmlHeader,
    segmentId,
    unknownSize,
    info,
    tracks,
    ...clusterParts,
  );
  const safeBuf = new ArrayBuffer(raw.byteLength);
  new Uint8Array(safeBuf).set(raw);
  return new Blob([safeBuf], { type: "video/webm" });
}
