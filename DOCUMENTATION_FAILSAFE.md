# Documentation Failsafe

Use this checklist before changing worker, checkout, deploy, Sheets, Stripe, SEO, or cross-project behavior.

## Purpose

Keep changes traceable, backward compatible, and reversible.

## Before Editing

- Read `AGENTS.md`
- Read `WORKER_PLATFORM_PLAN.md`
- Read `ACTIVE_WORKER_STATUS.md` if it exists
- Check `PROJECT_CONTEXT.md` for the canonical repo
- Check the migration tracker when worker routing or shared platform behavior may change

## Before Shipping

- Confirm the change is reusable and not a client-only accident
- Confirm older sites still work
- Confirm any schema additions are additive
- Confirm environment variables are documented
- Confirm rollback steps are written

## Stop Conditions

Pause and redesign if any of the following is true:

- the change weakens shared worker compatibility
- the change hardcodes a client-specific URL in reusable code
- the change replaces an existing schema field or tab
- the change introduces a new deploy path without a rollback path

