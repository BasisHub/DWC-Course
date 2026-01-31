# BBj DWC Training Course Enhancement

## What This Is

A polished, searchable Docusaurus site for the BBj Dynamic Web Client (DWC) Training Course — a 12-chapter curriculum teaching BBj developers DWC development. The course content is proven and field-tested. v1 delivered platform foundations (search, visual tooling, responsive design, CI hardening) and a comprehensive content audit. The next focus is content depth enhancement, AI assistance, internationalization, and a showcase gallery.

## Core Value

The site must be the definitive, go-to resource for learning and adopting DWC — so good that developers *want* to come back, consultants reach for it in client meetings, and the Spanish/French-speaking community feels included.

## Requirements

### Validated

- ✓ 12-chapter course structure covering GUI-to-DWC migration through deployment — existing
- ✓ Docusaurus 3.9.2 static site with React 19 and TypeScript — existing
- ✓ GitHub Pages deployment via GitHub Actions CI/CD — existing
- ✓ Code syntax highlighting for Java, Bash, and BBj — existing
- ✓ Sample BBj source code in `samples/` directory — existing
- ✓ External links to BASIS documentation and DWC docs — existing
- ✓ Full-text search across all course content (local search) — v1
- ✓ Search accessible via keyboard shortcut (Cmd+K / Ctrl+K) — v1
- ✓ Search results show context snippets and link to specific sections — v1
- ✓ Sidebar chapters grouped into logical sections (Getting Started, Core Concepts, Advanced Topics, Deployment) — v1
- ✓ Responsive components render correctly on mobile/tablet/desktop — v1
- ✓ Cross-browser testing (Chrome, Firefox, Safari) — v1
- ✓ Mermaid diagrams enabled for architecture and flow diagrams — v1
- ✓ Code block copy button enabled across all code blocks — v1
- ✓ Image optimization via IdealImage (responsive sizing, blur-up placeholders) — v1
- ✓ Homepage redesigned (Hero + Features + Cards + CTA) — v1
- ✓ Consistent visual language with professional blue palette — v1
- ✓ Dark mode verified working with all components and diagrams — v1
- ✓ CI pipeline with TypeScript typecheck gate before build — v1
- ✓ Content audit: all 12 chapters evaluated with tier-ranked improvement priorities — v1

### Active

**Platform — Search Upgrade:**
- [ ] Algolia DocSearch integration (upgrade from local search; reference: docs.webforj.com)
- [ ] contextualSearch for i18n locale awareness

**Platform — AI Chat Assistant:**
- [ ] Context-aware AI chatbot that knows course content and DWC documentation
- [ ] Answers DWC questions in natural language
- [ ] Guides learners through material (suggests next steps, explains concepts)
- [ ] Works within static site constraints (client-side, no backend)

**Platform — DWC Showcase Gallery:**
- [ ] Gallery of demo apps built with DWC by BASIS
- [ ] Demonstrates real-world patterns and capabilities to attract developers

**Content — Depth Enhancement (guided by v1 content audit):**
- [ ] Add inline code blocks to Ch04 and Ch05 (zero code blocks currently — Critical tier)
- [ ] Expand Flexbox coverage in Ch06 and add DWC integration examples
- [ ] Add code annotations and progressive complexity curriculum-wide (9 chapters have gaps)
- [ ] Add Mermaid diagrams to 8 chapters (18 opportunities identified)
- [ ] Expand thin chapters (7 of 12 under 150 lines)
- [ ] Add chapter summaries and navigation links (10 chapters missing)

**Content — Video/Multimedia:**
- [ ] Synthesia AI avatar videos explaining key concepts
- [ ] Multi-language video content (English, German, French, Spanish)
- [ ] Screenplays + captions for each video segment

**Content — Internationalization:**
- [ ] Translated course content for Spanish and French communities (AI-assisted)
- [ ] Language selector in site navigation
- [ ] Synthesia avatars speaking natively in target languages

### Out of Scope

- Backend server infrastructure — must remain static site on GitHub Pages
- Moodle feature parity (forums, LMS features) — Moodle migration is complete, no recovery needed
- Interactive exercises/quizzes for self-learning — user hesitant about this for self-paced format
- Community contribution/editing workflow — not in current vision
- User accounts or progress tracking — would require backend
- Paid SaaS integrations — budget-conscious, prefer free/cheap solutions

## Context

- **Origin:** Course migrated from Moodle to Docusaurus. Content proven in field use.
- **Audience:** Two modes — (1) self-paced BBj developers learning DWC, (2) BASIS consultants teaching/demoing specific DWC aspects to clients.
- **Language community:** Spanish and French-speaking developers adopt more slowly due to language barrier. Making them feel recognized through native-language content is a strategic priority.
- **Existing reference:** docs.webforj.com uses Algolia with Docusaurus — serves as a model for search integration here.
- **Synthesia license:** Team has access to Synthesia for AI avatar video production.
- **Codebase state:** Docusaurus 3.9.2, React 19, TypeScript 5.6, GitHub Pages. Blue palette (Tailwind Blue scale). Local search via @easyops-cn/docusaurus-search-local. Mermaid diagrams enabled. IdealImage with 45 PNGs across 9 docs. CI pipeline with typecheck gate. See `.planning/codebase/` for detailed analysis.
- **Content audit findings:** Completeness (2.7/5.0) and Code Examples Quality (2.7/5.0) are systemic weaknesses. Ch04 and Ch05 have zero inline code blocks. 7 of 12 chapters under 150 lines. See `.planning/phases/04-content-audit/04-SUMMARY.md` for full tier ranking and recommendations.

## Constraints

- **Framework**: Docusaurus — committed, not negotiable
- **Hosting**: GitHub Pages — static site only, no server-side processing
- **Budget**: Prefer free/open-source solutions. Algolia DocSearch has a free tier for open-source docs.
- **Content language**: English primary, with French/Spanish/German as secondary via translation
- **AI chat**: Must work client-side or via free/cheap API — no expensive hosted solutions

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Stay on Docusaurus | Committed to framework, team familiar with it | ✓ Good |
| Local search instead of Algolia | Algolia requires approval; local search provides equivalent UX immediately | ✓ Good — upgrade path to Algolia remains open |
| Removed future.v4 flag | CSS Cascade Layers production bug (Issue #11567) | ✓ Good — clean build, no warnings |
| React 19 kept (no downgrade) | All plugins confirmed compatible | ✓ Good |
| Blue palette (Tailwind Blue scale) | Professional, WCAG-AA compliant, consistent with Docusaurus theming | ✓ Good |
| Text-focused homepage (no illustrations) | Faster to ship, professional look without custom art | ✓ Good |
| Sidebar 4-group structure | Getting Started / Core Concepts / Advanced Topics / Deployment | ✓ Good |
| GIF exclusion from IdealImage | Build-time processing breaks GIF animation | ✓ Good |
| Synthesia for video | License already available, supports multi-language | — Pending |
| AI-assisted translation | Budget-conscious way to reach French/Spanish community | — Pending |
| Static-only architecture | GitHub Pages hosting, no backend budget | ✓ Good |

---
*Last updated: 2026-01-31 after v1 milestone*
