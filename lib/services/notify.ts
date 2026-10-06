import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/constants/site";

type Value = unknown;

const humanize = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

function format(value: Value): string {
  if (value == null || value === "") return "-";
  if (Array.isArray(value)) return value.length ? value.map(format).join(", ") : "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    // Uploads keep file metadata only (no object storage yet).
    if (typeof o.name === "string" && ("size" in o || "type" in o)) return `${o.name} (file)`;
    return Object.entries(o)
      .map(([k, v]) => `${humanize(k)}: ${format(v)}`)
      .join("; ");
  }
  return String(value);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Email a form submission to the Tutorly inbox (`siteConfig.contact.email`).
 *
 * Needs GMAIL_USER (defaults to the inbox address) and GMAIL_APP_PASSWORD, a Google
 * "App password" for that account. Without a password the submission is logged in
 * development and rejected in production, so it is never silently lost.
 */
export async function notifyTeam(opts: {
  subject: string;
  reference: string;
  data: object;
  replyTo?: string;
}) {
  const to = siteConfig.contact.email;
  const rows = Object.entries(opts.data as Record<string, Value>).map(
    ([k, v]) => [humanize(k), format(v)] as const,
  );

  const text = [`Reference: ${opts.reference}`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const html = `<h2>${escapeHtml(opts.subject)}</h2><p><strong>Reference:</strong> ${escapeHtml(opts.reference)}</p><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) {
    if (process.env.NODE_ENV === "production") throw new Error("GMAIL_APP_PASSWORD is not set");
    console.warn(`[notify] GMAIL_APP_PASSWORD not set; email not sent.\n${opts.subject}\n${text}`);
    return;
  }

  const user = process.env.GMAIL_USER ?? to;
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: `"Tutorly Website" <${user}>`,
    to,
    replyTo: opts.replyTo,
    subject: `${opts.subject} (${opts.reference})`,
    text,
    html,
  });
}

/**
 * Confirmation email to the person who submitted a form, at the address they gave.
 * Best effort: a failure here is logged and never fails the submission.
 */
export async function sendConfirmation(opts: {
  to: string;
  name: string;
  reference: string;
  subject: string;
  message: string;
}) {
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return;
  try {
    const user = process.env.GMAIL_USER ?? siteConfig.contact.email;
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    const inbox = siteConfig.contact.email;
    const text = `Hi ${opts.name},\n\n${opts.message}\n\nYour reference: ${opts.reference}\n\nIf you need anything, reply to this email or write to ${inbox}.\n\nTutorly`;
    const html = `<p>Hi ${escapeHtml(opts.name)},</p><p>${escapeHtml(opts.message)}</p><p><strong>Your reference:</strong> ${escapeHtml(opts.reference)}</p><p>If you need anything, reply to this email or write to <a href="mailto:${inbox}">${inbox}</a>.</p><p>Tutorly</p>`;
    await transporter.sendMail({
      from: `"Tutorly" <${user}>`,
      to: opts.to,
      replyTo: inbox,
      subject: opts.subject,
      text,
      html,
    });
  } catch (error) {
    console.error("[notify] confirmation email failed:", error);
  }
}
