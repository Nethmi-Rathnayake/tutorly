"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Item = { id: string; question: string; answer: string };

/** Accordion for the SEN page FAQ. Items arrive already translated from the server. */
export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-brand-200 overflow-hidden rounded-3xl bg-white ring-1 ring-brand-200">
      {items.map((item) => {
        const isOpen = open === item.id;
        const buttonId = `sen-faq-${item.id}-button`;
        const panelId = `sen-faq-${item.id}-panel`;
        return (
          <div
            key={item.id}
            className={cn(
              "border-s-4 transition-colors duration-200",
              isOpen ? "border-brand-500 bg-brand-50" : "border-transparent bg-white hover:bg-brand-50/60",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex min-h-14 w-full items-center gap-4 px-5 py-5 text-start focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 sm:px-6"
              >
                <span
                  className={cn(
                    "flex-1 text-base font-semibold leading-snug transition-colors sm:text-[17px]",
                    isOpen ? "text-ink" : "text-ink/90 group-hover:text-brand-600",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                    isOpen ? "bg-night text-gold" : "bg-brand-100 text-brand-700 group-hover:bg-brand-200",
                  )}
                >
                  {isOpen ? <Minus aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="max-w-3xl px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
