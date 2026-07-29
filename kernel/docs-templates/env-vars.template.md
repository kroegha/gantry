<!-- gen: skeleton at S0; every var added in the same commit as its code; CI checks
     parity with .env.example. Never contains values. -->
# {{PROJECT_NAME}} — Environment Variables Reference

> Source of truth for every variable. Parity with `.env.example` is CI-enforced.
> Secret values live only in {{SECRETS_LOCATIONS}}; never in this file.

| Variable | Purpose | Secret? | Client-exposed? | Where set | Where obtained |
|---|---|---|---|---|---|
| {{EXAMPLE_ROW}} | | | | | |

## Notes
- {{PUBLIC_PREFIX_RULE}} <!-- gen: the framework's convention for client-exposed vars — anything matching it is public, treat accordingly -->
- Adding a var: code + `.env.example` + this table in one commit.
