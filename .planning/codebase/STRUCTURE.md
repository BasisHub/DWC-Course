# Codebase Structure

**Analysis Date:** 2026-01-31

## Directory Layout

```
bbj-dwc-tutorial/
├── docs/                           # Course content (12 chapters + root pages)
│   ├── index.md                    # Homepage with course overview
│   ├── prerequisites.md            # Course prerequisites
│   ├── resources.md                # External resource links
│   ├── samples.md                  # Sample code overview
│   ├── 01-gui-to-bui-to-dwc/       # Chapter 1 (and 02-12 similarly)
│   │   ├── index.md                # Chapter overview
│   │   ├── 01-registering-launching.md
│   │   ├── 02-hello-world.md
│   │   └── 03-gui-to-bui-to-dwc.md
│   └── [02-12]*/                   # Remaining 11 chapters
├── src/                            # React TypeScript source code
│   ├── components/                 # Reusable React components
│   │   ├── ChapterCards/           # Homepage chapter grid component
│   │   │   ├── index.tsx           # Component with hardcoded ChapterList
│   │   │   └── styles.module.css   # Component-scoped styles
│   │   └── HomepageFeatures/       # Feature highlights component
│   │       ├── index.tsx           # Component with hardcoded FeatureList
│   │       └── styles.module.css   # Component-scoped styles
│   ├── css/                        # Global styles
│   │   └── custom.css              # Theme variables and global overrides
│   └── pages/                      # Standalone pages (minimal usage)
│       ├── index.module.css        # (unused)
│       └── markdown-page.md        # (unused template)
├── static/                         # Static assets (copied to build/)
│   └── img/                        # Images and SVG files
│       ├── dwc-logo.png            # Navbar logo
│       ├── favicon.png             # Browser tab icon
│       ├── bbj-to-web.svg          # Feature icon
│       ├── css-layouts.svg         # Feature icon
│       ├── validation.svg          # Feature icon
│       ├── social-card.jpg         # OG image
│       └── [*.png, *.gif, *.svg]   # Chapter screenshots and demos
├── samples/                        # Sample BBj source code (not web content)
│   ├── 01_GUI2BUI2DWC/
│   ├── 02_CSSStylesAndCustomProperties/
│   └── [03-09]*/                   # Additional sample folders
├── docusaurus.config.ts            # Main Docusaurus configuration
├── sidebars.ts                     # Sidebar navigation configuration
├── tsconfig.json                   # TypeScript editor config (non-build)
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
└── .github/workflows/deploy.yml    # GitHub Actions deployment workflow
```

## Directory Purposes

**docs/:**
- Purpose: All course content, structured as numbered chapters with multiple sections per chapter
- Contains: Markdown files with YAML frontmatter, organized hierarchically
- Key files: `index.md` (homepage), `prerequisites.md`, `resources.md`, `samples.md`
- Pattern: Chapters are folders prefixed with numbers (01-, 02-, ..., 12-) to control sidebar order
- Sections within chapters are numbered files (01-*.md, 02-*.md, etc.) for subsection ordering

**src/components/:**
- Purpose: React components that add interactivity and dynamic rendering to Markdown pages
- Contains: TypeScript/TSX files with React components and scoped CSS modules
- Current components: `ChapterCards/` (12-item grid), `HomepageFeatures/` (3-item feature grid)
- Pattern: Each component has `index.tsx` and `styles.module.css` in separate subdirectories

**src/css/:**
- Purpose: Global styling and theme customization applied site-wide
- Contains: Single `custom.css` file with CSS custom properties and global selectors
- Usage: Overrides Infima theme variables, adds dark mode support, styles external links

**static/img/:**
- Purpose: Store image and SVG assets that are directly copied to build output
- Contains: PNG (raster), SVG (vector), GIF (animated), JPG (social media cards)
- Paths: Referenced in components via require() or in Markdown via relative paths

**samples/:**
- Purpose: Store sample BBj source code corresponding to each chapter
- Contains: Separate folders for each sample set (e.g., 01_GUI2BUI2DWC/)
- Role: Not used in web content; provided for learners to reference BBj code

## Key File Locations

**Entry Points:**
- `docs/index.md`: Homepage that renders ChapterCards component
- `docusaurus.config.ts`: Site configuration (title, base URL, navbar, footer, theme)
- `sidebars.ts`: Navigation structure (auto-generated from docs directory)

**Configuration:**
- `docusaurus.config.ts`: Docusaurus settings (line 5-117)
  - Base URL: `/DWC-Course/`
  - Organization: `BasisHub` / Project: `DWC-Course` (GitHub Pages)
  - Theme: Infima (classic preset)
  - Syntax highlighting: Java, Bash, BBj
- `tsconfig.json`: TypeScript editor settings (non-build config)
- `package.json`: Dependencies (React 19, Docusaurus 3.9.2) and npm scripts

**Core Logic:**
- `src/components/ChapterCards/index.tsx`: Defines 12-chapter data array and grid rendering logic
- `src/components/HomepageFeatures/index.tsx`: Defines 3-feature data array and rendering
- `src/css/custom.css`: Theme color variables, dark mode overrides, external link styling

**Testing:**
- No test files present (no test framework configured)

## Naming Conventions

**Files:**
- Markdown: Snake case with hyphens (e.g., `prerequisites.md`, `dwc-logo.png`)
- Components: PascalCase (e.g., `ChapterCards`, `HomepageFeatures`)
- Styles: `styles.module.css` (consistent across components)
- Images: Descriptive kebab-case (e.g., `bbj-to-web.svg`, `dwc-logo.png`)

**Directories:**
- Chapter directories: Numbered prefix with kebab-case description (e.g., `01-gui-to-bui-to-dwc`, `02-browser-developer-tools`)
- Component directories: PascalCase matching component export (e.g., `ChapterCards/`, `HomepageFeatures/`)
- Sample directories: Numbered prefix with underscores (e.g., `01_GUI2BUI2DWC`, `02_CSSStylesAndCustomProperties`)

**URLs/Slugs (from frontmatter):**
- Homepage: `/` (from `slug: /` in `docs/index.md`)
- Chapters: `/chapter-name` (e.g., `/gui-to-bui-to-dwc`, `/browser-developer-tools`)
- Root pages: `/page-name` (e.g., `/prerequisites`, `/resources`)

## Where to Add New Code

**New Feature:**
- Primary code: `src/components/{ComponentName}/index.tsx`
- Tests: No test directory exists (add to `src/components/{ComponentName}/__tests__/` if setting up tests)
- Styles: `src/components/{ComponentName}/styles.module.css`

**New Component/Module:**
- Implementation: `src/components/{ComponentName}/` with `index.tsx` and `styles.module.css`
- Import in Markdown: Add MDX import at top of `.md` file (e.g., `import MyComponent from '@site/src/components/MyComponent'`)

**New Chapter:**
- Create directory: `docs/{NN}-{chapter-slug}/` (increment NN, use hyphenated slug)
- Chapter overview: `docs/{NN}-{chapter-slug}/index.md` with YAML frontmatter
- Section files: `docs/{NN}-{chapter-slug}/01-*.md`, `02-*.md`, etc.
- Sidebar auto-generates from directory structure (no manual sidebar editing needed)

**New Root Documentation Page:**
- Create file: `docs/{filename}.md` with YAML frontmatter
- Add link: Update navbar/footer in `docusaurus.config.ts` if navigation link needed
- Example: `docs/resources.md`, `docs/prerequisites.md`

**Utilities/Helpers:**
- Shared helpers: Would go in `src/utils/` (currently no utils directory exists)
- Create directory and export functions as needed

**Styling:**
- Global styles: `src/css/custom.css` (existing theme overrides)
- Component styles: `src/components/{ComponentName}/styles.module.css` (new component-scoped styles)
- Theme variables: Update CSS custom properties in `src/css/custom.css` for site-wide changes

## Special Directories

**build/:**
- Purpose: Output directory for generated static site
- Generated: Yes (produced by `npm run build`)
- Committed: No (in `.gitignore`)
- Contents: Compiled HTML, CSS, JavaScript ready for GitHub Pages deployment

**.docusaurus/:**
- Purpose: Docusaurus internal cache and generated metadata
- Generated: Yes (produced during dev or build)
- Committed: No (in `.gitignore`)
- Contents: Processed docs metadata, generated sidebars, plugin artifacts

**.github/workflows/:**
- Purpose: GitHub Actions continuous deployment configuration
- Contains: `deploy.yml` workflow that builds and deploys site on push to main
- Execution: Automatic on every push to main branch

**samples/:**
- Purpose: Sample BBj (BASIC) source code files for course examples
- Generated: No
- Committed: Yes
- Usage: Referenced in documentation but not part of web build (separate BBj IDE files)

---

*Structure analysis: 2026-01-31*
