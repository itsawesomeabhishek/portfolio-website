# AI Workflow Rules

## Approach

Build this portfolio incrementally. Context files define what to build, how to build it,
and the current state of progress. Always implement against these specs.
Do not invent content or behavior not defined here.

## Scoping Rules

- Work on one section at a time.
- Preferred order: tokens → boot screen → navbar → hero → about → stack → experience →
  projects → github stats → quotes → contact → footer → marquee tapes → motion polish.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated sections in a single implementation step.

## When to Split Work

Split an implementation step if it combines:

- UI changes and content/data changes at the same time.
- Two or more unrelated sections.
- Behavior not clearly defined in the context files.

If a change cannot be verified end to end in the browser quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent content not defined in `project-overview.md`.
- If a requirement is ambiguous, add an open question to `progress-tracker.md` before implementing.
- If a section detail is missing, use the closest equivalent from the reference site.

## Protected Files

Do not modify:
- `context/` files except `progress-tracker.md` unless a spec change is needed.
- `public/` asset files — copy from the source repo, do not recreate.

## Keeping Docs in Sync

Update `context/progress-tracker.md` after each section is completed.

## Before Moving to the Next Section

1. The section renders correctly in the browser at `http://localhost:3000`.
2. No TypeScript errors (`tsc --noEmit`).
3. `progress-tracker.md` is updated.
4. `npm run build` still passes.
