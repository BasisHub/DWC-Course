# External Integrations

**Analysis Date:** 2026-01-31

## APIs & External Services

**Documentation Links:**
- BASIS Online Help - https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm
  - Integrated in: `docusaurus.config.ts` footer links
  - Purpose: Reference to main BASIS documentation portal

- DWC Documentation - https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm
  - Integrated in: `docusaurus.config.ts` navbar and footer
  - Purpose: Link to Dynamic Web Client official documentation

**GitHub Integration:**
- GitHub repository link in navbar: https://github.com/BasisHub/DWC-Course
- Organization: BasisHub
- Project: DWC-Course
- Integration: `docusaurus.config.ts` navbar configuration

## Data Storage

**Databases:**
- None - Static site generator, no runtime database

**File Storage:**
- Local filesystem only
  - Static assets: `static/img/` directory
  - Documentation source: `docs/` directory (Markdown files)
  - Built output: `build/` directory (gitignored)

**Caching:**
- Docusaurus cache: `.docusaurus/` directory (gitignored)
- Build cache: `.cache-loader` directory (gitignored)

## Authentication & Identity

**Auth Provider:**
- None required - Public documentation site
- GitHub authentication optional for editing workflow via GitHub web interface

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Node.js stdout/stderr for development
- GitHub Actions logs for CI/CD pipeline (`.github/workflows/deploy.yml`)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
- URL: https://BasisHub.github.io/DWC-Course/
- Base path: `/DWC-Course/`
- Deployment: Automatic on push to main branch

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Trigger: Push to main branch or manual workflow_dispatch
- Steps:
  1. Checkout code (actions/checkout@v4)
  2. Setup Node.js 20 (actions/setup-node@v4)
  3. Cache npm dependencies
  4. Install dependencies (npm ci)
  5. Build website (npm run build)
  6. Upload artifact (actions/upload-pages-artifact@v3)
  7. Deploy to GitHub Pages (actions/deploy-pages@v4)

**Build Output:**
- Static files generated in `build/` directory
- Deployed to GitHub Pages via Actions

## Environment Configuration

**Required env vars:**
- None - All configuration in `docusaurus.config.ts`

**Optional env vars:**
- `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local` (gitignored if created)

**Secrets location:**
- GitHub Actions secrets for deployment (handled by GitHub Pages environment)
- No application secrets required

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Configuration

**Sidebar Navigation:**
- Generated from `sidebars.ts`
- Auto-generated structure from `docs/` directory structure
- Chapter ordering via `sidebar_position` in Markdown frontmatter

**Markdown Enhancements:**
- MDX support via @mdx-js/react (allows React components in Markdown)
- Code syntax highlighting for Java, Bash, and custom BBj language
- Broken link detection (throws on broken links in config)

---

*Integration audit: 2026-01-31*
