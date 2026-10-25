import { inflateSync } from "node:zlib";
import { PHOTO_MAX_BYTES, PHOTO_MAX_SERVER_PX, PHOTO_MIN_PX } from "@/lib/constants/tutor-registration";
import { IMAGE_EXTENSION, parsePng, sniffImage, type ImageType, type PngDetails } from "@/lib/utils/image-sniff";

/** An uploaded tutor headshot that passed server-side checks. `bytes` are the validated file contents. */
export type ValidatedHeadshot = {
  bytes: Uint8Array;
  type: ImageType;
  extension: string;
  width: number;
  height: number;
};

export type HeadshotResult = { ok: true; photo: ValidatedHeadshot } | { ok: false; message: string };

// Messages stay English here and are translated at display time (see lib/i18n/validation.ts).
export const HEADSHOT_ERRORS = {
  missing: "Upload a professional headshot",
  type: "Upload a JPG, PNG or WebP image",
  tooLarge: "Photo is too large. Please choose a smaller image.",
  tooSmall: `Photo must be at least ${PHOTO_MIN_PX}×${PHOTO_MIN_PX}px`,
} as const;

const CHANNELS: Record<number, number> = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
const BIT_DEPTHS: Record<number, number[]> = { 0: [1, 2, 4, 8, 16], 2: [8, 16], 3: [1, 2, 4, 8], 4: [8, 16], 6: [8, 16] };
// Adam7 passes: [x start, y start, x step, y step]
const ADAM7 = [[0, 0, 8, 8], [4, 0, 8, 8], [0, 4, 4, 8], [2, 0, 4, 4], [0, 2, 2, 4], [1, 0, 2, 2], [0, 1, 1, 2]];

/** Raw (decompressed) size a PNG's pixel data must have, from its header. */
function expectedPngRawBytes(png: PngDetails): number | null {
  const channels = CHANNELS[png.colorType];
  if (!channels || !BIT_DEPTHS[png.colorType]?.includes(png.bitDepth) || png.interlace > 1) return null;
  const rowBytes = (w: number) => Math.ceil((w * channels * png.bitDepth) / 8);
  if (png.interlace === 0) return png.height * (1 + rowBytes(png.width));
  let total = 0;
  for (const [x0, y0, dx, dy] of ADAM7) {
    const w = Math.ceil((png.width - x0) / dx);
    const h = Math.ceil((png.height - y0) / dy);
    if (w > 0 && h > 0) total += h * (1 + rowBytes(w));
  }
  return total;
}

/**
 * PNG: the compressed pixel data must inflate to exactly the size the header implies. This catches
 * corrupt or padded streams without decoding to pixels, and the output size is capped so a
 * decompression bomb cannot exhaust memory.
 */
function pngDataIsConsistent(bytes: Uint8Array): boolean {
  const png = parsePng(bytes);
  if (!png) return false;
  const expected = expectedPngRawBytes(png);
  if (expected === null || expected > 64 * 1024 * 1024) return false;
  try {
    const raw = inflateSync(Buffer.concat(png.idat), { maxOutputLength: expected + 1 });
    return raw.length === expected;
  } catch {
    return false;
  }
}

/**
 * Authoritative check of the uploaded headshot. The client-supplied file name and MIME type are
 * ignored: the type and size come from the bytes themselves. Invalid files are rejected, never
 * "fixed" or passed on.
 */
export async function validateHeadshot(entry: FormDataEntryValue | null): Promise<HeadshotResult> {
  if (!(entry instanceof File) || entry.size === 0) return { ok: false, message: HEADSHOT_ERRORS.missing };
  if (entry.size > PHOTO_MAX_BYTES) return { ok: false, message: HEADSHOT_ERRORS.tooLarge };

  const bytes = new Uint8Array(await entry.arrayBuffer());
  if (bytes.length === 0) return { ok: false, message: HEADSHOT_ERRORS.missing };
  if (bytes.length > PHOTO_MAX_BYTES) return { ok: false, message: HEADSHOT_ERRORS.tooLarge };

  const info = sniffImage(bytes);
  if (!info) return { ok: false, message: HEADSHOT_ERRORS.type };
  if (Math.min(info.width, info.height) < PHOTO_MIN_PX) return { ok: false, message: HEADSHOT_ERRORS.tooSmall };
  if (Math.max(info.width, info.height) > PHOTO_MAX_SERVER_PX) return { ok: false, message: HEADSHOT_ERRORS.tooLarge };
  if (info.type === "image/png" && !pngDataIsConsistent(bytes)) return { ok: false, message: HEADSHOT_ERRORS.type };

  return { ok: true, photo: { bytes, type: info.type, extension: IMAGE_EXTENSION[info.type], width: info.width, height: info.height } };
}
