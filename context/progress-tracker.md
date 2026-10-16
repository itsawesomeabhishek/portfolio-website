# Progress Tracker

## Current Phase

- Build complete for all 12 phases of `frontend-plan.md`. Remaining: real content + polish.

## Current Goal

- Replace placeholders with real project details, then deploy.

## Completed

- ECC installed under `.cursor/`; Next.js starter stripped.
- Context files filled from the old portfolio; assets in `public/`.
- Phase 0 foundation: Space Grotesk + JetBrains Mono, tokens, dot-grid background, keyframes, real metadata, typed `content/*`.
- Phase 1 primitives: Button, Section, SectionHeading, TerminalCard, Marquee (CSS-only pause control).
- Phase 2 chrome: Navbar (pill + mobile menu, Escape returns focus), ScrollProgress, BackToTop, Footer, skip link.
- Phase 3 boot screen: once per session via inline `<head>` script + `useSyncExternalStore`.
- Phases 4–10: Hero + two blue tapes, About, Tech stack (16 nodes), Logs (education + 5 certificates), Projects, Coding stats (static), Quotes, Services, Contact (`mailto:` form, validated, nothing stored).
- Phase 11: reviews run (react, security, a11y); fixes applied — skip link, marquee pause, contrast (`--destructive` darkened, skills tape bold/large), `aria-required`, external link announcements, reduced-motion delay, security headers + production CSP in `next.config.ts`.
- Tests: 68 Vitest tests, ~98% statement coverage; 14 Playwright tests (desktop + mobile) pass against a production build. `npm run lint`, `tsc`, `npm run build` all clean.
- `@types/node` bumped to `^22` (matches Node 22 and fixes a Vitest peer conflict).

## In Progress

- Nothing.

## Next Up

- Fill `content/projects.ts` with real summaries, tags, live/GitHub links for Debloat AI and CosmiCode (placeholders are flagged `placeholder: true`).
- Add `public/og.png` and reference it in `app/layout.tsx` metadata.
- Optional: Lighthouse run on the deployed site; Terms/Privacy pages if wanted.
- Decide whether to commit (nothing committed yet).

## Open Questions

- Real project details (see Next Up).
- Final production domain (`identity.siteUrl` currently `https://itsawesomeabhishek.xyz`, from the old repo).

## Architecture Decisions

- Static, content-first page on Next.js 16, React 19, TypeScript, Tailwind 4. No database, no auth.
- `cacheComponents` is on: no `new Date()` in server components; footer year is a constant.
- Client components: BootScreen, Navbar, ScrollProgress, BackToTop, ContactForm only.
- Contact is a `mailto:` form — no backend, nothing stored. `lib/contact.ts` strips line breaks and percent-encodes everything.
- CSP is production-only (dev needs `unsafe-eval`); `script-src` keeps `unsafe-inline` for the boot script and Next hydration scripts.
- Space Grotesk tops out at weight 700 on Google Fonts, so `font-black` renders at 700.
- Lucide v1 has no brand icons (GitHub/LinkedIn); social links use text + an external-link icon.

## Session Notes

- Dev server: `npm run dev` at http://localhost:3000. E2E uses its own build on port 3100.
- Phone number is intentionally not published.
