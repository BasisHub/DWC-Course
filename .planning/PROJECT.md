# BBj DWC Training Course Enhancement

## What This Is

A comprehensive enhancement of the BBj Dynamic Web Client (DWC) Training Course website — a 12-chapter Docusaurus site teaching BBj developers DWC development. The course content is proven and field-tested. This project transforms it from a static training site into a community hub: better platform features, deeper content, AI assistance, multi-language support, and a showcase that makes DWC attractive to developers.

## Core Value

The site must be the definitive, go-to resource for learning and adopting DWC — so good that developers *want* to come back, consultants reach for it in client meetings, and the Spanish/French-speaking community feels included.

## Requirements

### Validated

- ✓ 12-chapter course structure covering GUI-to-DWC migration through deployment — existing
- ✓ Docusaurus 3.9.2 static site with React 19 and TypeScript — existing
- ✓ GitHub Pages deployment via GitHub Actions CI/CD — existing
- ✓ Auto-generated sidebar navigation from docs directory — existing
- ✓ Custom theme with dark mode support (green color scheme) — existing
- ✓ Interactive homepage with ChapterCards and HomepageFeatures components — existing
- ✓ Code syntax highlighting for Java, Bash, and BBj — existing
- ✓ Sample BBj source code in `samples/` directory — existing
- ✓ External links to BASIS documentation and DWC docs — existing

### Active

**Platform — Search & Discovery:**
- [ ] Algolia DocSearch integration (reference: docs.webforj.com uses this)
- [ ] Improved navigation for consultants who need fast access to specific topics

**Platform — AI Chat Assistant:**
- [ ] Context-aware AI chatbot that knows course content and DWC documentation
- [ ] Answers DWC questions in natural language
- [ ] Guides learners through material (suggests next steps, explains concepts)
- [ ] Works within static site constraints (client-side, no backend)

**Platform — Look & Feel:**
- [ ] Polished, modern visual design worthy of showing to prospects and customers
- [ ] Improved UX for both self-paced learners and consultants cherry-picking topics

**Platform — DWC Showcase Gallery:**
- [ ] Gallery of demo apps built with DWC by BASIS
- [ ] Demonstrates real-world patterns and capabilities to attract developers

**Content — Depth Enhancement:**
- [ ] More code examples with explanations across all chapters
- [ ] Architecture diagrams, flow charts, annotated screenshots
- [ ] Content quality audit: clarity, logical flow, relevance, completeness

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
- **Codebase state:** Docusaurus 3.9.2, React 19, TypeScript 5.6, GitHub Pages. No test framework, no linting. See `.planning/codebase/` for detailed analysis.

## Constraints

- **Framework**: Docusaurus — committed, not negotiable
- **Hosting**: GitHub Pages — static site only, no server-side processing
- **Budget**: Prefer free/open-source solutions. Algolia DocSearch has a free tier for open-source docs.
- **Content language**: English primary, with French/Spanish/German as secondary via translation
- **AI chat**: Must work client-side or via free/cheap API — no expensive hosted solutions

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Stay on Docusaurus | Committed to framework, team familiar with it | — Pending |
| Algolia for search | Already proven on docs.webforj.com | — Pending |
| Synthesia for video | License already available, supports multi-language | — Pending |
| AI-assisted translation | Budget-conscious way to reach French/Spanish community | — Pending |
| Static-only architecture | GitHub Pages hosting, no backend budget | — Pending |

---
*Last updated: 2026-01-31 after initialization*
