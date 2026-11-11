# Client Onboarding, DNS, and Go-Live Playbook

Use this as the standard process for a new client with an existing website, existing hosting, or mixed legacy setup.

This is the normal operating model:

- website hosting can stay where it is
- DNS should preferably move to Cloudflare
- app, Pages, Worker, and mail services are then layered in without forcing a hosting migration

## Phase 0. Cloudflare bootstrap token (mandatory)

Before normal setup, always create one temporary token-generation token.

Required bootstrap scope:

- `API Tokens Write`

Codex automation exception:

- bootstrap token may be pasted once in the active chat so Codex can mint scoped tokens
- treat bootstrap token as exposed by default and revoke it immediately after token minting

Use that one token to generate all required client token classes:

- zone
- pages
- shared-worker
- worker (if site-specific worker access is needed)
- images (if the client uses Cloudflare Images)

After class tokens are created and verified:

1. store class tokens in the proper local/CI locations
2. apply required worker secrets
3. revoke bootstrap token immediately
4. log token metadata (id/date/status) in `PROJECT_KEYS_REGISTER.md`
5. never paste scoped class tokens in chat; set those via env vars/secret stores only

## Core rule

Do not treat DNS, hosting, mail, and application deployment as one thing.

- hosting = where the website or app runs
- DNS = where the domain records are managed
- email delivery = provider used for transactional mail
- registrar = where the domain is registered

## Standard phases

1. Inventory the current live setup
2. Audit current DNS before changing nameservers
3. Move DNS to Cloudflare without changing hosting
4. Configure Pages / Worker / app infra
5. Configure transactional mail with verified sender and DNS auth
6. Test in a test environment first
7. Go live only after web, mail, worker, and primary flows are verified

## DNS migration rule

Existing hosting can stay exactly where it is.

Moving DNS to Cloudflare only changes where records are managed. It does not move the website by itself.

## Domain canonicalization protocol (mandatory)

Canonical host issues (`www` vs apex vs `pages.dev`) must be resolved before launch.

1. Pick one canonical host for production:
   - default: apex (`https://example.com`)
   - alternative: `www` (`https://www.example.com`)
2. Add both apex and `www` as custom domains in Cloudflare Pages.
3. Point both DNS records to the Pages target and wait until both domains are `active`.
4. Add redirect rules in `public/_redirects` before the SPA fallback:
   - `http://<apex>/*` -> `https://<canonical>/:splat` `301!`
   - `http://www.<apex>/*` -> `https://<canonical>/:splat` `301!`
   - `https://www.<apex>/*` -> `https://<canonical>/:splat` `301!` (if apex is canonical)
   - `https://<project>.pages.dev/*` -> `https://<canonical>/:splat` `301!`
5. Ensure canonical tags use the same host (`SITE_CONFIG.siteUrl` + page `<link rel="canonical">`).
6. Verify redirects for `/` and one deep route before go-live:
   - canonical URL returns `200`
   - `www` returns `301` to canonical
   - `http` returns `301` to canonical `https`
   - `pages.dev` returns `301` to canonical
7. Verify DNS answers on local resolver and one public resolver (`1.1.1.1` or `8.8.8.8`).

## Mail rule

Do not assume transactional mail is ready because an account exists.

You still need:

- sender verification
- domain authentication
- API credential for the application

Do not paste raw provider secrets into markdown or chat.

## Required project docs

Every new client project should track:

- registrar
- current DNS provider
- current hosting provider
- mail provider
- nameserver status
- sender verification status
- domain authentication status
- rollback plan

Update:

- `PROJECT_KEYS_REGISTER.md`
- `PROJECT_SECRETS_PLAYBOOK.md`
- `TEMPLATE_START.md`

## Go-live rule

Do not combine DNS migration, hosting migration, and application launch into one blind cutover.

Split the risk:

- first DNS control
- then infra config
- then mail auth
- then app launch
