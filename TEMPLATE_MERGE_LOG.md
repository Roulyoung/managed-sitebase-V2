# Template Merge Log

Track reusable additions pulled into `managed-sitebase-V2` from active projects.

## Entry Format

- date
- source repo or folder
- item
- decision
- why it was added or rejected
- follow-up

## 2026-07-22

- source: `Highcraft-store-fresh`
  - item: incident response and recovery docs
  - decision: added
  - why: reusable for redirects, bad deploys, and suspected compromise
  - follow-up: keep project-specific examples out of the template
- source: `Highcraft-store-fresh`
  - item: blog publication protocol
  - decision: added
  - why: reusable publishing workflow for localized content
  - follow-up: keep SEO examples generic
- source: `Highcraft-store-fresh`
  - item: SEO backlog tracking
  - decision: added
  - why: useful template-level planning aid
  - follow-up: keep client-specific tasks in project notes
- source: `roadherorentals.com`
  - item: multi-site worker architecture docs
  - decision: added
  - why: aligns with shared worker policy
  - follow-up: avoid copying any rental-specific behavior
- source: `willemluyckx`
  - item: sheet schema discipline (`site_key`, `schema_version`)
  - decision: added
  - why: reusable contract for future sheet-backed sites
  - follow-up: consider a shared admin helper in a later pass
- source: `willemluyckx`
  - item: generic Google Sheets admin helper
  - decision: added
  - why: reusable bootstrap/read/write tool for sheet-backed templates
  - follow-up: keep site-specific seed data outside the template
