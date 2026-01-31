# Architecture Research: Enhanced Docusaurus Site Features

**Research Date:** 2026-01-31
**Scope:** How Algolia DocSearch, AI chat, Synthesia video, i18n, and showcase gallery integrate into a Docusaurus 3.9.2 static site (React 19, TypeScript, GitHub Pages).

---

## 1. Current Architecture Baseline

The site is a standard Docusaurus 3.9.2 application with the classic preset. All content flows through five layers:

```
Configuration Layer (docusaurus.config.ts, sidebars.ts)
        |
        v
Content Layer (docs/*.md, 12 chapters)
        |
        v
Component Layer (src/components/ChapterCards, HomepageFeatures)
        |
        v
Styling Layer (src/css/custom.css, *.module.css)
        |
        v
Static Assets Layer (static/img/*)
        |
        v
Build Output -> GitHub Pages (static HTML/CSS/JS)
```

Key constraints that apply to all new features:
- **Static only** -- no server-side processing, no backend, no SSR endpoints
- **GitHub Pages hosting** -- build output is flat files served from a CDN
- **Docusaurus plugin architecture** -- features integrate via plugins, themes, or custom components
- **React 19 runtime** -- components can use hooks, context, and client-side state
- **Budget-conscious** -- prefer free tiers and open-source solutions

---

## 2. Component Architecture for New Features

### 2.1 Algolia DocSearch (Search)

**What it is:** A hosted search service that crawls the deployed site, indexes content, and provides a pre-built React search widget.

**Component boundary:**

```
+--------------------------------------------------+
|  docusaurus.config.ts                            |
|  themeConfig.algolia = {                         |
|    appId, apiKey, indexName                       |
|  }                                               |
+--------------------------------------------------+
        |  (config injection)
        v
+--------------------------------------------------+
|  @docusaurus/theme-search-algolia                |
|  (installed as npm dependency)                   |
|                                                  |
|  Provides:                                       |
|  - SearchBar component in navbar                 |
|  - Keyboard shortcut (Cmd+K / Ctrl+K)           |
|  - Search modal with results                     |
|  - Faceted search by version/language            |
+--------------------------------------------------+
        |  (HTTP at runtime)
        v
+--------------------------------------------------+
|  Algolia DocSearch Service (External)            |
|  - Crawler visits deployed site on schedule      |
|  - Indexes all pages, headings, content          |
|  - Serves search queries via REST API            |
|  - Free tier for open-source documentation       |
+--------------------------------------------------+
```

**Data flow:**
1. Algolia crawler visits `https://BasisHub.github.io/DWC-Course/` on a schedule
2. Crawler extracts page content, headings, hierarchy, and metadata
3. Content is indexed in Algolia's cloud infrastructure
4. At runtime, user types in SearchBar component
5. Component sends query to Algolia API (client-side fetch)
6. Results returned as JSON, rendered in search modal
7. User clicks result, Docusaurus router navigates to page

**Integration points:**
- `docusaurus.config.ts`: Add `algolia` block to `themeConfig` with credentials
- `package.json`: Add `@docusaurus/theme-search-algolia` dependency (already included in `preset-classic` but needs config activation)
- No custom components needed -- the preset-classic theme already includes the SearchBar

**Configuration required:**
```typescript
// docusaurus.config.ts - themeConfig addition
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY', // public search-only key (safe to commit)
  indexName: 'DWC-Course',
  contextualSearch: true, // enables language-aware search with i18n
}
```

**i18n interaction:** When `contextualSearch: true`, Algolia automatically filters results by the active locale. This requires the crawler to index all locale versions of the site.

**Build order dependency:** Algolia needs a deployed, crawlable site. It should be configured after the site is live. The search API key is a *search-only* public key (safe to commit). The admin API key stays in Algolia dashboard only.

---

### 2.2 AI Chat Assistant (Client-Side)

**What it is:** A conversational widget that answers questions about DWC using course content as context. Must run client-side with no backend.

**Architecture options (ranked by fit):**

| Option | How It Works | Cost | Complexity |
|--------|-------------|------|------------|
| **A. Pre-built Docusaurus AI plugin** (e.g., `docusaurus-plugin-kapa`, Mendable, Inkeep) | Hosted service indexes docs, provides chat widget | Free tier or paid | Low |
| **B. Client-side RAG with WebLLM/Transformers.js** | Bundle a small LLM in browser, embed content as vectors | Free (runs locally) | High |
| **C. Thin client to external LLM API** | React component calls OpenAI/Anthropic API directly from browser | API costs ($) | Medium |
| **D. Static FAQ chatbot** | Pre-computed Q&A pairs, keyword matching, no real LLM | Free | Medium |

**Recommended: Option A (hosted doc AI service) or Option C (API client)**

Option A is simplest if budget allows a free-tier service. Option C gives more control but exposes an API key in the client (requires a free/low-cost key with rate limits).

**Component boundary (Option C -- API client approach):**

```
+--------------------------------------------------+
|  src/components/AIChatWidget/                    |
|  - index.tsx          (main chat component)      |
|  - ChatButton.tsx     (floating trigger button)  |
|  - ChatWindow.tsx     (conversation UI)          |
|  - MessageBubble.tsx  (individual messages)      |
|  - useChat.ts         (hook: state + API calls)  |
|  - context.ts         (course content snippets)  |
|  - styles.module.css  (scoped styling)           |
+--------------------------------------------------+
        |  (renders as overlay)
        v
+--------------------------------------------------+
|  src/theme/Root.tsx (Docusaurus theme wrapper)   |
|  - Wraps entire site to inject chat widget       |
|  - Makes chat available on every page            |
+--------------------------------------------------+
        |  (HTTP at runtime)
        v
+--------------------------------------------------+
|  External LLM API (e.g., OpenAI, Anthropic)     |
|  - Receives user question + context snippets     |
|  - Returns conversational answer                 |
|  - API key stored in environment / restricted    |
+--------------------------------------------------+
```

**Data flow:**
1. User clicks chat button (floating action button, bottom-right)
2. ChatWindow opens as overlay/drawer
3. User types question
4. `useChat` hook constructs prompt with:
   - System prompt (DWC training assistant persona)
   - Relevant content snippets (pre-embedded or fetched from static JSON)
   - User's question
5. Hook sends request to LLM API
6. Response streamed back, rendered in MessageBubble components
7. Conversation history maintained in React state (session only)

**Content context strategy:**
- At build time: Extract key content from each chapter into `static/data/course-context.json`
- At runtime: Load relevant context snippets based on current page URL
- Pass context as system prompt to LLM API
- This avoids shipping full docs in the bundle while giving the LLM enough context

**Integration points:**
- `src/theme/Root.tsx`: Swizzled Root component to inject AIChatWidget globally
- `src/components/AIChatWidget/`: New component directory
- `static/data/course-context.json`: Pre-extracted content (generated at build time or manually)
- `docusaurus.config.ts`: Custom field for API configuration (non-secret parts)
- Environment variable or restricted API key for LLM service

**Build order dependency:** Can be built independently of other features. Depends only on having course content available for context extraction. Should be built after i18n if the chat needs to respond in multiple languages.

---

### 2.3 Synthesia Video Embeds

**What it is:** AI-generated avatar videos explaining key concepts, embedded in documentation pages. Videos are hosted on Synthesia's platform or exported to a video host.

**Component boundary:**

```
+--------------------------------------------------+
|  src/components/VideoEmbed/                      |
|  - index.tsx          (responsive video wrapper) |
|  - styles.module.css  (aspect ratio, spacing)    |
+--------------------------------------------------+
        |  (used in Markdown via MDX)
        v
+--------------------------------------------------+
|  docs/XX-chapter/YY-section.md                   |
|  import VideoEmbed from                          |
|    '@site/src/components/VideoEmbed'             |
|  <VideoEmbed                                     |
|    videoId="abc123"                              |
|    title="Chapter 1: Introduction"               |
|    lang="en"                                     |
|  />                                              |
+--------------------------------------------------+
        |  (iframe at runtime)
        v
+--------------------------------------------------+
|  Synthesia Video Host (External)                 |
|  - Videos hosted on Synthesia share links        |
|  - OR exported to YouTube/Vimeo for embedding    |
|  - Provides iframe embed code                    |
|  - Multi-language versions as separate videos    |
+--------------------------------------------------+
```

**Data flow:**
1. Author creates video in Synthesia dashboard (script + avatar + language)
2. Synthesia generates video, provides embed URL or share link
3. Author adds `<VideoEmbed videoId="..." />` to relevant Markdown page
4. At runtime, component renders responsive iframe pointing to video host
5. Video loads on demand (lazy loading for performance)
6. For i18n: component receives `lang` prop, selects correct video URL from a mapping

**Video URL mapping strategy:**

```typescript
// src/data/videos.ts
export const videoMap: Record<string, Record<string, string>> = {
  'ch01-intro': {
    en: 'https://share.synthesia.io/abc123',
    de: 'https://share.synthesia.io/def456',
    fr: 'https://share.synthesia.io/ghi789',
    es: 'https://share.synthesia.io/jkl012',
  },
  // ... more chapters
};
```

**Integration points:**
- `src/components/VideoEmbed/index.tsx`: Reusable video embed component
- `src/data/videos.ts`: Centralized video URL mapping (language x chapter)
- Each docs Markdown file: MDX import of VideoEmbed where videos appear
- `src/css/custom.css`: Global video container styling (optional)

**Build order dependency:** Independent of other features. Videos are produced externally in Synthesia. The component can be built first as a shell, then populated with video IDs as content is produced. Should be built before or alongside i18n so video language selection works correctly.

---

### 2.4 Internationalization (i18n)

**What it is:** Docusaurus has built-in i18n support. Content is translated into locale-specific directories. A language switcher in the navbar lets users switch locales.

**Component boundary:**

```
+--------------------------------------------------+
|  docusaurus.config.ts                            |
|  i18n: {                                         |
|    defaultLocale: 'en',                          |
|    locales: ['en', 'de', 'fr', 'es'],            |
|    localeConfigs: {                              |
|      en: { label: 'English' },                   |
|      de: { label: 'Deutsch' },                   |
|      fr: { label: 'Francais' },                  |
|      es: { label: 'Espanol' },                   |
|    }                                             |
|  }                                               |
+--------------------------------------------------+
        |
        v
+--------------------------------------------------+
|  i18n/                                           |
|  ├── de/                                         |
|  │   ├── docusaurus-plugin-content-docs/         |
|  │   │   └── current/                            |
|  │   │       ├── index.md                        |
|  │   │       ├── prerequisites.md                |
|  │   │       └── 01-gui-to-bui-to-dwc/           |
|  │   │           ├── index.md                    |
|  │   │           └── ...                         |
|  │   └── docusaurus-theme-classic/               |
|  │       └── navbar.json  (UI string translations)|
|  ├── fr/                                         |
|  │   └── ... (same structure)                    |
|  └── es/                                         |
|      └── ... (same structure)                    |
+--------------------------------------------------+
        |
        v
+--------------------------------------------------+
|  Build Output (one full site per locale)         |
|  build/                                          |
|  ├── index.html          (English, default)      |
|  ├── de/index.html       (German)                |
|  ├── fr/index.html       (French)                |
|  └── es/index.html       (Spanish)               |
+--------------------------------------------------+
```

**Data flow:**
1. `docusaurus.config.ts` declares supported locales
2. `npm run write-translations` generates translation file scaffolds in `i18n/`
3. Translators (human or AI-assisted) populate translated Markdown files
4. `npm run build` generates a complete static site for each locale
5. Navbar automatically shows locale dropdown (from localeConfigs)
6. User selects locale, browser navigates to `/de/...` or `/fr/...` path
7. Algolia `contextualSearch` filters results by active locale
8. VideoEmbed component reads current locale to select language-appropriate video

**Integration points:**
- `docusaurus.config.ts`: Expand `i18n` block from single locale to four
- `i18n/` directory: New top-level directory with locale subdirectories
- Navbar: Docusaurus automatically adds locale dropdown (no code needed)
- `package.json`: Add locale-specific build/start scripts
- `.github/workflows/deploy.yml`: Build command changes (builds all locales)
- Every component that shows user-facing text: Use `<Translate>` component or `translate()` function

**Build impact:** Build time multiplies by number of locales. A 4-locale site takes approximately 4x the single-locale build time. GitHub Actions may need longer timeouts.

**Content workflow:**
```
English content (docs/*.md)
        |
        | (AI-assisted translation)
        v
i18n/{locale}/docusaurus-plugin-content-docs/current/*.md
        |
        | (human review)
        v
Committed translated content
```

**Build order dependency:** i18n is foundational. It affects:
- How Algolia indexes content (one index per locale or contextual facets)
- How VideoEmbed selects videos (needs locale context)
- How AI chat responds (locale-aware prompts)
- Build pipeline changes (multi-locale builds)

**Must be implemented early** because retrofitting i18n is significantly harder than building with it from the start.

---

### 2.5 DWC Showcase Gallery

**What it is:** A standalone page displaying demo applications built with DWC, with screenshots, descriptions, links, and filtering/tagging.

**Component boundary:**

```
+--------------------------------------------------+
|  src/data/showcase.ts                            |
|  - Typed array of ShowcaseItem objects           |
|  - title, description, image, tags, links        |
|  - Centralized data (easy to update)             |
+--------------------------------------------------+
        |
        v
+--------------------------------------------------+
|  src/pages/showcase/index.tsx                    |
|  - Main showcase page (standalone, not in docs)  |
|  - FilterBar component (tag-based filtering)     |
|  - ShowcaseGrid component (card grid)            |
|  - ShowcaseCard component (individual demo card) |
+--------------------------------------------------+
        |
        v
+--------------------------------------------------+
|  static/img/showcase/                            |
|  - Screenshots of each demo application          |
|  - Optimized images (WebP preferred)             |
+--------------------------------------------------+
        |
        v
+--------------------------------------------------+
|  docusaurus.config.ts                            |
|  - Navbar link to /showcase                      |
+--------------------------------------------------+
```

**Data flow:**
1. `src/data/showcase.ts` defines array of demo items with metadata
2. Showcase page imports data, renders filterable grid
3. User can filter by tags (e.g., "grid", "chart", "form", "responsive")
4. Each card shows screenshot, title, description, and links (live demo, source code)
5. Clicking a card opens detail view or navigates to external demo

**Showcase item type:**
```typescript
type ShowcaseItem = {
  title: string;
  description: string;
  image: string;           // path to screenshot in static/img/showcase/
  tags: string[];          // filterable tags
  sourceUrl?: string;      // GitHub repo link
  demoUrl?: string;        // live demo link
  chapter?: number;        // related course chapter (cross-links to docs)
};
```

**Integration points:**
- `src/pages/showcase/index.tsx`: New standalone page (Docusaurus pages routing)
- `src/data/showcase.ts`: Showcase data (separated from component)
- `static/img/showcase/`: Screenshot images
- `docusaurus.config.ts`: Add navbar item pointing to `/showcase`
- Optional: Cross-reference from chapter pages ("See this in action in the Showcase")

**Build order dependency:** Fully independent. Can be built in parallel with any other feature. Only dependency is having demo screenshots and metadata available.

---

## 3. Cross-Cutting Integration Map

This diagram shows how features interact with each other:

```
                    docusaurus.config.ts
                    (central configuration)
                           |
            +--------------+--------------+
            |              |              |
            v              v              v
      [Algolia]      [i18n config]   [navbar items]
         |                |              |
         |     +----------+----------+   |
         |     |          |          |   |
         v     v          v          v   v
      Search   Content   Video     Showcase
      Index    Locales   Locales    Page
         |        |         |
         +--------+---------+
                  |
                  v
          [Locale Context]
          (shared by all features
           at runtime via
           useDocusaurusContext)
                  |
         +--------+--------+
         |                 |
         v                 v
    [AI Chat]        [VideoEmbed]
    (locale-aware    (locale-aware
     responses)       video selection)
```

**Shared dependencies:**
- **Locale context:** Available via `useDocusaurusContext()` hook. All locale-aware components (AI chat, video embed, search) consume this.
- **Navbar:** All features add items or widgets to the navbar (search bar, locale dropdown, showcase link).
- **Theme styling:** All components inherit Infima CSS variables from `custom.css`. Dark mode support is automatic if components use CSS custom properties.
- **MDX integration:** VideoEmbed and potentially AI chat are used inside Markdown pages via MDX imports.

---

## 4. Data Flow Summary

### Build-Time Data Flow

```
Source Content (docs/*.md)
        |
        +---> Docusaurus Build ---> HTML/CSS/JS per locale
        |                              |
        +---> Context Extraction ----> static/data/course-context.json
        |     (for AI chat)               (shipped with build)
        |
        +---> i18n Translation ------> i18n/{locale}/**/*.md
              (AI-assisted + review)       (built into locale sites)
```

### Runtime Data Flow

```
User visits page
    |
    +---> Docusaurus Router (resolves locale + page)
    |
    +---> Page renders with components
    |       |
    |       +---> VideoEmbed reads locale, loads correct video iframe
    |       |
    |       +---> SearchBar (Algolia) sends queries filtered by locale
    |       |
    |       +---> AIChatWidget loads context for current page
    |
    +---> All external calls are client-side HTTP:
            - Algolia search API (search queries)
            - LLM API (chat messages)
            - Synthesia/YouTube (video iframe src)
            - No calls to own backend (static site)
```

---

## 5. Build Order and Dependencies

### Dependency Graph

```
Phase 0: Foundation (no feature dependencies)
  |
  +---> [i18n Setup] - Must come first, affects all other features
  |         |
  |         v
  |     Phase 1: Core Features (depend on i18n being in place)
  |       |
  |       +---> [Algolia DocSearch] - needs deployed site to crawl
  |       |         (contextualSearch needs i18n locales configured)
  |       |
  |       +---> [VideoEmbed Component] - needs locale context
  |       |         (video content produced externally in parallel)
  |       |
  |       +---> [Showcase Gallery] - independent, can parallelize
  |       |
  |       v
  |     Phase 2: AI Features (depend on content + infrastructure)
  |       |
  |       +---> [AI Chat Widget] - needs:
  |                 - Course content extracted for context
  |                 - Locale awareness (from i18n)
  |                 - API key/service decision
  |
  v
Phase 3: Content Production (can overlap with development)
  |
  +---> Synthesia video scripts + production
  +---> AI-assisted translation of all 12 chapters x 3 languages
  +---> Showcase demo curation and screenshots
  +---> AI chat context tuning and testing
```

### Recommended Build Sequence

| Order | Feature | Rationale | Depends On |
|-------|---------|-----------|------------|
| 1 | **i18n configuration** | Foundational -- changes directory structure, build pipeline, and all component locale awareness. Retrofitting is costly. | Nothing |
| 2 | **VideoEmbed component** | Simple, self-contained React component. Can be built as shell immediately, populated with video IDs later. Needs locale context. | i18n config |
| 3 | **Showcase Gallery** | Independent page. No cross-dependencies. Good early win for visual impact. | Nothing (can parallelize with #2) |
| 4 | **Algolia DocSearch** | Needs deployed site with content. Configuration is minimal but crawler setup takes time. Benefits from i18n being active so all locales are indexed. | i18n config, deployed site |
| 5 | **AI Chat Widget** | Most complex client-side feature. Needs content context, locale awareness, API integration. Build last when other features are stable. | i18n config, course content |

### Parallel Work Streams

```
Stream A (Development):  i18n -> VideoEmbed -> AI Chat
Stream B (Development):  Showcase Gallery -> Algolia setup
Stream C (Content):      Synthesia scripts -> Video production -> Embed IDs
Stream D (Content):      English audit -> AI translation -> Human review
Stream E (Content):      Demo curation -> Screenshots -> Showcase data
```

---

## 6. Integration Risk Assessment

| Feature | Integration Risk | Mitigation |
|---------|-----------------|------------|
| **i18n** | High -- changes build output structure, URL paths, deployment config | Implement first, before other features. Test build pipeline early. |
| **Algolia** | Low -- proven Docusaurus integration, configuration-only | Apply for DocSearch program early (approval can take weeks). |
| **VideoEmbed** | Low -- simple iframe wrapper, no complex state | Keep component thin. Video hosting is external concern. |
| **AI Chat** | Medium -- API key management, context quality, cost control | Prototype with simple context first. Consider rate limiting. Budget for API costs. |
| **Showcase** | Low -- standalone page, no dependencies on other features | Start with static data, add filtering incrementally. |

---

## 7. File System Impact (New Files and Directories)

```
bbj-dwc-tutorial/
├── i18n/                                    [NEW - i18n]
│   ├── de/
│   │   ├── docusaurus-plugin-content-docs/
│   │   │   └── current/                     (translated docs)
│   │   └── docusaurus-theme-classic/
│   │       └── navbar.json                  (UI translations)
│   ├── fr/                                  (same structure)
│   └── es/                                  (same structure)
├── src/
│   ├── components/
│   │   ├── VideoEmbed/                      [NEW - video]
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── AIChatWidget/                    [NEW - AI chat]
│   │   │   ├── index.tsx
│   │   │   ├── ChatButton.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── useChat.ts
│   │   │   └── styles.module.css
│   │   ├── ShowcaseCard/                    [NEW - showcase]
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── FilterBar/                       [NEW - showcase]
│   │       ├── index.tsx
│   │       └── styles.module.css
│   ├── data/                                [NEW - shared data]
│   │   ├── videos.ts                        (video URL mapping)
│   │   └── showcase.ts                      (showcase items)
│   ├── pages/
│   │   └── showcase/                        [NEW - showcase page]
│   │       └── index.tsx
│   └── theme/
│       └── Root.tsx                          [NEW - AI chat injection]
├── static/
│   ├── data/
│   │   └── course-context.json              [NEW - AI chat context]
│   └── img/
│       └── showcase/                        [NEW - showcase images]
│           └── *.webp
└── docusaurus.config.ts                     [MODIFIED - all features]
```

---

## 8. Package Dependencies (New)

| Package | Feature | Purpose |
|---------|---------|---------|
| `@docusaurus/theme-search-algolia` | Search | Already in preset-classic; needs config activation |
| (none additional for i18n) | i18n | Built into Docusaurus core |
| (none additional for VideoEmbed) | Video | Pure React component, no external deps |
| `openai` or `@anthropic-ai/sdk` | AI Chat | LLM API client (if Option C) |
| (none additional for Showcase) | Showcase | Pure React components |

Minimal new dependencies. Docusaurus already bundles most of what is needed. The AI chat client SDK is the only significant addition.

---

## 9. Configuration Changes to docusaurus.config.ts

Summary of all changes needed in the central config file:

```typescript
const config: Config = {
  // ... existing config ...

  // CHANGE: Expand i18n from single locale to four
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      de: { label: 'Deutsch', direction: 'ltr' },
      fr: { label: 'Francais', direction: 'ltr' },
      es: { label: 'Espanol', direction: 'ltr' },
    },
  },

  themeConfig: {
    // ... existing theme config ...

    // ADD: Algolia search configuration
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_ONLY_API_KEY',
      indexName: 'dwc-course',
      contextualSearch: true,
    },

    // ADD: Navbar items for showcase and locale
    navbar: {
      items: [
        // ... existing items ...
        { to: '/showcase', label: 'Showcase', position: 'left' },
        { type: 'localeDropdown', position: 'right' },
      ],
    },
  },

  // ADD: Custom fields for AI chat configuration (non-secret)
  customFields: {
    aiChat: {
      enabled: true,
      welcomeMessage: 'Ask me anything about BBj DWC!',
    },
  },
};
```

---

## 10. GitHub Actions Impact

The deploy workflow needs updates for multi-locale builds:

```yaml
# Current:
- run: npm run build

# Updated for i18n:
- run: npm run build
  # Docusaurus automatically builds all configured locales
  # Build time increases ~4x (one build per locale)
  # May need to increase GitHub Actions timeout
```

Build output size will grow proportionally with the number of locales. GitHub Pages has a 1GB limit for published sites, which should be sufficient for 4 locales of documentation content.

---

*Architecture research completed: 2026-01-31*
*Informs: Phase structure in project roadmap*
