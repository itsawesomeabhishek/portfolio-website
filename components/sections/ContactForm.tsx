"use client";

import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  buildMailto,
  type ContactErrors,
  type ContactInput,
  LIMITS,
  validateContact,
} from "@/lib/contact";

interface ContactFormProps {
  readonly email: string;
  readonly navigate?: (url: string) => void;
}

const openMailClient = (url: string) => {
  window.location.href = url;
};

const fieldClass =
  "w-full border-2 border-line bg-card px-4 py-3 font-mono text-sm text-ink shadow-hard-sm placeholder:text-muted aria-[invalid=true]:border-destructive";

export function ContactForm({ email, navigate = openMailClient }: ContactFormProps) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input: ContactInput = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSent(false);
      return;
    }

    navigate(buildMailto(email, input));
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 border-2 border-line bg-background p-6 shadow-hard-lg"
    >
      <Field id="contact-name" label="NAME" error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field id="contact-email" label="EMAIL" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field id="contact-message" label="MESSAGE" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <button
        type="submit"
        className="inline-flex items-center gap-2 border-2 border-line bg-neo-green px-6 py-3 font-mono text-sm font-bold uppercase text-ink shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-ink hover:text-neo-green hover:shadow-hard-sm"
      >
        <Send className="size-5" aria-hidden="true" />
        SEND MESSAGE
      </button>

      <p role="status" className="min-h-6 font-mono text-sm font-bold">
        {sent ? "Opening your mail app… nothing is stored on this site." : ""}
      </p>
    </form>
  );
}

interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 font-mono text-xs font-bold text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

