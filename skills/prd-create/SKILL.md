---
name: prd-create
description: "Use when the user asks to 'create a new PRD', 'write a PRD from scratch', 'generate product requirements', 'start a new PRD', or needs a new Product Requirements Document built through guided requirements gathering and research. Invoked by /gantry:prd when no PRD exists."
---

# PRD Creation Skill

## Overview

Create a new Product Requirements Document from scratch through a guided interview, market research, and systematic document generation. Markdown is the deliverable of record; a Word render is produced for stakeholders.

## When to Use

- Starting a new product specification
- Creating a PRD for a new feature set
- Documenting requirements for a new project
- Filling gaps in a partial specification

Inside Gantry this runs at **S-PRD**, ahead of everything else (`process/prd-intake.md`). It is the one stage permitted to ask the user as many questions as it needs.

## Output Files

Written to `docs/` unless the caller specifies otherwise:

1. **Market Research** — `<ProductName>_MarketResearch_v1.0.md`
2. **PRD Markdown** — `<ProductName>_PRD_v1.0.md` ← source of truth
3. **PRD Word document** — `<ProductName>_PRD_v1.0.docx` ← render for stakeholders

`<ProductName>` is PascalCase without spaces.

## Workflow

```
Phase 1  Requirements interview      → what the product is, for whom, and where it stops
Phase 2  Market research             → who else does this, and how this differs
Phase 3  Document generation         → market research doc, PRD markdown, PRD docx
Phase 4  Review and refinement       → iterate with the user until they accept it
```

## Phase 1: Requirements Interview

Ask in logical groups; let the user answer at whatever depth they want. Full question bank: `references/requirements-interview.md`.

#### Group 1: Product Overview
- What is the product name?
- What problem does this product solve?
- What is the core value proposition?
- Who are the primary target users?

#### Group 2: Scope and Features
- What are the must-have features for the initial release?
- What is nice-to-have for later?
- What is explicitly out of scope?
- What scale is expected (users, data volume)?

#### Group 3: Technical Requirements
- Preferred or forbidden technologies?
- Which platforms (web, mobile, desktop)?
- Integration requirements (APIs, third-party services)?
- Performance expectations?

#### Group 4: Business Context
- New product or enhancement to an existing one?
- Target market — **which countries or regions?** (This determines what must be verified later: payment rails, registries, tax, privacy law.)
- Consumer, enterprise, or a specific industry?
- Compliance or regulatory requirements?
- Timeline or release milestones?
- **Organisation name for the document** — the name to appear on the cover and in document control. Blank is a valid and common answer; if blank, generate the documents with no organisation at all rather than a placeholder.

#### Group 5: Existing Ecosystem (only where it applies)
Identity providers, systems of record, collaboration tools the product must live inside, and estate constraints. Skip entirely for greenfield consumer products.

### Interview Best Practices

1. **Start broad, then narrow**: vision first, then specifics
2. **Clarify ambiguity**: follow up on anything vague
3. **Confirm understanding**: summarise key points back
4. **Note gaps**: record what needs research rather than inventing an answer

## Phase 2: Market Research

Objectives: competitive analysis, technology research, positioning. Method and tooling: `references/research-guide.md`; structure and analysis frames: `references/market-research-guide.md`.

**Every claim carries a source and the date it was checked.** Competitor pricing, feature matrices, and market-size figures decay quickly, and an unsourced competitive claim is worse than no claim.

Output structure:

```markdown
# Market Research: [Product Name]

## Executive Summary
## 1. Market Overview            (size/growth, segments, trends)
## 2. Competitive Analysis       (direct, indirect, feature matrix)
## 3. Differentiation Strategy   (UVP, key differentiators, advantages)
## 4. Technology Landscape       (relevant tech, integration ecosystem, recommendations)
## 5. Recommendations            (entry strategy, feature prioritisation, positioning)
## Appendix: Research Sources    (URL + date checked)
```

## Phase 3: Document Generation

PRD structure (full per-section templates in `references/section-templates.md`):

```markdown
# [Product Name] Product Requirements Document
## Document Control            (organisation/classification rows omitted if not supplied)
## Revision History

## 1. Executive Summary        (vision, overview, differentiators)
## 2. Problem Statement        (challenges, target users, pain points)
## 3. Product Scope            (in, out, future)
## 4. User Stories             (grouped by user type)
## 5. Functional Requirements  (by feature area, numbered FR-n)
## 6. Non-Functional Requirements (performance, security, scalability, usability, accessibility)
## 7. Technical Architecture   (system overview, stack, integrations, data)
## 8. User Interface           (principles, key screens, flows)
## 9. Implementation Roadmap   (MVP, enhancement, scale)
## 10. Success Metrics         (KPIs, success criteria)
## 11. Risks and Mitigations   (technical, business, mitigations)
## 12. Appendices              (glossary, references)
## ANNEXURE A: Technical Specifications
## ANNEXURE B: API Reference   (if applicable)
```

> **Technical Architecture is a sketch, not a decision.** Inside Gantry the stack is chosen at S2 (`/gantry:stack`) against a scored comparison. Record what the user has already decided and what the requirements imply; do not pre-empt the evaluation.

### Word document generation

```bash
node skills/_shared/generate-prd.js docs/<Product>_PRD_v1.0.md docs/<Product>_PRD_v1.0.docx \
  --product-name "<Product>" --version "1.0" --author "<Author>" --status "Draft" \
  --organisation "<Org>"          # omit this flag entirely if there is no organisation
```

Requires `npm install` in the Gantry repo (the `docx` package). If it is unavailable, say so plainly and deliver the markdown — never fake a `.docx`, and never let a missing renderer block the PRD.

Styling lives in `skills/_shared/style-constants.js`. Edit that file to match a house style; it is the only place appearance is defined.

## Phase 4: Review and Refinement

Present the documents and check against `references/quality-checklist.md`:

**Content**: all requirements captured · user stories cover every persona · technical and non-functional requirements addressed
**Research**: competitors accurate · differentiation stated · technology claims sourced
**Document**: clear and consistent · properly formatted · **no placeholder content left behind**

Then iterate: gather feedback → identify changes → revise → regenerate both outputs. Repeat until the user accepts it. For substantial revisions after acceptance, use the `prd-update` skill instead — it versions and tracks changes properly.

## Reference Files

- `references/requirements-interview.md` — complete interview question bank
- `references/section-templates.md` — templates for each PRD section
- `references/research-guide.md` — documentation sources and research method
- `references/quality-checklist.md` — comprehensive quality checks
- `references/market-research-guide.md` — market research methodology

## Best Practices

1. **Ask before assuming** — clarify requirements rather than inventing them
2. **Research thoroughly** — verify, don't recall
3. **Document sources** — URL and date, in the appendix
4. **Iterate early** — get feedback before generating the full document set
5. **Maintain consistency** — one term per concept, throughout
6. **Be specific** — measurable criteria, not adjectives
7. **Leave gaps visible** — an open question recorded is worth more than a confident guess
