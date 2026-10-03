"use client";

import { useId, useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { subscribeToInsights } from "@/app/[lang]/blog/actions";
import { newsletter } from "@/lib/constants/blog";
import { blog as blogDictionary } from "@/lib/i18n/ar/blog";
import { useT } from "@/lib/i18n/client";
import { translateError } from "@/lib/i18n/validation";
import { newsletterSchema } from "@/lib/validations/newsletter";

export function NewsletterForm() {
  const t = useT(blogDictionary);
  const copy = t.deep(newsletter);
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [subscribed, setSubscribed] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    startTransition(async () => {
      const result = await subscribeToInsights(parsed.data);
      if (result.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError(result.fieldErrors?.email?.[0] ?? result.message);
      }
    });
  };

  if (subscribed) {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl bg-white/15 p-4 text-sm font-medium text-white ring-1 ring-white/25">
        <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        {copy.label}
      </label>
      <div className="flex flex-col gap-2 rounded-3xl bg-white/10 p-1.5 ring-1 ring-white/25 sm:flex-row sm:rounded-full">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : `${id}-note`}
          className="h-11 min-w-0 flex-1 rounded-full bg-white px-5 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-brand-300"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70"
        >
          {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {pending ? copy.pending : copy.button}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-3 flex items-center gap-1.5 text-xs font-medium text-white">
          <AlertCircle aria-hidden className="size-3.5 shrink-0" />
          {translateError(error, t)}
        </p>
      ) : (
        <p id={`${id}-note`} className="mt-3 flex items-center gap-1.5 text-[11px] text-white/80">
          <ShieldCheck aria-hidden className="size-3.5 shrink-0" />
          {copy.privacy}
        </p>
      )}
    </form>
  );
}
