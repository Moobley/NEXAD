# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Public marketing site for NEXAD, a digital studio (Las Palmas de Gran Canaria) that
combines marketing, software, data and product — **"Growth, engineered."**

Stack: Next.js 16 + React 19 + TypeScript strict, App Router, **static export**
(`output: "export"`, no server runtime, no middleware). `next-intl` v4 (es / en /
it). Tailwind v4 + shadcn (`base-nova`, `@base-ui/react`, lucide icons).

> **This is not the Next.js you know.** Next.js 16 has breaking changes vs.
> older versions. Read the relevant guide in `node_modules/next/dist/docs/`
> before writing Next.js code. `params` is async; heed deprecation notices.

## Commands

```bash
npm run dev          # local dev (empty basePath)
npm run build        # production static export -> out/
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier
npm run verify:seo   # static SEO verifier against out/ (same env as build)
```

There is **no automated test suite** and no CI. Before declaring work complete,
run `npm run lint && npm run typecheck && npm run build`. For routing/deployment/SEO
changes also run the env-specific builds and the SEO verifier (exact commands in
`AGENTS.md` "Verification").

## Big-picture architecture

**Two root layouts, two "sites" in one app.** The root `/` is the **Gateway** —
its own route group `app/(gateway)/` with a second root layout (carbon visual, no
site header/footer) that only offers ES/EN/IT selection; it never auto-redirects
by browser language. The localized site lives under `app/[locale]/` with the real
header/footer. Localized routes (`/es/*`, `/en/*`, `/it/*`) are directly
accessible and never intercepted by the Gateway. There is no `public/index.html`
and no locale middleware.

**i18n.** Locales `es` (default) / `en` / `it`, `localePrefix: "always"`. All
user-facing copy lives in `messages/{es,en,it}.json` (kept structurally
synchronized); never hardcode copy in components. Localized pages follow the
`setRequestLocale` + `generateStaticParams` pattern. Use `@/i18n/navigation`
helpers, not hand-built locale-prefixed URLs.

**Environments are switched by env vars only** (no code changes):

- **Production** — Aruba static hosting, `https://www.nexadlab.com` (canonical), empty basePath. Build is done **locally** (`npm run build`, which reads `.env.production`) and the contents of `out/` are uploaded manually via FileZilla. There is no CI/CD and no GitHub Actions workflow.
- There is no GitHub Pages preview. A preview build with a non-empty `NEXT_PUBLIC_BASE_PATH` is still possible (`/NEXAD`), but no automated workflow drives it.

`next.config.ts` sets `basePath` from `NEXT_PUBLIC_BASE_PATH`. **Never hardcode
`/NEXAD`** — use the `asset()` helper (`lib/asset.ts`) for public paths and
`@/i18n/navigation` for links.

**SEO** (`lib/seo.ts`) is environment-driven and **fail-closed**: an indexable
build (`NEXT_PUBLIC_SITE_INDEXABLE=true`) is only allowed on exactly
`https://www.nexadlab.com` with an empty basePath, else the build fails. Pages use
`generateMetadata` + the `seo` messages namespace, absolute canonicals, reciprocal
hreflang, Open Graph/Twitter, and a JSON-LD entity graph via stable `@id` nodes
(`entityId`).

**Content** (`content/projects.ts`) uses an explicit `type: "client" | "lab"`.
Corazón Napoletano = Client Work (real, approved metrics only); Barber Booking =
NEXAD Lab (in development, no clients/users/results). Never swap these or invent
clients/metrics/testimonials.

**Contact** submits to Formspree (client-side `fetch`), gated on
`NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` AND `NEXT_PUBLIC_FORMSPREE_FORM_ID`.
Pre-launch it stays off. Anti-spam is the `_gotcha` honeypot — no CAPTCHA.
Recipient `nexadlab@gmail.com` is configured in the Formspree dashboard, never in
code.

Path alias `@/*` maps to the repo root.

## Guardrails

- Never invent clients, metrics, revenue, testimonials, certifications, users, or results. Don't present Barber Booking as client work.
- Don't re-expand the intentionally compressed institutional pages (see "Page roles" in `AGENTS.md`).
- Don't add new dependencies without a concrete need; don't add CAPTCHA; don't change DNS/custom domain, set indexing, or enable the contact form without explicit go-live approval.
- Design language, brand tokens, the Forward D / `ForwardMark` / `SignalDot` system, and copy rules are defined in `AGENTS.md` — follow them rather than inventing new visual systems.

## Project memory

For broad architectural, UX, or cross-page tasks, read (and keep updated):

- `AGENTS.md` — canonical rules (routing, i18n, SEO, design language, content integrity)
- `docs/PROJECT_STATE.md` — how the site is built today
- `docs/DECISIONS.md` — intentional decisions and reasons (NEXAD era: D-023 onward)
- `docs/TODO.md` — roadmap

Do not rescan the whole repo per task; read only the relevant implementation files
plus the project memory needed to understand it.
