# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-31)

**Core value:** The definitive, go-to resource for learning and adopting DWC -- so good that developers want to come back, consultants reach for it in meetings, and all language communities feel included.
**Current focus:** Phase 2: Search & Visual Tooling (complete)

## Current Position

Phase: 2 of 4 (Search & Visual Tooling)
Plan: 2 of 2 in current phase
Status: Phase complete
Last activity: 2026-01-31 -- Completed 02-02-PLAN.md (image migration: 45 PNGs to IdealImage across 9 files)

Progress: [█████░░░░░] ~57% (4 of ~7 estimated plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: ~2 min
- Total execution time: ~8 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Pre-Flight | 2/2 | ~2 min | ~1 min |
| 2. Search & Visual Tooling | 2/2 | ~6 min | ~3 min |

**Recent Trend:**
- Last 5 plans: 01-01 (~1 min), 01-02 (1 min), 02-01 (3 min), 02-02 (3 min)
- Trend: Consistent

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: 4 phases derived from 18 v1 requirements -- Pre-Flight, Search & Visual Tooling, Nav & Design Polish, Content Audit
- [Roadmap]: Search (SRCH) and Visual (VIS) requirements grouped into one phase -- both are plugin/config-level tooling enablement
- [Roadmap]: Navigation (NAV) and Design (DES) requirements grouped into one phase -- both target the visual/navigational experience
- [01-01 PRE-01]: Removed future.v4 flag due to CSS Cascade Layers production bug (Issue #11567)
- [01-01 PRE-02]: React 19 confirmed compatible with all Phase 2 plugins (Algolia, Mermaid, ideal-image) -- no downgrade needed
- [01-01 PRE-03]: CLAUDE.md baseUrl corrected from /bbj-dwc-tutorial/ to /DWC-Course/
- [01-02 PRE-04]: Typecheck step placed between npm ci and npm run build for fast failure
- [01-02 PRE-04]: Deploy guard condition on deploy job only -- build job runs on all triggers for full PR validation
- [02-01 VIS-01]: Used @easyops-cn/docusaurus-search-local instead of Algolia -- immediate, no approval needed
- [02-01 VIS-02]: Mermaid diagram placed in chapter 1 index (docs/03-dwc-overview does not exist in project)
- [02-01 VIS-03]: themeConfig mermaid and zooming keys pass TypeScript typecheck without type assertion workaround
- [02-02 VIS-04]: 45 PNG images converted (plan estimated 44; chapter 02 has 5 PNGs not 4)
- [02-02 VIS-05]: GIF files excluded from migration -- IdealImage processes images at build time which breaks GIF animation

### Pending Todos

None.

### Blockers/Concerns

- ~~Research flagged React 19 + `future.v4` compatibility as a risk for plugin integration~~ RESOLVED in 01-01: future.v4 removed, React 19 confirmed compatible
- ~~Algolia DocSearch free program may reject commercial training content -- Phase 2 needs fallback plan (local search plugin)~~ RESOLVED in 02-01: Local search implemented as primary solution, Algolia available as optional future upgrade

## Session Continuity

Last session: 2026-01-31
Stopped at: Completed 02-02-PLAN.md -- Phase 2 complete, ready for Phase 3 (Nav & Design Polish)
Resume file: None
