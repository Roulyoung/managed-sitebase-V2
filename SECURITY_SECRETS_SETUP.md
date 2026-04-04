# Security Secrets Setup (Multi-Client)

Use this for every new client clone. Goal: fast setup, no secret leakage.

## Core Rule

Never store raw tokens/keys in repo files, copied project folders, or shared docs.

Allowed:
- local secret manager (1Password/Bitwarden)
- OS-level secure env vars
- GitHub/Cloudflare/Worker secret stores

Not allowed:
- plaintext tokens in `.md`, `.json`, `.env` committed or shared
- one global full-access token for all clients
- pasting scoped class tokens in chat

## Per-Client Isolation (Mandatory)

Each client gets:
- separate GitHub repo
- separate Cloudflare zone + Pages project
- separate Cloudflare API token
- separate Stripe account (recommended)
- separate Google Sheet + script properties

## Cloudflare Token Policy

Use token classes, not one generic token:

- `zone`: `Zone.DNS:Edit`, `Zone:Read` (scoped to the client zone)
- `pages`: `Account.Pages:Write`, `Account.Account Settings:Read`
- `worker`: `Workers Scripts:Write`, `Workers KV:Write`, `D1:Write`, `Account Settings:Read` (only if site-specific worker access is needed)
- `shared-worker`: shared worker platform deploy/migration permissions
- `images`: `Images:Write` (and `Images:Read` if needed)

Mandatory onboarding default:

- first create one temporary bootstrap token with `API Tokens Write`
- use bootstrap token to generate all needed class tokens above
- then delete/revoke bootstrap token immediately
- if Codex creates tokens, bootstrap token may be pasted once in the active chat session and is treated as exposed by default

Rules:

- keep `zone`, `pages`, `worker`, `shared-worker`, and `images` separated by purpose
- do not reuse pages token for worker deploys
- do not keep a permanent global `CLOUDFLARE_API_TOKEN` in local user env
- activate per-task context via `scripts/use-cloudflare-context.ps1`

## Where to Store What

1. GitHub Actions secrets (per client repo)
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT_NAME`

2. Google Apps Script properties (per client sheet script)
- `GH_TOKEN`
- `GH_OWNER`
- `GH_REPO`
- `CF_ZONE_ID`
- `CF_API_TOKEN`

3. Worker secrets (per env)
- Stripe keys/webhook secret
- Google service account key
- admin token/password

## Fast Onboarding Procedure (2-5 min)

1. Clone from template.
2. Create one temporary bootstrap Cloudflare token (`API Tokens Write`).
3. If using Codex automation, paste bootstrap token once in the active chat so Codex can mint class tokens.
4. Use bootstrap token to create client-scoped token classes (`zone`, `pages`, `shared-worker`, optional `worker`, optional `images`).
5. Revoke bootstrap token immediately after class token creation.
6. Set local token env vars (`CF_TOKEN_ZONE_<SITEKEY>`, `CF_TOKEN_PAGES_<SITEKEY>`, `CF_TOKEN_SHARED_WORKER`, optional `CF_TOKEN_WORKER_<SITEKEY>`, optional `CF_TOKEN_IMAGES_<SITEKEY>`).
7. Verify context before setup actions:
   - `.\scripts\use-cloudflare-context.ps1 -Context pages -SiteKey <sitekey> -Verify`
8. Set GitHub repo secrets.
9. Set Apps Script properties.
10. Run one deploy.
11. Purge cache once.
12. Validate:
- homepage loads
- product page checkout path works
- canonical/hreflang are correct on localized pages

## Rotation Procedure

When rotating a client token:
1. Create new token with same scope.
2. Update target secret store(s).
3. Verify one action (deploy or purge).
4. Revoke old token.
5. Update key register metadata (not secret value).

## Incident Procedure

If a token may be leaked:
1. Revoke token immediately.
2. Create replacement token.
3. Update secret stores.
4. Purge cache and verify site.
5. Log incident in client ops notes.
