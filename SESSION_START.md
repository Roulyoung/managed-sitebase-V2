# Session Start

Read this first before making changes.

Current project: `managed-sitebase-V2`

## Required Reading

1. `AGENTS.md`
2. `ENGINEERING_ARCHITECTURE_RULES.md`
3. `ARCHITECTURE_MIGRATION_PLAYBOOK.md` when an existing project is being migrated
4. `DOCUMENTATION_FAILSAFE.md`
5. `WORKER_PLATFORM_PLAN.md`
6. `ACTIVE_WORKER_STATUS.md` if it exists
7. `C:\Users\micro\Documents\Codex CLI websites\Websites\WORKER_MIGRATION_MATRIX.md`

6. `PROJECT_CONTEXT.md` to confirm you are in the correct repo before editing

## Shared Worker Rule

- Treat the Cloudflare Worker as a shared multi-site platform.
- Assume worker, deploy, checkout, Sheets, Stripe, admin, or backend-routing changes can affect other projects.
- Do not break backward compatibility for older client sites.
- Do not hardcode client-specific `workers.dev` URLs or project-only behavior into shared code or templates.

## Change Guardrails

- Prefer config, `SITES_JSON`, `site_key`, `schema_version`, hostname mapping, and env vars.
- Keep separate datasets separate when cache or refresh behavior differs.
- If a change could affect another project, verify the sibling impact before editing.
- If an exception is unavoidable, document the exception and rollback path before shipping.
- Run `WORKER_SAFETY_PRECHECK.md` before touching worker, deploy, Stripe, Sheets, or checkout state.
- Use `npm run preflight` or `scripts/preflight.ps1` for a quick context check before editing.

## First Prompt

Use this when starting a session:

`Read SESSION_START.md and all linked docs first. Treat the Worker as shared across multiple sites, preserve backward compatibility, and do not make any change that could break another project using the same worker.`
