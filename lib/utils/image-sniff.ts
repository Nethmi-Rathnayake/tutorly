import { PHOTO_TYPES } from "@/lib/constants/tutor-registration";

/**
 * Identifies an image from its bytes alone (never from a file name or a declared MIME type), walks
 * its container structure and reads its pixel size. It rejects files that are truncated, carry
 * trailing or inserted junk, have broken chunk lengths or checksums, or use features we never
 * produce (animated WebP, interlaced-free assumptions are not made). It does not decode pixels, so
 * it cannot prove that the compressed image data itself is valid. Works in the browser and on the
 * server; the server adds a PNG data-length check in lib/validations/headshot.ts.
 */

export type ImageType = (typeof PHOTO_TYPES)[number];
export type ImageInfo = { type: ImageType; width: number; height: number };

const ascii = (b: Uint8Array, at: number, text: string) =>
  text.length + at <= b.length && [...text].every((c, i) => b[at + i] === c.charCodeAt(0));
const le16 = (b: Uint8Array, at: number) => b[at] | (b[at + 1] << 8);
const le24 = (b: Uint8Array, at: number) => b[at] | (b[at + 1] << 8) | (b[at + 2] << 16);
const le32 = (b: Uint8Array, at: number) => (b[at] | (b[at + 1] << 8) | (b[at + 2] << 16) | (b[at + 3] << 24)) >>> 0;
const be16 = (b: Uint8Array, at: number) => (b[at] << 8) | b[at + 1];
const be32 = (b: Uint8Array, at: number) => ((b[at] << 24) | (b[at + 1] << 16) | (b[at + 2] << 8) | b[at + 3]) >>> 0;

// ---------------------------------------------------------------- JPEG
/**
 * Walks every marker segment up to the end-of-image marker. Entropy-coded data may only contain
 * stuffed bytes (FF00), restart markers and the few markers that can legally follow a scan.
 */
function sniffJpeg(b: Uint8Array): ImageInfo | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8 || b[2] !== 0xff) return null;
  let end = b.length;
  while (end > 2 && b[end - 1] === 0) end--; // some encoders pad with zeros
  if (b[end - 2] !== 0xff || b[end - 1] !== 0xd9) return null; // must finish with EOI

  let width = 0;
  let height = 0;
  let scans = 0;
  let i = 2;
  while (i < end) {
    if (b[i] !== 0xff) return null;
    while (b[i + 1] === 0xff && i + 1 < end) i++; // fill bytes
    const marker = b[i + 1];
    i += 2;
    if (marker === 0xd9) return i === end && scans > 0 && width && height ? { type: "image/jpeg", width, height } : null; // EOI must be last
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x00) return null; // not valid here
    if (i + 2 > end) return null;
    const length = be16(b, i);
    if (length < 2 || i + length > end) return null;
    const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrame) {
      if (length < 8 || width) return null; // one frame header only
      height = be16(b, i + 3);
      width = be16(b, i + 5);
      if (!width || !height) return null;
    }
    i += length;
    if (marker === 0xda) {
      if (!width) return null; // a scan before the frame header
      scans++;
      // Entropy-coded data: skip to the next real marker.
      while (i < end) {
        if (b[i] !== 0xff) {
          i++;
          continue;
        }
        const next = b[i + 1];
        if (next === 0x00 || (next >= 0xd0 && next <= 0xd7)) i += 2; // stuffed byte / restart marker
        else if (next === 0xff) i++; // fill byte
        else break; // a real marker follows
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------- PNG
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

let crcTable: Uint32Array | undefined;
function crc32(b: Uint8Array, from: number, to: number): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (let i = from; i < to; i++) c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export type PngDetails = ImageInfo & { bitDepth: number; colorType: number; interlace: number; idat: Uint8Array[] };

/** Walks every chunk, verifying lengths and CRCs, chunk order (IHDR first, IDAT run, IEND last) and no trailing data. */
export function parsePng(b: Uint8Array): PngDetails | null {
  if (b.length < 45 || !PNG_SIGNATURE.every((v, i) => b[i] === v)) return null;
  let i = 8;
  let first = true;
  let seenIdat = false;
  let idatEnded = false;
  let info: PngDetails | null = null;
  const idat: Uint8Array[] = [];
  while (i + 12 <= b.length) {
    const length = be32(b, i);
    const typeAt = i + 4;
    const dataAt = i + 8;
    if (length > b.length - dataAt - 4) return null;
    if (be32(b, dataAt + length) !== crc32(b, typeAt, dataAt + length)) return null; // chunk checksum
    const type = String.fromCharCode(b[typeAt], b[typeAt + 1], b[typeAt + 2], b[typeAt + 3]);
    if (first) {
      if (type !== "IHDR" || length !== 13) return null;
      const width = be32(b, dataAt);
      const height = be32(b, dataAt + 4);
      if (!width || !height) return null;
      info = { type: "image/png", width, height, bitDepth: b[dataAt + 8], colorType: b[dataAt + 9], interlace: b[dataAt + 12], idat };
      first = false;
    } else if (type === "IHDR") {
      return null;
    } else if (type === "IDAT") {
      if (idatEnded) return null; // IDAT chunks must be consecutive
      seenIdat = true;
      idat.push(b.subarray(dataAt, dataAt + length));
    } else {
      if (seenIdat) idatEnded = true;
      if (type === "IEND") return length === 0 && seenIdat && dataAt + 4 === b.length ? info : null; // nothing after IEND
      if (type === "PLTE" && seenIdat) return null;
    }
    i = dataAt + length + 4;
  }
  return null;
}

// ---------------------------------------------------------------- WebP
/** Walks the RIFF chunks; the sizes must add up to the file exactly and exactly one still-image chunk must exist. */
function sniffWebp(b: Uint8Array): ImageInfo | null {
  if (b.length < 30 || !ascii(b, 0, "RIFF") || !ascii(b, 8, "WEBP")) return null;
  if (le32(b, 4) + 8 !== b.length) return null; // RIFF size must match the file exactly
  let width = 0;
  let height = 0;
  let imageChunks = 0;
  let i = 12;
  while (i + 8 <= b.length) {
    const size = le32(b, i + 4);
    const dataAt = i + 8;
    const next = dataAt + size + (size & 1); // chunks are padded to an even length
    if (next > b.length || dataAt + size > b.length) return null;
    if (ascii(b, i, "VP8 ")) {
      if (size < 10 || b[dataAt + 3] !== 0x9d || b[dataAt + 4] !== 0x01 || b[dataAt + 5] !== 0x2a) return null;
      width = le16(b, dataAt + 6) & 0x3fff;
      height = le16(b, dataAt + 8) & 0x3fff;
      imageChunks++;
    } else if (ascii(b, i, "VP8L")) {
      if (size < 5 || b[dataAt] !== 0x2f) return null;
      width = 1 + (b[dataAt + 1] | ((b[dataAt + 2] & 0x3f) << 8));
      height = 1 + ((b[dataAt + 2] >> 6) | (b[dataAt + 3] << 2) | ((b[dataAt + 4] & 0x0f) << 10));
      imageChunks++;
    } else if (ascii(b, i, "VP8X")) {
      if (i !== 12 || size < 10) return null; // must be the first chunk
      if (b[dataAt] & 0x02) return null; // animated images are not accepted
      width = 1 + le24(b, dataAt + 4);
      height = 1 + le24(b, dataAt + 7);
    } else if (ascii(b, i, "ANMF") || ascii(b, i, "ANIM")) {
      return null;
    }
    i = next;
  }
  if (i !== b.length || imageChunks !== 1 || !width || !height) return null;
  return { type: "image/webp", width, height };
}

export function sniffImage(bytes: Uint8Array): ImageInfo | null {
  const png = parsePng(bytes);
  if (png) return { type: png.type, width: png.width, height: png.height };
  return sniffJpeg(bytes) ?? sniffWebp(bytes);
}

export const IMAGE_EXTENSION: Record<ImageType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
