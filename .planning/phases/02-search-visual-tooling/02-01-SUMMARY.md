---
phase: 02-search-visual-tooling
plan: 01
subsystem: ui
tags: [docusaurus, mermaid, search, ideal-image, zooming, plugins]

# Dependency graph
requires:
  - phase: 01-pre-flight
    provides: Clean Docusaurus 3.9.2 build with typecheck gate and React 19 compatibility
provides:
  - Local full-text search with Cmd+K keyboard shortcut
  - Mermaid diagram rendering with light/dark theme support
  - Ideal-image plugin configured for responsive image optimization
  - Zooming lightbox configured for click-to-zoom image viewing
  - Example Mermaid diagram in chapter 1 (GUI to BUI to DWC)
affects: [02-02-image-migration, 03-nav-design-polish]

# Tech tracking
tech-stack:
  added:
    - "@docusaurus/theme-mermaid@3.9.2"
    - "@docusaurus/plugin-ideal-image@3.9.2"
    - "@easyops-cn/docusaurus-search-local@0.52.3"
    - "docusaurus-plugin-zooming@1.0.0"
  patterns:
    - "Local search with docsRouteBasePath matching docs routeBasePath"
    - "Mermaid diagrams via fenced code blocks with theme-aware colors"
    - "Zooming with 500ms delay for ideal-image lazy-load compatibility"

key-files:
  created: []
  modified:
    - "docusaurus.config.ts"
    - "package.json"
    - "package-lock.json"
    - "docs/01-gui-to-bui-to-dwc/index.md"

key-decisions:
  - "VIS-01: Used @easyops-cn/docusaurus-search-local instead of Algolia (immediate, no approval needed)"
  - "VIS-02: Mermaid diagram placed in chapter 1 index (docs/03-dwc-overview does not exist)"
  - "VIS-03: themeConfig mermaid and zooming keys pass TypeScript typecheck without type assertion workaround"

patterns-established:
  - "Plugin config: themes array for theme plugins, plugins array for build plugins"
  - "Mermaid usage: fenced code blocks with ```mermaid in any .md file"
  - "Search: local-only with build-time index generation (test with npm run serve, not npm start)"

# Metrics
duration: 3min
completed: 2026-01-31
---

# Phase 2 Plan 1: Plugin Foundation Summary

**Local search with Cmd+K shortcut, Mermaid diagrams with light/dark themes, ideal-image and zooming plugins configured, DWC architecture diagram added to chapter 1**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-31T09:14:23Z
- **Completed:** 2026-01-31T09:17:40Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- All four Phase 2 plugins installed and registered in docusaurus.config.ts
- Local full-text search operational with Cmd+K / Ctrl+K keyboard shortcut, build-time search index generated
- Mermaid diagram rendering enabled with theme-aware colors (neutral for light, dark for dark mode)
- DWC architecture flow diagram added to chapter 1 overview page illustrating the BBj server -> DWC runtime -> browser -> JS bridge event loop
- Ideal-image plugin ready for image migration (02-02) with quality 85, responsive sizing, and blur-up placeholders
- Zooming lightbox configured with 500ms delay to handle ideal-image lazy-loaded images
- Copy-to-clipboard button confirmed as default-enabled (no config changes needed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install plugins and configure docusaurus.config.ts** - `7cf2dc3` (feat)
2. **Task 2: Add Mermaid example diagram and verify copy button** - `fb37576` (feat)

## Files Created/Modified
- `docusaurus.config.ts` - Added markdown.mermaid, themes array (mermaid + search), plugins array (ideal-image + zooming), themeConfig.mermaid and themeConfig.zooming
- `package.json` - Four new dependencies added
- `package-lock.json` - 201 new packages (plugin dependency trees)
- `docs/01-gui-to-bui-to-dwc/index.md` - Added "How the DWC Works" section with Mermaid architecture diagram

## Decisions Made
- **Local search over Algolia:** Used @easyops-cn/docusaurus-search-local as the primary search solution. Algolia DocSearch requires application approval and may reject commercial training content. Local search works immediately with no external dependencies. Can swap to Algolia later if approved (themeConfig change only).
- **Diagram placement in chapter 1:** The plan specified `docs/03-dwc-overview/index.md` which does not exist. The chapter structure has no "DWC Overview" chapter. Placed the Mermaid diagram in `docs/01-gui-to-bui-to-dwc/index.md` instead -- it is the chapter that introduces DWC concepts and the GUI-to-DWC transition.
- **No type assertion workaround needed:** The `mermaid` and `zooming` themeConfig keys pass TypeScript typecheck with the existing `satisfies Preset.ThemeConfig` assertion. No `as any` casting or type broadening was needed.

## Deviations from Plan

### Plan Adjustments

**1. Mermaid diagram target file changed**
- **Plan specified:** `docs/03-dwc-overview/index.md`
- **Actual:** `docs/01-gui-to-bui-to-dwc/index.md`
- **Reason:** The `03-dwc-overview` directory does not exist in the project. Chapter 01 (GUI to BUI to DWC) is the natural location for DWC architecture content.
- **Impact:** None -- the diagram is placed in the most contextually appropriate location.

---

**Total deviations:** 1 plan adjustment (file path does not exist)
**Impact on plan:** Minimal. Diagram placed in equivalent location. All success criteria met.

## Issues Encountered
None -- all plugins installed cleanly, typecheck and build pass without errors. No compatibility issues encountered.

## User Setup Required
None -- no external service configuration required.

## Next Phase Readiness
- Ideal-image plugin is configured and ready for the image migration plan (02-02)
- Zooming plugin is active and will automatically apply to all `.markdown img` elements
- Search index will be generated on each production build
- All build and typecheck gates continue to pass

---
*Phase: 02-search-visual-tooling*
*Completed: 2026-01-31*
