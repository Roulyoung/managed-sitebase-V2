# Project Secrets Playbook

Purpose: one copyable process for storing, rotating, and verifying secrets for any client project without putting raw values in the repo.

## Core Rules

- Never commit raw tokens, API keys, webhook secrets, service-account JSON, or passwords.
- Never paste secrets into chat when a local env var, non-committed `.env`, GitHub secret, or Cloudflare secret can be used instead.
- Exception for onboarding automation: a temporary bootstrap token may be pasted once in the active Codex session only to mint scoped tokens, then must be revoked immediately.
- Keep the GitHub repo private unless there is a separate business reason to open it.
- A public customer demo link should come from Cloudflare Pages, not from a public repo.
- Store secret metadata in docs, never the full secret value.
- Treat anything pasted into chat or shell history as exposed and rotate it after setup if it is sensitive.

## Storage Policy

Use these locations consistently:

| Secret Type | Store In | Notes |
|---|---|---|
| Cloudflare deploy token | GitHub repo secret | `CLOUDFLARE_API_TOKEN` |
| Cloudflare account id | GitHub repo secret | `CLOUDFLARE_ACCOUNT_ID` |
| Cloudflare Pages project name | GitHub repo secret | `CLOUDFLARE_PAGES_PROJECT_NAME` |
| Frontend public envs | GitHub repo variable | `VITE_*` values used at build time |
| Worker secrets | Cloudflare Worker secret store | Stripe secret key, webhook secret, admin token, Google key |
| Local-only secrets | OS environment variables or password manager | Do not keep in committed `.env` files |
| Key inventory metadata | repo markdown register | last4, location, dates, owner, rotation status only |

## Cloudflare Token Classes

Do not treat all Cloudflare tokens as interchangeable.

Use token classes:

1. `zone`
   For DNS, zone read, and cache purge only.

2. `pages`
   For Pages project deploys only.

3. `worker`
   For site-specific worker deploys, D1 migrations, and worker secret operations when a dedicated worker path exists.

4. `shared-worker`
   For the shared Worker platform only. This is account-level and must match the shared worker account id.

5. `images`
   For Cloudflare Images API operations (upload/auth checks) when the project uses Images.

Important:

- a zone token is not enough for Worker service deploys
- a shared-worker token should not be reused as the default token for client zone work
- pages token is not enough for worker deploys or remote D1 operations
- keep `zone`, `pages`, `worker`, `shared-worker`, and `images` separated by purpose
- do not keep one universal `CLOUDFLARE_API_TOKEN` as the permanent local secret

## Mandatory Bootstrap Token Pattern

For every new client onboarding, always use one temporary token-generation token first.

Required bootstrap token scope:

- `API Tokens Write` (minimum)

Recommended extras for operator visibility:

- `API Tokens Read`
- `User Details Read`

Use that bootstrap token once to create all client token classes:

- `zone`
- `pages`
- `worker` (if used)
- `shared-worker` (if used)
- `images` (if Cloudflare Images is used)
- any additional narrow token needed for the project

Rules:

1. Bootstrap token is only for token creation, never for deploy/runtime actions.
2. After class tokens are created and verified, revoke bootstrap token immediately.
3. Record bootstrap token id/date/revocation in `PROJECT_KEYS_REGISTER.md`.
4. If bootstrap token is pasted in chat or shell logs, treat as exposed and rotate/revoke.
5. Never paste class tokens (`zone`, `pages`, `worker`, `shared-worker`, `images`) in chat; store/use those via env vars and secret stores only.

## Standard Secret Flow

Always move secrets through a local machine store first, then push them into the real target store:

1. Save the raw value in a local user env var or a non-committed `.env`
2. Open a new shell and verify the env var exists
3. Push it to GitHub secrets, GitHub vars, or Cloudflare Worker secrets by CLI
4. Document only the secret name and storage location

Example PowerShell flow:

```powershell
[System.Environment]::SetEnvironmentVariable("CF_TOKEN_PAGES_SITEKEY", "value_here", "User")
$token = [System.Environment]::GetEnvironmentVariable("CF_TOKEN_PAGES_SITEKEY", "User")
$token | gh secret set CLOUDFLARE_API_TOKEN --repo owner/repo
```

## Token Verification Pattern

Before Cloudflare CLI actions, always verify context:

```powershell
.\scripts\use-cloudflare-context.ps1 -Context pages -SiteKey <sitekey> -Verify
```

Then run context-specific commands:

- pages: `npx wrangler pages project list --json`
- zone: `npm run cloudflare:zones`
- shared-worker: `npx wrangler d1 migrations list AUTOMOTIVE_DB --env test --remote`

## Standard Names

### GitHub Repo Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT_NAME`

### GitHub Repo Variables

- `VITE_WORKER_BASE_URL`
- `VITE_ADMIN_API_BASE`
- `VITE_STRIPE_PUBLISHABLE_KEY`

### Local OS Environment Variables

- Use client-prefixed names such as `CLIENT_STRIPE_SECRET_KEY`
- Use client-prefixed names such as `CLIENT_STRIPE_WEBHOOK_SECRET`
- Use explicit Cloudflare names such as `CF_TOKEN_ZONE_<SITEKEY>`
- Use explicit Cloudflare names such as `CF_TOKEN_PAGES_<SITEKEY>`
- Use explicit Cloudflare names such as `CF_TOKEN_WORKER_<SITEKEY>` when dedicated worker access is needed
- Use explicit Cloudflare names such as `CF_TOKEN_IMAGES_<SITEKEY>` when Cloudflare Images is used
- Use `CF_TOKEN_SHARED_WORKER` for shared worker deploys
- Use `CF_ACCOUNT_ID_SHARED_WORKER` for shared worker account targeting

### Worker Secret Store

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- admin/auth secrets as needed

## Google Sheets Pattern

For projects that use Google Sheets as operational data:

- Share the sheet with the worker service account as `Editor`
- Keep `GOOGLE_SERVICE_ACCOUNT_EMAIL` in worker vars
- Keep `GOOGLE_SERVICE_ACCOUNT_KEY` in the Cloudflare Worker secret store
- Do not commit the raw Google JSON key file

Preferred local workflow:

1. Reuse the existing service-account JSON already stored locally outside the repo
2. Use a small local admin script in the project repo for reads/writes
3. Keep only the sheet id and file path metadata in the project register

## New Project Checklist

1. Create a private GitHub repo.
2. Create a Cloudflare Pages project.
3. Create one temporary bootstrap token with `API Tokens Write`.
4. Use bootstrap token to create required client token classes:
   - zone
   - pages
   - shared-worker
   - worker (if used)
   - images (if used)
5. Revoke bootstrap token immediately after class tokens are confirmed.
6. Create only those class tokens with the minimum required scope.
7. Store class tokens under explicit local env names instead of one permanent `CLOUDFLARE_API_TOKEN`.
8. Use `scripts/use-cloudflare-context.ps1 -Verify` before Cloudflare CLI actions.
9. Add required GitHub repo secrets.
10. Add required GitHub repo variables for public frontend config.
11. Add worker secrets through Wrangler or Cloudflare dashboard.
12. Deploy once and verify homepage, product flow, and any checkout/admin paths.
13. Fill in the project key register without raw values.
14. If the project uses Google Sheets, verify local admin access with `npm run sheet:info` or equivalent.

## Live Link Rule

When a project goes live:

- always share the public site using the full `https://` URL
- never rely on a bare domain being auto-detected as a clickable link

Use:

- `https://clientdomain.com`

Instead of:

- `clientdomain.com`

Reason:

- some clients, inboxes, chat apps, and mobile UIs do not turn bare domains into a working link consistently

## Rotation Procedure

1. Create the replacement token/key first.
2. Update the target store.
3. Run one real verification action.
4. Revoke the old token/key.
5. Update the register with the new last4 and rotation date.

## Incident Procedure

1. Revoke the exposed token or key immediately.
2. Create a replacement with minimum scope.
3. Update GitHub/Cloudflare/local stores.
4. Re-run deploy or verification checks.
5. Record the incident and the rotation date in the register.

## Admin Password Pattern
For shared-worker projects:
- use a site-specific admin secret first: ADMIN_PASSWORD_<SITEKEY>
- keep global ADMIN_PASSWORD only as a legacy fallback
- admin API calls should go directly to the shared worker
- admin requests should include the project site key


