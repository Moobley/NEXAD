# NEXO Project State

Snapshot of how NEXO is built today. Stable rules live in `AGENTS.md`;
intentional decisions and reasons in `DECISIONS.md`; roadmap in `TODO.md`.

## Product

Public site for NEXO, a digital studio based in Las Palmas de Gran Canaria.
The root `/` is the NEXO Gateway (language entry point); the localized site
(ES / EN / IT) is the app. Institutional pages were deliberately compressed
(see Current page architecture).

## Positioning

Digital studio combining Strategy, Marketing, Content and Technology.
Hospitality is the first proof/case study, not the market limit. Services:
Digital Strategy; Paid Media/Growth (Meta Ads, Google Ads, other channels only
when appropriate); Social/Content; Web/Digital Experiences;
Software/Automation. Engagement: one-off projects and retainers.

NEXO is early-stage: core team (Alessandro — marketing/brand; Lorenzo —
full-stack dev) plus external collaborators when needed. Never presented as a
large structured company.

## Stack

- Next.js 16 (`16.2.6`), React 19 (`19.2.4`), TypeScript strict, App Router.
- `next-intl` v4 (`^4.14.1`).
- Tailwind v4 + existing design system (shadcn `base-nova`, `@base-ui/react`,
  lucide icons).
- Static export (`output: "export"`). No automated test suite configured.

## Localization

- Locales: `es` (default), `en`, `it`.
- `localePrefix: "always"` → URLs are always `/es/…`, `/en/…`, `/it/…`.
- All UI copy lives in `messages/{es,en,it}.json` (structurally synchronized).
  Localized pages under `app/[locale]/` follow the `setRequestLocale` +
  `generateStaticParams` pattern.

## Routing and deployment

- `next.config.ts`: `output: "export"`, `trailingSlash: true`,
  `images.unoptimized: true`, `basePath` from `NEXT_PUBLIC_BASE_PATH`.
- Local/dev: empty basePath. GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/NEXO`
  injected at build. `/NEXO` is never hardcoded in components (use
  `asset()`/`@/i18n/navigation`).
- Two root layouts: `app/(gateway)/` (the `/` Gateway, own `<html>/<body>`,
  obsidian, no site header/footer) and `app/[locale]/` (localized site with
  header/footer).
- Deploy: GitHub Actions on `master` (`lint` → `typecheck` → build → publish
  `out/`). GitHub Pages is temporary; the architecture must move cleanly to a
  custom domain with empty basePath.

## Gateway

The root `/` is an intentional Gateway, not a localized homepage.

- Allows ES / EN / IT selection; browser language is only a suggestion.
- No automatic language redirect; no `public/index.html`; no middleware.
- Session UX via `sessionStorage` keys:
  - `nexo_gateway_seen` — intro already seen;
  - `nexo_gateway_entered` — a language was chosen this session;
  - `nexo_gateway_return_path` — pending deep-link route (locale stripped).
- Deep link behavior: a fresh-session localized deep link
  (e.g. `/es/work/barber-booking/`) passes through the Gateway; after the
  user picks a language the same conceptual route is restored in that language
  (e.g. `/it/work/barber-booking/`). After a choice, internal navigation and
  reloads do not return to the Gateway.
- Guard: `components/gateway/gateway-guard.tsx`, an inline script at the start
  of the `[locale]` body. Client-side, fail-open, static-export compatible.
  `?direct=1` bypasses it for QA/technical access. With JS disabled the
  localized page renders normally.
- Gateway SEO is intentionally unresolved (deferred to Technical SEO).

## Current page architecture

Pages were editorially compressed; do not re-expand without reason.

- Services: Hero → 5 Capabilities → System → Collaboration → CTA.
- Studio: Hero → Why NEXO → Team → 4 Principles → Network → CTA.
- Work: short Hero → Corazón → Barber.
- Contact: compact Hero → Form.

## Work / case studies

`content/projects.ts` uses an explicit `type: "client" | "lab"`.

- **Corazón Napoletano** — Client Work. Real project in Las Palmas (logo,
  brand identity, physical applications, menu, upselling, QR, site, booking,
  content, reel, production, Meta Ads, Google Ads, strategy). Approved
  publishable result: +20% revenue from the following month — always framed as
  project-specific, never a general promise. Client site:
  `corazonnapoletano.com`.
- **Barber Booking** — NEXO Lab. Personal demo product for barber shops,
  adaptable to other appointment businesses; in development; no clients, users
  or commercial results. Confirmed features: online booking, service
  selection, barber selection, availability calendar, admin dashboard,
  services/prices management, staff management, customers, cancel/modify
  appointment, statistics, auth/login. Not claimed: payments, email/SMS/
  WhatsApp reminders, AI.

## Contact

- Client-side form submitting to Formspree via `fetch`
  (`NEXT_PUBLIC_FORMSPREE_FORM_ID`, public repo variable injected at build).
- Fields: name, email, business/project, business stage (new opening /
  existing / software product / other), optional multiple services, message.
  No budget, timing or phone.
- States: loading, success, error (code also handles a "not configured" state).
- Formspree production must not be considered active before the Privacy/Legal
  pass. Public email, WhatsApp, call-booking CTA and CAPTCHA are still pending.

## Assets

- `public/logos/` — NEXO wordmark SVGs (ivory / obsidian / ivory-on-obsidian).
- `public/projects/barber/customer/` — 3 real mobile screenshots (Spanish,
  demo data, WebP): `service-selection`, `availability`, `booking-summary`.
- `public/projects/corazon/` — real logo assets (`logoCN.webp`,
  `logoCNxNexo.png`); full photography not mounted yet.
- All public paths go through the `asset()` helper (`lib/asset.ts`); asset
  paths must remain basePath-safe.

## Design system

- Tokens (in `app/globals.css`): `obsidian`, `ivory`, `lilac`, `iris`.
- Fonts: Familjen Grotesk, Instrument Serif (italic accents), Geist Mono.
- Direction: editorial, typographic, premium; hairlines, mono labels, serif
  italic accents, controlled motion.
- Avoid: generic SaaS cards, stock imagery, gratuitous gradients, cyberpunk /
  hacker clichés, heavy animations, new dependencies.

## Current constraints

- Static export only — no middleware, no server-only routing, no `public/
  index.html`; localized pages must remain available without JS.
- `/NEXO` must never be hardcoded; future custom domain must drop the basePath
  without code changes.
- No invented clients, metrics, testimonials, results, features or company
  data. Copy ES/EN/IT is natural localization, not literal translation.
- Institutional pages stay compressed.

## Known paused items

- **Corazón Real Asset Pass** — paused until enough real photography/material
  is available. Not a blocker.
- **Barber Business Real Assets** — paused/optional; blocked by the Barber
  backend admin login (`400 "No active transaction for update or delete
  query"`). Business side keeps the abstract `DashboardUi` for now.