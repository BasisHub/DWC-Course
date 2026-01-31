# Phase 4: Content Audit - Research

**Researched:** 2026-01-31
**Domain:** Technical documentation content audit methodology, applied to a 12-chapter BBj DWC training curriculum
**Confidence:** HIGH

## Summary

This phase is a content evaluation exercise, not a code implementation phase. The "stack" is a rubric and methodology, not libraries. The research focused on four domains: (1) how to structure a reliable content audit rubric with 1-5 scoring, (2) what each of the six evaluation dimensions means concretely for THIS curriculum, (3) how to build the dependency-weighted priority ranking, and (4) what specific Mermaid diagram types and i18n issues to recommend per chapter.

The curriculum has 12 chapters spanning 2,768 total lines of Markdown across 28 files. Content depth varies dramatically -- Chapter 02 (Browser Developer Tools/CSS) is the largest at 828 lines across 5 files, while Chapter 03 (DWC Debugging) is the smallest at 116 lines in a single file. Seven chapters (03, 05, 06, 07, 08, 09, 10) are single-file chapters, which limits their structural depth.

**Primary recommendation:** Use an analytic rubric with 6 dimensions scored 1-5, anchor each score level with observable criteria specific to this curriculum, audit each chapter against the same rubric for consistency, then aggregate into tier-based priority ranking weighted by downstream dependencies.

## Standard Stack

This phase produces documents, not code. There is no library stack. The "tools" are:

### Core

| Tool | Purpose | Why Standard |
|------|---------|--------------|
| Analytic rubric (1-5, 6 dimensions) | Structured evaluation | Locked decision from CONTEXT.md; analytic rubrics provide per-dimension scores enabling targeted recommendations |
| Tier grouping (Critical / Important / Nice-to-have) | Priority ranking | Locked decision; avoids false precision of strict 1-12 ordering |
| Per-chapter detail files + summary rollup | Output format | Locked decision from CONTEXT.md |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Mermaid diagram type recommendations | Tooling suggestions per chapter | When a concept is better expressed visually than as prose |
| i18n issue flagging | Translatability assessment | Score 1-5 plus top 3 concrete issues per chapter |

### Alternatives Considered

None. The decisions in CONTEXT.md are locked and fully specify the approach. No alternatives need consideration.

## Architecture Patterns

### Recommended Output Structure

```
.planning/phases/04-content-audit/
├── 04-RESEARCH.md           # This file
├── 04-CONTEXT.md            # User decisions (exists)
├── chapters/
│   ├── ch01-audit.md        # Per-chapter detail
│   ├── ch02-audit.md
│   ├── ...
│   └── ch12-audit.md
└── 04-SUMMARY.md            # Rollup: tier table + aggregated findings
```

### Pattern 1: Analytic Rubric Table Per Chapter

Each chapter detail file starts with a rubric score table, followed by prose analysis.

**Format:**

```markdown
# Chapter N: [Title] - Audit

| Dimension | Score (1-5) | Key Finding |
|-----------|-------------|-------------|
| Clarity | X | [one-line summary] |
| Logical Flow | X | [one-line summary] |
| Completeness | X | [one-line summary] |
| Relevance | X | [one-line summary] |
| Code Examples Quality | X | [one-line summary] |
| i18n Readiness | X | [one-line summary] |

**Overall: X.X / 5.0**

## Detailed Findings
[prose sections per dimension]

## Content Gaps
[bulleted list: what is missing, unclear, or outdated]

## Recommendations
[prescriptive + suggestive, including subtractive]

## Mermaid Diagram Opportunities
[specific diagram type + what it would visualize]
```

### Pattern 2: Summary Rollup Format

The summary is developer-focused, not executive. It contains:

1. **Tier ranking table** -- chapters grouped by Critical / Important / Nice-to-have
2. **Aggregated dimension scores** -- average scores per dimension across all chapters to identify systemic patterns
3. **Cross-chapter patterns** -- recurring issues (e.g., "7 of 12 chapters lack exercises")
4. **Top recommendations** -- highest-impact improvements ranked

### Anti-Patterns to Avoid

- **Scoring inflation:** Giving 4s and 5s to everything makes the audit useless. Anchor scores against the rubric definitions, not "how good is this relative to nothing."
- **Vague recommendations:** "This chapter could be improved" is worthless. Every recommendation must specify WHAT to change and HOW (add a Mermaid flowchart of X, remove redundant explanation of Y, add a code example showing Z).
- **Ignoring subtractive improvements:** Over-long explanations and redundant content are real problems. The audit must flag content that should be shortened or removed, not only gaps.
- **Conflating completeness sub-dimensions:** "Can a learner do it?" (task-oriented) and "Does it cover the domain?" (topic-oriented) are distinct. A chapter can score high on one and low on the other.

## Don't Hand-Roll

Problems that look simple but have established solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rubric score anchoring | Ad-hoc "feels like a 3" | Pre-defined anchor descriptions for each score level per dimension | Without anchors, scores drift across chapters and become inconsistent |
| Dependency mapping | Intuitive "this seems important" | Explicit forward-reference counting from chapter content | Gut feel about dependencies is unreliable; count actual cross-references |
| i18n assessment | "Looks translatable to me" | W3C i18n checklist categories applied systematically | Cultural references, idioms, and ambiguous pronouns are easy to miss without a checklist |

**Key insight:** The main risk in a content audit is inconsistency -- evaluating Chapter 1 strictly and Chapter 12 leniently because of fatigue or drift. Pre-defined rubric anchors and a systematic approach prevent this.

## Common Pitfalls

### Pitfall 1: Score Drift Across Chapters

**What goes wrong:** Early chapters are evaluated strictly, later chapters leniently (or vice versa), making cross-chapter comparisons meaningless.
**Why it happens:** Without explicit anchors, the internal standard shifts as the auditor reads more content.
**How to avoid:** Define score anchors BEFORE auditing. Score 1-2 chapters, verify against anchors, then proceed. Consider re-scoring early chapters after completing all.
**Warning signs:** All chapters clustering around 3.0-3.5 with no differentiation.

### Pitfall 2: Recommendations Without Tooling Context

**What goes wrong:** Recommendations say "add a diagram" but don't specify what kind, or suggest tooling that doesn't exist in the project.
**Why it happens:** Auditor focuses on content gaps without checking what tools are available.
**How to avoid:** Each recommendation that involves tooling must reference one of: Mermaid diagrams (enabled), code tabs (Docusaurus feature), IdealImage (enabled), or BBj code blocks (enabled). Recommendations requiring new tooling should be flagged as v2 scope.
**Warning signs:** Recommendations that can't be acted on without installing new plugins.

### Pitfall 3: Missing the "Subtractive" Dimension

**What goes wrong:** Audit only identifies what's missing, never what should be removed or shortened. Result is a recommendation to make every chapter longer.
**Why it happens:** Addition bias -- it's easier to notice gaps than verbosity.
**How to avoid:** Explicitly ask for each chapter: "What here is too long, redundant, or unnecessary?" Document subtractive recommendations alongside additive ones.
**Warning signs:** Every recommendation is "add X" with zero "shorten Y" or "remove Z."

### Pitfall 4: i18n Assessment as Afterthought

**What goes wrong:** i18n score is assigned perfunctorily (everything gets a 3) without identifying concrete problems.
**Why it happens:** Auditor isn't thinking about translation while reading English content.
**How to avoid:** Use the specific i18n checklist (below) and force identification of top 3 issues per chapter.
**Warning signs:** All chapters have i18n score of 3 with no specific issues listed.

### Pitfall 5: Priority Ranking Based on Chapter Quality Rather Than Importance

**What goes wrong:** Ranking puts the worst-scoring chapters first, ignoring whether they're important.
**Why it happens:** Conflating "needs the most work" with "should be fixed first."
**How to avoid:** Priority = (importance to learner progression) x (room for improvement). A critical chapter with a score of 3 ranks higher than a nice-to-have chapter with a score of 1.
**Warning signs:** Obscure chapters ranked Critical because they scored poorly.

## Code Examples

Not applicable -- this phase produces documentation, not code. See Architecture Patterns for output format examples.

## Rubric Score Anchors

These anchor descriptions define what each score means for each dimension. Use these to ensure consistent scoring across all 12 chapters.

### Clarity (1-5)

| Score | Anchor |
|-------|--------|
| 1 | Confusing: reader cannot understand the main point without external help; jargon undefined, sentences ambiguous |
| 2 | Unclear in places: some sections require re-reading; key terms used before defined |
| 3 | Adequate: main points understandable but prose could be tighter; some unnecessary complexity |
| 4 | Clear: well-written, minimal ambiguity; technical terms defined when introduced |
| 5 | Excellent: immediately understandable; could serve as reference material; writing is concise and precise |

### Logical Flow (1-5)

| Score | Anchor |
|-------|--------|
| 1 | No discernible structure: topics jump randomly, no progression |
| 2 | Weak structure: some ordering but important prerequisites appear after they're needed |
| 3 | Adequate: generally follows a logical order but some sections feel misplaced or transitions are abrupt |
| 4 | Good: clear progression from simple to complex; sections build on each other; transitions are smooth |
| 5 | Excellent: every section flows naturally from the previous; reader never wonders "why am I reading this now?" |

### Completeness (1-5)

Two lenses scored together but noted separately:
- **Task lens:** "Can a learner DO the thing after reading this?"
- **Topic lens:** "Does this COVER the domain adequately?"

| Score | Anchor |
|-------|--------|
| 1 | Major gaps: critical concepts or steps missing; learner cannot complete exercises |
| 2 | Significant gaps: some important topics skipped; exercises lack key steps |
| 3 | Adequate: covers the main topics; learner can mostly follow along but may need external resources for some tasks |
| 4 | Good: comprehensive coverage; exercises are complete; only minor edge cases omitted |
| 5 | Excellent: thorough treatment; learner is fully equipped; covers both happy path and common pitfalls |

### Relevance (1-5)

Evaluated from developer-learner perspective (not consultant/presenter).

| Score | Anchor |
|-------|--------|
| 1 | Content is outdated, wrong, or not applicable to current DWC versions |
| 2 | Mostly relevant but contains outdated references or deprecated approaches presented as current |
| 3 | Relevant: content applies to current DWC but some examples feel dated or disconnected from real-world usage |
| 4 | Highly relevant: examples reflect real developer tasks; content matches current DWC capabilities |
| 5 | Essential: directly addresses problems developers face daily; immediately actionable |

### Code Examples Quality (1-5)

| Score | Anchor |
|-------|--------|
| 1 | No code examples, or examples are broken/incorrect |
| 2 | Few examples; existing ones lack context or explanation |
| 3 | Adequate examples but missing annotations, explanations, or variety |
| 4 | Good examples: well-annotated, cover the main use cases, runnable |
| 5 | Excellent: progressive examples building complexity; annotated line-by-line; show both "do" and "don't"; cover edge cases |

### i18n Readiness (1-5)

| Score | Anchor |
|-------|--------|
| 1 | Severe barriers: heavy use of idioms, cultural references, embedded text in images, language-specific puns |
| 2 | Multiple barriers: some idioms, US-centric assumptions, unclear pronoun antecedents across paragraphs |
| 3 | Moderate: generally translatable but contains some idioms, colloquialisms, or culturally specific examples |
| 4 | Good: straightforward prose; minimal cultural assumptions; clear sentence structure |
| 5 | Excellent: simple, direct prose; no idioms; all screenshots show text that's easily replaceable; culture-neutral examples |

## Chapter Inventory and Preliminary Observations

Content metrics for each chapter, providing the raw data the auditor needs:

| Ch | Title | Files | Lines | Images | Code Blocks | Sidebar Group |
|----|-------|-------|-------|--------|-------------|---------------|
| 01 | GUI to BUI to DWC | 4 | 496 | 3 | 36 | Getting Started |
| 02 | Browser Developer Tools & CSS | 5 | 828 | 6 | 76 | Getting Started |
| 03 | DWC Debugging | 1 | 116 | 0 | 6 | Getting Started |
| 04 | Upgrading Apps to DWC | 3 | 148 | 3 | 0 | Core Concepts |
| 05 | DWC Controls w/ Extended Attributes | 1 | 112 | 8 | 0 | Core Concepts |
| 06 | Flow Layouts & CSS | 1 | 173 | 10 | 12 | Core Concepts |
| 07 | Icon Pools | 1 | 98 | 8 | 10 | Advanced Topics |
| 08 | Control Validation | 1 | 132 | 11 | 10 | Advanced Topics |
| 09 | Browser Constraints | 1 | 95 | 2 | 10 | Advanced Topics |
| 10 | Embedding 3rd Party Components | 1 | 103 | 0 | 8 | Advanced Topics |
| 11 | Advanced Responsive Design | 3 | 315 | 2 | 26 | Advanced Topics |
| 12 | Deployment Options | 1 | 152 | 1 | 10 | Deployment |

### Structural Observations

- **Chapter 02 is by far the largest** (828 lines, 5 files) -- it covers CSS fundamentals, developer tools, CSS custom properties, Shadow DOM, theming, and font compatibility. This may be trying to do too much.
- **Chapters 03, 05, 07, 08, 09, 10 are all single-file** -- they lack the multi-page structure that aids navigation and scanning.
- **Chapter 04 has zero code blocks** in the Markdown (though it references external sample files). For a chapter about upgrading grids, this is a notable gap.
- **Chapter 05 has zero code blocks** but 8 images -- relies entirely on images for showing code, which is bad for accessibility and searchability.
- **Chapter 03 has zero images** -- for a debugging chapter, visual walkthroughs would add significant value.
- **Chapter 10 has zero images** -- for a chapter about embedding visual components (charts, maps), this is a missed opportunity.

## Dependency Graph for Priority Ranking

Based on actual content cross-references and concept prerequisites:

### Forward Dependencies (what each chapter enables)

| Chapter | Concepts Used By Later Chapters | Dependency Count |
|---------|--------------------------------------|------------------|
| 01 | Window creation, flow layout flag, setAttribute, DWC URL structure, process_events | Used by 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12 = **11** |
| 02 | CSS selectors, custom properties, Shadow DOM, Developer Tools, theming, injectStyle, addClass | Used by 03, 04, 05, 06, 07, 08, 09, 10, 11, 12 = **10** |
| 06 | CSS Grid, Flexbox, responsive layout concepts | Used by 08, 09, 10, 11 = **4** |
| 05 | setAttribute, component themes, control labels | Used by 07, 08, 10 = **3** |
| 04 | ARC files, grid migration concepts | Used by 09 = **1** |
| 03 | Debug console, browser DevTools debugging | Used by 09, 10 = **2** |
| 07 | Icon syntax (`<dwc-icon>`) | Used by 08 = **1** |
| 08 | Validation patterns | Standalone = **0** |
| 09 | Browser constraints knowledge | Standalone = **0** |
| 10 | Embedding patterns | Standalone = **0** |
| 11 | Media queries, transitions | Standalone = **0** |
| 12 | Deployment | Standalone = **0** |

### Preliminary Tier Assignment

Based on dependency count and learner progression importance:

**Critical (fix first in v2):**
- Chapter 01 (dependency count: 11 -- foundation for everything)
- Chapter 02 (dependency count: 10 -- CSS/theming underpins all DWC styling)
- Chapter 06 (dependency count: 4 -- layout is the bridge from "it works" to "it's responsive")

**Important (fix second in v2):**
- Chapter 05 (dependency count: 3 -- controls are core to building apps)
- Chapter 03 (dependency count: 2 -- debugging skills accelerate all subsequent learning)
- Chapter 04 (dependency count: 1 -- migration path is critical for existing users)

**Nice-to-have (fix third in v2):**
- Chapters 07, 08, 09, 10, 11, 12 (dependency count: 0-1 -- self-contained topics)

Note: This preliminary ranking will be refined during the actual audit when content quality scores are factored in.

## Mermaid Diagram Type Recommendations

Based on the content of each chapter, these are the Mermaid diagram types most applicable:

| Diagram Type | Best For | Chapters Where Applicable |
|--------------|----------|--------------------------|
| **Flowchart (graph TD/LR)** | Decision trees, process flows, "which client am I running in?" logic | 01 (already has one), 04, 09, 12 |
| **Sequence Diagram** | Client-server interaction, event callback flows, JavaScript bridge communication | 01, 03, 09, 10 |
| **State Diagram** | Validation states (pristine/valid/invalid), theme states (light/dark), app lifecycle | 08, 02 |
| **Class Diagram** | Shadow DOM component structure, BBjControl hierarchy | 02, 05 |
| **Block Diagram** | CSS Grid/Flexbox visual explanations, window structure (3-nested-DIV) | 01, 06, 11 |

Specific high-confidence recommendations:
- **Ch 01:** Sequence diagram showing BBj server <-> JavaScript bridge <-> browser event flow (supplement existing flowchart)
- **Ch 02:** State diagram for style specificity cascade (inline > class > universal)
- **Ch 04:** Flowchart for migration decision tree (BBjStandardGrid -> BBjGridExWidget decision points)
- **Ch 06:** Block diagrams showing Flexbox vs Grid mental models
- **Ch 08:** State diagram for validation states (pristine -> valid/invalid -> custom validity)
- **Ch 09:** Sequence diagram for file upload/download flow between browser and BBj server
- **Ch 10:** Sequence diagram for BBj <-> embedded JavaScript component event communication
- **Ch 12:** Flowchart for deployment option decision tree (standard URL vs embedded vs PWA)

## i18n Assessment Checklist

For each chapter, evaluate against these concrete criteria (derived from W3C i18n checklist and localization readiness frameworks):

### Category 1: Prose Translatability
- Idioms and colloquialisms (e.g., "going the extra mile" -- literally appears in chapters 01, 02)
- Complex sentence structures requiring disambiguation
- Ambiguous pronoun antecedents (e.g., "it" referring to something two paragraphs back)
- Humor, wordplay, or cultural references

### Category 2: Technical Content Portability
- US-centric date/number formats in examples
- English-only text baked into screenshots (cannot be translated)
- Code comments in English (expected, but note volume)
- BBj string literals containing English text in code examples

### Category 3: Structural Localization Readiness
- Text expansion space (German text is ~30% longer than English -- do layouts accommodate?)
- Right-to-left script considerations (minimal for DE/FR/ES target locales, but flag any issues)
- External links to English-only resources (note, don't flag as blocker)

### Specific i18n Issues Already Identified

These are concrete examples found during content reading that the auditor should verify and expand:

| Issue | Location | Severity |
|-------|----------|----------|
| "Going the Extra Mile" (idiom) | Ch 01 sec 02, Ch 01 sec 03, Ch 02 sec 02 | Medium -- section headers, must be translated creatively |
| Screenshots with English UI text | Ch 01, 02, 04, 05, 06, 07, 08, 09 | High -- images need separate localized versions or replacement with text descriptions |
| "Say Hello" button text in examples | Ch 01 sec 03 | Low -- code example, expected to be English |
| "What You See Is What You Get" (WYSIWYG) | Ch 02 sec 04 | Low -- universally understood acronym |
| Informal tone ("you'll be able to", "let's") | Throughout | Medium -- generally translatable but adds overhead |
| "doc-rot" jargon | Would appear in Mermaid references | Low |

## State of the Art

| Old Approach | Current Approach | Impact on This Phase |
|--------------|------------------|---------------------|
| Holistic content review ("read and give feedback") | Analytic rubric with anchored score levels | Use analytic rubric per CONTEXT.md decision |
| Binary "good/bad" assessment | Multi-dimensional scoring (6 dimensions, 1-5) | Already decided in CONTEXT.md |
| Priority by gut feel | Dependency-weighted tier ranking | Use forward-reference counting for objectivity |
| i18n as translation afterthought | Translatability assessment during content creation | Assess now, before any translation work begins in v2 |

## Open Questions

1. **How to handle chapters that reference external sample code files?**
   - What we know: Chapters reference `.bbj` files from a `samples/` directory. The `samples.md` page maps directories to chapters.
   - What's unclear: Should the audit evaluate the SAMPLE CODE quality too, or only the documentation text? Sample code is not in the docs directory.
   - Recommendation: Audit only the documentation content. Note where sample code is referenced but not inlined, as that's a content gap (the docs should be self-contained enough to follow without the zip file).

2. **Consultant usage frequency data is unavailable**
   - What we know: CONTEXT.md says "consultant usage is not a ranking factor (skipped)."
   - What's unclear: Nothing -- this was explicitly decided.
   - Recommendation: Use dependency-weighted learner progression as the sole ranking factor, as decided.

3. **Threshold for "chapter with no meaningful gaps"**
   - What we know: CONTEXT.md gives discretion on handling chapters with no gaps.
   - What's unclear: At what score level is a chapter considered "no meaningful gaps"?
   - Recommendation: If all 6 dimensions score 4+, produce a brief confirmation (rubric table + 1-2 sentences). If any dimension is 3 or below, produce full detailed analysis.

## Sources

### Primary (HIGH confidence)
- Project codebase: All 28 Markdown files across 12 chapters read in full
- CONTEXT.md: User decisions constraining audit approach
- REQUIREMENTS.md: CONT-01 through CONT-04 requirements
- STATE.md: Prior phase decisions and project context

### Secondary (MEDIUM confidence)
- [W3C Short i18n Review Checklist](https://www.w3.org/International/i18n-drafts/techniques/shortchecklist) -- i18n assessment categories
- [Mermaid.js official documentation](https://mermaid.js.org/intro/syntax-reference.html) -- diagram types and capabilities
- [Rubric Best Practices (NC State)](https://teaching-resources.delta.ncsu.edu/rubric_best-practices-examples-templates/) -- analytic rubric design
- [Award Force Rubric Best Practices](https://awardforce.com/blog/articles/rubric-best-practices-for-creating-a-fair-and-balanced-assessment/) -- scoring consistency

### Tertiary (LOW confidence)
- WebSearch results on content translatability assessment -- general patterns, not specific to this project

## Metadata

**Confidence breakdown:**
- Rubric design: HIGH -- based on established educational assessment methodology applied to all 28 files read in full
- Chapter inventory & metrics: HIGH -- measured directly from codebase
- Dependency mapping: HIGH -- derived from reading all chapter content and identifying cross-references
- Mermaid recommendations: HIGH -- based on reading all content + Mermaid documentation
- i18n assessment criteria: MEDIUM -- W3C checklist adapted to this context; specific issues identified from content reading
- Priority ranking: MEDIUM -- dependency counting is objective but tier boundaries are judgment calls

**Research date:** 2026-01-31
**Valid until:** Indefinite (content audit methodology doesn't go stale; chapter content may change)
