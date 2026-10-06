"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Option = { value: string; label: string; disabled: boolean };

/** Reads `<option>` children (also inside fragments and arrays) into a plain list. */
function readOptions(children: ReactNode): Option[] {
  const out: Option[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const el = child as ReactElement<{ value?: string | number; disabled?: boolean; children?: ReactNode }>;
    if (el.type === "option") {
      const label = Children.toArray(el.props.children).join("");
      out.push({ value: String(el.props.value ?? label), label, disabled: !!el.props.disabled });
    } else if (el.props.children) {
      out.push(...readOptions(el.props.children));
    }
  });
  return out;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Drop-in replacement for a native `<select>`: same props, same `<option>` children, works with
 * react-hook-form's `register()`. A real (visually hidden) select stays the source of truth, so
 * forms, validation and drafts behave as before; the visible control is an accessible combobox with
 * a smooth, responsive list that flips upward when there is no room below.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, className, id, defaultValue, onBlur, disabled, "aria-label": ariaLabel, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, ...rest },
  ref,
) {
  const options = readOptions(children);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });
  const listId = useId();

  useImperativeHandle(ref, () => nativeRef.current as HTMLSelectElement);

  const [value, setValue] = useState(String(defaultValue ?? ""));
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [active, setActive] = useState(-1);

  // Keep the visible value in sync when the form sets it programmatically (reset, restored draft, ...).
  useLayoutEffect(() => {
    const el = nativeRef.current;
    if (!el) return;
    const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
    if (!descriptor?.get || !descriptor.set) return;
    const { get, set } = descriptor;
    Object.defineProperty(el, "value", {
      configurable: true,
      get: () => get.call(el),
      set: (v: string) => {
        set.call(el, v);
        setValue(get.call(el));
      },
    });
    setValue(get.call(el));
    return () => {
      delete (el as unknown as { value?: string }).value;
    };
  }, []);

  const selected = options.find((o) => o.value === value);
  const isPlaceholder = !selected || selected.value === "";
  const selectable = options.map((o, i) => ({ o, i })).filter(({ o }) => !o.disabled);

  const close = useCallback(() => setOpen(false), []);

  const openList = () => {
    if (disabled) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setDropUp(below < 280 && rect.top > below);
    }
    const current = options.findIndex((o) => o.value === value && !o.disabled);
    setActive(current >= 0 ? current : (selectable[0]?.i ?? -1));
    setOpen(true);
  };

  const choose = (index: number) => {
    const el = nativeRef.current;
    const option = options[index];
    if (!el || !option || option.disabled) return;
    if (el.value !== option.value) {
      el.value = option.value;
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
    close();
    buttonRef.current?.focus();
  };

  const move = (direction: 1 | -1) => {
    if (selectable.length === 0) return;
    const pos = selectable.findIndex(({ i }) => i === active);
    const next = selectable[(pos + direction + selectable.length) % selectable.length];
    setActive(next.i);
  };

  // Close on outside click/tap.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, close]);

  // Keep the highlighted option visible.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else move(e.key === "ArrowDown" ? 1 : -1);
        break;
      case "Home":
      case "End":
        if (open) {
          e.preventDefault();
          const edge = e.key === "Home" ? selectable[0] : selectable[selectable.length - 1];
          if (edge) setActive(edge.i);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openList();
        else choose(active);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          close();
        }
        break;
      case "Tab":
        close();
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          // Type-ahead: jump to the next option starting with the typed letters.
          window.clearTimeout(typeahead.current.timer);
          typeahead.current.text += e.key.toLowerCase();
          typeahead.current.timer = window.setTimeout(() => (typeahead.current.text = ""), 600);
          const hit = selectable.find(({ o }) => o.label.toLowerCase().startsWith(typeahead.current.text));
          if (hit) {
            if (!open) openList();
            setActive(hit.i);
          }
        }
    }
  };

  const activeId = open && active >= 0 ? `${listId}-opt-${active}` : undefined;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (wrapRef.current?.contains(e.relatedTarget as Node)) return;
        close();
        if (nativeRef.current) {
          onBlur?.({ target: nativeRef.current, type: "blur" } as unknown as React.FocusEvent<HTMLSelectElement>);
        }
      }}
    >
      {/* Source of truth for the form. Hidden from view and from assistive tech; the combobox below is the control. */}
      <select
        ref={nativeRef}
        defaultValue={defaultValue}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute size-px overflow-hidden opacity-0"
        {...rest}
      >
        {children}
      </select>

      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className={cn("flex items-center text-start", className)}
      >
        <span className={cn("block min-w-0 flex-1 truncate", isPlaceholder && "text-muted")}>
          {selected?.label ?? ""}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            "absolute start-0 z-50 max-h-64 w-max min-w-full max-w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(20,23,29,0.45)] ring-1 ring-brand-300",
            dropUp ? "bottom-full mb-2 origin-bottom animate-[select-pop-up_0.16s_ease-out]" : "top-full mt-2 origin-top animate-[select-pop_0.16s_ease-out]",
          )}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li
                key={`${o.value}-${i}`}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={o.disabled || undefined}
                data-index={i}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  o.disabled && "cursor-default text-muted/60",
                  !o.disabled && (i === active ? "bg-brand-100 text-ink" : "text-ink"),
                  isSelected && !o.disabled && "font-semibold",
                )}
              >
                <span className="min-w-0 flex-1">{o.label}</span>
                {isSelected && !o.disabled && <Check aria-hidden className="size-4 shrink-0 text-brand-600" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
