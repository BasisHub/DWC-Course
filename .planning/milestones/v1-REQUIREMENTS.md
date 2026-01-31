# Requirements Archive: v1 Platform Foundations

**Archived:** 2026-01-31
**Status:** SHIPPED

This is the archived requirements specification for v1.
For current requirements, see `.planning/REQUIREMENTS.md` (created for next milestone).

---

# Requirements: BBj DWC Training Course Enhancement

**Defined:** 2026-01-31
**Core Value:** The definitive, go-to resource for learning and adopting DWC -- so good that developers want to come back, consultants reach for it in meetings, and all language communities feel included.

## v1 Requirements

Requirements for initial release. Focus: platform foundations, search, visual polish, and content audit.

### Pre-Flight

- [x] **PRE-01**: Resolve `future.v4: true` flag -- decide keep/remove before any plugin integration
- [x] **PRE-02**: Verify React 19 compatibility with all planned Docusaurus plugins
- [x] **PRE-03**: Resolve baseUrl discrepancy (`/DWC-Course/` vs `/bbj-dwc-tutorial/`) in config
- [x] **PRE-04**: Add `npm run typecheck` to GitHub Actions CI pipeline before build step

### Search & Discovery

- [x] **SRCH-01**: Full-text search across all course content (local search; Algolia deferred to future enhancement)
- [x] **SRCH-02**: Search accessible via keyboard shortcut (Cmd+K / Ctrl+K)
- [x] **SRCH-03**: Search results show context snippets and link to specific sections
- [x] **SRCH-04**: Search configured for future i18n compatibility (Algolia contextualSearch deferred with Algolia integration)

### Navigation & UX

- [x] **NAV-01**: Sidebar chapters grouped into logical sections (e.g., "Getting Started", "Core Concepts", "Advanced Topics", "Deployment")
- [x] **NAV-02**: Responsive audit -- ChapterCards and HomepageFeatures components render correctly on mobile/tablet
- [x] **NAV-03**: All custom components tested across Chrome, Firefox, Safari at mobile/tablet/desktop breakpoints

### Code & Visual Enhancements

- [x] **VIS-01**: Mermaid diagrams enabled via `@docusaurus/theme-mermaid` -- architecture and flow diagrams renderable from Markdown
- [x] **VIS-02**: Code block copy button enabled across all code blocks
- [x] **VIS-03**: Image optimization via `@docusaurus/plugin-ideal-image` -- responsive sizing, quality optimization for PNG screenshots
- [x] **VIS-04**: BBj syntax highlighting verified working with Prism (already supported -- confirm in current config)

### Visual Design & Polish

- [x] **DES-01**: Homepage redesigned to feel polished and modern -- worthy of showing to prospects
- [x] **DES-02**: Consistent visual language across all custom components (cards, icons, spacing)
- [x] **DES-03**: Dark mode verified working with all new components and Mermaid diagrams

### Content Audit

- [x] **CONT-01**: All 12 chapters audited for clarity, logical flow, and completeness
- [x] **CONT-02**: Content gaps identified and documented per chapter (what's missing, what's unclear)
- [x] **CONT-03**: Recommendations produced for each chapter (specific improvements needed)
- [x] **CONT-04**: Priority ranking of chapters by consultant usage frequency and learner progression

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PRE-01 | Phase 1 | Complete |
| PRE-02 | Phase 1 | Complete |
| PRE-03 | Phase 1 | Complete |
| PRE-04 | Phase 1 | Complete |
| SRCH-01 | Phase 2 | Complete (local search; Algolia deferred) |
| SRCH-02 | Phase 2 | Complete |
| SRCH-03 | Phase 2 | Complete |
| SRCH-04 | Phase 2 | Complete (Algolia contextualSearch deferred) |
| VIS-01 | Phase 2 | Complete |
| VIS-02 | Phase 2 | Complete |
| VIS-03 | Phase 2 | Complete |
| VIS-04 | Phase 2 | Complete |
| NAV-01 | Phase 3 | Complete |
| NAV-02 | Phase 3 | Complete |
| NAV-03 | Phase 3 | Complete |
| DES-01 | Phase 3 | Complete |
| DES-02 | Phase 3 | Complete |
| DES-03 | Phase 3 | Complete |
| CONT-01 | Phase 4 | Complete |
| CONT-02 | Phase 4 | Complete |
| CONT-03 | Phase 4 | Complete |
| CONT-04 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 18 total
- Shipped: 18
- Unmapped: 0

---

## Milestone Summary

**Shipped:** 18 of 18 v1 requirements

**Adjusted:**
- SRCH-01: Changed from "Algolia DocSearch integrated" to "Full-text search (local search; Algolia deferred)" — Algolia requires approval process; local search provides equivalent UX immediately
- SRCH-04: Changed from "contextualSearch: true configured" to "Search configured for future i18n compatibility (Algolia contextualSearch deferred)" — contextualSearch is Algolia-specific

**Dropped:** None

---
*Archived: 2026-01-31 as part of v1 milestone completion*
