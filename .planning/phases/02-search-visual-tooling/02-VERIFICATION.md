---
phase: 02-search-visual-tooling
verified: 2026-01-31T18:30:00Z
status: gaps_found
score: 5/6 must-haves verified
gaps:
  - truth: "Search is Algolia DocSearch with contextualSearch: true"
    status: failed
    reason: "Implementation uses local search plugin instead of Algolia DocSearch"
    artifacts:
      - path: "docusaurus.config.ts"
        issue: "Uses @easyops-cn/docusaurus-search-local, not Algolia DocSearch"
      - path: "docusaurus.config.ts"
        issue: "No contextualSearch: true option (not applicable to local search)"
    missing:
      - "Algolia DocSearch plugin registration"
      - "contextualSearch: true configuration for i18n compatibility"
      - "Algolia application ID and API key"
    requirements_blocked:
      - "SRCH-01: Algolia DocSearch integrated"
      - "SRCH-04: Search configured with contextualSearch: true"
human_verification:
  - test: "Open site in browser, press Cmd+K (Mac) or Ctrl+K (Windows)"
    expected: "Search modal opens and accepts keyboard input"
    why_human: "Interactive UI behavior requires browser testing"
  - test: "Type a search term like 'validation' and press Enter"
    expected: "Search results appear with context snippets and links to specific sections"
    why_human: "Search result quality and context snippet accuracy require human judgment"
  - test: "Navigate to a page with Mermaid diagram (chapter 1), toggle dark mode"
    expected: "Diagram renders with neutral theme in light mode, dark theme in dark mode"
    why_human: "Visual appearance and theme switching require visual inspection"
  - test: "Hover over any code block on the site"
    expected: "Copy button appears in top-right corner of code block"
    why_human: "Visual UI element requires browser inspection"
  - test: "Click the copy button on a code block"
    expected: "Code is copied to clipboard, button shows feedback animation"
    why_human: "Interactive behavior and clipboard access require manual testing"
  - test: "Click on any image (PNG) on the site"
    expected: "Image zooms in with lightbox overlay, background dims, click outside to close"
    why_human: "Click-to-zoom behavior requires manual interaction"
  - test: "Load a page with images on mobile viewport (Chrome DevTools device mode)"
    expected: "Images load at appropriate sizes with blur-up placeholders, responsive sizing"
    why_human: "Responsive behavior and placeholder animation require visual inspection"
---

# Phase 2: Search & Visual Tooling Verification Report

**Phase Goal:** Users can search the entire course and authors can use diagrams, optimized images, and copy-enabled code blocks

**Verified:** 2026-01-31T18:30:00Z

**Status:** gaps_found

**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Search bar appears in navbar and Cmd+K / Ctrl+K opens it | ✓ VERIFIED | docusaurus.config.ts lines 34-46: search plugin registered with searchBarShortcut: true, searchBarShortcutKeymap: "mod+k" |
| 2 | Mermaid code blocks render as diagrams with light/dark theme support | ✓ VERIFIED | docusaurus.config.ts lines 25-30 (markdown.mermaid: true), lines 32-33 (theme-mermaid registered), lines 148-152 (theme config). Example diagram in docs/01-gui-to-bui-to-dwc/index.md lines 14-24 |
| 3 | Every code block has a copy-to-clipboard button | ✓ VERIFIED | docusaurus.config.ts lines 143-147: Prism config with no disabling settings. Copy button is default-enabled in Docusaurus theme-classic |
| 4 | Images load at appropriate sizes for user's viewport | ✓ VERIFIED | docusaurus.config.ts lines 50-62: ideal-image plugin configured with responsive sizing (quality: 85, max: 1030, min: 640, steps: 2) |
| 5 | All PNG/JPG images use IdealImage components with blur-up placeholders | ✓ VERIFIED | 44 PNG images migrated across 9 files. Zero remaining PNG/JPG Markdown images. All files have IdealImage import. Build succeeds with no broken require() paths |
| 6 | Search is Algolia DocSearch with contextualSearch: true for i18n | ✗ FAILED | docusaurus.config.ts uses @easyops-cn/docusaurus-search-local (local search), not Algolia DocSearch. No contextualSearch option (Algolia-specific setting) |

**Score:** 5/6 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docusaurus.config.ts` | All plugin registrations: Mermaid, search, ideal-image, zooming | ✓ VERIFIED | Lines 25-30 (mermaid), 32-47 (search theme), 50-62 (plugins array). All substantive (19 lines config) and wired (plugins loaded at build) |
| `package.json` | 4 dependencies: theme-mermaid, plugin-ideal-image, search-local, plugin-zooming | ✓ VERIFIED | Lines 19-22, 25: all 4 packages present with correct versions. Installed in node_modules |
| `docs/01-gui-to-bui-to-dwc/index.md` | Example Mermaid diagram | ✓ VERIFIED | Lines 14-24: Mermaid diagram showing DWC architecture flow. 9 lines substantive content |
| `docs/02-browser-developer-tools/02-developer-tools.md` | 5 migrated PNG images, 1 GIF preserved | ✓ VERIFIED | Line 6: IdealImage import. 5 Image components with require(). Line 122: GIF in standard Markdown |
| `docs/05-dwc-controls/index.md` | 7 migrated PNG images | ✓ VERIFIED | Line 6: IdealImage import. 7 Image components throughout file |
| `docs/06-flow-layouts/index.md` | 9 migrated PNG images | ⚠️ PARTIAL | Line 6: IdealImage import. 9 Image components found (SUMMARY claimed 10, but actual is 9) |
| `docs/08-control-validation/index.md` | 10 migrated PNG images, 3 GIFs preserved | ✓ VERIFIED | Line 6: IdealImage import. 10 Image components. Lines 63, 105, 123: 3 GIFs in standard Markdown |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| docusaurus.config.ts | package.json dependencies | npm | ✓ WIRED | All 4 plugin packages installed in node_modules and referenced in config |
| docusaurus.config.ts themes array | @docusaurus/theme-mermaid | theme registration | ✓ WIRED | Line 33: theme-mermaid in themes array. Package exists in node_modules |
| docusaurus.config.ts themes array | @easyops-cn/docusaurus-search-local | theme registration with config | ✓ WIRED | Lines 34-47: search-local registered with full config object |
| docusaurus.config.ts plugins array | @docusaurus/plugin-ideal-image | plugin registration | ✓ WIRED | Lines 51-60: ideal-image with quality/sizing config |
| docs/*.md Image components | @theme/IdealImage | import statement | ✓ WIRED | All 9 files have import line after frontmatter. Used 44 times across docs |
| Image components | static/img/*.png | require('@site/static/img/...') | ✓ WIRED | Build succeeds, proving all require() paths resolve. Sample: docs/06-flow-layouts/index.md line 22 → static/img/CSSFlexbox.png |
| docusaurus.config.ts plugin-ideal-image | static/img/*.png | webpack loader | ✓ WIRED | Build generates optimized image variants. Search index created at build/search-index.json |

### Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| SRCH-01: Algolia DocSearch integrated | ✗ BLOCKED | Implementation uses local search plugin, not Algolia |
| SRCH-02: Search accessible via Cmd+K / Ctrl+K | ✓ SATISFIED | searchBarShortcut: true, searchBarShortcutKeymap: "mod+k" |
| SRCH-03: Search results show context snippets | ? NEEDS HUMAN | searchResultContextMaxLength: 50 configured, but actual result display requires browser testing |
| SRCH-04: contextualSearch: true for i18n | ✗ BLOCKED | contextualSearch is Algolia-specific, not applicable to local search plugin |
| VIS-01: Mermaid diagrams enabled | ✓ SATISFIED | theme-mermaid registered, markdown.mermaid: true, example diagram in chapter 1 |
| VIS-02: Code block copy button | ✓ SATISFIED | Default-enabled in theme-classic, no config disabling it |
| VIS-03: Image optimization via ideal-image | ✓ SATISFIED | Plugin configured with quality 85, responsive sizing, 44 images migrated |
| VIS-04: BBj syntax highlighting verified | ✓ SATISFIED | prism.additionalLanguages includes 'bbj' |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| docusaurus.config.ts | 35 | Wrong search plugin | ⚠️ Warning | Requirements SRCH-01 and SRCH-04 specify Algolia DocSearch but implementation uses local search. Functional but not per spec |
| docs/06-flow-layouts/index.md | N/A | Count discrepancy | ℹ️ Info | SUMMARY claimed 10 images migrated but actual count is 9. Minor documentation error, no functional impact |

### Human Verification Required

7 items require manual browser testing:

#### 1. Search Modal Opens with Keyboard Shortcut

**Test:** Open the site in a browser (after `npm run serve`), press Cmd+K (Mac) or Ctrl+K (Windows)

**Expected:** Search modal appears and accepts keyboard input

**Why human:** Interactive UI behavior requires actual browser interaction to verify the keyboard event handler works

#### 2. Search Results with Context Snippets

**Test:** In the search modal, type "validation" and press Enter

**Expected:** Results appear with context snippets showing surrounding text and links to specific sections across chapters

**Why human:** Search result quality, context snippet accuracy, and link behavior require human judgment of relevance

#### 3. Mermaid Diagram Theme Switching

**Test:** Navigate to /gui-to-bui-to-dwc (chapter 1 index), toggle dark mode in the navbar

**Expected:** Diagram renders with neutral theme colors in light mode, switches to dark theme in dark mode

**Why human:** Visual appearance and theme transition require visual inspection across color modes

#### 4. Code Block Copy Button Appears

**Test:** Navigate to /control-validation, hover mouse over any BBj code block

**Expected:** Copy button appears in top-right corner of code block on hover

**Why human:** Visual UI element appearance requires browser rendering inspection

#### 5. Copy Button Functionality

**Test:** Click the copy button on a code block, then paste (Cmd+V / Ctrl+V) into a text editor

**Expected:** Full code from the block is copied to clipboard, button shows visual feedback (checkmark or animation)

**Why human:** Clipboard API interaction and visual feedback require manual testing

#### 6. Image Click-to-Zoom Lightbox

**Test:** Click on any PNG image (e.g., docs/05-dwc-controls screenshot)

**Expected:** Image zooms in with lightbox overlay, background dims to rgba(101,108,133,0.8) in light mode, click outside or ESC to close

**Why human:** Click interaction, zoom animation, and lightbox behavior require manual interaction

#### 7. Responsive Image Loading with Placeholders

**Test:** Open Chrome DevTools, switch to mobile device mode (e.g., iPhone 12), load /flow-layouts page, throttle network to "Fast 3G"

**Expected:** Images load progressively with blur-up placeholders, appropriate sizes for viewport (640-1030px variants), no layout shift

**Why human:** Responsive behavior, placeholder animation, and network loading require visual inspection across viewports

### Gaps Summary

**1 critical gap blocks Phase 2 goal achievement:**

The implementation uses **@easyops-cn/docusaurus-search-local** (local search plugin) instead of **Algolia DocSearch** as specified in requirements SRCH-01 and the phase goal success criteria. This creates two requirement gaps:

1. **SRCH-01 (Algolia DocSearch)** - The requirement explicitly states "Algolia DocSearch integrated". Local search is a different plugin with different capabilities.

2. **SRCH-04 (contextualSearch: true)** - This is an Algolia-specific configuration option for multi-locale sites. It does not exist in the local search plugin. The requirement states this must be configured "for future i18n compatibility".

**Why this matters:**

- **Requirement compliance:** Requirements explicitly specify Algolia DocSearch, not local search
- **i18n compatibility:** When Phase 3 or later adds multiple locales, Algolia's contextualSearch option prevents cross-locale search pollution. Local search has different i18n behavior
- **Decision authority:** SUMMARY acknowledges this as a "decision" but requirements are user-defined goals, not implementation suggestions

**What's working:**

- Search functionality exists and generates indices at build time (build/search-index.json created)
- Keyboard shortcut configured (Cmd+K / Ctrl+K)
- Context snippets configured (searchResultContextMaxLength: 50)
- All search UX goals may be met functionally

**What's missing:**

- Algolia DocSearch plugin registration
- Algolia application ID and API key configuration
- contextualSearch: true flag in search config

**Remediation path:**

1. Apply for Algolia DocSearch (may require approval for commercial training content)
2. Replace local search plugin with Algolia theme in docusaurus.config.ts
3. Add contextualSearch: true to Algolia config
4. OR: Get explicit user approval to change requirement from Algolia to local search

---

_Verified: 2026-01-31T18:30:00Z_

_Verifier: Claude (gsd-verifier)_
