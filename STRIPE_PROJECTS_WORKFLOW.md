# Stripe Projects Credential Workflow

Use this workflow for every new client project that needs Stripe credentials. It keeps project configuration repeatable without putting raw keys in Git, chat, or documentation.

## Scope

Stripe Projects manages project metadata, environments, publishable frontend variables, and local credential synchronization. It does not replace Stripe Checkout, webhook handling, or Cloudflare Worker secrets.

## Recommended kickoff request

For a new project, you can tell Codex:

> I want to connect Stripe to this site. Read the Stripe documentation and this project’s setup docs, check the current repo state, then guide me through account selection, test/live environments, publishable credentials, Worker secrets, Checkout, webhooks, and verification. Pause whenever browser approval, a secret, or a live deployment is required.

The agent can inspect the repository, use the Stripe CLI and Projects workflow, and guide the integration step by step. You still make the Stripe account/environment choice and approve browser, secret, and live-production actions.

For the fast test/live switching design, follow [STRIPE_MODE_SWITCHING.md](./STRIPE_MODE_SWITCHING.md).

## Before starting

- Use Stripe CLI `1.43.3` or newer.
- Authenticate only the Stripe account and environment needed for this project.
- Do not select unrelated client accounts during authorization.
- Keep live and test credentials in separate named environments.
- Never put `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in frontend code or a committed file.

## Initialize a new project

Run these commands from the new project root:

```powershell
stripe plugin install projects
stripe projects init <ProjectName> --mode manual --skip-skills
stripe projects env create production --output .env.production
stripe projects env use production
```

If Stripe asks for browser approval, use the displayed URL and verification code. Approve only the intended account/environment.

## Store the publishable key

Use a project variable and pull it into the environment file used by the frontend:

```powershell
stripe projects variables set stripe-publishable-live --env-key VITE_STRIPE_PUBLISHABLE_KEY
stripe projects env --pull
stripe projects status
```

When prompted, enter the publishable key securely. Do not place it in Markdown or source code. A publishable key is safe for frontend use, but it still belongs in the environment workflow.

For test mode, create a separate environment and variable name:

```powershell
stripe projects env create development --output .env.development
stripe projects env use development
stripe projects variables set stripe-publishable-test --env-key VITE_STRIPE_PUBLISHABLE_KEY
stripe projects env --pull
```

## Secret and production rules

- Keep `VITE_STRIPE_PUBLISHABLE_KEY` in the frontend environment only.
- Keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in the Cloudflare Worker secret store.
- Configure production hosting secrets separately; `stripe projects env --pull` writes local files and does not update Cloudflare automatically.
- Keep `.env`, `.env.*`, and `.projects/vault/` out of version control.
- Commit `.projects/state.json` and `.projects/state.local.json` when the repository uses Stripe Projects, so the project can be pulled or linked on another machine.
- Record only variable names, storage locations, dates, and last-four metadata in the project key register.

## New machine or new project clone

```powershell
stripe projects pull <ProjectId>
stripe projects env use production
stripe projects env --pull
```

For a new client project, initialize a new Stripe Project instead of reusing another client's project state.

## Verification checklist

- `stripe projects status` shows the intended account and project.
- `stripe projects env` lists variables without revealing values.
- The expected `.env.production` or `.env.development` file contains the frontend variable.
- The project key register contains metadata only.
- Worker secret configuration is verified separately through the Cloudflare secret store.
