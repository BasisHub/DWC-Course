# BBj Dynamic Web Client (DWC) Training Course

A comprehensive 12-chapter training curriculum for BBj 24.02+ Dynamic Web Client development. This course covers everything from basic GUI-to-DWC migration to advanced responsive layouts and deployment.

**View the course:** [https://BasisHub.github.io/DWC-Course/](https://BasisHub.github.io/DWC-Course/)

## Course Contents

1. **GUI to BUI to DWC** - Understanding the evolution and registering/launching applications
2. **Browser Developer Tools** - CSS fundamentals, DevTools usage, and DWC theming
3. **DWC Debugging** - Debugging techniques for DWC applications
4. **Upgrading Applications** - Working with ARC files and upgrading grids
5. **DWC Controls** - Modern DWC control features and usage
6. **Flow Layouts** - CSS Flexbox and Grid layouts in DWC
7. **Icon Pools** - Using and customizing icon pools
8. **Control Validation** - Input validation patterns
9. **Browser Constraints** - Working within browser limitations
10. **Embedding Components** - Integrating web components
11. **Advanced Responsive Design** - Media queries and CSS transitions
12. **Deployment** - Production deployment strategies

## Sample Code

The `samples/` directory contains BBj source files and supporting assets for hands-on exercises:

| Directory | Topic |
|-----------|-------|
| `01_GUI2BUI2DWC/` | GUI to DWC migration examples |
| `02_CSSStylesAndCustomProperties/` | CSS styling and custom properties |
| `03B_ArcFiles/` | ARC file configuration |
| `03C_Grid2GridEx/` | Grid to GridEx migration |
| `04_ExtendedAttributes/` | Extended control attributes |
| `05_CssLayouts/` | Flexbox and Grid layout examples |
| `06_IconPools/` | Icon pool usage |
| `07_ControlValiation/` | Input validation patterns |
| `08_BrowserConstraints/` | Browser constraint handling |
| `09_EmbeddingOtherComponents/` | Embedding web components |

## Prerequisites

- BBj 24.02 or later
- Basic BBj programming knowledge
- A modern web browser (Chrome recommended for DevTools)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

## Resources

- [BASIS Online Help](https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm) - Main documentation portal
- [DWC Overview](https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm) - Introduction to the Dynamic Web Client

## License

Copyright BASIS International Ltd. Content from BBj DWC Training Course.
