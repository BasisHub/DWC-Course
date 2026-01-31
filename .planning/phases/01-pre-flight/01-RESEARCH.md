# Phase 1: Pre-Flight - Research

**Researched:** 2026-01-31
**Domain:** Docusaurus configuration, React 19 compatibility, GitHub Actions CI
**Confidence:** HIGH

## Summary

This phase resolves four configuration items before any feature work: removing the `future.v4` flag, verifying React 19 plugin compatibility, auditing baseUrl consistency, and adding typecheck to CI. The codebase is Docusaurus 3.9.2 with React 19.2.3.

Research confirms all four requirements are straightforward with no blocking issues. The `future.v4` flag should be removed as decided -- it enables CSS Cascade Layers which has a known production bug in 3.9.2 (media queries escaping cascade layers). React 19 is fully compatible with all three target plugins at version 3.9.2. The baseUrl `/DWC-Course/` is correct; only CLAUDE.md has an incorrect reference. CI typecheck is a single line addition to the existing workflow.

**Primary recommendation:** Execute all four changes in sequence, verify with a clean build after each config change, and confirm CI catches type errors with a test push.

## Standard Stack

No new libraries are needed for this phase. All work is configuration changes.

### Current Stack (Verified)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| @docusaurus/core | 3.9.2 | Site framework | Current stable |
| @docusaurus/preset-classic | 3.9.2 | Default theme + plugins | Current stable |
| react | 19.2.3 | UI framework | Installed, compatible |
| react-dom | 19.2.3 | React DOM renderer | Installed, compatible |
| typescript | ~5.6.2 | Type checking | Installed, works |

### Phase 2 Plugins (Compatibility Verified)
| Plugin | React 19 Status | Version to Use | Notes |
|--------|----------------|----------------|-------|
| @docusaurus/theme-search-algolia | Compatible | 3.9.2 | Updated for React 19 in v3.7; DocSearch v4 in v3.9 |
| @docusaurus/theme-mermaid | Compatible | 3.9.2 | Updated for React 19 in v3.7; ELK layout bug fixed in 3.9.2 |
| @docusaurus/plugin-ideal-image | Compatible | 3.9.2 | react-waypoint internalized in PR #11014 (March 2025), no peer dep warnings |

**No React downgrade needed.** All three target plugins work with React 19 at Docusaurus 3.9.2.

## Architecture Patterns

### PRE-01: Removing `future.v4: true`

**What the flag does:** `future.v4: true` is a shorthand that enables all v4 future flags simultaneously. In Docusaurus 3.9.2, this activates two sub-flags:
1. `removeLegacyPostBuildHeadAttribute` -- Removes legacy `head` param from `postBuild()` API. Required for SSG worker threads optimization.
2. `useCssCascadeLayers` -- Wraps Docusaurus/Infima CSS in cascade layers. Intended to reduce CSS specificity conflicts.

**Why remove it:**
- The `useCssCascadeLayers` flag has a known bug in 3.9.2: CSS media queries escape their cascade layers in production builds (GitHub Issue #11567)
- This site has custom CSS (external link icon styles in `custom.css`) that could be affected
- Docusaurus 4 has no release date and is still in early planning (GitHub Milestone #21 is open with many issues)
- Removing the flag is a safe default -- the sub-flags provide build speed optimizations and CSS isolation that are not needed for this project's scale

**Action:** Delete lines 10-12 from `docusaurus.config.ts`:
```typescript
// REMOVE these lines:
  future: {
    v4: true,
  },
```

**Verification:** Run `npm run build` and confirm:
- No new warnings appear
- The `onBrokenMarkdownLinks` deprecation warning persists (it is unrelated to `future.v4`)
- Site renders correctly with `npm run serve`

### PRE-02: React 19 Compatibility Verification

**Finding: No action required.** All three Phase 2 plugins are confirmed compatible with React 19 at Docusaurus 3.9.2.

Evidence:
- Docusaurus 3.7 (released early 2025) added React 19 support across all official plugins including `docusaurus-plugin-ideal-image`, `docusaurus-theme-mermaid`, and `docusaurus-theme-search-algolia` (PR #10763)
- The `react-waypoint` peer dependency issue in `plugin-ideal-image` was fixed by internalizing the dependency (PR #11014, merged March 2025)
- The mermaid ELK layout regression in 3.9.1 was fixed in 3.9.2 release notes
- The project already runs React 19.2.3 and builds cleanly

**Verification approach:** The build succeeding is sufficient proof. For extra confidence, install each plugin one at a time in Phase 2 and verify no peer dependency warnings appear.

### PRE-03: baseUrl Consistency Audit

**Finding:** The `baseUrl: '/DWC-Course/'` in `docusaurus.config.ts` is correct. The discrepancy exists only in documentation.

Files audited and their status:

| File | Reference | Correct? |
|------|-----------|----------|
| `docusaurus.config.ts` line 15 | `baseUrl: '/DWC-Course/'` | YES |
| `docusaurus.config.ts` line 14 | `url: 'https://BasisHub.github.io'` | YES |
| `docusaurus.config.ts` line 18 | `organizationName: 'BasisHub'` | YES |
| `docusaurus.config.ts` line 19 | `projectName: 'DWC-Course'` | YES |
| `.github/workflows/deploy.yml` | No hardcoded baseUrl | OK (no issue) |
| `README.md` line 5 | `https://BasisHub.github.io/DWC-Course/` | YES |
| `CLAUDE.md` line 49 | `Base URL is /bbj-dwc-tutorial/` | **WRONG -- must fix** |
| `docs/samples.md` line 15 | `git clone https://github.com/BasisHub/DWC-Course.git` | YES |
| `tsconfig.json` line 5 | `"baseUrl": "."` | N/A (TypeScript module resolution, not site URL) |

**Action:** Fix CLAUDE.md line 49 to say `/DWC-Course/` instead of `/bbj-dwc-tutorial/`. No changes needed to any functional configuration files.

### PRE-04: Adding Typecheck to CI

**Current state of CI (`deploy.yml`):**
```yaml
steps:
  - Checkout
  - Setup Node.js (20)
  - Install dependencies (npm ci)
  - Build website (npm run build)
  - Upload artifact
```

**Current typecheck script:** `"typecheck": "tsc"` in `package.json`. The `@docusaurus/tsconfig` base config already sets `noEmit: true`, so `tsc` runs as a pure type checker. Verified: `npm run typecheck` passes cleanly on the current codebase.

**Action:** Add a typecheck step between "Install dependencies" and "Build website":
```yaml
      - name: Type check
        run: npm run typecheck

      - name: Build website
        run: npm run build
```

**Why before build, not after:** A type error should fail the pipeline immediately without wasting time on a full build. TypeScript compilation is fast (~2-3 seconds on this project).

**Scope expansion consideration:** The CI currently only triggers on push to `main`. Consider also triggering on pull requests to `main` so type errors are caught before merge. This is standard practice but is at Claude's discretion per the CONTEXT.md.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type checking in CI | Custom tsc invocation with flags | `npm run typecheck` (existing script) | Already configured correctly with @docusaurus/tsconfig base |
| Plugin compatibility testing | Manual React version matrix | `npm ls` + `npm run build` | Docusaurus 3.9.2 already resolved all React 19 peer dep issues |
| baseUrl validation | Script to crawl built files | `npm run build` with `onBrokenLinks: 'throw'` | Docusaurus already validates all internal links at build time |

## Common Pitfalls

### Pitfall 1: Removing `future.v4` causes CSS regression
**What goes wrong:** If any CSS was written that depends on cascade layers being active (e.g., lower-specificity selectors that worked because layers gave them priority), removing the flag could change visual appearance.
**Why it happens:** `useCssCascadeLayers` changes how CSS specificity works.
**How to avoid:** Visual inspection of the site after removing the flag. This site has minimal custom CSS (variable overrides + external link icon), so risk is very low.
**Warning signs:** External link icons disappearing, color changes, layout shifts.

### Pitfall 2: Forgetting the deprecation warning is separate
**What goes wrong:** After removing `future.v4`, seeing the `onBrokenMarkdownLinks` deprecation warning and thinking the removal caused it.
**Why it happens:** The warning exists regardless of the `future.v4` flag -- it was introduced in Docusaurus 3.9.
**How to avoid:** Document that this warning is pre-existing and will be addressed separately (or not, since it is only a warning and the site builds fine).

### Pitfall 3: Confusing tsconfig `baseUrl` with Docusaurus `baseUrl`
**What goes wrong:** Someone sees `"baseUrl": "."` in `tsconfig.json` and thinks it conflicts with `baseUrl: '/DWC-Course/'` in `docusaurus.config.ts`.
**Why it happens:** Same name, completely different purpose. TypeScript's `baseUrl` controls module resolution paths. Docusaurus's `baseUrl` controls the URL path prefix for the deployed site.
**How to avoid:** The research has already clarified this. No action needed on `tsconfig.json`.

### Pitfall 4: CI typecheck passes but build fails (or vice versa)
**What goes wrong:** TypeScript `tsc` and the Docusaurus build use different compilation pipelines. `tsc` might pass while the build fails on MDX/webpack issues, or `tsc` flags errors that don't affect the build.
**Why it happens:** Docusaurus uses Babel/SWC for actual compilation, not `tsc`. The `tsc` check is a supplementary type-safety net.
**How to avoid:** Keep both steps. They catch different classes of errors. The typecheck catches type errors in `.ts`/`.tsx` files. The build catches broken links, missing assets, MDX errors, and webpack issues.

### Pitfall 5: Not triggering CI on pull requests
**What goes wrong:** A PR with type errors merges to `main` and breaks the deploy.
**Why it happens:** The current workflow only triggers on `push` to `main`, not on pull requests.
**How to avoid:** Add `pull_request: branches: [main]` to the workflow triggers. Note: the deploy job should only run on push to main, not on PRs. This requires restructuring to separate the build/check job from the deploy job, or adding a condition.

## Code Examples

### Removing `future.v4` from docusaurus.config.ts

Before:
```typescript
const config: Config = {
  title: 'BBj DWC Training',
  tagline: 'Dynamic Web Client Training Course',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://BasisHub.github.io',
  baseUrl: '/DWC-Course/',
  // ...
```

After:
```typescript
const config: Config = {
  title: 'BBj DWC Training',
  tagline: 'Dynamic Web Client Training Course',
  favicon: 'img/favicon.png',

  url: 'https://BasisHub.github.io',
  baseUrl: '/DWC-Course/',
  // ...
```

### Adding typecheck to GitHub Actions workflow

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Build website
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build
```

### Optional: Adding PR trigger to CI workflow

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:
```

With a condition on the deploy job to prevent deploying from PRs:
```yaml
  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    # ...
```

### Fixing CLAUDE.md baseUrl reference

Line 49 change:
```
Before: Base URL is `/bbj-dwc-tutorial/` (configured for GitHub Pages).
After:  Base URL is `/DWC-Course/` (configured for GitHub Pages).
```

## Bonus Finding: Deprecation Warning

The build currently emits this warning twice:
```
[WARNING] The `siteConfig.onBrokenMarkdownLinks` config option is deprecated and will be removed in Docusaurus v4.
Please migrate and move this option to `siteConfig.markdown.hooks.onBrokenMarkdownLinks` instead.
```

**Current config (line 23):**
```typescript
onBrokenMarkdownLinks: 'warn',
```

**Migration path:**
```typescript
// Remove from root config:
// onBrokenMarkdownLinks: 'warn',

// Add to config:
markdown: {
  hooks: {
    onBrokenMarkdownLinks: 'warn',
  },
},
```

This is not part of the PRE-01 through PRE-04 requirements, but it is a trivial fix that eliminates build warnings. The planner may choose to include it as a bonus task or defer it.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `future.v4: true` shorthand | Individual sub-flags or removal | Docusaurus 3.8+ | CSS cascade layers has known bugs; use selectively or not at all |
| `onBrokenMarkdownLinks` at root | `markdown.hooks.onBrokenMarkdownLinks` | Docusaurus 3.9 | Old location deprecated, still works with warning |
| react-waypoint in ideal-image | Internalized waypoint code | Docusaurus 3.9 (PR #11014) | React 19 peer dep issue resolved |
| Algolia DocSearch v3 | DocSearch v4 with AI | Docusaurus 3.9 | Optional upgrade, v3 still supported |

## Open Questions

1. **PR trigger scope for CI**
   - What we know: Current CI only triggers on push to main. Adding PR triggers is standard practice.
   - What's unclear: Whether the team uses PRs at all, or pushes directly to main.
   - Recommendation: Add PR trigger as part of PRE-04 (low risk, high value). The deploy job already won't run on PRs because it requires the build artifact from the same workflow run.

2. **Whether to fix the deprecation warning in this phase**
   - What we know: The `onBrokenMarkdownLinks` deprecation is trivial to fix (move config location).
   - What's unclear: Whether this falls in scope of "the site builds cleanly with all config issues resolved."
   - Recommendation: Include as optional/bonus task. It's a 2-line change that eliminates build warnings.

## Sources

### Primary (HIGH confidence)
- Docusaurus config source: `/Users/beff/_workspace/bbj-dwc-tutorial/docusaurus.config.ts` -- direct inspection
- Package.json: `/Users/beff/_workspace/bbj-dwc-tutorial/package.json` -- version verification
- CI workflow: `/Users/beff/_workspace/bbj-dwc-tutorial/.github/workflows/deploy.yml` -- direct inspection
- `npm ls react react-dom` output -- React 19.2.3 confirmed installed
- `npm run build` output -- build succeeds, deprecation warning confirmed
- `npm run typecheck` output -- passes cleanly
- [Docusaurus config API docs](https://docusaurus.io/docs/next/api/docusaurus-config) -- future.v4 sub-flags documented
- [Docusaurus 3.7 changelog](https://docusaurus.io/changelog/3.7.0) -- React 19 support for all plugins
- [GitHub Issue #11000](https://github.com/facebook/docusaurus/issues/11000) -- ideal-image React 19 fix (RESOLVED via PR #11014)
- [GitHub Issue #11470](https://github.com/facebook/docusaurus/issues/11470) -- Mermaid ELK regression (FIXED in 3.9.2)
- [Docusaurus releases](https://github.com/facebook/docusaurus/releases) -- 3.9.2 release notes confirm mermaid fix

### Secondary (MEDIUM confidence)
- [GitHub Issue #11567](https://github.com/facebook/docusaurus/issues/11567) -- CSS cascade layers media query bug in production
- [GitHub Discussion #11325](https://github.com/facebook/docusaurus/discussions/11325) -- Tailwind CSS issues with future.v4
- [PR #11283](https://github.com/facebook/docusaurus/pull/11283) -- onBrokenMarkdownLinks deprecation details
- [Docusaurus 4.0 Milestone](https://github.com/facebook/docusaurus/milestone/21) -- v4 still in planning, no release date

### Tertiary (LOW confidence)
- None. All findings verified with primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- versions verified from package.json and npm ls
- Architecture (v4 flag removal): HIGH -- sub-flags documented in official docs, bug confirmed in GitHub issues
- Architecture (React 19 compat): HIGH -- verified from changelogs, issue trackers, and build output
- Architecture (baseUrl): HIGH -- direct file inspection, only CLAUDE.md is wrong
- Architecture (CI typecheck): HIGH -- standard GitHub Actions pattern, typecheck already works locally
- Pitfalls: HIGH -- based on direct observation of build warnings and official bug reports

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (stable -- Docusaurus 3.x line is mature, no v4 expected soon)
