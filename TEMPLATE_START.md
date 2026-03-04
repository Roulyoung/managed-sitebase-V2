# Template Start

Dit project is bedoeld als vaste managed site-base voor nieuwe bedrijven.

## Waar begin je

Eerst aanpassen:

- [src/lib/siteConfig.ts](./src/lib/siteConfig.ts)
- [index.html](./index.html) alleen als je extra default metadata wilt wijzigen
- [src/pages/Index.tsx](./src/pages/Index.tsx)
- [src/pages/Webshop.tsx](./src/pages/Webshop.tsx)
- [src/pages/Blog.tsx](./src/pages/Blog.tsx)
- [src/pages/BlogPost.tsx](./src/pages/BlogPost.tsx)

## Belangrijk principe

Alle vaste merkgegevens horen in `siteConfig.ts`. Dus niet opnieuw hardcoden in componenten of pagina's.

## Nieuwe repo starten vanaf template

Aanpak:

1. Maak een nieuwe GitHub repo op basis van deze template.
2. Clone die repo lokaal.
3. Vul eerst `src/lib/siteConfig.ts` in.
4. Vervang daarna logo, kleuren, copy, juridische links en eventuele shop/productdata.

CLI voorbeeld:

```sh
gh repo create <owner>/<nieuwe-repo> --template <owner>/managed-sitebase-V2 --private --clone
```

## Minimale checklist

- Merknaam klopt
- Domein klopt
- Logo klopt
- Mail en telefoon kloppen
- WhatsApp-link klopt
- Footer en metadata kloppen
- `npm run build` slaagt
