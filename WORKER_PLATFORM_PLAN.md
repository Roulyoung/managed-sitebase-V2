# Worker Platform Plan

This file is mandatory policy for every project in `C:\Users\micro\Documents\Codex CLI websites\Websites`.

## Core Rule

All client websites must use one shared Cloudflare Worker platform design.

That means:

- one shared worker core codebase
- one shared deployment standard
- site-specific behavior only through config, adapters, env vars, and schema versioning

Do not treat the worker as a client-specific backend unless there is a written exception approved in project notes.

## Mandatory Deployment Standard

The default standard is:

- one shared Worker service for all active client sites
- site routing by `site` key, hostname, and `SITES_JSON`
- one backward-compatible worker core
- one compatibility test matrix across active sites

Avoid per-client Worker service sprawl such as:

- `stripe-webhook-highcraft-local`
- `clientname-worker`
- ad hoc copies of the same worker under different names

If a separate Worker service is temporarily required, it must still:

- run the same shared worker core
- stay config-driven
- be recorded as a temporary exception
- include a migration path back to the shared deployment standard

## Backward Compatibility Rules

- Never remove or rename fields older sites still use.
- Never assume every site has the latest sheet tabs or schema.
- Add fields and tabs instead of replacing existing ones.
- Use schema adapters when structure changes.
- Old clients must keep working on the latest worker core unless a migration is explicitly planned and documented.

## Configuration Rules

- Use `SITES_JSON` as the worker site registry.
- Every site must have a stable `site_key`.
- Every site must declare a `schema_version`.
- Hostname mapping must be explicit.
- Frontends must use env-driven worker URLs.
- Do not hardcode a client-specific `workers.dev` URL as the default in reusable code.

## Cache And Refresh Rules

- Keep separate datasets in separate cache flows when their refresh behavior differs.
- `products` and public `pricelist` / catalog data must not share one cache blob by default.
- `products` may keep short TTL caching and admin-triggered refresh.
- Public `pricelist` data may use daily snapshot refresh if business requirements allow stale data.
- If a worker cron is used for multiple jobs, do not accidentally slow critical jobs like order sync when adding low-frequency snapshot refresh.

## Required AI And Human Guardrails

Every active project root in the `Websites` folder must contain:

- this `WORKER_PLATFORM_PLAN.md`
- an `AGENTS.md` that points contributors and AI agents back to this policy

When making worker-related changes, always ask:

1. Is this a shared worker-core change?
2. Is this config-only for one site?
3. Does this change the schema?
4. Will older sites continue to work unchanged?

If question 4 is not clearly yes, stop and redesign first.

## Current Direction

Applies to current and near-term sites including:

- `sitedesk.co`
- `Highcraft-store-fresh`
- `roadherorentals.com`
- template and staging clones that may become production baselines

The target end state is:

- shared worker service
- shared worker core repo logic
- per-site config via `SITES_JSON`
- per-site frontend env vars
- one compatibility checklist used before deploys

## Change Management

Before shipping worker changes:

1. update the shared worker core without breaking older contracts
2. verify active sites still resolve correctly by `site` or hostname
3. run compatibility checks for active sites
4. update notes if a temporary exception exists

Do not introduce a new client-specific Worker deployment path by default.
