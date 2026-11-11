# Recovery Checklist

Use this during redirects, broken deploys, checkout failures, or suspected compromise.

## Contain

- stop public traffic if needed
- do not redeploy blindly
- record the time the issue started

## Preserve Evidence

- save the affected URL
- save the final destination if there is a redirect
- save response headers
- save the HTML source
- save DNS and nameserver data
- save CDN or worker rule data
- save recent deploy history

## Check In Order

- registrar forwarding and domain parking
- nameservers and DNS
- CDN or edge rules
- worker routes
- origin config
- deploy pipeline and secrets

## Recover

- remove the source of the issue
- verify the domain points to the intended host
- rotate exposed or suspicious secrets
- purge cache only after the source is clean
- redeploy from a trusted commit

## Verify

- the main site loads normally
- key routes open directly
- no unexpected redirect remains
- mobile and desktop both work

