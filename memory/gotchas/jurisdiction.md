# Gotchas — jurisdiction and market assumptions

The single most reliable source of wrong PRDs: requirements written from one market's assumptions, built for another. None of the facts below are supplied here, because they change and they differ per country. What is supplied is the **checklist of things that are jurisdiction-dependent** and must be verified per project at S1, with sources and a last-verified date.

## Verify per project, never inherit

| Area | What varies | Failure if assumed |
|---|---|---|
| **Payment rails** | Which processors accept businesses *registered in* the target country — distinct from which accept *customers* there. Local rails (instant EFT, mobile money, bank transfer schemes) often outrank cards. | Architecture built on a processor that will not onboard the entity. Discovered at integration, not at planning — the most expensive class of PRD error. |
| **Company/entity registries** | Whether an official API exists, its auth model, its fees, and whether the public search is login-gated. | Agents "implementing" a registry integration from assumptions, or scraping a gated service — a compliance defect, not a workaround. |
| **Tax** | VAT/GST/sales-tax rate and registration threshold; corporate rate; digital-services rules; whether prices are quoted inclusive or exclusive. | Wrong arithmetic through every pricing table and invoice in the product. |
| **Data protection** | Which regime applies (and whether more than one does), lawful basis, consent mechanics, deletion/portability rights, breach-notification windows, cross-border transfer and residency rules. | Retrofitting consent and deletion after the schema is set. |
| **Sector regulation** | Licensing for finance, health, education, gambling, legal advice; what claims may be made in marketing. | Shipping a product that cannot legally operate, or a landing page that cannot legally say what it says. |
| **Government bodies** | Agencies merge, rename, and are replaced; their programmes and URLs move with them. | Confident references to a body that no longer exists under that name. |
| **Consumer law** | Cooling-off periods, refund obligations, subscription cancellation rules, mandatory disclosures. | Terms and refund logic that are unenforceable or unlawful. |

## Rules

1. **The PRD must declare its target market(s)** — captured at S-PRD. "Global" is not a market; it is a claim to verify against every jurisdiction it implies.
2. **Regulatory and fee facts are content, never code.** Rates, thresholds, and registry fees live in a config or content store with a `last_verified` date, so they can be corrected without a deploy.
3. **Cite a primary source** for every such fact — the regulator, the registry, the processor's own documentation. A blog post is not a source.
4. **Re-verify at S1 of every project**, even facts carried in this memory store. Anything here that a project proves stale gets corrected or deleted at harvest.
5. **Multi-market products verify per market**, not once. The strictest applicable rule usually sets the design.
