"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";

type ShareLabels = { label: string; native: string; whatsapp: string; copy: string; copied: string };

const button =
  "grid size-9 place-items-center rounded-full bg-white text-muted ring-1 ring-brand-100 transition hover:text-brand-700 hover:ring-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

/** Share controls for an article. The URL is read in the browser, so no site origin needs configuring. */
export function ShareButtons({ title, labels }: { title: string; labels: ShareLabels }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context): nothing to do.
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: location.href });
      } catch {
        // Dismissed by the visitor.
      }
    } else {
      await copy();
    }
  };

  const whatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${location.href}`)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{labels.label}</span>
      <button type="button" onClick={nativeShare} aria-label={labels.native} title={labels.native} className={button}>
        <Share2 aria-hidden className="size-4" />
      </button>
      <button type="button" onClick={whatsapp} aria-label={labels.whatsapp} title={labels.whatsapp} className={button}>
        <MessageCircle aria-hidden className="size-4" />
      </button>
      <button type="button" onClick={copy} aria-label={labels.copy} title={labels.copy} className={button}>
        {copied ? <Check aria-hidden className="size-4 text-emerald-600" /> : <Link2 aria-hidden className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
    </div>
  );
}
