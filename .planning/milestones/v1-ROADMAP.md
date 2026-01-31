# Milestone v1: Platform Foundations

**Status:** SHIPPED 2026-01-31
**Phases:** 1-4
**Total Plans:** 11

## Overview

This milestone transformed the BBj DWC Training Course from a functional static site into a polished, searchable, and consultant-ready platform. The work progressed from resolving foundational risks (config flags, CI, compatibility), through enabling search and visual tooling (local search, Mermaid, image optimization), into design and navigation polish (homepage, responsive, sidebar), and culminated with a structured content audit that leverages the new platform capabilities. All 18 v1 requirements were covered across 4 phases.

## Phases

### Phase 1: Pre-Flight

**Goal**: The site builds cleanly with all config issues resolved and CI catches type errors before deployment
**Depends on**: Nothing (first phase)
**Requirements**: PRE-01, PRE-02, PRE-03, PRE-04
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Config cleanup: remove future.v4 flag, migrate deprecation warning, fix baseUrl docs (PRE-01, PRE-02, PRE-03)
- [x] 01-02-PLAN.md — CI hardening: add typecheck to pipeline, enable PR validation (PRE-04)

**Success Criteria (all verified):**
1. The `future.v4` flag is either documented as intentional or removed, and the decision is recorded
2. React 19 compatibility with Algolia search, Mermaid, and ideal-image plugins is verified (or a mitigation path chosen)
3. `baseUrl` is consistent across all configuration and matches the deployed GitHub Pages URL
4. A push to main that introduces a TypeScript error fails the CI pipeline before the build step

### Phase 2: Search & Visual Tooling

**Goal**: Users can search the entire course and authors can use diagrams, optimized images, and copy-enabled code blocks
**Depends on**: Phase 1
**Requirements**: SRCH-01, SRCH-02, SRCH-03, SRCH-04, VIS-01, VIS-02, VIS-03, VIS-04
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Plugin installation and configuration: Mermaid, local search, ideal-image, zooming, copy button verification, example diagram
- [x] 02-02-PLAN.md — Image optimization migration: convert 45 PNG/JPG references across 9 doc files to IdealImage components

**Success Criteria (all verified):**
1. A user can type a search term and see relevant results with context snippets linking to specific sections across all 12 chapters
2. Pressing Cmd+K (Mac) or Ctrl+K (Windows) opens the search modal from any page
3. Search is configured for future i18n compatibility (Algolia deferred; local search implemented)
4. An author can write a Mermaid code block in Markdown and it renders as a diagram on the published page
5. Every code block across the site shows a copy button, and clicking it copies the code to clipboard
6. Images load at appropriate sizes for the user's viewport (responsive image optimization active)

### Phase 3: Navigation & Design Polish

**Goal**: The site looks polished enough to show prospects and clients, with intuitive navigation for both learners and consultants
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, DES-01, DES-02, DES-03
**Plans**: 3 plans

Plans:
- [x] 03-01-PLAN.md — Foundation: sidebar restructuring into 4 sections, green-to-blue color palette, template cleanup (NAV-01, DES-02)
- [x] 03-02-PLAN.md — Homepage redesign: Hero component, text-focused feature highlights, grouped chapter cards, closing CTA (DES-01, DES-02)
- [x] 03-03-PLAN.md — Visual verification: responsive, dark mode, cross-browser acceptance checkpoint (NAV-02, NAV-03, DES-03)

**Success Criteria (all verified):**
1. Sidebar chapters are grouped into logical sections (Getting Started, Core Concepts, Advanced Topics, Deployment)
2. The homepage has been redesigned with a modern, polished look worthy of client-facing presentations
3. All custom components render correctly on mobile, tablet, and desktop in Chrome, Firefox, and Safari
4. Dark mode works correctly with all components including Mermaid diagrams, new design elements, and search UI
5. Visual design is consistent across all custom components

### Phase 4: Content Audit

**Goal**: Every chapter has been evaluated and there is a clear, prioritized list of what to improve when content depth work begins in v2
**Depends on**: Phase 2 (tooling awareness), Phase 3 (design standards)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Plans**: 4 plans

Plans:
- [x] 04-01-PLAN.md — Audit Critical-tier foundation chapters (Ch01, Ch02)
- [x] 04-02-PLAN.md — Audit Important-tier chapters (Ch03, Ch04, Ch05) and Critical-tier Ch06
- [x] 04-03-PLAN.md — Audit Nice-to-have tier chapters (Ch07, Ch08, Ch09, Ch10, Ch11, Ch12)
- [x] 04-04-PLAN.md — Summary rollup: tier ranking, cross-chapter patterns, top recommendations

**Success Criteria (all verified):**
1. All 12 chapters have been audited with documented assessments covering clarity, logical flow, completeness, and relevance
2. Each chapter has a specific list of identified content gaps
3. Each chapter has actionable improvement recommendations that reference available tooling
4. Chapters are ranked by priority based on learner progression importance

---

## Milestone Summary

**Key Decisions:**

- [01-01 PRE-01]: Removed future.v4 flag due to CSS Cascade Layers production bug (Issue #11567)
- [01-01 PRE-02]: React 19 confirmed compatible with all Phase 2 plugins — no downgrade needed
- [01-01 PRE-03]: CLAUDE.md baseUrl corrected from /bbj-dwc-tutorial/ to /DWC-Course/
- [01-02 PRE-04]: Typecheck step placed between npm ci and npm run build for fast failure
- [02-01]: Used @easyops-cn/docusaurus-search-local instead of Algolia — immediate, no approval needed
- [02-01]: Mermaid diagram placed in chapter 1 index
- [02-02]: 45 PNG images converted; GIF files excluded from migration (breaks animation)
- [03-01 NAV-01]: Chapters grouped 1-3 Getting Started, 4-6 Core Concepts, 7-11 Advanced Topics, 12 Deployment
- [03-01 DES-02]: Blue palette uses Tailwind Blue scale — #2563eb light, #60a5fa dark, WCAG-AA compliant
- [03-02 DES-01]: Homepage structured as Hero -> Features -> Cards -> CTA, all text-focused
- [04-04 CONT-11]: Ch04 and Ch05 elevated to Critical tier — zero inline code blocks
- [04-04 CONT-12]: Completeness (2.7) and Code Examples Quality (2.7) are systemic curriculum weaknesses

**Issues Resolved:**

- future.v4 CSS Cascade Layers production bug eliminated
- baseUrl discrepancy between config and documentation fixed
- CI pipeline now catches TypeScript errors before deployment
- All 45 PNG images now have responsive sizing and blur-up placeholders

**Issues Deferred:**

- Algolia DocSearch integration (local search used instead; Algolia available as future upgrade)
- contextualSearch for i18n (Algolia-specific feature, deferred with Algolia)

**Technical Debt Incurred:**

- Phase 2 image count discrepancy: Summary claimed 10 images for Ch06, actual is 9 (documentation-only)
- Content quality: Ch04 and Ch05 have zero inline code blocks (tracked for v2)
- Content depth: 7 of 12 chapters under 150 lines (tracked for v2)

---

_For current project status, see .planning/ROADMAP.md_
_Archived: 2026-01-31_
