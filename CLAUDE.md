# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.9.2 documentation website for the BBj Dynamic Web Client (DWC) Training Course. It's a 12-chapter training curriculum teaching BBj DWC development.

## Common Commands

```bash
npm start          # Start dev server at http://localhost:3000 with hot reload
npm run build      # Build static site to /build directory
npm run serve      # Serve built site locally
npm run typecheck  # Run TypeScript type checking
npm run clear      # Clear generated files and cache
```

Note: The README mentions yarn but package-lock.json indicates npm is used. Both work.

## Architecture

**Framework:** Docusaurus with React 19 and TypeScript

**Key directories:**
- `docs/` - Main course content as Markdown files. Chapters are numbered (01-, 02-, etc.) for ordering
- `src/components/` - React components (TypeScript)
- `src/css/custom.css` - Theme customization (green color scheme, dark mode support)
- `static/` - Static assets like images
- `build/` - Generated output (gitignored)

**Configuration files:**
- `docusaurus.config.ts` - Main site config (title, base URL, navbar, footer, syntax highlighting)
- `sidebars.ts` - Navigation structure (auto-generated from docs directory)

## Content Authoring

Documentation pages use Markdown with YAML frontmatter:
- `sidebar_position` controls ordering within a chapter
- `slug` sets the URL path
- `title` sets the page title

Code blocks support syntax highlighting for Java, Bash, and BBj (custom language).

## Deployment

GitHub Actions deploys to GitHub Pages on push to main branch. The workflow is in `.github/workflows/deploy.yml`.

Base URL is `/DWC-Course/` (configured for GitHub Pages).

## Notes

- No test framework configured
- No linting/formatting tools configured
- Requires Node.js 20+
- Blog functionality exists but is disabled in config
