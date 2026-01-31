# Roadmap: BBj DWC Training Course Enhancement

## Overview

This roadmap transforms the BBj DWC Training Course from a functional static site into a polished, searchable, and consultant-ready platform. The work progresses from resolving foundational risks (config flags, CI, compatibility), through enabling search and visual tooling (Algolia, Mermaid, image optimization), into design and navigation polish (homepage, responsive, sidebar), and culminates with a structured content audit that leverages the new platform capabilities. All 18 v1 requirements are covered across 4 phases.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Pre-Flight** - Resolve config risks, verify compatibility, and harden CI before any feature work
- [x] **Phase 2: Search & Visual Tooling** - Enable full-text search, Mermaid diagrams, image optimization, and code block enhancements
- [ ] **Phase 3: Navigation & Design Polish** - Restructure sidebar, redesign homepage, ensure responsive and visually consistent experience
- [ ] **Phase 4: Content Audit** - Audit all 12 chapters for quality and produce prioritized improvement recommendations

## Phase Details

### Phase 1: Pre-Flight
**Goal**: The site builds cleanly with all config issues resolved and CI catches type errors before deployment
**Depends on**: Nothing (first phase)
**Requirements**: PRE-01, PRE-02, PRE-03, PRE-04
**Success Criteria** (what must be TRUE):
  1. The `future.v4` flag is either documented as intentional or removed, and the decision is recorded
  2. React 19 compatibility with Algolia search, Mermaid, and ideal-image plugins is verified (or a mitigation path chosen)
  3. `baseUrl` is consistent across all configuration and matches the deployed GitHub Pages URL
  4. A push to main that introduces a TypeScript error fails the CI pipeline before the build step
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Config cleanup: remove future.v4 flag, migrate deprecation warning, fix baseUrl docs (PRE-01, PRE-02, PRE-03)
- [x] 01-02-PLAN.md — CI hardening: add typecheck to pipeline, enable PR validation (PRE-04)

### Phase 2: Search & Visual Tooling
**Goal**: Users can search the entire course and authors can use diagrams, optimized images, and copy-enabled code blocks
**Depends on**: Phase 1
**Requirements**: SRCH-01, SRCH-02, SRCH-03, SRCH-04, VIS-01, VIS-02, VIS-03, VIS-04
**Success Criteria** (what must be TRUE):
  1. A user can type a search term and see relevant results with context snippets linking to specific sections across all 12 chapters
  2. Pressing Cmd+K (Mac) or Ctrl+K (Windows) opens the search modal from any page
  3. Search is configured with `contextualSearch: true` so it will work correctly when i18n locales are added later
  4. An author can write a Mermaid code block in Markdown and it renders as a diagram on the published page
  5. Every code block across the site shows a copy button, and clicking it copies the code to clipboard
  6. Images load at appropriate sizes for the user's viewport (responsive image optimization active)
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md -- Plugin installation and configuration: Mermaid, local search, ideal-image, zooming, copy button verification, example diagram
- [x] 02-02-PLAN.md -- Image optimization migration: convert 45 PNG/JPG references across 9 doc files to IdealImage components

### Phase 3: Navigation & Design Polish
**Goal**: The site looks polished enough to show prospects and clients, with intuitive navigation for both learners and consultants
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, DES-01, DES-02, DES-03
**Success Criteria** (what must be TRUE):
  1. Sidebar chapters are grouped into logical sections (e.g., "Getting Started", "Core Concepts", "Advanced Topics", "Deployment") instead of a flat list
  2. The homepage has been redesigned with a modern, polished look worthy of client-facing presentations
  3. All custom components (ChapterCards, HomepageFeatures, any new components) render correctly on mobile, tablet, and desktop in Chrome, Firefox, and Safari
  4. Dark mode works correctly with all components including Mermaid diagrams, new design elements, and search UI
  5. Visual design is consistent across all custom components (cards, icons, spacing, typography follow a unified design language)
**Plans**: 3 plans

Plans:
- [x] 03-01-PLAN.md -- Foundation: sidebar restructuring into 4 sections, green-to-blue color palette, template cleanup (NAV-01, DES-02)
- [x] 03-02-PLAN.md -- Homepage redesign: Hero component, text-focused feature highlights, grouped chapter cards, closing CTA (DES-01, DES-02)
- [ ] 03-03-PLAN.md -- Visual verification: responsive, dark mode, cross-browser acceptance checkpoint (NAV-02, NAV-03, DES-03)

### Phase 4: Content Audit
**Goal**: Every chapter has been evaluated and there is a clear, prioritized list of what to improve when content depth work begins in v2
**Depends on**: Phase 2 (tooling awareness), Phase 3 (design standards)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. All 12 chapters have been audited with documented assessments covering clarity, logical flow, completeness, and relevance
  2. Each chapter has a specific list of identified content gaps (what is missing, what is unclear, what is outdated)
  3. Each chapter has actionable improvement recommendations that reference available tooling (Mermaid diagrams, code tabs, image optimization)
  4. Chapters are ranked by priority based on consultant usage frequency and learner progression importance
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Pre-Flight | 2/2 | ✓ Complete | 2026-01-31 |
| 2. Search & Visual Tooling | 2/2 | ✓ Complete | 2026-01-31 |
| 3. Navigation & Design Polish | 2/3 | In progress | - |
| 4. Content Audit | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-31*
*Last updated: 2026-01-31 — Plan 03-02 complete (homepage redesign with Hero, features, grouped cards)*
