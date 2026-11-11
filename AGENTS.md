# Agent Instructions

Read `SESSION_START.md` first.
Then read `ENGINEERING_ARCHITECTURE_RULES.md` and follow it for every change.
Read `ARCHITECTURE_MIGRATION_PLAYBOOK.md` when converting an existing project.
Then read `DOCUMENTATION_FAILSAFE.md` when the task touches checkout, worker logic, deploys, Sheets, Stripe, shared config, or sibling-project fallout.
Read `WORKER_PLATFORM_PLAN.md` before making any worker, deploy, env, or backend-routing change.
If present in the project root, also read `ACTIVE_WORKER_STATUS.md`.
Use the shared migration tracker at `C:\Users\micro\Documents\Codex CLI websites\Websites\WORKER_MIGRATION_MATRIX.md` when deciding whether a repo is already aligned or still in migration.

## Mandatory Worker Policy

- Treat the Cloudflare Worker as a shared multi-site platform.
- Preserve backward compatibility for older client sites.
- Do not create or normalize project-specific Worker services by default.
- Do not hardcode client-specific `workers.dev` URLs in reusable code or templates.
- Prefer `SITES_JSON`, `site_key`, `schema_version`, hostname mapping, and env vars.
- Keep `products` cache and `pricelist` / catalog cache as separate datasets when refresh behavior differs.
- Do not merge daily pricelist snapshot logic into the live shop product cache flow.

## Safety Check Rule

- Before worker, deploy, Stripe, Sheets, or checkout edits, run `WORKER_SAFETY_PRECHECK.md`.
- Before release, capture the release state in `WORKER_RELEASE_MANIFEST_TEMPLATE.md`.
- If the current folder or repo does not match `PROJECT_CONTEXT.md`, stop and verify before editing.
