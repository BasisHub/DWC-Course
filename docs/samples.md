---
sidebar_position: 3
title: Sample Code
---

# Sample Code

This course includes hands-on sample code for each chapter. The samples are BBj source files that you can run, modify, and experiment with as you progress through the training.

## Getting the Samples

The sample files are included in the `samples/` directory of the course repository:

```bash
git clone https://github.com/BasisHub/DWC-Course.git
cd DWC-Course/samples
```

If you've already cloned the repository, the samples are ready to use.

## Sample Directory Structure

Each directory corresponds to topics covered in the course:

| Directory | Chapter | Description |
|-----------|---------|-------------|
| `01_GUI2BUI2DWC/` | [GUI to BUI to DWC](gui-to-bui-to-dwc/) | Basic GUI samples and DWC migration examples |
| `02_CSSStylesAndCustomProperties/` | [Browser Developer Tools](browser-developer-tools/) | CSS styling and custom property examples |
| `03B_ArcFiles/` | [Upgrading Apps](upgrading-apps/) | ARC file configuration samples |
| `03C_Grid2GridEx/` | [Upgrading Apps](upgrading-apps/) | Grid to GridEx migration examples |
| `04_ExtendedAttributes/` | [DWC Controls](dwc-controls/) | Extended control attribute demos |
| `05_CssLayouts/` | [Flow Layouts](flow-layouts/) | Flexbox and CSS Grid layout examples |
| `06_IconPools/` | [Icon Pools](icon-pools/) | Icon pool usage and customization |
| `07_ControlValiation/` | [Control Validation](control-validation/) | Input validation pattern examples |
| `08_BrowserConstraints/` | [Browser Constraints](browser-constraints/) | Browser constraint handling |
| `09_EmbeddingOtherComponents/` | [Embedding Components](embedding-components/) | Web component integration examples |

## Running the Samples

1. **Open in Eclipse/BDT**: Import the sample files into your BBj project in Eclipse with the BDT plugin installed.

2. **Configure for DWC**: Ensure your BBj Services are configured to run applications in DWC mode. See [Registering and Launching](gui-to-bui-to-dwc/registering-launching) for setup instructions.

3. **Run and Experiment**: Execute the `.bbj` files and observe the results in your browser. Each sample is designed to demonstrate specific DWC concepts.

## Sample File Types

The samples include various file types:

- **`.bbj`** - BBj source code files (the main samples)
- **`.css`** - Custom CSS stylesheets
- **`.arc`** - Application resource configuration files
- **`.js`** - JavaScript files for embedded components

## Tips for Learning

- **Read the code comments**: Many samples include inline comments explaining key concepts
- **Modify and re-run**: Change values, add controls, and see what happens
- **Compare before/after**: Some directories include exercise files and their completed versions (e.g., `Exercise-*.bbj` and `*Complete.bbj`)
- **Use browser DevTools**: Inspect the generated HTML and CSS to understand how DWC renders your BBj code
