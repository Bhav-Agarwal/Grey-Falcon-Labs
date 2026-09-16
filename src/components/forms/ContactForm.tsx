"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const TOPICS = ["General enquiry", "Pricing & plans", "Prop-firm compatibility", "Technical support"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.topic) e.topic = "Please choose a topic.";
  if (f.message.trim().length < 10) e.message = "Please add a little more detail (10+ characters).";
  return e;
}

/**
 * Accessible contact form with front-end validation only.
 *
 * NOTE: This does NOT send anything — on valid submit it shows a success state
 * locally. Wire it to your email service / API route (e.g. a POST to
 * /api/contact, Formspree, Resend, etc.) where marked REPLACE-ME.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key]) setErrors(validate(next));
      return next;
    });
  };

  const onBlur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, topic: true, message: true });
    if (Object.keys(found).length > 0) return;

    // REPLACE-ME: send `fields` to your backend / email service here.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="glass flex flex-col items-center gap-4 p-10 text-center"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gain/15 text-gain">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-semibold text-white">Message ready to send</h3>
        <p className="max-w-sm text-sm text-neutral-400">
          Thanks, {fields.name.split(" ")[0] || "there"}! This demo form validated your details but
          isn&apos;t connected to a backend yet. Wire it to your email service to start receiving
          messages.
        </p>
        <Button variant="secondary" size="sm" onClick={() => { setSubmitted(false); setFields({ name: "", email: "", topic: "", message: "" }); setTouched({}); }}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass flex flex-col gap-5 p-6 md:p-8">
      <Field label="Name" htmlFor="name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => onBlur("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputCls(!!errors.name)}
          placeholder="Jane Trader"
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => onBlur("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputCls(!!errors.email)}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Topic" htmlFor="topic" error={errors.topic}>
        <select
          id="topic"
          name="topic"
          value={fields.topic}
          onChange={(e) => update("topic", e.target.value)}
          onBlur={() => onBlur("topic")}
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "topic-error" : undefined}
          className={inputCls(!!errors.topic)}
        >
          <option value="" disabled>
            Choose a topic…
          </option>
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-ink-800">
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputCls(!!errors.message), "resize-y")}
          placeholder="Tell us what you're looking for…"
        />
      </Field>

      <Button type="submit" size="lg" className="w-full">
        Send message
      </Button>
      <p className="text-center text-xs text-neutral-500">
        Demo form — front-end validation only, not connected to a backend.
      </p>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-gold-500/70",
    hasError ? "border-loss/60" : "border-white/10 focus:border-white/20",
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-neutral-300">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-loss">
          {error}
        </p>
      ) : null}
    </div>
  );
}
