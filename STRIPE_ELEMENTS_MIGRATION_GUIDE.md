# Stripe Checkout -> Stripe Elements migratie

Deze handleiding beschrijft hoe deze site is omgebouwd van Stripe Checkout redirect naar Stripe Payment Element, en hoe je dat snel opnieuw doet in projecten met dezelfde structuur.

## Doel

Oude flow:

1. frontend stuurt cart naar `/create-checkout-session`
2. worker maakt Stripe Checkout Session
3. klant wordt doorgestuurd naar Stripe-hosted checkout
4. webhook verwerkt `checkout.session.completed`

Nieuwe flow:

1. cart-pagina valideert booking
2. frontend route `/checkout` vraagt `clientSecret` op via `/create-payment-intent`
3. Stripe `PaymentElement` rendert op de site zelf
4. `stripe.confirmPayment()` handelt de betaling af
5. success-pagina roept `/confirm-payment` aan om de booking direct vast te leggen
6. webhook blijft actief als fallback en voor compatibiliteit

## Wat we hier concreet aangepast hebben

Frontend:

- nieuwe route `/checkout` met `Elements` en `PaymentElement`
- `VITE_STRIPE_PUBLISHABLE_KEY` toegevoegd
- worker base URL centraal gehouden via `src/lib/workerApi.ts`
- cart-flow eerst laten valideren via `/availability-check`
- success-pagina laat na betaling nog een server-call doen naar `/confirm-payment`

Worker:

- bestaand endpoint `/create-checkout-session` niet verwijderd
- nieuw endpoint `/create-payment-intent` toegevoegd
- nieuw endpoint `/confirm-payment` toegevoegd
- webhook uitgebreid zodat ook `payment_intent.succeeded` verwerkt wordt
- metadata-opbouw hergebruikt zodat booking-sync dezelfde velden houdt

## Bestandsreferentie in dit project

- frontend checkout: [src/pages/Checkout.tsx](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\src\pages\Checkout.tsx)
- success sync: [src/pages/Success.tsx](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\src\pages\Success.tsx)
- worker endpoints: [worker/worker.js](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\worker\worker.js)
- worker URL helper: [src/lib/workerApi.ts](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\src\lib\workerApi.ts)
- publishable key helper: [src/lib/stripe.ts](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\src\lib\stripe.ts)
- booking-validatie: [src/lib/checkoutValidation.ts](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\src\lib\checkoutValidation.ts)
- status/notities: [CHECKOUT_STATUS.md](C:\Users\micro\Documents\Codex CLI websites\Websites\roadherorentals.com\CHECKOUT_STATUS.md)

## Snelle implementatie voor vergelijkbare websites

### 1. Dependencies controleren

Benodigd in het frontend project:

- `@stripe/react-stripe-js`
- `@stripe/stripe-js`

Benodigd in worker/backend:

- `stripe`

### 2. Frontend env toevoegen

Voeg toe:

```env
VITE_WORKER_BASE_URL=https://jouw-worker-url.workers.dev
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_of_test_xxx
```

Maak een helper zoals:

```ts
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
export const hasStripePublishableKey = () => Boolean(STRIPE_PUBLISHABLE_KEY.trim());
```

### 3. Worker endpoints uitbreiden, niet vervangen

Laat het bestaande redirect-endpoint bestaan:

- `/create-checkout-session`

Voeg toe:

- `/create-payment-intent`
- `/confirm-payment`

Belangrijk voor sites op dezelfde structuur:

- breek oude sites niet
- voeg Elements toe als extra checkout-pad
- hergebruik bestaande metadata-velden zodat Sheets/admin/webhooks niet opnieuw ontworpen hoeven worden

### 4. PaymentIntent endpoint bouwen

Het endpoint moet:

1. cart + booking details ontvangen
2. cart opnieuw server-side valideren
3. bedrag bepalen dat nu betaald moet worden
4. Stripe PaymentIntent maken
5. `clientSecret` teruggeven

Minimale shape:

```json
{
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_...",
  "amountDueNowCents": 5000,
  "cart": []
}
```

In dit project gebruikt de worker:

- `automatic_payment_methods.enabled = true`
- `allow_redirects = "never"`

Dat past goed bij een embedded Payment Element flow.

### 5. Checkout route toevoegen

De frontend `/checkout` pagina doet hier drie dingen:

1. cart laden uit local storage/state
2. booking nogmaals laten valideren
3. `clientSecret` ophalen en `PaymentElement` renderen

Basisschema:

```tsx
const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);

<Elements stripe={stripePromise} options={{ clientSecret }}>
  <CheckoutForm />
</Elements>
```

In het formulier:

```tsx
const result = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: successUrl,
  },
});
```

### 6. Success-pagina gebruiken voor directe booking-sync

Dit was hier een belangrijke wijziging.

In plaats van alleen op de webhook te vertrouwen:

1. Stripe stuurt terug naar `/success?...&payment_intent=...`
2. frontend leest `payment_intent` uit de querystring
3. frontend roept `/confirm-payment` aan
4. worker haalt de PaymentIntent op en schrijft de booking weg

Waarom dit nuttig is:

- de klant ziet direct of de boeking echt verwerkt is
- je bent minder afhankelijk van webhook-timing
- je kunt een retry-knop tonen als sync faalt

### 7. Webhook compatibel houden

Webhook blijft nodig.

Ondersteun minimaal:

- `checkout.session.completed`
- `payment_intent.succeeded`

In deze repo mappen beide events uiteindelijk naar hetzelfde order-record model. Dat is de juiste aanpak voor andere projecten met dezelfde admin- of sheetstructuur.

### 8. Metadata consistent houden

Stop in de PaymentIntent metadata dezelfde kernvelden als je eerder in Checkout Session metadata gebruikte, bijvoorbeeld:

- product of vehicle id
- naam
- huurstart
- huureinde
- aantal dagen
- klantnaam
- klantmail
- klanttelefoon
- betaalbedrag nu
- totaalbedrag

Als je dit consistent houdt:

- hoef je `persistOrderRecord`
- `appendOrderRow`
- admin-schermen
- sync queues

nauwelijks aan te passen.

## Snelle migratievolgorde voor een ander project

1. Laat bestaande Stripe Checkout redirect-code staan.
2. Voeg publishable key env toe aan frontend.
3. Voeg `create-payment-intent` toe aan de worker.
4. Voeg `confirm-payment` toe aan de worker.
5. Breid webhook uit met `payment_intent.succeeded`.
6. Maak een `/checkout` pagina met `Elements` + `PaymentElement`.
7. Laat cart of booking-pagina eerst server-side valideren.
8. Laat success-pagina de booking syncen met `paymentIntentId`.
9. Test met Stripe testkaart en controleer of de booking ook echt in Sheets of admin verschijnt.

## Dingen die je niet moet vergeten

- `VITE_STRIPE_PUBLISHABLE_KEY` moet in local en deployment staan
- worker moet `STRIPE_SECRET_KEY` en `STRIPE_WEBHOOK_SECRET` hebben
- success URL moet terugkomen op een pagina die `payment_intent` kan uitlezen
- bij booking-sites moet je beschikbaarheid server-side valideren, niet alleen in de frontend
- als je een gedeelde worker gebruikt: voeg endpoints backward compatible toe, niet site-specifiek hardcoderen

## Praktische vuistregel

Voor projecten met vrijwel dezelfde structuur kun je deze conversie meestal uitvoeren zonder de hele checkout-flow te herschrijven:

1. behoud cart-state en booking-details opslag
2. vervang alleen de betaalstap
3. voeg twee worker-endpoints toe
4. laat success de definitieve sync doen
5. houd webhook als fallback

Dat is precies hoe deze site is omgezet.
