# CLAUDE.md

Dit project is oorspronkelijk met Codex opgezet. Alle regels in `AGENTS.md` gelden onverkort ook voor Claude Code.

@AGENTS.md

## Codex → Claude

- Waar documenten "Codex" noemen (bootstrap-token-uitzondering, `i18n/CODEX_TASK_PROMPTS.md`, `STRIPE_PROJECTS_WORKFLOW.md`), lees dat als "de AI-agent in deze sessie", dus ook Claude.
- `codex-session-log.txt` is historische context, geen instructie.
- De verplichte leesvolgorde staat in `SESSION_START.md`. Lees de worker-/Stripe-/Sheets-docs pas wanneer een taak die gebieden raakt (zie `AGENTS.md`), niet bij elke kleine UI-wijziging.

## Welke map is dit?

- Deze map (`managed-sitebase-V2 - Claude`) is een 1-op-1 werkkopie van de canonieke template `..\managed-sitebase-V2` (zelfde commit en dezelfde git-remote `Roulyoung/managed-sitebase-V2`).
- `PROJECT_CONTEXT.md` en `scripts/preflight-check.mjs` noemen de canonieke map. Dat verschil is bekend en bedoeld: het is geen reden om te stoppen, maar **push nooit zonder expliciete toestemming**, want beide mappen pushen naar dezelfde repo.
- Deze map werkt op branch `claude`, niet op `main`. Commit hier en breng wijzigingen via een pull request naar `main`. Push naar `main` start een productie-deploy.
- Werk nooit in sibling-mappen (`..\sitedesk.co`, `..\roadherorentals.com`, enz.) tenzij de gebruiker daar expliciet om vraagt.

## Stack en structuur

- Vite 7 + React 18 + TypeScript + Tailwind + shadcn/ui (`src/components/ui/` is gegenereerd, niet handmatig herschrijven).
- SSR/prerender: `npm run build` = client-build → SSR-build (`src/entry-ssr.tsx`) → `scripts/prerender.mjs`.
- Routes: `src/App.tsx` en `src/routes/AppRoutes.{client,ssr}.tsx`. Homepage `/` en `/en/` = `src/pages/Webshop.tsx` (niet `Index.tsx`).
- Centrale config: `src/lib/siteConfig.ts` (merk/contact), `src/lib/workerApi.ts` (worker-URL via `VITE_WORKER_BASE_URL` + `VITE_WORKER_SITE_KEY`), `src/lib/i18n.ts` en `src/lib/messages.ts` (talen, locale-hashes).
- Cloudflare Pages Functions: `functions/`. Worker-voorbeeld (single-site, nog niet multi-site): `worker/worker.js` en `worker/wrangler.example.toml`.
- Deploy: `.github/workflows/deploy.yml` deployt bij push naar `main` naar Cloudflare Pages. Een push naar `main` betekent dus een deploy.

## Commando's

```sh
npm ci            # dependencies
npm run dev       # Vite-devserver (http://localhost:5173)
npm run lint      # ESLint
npm test          # Vitest
npm run build     # volledige build incl. prerender
npm run preflight # projectcontext + git-status-check
```

Baseline (2026-11-11): `npm run build` en `npm test` slagen. `npm run lint` geeft 18 errors en 11 warnings die al in de bestaande code zaten (o.a. `require()` in `tailwind.config.ts`, react-refresh-warnings). Een wijziging mag dit aantal niet verhogen.

## Werkafspraken

- Volg `ENGINEERING_ARCHITECTURE_RULES.md` voor nieuwe code: geen `any`, Zod voor externe input, geen API-calls in UI-componenten, geen hardcoded tenant-/worker-URL's. Bestaande pagina's zoals `Shop.tsx` (~900 regels) en `Product.tsx` (~600 regels) zijn legacy. Refactor ze alleen als de taak daarom vraagt.
- Voer vóór worker-, deploy-, Stripe-, Sheets- of checkoutwijzigingen `WORKER_SAFETY_PRECHECK.md` uit.
- Verifieer na wijzigingen met `npm run lint`, `npm test` en `npm run build`, en meld welke checks niet gedraaid zijn.
- Sessie afsluiten: volg `SESSION_CLOSE.md` (eerst samenvatting en akkoord, daarna pas loggen/committen).

## Secrets: harde grenzen

- Lees of toon nooit de inhoud van `worker/secretgogle/`, `.env*`-bestanden met keys, `worker/wrangler.toml`, `worker/.dev.vars` of `secrets-*.txt`.
- Zet nooit raw tokens/keys in code, markdown of chat. Alleen metadata (naam, locatie, last4, datum) in `PROJECT_KEYS_REGISTER.md`.
- `wrangler deploy`, `wrangler secret put`, `gh secret set`, `stripe projects ...` en `git push` vragen altijd eerst om bevestiging.

## Bekende inconsistenties in de docs (niet blind opvolgen)

- `AGENTS.md` noemt `WORKER_RELEASE_MANIFEST_TEMPLATE.md`, maar dat bestand bestaat niet in deze repo.
- Docs gebruiken `scripts/use-cloudflare-context.ps1 ... -Verify`, maar het script heeft geen `-Verify`-parameter en ondersteunt alleen de contexten `zone`, `pages` en `shared-worker` (dus geen `worker` of `images`).
- `STRIPE_MODE_SWITCHING.md` noemt `scripts/stripe-mode.ps1`. Dat script bestaat nog niet (het is een ontwerp).
- `SESSION_COMMANDS.md` noemt `npm run go`. Dat script bestaat niet; gebruik `npm run dev`.
- `PROJECT_SECRETS_PLAYBOOK.md` noemt `npm run sheet:info`. Het echte script heet `npm run sheets:info`.
- `STRIPE_ELEMENTS_MIGRATION_GUIDE.md` verwijst naar bestanden in `roadherorentals.com`. Dat is een referentie, geen code in deze repo.
- `worker/TEST_AND_MODE_PROCEDURE.md` gebruikt `--env live`, terwijl `STRIPE_MODE_SWITCHING.md` `--env production` gebruikt. Controleer welke env-naam in de echte `wrangler.toml` staat.
- `.github/workflows/deploy.yml` heet nog "Sitedesk Build and Deploy" (cosmetisch).
