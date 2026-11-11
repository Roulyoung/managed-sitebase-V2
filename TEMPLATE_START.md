# Template Start

Read SESSION_START.md first, then use this checklist immediately after cloning or starting a new client project.

## Required Project Docs

Create or update these files first:

1. `PROJECT_KEYS_REGISTER.md`
2. `PROJECT_SECRETS_PLAYBOOK.md`
3. `GOOGLE_SHEETS_ACCESS.md`
4. `STRIPE_PROJECTS_WORKFLOW.md` when Stripe is used
5. `STRIPE_MODE_SWITCHING.md` when Stripe test/live switching is used
6. `STRIPE_CHECKOUT_TESTING.md` when Stripe Checkout is used
7. `FEATURE_UPDATE_LOG.md` for reusable feature history and comparison
8. `FEATURE_AUDIT_PLAYBOOK.md` when auditing existing projects
9. `ENGINEERING_ARCHITECTURE_RULES.md`
10. `ARCHITECTURE_MIGRATION_PLAYBOOK.md` when adapting an existing project

## Purpose Of Each File

- `PROJECT_KEYS_REGISTER.md`
  Track where project secrets, sheet ids, domains, repos, and deployment settings live.
  Do not store raw secrets in it.

- `PROJECT_SECRETS_PLAYBOOK.md`
  Keep the project-specific storage and rotation process clear.
  This is the operational reference for secrets and verification.

- `GOOGLE_SHEETS_ACCESS.md`
  Reuse the standard Google Sheets access model:
  shared service account, worker secret, local admin script, no JSON in git.

## First Setup Pass

If the project starts from a Lovable export, read `LOVABLE_EXPORT_TO_CLOUDFLARE_PLAYBOOK.md` before editing routing or deploy config.

1. Set project name, domain, repo, and sheet id
2. Confirm worker choice:
   - shared worker
   - dedicated worker
3. Create one temporary bootstrap Cloudflare token:
   - required scope: `API Tokens Write`
4. If using Codex automation, paste the bootstrap token once in the active chat.
5. Use the bootstrap token once to mint scoped Cloudflare token classes:
   - zone
   - pages
   - shared-worker
   - worker (only when a site-specific worker token is required)
   - images (if Cloudflare Images is used)
6. Revoke the bootstrap token immediately after class token creation and verification.
7. Put raw secrets in named local env vars or a non-committed `.env`, not in chat or markdown.
8. Use `scripts/use-cloudflare-context.ps1` before any `wrangler` or Cloudflare CLI action
9. Confirm GitHub repo variables and secrets
10. Confirm Cloudflare Pages project
11. Confirm Google Sheet access
12. If `worker/secretgogle/service-account.json` already exists in this workspace, reuse it before asking for a new Google private key
13. Add a local sheet admin script if the project uses Sheets operationally
14. If Stripe is used, initialize Stripe Projects and follow `STRIPE_PROJECTS_WORKFLOW.md`
15. Run one verification command for each critical integration
16. Check the template feature log and record any missing or outdated features for this project

## Minimum Verification

- Site build works
- Worker endpoint responds
- Google Sheet read works
- Stripe config path is documented
- Domain/canonical is documented
- Live share URL is documented in full `https://` form
- `www`/apex/pages.dev redirect checks are completed using `CLIENT_ONBOARDING_DNS_AND_GO_LIVE_PLAYBOOK.md` protocol

## Rule

If a new project starts without these docs, add them before the project grows.
That prevents missing secrets, unclear ownership, and repeated setup mistakes.
Always move secrets from local env vars into GitHub or Cloudflare by CLI instead of pasting raw values into chat.
Do not use one permanent global `CLOUDFLARE_API_TOKEN` for every repo; activate the right token context per task.
Mandatory onboarding default: one temporary bootstrap token -> mint scoped class tokens -> revoke bootstrap token immediately.
Allowed exception: bootstrap token may be pasted once in chat only for Codex onboarding automation, then must be revoked immediately.

## Share Rule

When sending the website to a client or lead for the first time:

- always send the full `https://` URL
- example: `https://clientdomain.com`

Do not assume `clientdomain.com` will be clickable everywhere.
## Admin Auth Rule

For shared-worker admin access:

- use a site-specific worker secret like ADMIN_PASSWORD_<SITEKEY>
- point the admin frontend to the worker API, not a relative site route
- include the project site key on admin requests
