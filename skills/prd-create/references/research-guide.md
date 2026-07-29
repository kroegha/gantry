# Research Guide — documentation sources for PRD creation

How to research technical claims while creating a PRD. Every source here is optional; what is **not** optional is that a technical claim in a PRD has a source behind it.

---

## Principle

A PRD asserts things about the world: that an API exists, that a framework supports a pattern, that a service is available in a market, that a tier costs what it costs. **Training-data recall is not a source.** Verify before writing, cite what you verified, and date it.

---

## Context7 MCP Server (library and framework documentation)

### Purpose
Up-to-date documentation for libraries, frameworks, and tools — usually the fastest correct answer for "does X support Y".

### Available Tools

#### resolve-library-id
Get the library ID needed to query documentation.

**When to Use**:
- Before querying any library documentation
- When you know the library name but need its Context7 ID

**Parameters**:
- `libraryName`: Name of the library (e.g., "react", "nextjs", "fastapi")

**Example Usage**:
```
Tool: resolve-library-id
Query: "react"
```

**Response**: Returns library ID and available topics

#### query-docs
Query documentation for a specific library.

**When to Use**:
- After getting library ID from resolve-library-id
- To get specific information about a framework/library

**Parameters**:
- `libraryId`: ID from resolve-library-id
- `topic`: Specific topic to query (optional)
- `query`: Natural language question (optional)

**Example Usage**:
```
Tool: query-docs
Parameters:
  libraryId: "/react/latest"
  topic: "hooks"
```

### Research Patterns

#### Pattern 1: Framework Overview
```
1. resolve-library-id: "[framework name]"
2. query-docs: libraryId, topic: "getting started"
3. query-docs: libraryId, topic: "best practices"
```

#### Pattern 2: Specific Feature Research
```
1. resolve-library-id: "[library name]"
2. query-docs: libraryId, query: "how to implement [feature]"
```

#### Pattern 3: Integration Research
```
1. resolve-library-id: "[library A]"
2. query-docs: libraryId, query: "integrate with [library B]"
```

### Common Libraries to Research

| Category | Libraries |
|----------|-----------|
| Frontend | react, vue, angular, svelte, nextjs, nuxt |
| Backend | express, fastapi, django, flask, nestjs, rails, laravel |
| Database | prisma, typeorm, drizzle, mongoose, sqlalchemy |
| Auth | auth0, clerk, nextauth, supabase-auth, keycloak |
| State | redux, zustand, jotai, tanstack-query |
| UI | tailwindcss, shadcn, mui, chakra |

---

## Vendor documentation servers (optional, if configured)

Some cloud and platform vendors publish their own documentation MCP servers. If one is configured for the vendor the product actually depends on, prefer it over general web search — it returns current, official content rather than blog posts.

The pattern is the same regardless of vendor:

```
1. <vendor>_docs_search:  "[service name] overview"       → find the right page
2. <vendor>_docs_fetch:   [page URL from step 1]          → read it in full
3. <vendor>_docs_search:  "[service name] limits/quotas"  → find the constraints
4. <vendor>_code_search:  "[service name] [use case]"     → confirm the API shape
```

**Do not let the available tooling choose the architecture.** If a documentation server exists for one vendor and not another, that is a fact about your MCP configuration, not evidence that the vendor is a better fit. Stack selection happens at S2 against the scorecard, not here.

---

## Web research (everything else)

For anything with no documentation server — pricing, market availability, regulatory facts, competitor claims, vendor viability — use web search and **cite the primary source**: the vendor's own pricing page, the regulator's own site, the registry's own documentation. Note the date you checked; these facts decay.

See `memory/gotchas/jurisdiction.md` in the Gantry repo for the categories of fact that are market-dependent and must never be assumed from another market's norms.

---

## Research Workflow

### Step 1: Identify Research Needs

From the requirements interview, identify:
- Technologies the user named
- Technologies the requirements imply
- External services and integrations
- Claims about cost, availability, or compliance

### Step 2: Create Research Plan

```markdown
## Research Plan

### Technology Research
| Topic | Source | Priority |
|-------|--------|----------|
| [Topic 1] | Context7 | High |
| [Topic 2] | Vendor docs / web | High |

### Questions to Answer
1. [Question about capability]
2. [Question about integration]
3. [Question about cost or availability]
```

### Step 3: Execute Research

For each topic:
1. Start with search/overview
2. Drill into specifics
3. Find code samples or API references
4. Document findings **with URLs**

### Step 4: Synthesize Findings

Compile research into:
- Technology recommendations
- Architecture decisions
- Implementation notes
- Risk assessments

---

## Research Documentation Template

```markdown
## Technology Research: [Topic]

### Overview
[Summary of what was researched]

### Key Findings

#### Capabilities
- [Capability 1]

#### Limitations
- [Limitation 1]

#### Best Practices
- [Practice 1]

### Recommendations
[How to apply this to the product]

### Sources
- [URL 1] (checked YYYY-MM-DD)
- [URL 2] (checked YYYY-MM-DD)
```

---

## Tips for Effective Research

### 1. Be Specific
- Use specific service names, not general terms
- Include version numbers when relevant
- Specify programming language for samples

### 2. Verify Currency
- Check documentation dates
- Look for "latest" or current version docs
- Be aware of preview vs GA features

### 3. Cross-Reference
- Compare multiple documentation sources
- Verify with code samples
- Check for updates or deprecations

### 4. Document Everything
- Save URLs for all sources, with the date checked
- Note any assumptions made
- Record any gaps in documentation

### 5. Stay Focused
- Research what's needed for the PRD
- Avoid going too deep too early
- Flag topics for later detailed research
