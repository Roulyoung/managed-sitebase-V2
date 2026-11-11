# Session Close

Gebruik dit document aan het einde van een sessie. Eerst een compacte samenvatting, daarna pas uitvoering van de afsluiting na expliciet akkoord.

## Session Meta

- Date:
- Project:
- Repo:
- Branch:
- Latest commit:
- Live URL checked:

## Short Summary

Schrijf hier in 3 tot 6 regels wat er vandaag is gedaan.

## What Changed

- File / area:
- File / area:
- File / area:

## Validation

- `npm run lint`:
- `npm run build`:
- Live check:
- Manual QA:

## Open Items

- Item:
- Item:
- Item:

## Risks

- Risk:
- Risk:
- Rollback note:

## Rollback Plan

Beschrijf hier altijd de terugweg naar een bekend goed moment.

1. Noteer het laatste bekende goede commit-hash:
- Good commit:

## Checkpoint Commit Record

- Checkpoint commit hash:
- Why this checkpoint exists:
- Files changed after checkpoint:
- Safe rollback method:

2. Noteer wat er precies teruggedraaid moet worden:
- Files:
- Feature flag:
- Route:
- Content block:

3. Kies de veilige rollback-methode:
- `git revert <commit>` voor een specifieke wijziging
- een nieuwe fix-commit bovenop `main` als alleen kleine correctie nodig is
- een bekende feature flag uitzetten als de wijziging al veilig achter een toggle staat

4. Controleer na rollback opnieuw:
- `npm run lint`
- `npm run build`
- Live route / critical page

## Approval Gate

Geef eerst een korte samenvatting aan de gebruiker en vraag expliciet akkoord.

- Summary shown:
- User approved:
- Notes from user:

## Close Actions

- Update `PROJECT_PROGRESS_LOG.md`
- Record the final state
- Record the latest commit hash
- Push if required
- Mention any follow-up for the next session

## Final Handoff

Eindig met:

- wat nu klaar is
- wat nog open staat
- welk commit-hash de gebruiker kan terugvinden
- welke rollback-optie beschikbaar is