# PRD Update Methodology - Complete Reference

## Overview

This document provides the complete 5-phase methodology for updating Product Requirements Documents. Each phase includes detailed procedures, checklists, and examples.

---

## Phase 0: Document Handoff Protocol

### Purpose
Establish a complete, verified inventory of all input documents before beginning analysis.

### Detailed Procedure

#### Step 0.1: Document Receipt

Request all documents from user with the following prompt:

```
To update your PRD, please provide:

1. **Original PRD** - The current version to be updated
   - Preferred formats: .docx, .md
   - Note the current version number

2. **Change Documents** - All files containing updates:
   - Feedback notes
   - New feature specifications
   - Technical requirements
   - Stakeholder comments
   - Meeting notes with decisions

3. **Context Documents** (optional):
   - Related technical documentation
   - API specifications
   - Design documents
```

#### Step 0.2: Create Document Registry

For each received document, record:

| Field | Description |
|-------|-------------|
| ID | Unique identifier (D001, D002, etc.) |
| Filename | Original filename |
| Type | Original PRD, Change Doc, Context Doc |
| Format | .docx, .md, .pdf, etc. |
| Size | File size |
| Purpose | Brief description of document contents |
| Version | Version number if applicable |
| Received | Timestamp |
| Status | Received, Processed, Integrated |

#### Step 0.3: Version Baseline

Determine version progression:
- Extract current version from original PRD
- Determine new version number:
  - Major changes: Increment major version (2.0 → 3.0)
  - Minor changes: Increment minor version (2.0 → 2.1)
  - Patches/fixes: Increment patch (2.0.0 → 2.0.1)

#### Step 0.4: Confirmation

Present registry to user and confirm:
- All documents received
- No missing inputs
- Version progression is correct

### Exit Criteria Checklist

- [ ] All documents catalogued in registry
- [ ] Each document has clear purpose identified
- [ ] Version baseline established
- [ ] User confirms completeness

---

## Phase 1: Original PRD Deep Analysis

### Purpose
Develop complete understanding of the existing PRD structure, content, and relationships.

### Detailed Procedure

#### Step 1.1: Structural Survey

Read through entire PRD and document:

**Section Inventory**:
```markdown
## Structural Survey

**Total Main Sections**: [count]
**Total Subsections**: [count]
**Annexures**: [count]
**Total Pages**: [count]

### Section Hierarchy

1. Executive Summary
   1.1 Vision Statement
   1.2 Product Overview
   1.3 Key Differentiators
2. Problem Statement
   2.1 Current Challenges
   2.2 Target Users
...
```

**Annexure Inventory**:
```markdown
### Annexures

| Letter | Title | Purpose | Pages |
|--------|-------|---------|-------|
| A | Technical Specifications | Database schema, API specs | 12 |
| B | UI Mockups | Screen designs | 8 |
| C | Glossary | Term definitions | 3 |
```

#### Step 1.2: Section-by-Section Analysis

For each major section, document:

```markdown
### Section [N]: [Title]

**Purpose**: [What this section accomplishes]

**Key Content**:
- [Main point 1]
- [Main point 2]
- [Main point 3]

**Dependencies**:
- References Section [X] for [reason]
- Referenced by Section [Y] for [reason]

**Technical Details**: [Yes/No - if yes, note Annexure reference]
```

#### Step 1.3: Cross-Reference Map

Document all internal references:

```markdown
### Cross-Reference Map

| From Section | To Section | Reference Type |
|--------------|------------|----------------|
| 3.2 | 6.1 | Feature dependency |
| 5.1 | Annexure A | Technical details |
| 7.3 | 4.2 | Requirement trace |
```

#### Step 1.4: Terminology Glossary

Extract key terms and their definitions:

```markdown
### Terminology

| Term | Definition | First Used |
|------|------------|------------|
| Adaptive Pricing | Usage-based fee adjustment | Section 1.2 |
| Tax Region | A jurisdiction with its own rate and rules | Section 3.1 |
```

### Exit Criteria Checklist

- [ ] Complete section inventory created
- [ ] All Annexures catalogued
- [ ] Section purposes documented
- [ ] Cross-references mapped
- [ ] Key terminology extracted

---

## Phase 2: Change Document Analysis

### Purpose
Extract, classify, and organize all requested changes from input documents.

### Detailed Procedure

#### Step 2.1: Change Extraction

Read each change document and extract discrete changes:

```markdown
### Change Catalog

**Source Document**: [filename]

| Change ID | Description | Quote/Reference |
|-----------|-------------|-----------------|
| C001 | Add PayLink payment integration | "System must support PayLink..." |
| C002 | Update AI model to Gemini 2.5 | "Replace GPT-4 with Gemini 2.5 Flash" |
| C003 | Add regional tax rules support | "Support both standard and regional tax rules" |
```

#### Step 2.2: Change Classification

Classify each change:

| Type | Description | Example |
|------|-------------|---------|
| NEW | New feature or requirement | Add export to PDF |
| MOD | Modification to existing | Change timeout from 30s to 60s |
| DEL | Remove existing feature | Remove legacy auth method |
| CLR | Clarification of existing | Define "active user" criteria |
| FIX | Correction of error | Fix incorrect formula |

#### Step 2.3: Section Mapping

Map each change to affected PRD sections:

```markdown
### Change-Section Matrix

| Change ID | Type | Primary Section | Secondary Sections | Annexures |
|-----------|------|-----------------|-------------------|-----------|
| C001 | NEW | 6.3 Payments | 8.2 Security | New: Annexure D |
| C002 | MOD | 5.1 AI Engine | 7.1 Performance | Annexure A |
| C003 | NEW | 3.1 Tax Regions | 6.1 Billing | Annexure B |
```

#### Step 2.4: Conflict Detection

Identify and document conflicts:

**Types of Conflicts**:
1. **Inter-document**: Two change documents contradict each other
2. **Change-existing**: New change contradicts existing PRD content
3. **Internal**: Change document contains internal contradictions
4. **Dependency**: Change requires other changes not specified

```markdown
### Conflict Register

| Conflict ID | Type | Changes Involved | Description | Resolution |
|-------------|------|------------------|-------------|------------|
| CF001 | Inter-doc | C002, C015 | Different AI models specified | Pending user input |
| CF002 | Change-existing | C008 | Contradicts Section 4.2 | Update Section 4.2 |
```

#### Step 2.5: Ambiguity Register

Document unclear requirements:

```markdown
### Ambiguity Register

| ID | Change Ref | Issue | Question for User |
|----|------------|-------|-------------------|
| A001 | C003 | Scope unclear | Does regional tax support cover historical invoices? |
| A002 | C007 | Missing detail | What file formats for export? |
```

### Exit Criteria Checklist

- [ ] All changes extracted and catalogued
- [ ] Each change classified by type
- [ ] Section mappings complete
- [ ] Conflicts identified and documented
- [ ] Ambiguities listed with questions
- [ ] User consulted on conflicts/ambiguities

---

## Phase 3: Update Planning

### Purpose
Create detailed, actionable plan for implementing all changes.

### Detailed Procedure

#### Step 3.1: Impact Assessment

For each section, assess update impact:

```markdown
### Impact Matrix

| Section | Changes | Impact Level | Effort | Dependencies |
|---------|---------|--------------|--------|--------------|
| 1.0 Executive Summary | C001, C003 | Low | Update text | None |
| 5.1 AI Engine | C002 | High | Rewrite section | C005 first |
| 6.3 Payments | C001 | High | New subsections | None |
```

**Impact Levels**:
- **Low**: Text updates, minor clarifications
- **Medium**: New subsections, significant rewrites
- **High**: Major restructuring, new Annexures needed

#### Step 3.2: Annexure Architecture

Plan Annexure changes:

```markdown
### Annexure Plan

**Existing Annexures**:
| Annexure | Current Content | Updates Needed |
|----------|-----------------|----------------|
| A | Database Schema | Add payment tables |
| B | API Reference | Add payment endpoints |

**New Annexures**:
| Annexure | Title | Content | Source Changes |
|----------|-------|---------|----------------|
| D | Payment Integration | PayLink specs | C001 |
| E | Tax Region Map | Region-to-rate mappings | C003 |
```

#### Step 3.3: Update Sequence

Determine order of updates:

```markdown
### Update Sequence

**Round 1 - Foundation** (no dependencies):
1. Section 3.1 - Add regional tax rules (C003)
2. Section 8.2 - Security updates (C009)

**Round 2 - Core Features** (depends on Round 1):
3. Section 6.3 - Payment integration (C001)
4. Section 5.1 - AI model update (C002)

**Round 3 - Annexures**:
5. Annexure A - Schema updates
6. New Annexure D - Payment specs
7. New Annexure E - regional tax mapping

**Round 4 - Cross-cutting**:
8. Section 1.0 - Executive summary refresh
9. All sections - Cross-reference updates
```

#### Step 3.4: Detailed Update Plans

For each section update, create specific plan:

```markdown
### Update Plan: Section 6.3 Payments

**Changes to Implement**: C001

**Current State**:
- Basic payment mention
- No integration details

**Target State**:
- Full PayLink integration section
- Subscription management
- Payment flow diagrams

**Specific Updates**:
1. Add new subsection 6.3.1 "Payment Gateway Integration"
2. Add new subsection 6.3.2 "Subscription Management"
3. Add reference to Annexure D
4. Update feature matrix table

**Cross-Reference Updates**:
- Add reference from Section 8.2 Security
- Add reference from Section 9.1 Third-party integrations
```

### Exit Criteria Checklist

- [ ] Impact matrix complete
- [ ] Annexure architecture planned
- [ ] Update sequence determined
- [ ] Detailed plans for each section
- [ ] Cross-reference updates identified

---

## Phase 4: Execution

### Purpose
Implement all planned changes systematically.

### Detailed Procedure

#### Step 4.1: Version Header Update

Update document metadata:

```markdown
**Version**: [New Version]
**Date**: [Current Date]
**Status**: Draft → Under Review

### Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 3.0 | Jan 2026 | [Name] | Payment integration, regional tax rules, AI model update |
| 2.0 | Dec 2025 | [Name] | Previous version description |
```

#### Step 4.2: Section Updates

For each section in update sequence:

1. **Read current section** - Understand existing content
2. **Apply changes** - Implement per detailed plan
3. **Maintain style** - Match existing formatting
4. **Update references** - Add/modify cross-references
5. **Mark complete** - Check off in tracking

**Tracking Template**:
```markdown
### Update Progress

| Section | Status | Changes Applied | Notes |
|---------|--------|-----------------|-------|
| 1.0 | Complete | C001, C003 | Summary refreshed |
| 5.1 | In Progress | C002 | Awaiting AI specs |
| 6.3 | Complete | C001 | New subsections added |
```

#### Step 4.3: Annexure Updates

For each Annexure:

1. **Update existing** - Apply changes, maintain format
2. **Create new** - Use consistent structure:
   ```markdown
   # Annexure [X]: [Title]

   ## X.1 Overview
   [Purpose of this annexure]

   ## X.2 [First Topic]
   [Content]

   ## X.3 [Second Topic]
   [Content]
   ```
3. **Add references** - Ensure main document references Annexure

#### Step 4.4: Output Generation

**Generate Markdown**:
1. Compile all updated sections
2. Verify section numbering
3. Check all cross-references
4. Save as `ProductName_PRD_v[X.X].md`

**Generate Word Document**:
1. Run the bundled generator: `node skills/_shared/generate-prd.js <input.md> <output.docx> [options]`
2. Specify document metadata via options:
   - `--product-name`, `--version`, `--date`, `--author`, `--status`
   - `--organisation` (omit for none), `--classification` (pass `""` to omit)
3. Save as `ProductName_PRD_v[X.X].docx`
4. If the `docx` package is not installed, say so and stop at markdown — the markdown is the deliverable of record either way.

### Exit Criteria Checklist

- [ ] All sections updated per plan
- [ ] All Annexures updated/created
- [ ] Cross-references verified
- [ ] Markdown file generated
- [ ] Word document generated
- [ ] Both files named correctly with version

---

## Phase 5: Final Verification

### Purpose
Ensure complete, accurate, coherent update.

### Detailed Procedure

#### Step 5.1: Completeness Audit

Verify all changes implemented:

```markdown
### Completeness Audit

| Change ID | Description | Status | Location |
|-----------|-------------|--------|----------|
| C001 | PayLink integration | ✓ Implemented | 6.3, Annexure D |
| C002 | AI model update | ✓ Implemented | 5.1, Annexure A |
| C003 | regional tax rules | ✓ Implemented | 3.1, Annexure E |
```

**Verification Queries**:
- Search for each key term from changes
- Verify each new section exists
- Confirm Annexure references work

#### Step 5.2: Coherence Check

Read through for quality:

**Flow Check**:
- Does document read logically?
- Are transitions smooth between sections?
- Is complexity appropriate for each section?

**Terminology Check**:
- Consistent term usage throughout?
- New terms added to glossary?
- Abbreviations defined on first use?

**Reference Check**:
- All forward references valid?
- All backward references valid?
- All Annexure references correct?

#### Step 5.3: Output Validation

**Markdown Validation**:
- Renders correctly in viewer
- All headers properly formatted
- Tables display correctly
- Code blocks formatted
- Links work (internal references)

**Word Document Validation**:
- Cover page correct
- Document control table updated
- Revision history current
- TOC generates correctly
- Styling consistent
- Page numbers correct
- Headers/footers present

#### Step 5.4: Final Checklist

```markdown
### Final Verification Checklist

**Content**:
- [ ] All changes from catalog implemented
- [ ] No content accidentally deleted
- [ ] New content properly integrated
- [ ] Cross-references valid

**Format**:
- [ ] Section numbering correct
- [ ] Consistent formatting throughout
- [ ] Tables properly formatted
- [ ] Code blocks correct

**Metadata**:
- [ ] Version number updated
- [ ] Date current
- [ ] Revision history entry added
- [ ] Author information correct

**Output Files**:
- [ ] Markdown file complete and correct
- [ ] Word document styled correctly
- [ ] Both files contain identical content
- [ ] Files named with correct version
```

### Exit Criteria Checklist

- [ ] All changes verified as implemented
- [ ] Document reads coherently
- [ ] All references validated
- [ ] Both output files verified
- [ ] Ready for delivery to user

---

## Appendix: Templates

### Document Registry Template

```markdown
## Document Registry

**Project**: [Project Name]
**Update Session**: [Date]
**Baseline Version**: [X.X]
**Target Version**: [Y.Y]

| ID | Filename | Type | Purpose | Version | Status |
|----|----------|------|---------|---------|--------|
| D001 | | | | | |

**Confirmation**: [ ] User confirms all documents received
```

### Change Catalog Template

```markdown
## Change Catalog

**Total Changes**: [count]

| ID | Source | Description | Type | Sections | Status |
|----|--------|-------------|------|----------|--------|
| C001 | | | | | Pending |
```

### Update Tracking Template

```markdown
## Update Tracking

**Phase**: [Current Phase]
**Progress**: [X of Y sections complete]

| Section | Changes | Status | Notes |
|---------|---------|--------|-------|
| | | | |
```
