# Requirements: BBj DWC Training Course Enhancement

**Defined:** 2026-01-31
**Core Value:** The definitive, go-to resource for learning and adopting DWC -- so good that developers want to come back, consultants reach for it in meetings, and all language communities feel included.

## v1 Requirements

Requirements for initial release. Focus: platform foundations, search, visual polish, and content audit.

### Pre-Flight

- [x] **PRE-01**: Resolve `future.v4: true` flag -- decide keep/remove before any plugin integration
- [x] **PRE-02**: Verify React 19 compatibility with all planned Docusaurus plugins
- [x] **PRE-03**: Resolve baseUrl discrepancy (`/DWC-Course/` vs `/bbj-dwc-tutorial/`) in config
- [x] **PRE-04**: Add `npm run typecheck` to GitHub Actions CI pipeline before build step

### Search & Discovery

- [x] **SRCH-01**: Full-text search across all course content (local search; Algolia deferred to future enhancement)
- [x] **SRCH-02**: Search accessible via keyboard shortcut (Cmd+K / Ctrl+K)
- [x] **SRCH-03**: Search results show context snippets and link to specific sections
- [x] **SRCH-04**: Search configured for future i18n compatibility (Algolia contextualSearch deferred with Algolia integration)

### Navigation & UX

- [x] **NAV-01**: Sidebar chapters grouped into logical sections (e.g., "Getting Started", "Core Concepts", "Advanced Topics", "Deployment")
- [x] **NAV-02**: Responsive audit -- ChapterCards and HomepageFeatures components render correctly on mobile/tablet
- [x] **NAV-03**: All custom components tested across Chrome, Firefox, Safari at mobile/tablet/desktop breakpoints

### Code & Visual Enhancements

- [x] **VIS-01**: Mermaid diagrams enabled via `@docusaurus/theme-mermaid` -- architecture and flow diagrams renderable from Markdown
- [x] **VIS-02**: Code block copy button enabled across all code blocks
- [x] **VIS-03**: Image optimization via `@docusaurus/plugin-ideal-image` -- responsive sizing, quality optimization for PNG screenshots
- [x] **VIS-04**: BBj syntax highlighting verified working with Prism (already supported -- confirm in current config)

### Visual Design & Polish

- [x] **DES-01**: Homepage redesigned to feel polished and modern -- worthy of showing to prospects
- [x] **DES-02**: Consistent visual language across all custom components (cards, icons, spacing)
- [x] **DES-03**: Dark mode verified working with all new components and Mermaid diagrams

### Content Audit

- [x] **CONT-01**: All 12 chapters audited for clarity, logical flow, and completeness
- [x] **CONT-02**: Content gaps identified and documented per chapter (what's missing, what's unclear)
- [x] **CONT-03**: Recommendations produced for each chapter (specific improvements needed)
- [x] **CONT-04**: Priority ranking of chapters by consultant usage frequency and learner progression

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### AI Chat Assistant

- **CHAT-01**: Context-aware AI chatbot embedded on all pages
- **CHAT-02**: Chatbot answers DWC questions grounded in course content (RAG)
- **CHAT-03**: Chatbot guides learners through material (suggests next steps)
- **CHAT-04**: Source citations linking to specific course sections in every response
- **CHAT-05**: Locale-aware responses (matches user's selected language)

### DWC Showcase Gallery

- **SHOW-01**: Gallery page displaying BASIS demo applications
- **SHOW-02**: Tag-based filtering of showcase items
- **SHOW-03**: Screenshots, descriptions, and links for each demo
- **SHOW-04**: Navbar link to showcase page

### Internationalization

- **I18N-01**: Docusaurus i18n configured for EN, DE, FR, ES locales
- **I18N-02**: AI-assisted translation script for Markdown content
- **I18N-03**: German translation of all 12 chapters (AI-draft + human review)
- **I18N-04**: Translation freshness tracking (detect stale translations)
- **I18N-05**: Language selector in navbar
- **I18N-06**: Spanish translation of all 12 chapters
- **I18N-07**: French translation of all 12 chapters

### Video Content

- **VID-01**: Reusable `<VideoEmbed>` React component for Synthesia videos
- **VID-02**: Video URL mapping keyed by chapter and locale
- **VID-03**: Lazy-loading for all video embeds (performance)
- **VID-04**: Pilot videos for 2-3 highest-impact chapters (EN)
- **VID-05**: Multi-language video production (DE, FR, ES)
- **VID-06**: Text transcripts for all videos (accessibility)

### Content Depth

- **DEEP-01**: Before/after code tabs (BBj Classic vs DWC Modern) in migration chapters
- **DEEP-02**: Mermaid architecture diagrams added to each chapter
- **DEEP-03**: More annotated code examples with step-by-step explanations
- **DEEP-04**: Annotated screenshots showing DWC UI patterns

### Progress & Engagement

- **PROG-01**: localStorage-based progress tracking (chapters completed)
- **PROG-02**: Progress indicators on ChapterCards component
- **PROG-03**: "Edit this page" link on every doc page

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts & authentication | Requires backend, violates static-site constraint |
| Discussion forums / comments | Moderation burden too high for small team; migrated away from Moodle forums |
| Gamification (badges, points) | Audience is professional developers; gamification feels patronizing |
| Full LMS (quizzes, grading) | User hesitant about quizzes for self-paced; requires backend |
| Newsletter / email collection | GDPR burden, audience finds site through employer not marketing |
| Blog / news section | Already disabled; stale blog signals abandonment |
| Interactive code playground | BBj requires server-side execution; impractical for static site |
| Doc versioning | Low priority unless DWC has frequent breaking changes |
| Simultaneous 4-language launch | Creates 4x maintenance burden; phase one language at a time |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PRE-01 | Phase 1 | Complete |
| PRE-02 | Phase 1 | Complete |
| PRE-03 | Phase 1 | Complete |
| PRE-04 | Phase 1 | Complete |
| SRCH-01 | Phase 2 | Complete (local search; Algolia deferred) |
| SRCH-02 | Phase 2 | Complete |
| SRCH-03 | Phase 2 | Complete |
| SRCH-04 | Phase 2 | Complete (Algolia contextualSearch deferred) |
| VIS-01 | Phase 2 | Complete |
| VIS-02 | Phase 2 | Complete |
| VIS-03 | Phase 2 | Complete |
| VIS-04 | Phase 2 | Complete |
| NAV-01 | Phase 3 | Complete |
| NAV-02 | Phase 3 | Complete |
| NAV-03 | Phase 3 | Complete |
| DES-01 | Phase 3 | Complete |
| DES-02 | Phase 3 | Complete |
| DES-03 | Phase 3 | Complete |
| CONT-01 | Phase 4 | Complete |
| CONT-02 | Phase 4 | Complete |
| CONT-03 | Phase 4 | Complete |
| CONT-04 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-01-31*
*Last updated: 2026-01-31 — All v1 requirements complete (18/18)*
