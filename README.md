# managed-sitebase-V2

Neutrale website- en webshop-template voor snelle klantstarts. Deze repo is opgeschoond van oude branding en gebruikt een centrale siteconfig voor merknaam, domein, logo en contactgegevens.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Cloudflare Pages / Functions / Worker-ready

## Snel starten

```sh
git clone <YOUR_GIT_URL>
cd managed-sitebase-V2
npm ci
npm run dev
```

## Siteconfig

De hoofdconfig staat in [src/lib/siteConfig.ts](./src/lib/siteConfig.ts).

Pas hier minimaal deze velden aan:

- `siteName`
- `siteSuffix`
- `siteUrl`
- `logoPath`
- `supportEmail`
- `fallbackLeadEmail`
- `phoneDisplay`
- `phoneHref`
- `whatsappHref`
- `legalName`
- `addressLine`
- `authorName`
- `authorRoleNl`
- `authorRoleEn`

## Nieuwe klant starten vanuit deze template

1. Maak een nieuwe repo vanaf deze template.
2. Clone die nieuwe repo lokaal.
3. Werk direct [src/lib/siteConfig.ts](./src/lib/siteConfig.ts) bij met de klantgegevens.
4. Vervang placeholder-copy op homepage, webshop, blog en footer.
5. Vervang `public/placeholder.svg` met het nieuwe logo of pas `logoPath` aan.
6. Controleer metadata, contactformulieren, worker-envs en checkout-URLs.
7. Draai `npm run build` voor verificatie.

## Template workflow notitie

Voor volgende keer:

1. Gebruik deze repo als GitHub template.
2. Nieuwe start:
   `gh repo create <owner>/<new-repo> --template <owner>/managed-sitebase-V2 --private --clone`
3. Daarna in de nieuwe clone direct de siteconfig invullen en de merkcopy vervangen.

## Verifiëren

```sh
npm run build
```
