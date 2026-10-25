import {
  PHOTO_MAX_EDGE_PX,
  PHOTO_MAX_PICK_BYTES,
  PHOTO_MAX_PX,
  PHOTO_MIN_PX,
  PHOTO_TARGET_BYTES,
} from "@/lib/constants/tutor-registration";
import { sniffImage } from "@/lib/utils/image-sniff";

export type PhotoErrorCode = "type" | "too-large" | "too-small" | "unreadable";

export class PhotoError extends Error {
  constructor(
    readonly code: PhotoErrorCode,
    readonly detail?: { width: number; height: number },
  ) {
    super(code);
  }
}

const toBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

/**
 * Browser-side preparation of a chosen headshot. The file is identified from its bytes (not its name
 * or declared type), checked for minimum size, then resized and re-encoded as a JPEG small enough to
 * travel in a Server Action request. Re-encoding also drops EXIF data such as GPS location.
 */
export async function prepareHeadshot(file: File): Promise<{ file: File; width: number; height: number }> {
  if (file.size > PHOTO_MAX_PICK_BYTES) throw new PhotoError("too-large");
  const original = new Uint8Array(await file.arrayBuffer());
  const info = sniffImage(original);
  if (!info) throw new PhotoError("type");
  if (Math.min(info.width, info.height) < PHOTO_MIN_PX) throw new PhotoError("too-small", info);
  if (Math.max(info.width, info.height) > PHOTO_MAX_PX) throw new PhotoError("too-large");

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(new Blob([original], { type: info.type }), { imageOrientation: "from-image" });
  } catch {
    throw new PhotoError("unreadable");
  }

  try {
    let scale = Math.min(1, PHOTO_MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
    for (let attempt = 0; attempt < 4; attempt++, scale *= 0.8) {
      const width = Math.round(bitmap.width * scale);
      const height = Math.round(bitmap.height * scale);
      if (Math.min(width, height) < PHOTO_MIN_PX) break;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new PhotoError("unreadable");
      ctx.fillStyle = "#ffffff"; // flatten transparency
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(bitmap, 0, 0, width, height);
      for (const quality of [0.9, 0.8, 0.7, 0.6, 0.5]) {
        const blob = await toBlob(canvas, quality);
        if (!blob) throw new PhotoError("unreadable");
        if (blob.size <= PHOTO_TARGET_BYTES) {
          return { file: new File([blob], "headshot.jpg", { type: "image/jpeg" }), width, height };
        }
      }
    }
  } finally {
    bitmap.close();
  }
  throw new PhotoError("too-large");
}
