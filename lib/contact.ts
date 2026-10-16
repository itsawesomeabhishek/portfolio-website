export interface ContactInput {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 80, message: 2000, minMessage: 10 } as const;

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Enter your email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (message.length < LIMITS.minMessage) {
    errors.message = `Write at least ${LIMITS.minMessage} characters.`;
  } else if (message.length > LIMITS.message) {
    errors.message = `Keep your message under ${LIMITS.message} characters.`;
  }

  return errors;
}

const stripLineBreaks = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * `recipient` must be a trusted constant (the site owner's address from `content/`),
 * never user input. Name and email are stripped of line breaks, and subject/body are
 * fully percent-encoded so visitor text cannot add mailto parameters or headers.
 */
export function buildMailto(recipient: string, input: ContactInput): string {
  const name = stripLineBreaks(input.name);
  const email = stripLineBreaks(input.email);
  const subject = `Portfolio message from ${name}`;
  const body = `${input.message.trim()}\n\n— ${name} (${email})`;

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
