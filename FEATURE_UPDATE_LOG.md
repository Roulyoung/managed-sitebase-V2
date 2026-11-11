# Feature Update Log

Gebruik dit log om bij te houden welke herbruikbare functies en werkwijzen aan de template zijn toegevoegd. Het doel is dat nieuwe projecten met elkaar kunnen worden vergeleken en dat bestaande projecten later kunnen worden bijgewerkt.

## Werkwijze

- Voeg iedere nieuwe herbruikbare feature toe met datum, status en korte verificatie.
- Noteer geen klantnamen, domeinen, account-ID's, sleutels of andere projectdata.
- Markeer een item als `baseline` wanneer het in de template zit en bij nieuwe projecten standaard moet worden gecontroleerd.
- Markeer een item als `optional` wanneer het alleen wordt geactiveerd als het project dit nodig heeft.
- Gebruik [FEATURE_AUDIT_PLAYBOOK.md](./FEATURE_AUDIT_PLAYBOOK.md) om bestaande projecten op ontbrekende functies te controleren.

## Retrospectieve baseline

Deze eerste lijst is met terugwerkende kracht samengesteld uit de bestaande template-werkwijze en documentatie. De lijst is een controlebaseline, geen claim dat iedere functie op dezelfde dag is geïmplementeerd.

| Datum | Feature / werkwijze | Status | Verificatie | Opmerking |
|---|---|---|---|---|
| 2026-07-22 | Incident response en recovery-documentatie | baseline | Documenten aanwezig | Projectspecifieke voorbeelden blijven buiten de template. |
| 2026-07-22 | SEO- en publicatieproces | baseline | Protocol en backlog aanwezig | Content blijft per project verschillend. |
| 2026-07-22 | Shared multi-site Worker-richtlijnen | baseline | Platformplan en migratiecheck aanwezig | Backward compatibility blijft verplicht. |
| 2026-07-22 | Google Sheets schema- en adminrichtlijnen | optional | Schema- en toegangsdocumentatie aanwezig | Alleen nodig voor projecten die Sheets gebruiken. |
| 2026-11-07 | Stripe Projects credential workflow | optional | Workflowdocument en environment-model aanwezig | Gebruik alleen wanneer Stripe wordt gebruikt. |
| 2026-11-07 | Gescheiden Stripe test/live checkout | optional | Mode-switching en checkout-testprocedure aanwezig | Testkaart nooit op live gebruiken. |
| 2026-11-07 | Product-ID- en prijsvalidatie voor checkout | optional | Checkout-testprocedure bevat unieke-ID-regel | Controleer actieve productregels vóór testen. |
| 2026-11-07 | Database-gedreven productcatalogus in frontend | optional | Als kandidaat uit een bestaand project geregistreerd | Shop en productpagina's horen actieve catalogusdata te tonen wanneer het project meerdere databaseproducten gebruikt. |

## Nieuwe entries

| Datum | Feature / werkwijze | Status | Verificatie | Opmerking |
|---|---|---|---|---|
| YYYY-MM-DD | | baseline/optional | | |
