# Phase 1: Pre-Flight - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Resolve configuration risks, verify plugin compatibility, and harden CI before any feature work. Four requirements: resolve the `future.v4` flag, verify React 19 compatibility with Phase 2 plugins, ensure baseUrl consistency, and add typecheck to CI. No new features are added in this phase.

</domain>

<decisions>
## Implementation Decisions

### The v4 flag
- Remove `future.v4: true` from docusaurus.config.ts
- Origin unknown (may be template or intentional) — doesn't matter, removing for stability
- Document the removal in the commit message only — no comment in config file
- Verify the site still builds cleanly after removal

### baseUrl resolution
- The repo lives at `BasisHub/DWC-Course` on GitHub — baseUrl `/DWC-Course/` is correct
- The local folder name `bbj-dwc-tutorial` caused the original concern — this is a non-issue
- Custom domain is not planned currently but may happen later — keep baseUrl as-is
- No immediate change needed to baseUrl value itself

### React 19 compatibility
- If plugins conflict with React 19, downgrade React to 18 — stability over bleeding edge
- Resolve compatibility in Phase 1 (pre-flight), not deferred to Phase 2
- This means: check all Phase 2 plugins (Algolia search, Mermaid, ideal-image) against React 19 now
- If downgrade is needed, do it as part of this phase so Phase 2 starts on a clean foundation

### Claude's Discretion
- Verification depth for React 19 compatibility (peer dep check vs full build test) — Claude decides based on what makes sense
- baseUrl audit scope — Claude checks config, CI workflow, and hardcoded paths for consistency and fixes what needs fixing
- CI pipeline structure for typecheck step — Claude implements using standard GitHub Actions patterns

</decisions>

<specifics>
## Specific Ideas

- The actual deployed site is at basishub.github.io/DWC-Course/ — all paths must work relative to that
- Prism.js already knows BBj as a language — this is confirmed and doesn't need verification work in this phase

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-pre-flight*
*Context gathered: 2026-01-31*
