# Google Sheets Schema

Use this as the reusable contract for sheet-backed sites.

## Rules

- every site must have a stable `site_key`
- every site must declare a `schema_version`
- add columns instead of renaming or removing existing ones
- keep schema adapters for older data when needed
- document any new tab before rollout

## Recommended Fields

- `site_key`
- `schema_version`
- canonical name or brand name
- locale fields
- SEO fields
- contact fields
- routing or status fields where needed

## Template Guidance

If a new site needs a sheet admin tool, prefer a shared schema helper over a one-off script with hardcoded column names.

