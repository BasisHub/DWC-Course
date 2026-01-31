# Pitfalls Analysis: BBj DWC Training Site Enhancement

**Analysis Date:** 2026-01-31
**Scope:** Adding Algolia search, AI chat, Synthesia video, i18n (FR/ES), and DWC showcase to a Docusaurus 3.9.2 static site on GitHub Pages.

---

## P1: Algolia DocSearch Free Tier Rejection

**Category:** Search & Discovery
**Severity:** High -- blocks the entire search feature if not addressed early
**Phase:** Platform - Search & Discovery

### The Pitfall

Algolia DocSearch's free program has strict eligibility requirements: the site must be publicly accessible, the documentation must be technical and open-source, and the content must not be behind authentication. The BBj DWC Training Course is documentation for a commercial product (BASIS International). Algolia frequently rejects applications from commercial training sites, proprietary software documentation, and sites that look like internal resources rather than open-source docs.

Projects commonly apply, wait 2-4 weeks for a response, get rejected, and then scramble for alternatives -- losing a month or more.

### Warning Signs

- Application asks for "open-source project URL" and site does not have a clear OSS license.
- DocSearch crawler requires a `sitemap.xml` -- missing from current build config.
- No response from Algolia within 2 weeks of applying.
- Rejection email citing "not meeting the open-source documentation criteria."

### Prevention Strategy

1. **Apply early** (first week of the search phase) so rejection is discovered before it blocks other work.
2. **Prepare a fallback plan from day one.** Evaluate these alternatives before the Algolia application response arrives:
   - **Docusaurus local search plugins** (`@easyops-cn/docusaurus-search-local` or `docusaurus-lunr-search`): Run entirely client-side, zero cost, no approval needed. Build-time indexing works perfectly with GitHub Pages static hosting.
   - **Algolia self-hosted crawler** with a free Algolia account (10k records/month free tier): You control the crawler, no DocSearch approval required. More setup work but same search UI.
3. **Ensure `sitemap.xml` generation** is enabled in `docusaurus.config.ts` (the classic preset includes it by default, but verify it appears in the build output).
4. **Reference docs.webforj.com** in the application -- if that site was approved, linking to it as a sister project under the same organization may help.

---

## P2: i18n Build Time and CI/CD Explosion

**Category:** Internationalization
**Severity:** High -- can break deployment pipeline and developer experience
**Phase:** Content - Internationalization

### The Pitfall

Docusaurus i18n creates a **completely separate build** for each locale. Adding French and Spanish means the build pipeline goes from 1 build to 3 builds. For a 12-chapter course with 25+ Markdown files, this:

- Triples build time in GitHub Actions (currently ~2 min, becomes ~6 min).
- Triples the size of the `build/` artifact uploaded to GitHub Pages.
- Can exceed GitHub Pages' 1 GB deployment size limit if images are not optimized.
- Makes `npm start` painfully slow during development because hot reload must handle multiple locale builds.

The current deploy workflow (`deploy.yml`) runs a single `npm run build` -- it does not account for locale-specific builds.

### Warning Signs

- `npm run build` time jumps from ~60s to 3+ minutes after adding locales.
- GitHub Actions deploy job starts timing out or using excessive minutes.
- Developer experience degrades: `npm start` becomes noticeably slower.
- Build output exceeds 500 MB.

### Prevention Strategy

1. **Start with one additional locale (e.g., Spanish) before adding French.** Validate the full pipeline with 2 locales before scaling to 3.
2. **Use `npm run build -- --locale en` during development** to build only English and avoid the multi-locale penalty. Add a `package.json` script: `"start:en": "docusaurus start --locale en"`.
3. **Update `deploy.yml` early.** The build command must become `npm run build` (which builds all locales by default) or use explicit `--locale` flags per environment.
4. **Optimize images before i18n.** Convert PNGs in `static/img/` to WebP, implement responsive sizes. The current "Large Static Assets" concern (noted in CONCERNS.md) will be amplified 3x by i18n.
5. **Use Docusaurus `i18n/` directory structure correctly from the start:**
   ```
   i18n/
     fr/
       docusaurus-plugin-content-docs/
         current/
           01-gui-to-bui-to-dwc/
             index.md
     es/
       docusaurus-plugin-content-docs/
         current/
           ...
   ```
   The deeply nested path (`docusaurus-plugin-content-docs/current/`) is non-obvious and projects frequently get it wrong, placing translated files in `i18n/fr/docs/` which Docusaurus silently ignores.
6. **Do NOT translate sidebar labels manually.** Use `docusaurus write-translations` to generate the JSON translation files, then translate those. Manual sidebar translation is fragile and breaks when the English sidebar changes.

---

## P3: AI Chat API Key Exposure on Static Site

**Category:** AI Chat Assistant
**Severity:** Critical -- security and cost risk
**Phase:** Platform - AI Chat Assistant

### The Pitfall

A client-side AI chatbot on a static GitHub Pages site has no backend to proxy API calls. This means the LLM API key (OpenAI, Anthropic, etc.) must either be:

1. **Embedded in client-side JavaScript** -- exposed to anyone who opens DevTools. Attackers scrape these keys and run up thousands of dollars in charges within hours.
2. **Entered by each user** -- terrible UX that kills adoption.
3. **Proxied through a free/cheap serverless function** -- but the project constraint says "no backend."

Projects commonly embed the key in environment variables at build time, thinking `process.env.REACT_APP_API_KEY` is safe because it is an "environment variable." It is not. Docusaurus injects these into the client bundle at build time; they are visible in the deployed JavaScript.

### Warning Signs

- Any `.env` file with an API key and a corresponding `process.env` reference in client code.
- API key visible in the built `bundle.js` using a simple text search.
- Unexpected charges on the LLM provider dashboard within days of deployment.
- GitHub secret scanning alerts for committed API keys.

### Prevention Strategy

1. **Choose an architecture that eliminates the API key problem entirely:**
   - **Option A: Use a free, no-API-key service** like an embedded chatbot widget from a provider that handles authentication on their end (e.g., Inkeep, Mendable, or Kapa.ai for docs). These provide a script tag with a site-specific token that has rate limiting and domain restrictions built in.
   - **Option B: Use a serverless proxy** via Cloudflare Workers (free tier: 100k requests/day), Vercel Edge Functions, or Netlify Functions. This does NOT require moving off GitHub Pages -- the chat widget calls the proxy, the proxy calls the LLM. The API key lives only in the proxy's environment.
   - **Option C: Client-side-only RAG** using WebLLM or a small local model. Novel but the experience is poor on low-end devices.
2. **Never store API keys in `docusaurus.config.ts`, `.env` files that get built, or any file in the repository.**
3. **If using a serverless proxy, add domain-origin checking** so only requests from the actual site domain are accepted.
4. **Set hard spending limits** on whatever LLM provider account is used ($20/month cap, for example).

---

## P4: Synthesia Video Embedding Performance and Hosting Cost

**Category:** Video / Multimedia
**Severity:** Medium -- degrades user experience and may hit budget constraints
**Phase:** Content - Video/Multimedia

### The Pitfall

Synthesia generates videos as MP4 files or hosted video links. Common mistakes:

1. **Self-hosting MP4 files in `static/`**: A 5-minute Synthesia video at 1080p is ~50-100 MB. With 12 chapters in 4 languages, that is 2.4-4.8 GB of video in the repository. GitHub Pages has a 1 GB recommended size limit. Git repositories with large binary files become unusable.
2. **Embedding Synthesia's hosted player without lazy loading**: Each embedded video loads its player iframe immediately, adding 2-5 MB of JavaScript per page. A page with 3 videos becomes painfully slow.
3. **No fallback for users who cannot play video**: Corporate firewalls frequently block video CDNs. Self-paced learners on slow connections cannot stream video effectively.

### Warning Signs

- Repository size grows past 500 MB after adding video files.
- `git clone` takes minutes instead of seconds.
- Lighthouse performance score drops below 50 on pages with embedded videos.
- Users in corporate environments report "video not loading."

### Prevention Strategy

1. **Never commit video files to the Git repository.** Use Synthesia's hosted embed links or upload to YouTube (unlisted) and embed from there. Both are free and handle CDN, transcoding, and adaptive bitrate.
2. **Implement lazy loading for all video embeds.** Create a custom `<VideoEmbed>` React component that shows a thumbnail and title, loading the actual iframe only when the user clicks play. This is critical for pages listing multiple chapter videos.
3. **Always provide a text alternative.** Every Synthesia video should have a corresponding transcript or caption block directly on the page. This serves accessibility, SEO, corporate firewall users, and the AI chatbot (which can index text but not video).
4. **Use Synthesia's built-in multi-language feature** to generate FR/ES/DE versions of the same video rather than creating separate video projects per language. This keeps the video count manageable.
5. **Coordinate video language with i18n locale.** The French version of a page should embed the French video, not the English one. This requires the video component to be locale-aware -- use Docusaurus's `useDocusaurusContext()` or `useCurrentLocale()` hook to select the correct embed URL.

---

## P5: i18n Translation Drift and Maintenance Burden

**Category:** Internationalization
**Severity:** High -- creates long-term maintenance debt that kills non-English content
**Phase:** Content - Internationalization

### The Pitfall

AI-assisted translation of 25+ Markdown files into French and Spanish creates a hidden maintenance burden. When the English source is updated (new code example, corrected instruction, additional section), the translations become stale. Projects commonly:

1. Update English content but forget to update FR/ES versions.
2. Have no mechanism to detect which translations are out of date.
3. End up with French/Spanish versions that are months behind English, eroding trust with the non-English audience -- the exact opposite of the project's strategic goal.

The BBj DWC training content is technical and version-sensitive (references to BBj 24.02, specific APIs). Stale translations are not just annoying -- they are actively harmful when they reference wrong API behavior.

### Warning Signs

- English pages have recent `git log` dates; translated pages show commits only from the initial translation.
- Users report discrepancies between English and translated content.
- No CI check flags stale translations.
- Team avoids updating English content because "we would also have to update FR and ES."

### Prevention Strategy

1. **Track translation freshness.** Add a `translation_source_hash` or `last_synced_commit` field to translated file frontmatter. A simple CI script can compare the English file's last-modified commit against this hash and flag stale translations.
2. **Implement a translation status page** (even a simple generated Markdown table in the docs) showing which pages are up-to-date, stale, or missing for each locale.
3. **Prioritize breadth over depth initially.** Translate chapter overviews and high-traffic pages first. Mark untranslated pages with a banner: "This page is not yet available in your language. Showing English version." Docusaurus does this automatically for missing translations -- do not fight it.
4. **Use `docusaurus write-translations` to extract all translatable strings.** Do not manually hunt for hardcoded strings in components. The `ChapterCards` component has hardcoded English titles and descriptions that must be wrapped in `<Translate>` tags before i18n will work for the homepage.
5. **Batch translation updates.** Rather than translating on every English change, establish a monthly sync cadence where all stale translations are regenerated via AI and reviewed.

---

## P6: Algolia Search Not Indexing Translated Content Correctly

**Category:** Search + i18n Intersection
**Severity:** Medium -- French/Spanish users cannot find content in their language
**Phase:** Platform - Search & Discovery + Content - Internationalization

### The Pitfall

When Algolia DocSearch (or any search solution) is configured for a single-locale site and then i18n is added later, the search index either:

1. **Indexes only English content** -- FR/ES users search in their language and get zero results.
2. **Mixes all locales into one index** -- users searching in French get English results mixed in, creating a confusing experience.
3. **Requires separate search indices per locale** -- tripling Algolia record usage and potentially exceeding the free tier's 10k record limit.

The Docusaurus Algolia plugin supports `contextualSearch: true` which filters by locale facets, but this must be configured from the start, not retrofitted.

### Warning Signs

- French users report that search only returns English results.
- Search index record count is 3x the number of English pages (indicating mixed indexing without faceting).
- Algolia dashboard shows queries in French/Spanish with zero hits.

### Prevention Strategy

1. **If using Algolia, enable `contextualSearch: true` in the theme config from the initial setup.** This adds locale and version facets to every indexed record.
2. **If using a local search plugin, verify it supports Docusaurus i18n.** `@easyops-cn/docusaurus-search-local` does support i18n with `language: ["en", "fr", "es"]` -- but it must be configured explicitly, it does not auto-detect locales.
3. **Plan the search and i18n features together, not sequentially.** If search ships in Phase 1 and i18n in Phase 3, the search configuration will need to be reworked. Design the search config to accommodate future locales even if they do not exist yet.
4. **Test search with non-ASCII characters** (accents in French/Spanish: e, n, etc.) early. Some search tokenizers handle these poorly.

---

## P7: Showcase Gallery Becoming a Maintenance Dead-End

**Category:** DWC Showcase Gallery
**Severity:** Medium -- feature ships but never gets updated, becoming stale
**Phase:** Platform - DWC Showcase Gallery

### The Pitfall

Documentation showcase galleries are one of the most commonly abandoned features. The initial gallery launches with 5-8 demos that look great. Then:

1. **No one owns adding new entries.** There is no process for submitting, reviewing, or approving showcase items.
2. **Screenshots go stale.** The showcased apps evolve but their screenshots in the gallery remain from v1.
3. **Dead links accumulate.** Demo apps get taken offline, moved, or put behind authentication. The gallery links to nothing.
4. **The gallery becomes a liability** -- prospects see broken links and outdated screenshots, forming a negative impression of DWC.

### Warning Signs

- Gallery data is hardcoded in a component (similar to current `ChapterList` pattern) with no clear owner or update process.
- Showcase entries reference `localhost` URLs or internal-only demo servers.
- No automated link checking in CI for showcase URLs.
- Gallery has not been updated in 3+ months after launch.

### Prevention Strategy

1. **Use a data file (`showcase.json` or `showcase.yaml`) rather than hardcoding in components.** This lowers the barrier for non-developers to add entries via PR.
2. **Every showcase entry must have: title, description, screenshot, live URL, source URL (optional), and a `lastVerified` date.** The verified date creates accountability.
3. **Add a broken-link check in CI** that specifically tests showcase URLs. Docusaurus's `onBrokenLinks: 'throw'` only catches internal links -- external showcase URLs need explicit checking (a simple `curl` script in the GitHub Actions workflow).
4. **Start with BASIS-controlled demos only.** Do not include third-party or customer demos unless there is a commitment to maintain them. Internal demos can be kept alive; customer demos cannot.
5. **Include a "Submit Your App" call-to-action** linking to a GitHub issue template. This creates a lightweight contribution process without needing a full backend.

---

## P8: `future.v4: true` Flag Causing Breakage with New Plugins

**Category:** Configuration / Stability
**Severity:** Medium -- hard-to-diagnose build failures when adding plugins
**Phase:** All phases (affects every new integration)

### The Pitfall

The current `docusaurus.config.ts` enables `future: { v4: true }` which opts into experimental Docusaurus v4 behaviors. When adding Algolia, i18n, or any third-party plugin, this flag can cause:

1. **Plugins that work on standard Docusaurus 3.9.2 fail silently or throw cryptic errors** because v4 compatibility mode changes routing, bundling, or plugin lifecycle behavior.
2. **Debugging is extremely difficult** because the developer does not realize the `v4` flag is the root cause. They blame the plugin, search Stack Overflow for the error, and find nothing because few people use this flag.
3. **When Docusaurus 4 actually releases**, the `future.v4` flag behavior may change, breaking the site again.

### Warning Signs

- New plugin installation works on a fresh Docusaurus project but fails on this one.
- Build errors referencing "Module not found" or "Invalid hook call" after adding a plugin.
- Algolia or search plugin throws errors about missing routes or undefined context.

### Prevention Strategy

1. **Document the `future.v4: true` flag prominently** so every developer working on the project knows it is enabled.
2. **When any new plugin fails to install, the first debugging step should be**: disable `future.v4`, rebuild, test. If the plugin works without the flag, you have found the root cause.
3. **Consider removing the flag** before beginning the enhancement phases. Unless specific v4 features are actively being used (verify this -- the current codebase shows no evidence of needing v4 features), the risk outweighs the benefit.
4. **Pin the Docusaurus version at 3.9.2** in `package.json` (it already uses exact versions) and do not upgrade Docusaurus during the enhancement project. Upgrade after all features are stable.

---

## P9: React 19 Incompatibility with Docusaurus Theme Components and Plugins

**Category:** Dependency Compatibility
**Severity:** Medium-High -- can block plugin integration entirely
**Phase:** All phases (especially search and AI chat widget phases)

### The Pitfall

The project uses React 19 with Docusaurus 3.9.2. Docusaurus 3.x was built for React 18. While basic rendering works, third-party plugins and swizzled theme components may:

1. **Use React 18-specific APIs** (e.g., `ReactDOM.render` instead of `createRoot`) that are removed in React 19.
2. **Trigger hydration mismatches** that are more strictly enforced in React 19.
3. **Cause the Algolia search component to fail** if it depends on React 18 internals.
4. **Break AI chat widget libraries** that have not been updated for React 19.

### Warning Signs

- Console warnings about `ReactDOM.render` deprecation or removal.
- Hydration mismatch errors that only appear in production builds, not dev server.
- Third-party component renders on server but not on client (or vice versa).
- `npm install` shows peer dependency warnings for React version mismatches.

### Prevention Strategy

1. **Before adding any third-party package, check its React peer dependency.** If it specifies `"react": "^18"`, test in an isolated branch before merging.
2. **Consider downgrading to React 18 before the enhancement project begins.** Unless React 19 features are actively used (the current codebase shows no evidence of this -- no use of `use()`, server actions, or other React 19 features), React 18 is the safer choice for maximum plugin compatibility.
3. **If staying on React 19, use `--legacy-peer-deps` sparingly.** This flag masks real incompatibilities; use it only as a last resort and document every instance.
4. **Test each new plugin in the full build pipeline** (`npm run build && npm run serve`), not just `npm start`. Hydration issues often only surface in production builds.

---

## P10: Client-Side AI Chat Providing Wrong or Hallucinated DWC Answers

**Category:** AI Chat Quality
**Severity:** High -- undermines trust in the entire training course
**Phase:** Platform - AI Chat Assistant

### The Pitfall

An AI chatbot that "knows" the DWC course content can hallucinate plausible-sounding but incorrect BBj/DWC API usage, method signatures, or configuration instructions. For a training course, this is worse than having no chatbot at all because:

1. Learners trust the chatbot because it is embedded in the official training site.
2. Wrong code examples from the chatbot waste hours of debugging time.
3. The BBj/DWC ecosystem is niche -- LLMs have very limited training data on it, making hallucination more likely than for mainstream technologies.

### Warning Signs

- Chatbot confidently provides BBj method names that do not exist.
- Chatbot answers questions about DWC features using generic web framework knowledge (React, Angular patterns) instead of actual DWC APIs.
- Users report "the chatbot told me to use X but the docs say Y."

### Prevention Strategy

1. **Use Retrieval-Augmented Generation (RAG), not raw LLM prompting.** The chatbot must retrieve relevant chunks from the actual course content before generating an answer. This grounds responses in verified material.
2. **Limit the chatbot's scope explicitly.** It should say "I can only answer questions about the BBj DWC Training Course content" and decline questions outside that scope rather than guessing.
3. **Add source citations to every answer.** The chatbot should link to the specific chapter/section it drew information from, allowing users to verify.
4. **Include a visible disclaimer:** "AI-generated responses may contain errors. Always verify against the course material."
5. **Test the chatbot against a set of 20-30 known questions with verified answers** before launch. Include trick questions about features DWC does not have.
6. **Consider read-only mode initially:** The chatbot finds and surfaces existing content rather than generating new explanations. This is lower risk and still highly valuable for the "consultant cherry-picking topics" use case.

---

## P11: GitHub Pages Base URL Breaking After i18n or New Feature Routes

**Category:** Deployment / Routing
**Severity:** Medium -- site deploys but pages 404
**Phase:** Content - Internationalization, Platform - Showcase

### The Pitfall

The site is deployed to `https://BasisHub.github.io/DWC-Course/` with `baseUrl: '/DWC-Course/'`. When i18n is added, Docusaurus generates routes like `/DWC-Course/fr/01-gui-to-bui-to-dwc/`. When the showcase is added, it may be at `/DWC-Course/showcase/`. Common mistakes:

1. **Testing locally at `localhost:3000/` (no base URL) and assuming production will work.** Links that work in dev break in production because the base URL prefix is missing.
2. **Hardcoding internal links** in Markdown or components without using Docusaurus's `Link` component or `useBaseUrl` hook. These links break when the base URL changes.
3. **Showcase or custom pages using `<a href="/showcase">` instead of `<Link to="/showcase">`.** The raw href misses the base URL prefix.
4. **GitHub Pages SPA routing caveat:** GitHub Pages does not support client-side routing natively. Deep links to `/DWC-Course/fr/03-dwc-debugging/` return 404 unless a custom 404.html redirect is in place.

### Warning Signs

- Pages work on `npm run serve` locally but 404 on GitHub Pages.
- Links in the showcase or new custom pages return 404 in production.
- French/Spanish locale URLs return 404 on direct access (but work when navigating from the homepage).

### Prevention Strategy

1. **Always test with `npm run build && npm run serve -- --host 0.0.0.0`** which serves with the correct base URL. Never rely on `npm start` alone for routing validation.
2. **Use Docusaurus's `Link` component and `useBaseUrl` hook for all internal links.** Never use raw `<a>` tags for internal navigation.
3. **Verify GitHub Pages handles the SPA routing correctly.** Docusaurus generates a `404.html` that redirects to the correct page -- ensure this file is present in the build output and is not being overridden.
4. **Add a post-build link validation step** to the CI pipeline that crawls the built site and checks for 404s. Tools like `broken-link-checker` or `linkinator` can do this.
5. **Note the CONCERNS.md flag about baseUrl mismatch** (`/DWC-Course/` vs `/bbj-dwc-tutorial/`). Resolve this discrepancy before adding any new routes.

---

## P12: Scope Creep from "Content Depth Enhancement" Phase

**Category:** Project Management
**Severity:** High -- delays all other features
**Phase:** Content - Depth Enhancement

### The Pitfall

"More code examples, architecture diagrams, annotated screenshots" for 12 chapters is an unbounded task. Content enhancement is the phase most likely to consume all available time, because:

1. Every chapter can always be "deeper" -- there is no natural stopping point.
2. Creating architecture diagrams and annotated screenshots is time-intensive (1-3 hours per diagram).
3. The content is already "proven and field-tested" -- the urge to perfect it can delay shipping features that have more user-visible impact (search, chat, i18n).
4. Content enhancement does not produce a shippable, demonstrable artifact the way search or chat does.

### Warning Signs

- Content enhancement phase runs 2x longer than estimated.
- Other phases keep getting pushed back because "we are still finishing the content."
- Team is creating diagrams for chapters that get low traffic.
- No definition of "done" for content depth.

### Prevention Strategy

1. **Define explicit completion criteria per chapter** before starting: "Chapter X needs: 2 additional code examples, 1 architecture diagram, and an updated introduction." No open-ended "enhance as needed."
2. **Prioritize by traffic and consultant need.** Chapters 1-3 (getting started, debugging) and Chapter 12 (deployment) are likely highest-traffic. Enhance those first; later chapters can be enhanced incrementally.
3. **Timebox the phase.** Allocate a fixed number of days, not "until done." Ship what is complete, track remaining items as backlog.
4. **Run content enhancement in parallel with platform features, not sequentially.** Content and platform work are largely independent and can proceed simultaneously.

---

## Phase Mapping Summary

| Pitfall | Relevant Phase(s) | When to Address |
|---------|-------------------|-----------------|
| P1: Algolia rejection | Search & Discovery | First week of search phase |
| P2: i18n build explosion | Internationalization | Before adding first locale |
| P3: API key exposure | AI Chat Assistant | Architecture decision phase |
| P4: Video hosting/performance | Video/Multimedia | Before first video embed |
| P5: Translation drift | Internationalization | During i18n architecture design |
| P6: Search + i18n conflict | Search + i18n intersection | Plan together, even if built separately |
| P7: Showcase staleness | Showcase Gallery | Showcase architecture phase |
| P8: `future.v4` flag | All phases | Before any new plugin integration |
| P9: React 19 compat | All phases | Before any new plugin integration |
| P10: AI hallucination | AI Chat Assistant | Before chatbot launch |
| P11: Base URL routing | i18n + Showcase | Before adding new routes |
| P12: Content scope creep | Depth Enhancement | Before content work begins |

---

## Pre-Flight Checklist (Address Before Any Phase Begins)

These items from P8, P9, and P11 should be resolved before any enhancement work starts:

- [ ] Decide whether to keep or remove `future: { v4: true }` from `docusaurus.config.ts`
- [ ] Decide whether to stay on React 19 or downgrade to React 18 for plugin compatibility
- [ ] Resolve the `baseUrl` discrepancy between config (`/DWC-Course/`) and CLAUDE.md (`/bbj-dwc-tutorial/`)
- [ ] Verify `sitemap.xml` is being generated in the build output
- [ ] Add `npm run typecheck` to the CI pipeline before the build step
- [ ] Optimize existing images in `static/img/` before i18n multiplies them

---

*Pitfalls analysis: 2026-01-31*
