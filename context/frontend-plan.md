# Frontend Plan — Neo-Brutalist Developer Portfolio

Status: BUILT (phases 0–11). Content placeholders remain; see progress-tracker.md.
Spec sources: `ui-context.md` (tokens, verified from the live site), `project-overview.md`
(content), `architecture.md`, `code-standards.md`.

## 1. What we are building

One long scrolling page. Sections in order:

`BootScreen → Navbar → Hero → tape ×2 → About → Tech stack (dark) → Logs → Projects →
Coding stats (dark) → Quotes (dark) → Services → Contact → Footer`

Always-on chrome: scroll progress bar, back-to-top button.

Nav label mapping (reference → ours): `/ABOUT` → about, `/SKILLS` → tech stack,
`/LOGS` → education + certificates, `/WORK` → projects, `HIRE ME` → contact.
No LOGIN button (no auth in v1).

## 2. Constraints from this Next.js version (verified in `node_modules/next/dist/docs`)

`next.config.ts` has `cacheComponents: true` and `partialPrefetching: true`.

1. **No current time in server components.** `new Date()` / `Date.now()` during prerender
   raises a current-time prerender error. The footer year is a constant in `content/`.
2. **Boot screen must not read `sessionStorage` during render** (hydration mismatch).
   Use the documented inline-script pattern: a `<head>` script sets
   `data-booted="true"` on `<html>` before first paint for repeat visits, and CSS hides the
   splash. The client component runs the progress animation, then writes the flag.
   In dev, React Strict Mode clears attributes set by the script, so the component
   re-applies the flag in `useLayoutEffect`.
3. **Fonts via `next/font/google`** (self-hosted). Apply variables on `<html>` in the root layout.
4. **Server components by default.** `"use client"` only where state, effects, or browser
   APIs are required. Props crossing the boundary must be serializable.
5. `LayoutProps<"/">` is the typed layout helper already used in `app/layout.tsx`.

## 3. File layout

```
app/
  layout.tsx          fonts, metadata, boot inline script, chrome
  page.tsx            composes sections only
  globals.css         tokens, @theme, grid background, keyframes
components/
  ui/                 Button, NeoCard, SectionHeading, TerminalCard, Marquee
  chrome/             BootScreen*, Navbar*, ScrollProgress*, BackToTop*
  sections/           Hero, About, TechStack, Logs, Projects, CodingStats,
                      Quotes, Services, Contact*, Footer      (* = client)
content/              identity, stack, logs, projects, stats, quotes,
                      services, contact, types   (typed constants, no JSX)
public/               assets already copied from abhishek-portfolio-1
```

Client components (the only ones): `BootScreen`, `Navbar` (menu + active section),
`ScrollProgress`, `BackToTop`, terminal typing line, `Contact` form. Everything else is a
server component with zero client JS.

Each file stays under ~200 lines; sections never import each other.

## 4. Build phases

Each phase is one verifiable unit: tests first, implement, run in the browser,
`npm run build`, update `progress-tracker.md`.

| # | Phase | Output | Verify |
|---|-------|--------|--------|
| 0 | Foundation | tokens, fonts, grid bg, keyframes, real metadata (replaces "Create Next App"), `content/types.ts` | page background + fonts match reference |
| 1 | Primitives | Button (green/outline), NeoCard, SectionHeading (`WORD_WORD`), TerminalCard, Marquee | visual check on a scratch route, then delete it |
| 2 | Chrome | Navbar (pill desktop, square menu mobile with numbered links), ScrollProgress, BackToTop, Footer | anchors scroll; menu works at 375px |
| 3 | Boot screen | splash + progress, once per session | no flash on reload; replays in new tab |
| 4 | Hero + tapes | outlined H1, green role banner, terminal card, 2 buttons, 2 blue tapes | reduced-motion stops tapes |
| 5 | About + Stack | white about panel with photo; dark 16-node grid | grid wraps cleanly 4→2→1 cols |
| 6 | Logs | Education entry; 5 certificate cards with images | images lazy-load, correct aspect |
| 7 | Projects | 2 project cards with image, tags, links | external links `rel="noopener noreferrer"` |
| 8 | Coding stats | dark panel: GitHub card (+ contribution graph if approved) | graceful fallback when API fails |
| 9 | Quotes + Services | marquee strip; 3 service cards | per decision below |
| 10 | Contact | form → `mailto:` (no backend), social links | validation messages; no data stored |
| 11 | Polish | a11y pass, responsive 375/768/1280, OG image, Lighthouse, final build | Lighthouse ≥ 90 perf/a11y/SEO |

Phases 5–10 are independent after phase 2 and can be built in parallel by separate agents.

## 5. Quality bar

- **Design fidelity:** hard shadows only (no blur), `radius: 0`, 2px ink borders, section
  backgrounds exactly as in `ui-context.md`.
- **Accessibility:** green `#33ff63` is a fill color only (ink text on it); never green text on
  cream (fails contrast). Visible `:focus-visible` ring on every control. One `<h1>`.
  Duplicated marquee content is `aria-hidden`. All motion off under `prefers-reduced-motion`.
  Menu button has `aria-expanded`/`aria-controls`; Escape closes it.
- **Performance:** `next/image` with `sizes` for every image. `abhishek.png` is ~980 KB and
  project images are 450–910 KB — Next converts them to AVIF/WebP, hero text is the LCP.
  No animation library; tapes and cursor are CSS only.
- **Security:** external links get `noopener noreferrer`; the contact form builds the
  `mailto:` with `encodeURIComponent`, validates input client-side, stores nothing; no
  third-party scripts or trackers; phone number is not published.
- **Tests (TDD, 80%+):** Vitest + Testing Library for content validation (no empty fields,
  valid URLs, referenced files exist), Navbar menu, boot-screen session logic, contact
  validation. Playwright smoke for boot-once, anchor navigation, CV download, mailto.
- **Review gates:** `code-reviewer` + `typescript-reviewer`/`react-reviewer` after each phase,
  `a11y-architect` after phases 2 and 11, `security-reviewer` before any commit.

## 6. Corrections to earlier context files

- `ui-context.md` previously described the tapes as dark/green. They are **blue**
  (`#3c83f6`) with cream text. Fixed.
- Earlier chat note said the desktop nav hides behind a gear until scroll. Wrong: the gear is
  just the **mobile** menu button; desktop shows the full nav pill. Plan follows the latter.
- `project-overview.md` still lists a "Testimonials / Quotes" strip using `Quote.ts`.
  Those are philosophical/anime quotes, not testimonials (see decision 3).
- `project-overview.md` omitted Services, and says "TryHackMe / coding stats not applicable"
  while also listing GitHub stats — will be reconciled once decisions are made.

## 7. Known content gaps (will not be invented)

- **Project summaries, tags, live/GitHub links:** the old site stored these in a database
  and the MDX files are not in the repo. Only titles and images carried over.
- **Services:** not present in the old repo.
- **Real testimonials:** none exist.
- **Phone:** intentionally omitted (your own chat prompt says it is not public).

## 8. Decisions (resolved)

1. Projects: clearly marked placeholders for summary, tags, and links; real details filled in later.
2. Services: Web Development, Full-Stack Apps, Frontend/UI Build.
3. Quotes: kept as a labelled `QUOTES.txt` strip, not presented as testimonials.
4. GitHub stats: typed static numbers, no external requests.
5. Experience: omitted; `/LOGS` shows Education + Certificates.
6. Tests: add Vitest, Testing Library, and Playwright.

