# Phase 4: Content Audit - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit all 12 chapters for quality and produce a prioritized list of improvement recommendations for v2 content work. This phase evaluates existing content — it does not modify or rewrite any chapter content.

</domain>

<decisions>
## Implementation Decisions

### Audit criteria & scoring
- Numeric rubric: score each dimension 1-5 per chapter
- Six dimensions: clarity, logical flow, completeness, relevance, code examples quality, i18n readiness
- Completeness scored from both perspectives: "can a learner do it?" (outcome) and "does it cover the domain?" (topic coverage)
- Relevance evaluated from developer-learner perspective (not consultant/presenter)
- Recommendations include subtractive suggestions (remove/simplify) alongside additions

### Priority ranking method
- Learner progression is the primary ranking factor
- Dependency-weighted: chapters that many later chapters build on rank higher, even if not the earliest
- Consultant usage is not a ranking factor (skipped)
- Tier grouping (Critical / Important / Nice-to-have), not strict 1-12 ordering

### Tooling recommendations depth
- Mixed specificity: prescriptive for obvious wins ("this list should be a Mermaid diagram"), suggestive for judgment calls ("this section would benefit from a visual")
- High-impact tooling only: focus on Mermaid diagrams and code examples quality — skip low-impact suggestions
- i18n: score (1-5) plus top 3 most problematic i18n issues per chapter

### Output format & structure
- Both per-chapter detail files and a summary rollup document
- Summary is developer-focused (tier ranking table + aggregated findings, no executive summary)
- All audit files live inside `.planning/phases/04-content-audit/`

### Claude's Discretion
- Per-chapter detail file format (rubric table + prose vs structured sections — pick what best presents findings)
- Exact Mermaid diagram types to recommend (sequence, flowchart, etc.)
- How to handle chapters with no meaningful gaps (brief pass vs detailed confirmation)

</decisions>

<specifics>
## Specific Ideas

- Completeness has two lenses: "can they do it?" and "is the domain covered?" — both should be noted, not collapsed into one score
- i18n readiness should surface concrete examples (idioms, cultural references, ambiguous pronouns) not just a vague score
- Subtractive recommendations matter — flag verbose explanations and outdated patterns alongside missing content

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-content-audit*
*Context gathered: 2026-01-31*
