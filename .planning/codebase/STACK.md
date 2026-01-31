# Technology Stack

**Analysis Date:** 2026-01-31

## Languages

**Primary:**
- TypeScript 5.6.2 - Component definitions, configuration files, type safety for React components
- JavaScript - Runtime execution in Node.js and browser environments

**Secondary:**
- Markdown - Course content in `docs/` directory
- CSS - Styling in `src/css/custom.css`
- YAML - GitHub Actions workflow configuration

## Runtime

**Environment:**
- Node.js 20.0+ (enforced in `package.json` engines field)

**Package Manager:**
- npm 10.9.4
- Lockfile: `package-lock.json` (lockfileVersion 3, committed to repository)

## Frameworks

**Core:**
- Docusaurus 3.9.2 - Static site generator for documentation
- @docusaurus/preset-classic 3.9.2 - Classic theme preset with blog, docs, and pages support
- React 19.0.0 - UI component library for interactive elements
- React DOM 19.0.0 - React rendering target for browser

**Syntax Highlighting:**
- prism-react-renderer 2.3.0 - Syntax highlighting with support for Java, Bash, and custom BBj language
- Prism themes (GitHub light, Dracula dark)

**Utilities:**
- clsx 2.0.0 - Conditional CSS class composition for React components
- @mdx-js/react 3.0.0 - JSX/React support in Markdown files

## Key Dependencies

**Critical:**
- @docusaurus/core 3.9.2 - Core Docusaurus framework for building and serving
- @docusaurus/preset-classic 3.9.2 - Default preset providing docs, blog, pages functionality

**Development Type Support:**
- @docusaurus/types 3.9.2 - TypeScript type definitions for Docusaurus
- @docusaurus/module-type-aliases 3.9.2 - Type aliases for Docusaurus modules
- @docusaurus/tsconfig 3.9.2 - Extended TypeScript configuration for Docusaurus projects

## Configuration

**Environment:**
- No `.env` files required
- All configuration in `docusaurus.config.ts` (TypeScript format)
- GitHub Pages base URL: `/DWC-Course/` (GitHub organization: BasisHub, project: DWC-Course)

**Build:**
- Config file: `docusaurus.config.ts`
- TypeScript config: `tsconfig.json` (extends @docusaurus/tsconfig)
- Excluded from TypeScript: `.docusaurus`, `build` directories

## Platform Requirements

**Development:**
- Node.js 20.0 or later
- npm (or yarn) package manager
- Git for version control

**Production:**
- GitHub Pages hosting (automatic deployment via GitHub Actions on push to main branch)
- Static site (no backend server required)
- Web browser with modern JavaScript support

**Browser Support (from package.json browserslist):**
- Production: >0.5% market share, not dead browsers, not Opera Mini
- Development: Last 3 Chrome, Firefox, and 5 Safari versions

## Additional Tools

**Typecheck:**
- TypeScript compiler (`tsc`) for type checking
- Command: `npm run typecheck`

**Development Server:**
- Docusaurus dev server with hot reload
- Command: `npm start` (runs on http://localhost:3000)

---

*Stack analysis: 2026-01-31*
