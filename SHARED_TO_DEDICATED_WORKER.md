# Shared To Dedicated Worker

Use this only when a temporary dedicated worker is unavoidable.

## Default Position

Prefer one shared worker service for all active sites.

## Temporary Exception Requirements

- keep the same shared worker core
- keep behavior config-driven
- document why the exception exists
- document how to return to the shared platform
- note any compatibility risk

## Migration Back

Before the exception becomes permanent, write:

- the rollback path
- the target shared worker state
- the migration steps
- the verification steps across active sites

