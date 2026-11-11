# Active Worker Status

Read this with [WORKER_PLATFORM_PLAN.md](./WORKER_PLATFORM_PLAN.md) and the shared migration matrix at [WORKER_MIGRATION_MATRIX.md](/C:/Users/micro/Documents/Codex%20CLI%20websites/Websites/WORKER_MIGRATION_MATRIX.md).

## managed-sitebase-V2

- The storefront template now uses a central worker helper for the main shop flow.
- The template worker example is still single-site oriented.
- New clones must not reintroduce hardcoded client-specific worker hosts.

## Immediate Next Steps

1. Keep helper-based frontend worker access as the default.
2. Port the template worker example to the shared multi-site worker core.
3. Use this repo as the source for future client clones after the worker example is aligned.
