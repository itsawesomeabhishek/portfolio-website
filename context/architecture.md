# Architecture Context

## Stack

| Layer     | Technology               | Role                                      |
| --------- | ------------------------ | ----------------------------------------- |
| Framework | Next.js 16 + TypeScript  | App Router, SSG for all sections          |
| UI        | Tailwind CSS v4          | Utility styling, CSS custom-property tokens|
| Fonts     | Google Fonts (next/font) | Space Grotesk (display) + JetBrains Mono (labels) |
| Assets    | /public/                 | Profile photo, project images, PDF resume |
| Content   | content/ TypeScript files| Typed data — no database for v1           |
| Animation | CSS / Tailwind keyframes | Marquee tapes, boot screen progress bar   |

## System Boundaries

- `app/` — Next.js app directory. `layout.tsx` loads fonts and tokens; `page.tsx` composes sections.
- `components/` — One file per section plus shared primitives (Button, Tape, TerminalCard, DotGrid).
- `content/` — Pure TypeScript data files (identity, stack, experience, projects, contact). No JSX.
- `public/` — Static assets: `assets/abhishek.png`, `resume/abhishek-resume.pdf`, project images.
- `app/globals.css` — Tailwind import + CSS custom-property tokens only. No global rule bloat.

## Storage Model

- **Static files**: all content lives in `content/*.ts` files compiled at build time. No database.
- **Resume PDF**: served directly from `public/resume/abhishek-resume.pdf`.
- **Images**: served from `public/assets/`, `public/project/`, `public/certificates/`.

## Auth and Access Model

- No auth in v1. All sections are public.
- If project gating is added later, it is a separate feature unit.

## Invariants

1. Content files in `content/` export typed constants only — no React components, no side effects.
2. All colors use CSS custom-property tokens defined in `globals.css` — no hardcoded hex values in components.
3. The boot screen writes to `sessionStorage` — it is a client component; the rest of the page is server components.
4. `npm run build` must pass before any section is marked complete.
5. No third-party UI library (shadcn, MUI, etc.) — Tailwind utilities only.
