# Google Sheets Access

Purpose: one repeatable setup for letting Codex read and write Google Sheets for a project without storing raw credentials in the repo.

## Principle

Use the same service account pattern across projects:

- share the target Google Sheet with the service account as `Editor`
- keep `GOOGLE_SERVICE_ACCOUNT_EMAIL` in worker vars
- keep `GOOGLE_SERVICE_ACCOUNT_KEY` in the Cloudflare Worker secret store
- keep any local JSON key outside the repo
- keep any temporary key or token in a local user env var or non-committed `.env` before pushing it to its final store
- use a small local admin script per project for direct sheet work when needed

## Standard Service Account

- Service account email: `pagespeed-service-account@pagespeed-api-1768888396629.iam.gserviceaccount.com`

## Standard Stores

### Cloudflare Worker

- Var: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Secret: `GOOGLE_SERVICE_ACCOUNT_KEY`

### Local Machine

- Canonical local key source in this workspace:
  - `C:\Users\micro\Documents\Codex CLI websites\Websites\managed-sitebase-V2\worker\secretgogle\service-account.json`
- Reuse that file for any new project in this workspace
- If a project needs its own copy, copy from the canonical source above
- Preferred pattern: point project scripts to that local JSON path with `SERVICE_ACCOUNT_PATH`

## Per-Project Checklist

1. Create or receive the Google Sheet
2. Share it with the service account as `Editor`
3. Record the sheet id in the project docs
4. Confirm the shared worker or project worker already has:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_KEY`
5. If you are in this workspace and the canonical local key exists, use it first instead of asking for a new private key
6. Add a local sheet admin script if the project needs direct sheet maintenance
7. Verify access with a simple read command

## What Belongs Where

### Shared Across Templates

- this document
- the service-account pattern
- the naming of the worker var and secret
- the rule that raw JSON keys never go in git

### Per Project

- `PROJECT_KEYS_REGISTER.md`
- `PROJECT_SECRETS_PLAYBOOK.md`
- sheet id
- local JSON path metadata
- verification status
- any project-specific admin script commands

## Recommended Workflow For New Projects

For every new project:

1. Create `PROJECT_KEYS_REGISTER.md`
2. Create `PROJECT_SECRETS_PLAYBOOK.md`
3. Copy in `GOOGLE_SHEETS_ACCESS.md`
4. Add or reuse the project sheet admin script
5. Verify access immediately

This keeps the long-term model clean:

- shared process in one doc
- project status in project docs
- no secret leakage
- fast onboarding for future projects
- no raw secret sharing through chat when CLI handoff is possible

