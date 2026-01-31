# Coding Conventions

**Analysis Date:** 2026-01-31

## Naming Patterns

**Files:**
- Component files: PascalCase with `index.tsx` as entry point (e.g., `HomepageFeatures/index.tsx`, `ChapterCards/index.tsx`)
- Style files: `.module.css` suffix for CSS modules (e.g., `styles.module.css`)
- Markdown documentation: kebab-case with numeric prefixes for ordering (e.g., `02-browser-developer-tools/`, `06-flow-layouts/`)
- Sub-pages: numeric prefixes and `index.md` for chapter starts (e.g., `01-intro-to-css.md`)

**Functions:**
- React components: PascalCase (e.g., `HomepageFeatures`, `ChapterCards`, `Feature`, `ChapterCard`)
- Helper functions: camelCase (e.g., referenced in config via `routeBasePath`)
- Data export defaults: camelCase arrays (e.g., `FeatureList`, `ChapterList`)

**Variables:**
- Component props: PascalCase for type definitions (e.g., `FeatureItem`, `ChapterItem`)
- CSS class names: camelCase in CSS modules (e.g., `.featureSvg`, `.chapterIcon`, `.chapterNumber`)
- Configuration: camelCase (e.g., `sidebar_position` in frontmatter, `customCss` in config)

**Types:**
- TypeScript interfaces/types: PascalCase with `Item` suffix (e.g., `FeatureItem`, `ChapterItem`)
- React types: Explicit `type` keyword with `React.ComponentType` and `React.ComponentProps` for component types
- Return types: Explicit `ReactNode` type annotation (e.g., `export default function HomepageFeatures(): ReactNode`)

## Code Style

**Formatting:**
- No dedicated formatter configured. Code follows standard TypeScript/React patterns.
- Indentation: 2 spaces (observed in all TSX and CSS files)
- Line length: No strict limit observed, but code tends to stay readable

**Linting:**
- No linter configured (no `.eslintrc`, `eslint.config.js`, or similar)
- Uses TypeScript compiler (`tsc`) for type checking only via `npm run typecheck`
- Code relies on type safety rather than linting rules

## Import Organization

**Order:**
1. React and type imports (`import type {ReactNode} from 'react'`)
2. Third-party libraries (`import clsx from 'clsx'`)
3. Docusaurus components (`import Heading from '@theme/Heading'`, `import Link from '@docusaurus/Link'`)
4. Local styles (`import styles from './styles.module.css'`)

**Path Aliases:**
- `@site/` - Absolute path to site root (e.g., `require('@site/static/img/bbj-to-web.svg')`)
- `@theme/` - Docusaurus theme components (e.g., `@theme/Heading`)
- `@docusaurus/` - Docusaurus core components (e.g., `@docusaurus/Link`)
- Relative imports for local styles (`./styles.module.css`)

## Error Handling

**Patterns:**
- No explicit error handling in observable components. Components assume all props are valid.
- Type safety via TypeScript provides compile-time error prevention.
- No try-catch blocks observed in component code.

## Logging

**Framework:** `console` only (no logging library configured)

**Patterns:**
- No logging observed in component code
- Primarily used by Docusaurus build system and development server

## Comments

**When to Comment:**
- Minimal commenting observed. Code is largely self-documenting through type annotations and clear naming.
- JSDoc comments used only for CSS global overrides (e.g., `/* You can override the default Infima variables here. */`)
- Semantic comments for special features (e.g., `/* External link icon - targets links starting with http:// or https:// */`)

**JSDoc/TSDoc:**
- Not used in component files
- No function or parameter documentation observed

## Function Design

**Size:**
- Keep components compact and focused
- Example: `Feature` component is 10 lines (lines 45-56)
- Example: `ChapterCard` component is 15 lines (lines 150-167)

**Parameters:**
- Use object destructuring for component props (e.g., `{title, Svg, description}` in `Feature`)
- Use spread operators for passing through props (`{...props}` in map)

**Return Values:**
- Always explicitly type return values as `ReactNode` or leave implicit React component type
- Return JSX directly from functional components
- Use conditional rendering with fragment syntax for multi-child returns

## Module Design

**Exports:**
- Default export for main component (e.g., `export default function HomepageFeatures()`)
- Named exports for data structures only when needed (e.g., `FeatureList`, `ChapterList` are internal)
- Use `const` for data arrays placed before component functions

**Barrel Files:**
- All component logic contained in single `index.tsx` file
- No barrel files or re-exports observed
- Styles colocated as separate `.module.css` files

## Markdown/Documentation Conventions

**Frontmatter:**
- Required fields: `sidebar_position` (numeric, controls ordering), `title` (string)
- Optional fields: `slug` (URL override)

**Heading Structure:**
- Use `#` for main title (matching page title from frontmatter)
- Use `##` for major sections (e.g., `## Concepts Covered in This Chapter`)
- Use lists for detailed content organization

**Code Blocks:**
- Syntax highlighting for: `java`, `bash`, `bbj` (custom language in Prism)
- Language specified in fence: \`\`\`java ... \`\`\`

## Component Props Pattern

**Typed Destructuring:**
All component props destructured with explicit types:

```typescript
type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

function Feature({title, Svg, description}: FeatureItem) {
  // component body
}
```

**Array Mapping:**
- Use `.map()` with index parameter for rendering lists
- Warning: Array index used as key (e.g., `key={idx}`) - not optimal but acceptable for static lists

```typescript
{FeatureList.map((props, idx) => (
  <Feature key={idx} {...props} />
))}
```

## CSS Conventions

**Module Classes:**
- camelCase class names (e.g., `.chapterCard`, `.chapterIcon`)
- BEM-like patterns not used; simple, component-scoped naming

**Global CSS:**
- CSS custom properties for theming: `--ifm-color-primary`, `--ifm-color-primary-dark` variants
- Dark mode support via `[data-theme='dark']` attribute selector
- Supports both light and dark mode in single stylesheet

**Transitions:**
- Use `transition` shorthand: `transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;`
- Applied on hover states for interactive elements

---

*Convention analysis: 2026-01-31*
