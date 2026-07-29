---
name: prd-update
description: "Use when the user asks to 'update a PRD', 'revise PRD document', 'apply changes to PRD', 'incorporate feedback into PRD', or needs an existing Product Requirements Document systematically updated with new specifications. Invoked by /gantry:review-prd to apply review findings as PRD vNext."
---

# PRD Update Skill

## Overview

Update an existing PRD using a structured 5-phase methodology that keeps changes traceable and the document coherent. Nothing is edited until every requested change has been catalogued and conflicts have been surfaced.

## When to Use

- Updating an existing PRD with new requirements
- Incorporating stakeholder feedback
- Adding features or revising technical specifications
- Producing a new version of an existing PRD

Inside Gantry this runs at **S1** (`/gantry:review-prd`): the current PRD is the original, and `docs/reviews/PRD-review.md` — the research-backed fact-check — is the change document. The review finds what is wrong; this skill applies it.

## Required Inputs

1. **Original PRD** — the current version (Markdown or Word)
2. **Change documents** — one or more files containing updates, feedback, review findings, or new requirements

## Output Files

1. **Markdown PRD** — `<ProductName>_PRD_vX.X.md` (version incremented) ← source of truth
2. **Word document** — `<ProductName>_PRD_vX.X.docx`

## The 5-Phase Methodology

Full detail: `references/methodology.md`. Never skip a phase; each builds on the last.

### Phase 0: Document Handoff Protocol
Inventory every input document — filename, type, purpose, version — confirm completeness with the user, and establish the version baseline (current → new).
**Exit**: all documents catalogued and confirmed.

### Phase 1: Original PRD Deep Analysis
Structural survey (sections, subsections, annexures, numbering scheme), section-by-section analysis, and a section index. You cannot safely change a document you have not mapped.
**Exit**: complete structural understanding documented.

### Phase 2: Change Document Analysis
Catalogue each distinct change, classify it (new feature / modification / deletion / clarification), map it to affected sections, and **detect conflicts** — between change documents, and against existing requirements.

| Change ID | Description | Type | Affected Sections | Conflicts |
|-----------|-------------|------|-------------------|-----------|
| C001 | Add payment integration | New | 6.3, Annexure B | None |

**Exit**: all changes catalogued with section mappings; conflicts explicit.

### Phase 3: Update Planning
Impact matrix per section, annexure architecture (what moves to an annexure and what gets created), and an update sequence ordered to keep the document coherent as it changes.
**Exit**: complete update plan.

### Phase 4: Execution
Version header and revision-history entry → section updates in planned order → annexure updates → output generation. Maintain consistent terminology and fix cross-references as you go.
**Exit**: all changes implemented, both outputs generated.

### Phase 5: Final Verification
Completeness audit (every catalogued change addressed), coherence check (logical flow, valid cross-references, consistent terms), output validation (markdown renders, docx styled, identical content).
**Exit**: all checks pass.

## Document Registry Format

```markdown
## Document Registry

| ID | Filename | Type | Purpose | Version | Status |
|----|----------|------|---------|---------|--------|
| D001 | Product_PRD_v2.0.md | Original PRD | Base document | 2.0 | Received |
| D002 | PRD-review.md | Change Doc | S1 fact-check findings | - | Received |

**Baseline Version**: 2.0
**Target Version**: 3.0
**Update Date**: [date]
```

Versioning rules: `references/version-control.md`. Common update shapes: `references/update-patterns.md`.

## Word document generation

```bash
node skills/_shared/generate-prd.js docs/<Product>_PRD_v2.1.md docs/<Product>_PRD_v2.1.docx \
  --product-name "<Product>" --version "2.1" --author "<Author>" --status "Approved" \
  --organisation "<Org>"          # omit entirely if there is no organisation
```

Requires `npm install` in the Gantry repo (the `docx` package). If unavailable, deliver the markdown and say so — the markdown is the version of record regardless.

## Best Practices

1. **Never skip phases** — each builds on the previous
2. **Document everything** — maintain an audit trail of decisions
3. **Validate with the user** — confirm understanding before executing
4. **Preserve structure** — keep existing section numbering where possible; renumbering breaks every external reference to the document
5. **Use annexures** — move detailed technical specs out of the main flow
6. **Track conflicts explicitly** — never silently pick a winner between two contradictory instructions; surface it and ask
