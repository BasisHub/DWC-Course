---
phase: 03-navigation-design-polish
plan: 02
subsystem: ui
tags: [react, typescript, homepage, hero, chapter-cards, css-modules, dark-mode, responsive]

# Dependency graph
requires:
  - phase: 03-navigation-design-polish
    plan: 01
    provides: "Sidebar groupings (4 sections), blue color palette"
provides:
  - "Hero component with title, subtitle, and Start Learning CTA"
  - "Text-only HomepageFeatures component (no SVG illustrations)"
  - "ChapterCards grouped into 4 sections matching sidebar structure"
  - "Homepage MDX composing Hero + Features + Cards + closing CTA"
affects:
  - 03-03 (visual verification will validate homepage components across breakpoints and dark mode)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "MDX page composing multiple React components with Infima grid classes"
    - "CSS Modules with [data-theme='dark'] selectors for dark mode"
    - "Docusaurus Link component for internal navigation in cards"

key-files:
  created:
    - src/components/Hero/index.tsx
    - src/components/Hero/styles.module.css
  modified:
    - src/components/HomepageFeatures/index.tsx
    - src/components/HomepageFeatures/styles.module.css
    - src/components/ChapterCards/index.tsx
    - src/components/ChapterCards/styles.module.css
    - docs/index.md
  deleted:
    - static/img/bbj-to-web.svg
    - static/img/css-layouts.svg
    - static/img/validation.svg

key-decisions:
  - "DES-01: Homepage structured as Hero -> Features -> Cards -> CTA, all text-focused with no illustrations"
  - "DES-02: Cards use blue accent border on hover via var(--ifm-color-primary), inheriting the palette from 03-01"

patterns-established:
  - "Component composition pattern: MDX imports React components from @site/src/components/"
  - "Card pattern: Link wraps entire card for full-clickable area with hover border accent"
  - "Section grouping pattern: data array with sections containing chapter arrays, rendered with nested map"

# Metrics
duration: 2min
completed: 2026-01-31
---

# Phase 3 Plan 2: Homepage Redesign Summary

**Hero section with CTA, text-only feature highlights, and 12 chapter cards grouped into 4 sidebar-matching sections with dark mode and hover effects**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-31T10:11:26Z
- **Completed:** 2026-01-31T10:13:47Z
- **Tasks:** 3/3
- **Files created:** 2, modified: 5, deleted: 3

## Accomplishments

- Created Hero component with bold title, descriptive subtitle, and prominent "Start Learning" CTA button linking to Chapter 1
- Rewrote HomepageFeatures to use text-only feature highlights (12 Progressive Chapters, Hands-On Code Samples, Modern Web Standards) with card-like styling
- Redesigned ChapterCards to group 12 chapters into 4 labeled sections (Getting Started 3, Core Concepts 3, Advanced Topics 5, Deployment 1) matching the sidebar structure from 03-01
- Removed emoji icons and chapter numbers from cards for clean typography
- Added hover effects with blue accent border and subtle box-shadow
- Added dark mode CSS variants for card borders and shadows
- Composed homepage as MDX importing Hero, HomepageFeatures, and ChapterCards with a closing CTA section
- Deleted 3 unused SVG illustrations no longer referenced after HomepageFeatures redesign
- Hidden table of contents on homepage via frontmatter

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Hero component and redesign HomepageFeatures** - `e1f65e3` (feat)
2. **Task 2: Redesign ChapterCards with section grouping** - `bba52b3` (feat)
3. **Task 3: Compose homepage MDX with all components and closing CTA** - `dc6a0c3` (feat)

## Files Created/Modified

- `src/components/Hero/index.tsx` - NEW: Hero section with Heading, subtitle, and Link CTA button
- `src/components/Hero/styles.module.css` - NEW: Responsive hero styling (3rem -> 2rem title at 996px)
- `src/components/HomepageFeatures/index.tsx` - Rewritten: text-only features, removed SVG imports
- `src/components/HomepageFeatures/styles.module.css` - Rewritten: card-like feature blocks with dark mode
- `src/components/ChapterCards/index.tsx` - Rewritten: 4 sections with section headings, Link-wrapped cards
- `src/components/ChapterCards/styles.module.css` - Rewritten: hover effects, dark mode, clean card styling
- `docs/index.md` - Rewritten: MDX composing Hero + Features + Cards + closing CTA
- `static/img/bbj-to-web.svg` - DELETED
- `static/img/css-layouts.svg` - DELETED
- `static/img/validation.svg` - DELETED

## Decisions Made

- DES-01: Homepage layout follows Hero -> Features -> Cards -> CTA flow, all text-focused with no illustrations or decorative SVGs
- DES-02: Card hover uses blue accent border via `var(--ifm-color-primary)`, automatically inheriting the blue palette established in 03-01
- Cards wrap entire content in Docusaurus Link component for full-clickable area (better UX than title-only links)
- Closing CTA uses inline style for one-off padding rather than creating a dedicated CSS module

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three homepage components are in place for visual verification in Plan 03-03
- Dark mode variants use `[data-theme='dark']` selectors for cards and features
- Responsive behavior relies on Infima's built-in `col col--4` reflow at 996px
- No new dependencies added -- components use only existing Docusaurus/Infima primitives

---
*Phase: 03-navigation-design-polish*
*Completed: 2026-01-31*
