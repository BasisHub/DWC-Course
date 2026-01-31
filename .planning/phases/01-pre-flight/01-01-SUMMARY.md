---
phase: 01-pre-flight
plan: 01
subsystem: config
tags: [docusaurus, config, react-19, baseurl]
dependency-graph:
  requires: []
  provides:
    - "Clean Docusaurus config without future.v4 flag"
    - "Zero-warning build baseline"
    - "Accurate CLAUDE.md documentation"
    - "React 19 compatibility confirmation for Phase 2 plugins"
  affects:
    - "01-02 (GitHub Actions deploy workflow depends on clean build)"
    - "Phase 2 (plugin integration depends on stable config baseline)"
tech-stack:
  added: []
  patterns:
    - "markdown.hooks for broken link handling (Docusaurus 3.x pattern)"
key-files:
  created: []
  modified:
    - docusaurus.config.ts
    - CLAUDE.md
decisions:
  - id: PRE-01
    description: "Remove future.v4 flag due to CSS Cascade Layers production bug (Issue #11567)"
  - id: PRE-02
    description: "React 19 confirmed compatible with all Phase 2 plugins -- no downgrade needed"
  - id: PRE-03
    description: "CLAUDE.md baseUrl corrected from /bbj-dwc-tutorial/ to /DWC-Course/"
metrics:
  duration: "~1 min"
  completed: "2026-01-31"
---

# Phase 01 Plan 01: Config Cleanup and Pre-Flight Verification Summary

Clean Docusaurus config: removed future.v4 flag (CSS Cascade Layers bug avoidance), migrated deprecated onBrokenMarkdownLinks to markdown.hooks, fixed CLAUDE.md baseUrl to /DWC-Course/

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Remove future.v4 flag and migrate onBrokenMarkdownLinks | 53f9ca5 | docusaurus.config.ts |
| 2 | Fix CLAUDE.md baseUrl and document React 19 compatibility | a91896f | CLAUDE.md |

## What Was Done

### PRE-01: Remove future.v4 Flag

Removed the `future: { v4: true }` block from `docusaurus.config.ts`. This flag enabled Docusaurus v4 early features including CSS Cascade Layers, which has a known production bug (Issue #11567) causing style ordering issues. The site now builds on standard Docusaurus 3.9.2 behavior.

Additionally migrated the deprecated root-level `onBrokenMarkdownLinks: 'warn'` setting to the new `markdown.hooks.onBrokenMarkdownLinks` location. This eliminates the deprecation warning that appeared during builds.

### PRE-02: React 19 Compatibility Verification

React 19 (19.2.3) is fully compatible with all Phase 2 target plugins at Docusaurus 3.9.2:
- @docusaurus/theme-search-algolia (React 19 support since v3.7)
- @docusaurus/theme-mermaid (React 19 support since v3.7, ELK fix in 3.9.2)
- @docusaurus/plugin-ideal-image (react-waypoint internalized in PR #11014)

No React downgrade is needed. Phase 2 can proceed with React 19.

### PRE-03: CLAUDE.md baseUrl Correction

Fixed the Deployment section of CLAUDE.md which incorrectly stated the base URL as `/bbj-dwc-tutorial/`. The actual configured baseUrl in `docusaurus.config.ts` is `/DWC-Course/`, matching the GitHub repository name `BasisHub/DWC-Course`.

## Verification Results

- `npm run build`: SUCCESS -- zero warnings, clean build
- `npm run typecheck`: SUCCESS -- no type errors
- No `future:` block in config
- `markdown.hooks.onBrokenMarkdownLinks` properly configured
- CLAUDE.md references `/DWC-Course/`

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| PRE-01 | Remove future.v4 flag | CSS Cascade Layers production bug (Issue #11567) creates style ordering issues |
| PRE-02 | Keep React 19 (no downgrade) | All Phase 2 plugins confirmed compatible at Docusaurus 3.9.2 |
| PRE-03 | Fix CLAUDE.md baseUrl | Documentation must match actual config to avoid confusion |

## Next Phase Readiness

Phase 1 Plan 01 is complete. The config is clean and builds without warnings. Ready for:
- **01-02**: GitHub Actions workflow updates (depends on clean build baseline)
- **Phase 2**: Plugin integration can proceed with React 19 on stable config
