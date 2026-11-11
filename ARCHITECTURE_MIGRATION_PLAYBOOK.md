# Architecture Migration Playbook

Gebruik dit document om een bestaand project gecontroleerd om te vormen naar `ENGINEERING_ARCHITECTURE_RULES.md`. Het doel is niet alleen de huidige code op te schonen, maar ook te zorgen dat iedere volgende sessie de standaard leest, toepast en controleert.

## 1. Intake en veiligheid

1. Bevestig de juiste projectmap en lees `SESSION_START.md`, `AGENTS.md`, `PROJECT_CONTEXT.md` en de relevante failsafe-documenten.
2. Noteer de laatste bekende goede commit en maak vóór risicovolle wijzigingen een checkpoint.
3. Inventariseer stack, build/test-commando's, integraties, Worker-routes, schema's en sibling-projectimpact.
4. Markeer bevroren legacy-code, gegenereerde bestanden en externe contracten als uitzonderingen; wijzig ze niet stilzwijgend.

## 2. Audit

Maak een tabel met minimaal:

| Onderdeel | Bestand | Afwijking | Risico | Actie | Status |
|---|---|---|---|---|---|
| UI/logica | | | | | |
| Validatie/types | | | | | |
| Integraties | | | | | |
| Foutafhandeling | | | | | |
| Multi-tenant/config | | | | | |
| Tests/build | | | | | |

Controleer expliciet functies >40 regels, React-componenten >100 regels, `any`, directe API/databasecalls in UI, hardcoded tenantwaarden, ontbrekende Zod-schema's en onveilige foutmeldingen.

## 3. Migratievolgorde

1. Voeg `ENGINEERING_ARCHITECTURE_RULES.md` toe en maak het verplicht in `SESSION_START.md`, `AGENTS.md` en de failsafe.
2. Voeg of herstel reproduceerbare lint-, type-, test- en buildchecks.
3. Splits eerst grensgebieden: UI, validatie, services, providers en adapters.
4. Voeg Zod-schema's toe voor inkomende data en environment variables vóór verdere businesslogica.
5. Refactor één integratie of route tegelijk; behoud bestaande response-, sheet- en Worker-contracten.
6. Verwijder hardcoded tenantgedrag uit helpers en verplaats het naar centrale configuratie.
7. Verwijder een legacy-uitzondering pas nadat compatibiliteit aantoonbaar is getest.

## 4. Verificatie per stap

- Draai linting/typecheck, unit tests en build.
- Draai de browsercheck met de projectbrowser/tooling; ontbrekende browserbinaries moeten expliciet worden geïnstalleerd of als blocker worden genoteerd.
- Draai browser- en integratietests voor iedere geraakte route.
- Controleer foutpaden, timeouts, retrygedrag en veilige logging.
- Voor Worker-, checkout-, Sheets-, Stripe- of adminwijzigingen: voer de shared-worker compatibiliteitschecks uit.
- Werk het projecteigen `ARCHITECTURE_MIGRATION_STATUS.md` bij met afgeronde stappen, openstaande uitzonderingen en rollbackpad.

## 5. Definition of done

Een project is gemigreerd wanneer:

- de standaard in de sessiestart en agentinstructies staat;
- nieuwe code de standaard volgt en uitzonderingen expliciet zijn;
- grenzen tussen UI, services, validatie en providers aantoonbaar zijn;
- inkomende data en environment variables gevalideerd worden;
- checks reproduceerbaar slagen;
- resterende legacy-code, risico's en vervolgstappen gedocumenteerd zijn.
