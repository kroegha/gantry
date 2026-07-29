# PRD Section Templates

## Overview

This reference provides templates for each standard section of a PRD document.

Organisation, edition, and classification lines are **optional**. Where the project supplied no organisation, omit those lines entirely rather than substituting a placeholder — a PRD with no company name on it is correct output.

---

## Cover Page Template

```markdown
# [PRODUCT NAME]
## Product Requirements Document

**Complete Specification**
**[Edition Name — optional, omit if there is only one edition]**

Version [X.X]
[Month Year]

[Organisation — omit this line entirely if none was supplied]

**[CLASSIFICATION — e.g. CONFIDENTIAL; omit if the document is not classified]**
```

---

## Document Control Template

```markdown
## Document Control

| Item | Details |
|------|---------|
| Document Title | [Product Name] Product Requirements Document |
| Version | [X.X] |
| Date | [Month Year] |
| Prepared By | [Author Name] |
| Organisation | [Organisation — omit this row if none] |
| Status | [Draft / Under Review / Approved] |
| Classification | [Confidential / Internal / Public — omit this row if not classified] |
```

---

## Revision History Template

```markdown
## Revision History

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| 1.0 | [Month Year] | [Name] | Initial specification |
```

---

## Section 1: Executive Summary

```markdown
## 1. Executive Summary

### 1.1 Vision Statement

[2-3 sentences describing the long-term vision for the product. What does success look like? What impact will this product have?]

### 1.2 Product Overview

[1-2 paragraphs providing a high-level description of what the product does, who it's for, and why it matters. This should be understandable by non-technical stakeholders.]

### 1.3 Key Differentiators

[Product Name] stands apart from existing solutions through:

- **[Differentiator 1]**: [Brief explanation]
- **[Differentiator 2]**: [Brief explanation]
- **[Differentiator 3]**: [Brief explanation]
```

---

## Section 2: Problem Statement

```markdown
## 2. Problem Statement

### 2.1 Current Challenges

[Describe the problems that exist today. Be specific about pain points.]

**Key Challenges:**
- [Challenge 1]: [Description and impact]
- [Challenge 2]: [Description and impact]
- [Challenge 3]: [Description and impact]

### 2.2 Target Users

#### Primary User: [User Type Name]

| Attribute | Description |
|-----------|-------------|
| Role | [Job title or role] |
| Technical Level | [Novice / Intermediate / Expert] |
| Primary Goal | [What they want to accomplish] |
| Pain Points | [Their specific frustrations] |

#### Secondary User: [User Type Name]

[Repeat table format for additional user types]

### 2.3 User Pain Points

| Pain Point | Current Workaround | Impact |
|------------|-------------------|--------|
| [Pain point 1] | [How users handle it now] | [Business/productivity impact] |
| [Pain point 2] | [How users handle it now] | [Business/productivity impact] |
```

---

## Section 3: Product Scope

```markdown
## 3. Product Scope

### 3.1 In Scope

The following capabilities are included in this product version:

**Core Features:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Supporting Features:**
- [Supporting feature 1]
- [Supporting feature 2]

### 3.2 Out of Scope

The following are explicitly NOT included in this version:

- [Excluded item 1] - [Reason for exclusion]
- [Excluded item 2] - [Reason for exclusion]
- [Excluded item 3] - [Reason for exclusion]

### 3.3 Future Considerations

Items for potential future releases:

| Item | Target Version | Rationale |
|------|---------------|-----------|
| [Future feature 1] | v2.0 | [Why it's deferred] |
| [Future feature 2] | v2.0 | [Why it's deferred] |
```

---

## Section 4: User Stories

```markdown
## 4. User Stories

### 4.1 [User Type 1] Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|---------------------|
| US-001 | As a [user type], I want to [action] so that [benefit] | Must Have | [Criteria for completion] |
| US-002 | As a [user type], I want to [action] so that [benefit] | Must Have | [Criteria for completion] |
| US-003 | As a [user type], I want to [action] so that [benefit] | Should Have | [Criteria for completion] |

### 4.2 [User Type 2] Stories

[Repeat table format for additional user types]
```

---

## Section 5: Functional Requirements

```markdown
## 5. Functional Requirements

### 5.1 [Feature Area 1]

#### 5.1.1 Overview

[Brief description of this feature area]

#### 5.1.2 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-001 | The system shall [specific requirement] | Must Have | [Additional context] |
| FR-002 | The system shall [specific requirement] | Must Have | |
| FR-003 | The system shall [specific requirement] | Should Have | |

#### 5.1.3 Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-001 | [Business rule description] | [Where/how enforced] |

### 5.2 [Feature Area 2]

[Repeat structure for additional feature areas]
```

---

## Section 6: Non-Functional Requirements

```markdown
## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Page Load Time | < 2 seconds | Lighthouse audit |
| API Response Time | < 500ms (95th percentile) | APM monitoring |
| Concurrent Users | Support 1,000 simultaneous | Load testing |

### 6.2 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | [Method - e.g., OAuth 2.0, JWT] |
| Data Encryption | [At rest: AES-256, In transit: TLS 1.3] |
| Access Control | [RBAC with defined roles] |
| Audit Logging | [All sensitive operations logged] |

### 6.3 Scalability

- **Horizontal Scaling**: [Approach]
- **Data Partitioning**: [Strategy]
- **Caching Strategy**: [Approach]

### 6.4 Usability

- Target audience technical level: [Level]
- Maximum clicks to complete core tasks: [Number]
- Mobile responsiveness: [Required/Not Required]

### 6.5 Accessibility

- WCAG compliance level: [2.1 AA]
- Screen reader compatibility: Required
- Keyboard navigation: Required
```

---

## Section 7: Technical Architecture

```markdown
## 7. Technical Architecture

### 7.1 System Overview

[High-level description of the system architecture. Include diagram reference if applicable.]

### 7.2 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | [Technology] | [Why chosen] |
| Backend | [Technology] | [Why chosen] |
| Database | [Technology] | [Why chosen] |
| Hosting | [Platform] | [Why chosen] |
| CDN | [Service] | [Why chosen] |

### 7.3 Integration Points

| External System | Integration Type | Purpose |
|-----------------|------------------|---------|
| [System 1] | [API/Webhook/etc.] | [Purpose] |
| [System 2] | [API/Webhook/etc.] | [Purpose] |

### 7.4 Data Architecture

#### 7.4.1 Key Entities

| Entity | Description | Key Relationships |
|--------|-------------|-------------------|
| [Entity 1] | [Description] | [Relationships] |
| [Entity 2] | [Description] | [Relationships] |

#### 7.4.2 Data Flow

[Description of how data flows through the system]

See Annexure [X] for detailed database schema.
```

---

## Section 8: User Interface

```markdown
## 8. User Interface

### 8.1 UI Principles

- **Principle 1**: [Description]
- **Principle 2**: [Description]
- **Principle 3**: [Description]

### 8.2 Key Screens

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| [Screen 1] | [Purpose] | [Main UI elements] |
| [Screen 2] | [Purpose] | [Main UI elements] |

### 8.3 User Flows

#### 8.3.1 [Flow Name]

1. User [action]
2. System [response]
3. User [action]
4. System [response]
5. [Completion/outcome]
```

---

## Section 9: Implementation Roadmap

```markdown
## 9. Implementation Roadmap

### 9.1 Phase 1: MVP

**Target Date**: [Date]
**Goal**: [Primary objective]

| Feature | Priority | Effort |
|---------|----------|--------|
| [Feature 1] | Must Have | [T-shirt size] |
| [Feature 2] | Must Have | [T-shirt size] |

### 9.2 Phase 2: Enhancement

**Target Date**: [Date]
**Goal**: [Primary objective]

| Feature | Priority | Effort |
|---------|----------|--------|
| [Feature 3] | Should Have | [T-shirt size] |
| [Feature 4] | Should Have | [T-shirt size] |

### 9.3 Phase 3: Scale

**Target Date**: [Date]
**Goal**: [Primary objective]

[Future features and enhancements]
```

---

## Section 10: Success Metrics

```markdown
## 10. Success Metrics

### 10.1 Key Performance Indicators

| KPI | Target | Measurement | Frequency |
|-----|--------|-------------|-----------|
| [KPI 1] | [Target value] | [How measured] | [Daily/Weekly/Monthly] |
| [KPI 2] | [Target value] | [How measured] | [Daily/Weekly/Monthly] |

### 10.2 Success Criteria

The product will be considered successful when:

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
```

---

## Section 11: Risks and Mitigations

```markdown
## 11. Risks and Mitigations

### 11.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Medium | High | [Mitigation strategy] |
| [Risk 2] | Low | High | [Mitigation strategy] |

### 11.2 Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Medium | High | [Mitigation strategy] |

### 11.3 Mitigation Strategies

**[Risk Name]**:
- Primary mitigation: [Strategy]
- Fallback plan: [Alternative]
```

---

## Section 12: Appendices

```markdown
## 12. Appendices

### A. Glossary

| Term | Definition |
|------|------------|
| [Term 1] | [Definition] |
| [Term 2] | [Definition] |

### B. References

- [Reference 1]: [URL or description]
- [Reference 2]: [URL or description]
```

---

## Annexure Template

```markdown
## ANNEXURE [X]: [Title]

### [X].1 Overview

[Purpose of this annexure and what it contains]

### [X].2 [First Topic]

[Detailed content]

### [X].3 [Second Topic]

[Detailed content]

### [X].4 References

This annexure supports the following PRD sections:
- Section [N.N]: [Section name]
- Section [M.M]: [Section name]
```
