# Stripe Test/Live Mode Switching

Use this document to keep Stripe test and live credentials separate while making local switching quick and repeatable.

## Target layout

Each client project should have:

| Layer | Test | Live |
|---|---|---|
| Stripe Projects environment | `development` | `production` |
| Frontend output | `.env.development` | `.env.production` |
| Publishable key | `pk_test_...` | `pk_live_...` |
| Worker secret | `sk_test_...` | `sk_live_...` |
| Webhook signing secret | test endpoint secret | live endpoint secret |
| Worker environment | `test` | `production` |

The frontend variable name stays the same in both environments:

```text
VITE_STRIPE_PUBLISHABLE_KEY
```

## Stripe Projects setup

Create separate project variables and bind them to the same environment key:

```powershell
stripe projects env create development --output .env.development
stripe projects env create production --output .env.production

stripe projects env use development
stripe projects variables set stripe-publishable-test --env-key VITE_STRIPE_PUBLISHABLE_KEY
stripe projects env --pull

stripe projects env use production
stripe projects variables set stripe-publishable-live --env-key VITE_STRIPE_PUBLISHABLE_KEY
stripe projects env --pull
```

Enter values only in the secure CLI prompt. Never put keys in the command line, Markdown, or Git.

## Worker setup

The Worker configuration must define explicit `test` and `production` environments with the required bindings and URLs. Set each secret once for its matching environment:

```powershell
npx wrangler secret put STRIPE_SECRET_KEY --env test --config .\worker\wrangler.toml
npx wrangler secret put STRIPE_WEBHOOK_SECRET --env test --config .\worker\wrangler.toml

npx wrangler secret put STRIPE_SECRET_KEY --env production --config .\worker\wrangler.toml
npx wrangler secret put STRIPE_WEBHOOK_SECRET --env production --config .\worker\wrangler.toml
```

`wrangler secret put` deploys a new Worker version immediately. Run the two secrets for one environment consecutively and verify before switching traffic.

Create separate Stripe webhook endpoints for test and live. Each endpoint must point to the matching Worker environment and listen for `checkout.session.completed`.

## Fast local switching

The intended developer experience is one wrapper command:

```powershell
.\scripts\stripe-mode.ps1 -Mode test
.\scripts\stripe-mode.ps1 -Mode live
```

The wrapper should:

1. Select the matching Stripe Projects environment.
2. Pull the matching frontend environment file.
3. Verify the key prefix without printing the key.
4. Verify the matching Worker checkout-status endpoint.
5. Refuse ambiguous or unknown modes.

Switching local frontend mode must not silently deploy live Worker secrets.

## Release checklist

For the complete checkout test procedure, product-ID rules, and live/test mismatch diagnosis, see [STRIPE_CHECKOUT_TESTING.md](./STRIPE_CHECKOUT_TESTING.md).

- Test mode uses only `pk_test`, `sk_test`, and the test webhook secret.
- Live mode uses only `pk_live`, `sk_live`, and the live webhook secret.
- The test and live webhook endpoints are separate.
- `stripe projects status` shows the intended account and environment.
- Worker secrets are stored in Cloudflare, not in `.env` or Git.
- A test payment is completed before enabling live checkout.
