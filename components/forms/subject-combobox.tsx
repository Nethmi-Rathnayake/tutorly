"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, Sigma, X } from "lucide-react";
import { subjectCategories } from "@/lib/constants/taxonomy";
import { cn } from "@/lib/utils/cn";

type SubjectComboboxProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
};

/** Searchable, category-grouped subject selector (SRS FR-05 / §12), following the ARIA combobox pattern. */
export function SubjectCombobox({ id, value, onChange, onBlur, invalid }: SubjectComboboxProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subjectCategories
      .map((c) => ({
        ...c,
        subjects: c.subjects.filter((s) => !q || s.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)),
      }))
      .filter((c) => c.subjects.length);
  }, [query]);

  const flat = groups.flatMap((g) => g.subjects);
  const category = subjectCategories.find((c) => c.subjects.includes(value));

  const select = (subject: string) => {
    onChange(subject);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      if (flat[active]) select(flat[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Selected state: show the chosen subject as a chip, like the design.
  if (value && !open) {
    return (
      <div
        className={cn(
          "flex min-h-14 items-center gap-3 rounded-xl bg-lavender px-3 py-2 ring-1",
          invalid ? "ring-rose-300" : "ring-brand-200",
        )}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand-700 to-brand-600 text-white">
          <Sigma aria-hidden className="size-4" />
        </span>
        <button
          type="button"
          id={id}
          onClick={() => {
            setOpen(true);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className="min-w-0 flex-1 text-left"
          aria-label={`Subject: ${value}. Change subject`}
        >
          <span className="block truncate text-sm font-semibold text-ink">{value}</span>
          {category && <span className="block text-[11px] text-muted">{category.name}</span>}
        </button>
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear subject"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-muted hover:text-ink"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    );
  }

  let optionIndex = -1;

  return (
    <div className="relative">
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-600" />
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        aria-activedescendant={open && flat[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        value={query}
        placeholder="Search subjects, e.g. Physics, IB Economics, Coding…"
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Delay so option clicks register before closing.
          setTimeout(() => setOpen(false), 120);
          onBlur?.();
        }}
        onKeyDown={onKeyDown}
        className={cn(
          "h-14 w-full rounded-xl bg-lavender pl-11 pr-10 text-sm text-ink outline-none ring-1 transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300",
          invalid ? "ring-rose-300" : "ring-transparent",
        )}
      />
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Subjects"
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white p-2 shadow-[0_24px_60px_-20px_rgba(44,37,115,0.45)] ring-1 ring-brand-100"
        >
          {groups.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No subjects match “{query}”. Choose <strong>Other (Please specify)</strong> below.
            </p>
          ) : (
            groups.map((g) => (
              <div key={g.id} role="group" aria-label={g.name} className="py-1">
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{g.name}</p>
                {g.subjects.map((s) => {
                  optionIndex += 1;
                  const idx = optionIndex;
                  const selected = s === value;
                  return (
                    <div
                      key={s}
                      id={`${listId}-${idx}`}
                      role="option"
                      aria-selected={selected}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => select(s)}
                      onMouseEnter={() => setActive(idx)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm",
                        idx === active ? "bg-brand-50 text-brand-800" : "text-ink",
                      )}
                    >
                      {s}
                      {selected && <Check aria-hidden className="size-4 text-brand-600" />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
          {groups.length === 0 && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select("Other (Please specify)")}
              className="w-full rounded-lg bg-brand-50 px-3 py-2.5 text-left text-sm font-semibold text-brand-700"
            >
              Other (Please specify)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
