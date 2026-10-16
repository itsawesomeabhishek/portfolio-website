# UI Context

Values below define the design tokens and computed specifications for the neo-brutalist theme.

## Theme

Neo-brutalist "hacker terminal" look. Cream page, near-black ink, thick 2px black
borders, hard offset shadows with zero blur, square corners. Sections alternate
between cream and near-black. Light only — no dark-mode toggle.

## Colors

All components use these tokens. No hardcoded hex or raw colors in components.

| Role               | CSS Variable        | Value (HSL → hex)            |
| ------------------ | ------------------- | ---------------------------- |
| Page background    | `--background`      | `60 33% 97%` → `#fafaf5`     |
| Card / white panel | `--card`            | `0 0% 100%` → `#ffffff`      |
| Ink / foreground   | `--foreground`      | `0 0% 7%` → `#121212`        |
| Muted text         | `--muted-foreground`| `215 16% 47%`                |
| Border             | `--border`          | `0 0% 0%` → `#000000`        |
| Neo green (primary)| `--neo-green`       | `134 100% 60%` → `#33ff63`   |
| Neo blue (tapes)   | `--neo-blue`        | `217 91% 60%` → `#3c83f6`    |
| Neo yellow         | `--neo-yellow`      | `59 100% 64%`                |
| Neo pink           | `--neo-pink`        | `340 100% 72%`               |
| Neo red            | `--neo-red`         | `0 100% 58%`                 |
| Neo orange         | `--neo-orange`      | `34 100% 55%`                |
| Neo cyan           | `--neo-cyan`        | `180 100% 45%`               |
| Destructive        | `--destructive`     | `0 100% 50%`                 |

## Shadows (hard, no blur)

| Token               | Value                          |
| ------------------- | ------------------------------ |
| `--shadow-hard-sm`  | `2px 2px 0 0 #000`             |
| `--shadow-hard`     | `4px 4px 0 0 #000`             |
| `--shadow-hard-lg`  | `8px 8px 0 0 #000`             |
| `--shadow-hard-xl`  | `12px 12px 0 0 #000`           |

## Typography

| Role                  | Font           | Weight | Notes                          |
| --------------------- | -------------- | ------ | ------------------------------ |
| Logo, H1, section H2  | Space Grotesk  | 900    | uppercase, tight tracking      |
| Body                  | Space Grotesk  | 400–700|                                |
| Nav, labels, buttons, terminal, tapes | JetBrains Mono | 400–800 | |

Loaded with `next/font/google` (self-hosted, no layout shift), exposed as
`--font-display`/`--font-sans` and `--font-mono`.

Heading scale (desktop): hero H1 ≈ 76px; section H2 96px (About 60px;
Coding-stats, Newsletter, Contact 48px). `USER_REPORTS.txt` heading is a small
20px mono label. Section titles are written `WORD_WORD` with an underscore.

## Shape and borders

- `--radius: 0` — no rounded corners. Only exception: the three tiny round
  window dots on the terminal card (red, yellow, green).
- Standard border: `2px solid var(--foreground)`. Thin variant: `1px`.
- Interactive elements gain the hard shadow; on hover they swap background to a
  neo color (yellow, pink, or inverted ink) and the shadow may grow.

## Background

Page has a graph-paper grid: one dot layer plus faint 1px grid lines:

```
radial-gradient(#000 1px, transparent 1px),
linear-gradient(to right, hsl(0 0% 90%) 1px, transparent 1px),
linear-gradient(to bottom, hsl(0 0% 90%) 1px, transparent 1px)
```

## Section rhythm (observed)

| Section        | id             | Background      | Padding | Top border |
| -------------- | -------------- | --------------- | ------- | ---------- |
| Hero           | —              | cream + grid    | 80px top| —          |
| About          | `about`        | white           | 96px    | —          |
| Tech stack     | `skills`       | ink `#121212`   | 80px    | 4px        |
| Experience     | `experience`   | transparent     | 96px    | —          |
| Education      | `education`    | transparent     | 96px    | —          |
| Projects       | `projects`     | transparent     | 96px    | —          |
| Coding stats   | `coding-stats` | ink             | 48px    | 4px        |
| Reports/quotes | `reports`      | ink             | 96px    | 4px        |
| Services       | `services`     | transparent     | 96px    | —          |
| Contact        | `contact`      | transparent     | 96px    | —          |

## Components

- **Logo badge** — `NAME.exe`, cream, 2px border, hard shadow, font-black, hover → yellow.
- **Nav pill** — white card, 2px border, hard shadow, links `/ABOUT /SKILLS /LOGS /WORK`
  in mono bold, plus a green `HIRE ME` chip. Mobile: square menu button.
- **Primary button** — green fill, 2px border, hard shadow, mono bold; hover → ink fill.
- **Outline button** — cream/white fill, same border and shadow.
- **Role banner** — large green block under the H1 with hard shadow.
- **Terminal card** — ink fill, `2px` ink border, `4px` hard shadow, `max-w-md`, 16px padding; row of three round dots, then a small green mono title and green/cyan mono text with a blinking `_`.
- **Marquee tapes** — full-width **blue** (`--neo-blue`) bands with cream mono text,
  two rows. Row 1: `font-bold text-2xl`, scrolls left (`40s linear infinite`).
  Row 2: `text-lg`, 70% opacity, scrolls right (`30s linear infinite reverse`).
  Content is duplicated so a `-50%` translate loops seamlessly. Pauses on hover is optional.
- **Scroll progress bar** — fixed top, `h-2`, neo-green with a bottom border.
- **Back-to-top** — fixed bottom-right `48×48`, neo-cyan, 2px border, hard shadow.
- **Boot screen** — full-screen cream grid, `CYBER` + yellow `NOVA` wordmark box,
  ink terminal line `$ initializing system` with blinking green cursor, a
  thick-bordered progress bar with a percent label, `LOADING ASSETS` caption.

## Animations (names from the reference)

`scroll`, `scroll-reverse` (tapes), `blink` (cursor), `terminal-typing`
(width 0 → 100%), `glitch-anim` (±2px jitter), `slide-up`
(20px + fade), `shimmer`, `pulse`. All must respect `prefers-reduced-motion`.

## Icons

Lucide React, stroke style. Inline `h-4 w-4`, buttons `h-5 w-5`.

## Hero (measured at 1280px)

- H1: 102.4px (`clamp(3rem,8vw,6.4rem)`), line-height 0.85, tracking -0.05em; second line cream fill with 3px ink stroke.
- Status chip: mono 14px, ink box with green ● then label, 4px shadow.
- Banner: mono 24px, padding 16px, max-w 768px, 4px shadow; second line bold.
- Buttons: Space Grotesk 20px bold, padding 20px 40px, gap 24px, not uppercase-transformed; View Projects is ink, Download CV is cream.
- Body grid: dots every 40px, lines every 100px, line colour hsl(0 0% 90%).
- Decor: blue 64px square (bounce), green 96px circle (pulse), 4px borders, faint 128px word at 5% opacity.

