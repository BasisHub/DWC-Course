# Chapter 05: DWC Controls With Extended Attributes - Audit

| Dimension | Score (1-5) | Key Finding |
|-----------|-------------|-------------|
| Clarity | 3 | Core concepts (themes, attributes, labels) are introduced clearly but deeper mechanics are left unexplained |
| Logical Flow | 3 | Themes -> Attributes -> Labels is reasonable but sections feel disconnected; no unifying thread |
| Completeness | 2 | Task lens: learner knows attributes exist but cannot confidently use setAttribute in their own code; Topic lens: covers 3 features, omits many DWC control capabilities |
| Relevance | 4 | Directly useful -- setAttribute and component themes are used throughout Ch07, Ch08, Ch10 |
| Code Examples Quality | 1 | Zero code blocks; all code shown as screenshots, which is inaccessible and unsearchable |
| i18n Readiness | 3 | 8 images containing English text require localized versions; prose itself is clean |

**Overall: 2.7 / 5.0**

## Detailed Findings

### Clarity (3)

The chapter introduces three distinct concepts clearly at a surface level:
- Component themes: the theme table with 7 options and the HSL color property explanation are well-structured
- Tree search attributes: the attribute table is a good quick reference
- Input control labels: the benefits list (reduced work, validation, accessibility, responsive) is clear and compelling

However, clarity breaks down when a reader needs to actually use these features:
- The chapter never shows the `setAttribute()` BBj call. Readers know attributes exist but not the API for setting them. This is critical because Ch07, Ch08, and Ch10 all assume the reader can use `setAttribute()`.
- "CSS custom properties with three main properties" introduces HSL color mechanics but does not explain how a developer would customize a theme in practice. The properties are listed but the workflow is missing.
- The "expanse" attribute is mentioned in a single bullet point ("Shortcut for affecting font size and padding") without showing what the different expanse values are or what they look like.

### Logical Flow (3)

The three sections (themes, attributes, labels) are all about DWC control capabilities, which is a coherent grouping. However:
- There is no narrative connecting them. The chapter reads as three mini-references rather than a progressive learning journey. A framing paragraph explaining "DWC controls extend BBj's standard controls with web-native capabilities" would help.
- The jump from color CSS properties to BBjTree search attributes is jarring -- these are unrelated features grouped only by being "attributes."
- The examples (TreeSearch.bbj, LabelAttributes.bbj) are introduced as "run this file" instructions without connecting them to the conceptual content above. The reader toggles checkboxes but may not understand what they are demonstrating in terms of the setAttribute API.

### Completeness (2)

**Task lens:** After reading this chapter, a learner:
- Knows the 7 theme names (can look them up)
- Knows tree search attributes exist (can reference the table)
- Understands why attribute labels are better than BBjStaticText (compelling argument)

But cannot:
- Write `setAttribute()` calls -- the fundamental API for everything in this chapter
- Customize a theme's colors beyond knowing the property names
- Apply attributes to controls other than BBjTree and input controls
- Combine themes with other attributes

**Topic lens:** DWC controls have many extended capabilities beyond the three covered here. Missing topics include:
- Slots (web component content distribution)
- Shadow DOM parts for CSS styling
- Custom events beyond standard BBj callbacks
- Responsive behavior attributes
- Accessibility attributes (ARIA)
- Control-specific attributes for other common controls (BBjButton, BBjListBox, BBjTabCtrl)

The chapter covers themes, tree search, and labels -- three useful but narrow slices of the full DWC controls domain.

### Relevance (4)

The content is highly relevant. Component themes appear throughout the curriculum (Ch08 validation uses danger/success themes). The setAttribute pattern is foundational for all advanced DWC work. Input control labels are a genuine productivity improvement that directly benefits developers.

The theme color table and the HSL property explanation give developers the vocabulary to work with DWC theming. The label attribute comparison (attribute vs BBjStaticText) makes a practical case for the DWC approach that developers can immediately act on.

### Code Examples Quality (1)

**Zero code blocks in 112 lines of Markdown.** This is a critical structural problem.

The chapter has 8 images, and several of these images SHOW code (e.g., the DWC Themer, the Color CSS properties screenshot). This means:
- **Code is not copyable.** Developers cannot copy-paste from screenshots.
- **Code is not searchable.** The site search (local search plugin) cannot index text within images.
- **Code is not accessible.** Screen readers cannot read code in images.
- **Code is not syntax-highlighted.** Docusaurus BBj syntax highlighting is available but unused.

The examples are "run this file" instructions pointing to external `.bbj` files. No inline code demonstrates the core concept (setAttribute). A reader looking for "how do I set the theme of a button?" will find prose about themes existing and a screenshot of colors, but no usable code.

### i18n Readiness (3)

**Top 3 i18n issues:**
1. **8 images with English text.** The DWC Themer, Color CSS, TreeSearch, EditBox, and Label screenshots all contain English UI text and labels. Each would need a localized version or replacement with code blocks + text descriptions.
2. **"Say Hello" / button text in screenshots.** While code examples are expected to be English, showing them only as screenshots means they cannot be easily annotated with translations.
3. **Theme name table uses English color associations.** "Primary = Blue", "Danger = Red" -- these color-meaning associations are largely universal in web development, but the reliance on English names (primary, default, info, success, warning, danger, gray) may benefit from translation notes explaining the semantic meaning rather than just the color.

The prose itself is clean and technical. Sentence structures are simple and direct. No idioms or colloquialisms detected.

## Content Gaps

### Critical Gaps
- **Zero code blocks -- all code shown as images.** This is an accessibility and usability failure. Every image showing code should be accompanied by (or replaced with) an actual code block. This is the single most impactful fix for this chapter.
- **Missing setAttribute() API demonstration.** The chapter is about extended attributes but never shows the API for setting them. At minimum, show: `control!.setAttribute("theme", "primary")` and `control!.setAttribute("expanse", "xl")`.
- **No programmatic theme customization.** The CSS custom properties are listed but no code shows how to override them (via injectStyle or addClass from Ch02).

### Moderate Gaps
- **Expanse attribute underexplained.** Only mentioned in a bullet point. Should show the available values (xs, s, m, l, xl) and a visual comparison.
- **Limited control coverage.** Only BBjTree and input controls are demonstrated. BBjButton, BBjListBox, and BBjTabCtrl all have extended attributes that would broaden the chapter's utility.
- **No connection to Shadow DOM.** Ch02 covers Shadow DOM; this chapter should reference how attributes penetrate the Shadow DOM boundary (they do, unlike classes).

### Minor Gaps
- **No attribute reference table.** A comprehensive table of commonly-used attributes across controls would be a valuable reference.
- **Example instructions assume course materials are available.** "Run `DWCTraining/04_ExtendedAttributes/TreeSearch.bbj`" is not helpful for someone without the zip file.

## Recommendations

### Additive (high priority)
1. **Replace code-showing images with actual code blocks.** For each screenshot that displays code, add an equivalent BBj code block with syntax highlighting. Keep images that show visual results (UI appearance) but supplement with code blocks showing what produced them. Docusaurus BBj syntax highlighting is available and enabled.
2. **Add setAttribute() examples.** Show 3-5 short code blocks demonstrating the core API:
   - Setting a theme: `control!.setAttribute("theme", "success")`
   - Setting expanse: `control!.setAttribute("expanse", "xl")`
   - Setting tree search: `tree!.setAttribute("search-input", "true")`
   - Setting a label: `editBox!.setAttribute("label", "First Name")`
3. **Add a Mermaid class diagram** showing the BBjControl hierarchy with DWC-specific extensions, or a component structure diagram showing how web component attributes relate to the underlying BBj control.

### Additive (medium priority)
4. **Expand expanse coverage.** Add a table or visual showing the 5 expanse sizes and a code example toggling between them.
5. **Add a "how themes work with CSS custom properties" section** connecting the theme names to the HSL properties, with an example of overriding a theme color using `injectStyle()` (referencing Ch02 technique).

### Subtractive
6. **Tighten the color properties explanation.** The HSL explanation (hue, saturation, contrast threshold) is useful but could be more concise. The property naming pattern (`--dwc-color-primary-h`, `-s`, `-c`) can be shown in a compact table rather than 3 separate bullet points with examples.
7. **Remove "Concepts Covered in This Chapter" section.** This 4-bullet list duplicates what the sections themselves cover. The table of contents provides this navigation already.

## Mermaid Diagram Opportunities

### 1. Class Diagram: BBjControl Hierarchy with DWC Extensions
**Type:** Class diagram
**Visualizes:** How BBj controls inherit from BBjControl and gain DWC-specific attributes (theme, expanse, label) when running in DWC mode

```
BBjControl <|-- BBjInputE
BBjControl <|-- BBjTree
BBjControl <|-- BBjButton
BBjInputE : +setAttribute("label", value)
BBjInputE : +setAttribute("theme", value)
BBjTree : +setAttribute("search-input", value)
BBjTree : +setAttribute("search-term", value)
```

**Why:** The chapter presents attributes per-control without showing the inheritance pattern. A class diagram reveals which attributes are universal (theme, expanse) vs control-specific (search-input).

### 2. Block Diagram: Web Component Attribute Flow
**Type:** Block diagram
**Visualizes:** How `setAttribute()` in BBj maps to the web component attribute in the browser, crossing the server-client boundary

**Why:** Learners may not understand that `setAttribute()` on the server translates to a DOM attribute change in the browser. This is the architectural insight that makes the chapter's content cohere.
