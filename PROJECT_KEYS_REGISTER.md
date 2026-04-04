# Project Keys Register

Purpose: track where project secrets live without storing the raw values.

## Project

- Client Name: managed-sitebase-V2
- Domain: `managed-sitebase-V2`
- Registrar:
- Current DNS Provider:
- Current Hosting Provider:
- Current Mail Provider:
- Nameserver Status:
- GitHub Repo:
- Cloudflare Account ID:
- Cloudflare Zone ID:
- Cloudflare Pages Project:
- Public Demo URL:
- Google Sheet URL:
- Google Script Project URL:
- Stripe Account ID:
- Transactional Sender Address:
- Sender Verification Status:
- Domain Authentication Status:
- Worker Status:

## GitHub Repo Secrets

| Name | Set | Raw Value In Repo | Notes |
|---|---|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | no | no | |
| `CLOUDFLARE_API_TOKEN` | no | no | |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | no | no | |

## GitHub Repo Variables

| Name | Set | Notes |
|---|---|---|
| `VITE_WORKER_BASE_URL` | no | |
| `VITE_ADMIN_API_BASE` | no | |
| `VITE_STRIPE_PUBLISHABLE_KEY` | no | |

## Local OS Environment Variables

| Name | Present Locally | Notes |
|---|---|---|
| `CLIENT_STRIPE_SECRET_KEY` | no | |
| `CLIENT_STRIPE_WEBHOOK_SECRET` | no | |
| `CF_TOKEN_ZONE_<SITEKEY>` | no | token id + last4 only |
| `CF_TOKEN_PAGES_<SITEKEY>` | no | token id + last4 only |
| `CF_TOKEN_WORKER_<SITEKEY>` | no | only if site-specific worker token is used |
| `CF_TOKEN_IMAGES_<SITEKEY>` | no | only if Cloudflare Images is used |
| `CF_TOKEN_SHARED_WORKER` | no | shared worker platform token metadata only |
| `CF_ACCOUNT_ID_SHARED_WORKER` | no | shared worker account id |
| `CLOUDFLARE_API_TOKEN` | no | keep unset at user scope to avoid token-class mixups |

## Worker Secret Store

| Secret | Status | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | unknown | |
| `STRIPE_WEBHOOK_SECRET` | unknown | |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | unknown | |
| `CF_IMAGES_ACCOUNT_ID` | unknown | required if `/admin/images/upload` is enabled |
| `CF_IMAGES_TOKEN` | unknown | must include Cloudflare Images Write on account scope |

## Verification Log

| Item | Status | Date |
|---|---|---|
| Cloudflare Pages project created | pending | |
| Public Pages deploy reachable | pending | |
| GitHub deploy secrets configured | pending | |
| Production Stripe publishable key configured | pending | |
| GitHub Actions deploy run verified | pending | |
| Bootstrap token created, used for class token minting, then revoked | pending | |

## Rotation Notes

- If a token or key was pasted into chat, terminal history, or any shared note, rotate it after setup.
- Update only last4, dates, and storage locations here after rotation.
- Mandatory onboarding standard: create one temporary bootstrap token with `API Tokens Write`, mint scoped class tokens, then revoke bootstrap token immediately.
- Log bootstrap token metadata (token id, creation date, revocation date/status) here without storing raw values.
- Codex onboarding exception: bootstrap token may be pasted once in active chat for token minting, but must still be logged and revoked immediately.
