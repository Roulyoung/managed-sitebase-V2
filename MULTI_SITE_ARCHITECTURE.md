# Multi-Site Architecture

This template is designed to support more than one client site without turning the worker into a per-client fork.

## Core Rules

- keep one shared worker core
- configure site-specific behavior through `SITES_JSON`, `site_key`, hostname mapping, and env vars
- preserve backward compatibility for older clients
- add schema fields instead of replacing existing ones

## What Belongs Here

- shared routing rules
- shared checkout and sheet access patterns
- schema migration notes
- compatibility guardrails
- worker and frontend environment conventions

## What Does Not Belong Here

- hardcoded client-only worker URLs
- brand-specific business logic
- one-off deploy paths that cannot be reused

