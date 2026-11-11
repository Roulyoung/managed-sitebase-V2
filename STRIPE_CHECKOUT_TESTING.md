# Stripe Checkout Testprocedure

## Doel

Deze procedure voorkomt dat een Stripe-testkaart per ongeluk op een live checkout wordt gebruikt.

## Omgevingen

| Gebruik | Frontend | Worker | Stripe-modus |
|---|---|---|---|
| Lokaal testen | `.env.development` | `<test-worker-url>` | Test |
| Echte verkoop | `.env.production` / live site | `<live-worker-url>` | Live |

Gebruik een testkaart alleen met de testfrontend én test-worker. Gebruik een echte betaalkaart alleen met de live frontend én live-worker.

## Lokale test starten

Voer dit uit vanuit de projectmap:

```powershell
Set-Location "<project-root>"
stripe projects env use development
stripe projects env --pull
npm run dev
```

Open uitsluitend de localhost-URL die Vite toont, meestal:

```text
http://localhost:5173
```

Controleer de test-worker:

```powershell
Invoke-RestMethod -Uri "<test-worker-url>/checkout-status"
```

Verwacht `available: true`. Gebruik daarna een officiële Stripe-testkaart, bijvoorbeeld:

```text
4242 4242 4242 4242
```

Gebruik een toekomstige vervaldatum, willekeurige CVC en geldige postcode.

## Moduscontrole vóór checkout

Controleer altijd dat deze combinatie klopt:

| Frontend key | Worker secret | Worker URL | Kaart |
|---|---|---|---|
| `pk_test_...` | `sk_test_...` | test-worker | testkaart |
| `pk_live_...` | `sk_live_...` | live-worker | echte kaart |

Een melding dat een testkaart in live mode is gebruikt betekent dat de Checkout Session met de live secret is aangemaakt. Meestal is dan de live website gebruikt, is `.env.production` geladen, of wijzen de frontend en Worker naar verschillende modi.

## Productdata

Iedere actieve productvariant moet een unieke product-ID en slug hebben. Gebruik nooit dezelfde ID voor een live product en een tijdelijke €1-testvariant. Anders kan de laatste sheetregel de prijs in de checkout overschrijven terwijl de productpagina een andere prijs toont.

Controleer vóór een test de `/products`-respons en archiveer tijdelijke testregels na afloop. De Worker moet de actuele prijs opnieuw valideren; een frontendprijs is nooit de bron van waarheid.

## Webhooks

Gebruik één test-webhook en één live-webhook. Beide hebben een eigen signing secret en wijzen naar de bijpassende Worker-omgeving. Beide kunnen luisteren naar `checkout.session.completed`.

Maak geen extra webhook aan als deze twee endpoints actief zijn. Controleer na een test de webhook delivery in de juiste Stripe-modus.

## Testisolatie en afronding

Een testomgeving hoort test-KV/cache, test-Stripe-secrets en bij voorkeur uitgeschakelde order-sync te gebruiken, zodat testbetalingen niet in live operationele data terechtkomen.

Na de test:

- controleer de betaling en webhook in Stripe Test mode;
- controleer dat live orders niet zijn gewijzigd;
- zet voor echte verkoop de Stripe Projects environment terug op `production`;
- start de productiebuild opnieuw;
- gebruik nooit een testkaart op de live site.
