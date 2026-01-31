# Architecture

**Analysis Date:** 2026-01-31

## Pattern Overview

**Overall:** Docusaurus Static Site Generation with React Components

**Key Characteristics:**
- Content-driven documentation site using Markdown files as primary source
- React 19 components for interactive UI elements and dynamic data rendering
- TypeScript for type-safe component development
- CSS Modules for scoped component styling
- Global CSS customization via Infima theme variables
- Docusaurus 3.9.2 framework handles routing, build, and deployment

## Layers

**Content Layer:**
- Purpose: Stores course documentation as versioned, structured Markdown files
- Location: `docs/` directory (organized by chapter number)
- Contains: YAML frontmatter for metadata + Markdown content with embedded components
- Depends on: Docusaurus for rendering and sidebars navigation
- Used by: Docusaurus build system to generate static HTML pages

**Component Layer:**
- Purpose: Provides interactive React components that render dynamic content on pages
- Location: `src/components/`
- Contains: React TSX components with type definitions and local CSS modules
- Depends on: React, Docusaurus theme components (e.g., `@theme/Heading`), utilities (e.g., clsx)
- Used by: Markdown pages via MDX imports (e.g., `<ChapterCards />`)

**Styling Layer:**
- Purpose: Global theme customization and component-specific scoped styles
- Location: `src/css/custom.css` (global) and `src/components/*/styles.module.css` (scoped)
- Contains: CSS variables (Infima theming), dark mode overrides, external link icons
- Depends on: Infima CSS framework (bundled by Docusaurus)
- Used by: All components and pages for visual consistency

**Configuration Layer:**
- Purpose: Defines site metadata, navigation structure, and build settings
- Location: `docusaurus.config.ts`, `sidebars.ts`, `tsconfig.json`
- Contains: Site title, base URL, navbar/footer links, theme config, syntax highlighting
- Depends on: Docusaurus types and presets
- Used by: Docusaurus build process and development server

**Static Assets Layer:**
- Purpose: Serves static images and favicon files
- Location: `static/img/` and `static/` root
- Contains: SVG icons, PNG images, GIFs for documentation
- Depends on: File system
- Used by: Component imports and Markdown image references

## Data Flow

**Page Render Flow:**

1. User visits a URL (e.g., `/gui-to-bui-to-dwc`)
2. Docusaurus routing resolves to corresponding `docs/01-gui-to-bui-to-dwc/index.md`
3. Markdown file frontmatter is parsed for metadata (title, slug, sidebar_position)
4. Markdown content is rendered with embedded React components (e.g., `<ChapterCards />`)
5. Components import data arrays (ChapterList, FeatureList) and render with CSS Module styles
6. Global custom.css applies theme overrides and external link styling
7. Static site is served from `build/` directory

**Homepage Data Flow:**

1. `docs/index.md` imports `ChapterCards` component
2. `src/components/ChapterCards/index.tsx` defines 12-item ChapterList array
3. Component maps over array, rendering individual `ChapterCard` items
4. Each card links to chapter path via `Link` component with slug from data
5. Styles applied from `src/components/ChapterCards/styles.module.css`
6. Feature cards on homepage use similar pattern with `HomepageFeatures` component

**State Management:**
- No client-side state management (static site generation)
- Data is hardcoded in component arrays (ChapterList, FeatureList)
- Navigation and routing handled by Docusaurus/browser
- No runtime database or API calls

## Key Abstractions

**ChapterCards Component:**
- Purpose: Renders grid of 12 course chapters with icons, titles, and descriptions
- Examples: `src/components/ChapterCards/index.tsx`
- Pattern: Type-safe React component with TypeScript interfaces, CSS Module styling, Link-based routing

**HomepageFeatures Component:**
- Purpose: Displays feature highlights with SVG icons and descriptions
- Examples: `src/components/HomepageFeatures/index.tsx`
- Pattern: Reusable card component pattern with data array and mapping

**Markdown Pages:**
- Purpose: Main content delivery using Markdown with YAML frontmatter
- Examples: `docs/01-gui-to-bui-to-dwc/index.md`, `docs/prerequisites.md`
- Pattern: Chapter directories contain index.md (overview) plus numbered section files (01-*.md, 02-*.md)

## Entry Points

**Homepage:**
- Location: `docs/index.md`
- Triggers: User visits `/` or site root
- Responsibilities: Imports and displays ChapterCards component, provides course overview and setup instructions

**Chapter Pages:**
- Location: `docs/{NN}-{chapter-name}/index.md`
- Triggers: User clicks chapter link or navigates to chapter URL
- Responsibilities: Displays chapter overview with section links and embedded content

**Static Pages:**
- Location: `docs/{file}.md` (e.g., prerequisites.md, resources.md, samples.md)
- Triggers: Direct navigation or footer/navbar links
- Responsibilities: Display course requirements, external resources, and sample code information

## Error Handling

**Strategy:** No explicit error handling layer; relies on Docusaurus and React defaults

**Patterns:**
- Broken links trigger Docusaurus build error (onBrokenLinks: 'throw')
- Broken Markdown links generate warnings (onBrokenMarkdownLinks: 'warn')
- TypeScript type checking via `npm run typecheck` prevents component prop errors
- React development mode shows console warnings for missing keys, prop type mismatches

## Cross-Cutting Concerns

**Styling:** Theme customization via CSS custom properties (Infima variables) in `src/css/custom.css`
- Light mode primary color: `#2e8555` (green)
- Dark mode primary color: `#25c2a0` (teal)
- External links automatically display icon via CSS ::after pseudo-element

**Routing:** Docusaurus automatic routing based on file system
- Slug frontmatter overrides default URL paths
- Sidebar auto-generation from directory structure
- Base URL configured to `/DWC-Course/` for GitHub Pages deployment

**Deployment:** GitHub Actions workflow (`/.github/workflows/deploy.yml`)
- Triggers: Push to main branch
- Build: Node 20, npm ci, npm run build
- Deploy: Artifacts uploaded to GitHub Pages

---

*Architecture analysis: 2026-01-31*
