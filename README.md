# NEXAD — Digital Studio

Public site for NEXAD, a digital studio based in Las Palmas de Gran Canaria
combining marketing, software, data and product as one growth system
(**Growth, engineered.**).

Next.js 16 + React 19 + TypeScript strict, static export (`output: "export"`),
`next-intl` v4 (es / en / it, `localePrefix: "always"`).

## Environments

Two environments exist; the architecture moves between them with env vars
only (no code changes):

| | PREVIEW | PRODUCTION |
|---|---|---|
| Hosting | GitHub Pages | Aruba static hosting via FTPS |
| URL | `https://moobley.github.io/NEXAD/` | `https://www.nexadlab.com` (canonical) |
| `NEXT_PUBLIC_BASE_PATH` | `/NEXAD` | `""` |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://moobley.github.io` | `https://www.nexadlab.com` |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `false` | `false` until explicit go-live |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | off | off until explicit go-live |
| Trigger | automatic on push to `master` | manual (`workflow_dispatch`) |

The GitHub Pages preview is temporary and pre-launch: it stays `noindex, follow`
and the contact form stays disabled. The production domain is decided but NOT
live — indexing and form activation are separate, explicit go-live steps.

## Workflows

- `.github/workflows/deploy.yml` — GitHub Pages preview (automatic).
- `.github/workflows/deploy-aruba.yml` — Aruba production (manual only). It
  builds the production static export with the env above, verifies `out/`,
  runs the static SEO verifier, then uploads **only the contents of `out/`**
  to Aruba via FTPS. It never deletes anything already on the hosting space
  (`dangerous-clean-slate` is not used).

### Aruba configuration (GitHub Actions)

Secrets (Settings → Secrets and variables → Actions → Secrets):

- `ARUBA_FTP_USERNAME`
- `ARUBA_FTP_PASSWORD`

Variables (Settings → Secrets and variables → Actions → Variables):

- `ARUBA_FTP_SERVER` — FTP host from the Aruba hosting panel
- `ARUBA_FTP_PORT` — `21` (Aruba FTPS = explicit TLS on port 21); adjust to the plan
- `ARUBA_FTP_PROTOCOL` — `ftps` (preferred) / `ftp` / `ftps-legacy`
- `ARUBA_FTP_SERVER_DIR` — remote directory, must end with `/` (e.g. `/httpdocs/`)
- `NEXT_PUBLIC_FORMSPREE_FORM_ID` — public Formspree form ID (not a secret)
- `NEXT_PUBLIC_CONTACT_FORM_ENABLED` — keep `false`
- `NEXT_PUBLIC_SITE_INDEXABLE` — keep `false`

Missing/empty values are fail-closed: an empty indexable flag stays `noindex`
and an empty form flag/ID keeps the contact form disabled. `lib/seo.ts` also
rejects any indexable build unless the origin is exactly
`https://www.nexadlab.com` with an empty basePath.

## Environment — Contact form

The Contact page submits to [Formspree](https://formspree.io) and requires a
public form ID at build time:

- Copy `.env.example` to `.env.local` and set
  `NEXT_PUBLIC_FORMSPREE_FORM_ID=<your-form-id>` for local development.
- For the GitHub Pages deploy, add the same value as a **repository variable**
  named `NEXT_PUBLIC_FORMSPREE_FORM_ID`
  (`Settings → Secrets and variables → Actions → Variables`). It is a public
  value (it ships in the page bundle), so a variable — not a secret — is the
  correct choice. The deploy workflows inject it during `npm run build`.
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

Preview build:

```bash
NEXT_PUBLIC_BASE_PATH=/NEXAD NEXT_PUBLIC_SITE_ORIGIN=https://moobley.github.io NEXT_PUBLIC_SITE_INDEXABLE=false npm run build
```

Aruba production build (pre-go-live, noindex + form off):

```bash
NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_ORIGIN=https://www.nexadlab.com NEXT_PUBLIC_SITE_INDEXABLE=false NEXT_PUBLIC_CONTACT_FORM_ENABLED=false npm run build
```

## Project memory

See `AGENTS.md`, `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `docs/TODO.md`.