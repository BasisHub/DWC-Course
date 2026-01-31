# Phase 3: Navigation & Design Polish - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the sidebar navigation into logical grouped sections, redesign the homepage for a modern developer-focused experience, establish a consistent visual design language with a new blue accent color, and ensure dark mode and responsive behavior work correctly across all custom components. The site should look polished enough to show prospects and clients.

</domain>

<decisions>
## Implementation Decisions

### Sidebar Grouping
- Group 12 chapters into 4 sections: Getting Started, Core Concepts, Advanced Topics, Deployment
- Sections are collapsible (accordion-style)
- Text-only section labels — no icons or emoji
- Clean chapter titles without number prefixes (remove "01 -", "02 -", etc.)

### Homepage Redesign
- Primary audience: developers learning DWC
- Hero section: bold text + prominent "Start Learning" CTA button — clean and direct
- Below hero: feature highlights section, then chapter cards grouped by the same 4 sidebar sections
- Closing CTA at bottom (e.g., "Ready to start?" linking to Chapter 1)
- Feature highlights content: Claude's discretion on what to call out (learning outcomes, course qualities, or DWC strengths)
- DWC app preview/screenshot: Claude's discretion on whether to include one

### Color & Visual Identity
- Shift from green to blue/professional accent color
- Clean & minimal visual tone (Stripe docs / Linear feel — lots of whitespace, restrained design)
- Flat/solid backgrounds only — no gradients or background patterns
- Text-focused, minimal icons — clean typography carries the design
- Modernize existing card pattern (ChapterCards) to match new blue/professional look

### Responsive Behavior
- Desktop is the primary experience — mobile is "nice to have"
- Mobile: homepage chapter cards reflow to single column
- Standard browser support: Chrome, Firefox, Safari (desktop and mobile)
- No special mobile-specific layouts or interactions needed beyond Docusaurus defaults

### Dark Mode
- Subtle dark mode enhancements (not strict inversion) — different card borders, shadows, or accent tones for readability
- Blue accent shifts to a lighter/brighter variant in dark mode for contrast against dark backgrounds
- Mermaid diagrams render with dark theme when site is in dark mode
- Search UI customized to match the blue accent and dark mode styling
- Code blocks keep default Prism theme (already optimized for readability)

### Claude's Discretion
- Feature highlights content selection (learning outcomes vs course qualities vs platform strengths)
- Whether to include a DWC app screenshot/preview on homepage
- Exact blue shade selection and color palette
- Loading skeleton and error state designs
- Exact spacing, typography scale, and card styling details
- Dark mode shadow/border treatment specifics

</decisions>

<specifics>
## Specific Ideas

- Visual tone reference: "Clean & minimal like Stripe docs or Linear" — whitespace-forward, restrained
- Chapter cards grouped by section on homepage mirrors the sidebar grouping for consistency
- Blue should convey trust, credibility, and technical professionalism

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-navigation-design-polish*
*Context gathered: 2026-01-31*
