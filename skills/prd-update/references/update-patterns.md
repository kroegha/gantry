# PRD Update Patterns

## Common Update Scenarios

This reference covers common patterns for updating PRD documents.

---

## Pattern 1: Adding a New Feature

### Scenario
User provides specifications for a new feature to add to the PRD.

### Approach

1. **Identify insertion point**:
   - Find the appropriate section for the feature
   - Determine if new subsection needed

2. **Create feature section**:
   ```markdown
   ### X.X [Feature Name]

   #### Overview
   [Brief description of the feature]

   #### User Stories
   - As a [user type], I want to [action] so that [benefit]

   #### Functional Requirements
   | ID | Requirement | Priority |
   |----|-------------|----------|
   | FR-XXX | [Requirement] | Must Have |

   #### Technical Considerations
   [Technical notes, see Annexure X for details]
   ```

3. **Create/update Annexure**:
   - Add detailed technical specifications
   - Include data models, API specs, etc.

4. **Update cross-references**:
   - Add to feature list/matrix
   - Reference from related sections
   - Update executive summary if major feature

### Example

**Change**: Add real-time collaboration feature

**Main Section Addition (6.7)**:
```markdown
### 6.7 Real-Time Collaboration

#### Overview
Enable multiple users to collaborate on documents simultaneously with real-time synchronization.

#### User Stories
- As an owner, I want to see edits from my team in real-time so that we don't overwrite each other
- As a contributor, I want to see who else is editing so that I know when to wait

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-071 | System shall sync changes within 500ms | Must Have |
| FR-072 | System shall show user presence indicators | Should Have |
| FR-073 | System shall handle conflict resolution | Must Have |

See Annexure F for technical specifications.
```

**Annexure Addition**:
```markdown
# Annexure F: Real-Time Collaboration Technical Specification

## F.1 Architecture
[WebSocket implementation details]

## F.2 Data Synchronization
[CRDT or OT algorithm details]

## F.3 API Endpoints
[Collaboration endpoints]
```

---

## Pattern 2: Modifying Existing Requirements

### Scenario
User requests changes to existing functionality.

### Approach

1. **Locate existing content**:
   - Find all mentions of the feature
   - Note all cross-references

2. **Document current state**:
   - Save original text for reference
   - Note why change is needed

3. **Apply modification**:
   - Update primary section
   - Update all cross-references
   - Update Annexures if affected

4. **Verify consistency**:
   - Search for old terminology
   - Ensure no orphaned references

### Example

**Change**: Increase session timeout from 30 minutes to 60 minutes

**Locations to Update**:
- Section 8.1 Security Requirements
- Annexure A: System Configuration
- Section 7.2 Performance Requirements (if mentioned)

**Before**:
```markdown
The system shall automatically log out users after 30 minutes of inactivity.
```

**After**:
```markdown
The system shall automatically log out users after 60 minutes of inactivity.
```

---

## Pattern 3: Replacing Technology/Component

### Scenario
User wants to replace one technology with another (e.g., different AI model, database, framework).

### Approach

1. **Inventory all mentions**:
   - Search for old technology name
   - List all sections mentioning it

2. **Understand implications**:
   - What capabilities change?
   - What new capabilities added?
   - What limitations introduced?

3. **Systematic replacement**:
   - Replace name/references
   - Update capability descriptions
   - Modify technical specifications

4. **Update rationale**:
   - Add justification for change
   - Note in revision history

### Example

**Change**: Replace GPT-4 with Gemini 2.5 Flash

**Search Results**:
- Section 5.1: AI Engine Overview (3 mentions)
- Section 5.2: Response Generation (2 mentions)
- Section 7.1: Performance (1 mention)
- Annexure A: Technical Architecture (5 mentions)

**Updates Required**:

Section 5.1:
```markdown
### 5.1 AI Engine

The system uses **[current fast model]** as the primary AI model for:
- Draft generation from structured input
- Summarisation of long-form content
- Classification and tagging
- Natural language understanding

Gemini 2.5 Flash provides:
- 1M token context window
- Multimodal input (text + images)
- Low-latency responses
- Cost-effective scaling
```

Annexure A - API Integration:
```markdown
## A.3 AI Model Integration

**Provider**: Google AI (Vertex AI)
**Model**: gemini-2.5-flash
**Endpoint**: vertex.googleapis.com
**Authentication**: Service Account with Vertex AI User role
```

---

## Pattern 4: Adding New Annexure

### Scenario
Detailed technical content needs separate Annexure.

### Approach

1. **Determine Annexure letter**:
   - Follow existing sequence (A, B, C...)
   - Use descriptive title

2. **Create standard structure**:
   ```markdown
   # Annexure [X]: [Descriptive Title]

   ## X.1 Overview
   [Purpose and scope of this annexure]

   ## X.2 [First Major Topic]
   ### X.2.1 [Subtopic]
   [Content]

   ## X.3 [Second Major Topic]
   [Content]

   ## X.4 References
   [Related sections in main document]
   ```

3. **Add references from main document**:
   - Add "See Annexure X" references
   - Update Annexure list in TOC area

### Example

**New Annexure D: Payment Integration Specification**

```markdown
# Annexure D: Payment Integration Specification

## D.1 Overview

This annexure details the PayLink payment gateway integration for Marketstall subscription management.

## D.2 Payment Gateway Configuration

### D.2.1 PayLink Account Setup
- Merchant ID configuration
- Passphrase management
- Webhook URL registration

### D.2.2 Environment Configuration
| Environment | URL | Merchant ID |
|-------------|-----|-------------|
| Sandbox | sandbox.paylink.example | SANDBOX-MERCHANT-ID |
| Production | api.paylink.example | [Production ID] |

## D.3 Payment Flows

### D.3.1 New Subscription
[Flow diagram and description]

### D.3.2 Subscription Renewal
[Flow diagram and description]

### D.3.3 Cancellation
[Flow diagram and description]

## D.4 API Endpoints

### D.4.1 Initiate Payment
```
POST /api/payments/initiate
```

### D.4.2 Webhook Handler
```
POST /api/payments/webhook
```

## D.5 Security Considerations

- Signature validation
- Webhook verification
- PCI compliance notes

## D.6 References

- Main document Section 6.3: Payment Integration
- Main document Section 8.2: Security Requirements
```

---

## Pattern 5: Restructuring Sections

### Scenario
Content needs to be reorganized for clarity.

### Approach

1. **Map current structure**:
   - Document existing hierarchy
   - Note content in each section

2. **Design new structure**:
   - Plan new hierarchy
   - Map old content to new locations

3. **Execute restructure**:
   - Move content to new locations
   - Update all section numbers
   - Update all cross-references

4. **Verify completeness**:
   - No content lost
   - All references updated

### Example

**Change**: Split Section 6 "Features" into "Core Features" and "Advanced Features"

**Before**:
```
6. Features
   6.1 Listing Creation
   6.2 AI Description Drafting
   6.3 Search and Filtering
   6.4 Usage Reporting
   6.5 Bulk Import
   6.6 Historical Analysis
```

**After**:
```
6. Core Features
   6.1 Listing Creation
   6.2 AI Description Drafting
   6.3 Search and Filtering
   6.4 Usage Reporting

7. Advanced Features
   7.1 Bulk Import
   7.2 Historical Analysis
   7.3 [New features...]

8. [Previous Section 7, renumbered]
```

**Cross-Reference Updates**:
- Update all "Section 6.5" → "Section 7.1"
- Update all "Section 6.6" → "Section 7.2"
- Renumber all subsequent sections

---

## Pattern 6: Adding Support for an Additional Standard or Region

### Scenario
The product already supports one standard, regime, or region, and a second must be added alongside it. Common shapes: a second tax jurisdiction, a second accessibility standard, a second regulatory framework, a second data format.

### Approach

1. **Create the coverage section**:
   - Convert the single implicit standard into an explicit list
   - Document how each is identified and selected

2. **Update dependent sections**:
   - Note behaviour that varies by standard
   - Add mapping details where values differ

3. **Create an Annexure**:
   - Detailed per-standard mapping
   - Item-by-item breakdown of what differs

**The trap:** the original document usually never named the first standard, because there was only one. Adding the second means naming both — so the change is larger than "add a section", and every place that silently assumed the first now needs a condition.

### Example

**Change**: Add regional tax rules alongside the existing single-region rules

**Section 3.1 Update**:
```markdown
### 3.1 Tax Region Support

Marketstall supports the following tax regions:

#### 3.1.1 Home Region (default)
- Single standard rate applied to all listings
- Prices displayed inclusive of tax
- See Annexure B for the current rate and its source

#### 3.1.2 Additional Regions
- Per-region rate and registration threshold
- Display convention (inclusive or exclusive) varies by region
- Rates are content, not code — each carries a last-verified date
- See Annexure E for the region-to-rate mapping

#### 3.1.3 Region Selection
Region is derived from the trader's registered address at onboarding and may be
overridden by an administrator. The system:
- Applies the correct rate at the point of sale
- Records which rate was applied on every transaction, so historical invoices
  remain correct after a rate change
- Falls back to the home region only where the trader's region is unsupported
```

---

## Pattern 7: Version Increment Decisions

### When to Use Major Version (X.0)

- New major features added
- Significant restructuring
- Breaking changes to existing features
- Multiple substantial updates

### When to Use Minor Version (X.Y)

- New minor features
- Enhancements to existing features
- Additional content without restructuring

### When to Use Patch Version (X.Y.Z)

- Bug fixes in documentation
- Clarifications
- Typo corrections
- Minor wording improvements

### Revision History Entry Format

```markdown
| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| 3.0 | Jan 2026 | A. Author | Major update: payment integration, provider migration, revised pricing |
| 2.1 | Dec 2025 | A. Author | Added reporting enhancements, performance improvements |
| 2.0 | Nov 2025 | A. Author | Team edition features, admin dashboard |
```

---

## Anti-Patterns to Avoid

### 1. Scattered Updates
**Problem**: Making changes without tracking locations
**Solution**: Always create change-section matrix first

### 2. Orphaned References
**Problem**: Updating content but not cross-references
**Solution**: Search for all mentions before and after

### 3. Inconsistent Terminology
**Problem**: Using different terms for same concept
**Solution**: Maintain terminology glossary, search and replace

### 4. Lost Content
**Problem**: Accidentally deleting content during restructure
**Solution**: Document current state, verify completeness after

### 5. Style Inconsistency
**Problem**: New sections don't match existing style
**Solution**: Copy existing section as template, follow patterns
