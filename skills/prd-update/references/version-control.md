# PRD Version Control Reference

## Version Numbering

### Semantic Versioning for PRDs

PRD documents follow a modified semantic versioning scheme:

```
MAJOR.MINOR[.PATCH]
```

| Component | When to Increment | Examples |
|-----------|-------------------|----------|
| MAJOR | Significant changes, new editions, major restructuring | 1.0 → 2.0 |
| MINOR | New features, substantial additions | 2.0 → 2.1 |
| PATCH | Corrections, clarifications, typos | 2.1 → 2.1.1 |

### Version Examples

| Change Type | From | To | Rationale |
|-------------|------|-----|-----------|
| Initial release | - | 1.0 | First version |
| Add new feature section | 1.0 | 1.1 | Additive change |
| Major restructure | 1.1 | 2.0 | Breaking structure change |
| Add new edition (Team) | 2.0 | 2.0 | Same version, different edition |
| Fix typos | 2.0 | 2.0.1 | Patch correction |
| Multiple new features | 2.0.1 | 2.1 | Skip to minor |
| Technology replacement | 2.1 | 3.0 | Major component change |

---

## Document Registry

### Purpose

Track all documents involved in PRD creation and updates:
- Maintain audit trail
- Enable reproducibility
- Track dependencies

### Registry Structure

```markdown
## Document Registry

**Project**: [Project Name]
**Session Date**: [Date]
**Session ID**: [Unique ID]

### Input Documents

| ID | Filename | Type | Hash | Received | Purpose |
|----|----------|------|------|----------|---------|
| D001 | Product_PRD_v2.0.docx | Original | abc123 | 2026-01-15 | Base document |
| D002 | feature-specs.md | Change | def456 | 2026-01-15 | New features |
| D003 | feedback.docx | Change | ghi789 | 2026-01-15 | Stakeholder feedback |

### Output Documents

| ID | Filename | Type | Hash | Generated | Version |
|----|----------|------|------|-----------|---------|
| O001 | Product_PRD_v3.0.md | Markdown | jkl012 | 2026-01-16 | 3.0 |
| O002 | Product_PRD_v3.0.docx | Word | mno345 | 2026-01-16 | 3.0 |

### Version Lineage

```
v1.0 (Initial)
  ↓
v2.0 (Team Edition) ← D001 base
  ↓
v3.0 (Current) ← D002, D003 changes
```
```

### Document Types

| Type | Description | Examples |
|------|-------------|----------|
| Original | Base PRD being updated | Product_PRD_v2.0.docx |
| Change | Documents with updates | feedback.md, specs.docx |
| Context | Reference material | API docs, designs |
| Output | Generated documents | PRD_v3.0.md, PRD_v3.0.docx |

---

## File Naming Conventions

### PRD Documents

```
[ProductName]_PRD_v[VERSION].[ext]
```

**Examples**:
- `Marketstall_PRD_v1.0.md`
- `Marketstall_PRD_v2.0.docx`
- `Marketstall_PRD_v3.0_V2styled.docx`

### Supporting Documents

```
[ProductName]_[DocType]_v[VERSION].[ext]
```

**Examples**:
- `Marketstall_TechSpec_v1.0.md`
- `Marketstall_MarketResearch_v1.0.md`

### Session Artifacts

```
[ProductName]_[Artifact]_[DATE].[ext]
```

**Examples**:
- `Marketstall_ChangeLog_20260115.md`
- `Marketstall_Registry_20260115.json`

---

## Revision History

### Standard Format

Include revision history table after document control:

```markdown
## Revision History

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| 3.0 | January 2026 | A. Author | Payment integration, provider migration, AI model update |
| 2.0 | December 2025 | A. Author | Team edition features, admin dashboard, role management |
| 1.5 | November 2025 | A. Author | Bulk import mode, historical data analysis |
| 1.0 | October 2025 | A. Author | Initial specification |
```

### Change Summary Guidelines

- **Be specific**: List actual features/changes, not "various updates"
- **Be concise**: One line per version, major items only
- **Use consistent terms**: Match terminology in document

### Detailed Change Log

For complex updates, maintain separate change log:

```markdown
## Detailed Change Log - Version 3.0

### New Features
- Section 6.8: PayLink payment integration
- Section 3.1.2: Regional tax rules support
- Annexure D: Payment specifications
- Annexure E: Tax region mapping

### Modifications
- Section 5.1: AI model changed from GPT-4 to Gemini 2.5 Flash
- Section 7.1: Updated performance requirements for new AI model
- Annexure A: Updated technical architecture

### Corrections
- Section 4.2: Fixed incorrect tier name reference
- Section 8.1: Clarified authentication requirements

### Removed
- Section 6.4.3: Deprecated export format (PDF/A-1)
```

---

## Status Tracking

### Document Status Values

| Status | Description | Next Steps |
|--------|-------------|------------|
| Draft | Initial creation, incomplete | Complete content |
| Review | Content complete, under review | Collect feedback |
| Approved | Stakeholder approved | Publish/distribute |
| Published | Official release | Archive previous |
| Superseded | Replaced by newer version | Reference only |
| Deprecated | No longer valid | Do not use |

### Status in Document Control

```markdown
## Document Control

| Item | Details |
|------|---------|
| Document Title | Marketstall Product Requirements Document |
| Version | 3.0 |
| Status | **Draft** |
| Date | January 2026 |
| Classification | Confidential |
```

---

## Archive Management

### When to Archive

- Before starting major updates
- After publishing new version
- Before restructuring

### Archive Naming

```
[ProductName]_PRD_v[VERSION]_ARCHIVE_[DATE].[ext]
```

**Example**: `Marketstall_PRD_v2.0_ARCHIVE_20260115.docx`

### Archive Location

Maintain archive folder structure:

```
project/
├── current/
│   ├── Marketstall_PRD_v3.0.md
│   └── Marketstall_PRD_v3.0.docx
├── archive/
│   ├── v1.0/
│   │   └── Marketstall_PRD_v1.0_ARCHIVE_20251015.docx
│   └── v2.0/
│       └── Marketstall_PRD_v2.0_ARCHIVE_20260115.docx
└── working/
    └── [Session artifacts]
```

---

## Conflict Resolution

### Version Conflicts

When multiple update sessions produce different versions:

1. **Identify common ancestor**: Find last shared version
2. **List changes from each branch**: Document what each session added
3. **Merge manually**: Combine changes, resolve conflicts
4. **Increment appropriately**: New version reflects merged state

### Content Conflicts

When change documents contradict:

1. **Document conflict**: Record in conflict register
2. **Identify authority**: Which source has priority?
3. **Escalate if needed**: Ask user for decision
4. **Record resolution**: Note decision and rationale

### Resolution Log

```markdown
## Conflict Resolution Log

| ID | Conflict | Sources | Resolution | Decided By | Date |
|----|----------|---------|------------|------------|------|
| CR001 | AI model choice | D002 vs D003 | Use Gemini 2.5 per D003 | User | 2026-01-15 |
| CR002 | Timeout value | D002 vs existing | Keep existing 60min | Technical review | 2026-01-15 |
```

---

## Checksums and Integrity

### Purpose

Verify document integrity and detect unauthorized changes.

### Generating Checksums

**PowerShell**:
```powershell
Get-FileHash -Algorithm SHA256 "document.docx" | Select-Object Hash
```

**Bash**:
```bash
sha256sum document.docx
```

### Recording Checksums

Include in document registry:

```markdown
| Filename | SHA256 Hash |
|----------|-------------|
| Marketstall_PRD_v2.0.docx | a1b2c3d4e5f6... |
| Marketstall_PRD_v3.0.docx | g7h8i9j0k1l2... |
```

### Verification

Before starting update session, verify input documents:
1. Calculate hash of received document
2. Compare to recorded hash (if available)
3. Note any discrepancies

---

## Best Practices

### 1. Always Increment Version
Never overwrite same version number with different content.

### 2. Maintain Complete History
Keep all versions accessible, even if superseded.

### 3. Document All Changes
Revision history should tell the story of the document.

### 4. Use Consistent Naming
Follow conventions exactly for all documents.

### 5. Verify Before and After
Check checksums/content at session boundaries.

### 6. Archive Before Major Changes
Create backup before restructuring.

### 7. Clear Status Tracking
Always know current document status.
