# Incident Response

Use this runbook when the live site behaves unexpectedly and the cause is not yet known.

## Rule

Do not start by editing app code.

If the issue is in DNS, registrar forwarding, CDN rules, worker routing, or deploy configuration, app changes will not fix it.

## First Actions

1. Stabilize the situation.
2. Stop making unrelated edits.
3. Preserve evidence before changing routing or secrets.
4. Record what changed and when it changed.

## Evidence To Capture

- current URL
- final URL if redirected
- response headers
- HTML source
- DNS records
- nameservers
- CDN or worker rules
- recent deploy history

## Recovery Order

1. remove the source of the issue
2. verify the intended host mapping
3. purge cache after the source is clean
4. redeploy from a trusted commit
5. validate on a temporary or staging host
6. reconnect the public domain only after verification

## Postmortem

After recovery, record:

- root cause
- first detected time
- affected URLs
- what was fixed
- what secrets were rotated
- how recurrence will be prevented

