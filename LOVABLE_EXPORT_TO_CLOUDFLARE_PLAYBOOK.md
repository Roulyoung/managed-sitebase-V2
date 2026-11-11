# Lovable Export -> Cloudflare Playbook

Doel: een Lovable export snel omzetten naar een stabiele, goed bewerkbare codebase die netjes draait op Cloudflare Pages.

## Wanneer je dit gebruikt

- Je krijgt een Lovable export (`zip` of repo) als startpunt.
- Je wilt de stijl 1-op-1 behouden, maar de code beter onderhoudbaar maken.
- Je wilt deployen via Cloudflare Pages (niet via Lovable publish of alleen GitHub Pages).

## Aanbevolen startstructuur

1. Bewaar de ruwe export als referentie, bijvoorbeeld `project-main/`.
2. Werk in een aparte map/repo voor productie, bijvoorbeeld `project/`.
3. Gebruik `managed-sitebase-V2` als standaard baseline voor infra, docs en deploy discipline.

## Kernstappen

1. Zet de ruwe Lovable export neer als read-only referentie.
2. Zet de werkrepo op en kopieer alleen de benodigde sitecode over:
   - `src/components/*`
   - `src/pages/*`
   - `src/assets/*`
   - relevante CSS/tailwind tokens
3. Houd infra-bestanden expliciet onder controle:
   - routing base
   - redirects
   - metadata/canonical
   - CI/deploy workflow
4. Verplaats domein-, API- en worker-URLs naar env/config.
5. Test lokaal (`npm run dev`) en build (`npm run build`) voor deploy.

## Routing/Base regels (belangrijk)

### Cloudflare Pages met custom domain (voorkeur)

- Gebruik root base.
- `BrowserRouter` op `import.meta.env.BASE_URL` laten staan.
- Houd fallback redirects in `public/_redirects`.

Voorbeeld:

```ts
<BrowserRouter basename={import.meta.env.BASE_URL}>
```

### Subpath hosting (zoals GitHub Pages)

Gebruik een dynamische base in Vite en normaliseer in de router:

```ts
// vite.config.ts
base: mode === "development" ? "/" : process.env.VITE_BASE ?? "/repo-name/",
```

```ts
// App.tsx
const rawBase = import.meta.env.BASE_URL || "/";
const normalizedBase = rawBase.replace(/\/+$/, "");
const routerBase = normalizedBase === "" || normalizedBase === "/" ? undefined : normalizedBase;
<BrowserRouter basename={routerBase}>
```

## Redirects (SPA + canonical)

Zorg minimaal voor SPA fallback:

```txt
/* /index.html 200
```

Voor productie met custom domain: volg ook canonical redirectregels uit `CLIENT_ONBOARDING_DNS_AND_GO_LIVE_PLAYBOOK.md` (apex/www/http/pages.dev -> 1 canonieke host).

## SEO/metadata cleanup na export

Controleer altijd:

- `<link rel="canonical">` staat op echt productiedomein.
- `og:image` en `twitter:image` wijzen niet naar `lovable.dev`.
- titel/description/keywords zijn klant-specifiek.

## Content onderhoudbaar maken (aanrader)

Na de eerste stabilisatie:

1. Verplaats lange teksten naar 1 content-bestand (bijv. `src/content/siteContent.ts`).
2. Laat componenten vooral layout/rendering doen.
3. Behoud style tokens en class-structuur om design exact te houden.

## Patroon uit praktijk (Chris Raufheisen)

Wat daar werkte:

- hardcoded router basename vervangen door env-gedreven base normalisatie
- Vite base opsplitsen naar dev vs production
- deploy pad expliciet maken per host-type

Resultaat: dezelfde look & feel, minder deploy-frictie, beter lokaal bewerken.

## Definition of Done

- Site draait lokaal zonder path issues.
- `npm run build` slaagt.
- Custom domain en pages.dev gedragen zich volgens canonical plan.
- Geen hardcoded client-specifieke worker URL in herbruikbare code.
- Template docs zijn ingevuld: `PROJECT_KEYS_REGISTER.md`, `PROJECT_SECRETS_PLAYBOOK.md`, `GOOGLE_SHEETS_ACCESS.md`.
