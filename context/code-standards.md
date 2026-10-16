# Code Standards

## General

- Keep components small and single-purpose (one section = one file).
- Fix root causes; do not layer workarounds.
- Do not mix section concerns in one component.
- Max 400 lines per file; extract if larger.

## TypeScript

- Strict mode required throughout.
- Avoid `any` — use explicit interfaces from `content/types.ts`.
- Validate props with TypeScript types, not runtime checks.

## Next.js

- Default to server components for all sections.
- Add `"use client"` only for BootScreen, Navbar, ScrollProgress, BackToTop and ContactForm. Marquee tapes are CSS-only server components.
- One `page.tsx` that imports and stacks section components.
- No `getServerSideProps` — all data is statically imported from `content/`.

## Styling

- Use CSS custom-property tokens defined in `globals.css` — never hardcode hex values.
- All Tailwind classes that reference colors must use token-backed arbitrary values,
  e.g. `bg-[var(--accent)]` or a Tailwind theme extension.
- Zero border-radius everywhere (`rounded-none`).
- Offset shadow: `shadow-[4px_4px_0px_0px_#000]`.

## Content

- All personal data (name, bio, stack, projects, contact) lives in `content/*.ts` files.
- Content files export typed constants only — no JSX.
- `content/identity.ts` — name, handle, headline, bio, location, avatar path, resume path.
- `content/stack.ts` — skill nodes array `{ label, tech, href? }[]`.
- `content/experience.ts` — education / experience entries.
- `content/projects.ts` — project entries `{ title, slug, summary, tags, image, live?, github? }[]`.
- `content/contact.ts` — email, phone, social links.
- `content/quotes.ts` — quote objects for the testimonial strip.

## File Organization

- `app/` — layout.tsx, page.tsx, globals.css only.
- `components/sections/` — one file per section (Hero, About, TechStack, Logs, Projects, CodingStats, Quotes, Services, Contact, Footer).
- `components/chrome/` — BootScreen, Navbar, ScrollProgress, BackToTop.
- `components/ui/` — shared primitives: Button, Section, SectionHeading, TerminalCard, Marquee.
- `lib/` — pure, tested helpers (boot session logic, contact validation + mailto).
- `content/` — typed data files only.
- `e2e/` — Playwright specs. Unit tests sit next to the code as `*.test.ts(x)`.
- `public/` — static assets; do not commit `.next/` or `node_modules/`.

## Testing

- `npm test` (Vitest + Testing Library), `npm run test:coverage` (80% gate), `npm run test:e2e` (Playwright against a production build on port 3100).
