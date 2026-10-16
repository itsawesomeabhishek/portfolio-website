# Abhishek's Portfolio

## Overview

A single-page cybersecurity-inspired portfolio for Abhishek — a Full-Stack Web Developer
and Computer Science student at Lovely Professional University, Punjab, India.
The site uses a neo-brutalist visual language (hacker aesthetic, cream background,
neon green accent, monospace type, thick borders, offset shadows) with Abhishek's own content.

## Goals

1. Present Abhishek as a credible full-stack developer ready for internships.
2. Showcase projects, skills, experience, and certificates in one scrollable page.
3. Make CV download and contact effortless — no login required.

## Core User Flow

1. Visitor lands on the page and sees the boot/splash screen (`$ initializing system`).
2. Visitor reads the hero: name, headline, terminal whoami, and two CTAs.
3. Visitor scrolls through About, Stack, Education + Certificates, Projects, Coding stats, Quotes, Services, Contact.
4. Visitor downloads the PDF resume or clicks the email CTA.

## Features

### Identity & Hero
- Logo: `ABHISHEK.exe` in the navbar.
- Headline: **FULL-STACK** (solid line) / **DEVELOPER** (outlined).
- Role banner (green bar): `Full-Stack Web Developer & CS Student. React • Next.js • TypeScript • Node.js`.
- Terminal card:
  ```
  abhishek@dev:~
  $ whoami
  full-stack-dev | cs-student
  ```
- Two scrolling tapes: roles tape / skills tape.
- CTA buttons: **VIEW PROJECTS** and **DOWNLOAD CV**.

### About
- Name: Abhishek
- Location: Dasuya, Punjab, India
- Status: AVAILABLE (looking for internships)
- Bio: CS undergraduate at Lovely Professional University. Builds modern web applications with TypeScript,
  React, Next.js, and Node.js. Solved 75+ LeetCode problems; exploring backend with Spring Boot
  and databases (MySQL, PostgreSQL). Also works with Data Science tools (Pandas, NumPy, Power BI).

### Tech Stack (16 nodes)
| Label | Technology |
|---|---|
| FRONTEND | React |
| FRAMEWORK | Next.js |
| LANGUAGE | TypeScript |
| LANGUAGE | JavaScript |
| RUNTIME | Bun |
| BACKEND | Node.js |
| DATABASE | PostgreSQL |
| DATABASE | MongoDB |
| ORM | Prisma |
| LANGUAGE | Python |
| LANG | Java |
| LANG | C++ |
| DATA | Pandas / NumPy |
| CLOUD | Azure |
| VERSION | Git |
| STYLE | Tailwind CSS |

### Experience / Education Log
**Education**
- Lovely Professional University · B.Tech CSE · 2024 – 2028 (Expected)

**No paid experience yet** — the experience log shows education as the single entry.

### Projects (public, no auth gate)
| Slug | Title | Description |
|---|---|---|
| debloat-ai | Debloat AI | (image: `/project/debloat-ai.png`) |
| cosmicode-subscriptions-platform | CosmiCode Subscriptions Platform | (image: `/project/cosmicode-platform.png` or `/assets/cosmicodefrontpage.png`) |

### Certificates
- Problem Solving (Basic) — HackerRank · Feb 2026
- Python (Basic) — HackerRank · Feb 2026
- Java (Basic) — HackerRank · Dec 2025
- Microsoft Azure Data Fundamentals (DP-900) — Microsoft · Jan 2026
- Microsoft Azure Fundamentals (AZ-900) — Microsoft · Jan 2026

### GitHub Stats
- Username: `itsawesomeabhishek`
- Typed static stats only (no external requests): 75+ LeetCode, 5 certificates, 2 projects, GitHub link.

### Quotes (`QUOTES.txt`)
Philosophical/anime quotes from the old site, shown as a clearly labelled `QUOTES.txt` section. They are not testimonials.

### Contact
- Email: abhisheq117@gmail.com
- GitHub: https://github.com/itsawesomeabhishek
- LinkedIn: https://www.linkedin.com/in/itsawesomeabhishek/
- Form: Name, Email, Message → mailto fallback for v1.

### CV / Resume
- PDF: `/resume/abhishek-resume.pdf`
- Downloadable from the hero CTA and a resume section.

### Services
- Web Development, Full-Stack Apps, Frontend / UI Build.

### Footer
- `ABHISHEK` · `< Full-Stack Developer />` · `© 2026 ABHISHEK. ALL RIGHTS RESERVED.`

## Scope

### In Scope
- One long scrollable page featuring a neo-brutalist developer layout and aesthetic.
- Boot/splash screen (one-time per visit, stored in sessionStorage).
- Sticky navbar: `ABHISHEK.exe` logo, section links, **HIRE ME** and **DOWNLOAD CV** buttons.
- All sections above.
- Mobile-responsive.
- CV download from `/public/resume/abhishek-resume.pdf`.
- Profile photo from `/public/assets/abhishek.png`.

### Out of Scope (v1)
- Login / auth gate on projects.
- Real contact form backend (use mailto for v1).
- Newsletter / email subscription.
- Blog and admin panel.
- TryHackMe and live third-party stats.
- Comments.

## Success Criteria

1. The page builds (`npm run build`) with no errors.
2. All sections render and scroll smoothly on desktop and mobile.
3. CV download works.
4. The boot screen shows once per visit.
5. High visual polish: cream bg, neon green accent, JetBrains Mono labels,
   Space Grotesk display, square corners, offset shadows, dot-grid background.


