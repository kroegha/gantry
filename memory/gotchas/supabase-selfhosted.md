# Gotchas — self-hosted Supabase

*(verified against PG 17.6 / Kong 3.9 / Studio 2026.04, mid-2026)*

- **The reverse proxy must share the Supabase docker network** or the API gateway 504s: `docker network connect <supabase-net> <proxy-container>`.
- **Pin Vector** — newer builds reject older `vector.yml` (removed VRL `to_timestamp!`), and because `db` waits on Vector health, a bad bump blocks the entire stack. 0.28.1 is a known-good pin for the above versions.
- **Kong 3.x** runs non-root and can't write `/home/kong`; declarative config must generate to `/tmp/kong.yml`.
- **PG major upgrades cannot be done by tag bump** — PG won't start on an older cluster; use the documented migration procedure.
- Put Studio behind auth if it is reachable from the internet.
- **If the compose file is managed by a deployment platform's UI, edit it there** — the on-disk file is regenerated on deploy and your changes vanish.
- Advisors lint canon (avoid findings from day one): RLS + policies in the creation migration; `(select auth.uid())` rather than bare `auth.uid()`; fixed `search_path` on SECURITY DEFINER functions; index every FK.
- **New public tables are exposed via PostgREST immediately** — an RLS-less "temporary" table is world-readable the moment it is created.
