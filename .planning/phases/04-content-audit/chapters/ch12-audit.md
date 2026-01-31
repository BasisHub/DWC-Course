# Chapter 12: Deployment Options - Audit

| Dimension | Score (1-5) | Key Finding |
|-----------|-------------|-------------|
| Clarity | 4 | Well-written; embedded deployment template is clear and immediately usable; PWA concepts explained accessibly |
| Logical Flow | 4 | Good progression: standard URL -> embedded deployment -> PWA; from simple to complex |
| Completeness | 3 | Embedded deployment is well-covered; PWA section describes capabilities but lacks step-by-step setup commands; standard URL deployment gets only 3 lines |
| Relevance | 4 | Deployment is the final step every DWC developer needs; all three options are real deployment scenarios |
| Code Examples Quality | 4 | Embedded HTML template is complete and copy-paste ready; manifest.json example is practical; iframe multi-app pattern is useful |
| i18n Readiness | 4 | Technical prose; English text in code templates ("DWC Embedded Hello") is expected; "Embedded DWC webapp 'hello' is offline" noscript text would need translation |

**Overall: 3.8 / 5.0**

## Detailed Findings

### Completeness (3)

**Task lens:** A learner CAN deploy an embedded DWC app after reading this chapter -- the HTML template is complete and the file placement instructions are clear. However, they CANNOT set up a PWA: the BBjPWA section lists capabilities and links to the GitHub repo but provides no actual CLI commands, no `package.json` configuration, and no step-by-step walkthrough.

**Topic lens:** The deployment domain includes:
- Standard webapp URL deployment (covered in 3 lines -- barely a mention)
- URL mapping customization in Enterprise Manager (mentioned but not shown)
- Embedded deployment (well-covered)
- PWA setup and configuration (described but not demonstrated)
- SSL/HTTPS configuration (not covered -- critical for PWA and production)
- Reverse proxy setup (not covered -- common production deployment pattern)
- Docker/containerized deployment (not covered)

### Code Examples Quality (4)

Strengths:
- Embedded HTML template (lines 31-43) is complete, well-formatted, and immediately usable
- Manifest.json example is practical with real-looking values
- Iframe pattern for multi-app deployment is a clever, non-obvious solution
- The `:::warning` admonition about single-app-per-page limitation is valuable

Minor gaps:
- No BBjPWA CLI commands shown (the tool is referenced but never demonstrated)
- No example of customizing the embedded deployment (adding analytics, custom CSS)
- Standard URL deployment has no example of URL mapping configuration

### Logical Flow (4)

The progression from standard URL (simplest) -> embedded (custom HTML) -> PWA (most complex) is a natural and well-chosen ordering. Each section builds conceptual complexity. The "Choosing a Deployment Option" comparison table at the end is an excellent summary.

The only flow issue: the standard URL section is so brief (lines 12-19) that it feels like it was supposed to be a foundation section but was skipped. Since this is the DEFAULT deployment approach, it deserves more than 3 lines.

## Content Gaps

- **Standard URL deployment walkthrough** -- How to publish a DWC app, configure the webapp URL mapping in Enterprise Manager, and verify it works. Currently assumes the reader already knows this.
- **BBjPWA CLI commands** -- The tool is referenced and its capabilities listed, but no actual CLI invocation is shown (e.g., `npx bbj-pwa init`, configuration options)
- **HTTPS/SSL setup** -- PWAs require HTTPS; this is mentioned in the PWA features table ("Served over HTTPS") but no guidance on setting it up for BBj
- **Reverse proxy patterns** -- Common production pattern (nginx/Apache in front of BBj); not covered
- **No exercise or hands-on task** -- This is the capstone chapter; an exercise deploying an app would be a strong closer
- **Only 0-1 images** -- No screenshots of a deployed embedded app, no PWA install prompt, no Enterprise Manager configuration screen

## Recommendations

### Additive
1. **Add deployment decision flowchart (Mermaid)** -- Recommended in RESEARCH; would visualize the decision tree: "Do you need custom branding? -> Embedded. Need offline support? -> PWA. Standard deployment? -> webapp URL." (HIGH priority)
2. **Add BBjPWA CLI walkthrough** -- Show actual commands to initialize, configure, and generate PWA assets; this is the biggest gap in the chapter
3. **Expand standard URL section** -- Add Enterprise Manager URL mapping screenshot and step-by-step configuration (3-5 more lines minimum)
4. **Add deployment screenshots** -- Show embedded app in browser, PWA install prompt on mobile, Enterprise Manager config screen
5. **Add capstone exercise** -- "Deploy the training app as an embedded DWC app and as a PWA" -- ties together the entire course

### Subtractive
6. **Consider condensing PWA features table** -- The table on lines 82-89 lists generic PWA benefits (responsive, secure, installable) that are not BBj-specific. Shorten to focus on what BBjPWA specifically provides.

## Mermaid Diagram Opportunities

**Flowchart for deployment option decision tree** (HIGH priority -- recommended in RESEARCH):
```
flowchart TD
    A[Deploy DWC App] --> B{Need custom HTML/branding?}
    B -->|Yes| C{Need offline support?}
    B -->|No| D[Standard webapp URL]
    C -->|Yes| E[PWA with BBjPWA]
    C -->|No| F[Embedded Deployment]
    D --> G[http://host:8888/webapp/app]
    F --> H[Custom HTML in htdocs/]
    E --> I[manifest.json + Service Worker]
```

This would replace the comparison table at the end (or complement it) and give learners an immediate decision path.

## i18n Notes

**Top 3 issues:**
1. English text in HTML template code: `<title>DWC Embedded Hello</title>` and noscript message "Embedded DWC webapp 'hello' is offline" -- these are user-facing strings in code examples that translators should be aware of
2. Manifest.json contains English strings (`"name": "My DWC App"`) -- expected in code examples but would be user-facing in production
3. External links to English-only resources (BBjPWA GitHub, MDN) -- not a blocker but note for localized versions that may need local-language alternatives
