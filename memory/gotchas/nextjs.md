# Gotchas — Next.js

- **Caching is opt-in from Next 16** (flipped from opt-out); data-fetching patterns from Next 15-era docs/training data are wrong. Verify against current docs before writing fetch logic. *(verified Next 16.2, 2026-07)*
- **Turbopack is the default bundler** for dev and build from 16; webpack-specific config advice is stale. *(verified 16.2, 2026-07)*
- Agent training-data lag is systematic here: always check the current major version and upgrade guide at bootstrap, and pin what you verified in PLANNING.md.
- next-intl remains the App Router i18n choice; `[locale]` segment routing from day 1 is cheap, retrofitting is not. *(2026-07)*
