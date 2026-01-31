# Chapter 09: Browser Constraints - Audit

| Dimension | Score (1-5) | Key Finding |
|-----------|-------------|-------------|
| Clarity | 3 | Each section is individually clear but topics are so thinly covered that a learner gets definitions without understanding |
| Logical Flow | 3 | Topics are grouped logically (files, printing, security, storage, clipboard) but each feels like a bullet point rather than a section |
| Completeness | 2 | Severely thin: 95 lines covering 5 major topics. File handling, printing, security, storage, and clipboard each get ~10 lines -- not enough for any to be actionable |
| Relevance | 4 | Every topic covered is highly relevant to DWC developers transitioning from desktop; these ARE the constraints they will hit |
| Code Examples Quality | 2 | Code snippets are minimal stubs; file upload shows only the chooser creation, download shows only one line; no complete workflows |
| i18n Readiness | 4 | Technical prose is straightforward and culture-neutral; minimal translation challenges |

**Overall: 3.0 / 5.0**

## Detailed Findings

### Completeness (2)

**Task lens:** A learner CANNOT implement file upload/download, printing, clipboard, or local storage workflows after reading this chapter. Each topic provides a 1-2 line code stub without the surrounding workflow. Specifically:
- **File upload:** Shows `addFileChooser()` and callback registration but not what happens in the callback (how to get the file, where it goes, size limits)
- **File download:** Shows `web!.download()` but not how to generate the server-side file or handle errors
- **Printing:** Lists three options (SYSPRINT, BBjPrinter, Jasper Reports) but none are explained; print preview shows a download, which is not actually print preview
- **Clipboard:** Single line `copyToClipboard()` with no paste example, no error handling, no explanation of the "user gesture" requirement
- **Local storage:** Shows session storage set/get but not when to use it, size limits, or the distinction between session and local storage

**Topic lens:** The browser constraints domain is adequately scoped (the right topics are listed) but each topic is covered at ~20% depth. This is a table of contents for a chapter, not the chapter itself.

### Clarity (3)

Individual sentences are clear, but the brevity creates false clarity -- a learner reads "the browser does not support direct access to client files" and gets the concept, but has no understanding of WHAT to do about it. The security section lists three bullet points (Same-Origin Policy, HTTPS Requirements, Cookie Limitations) without explaining what any of them mean for a DWC developer.

### Code Examples Quality (2)

The code examples are stubs rather than examples:
- `fileChooser! = wnd!.addFileChooser()` -- creates the chooser but the callback `onFileSelected` is never defined
- `web!.download(serverFilePath$, clientFileName$)` -- one line with placeholder variable names
- `web!.setSessionStorage("key", "value")` / `web!.getSessionStorage("key")` -- trivially obvious getter/setter
- `web!.copyToClipboard(text$)` -- one line with no context

None of these are runnable or complete. A learner would need external resources to implement any of these features.

### Logical Flow (3)

The ordering is reasonable (files -> printing -> security -> storage -> clipboard) but there is no narrative connecting them. The chapter reads as five independent micro-sections rather than a coherent treatment of "what's different in the browser." An introductory framing of "desktop vs. browser capabilities" would tie the sections together.

## Content Gaps

- **File upload complete workflow:** What happens after the file is selected? How does it get to the server? What are size limits?
- **File download complete workflow:** How to generate a file server-side, handle large files, provide progress feedback
- **Print workflow:** At least one complete printing approach (e.g., Jasper Reports PDF generation) should be demonstrated end-to-end
- **Security section depth:** Same-Origin Policy needs explanation of what it blocks and how CORS/proxy patterns solve it for DWC
- **Local vs. session storage:** Distinction not explained; size limits not mentioned; use cases not provided
- **Clipboard paste:** Only copy is shown; paste requires different browser APIs and permissions
- **No exercises:** The chapter has no hands-on tasks at all
- **Missing error handling:** None of the code examples show what happens when operations fail

## Recommendations

### Additive
1. **Expand file handling to complete workflows** -- Show full upload (chooser -> callback -> server-side file access) and download (generate -> serve -> client receives) sequences. This alone would double the chapter's value. (HIGH priority)
2. **Add sequence diagram for file upload/download** (Mermaid) -- Recommended in RESEARCH; would visually clarify the browser-server boundary that is the core concept of this chapter
3. **Expand security section** -- Explain Same-Origin Policy with a concrete DWC example (e.g., calling an external API from a DWC app fails; here's why and what to do)
4. **Add local vs. session storage comparison table** -- When to use each, size limits, persistence behavior
5. **Add at least one complete exercise** -- "Implement a file upload that saves to the server and confirms success to the user"

### Subtractive
6. **Remove or expand printing options table** -- Currently lists SYSPRINT, BBjPrinter, Jasper Reports without explaining any. Either remove the table and reference external docs, or expand at least one option to a working example

## Mermaid Diagram Opportunities

**Sequence diagram for file upload/download flow** (HIGH priority -- recommended in RESEARCH):
```
sequenceDiagram
    participant User
    participant Browser
    participant DWC Client
    participant BBj Server

    Note over User,BBj Server: File Upload
    User->>Browser: Select file
    Browser->>DWC Client: File selected event
    DWC Client->>BBj Server: Upload file data
    BBj Server-->>DWC Client: Confirm receipt

    Note over User,BBj Server: File Download
    BBj Server->>DWC Client: web!.download()
    DWC Client->>Browser: Trigger download
    Browser->>User: Save file dialog
```

This would make the browser-server boundary immediately clear and address the chapter's core weakness: the reader not understanding WHERE things happen.

## i18n Notes

**Top 3 issues:**
1. "Noscript" and error message patterns in code examples contain English text -- minor, expected for code
2. Screenshot of client files handling contains English UI -- would need localized version
3. Best practices section uses informal "don't expect" phrasing -- easily translatable but note the imperative tone
