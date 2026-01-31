# Phase 2: Search & Visual Tooling - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable full-text search, Mermaid diagrams, responsive image optimization, and code block copy buttons for the BBj DWC Training Course Docusaurus site. This phase installs and configures plugins/features — it does not redesign navigation, layout, or content structure (those are Phase 3 and 4).

</domain>

<decisions>
## Implementation Decisions

### Search experience
- Algolia DocSearch first — apply for free tier. If rejected, fall back to a local search plugin (docusaurus-search-local or lunr-based)
- Search results show page title + short text snippet around the match (1-2 lines of context)
- All 12 chapters indexed equally — results ranked purely by relevance, no weighting
- Enable `contextualSearch: true` for future i18n support — no additional search config needed
- Cmd+K / Ctrl+K keyboard shortcut required (standard Algolia/Docusaurus behavior)

### Mermaid diagrams
- Auto-adapt to site theme — diagrams switch colors when user toggles light/dark mode
- Enable the plugin and add one example diagram to an existing chapter where it adds the most value (Claude's discretion on placement and content)

### Image optimization
- Use ideal-image plugin with blur-up placeholder style
- Add click-to-zoom lightbox for detailed screenshots
- Convert all existing images across all 12 chapters to use the optimized image component — full migration, not partial
- Handles mix of UI screenshots and exported diagrams

### Code block enhancements
- Copy-to-clipboard button on all code blocks — this is the primary enhancement
- No line numbers by default (keep blocks clean)
- Keep current BBj syntax highlighting as-is — no grammar improvements this phase
- No language tabs — course is BBj-focused, side-by-side variants not needed
- No code block titles — context comes from surrounding text

### Claude's Discretion
- Which Mermaid diagram types to enable (Claude determines what's useful for a DWC training course)
- Which chapter/topic gets the example Mermaid diagram
- Lightbox plugin choice and configuration
- Local search plugin choice if Algolia fallback is needed
- Exact blur-up placeholder configuration

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Key constraint: the site uses React 19 and Docusaurus 3.9.2, so all plugins must be compatible (verified in Phase 1 research).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-search-visual-tooling*
*Context gathered: 2026-01-31*
