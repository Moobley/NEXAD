# NEXAD — Digital Studio

Public site for NEXAD, a digital studio based in Las Palmas de Gran Canaria
combining marketing, software, data and product as one growth system
(**Growth, engineered.**).

Next.js 16 + React 19 + TypeScript strict, static export (`output: "export"`),
`next-intl` v4 (es / en / it, `localePrefix: "always"`).

## Environments

One live environment exists (plus optional local previews), switched with env
vars only (no code changes):

| | PRODUCTION |
|---|---|
| Hosting | Aruba static hosting |
| URL | `https://www.nexadlab.com` (canonical) |
| `NEXT_PUBLIC_BASE_PATH` | `""` |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://www.nexadlab.com` |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `false` until explicit go-live |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | off until explicit go-live |
| Deploy | local `npm run build` → upload `out/` via FileZilla |

There is **no CI/CD** and no GitHub Actions workflow. The production build is
done locally with `npm run build` (which reads `.env.production`), then the
contents of `out/` are uploaded manually to Aruba via FileZilla. The production
domain is decided but NOT live — indexing and form activation are separate,
explicit go-live steps.

Missing/empty values are fail-closed: an empty indexable flag stays `noindex`
and an empty form flag/ID keeps the contact form disabled. `lib/seo.ts` also
rejects any indexable build unless the origin is exactly
`https://www.nexadlab.com` with an empty basePath.

## Environment — Contact form

The Contact page submits to [Formspree](https://formspree.io) and requires a
public form ID at build time:

- Copy `.env.example` to `.env.local` and set
  `NEXT_PUBLIC_FORMSPREE_FORM_ID=<your-form-id>` for local development.
  For the production build, set it in `.env.production` (already configured).
  It is a public value — it ships in the page bundle — so it is not a secret.
- The real recipient inbox is `nexadlab@gmail.com`; it is configured inside
  the Formspree dashboard, never in the repository.
- Without the ID the page still builds and renders; submitting shows a
  controlled "not configured" state instead of pretending the message was sent.
- Anti-spam for the first release is the Formspree `_gotcha` honeypot already
  implemented in the form; no CAPTCHA is added. Re-evaluate only if real spam
  requires it.

## Commands

```bash
npm run dev        # local development (empty basePath)
npm run build      # production static export
npm run lint
npm run typecheck
npm run verify:seo # static SEO verifier against out/ (same env as the build)
```

Production build is done locally with `npm run build` (reads `.env.production`),
then upload `out/` to Aruba via FileZilla:

```bash
npm run build
```

## Project memory

See `AGENTS.md`, `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `docs/TODO.md`.