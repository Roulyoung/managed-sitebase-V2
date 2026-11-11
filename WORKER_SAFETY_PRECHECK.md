# Worker Safety Precheck

Use this checklist before changing worker, deploy, checkout, Sheets, Stripe, or shared backend state.

## Required checks

1. Confirm the current folder matches the intended project.
2. Confirm the Git remote matches the intended project.
3. Confirm the active branch is the expected branch.
4. Confirm the worker target or URL matches the intended project configuration.
5. Confirm the change is either config-only for one site or a shared-core change checked for sibling impact.
6. Confirm rollback information exists for the current release.
7. Confirm the task-specific runbook has been read.

## Stop conditions

Stop and verify before editing if:

- the folder or remote does not match the task;
- the worker target is unknown;
- the change could affect another site and sibling impact was not checked;
- rollback is not possible from the current state.
