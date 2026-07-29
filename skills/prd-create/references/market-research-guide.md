# Market Research Guide

## Overview

This guide details how to conduct market research for new PRD creation, including competitor analysis, technology landscape assessment, and differentiation strategy.

---

## Research Objectives

### Primary Goals

1. **Identify Competitors**: Find similar products and services
2. **Analyze Features**: Compare feature sets across competitors
3. **Understand Positioning**: Determine market positioning options
4. **Identify Gaps**: Find unmet needs in the market
5. **Validate Technology**: Confirm technology choices are appropriate

### Research Questions to Answer

- Who else is solving this problem?
- How do they solve it?
- What do customers like/dislike about existing solutions?
- What are the pricing models in this market?
- What technologies do competitors use?
- Where are the opportunities for differentiation?

---

## Research Methodology

### Phase 1: Competitive Landscape

#### Step 1.1: Direct Competitor Identification

Search for products that:
- Solve the same problem
- Target the same users
- Offer similar features

**Search Strategies**:
- "[product type] software"
- "[industry] [solution type]"
- "alternatives to [known competitor]"
- "[problem] solution for [user type]"

#### Step 1.2: Indirect Competitor Identification

Identify products that:
- Solve related problems
- Could expand into this space
- Offer partial solutions

#### Step 1.3: Competitor Profiling

For each competitor, gather:

| Attribute | Information to Collect |
|-----------|------------------------|
| Company | Name, founded, location, size |
| Product | Name, description, platform |
| Target Market | User types, industries, company sizes |
| Features | Core features, unique features |
| Pricing | Model (subscription, one-time), tiers, pricing |
| Strengths | What they do well |
| Weaknesses | What they do poorly |
| Reviews | Customer sentiment, common complaints |

### Phase 2: Feature Analysis

#### Step 2.1: Feature Inventory

Create comprehensive feature list across all competitors:

```markdown
| Feature | Competitor A | Competitor B | Competitor C | Our Product |
|---------|--------------|--------------|--------------|-------------|
| Feature 1 | ✓ | ✓ | ✗ | ✓ |
| Feature 2 | ✓ | ✗ | ✓ | ✓ |
| Feature 3 | ✗ | ✓ | ✓ | ✓ (better) |
```

#### Step 2.2: Feature Categorization

Group features by:
- **Table Stakes**: Features everyone has (must match)
- **Differentiators**: Features that set products apart
- **Innovations**: New/unique features
- **Gaps**: Features no one has well

#### Step 2.3: Feature Assessment

For our product, determine:
- Which table stakes features to include
- Which differentiators to match or exceed
- What innovations to introduce
- What gaps to fill

### Phase 3: Technology Research

#### Using Context7 MCP Server

**Purpose**: Research libraries, frameworks, and tools

**Workflow**:
1. Resolve library ID:
   ```
   Tool: resolve-library-id
   Query: "[framework name]" or "[library name]"
   ```

2. Query documentation:
   ```
   Tool: query-docs
   Parameters: library ID from step 1, specific topic
   ```

**Research Topics**:
- Framework capabilities
- Best practices
- Performance characteristics
- Integration patterns
- Common pitfalls

#### Using vendor documentation sources

**Purpose**: Research a specific platform or cloud vendor the product depends on

**Workflow** (identical whichever vendor; use their documentation MCP server if one is configured, otherwise their official docs site):
1. Search the vendor's documentation for the service overview
2. Fetch the full page for anything that looks decisive
3. Search again for limits, quotas, and pricing tiers
4. Confirm the API shape with an official code sample

**Research Topics**:
- Service capabilities and hard limits
- Integration and identity options
- Pricing and scaling behaviour at the projected volume
- **Regional availability** — whether the service is offered in the product's target market at all

Record the URL and the date checked for every claim that ends up in the PRD.

### Phase 4: Market Positioning

#### Step 4.1: Positioning Analysis

Determine where competitors position themselves:

| Dimension | Range |
|-----------|-------|
| Price | Budget ← → Premium |
| Complexity | Simple ← → Enterprise |
| Focus | Generalist ← → Specialist |
| Approach | Traditional ← → Innovative |

Plot competitors on positioning map.

#### Step 4.2: Gap Identification

Identify underserved positions:
- Price points with no offerings
- User segments without good solutions
- Feature combinations not available
- Technology approaches not being used

#### Step 4.3: Positioning Strategy

Determine optimal position for new product:
- Avoid head-to-head with strong incumbents
- Target underserved segments
- Leverage unique capabilities
- Build defensible differentiation

---

## Market Research Document Template

```markdown
# Market Research: [Product Name]

**Version**: 1.0
**Date**: [Date]
**Prepared By**: [Author]

## Executive Summary

[2-3 paragraph summary of key findings, competitive landscape, and
recommended positioning strategy]

---

## 1. Market Overview

### 1.1 Market Definition
[Define the market space and boundaries]

### 1.2 Market Size and Growth
[Available data on market size, growth rate, trends]

### 1.3 Target Market Segments

| Segment | Description | Size | Growth | Priority |
|---------|-------------|------|--------|----------|
| [Segment 1] | [Description] | [Size] | [Growth] | High |

### 1.4 Market Trends
- [Trend 1]: [Description and impact]
- [Trend 2]: [Description and impact]
- [Trend 3]: [Description and impact]

---

## 2. Competitive Analysis

### 2.1 Competitive Landscape Overview
[Summary of competitive environment]

### 2.2 Direct Competitors

#### Competitor A: [Name]

| Attribute | Details |
|-----------|---------|
| Website | [URL] |
| Founded | [Year] |
| Headquarters | [Location] |
| Company Size | [Employees] |
| Funding | [Funding info] |
| Target Market | [Description] |

**Product Overview**:
[Description of their product]

**Key Features**:
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Pricing**:
| Tier | Price | Features |
|------|-------|----------|
| [Tier 1] | [Price] | [Features] |

**Strengths**:
- [Strength 1]
- [Strength 2]

**Weaknesses**:
- [Weakness 1]
- [Weakness 2]

**Customer Sentiment**:
[Summary of reviews and feedback]

[Repeat for each direct competitor]

### 2.3 Indirect Competitors

| Competitor | Overlap Area | Threat Level |
|------------|--------------|--------------|
| [Name] | [How they compete] | Low/Medium/High |

### 2.4 Competitive Feature Matrix

| Feature | [Our Product] | Competitor A | Competitor B | Competitor C |
|---------|---------------|--------------|--------------|--------------|
| [Feature 1] | ✓ | ✓ | ✓ | ✗ |
| [Feature 2] | ✓ (unique) | ✗ | ✗ | ✗ |
| [Feature 3] | ✓ | ✓ | ✗ | ✓ |

**Legend**: ✓ = Has feature, ✗ = Missing, ✓ (unique) = Our differentiator

---

## 3. Differentiation Strategy

### 3.1 Unique Value Proposition

[Clear statement of what makes this product different and better]

### 3.2 Key Differentiators

| Differentiator | Description | Competitor Gap |
|----------------|-------------|----------------|
| [Diff 1] | [Description] | [Who doesn't have this] |
| [Diff 2] | [Description] | [Who doesn't have this] |

### 3.3 Competitive Advantages

1. **[Advantage 1]**: [Why this matters and how we achieve it]
2. **[Advantage 2]**: [Why this matters and how we achieve it]
3. **[Advantage 3]**: [Why this matters and how we achieve it]

### 3.4 Positioning Statement

For [target users] who [need/problem], [Product Name] is a [product category]
that [key benefit]. Unlike [competitors], [Product Name] [key differentiator].

---

## 4. Technology Landscape

### 4.1 Technology Trends

| Technology | Relevance | Adoption | Recommendation |
|------------|-----------|----------|----------------|
| [Tech 1] | [How it applies] | [Adoption level] | [Use/Watch/Avoid] |

### 4.2 Competitor Technology Stacks

| Competitor | Frontend | Backend | Database | Cloud |
|------------|----------|---------|----------|-------|
| [Comp A] | [Tech] | [Tech] | [Tech] | [Provider] |

### 4.3 Technology Recommendations

**Recommended Stack**:
- Frontend: [Recommendation with rationale]
- Backend: [Recommendation with rationale]
- Database: [Recommendation with rationale]
- Cloud: [Recommendation with rationale]

**Rationale**:
[Why this stack is recommended for this product]

---

## 5. Recommendations

### 5.1 Market Entry Strategy

[Recommended approach for entering this market]

### 5.2 Feature Prioritization

**Must Have for Launch**:
1. [Feature] - Matches competitor table stakes
2. [Feature] - Key differentiator

**Add in V2**:
1. [Feature] - Competitive parity
2. [Feature] - User-requested

### 5.3 Pricing Strategy

[Recommended pricing approach based on competitive analysis]

### 5.4 Go-to-Market Recommendations

[Initial market entry recommendations]

---

## Appendix A: Research Sources

| Source | Type | Date Accessed |
|--------|------|---------------|
| [URL or Source] | [Type] | [Date] |

## Appendix B: Detailed Competitor Profiles

[Additional competitor details if needed]

## Appendix C: Technology Research Notes

[Detailed notes from MCP server research]
```

---

## Research Best Practices

### 1. Be Systematic
- Create checklist of competitors to research
- Use consistent template for each competitor
- Document all sources

### 2. Be Current
- Note dates of all information gathered
- Focus on recent reviews and updates
- Watch for recent product changes

### 3. Be Objective
- Report competitor strengths honestly
- Don't overstate weaknesses
- Base conclusions on evidence

### 4. Be Actionable
- Every finding should inform a decision
- Connect research to product recommendations
- Prioritize high-impact insights

### 5. Be Thorough
- Check multiple sources for key facts
- Include both positive and negative reviews
- Research technology choices thoroughly

---

## Common Research Mistakes

### Mistake 1: Shallow Competitor Analysis
**Problem**: Only listing competitors without deep analysis
**Solution**: Profile each competitor thoroughly, including reviews

### Mistake 2: Ignoring Indirect Competitors
**Problem**: Only looking at direct competitors
**Solution**: Consider adjacent products and potential entrants

### Mistake 3: Feature-Only Focus
**Problem**: Only comparing features, not positioning
**Solution**: Analyze pricing, marketing, and positioning too

### Mistake 4: Outdated Information
**Problem**: Using old competitor information
**Solution**: Verify recency of all data, check for recent changes

### Mistake 5: Confirmation Bias
**Problem**: Only finding information that supports predetermined conclusions
**Solution**: Actively seek disconfirming evidence
