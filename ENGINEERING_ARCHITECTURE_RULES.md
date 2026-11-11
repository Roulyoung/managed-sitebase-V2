# Engineering & Architecture Rules

Deze standaard geldt voor iedere code-, content-, integratie- en configuratiewijziging in de template en in projecten die ervan worden afgeleid.

## Kleine units

- Houd functies bij voorkeur onder 40 regels en React-componenten onder 100 regels.
- Houd één verantwoordelijkheid per bestand, functie en component.
- Splits grotere of samengestelde units direct op.
- Documenteer uitzonderingen voor gegenereerde, declaratieve of legacy-code.

## Types en validatie

- Gebruik nooit `any`; definieer expliciete TypeScript-types.
- Nieuwe TypeScript-code gebruikt strict mode.
- Gebruik Zod voor API-responses, request bodies, formulieren, query parameters, headers, webhooks en environment variables.
- Valideer onbetrouwbare input vóór gebruik en geef veilige validatiefouten terug.

## UI, services en foutafhandeling

- Zet geen databasequeries, externe API-calls of complexe businesslogica in UI-componenten.
- Gebruik services, loaders, actions en adapters voor integraties zoals Stripe, Brevo, Sheets, D1 en Workers.
- Gebruik early returns en vermijd diepe nesting.
- Vang externe fouten af, log context zonder secrets of persoonsgegevens en geef een veilige fallback.

## Multi-tenant configuratie

- Hardcode geen domein-, merk-, tenant-, logo- of workerwaarden in herbruikbare UI.
- Gebruik centrale branding- en runtimeconfiguratie, `SITES_JSON`, `site_key`, hostname mapping en environment variables.
- Behoud Worker-contracten en backward compatibility volgens `WORKER_PLATFORM_PLAN.md`.

## Oplevering

- Voer linting/types, tests, build en relevante integratiechecks uit.
- Noteer ontbrekende controles en afwijkingen.
- Een afwijking vermeldt reden, scope, risico en rollback of migratiepad.
