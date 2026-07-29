# Requirements Interview Question Bank

## Overview

This reference provides a comprehensive set of questions for gathering product requirements. Questions are organized by category and priority.

---

## Category 1: Product Vision

### Essential Questions

1. **Product Name**
   - What is the product called?
   - Is there a tagline or short description?

2. **Core Problem**
   - What specific problem does this product solve?
   - Who experiences this problem?
   - How are people currently solving this problem?

3. **Value Proposition**
   - What is the primary benefit users will get?
   - Why would someone choose this over alternatives?
   - What makes this product unique?

4. **Vision Statement**
   - Where do you see this product in 1 year? 3 years?
   - What is the ultimate goal for this product?

### Follow-up Questions

- Can you describe a typical scenario where someone would use this product?
- What would success look like for a user of this product?
- What inspired the idea for this product?

---

## Category 2: Target Users

### Essential Questions

1. **Primary Users**
   - Who is the main target user?
   - What is their role or job title?
   - What are their technical skills?

2. **User Demographics**
   - What age range are target users?
   - What industry or sector?
   - Geographic considerations?

3. **User Needs**
   - What are the top 3 pain points for these users?
   - What are they trying to accomplish?
   - What frustrates them about current solutions?

4. **Secondary Users**
   - Are there other user types to consider?
   - How do different users interact with each other through the product?

### Follow-up Questions

- Can you create a brief persona for your ideal user?
- How tech-savvy are your target users?
- What devices do they primarily use?

---

## Category 3: Features and Functionality

### Essential Questions

1. **Must-Have Features (MVP)**
   - What features are absolutely essential for launch?
   - What is the minimum viable product?
   - Which features provide the core value?

2. **Should-Have Features**
   - What features would significantly improve the product?
   - What would users expect but could launch without?

3. **Nice-to-Have Features**
   - What features are on the wishlist for future?
   - What would delight users if included?

4. **Out of Scope**
   - What features are explicitly NOT part of this product?
   - What should we definitely avoid?

### Feature Deep Dive

For each major feature, ask:
- What is the user goal for this feature?
- What inputs does it need?
- What outputs does it produce?
- What happens on success? On failure?
- Are there edge cases to consider?

### Follow-up Questions

- Can you prioritize these features from 1-10?
- What would you cut if you had to reduce scope by 50%?
- What features do competitors have that you want to match or beat?

---

## Category 4: Technical Requirements

### Platform and Access

1. **Platforms**
   - Web application?
   - Mobile app (iOS, Android)?
   - Desktop application?
   - API/service only?

2. **Browsers/Devices**
   - Which browsers must be supported?
   - Minimum device specifications?
   - Offline capabilities needed?

3. **Access Methods**
   - How do users access the product?
   - Single sign-on requirements?
   - Multi-tenancy considerations?

### Technology Preferences

1. **Preferred Stack**
   - Are there required technologies?
   - Are there technologies to avoid?
   - Existing infrastructure to integrate with?

2. **Frameworks/Libraries**
   - Preferred frontend framework (React, Vue, Angular)?
   - Backend framework preferences?
   - Database preferences?

3. **Hosting/Infrastructure**
   - Cloud provider preference (Azure, AWS, GCP)?
   - On-premises requirements?
   - Hybrid considerations?

### Performance Requirements

1. **Response Times**
   - Acceptable page load time?
   - API response time requirements?
   - Real-time requirements?

2. **Scale**
   - Expected number of users (initial, 1 year, 3 years)?
   - Concurrent user expectations?
   - Data volume expectations?

3. **Availability**
   - Uptime requirements (99.9%, 99.99%)?
   - Maintenance window acceptable?
   - Disaster recovery needs?

---

## Category 5: Integration Requirements

### Third-Party Services

1. **Required Integrations**
   - What external services must this integrate with?
   - What data needs to flow between systems?
   - Real-time or batch integration?

2. **APIs**
   - Are there APIs to consume?
   - Do you need to provide an API?
   - API documentation available?

3. **Data Sources**
   - Where does data come from?
   - What format is the data in?
   - How frequently is data updated?

### Existing Ecosystem

Ask these only where the answers exist — a greenfield consumer product usually has none.

1. **Identity**
   - Is there an identity provider users already have (corporate SSO, social, existing app account)?
   - Single sign-on required, or is a standalone account acceptable?
   - Directory/group membership needed for authorisation?

2. **Systems of record**
   - Which internal systems hold data this product needs (CRM, ERP, HR, finance, ticketing)?
   - Which direction does data flow, and who owns each field?
   - Is there an integration platform already in use?

3. **Collaboration and workflow**
   - Does this need to appear inside a tool people already live in (chat, email, spreadsheets, document storage)?
   - Are there existing automations or reporting surfaces it must feed?

4. **Constraints from the estate**
   - Mandated cloud provider or hosting region?
   - Approved-vendor or procurement restrictions?
   - Existing licences that make one option effectively free?

---

## Category 6: Security and Compliance

### Authentication/Authorization

1. **User Authentication**
   - How do users log in?
   - SSO requirements?
   - Multi-factor authentication?

2. **Authorization**
   - What user roles exist?
   - What permissions per role?
   - How is access controlled?

### Data Security

1. **Data Classification**
   - What sensitive data is handled?
   - PII considerations?
   - Payment data?

2. **Encryption**
   - Data at rest encryption?
   - Data in transit encryption?
   - Key management requirements?

### Compliance

1. **Regulatory Requirements**
   - GDPR compliance needed?
   - HIPAA compliance?
   - SOC 2 compliance?
   - Industry-specific regulations?

2. **Data Residency**
   - Where must data be stored?
   - Cross-border data transfer restrictions?

---

## Category 7: Business Context

### Market and Competition

1. **Target Market**
   - B2B or B2C?
   - Industry vertical?
   - Geographic market?

2. **Competitive Landscape**
   - Who are the main competitors?
   - What do they do well?
   - What do they do poorly?

3. **Differentiation**
   - How is this product different?
   - What is the unique selling point?

### Business Model

1. **Revenue Model**
   - How will this generate revenue?
   - Subscription, one-time, freemium?
   - Pricing considerations?

2. **Success Metrics**
   - How will success be measured?
   - Key performance indicators?
   - Target metrics for launch?

### Timeline

1. **Milestones**
   - When is MVP needed?
   - Key dates or deadlines?
   - External dependencies on timeline?

2. **Phases**
   - How should development be phased?
   - What's in each phase?

---

## Category 8: User Experience

### Design Requirements

1. **Brand/Style**
   - Existing brand guidelines?
   - Design system in place?
   - Color/typography preferences?

2. **UI Patterns**
   - Reference apps to emulate?
   - UI patterns to use or avoid?
   - Accessibility requirements (WCAG level)?

### User Flows

1. **Key Journeys**
   - What are the main user journeys?
   - What's the happy path?
   - What are common error scenarios?

2. **Onboarding**
   - How do users get started?
   - What's the first-time user experience?
   - Tutorial or guided setup needed?

---

## Interview Techniques

### Opening the Interview

```
"I'd like to understand your product vision so I can create a comprehensive
PRD. I'll ask questions in several categories. Feel free to provide as much
or as little detail as you have at this stage - we can always refine later."
```

### Handling Uncertainty

When user is unsure:
- "That's fine - let me make a note to research options for that"
- "What would your preference be if you had to choose right now?"
- "Would you like me to provide recommendations based on best practices?"

### Clarifying Vague Requirements

- "Can you give me a specific example of that?"
- "How would you measure success for that feature?"
- "What would happen if we didn't include that?"

### Closing the Interview

```
"Let me summarize what I've captured:
[Summary of key points]

Is there anything I've missed or misunderstood?
Any other requirements you'd like to add before I begin the research phase?"
```

---

## Question Priority Matrix

| Category | For MVP | For Full PRD |
|----------|---------|--------------|
| Product Vision | Essential | Essential |
| Target Users | Essential | Essential |
| MVP Features | Essential | Essential |
| Full Features | Optional | Essential |
| Technical Platform | Essential | Essential |
| Technical Stack | Optional | Essential |
| Integrations | If applicable | Essential |
| Security | Essential | Essential |
| Compliance | If applicable | Essential |
| Business Context | Optional | Essential |
| Timeline | Essential | Essential |
| UX Requirements | Optional | Essential |

---

## Sample Interview Script

### Quick Interview (15 min)

1. What's the product name and one-sentence description?
2. What problem does it solve and for whom?
3. What are the 3-5 must-have features?
4. What platform (web/mobile/desktop)?
5. Any required integrations?
6. When do you need this?

### Standard Interview (30-45 min)

1. Product vision and problem statement (5 min)
2. Target users and personas (5 min)
3. Features - MVP and full scope (10 min)
4. Technical requirements (5 min)
5. Integrations (5 min)
6. Security and compliance (5 min)
7. Timeline and priorities (5 min)

### Comprehensive Interview (60+ min)

All categories with follow-up questions and feature deep dives.
