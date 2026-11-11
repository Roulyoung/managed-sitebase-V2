# Feature Audit Playbook

## Doel

Controleer af en toe bestaande projecten tegen de actuele template. Zo worden nieuwe functies, beveiligingsverbeteringen en operationele werkwijzen niet alleen bij nieuwe projecten toegepast.

## Wanneer uitvoeren

- na een belangrijke template-update;
- vóór een nieuwe release of livegang;
- wanneer een checkout-, Worker-, Sheets- of secretsprobleem wordt gevonden;
- bij een periodieke onderhoudsronde van bestaande projecten.

## Auditprocedure

1. Bevestig de juiste projectmap en lees `SESSION_START.md`, `AGENTS.md` en de relevante failsafe-documenten.
2. Bekijk `FEATURE_UPDATE_LOG.md` in de template.
3. Vergelijk per feature of het bestaande project de functie al heeft, een oudere variant heeft, of de functie niet nodig heeft.
4. Controleer bij Worker-, checkout-, Stripe- of deploywijzigingen eerst de veiligheidscheck en rollbackinformatie.
5. Voeg ontbrekende functies alleen toe als ze binnen de projectscope passen.
6. Test de wijziging en noteer de uitkomst in het projecteigen feature-log of progress-log.
7. Noteer templatewaardige verbeteringen apart in de template-log, zonder projectgegevens over te nemen.

## Vergelijkingsstatus

Gebruik per item één van deze statussen:

- `aanwezig`: de actuele templatefunctie is geïmplementeerd en gecontroleerd;
- `ouder`: er bestaat al een oudere variant die mogelijk moet worden gemigreerd;
- `ontbreekt`: de functie ontbreekt en moet worden beoordeeld;
- `niet van toepassing`: de functie past niet bij dit project;
- `geblokkeerd`: de functie kan nog niet veilig worden toegevoegd.

## Auditformulier

| Feature | Status | Actie | Verificatie | Datum |
|---|---|---|---|---|
| | | | | |

Bewaar geen raw secrets of klantcredentials in dit formulier.
