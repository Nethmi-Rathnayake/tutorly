import type { Tutor } from "@/types/tutor";

export function formatRate(rate: Tutor["rate"]) {
  const symbol = { USD: "$", GBP: "£", AED: "AED " }[rate.currency];
  return `${symbol}${rate.amount}`;
}

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
