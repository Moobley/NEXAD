# NEXAD Project State

Snapshot of how NEXAD is built today. Stable rules live in `AGENTS.md`;
intentional decisions and reasons in `DECISIONS.md`; roadmap in `TODO.md`.
Historical NEXO entries (D-001 … D-022) are kept for context; the current
state is NEXAD (D-023).

## Product

Public site for NEXAD, a digital studio based in Las Palmas de Gran Canaria
combining marketing, software, data and product as one growth system
(**Growth, engineered.**). The root `/` is the NEXAD Gateway (language entry
point); the localized site (ES / EN / IT) is the app. Institutional pages were
deliberately compressed (see Current page architecture).

## Positioning

Studio where marketing, software, data and product are parts of the same
growth system. Hospitality is the first proof/case study, not the market
limit. Services: Digital Strategy; Paid Media/Growth (Meta Ads, Google Ads,
other channels only when appropriate); Social/Content; Web/Digital
Experiences; Software/Automation. Brand architecture vocabulary: NEXAD Growth
(marketing/strategy/paid/content), NEXAD Build (web/products/interfaces/
software), NEXAD Systems (automation/internal tools/booking/workflows) — used
as vocabulary, not as extra pages. Engagement: one-off projects and retainers.

NEXAD is early-stage: core team (Alessandro — marketing/brand; Lorenzo —
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
- Local/dev: empty basePath. GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/NEXAD`
  injected at build. `/NEXAD` is never hardcoded in components (use
  `asset()`/`@/i18n/navigation`).
- Two root layouts: `app/(gateway)/` (the `/` Gateway, own `<html>/<body>`,
  carbon, no site header/footer) and `app/[locale]/` (localized site with
  header/footer).
- Deploy: GitHub Actions on `master` (`lint` → `typecheck` → build → publish
  `out/`). GitHub Pages is temporary; the architecture must move cleanly to a
  custom domain with empty basePath.

## Gateway

The root `/` is an intentional Gateway, not a localized homepage.

- Shows the NEXAD wordmark with the **Signal → Forward** intro: the complete
  D opens centered in Signal, holds, then travels right into its wordmark
  slot while handing Signal to Ivory; N E X A reveals as one group; the
  language selector settles (total ≈3.7s; a short variant for returning
  sessions; reduced-motion shows the final wordmark statically). After the
  intro the gateway stays alive: grid drift, glow drift, breathing network
  nodes, and the Signal Forward mark pulsing.
- Allows ES / EN / IT selection; browser language is only a suggestion.
- No automatic language redirect; no `public/index.html`; no middleware.
- **Root-only**: `/es/*`, `/en/*` and `/it/*` are directly accessible and are
  never intercepted by the Gateway (no deep-link guard, no `?direct=1`).
- `sessionStorage` used only for `nexad_gateway_seen`; the legacy
  `nexo_gateway_seen` key is still recognized during the migration and the new
  key is written.
- Language links are real links usable without JS: `/` → choose ES → `/es/`,
  etc., basePath-aware. A click adds a forward exit cue before navigation
  (progressive enhancement only).
- Gateway SEO is implemented (canonical `/`, hreflang cluster, robots,
  Open Graph, Twitter). Descriptor: `GROWTH, ENGINEERED.`

## SEO

Environment-driven foundation via `lib/seo.ts`:

- `NEXT_PUBLIC_SITE_ORIGIN` — public origin (scheme + host, no basePath).
  GitHub Pages: `https://moobley.github.io`; custom domain later (not decided).
- `NEXT_PUBLIC_SITE_INDEXABLE` — `"true"` enables index/follow; anything else
  (default) produces `noindex, follow`.
- `NEXT_PUBLIC_BASE_PATH` — deployment prefix (GitHub Pages `/NEXAD`).

Implementation:

- Page-specific `generateMetadata` for Gateway, Home, Services, Studio, Work,
  Contact, Corazón, Barber; copy in the `seo` messages namespace (ES/EN/IT).
- Absolute self-referencing canonicals; reciprocal hreflang `es` / `en` / `it`
  + `x-default` (Gateway root for the home cluster; `es` fallback for internal
  routes).
- Open Graph + Twitter (`summary_large_image`) pointing to
  `public/social/nexad-social.png` (1200×630, carbon/ivory preview with the
  Forward D and `GROWTH, ENGINEERED.`).
- Minimal `WebSite` JSON-LD at the Gateway root (`name`, `url` from
  `siteUrl("/")`, `inLanguage: ["es", "en", "it"]`). No other schema.
- `app/sitemap.ts` (22 canonical URLs) and `app/robots.ts` (allow-all). No
  `Disallow: /`. While noindex, `robots.txt` does NOT announce the sitemap.
- Favicon via `app/icon.svg` (Forward D mark on carbon; basePath handled by
  Next).

Indexability is fail-closed: an indexable build requires an explicit, valid,
https `NEXT_PUBLIC_SITE_ORIGIN` (no basePath/pathname/credentials/query/hash);
the build fails otherwise. The `localhost` origin fallback is only allowed for
non-indexable development builds.

## Current deployment

GitHub Pages is intentionally **noindex** until explicit production
activation (`NEXT_PUBLIC_SITE_INDEXABLE=false` in the deploy workflow). The
sitemap is generated (22 URLs) but not advertised while noindex and not
submitted to Search Console.

## Current page architecture

Pages were editorially compressed; do not re-expand without reason.

- Services: Hero → 5 Capabilities → System → Collaboration → CTA.
- Studio: Hero → Why NEXAD → Team → 4 Principles → Network → CTA.
- Work: short Hero → Corazón → Barber.
- Contact: compact Hero → Form.

## Work / case studies

`content/projects.ts` uses an explicit `type: "client" | "lab"`.

- **Corazón Napoletano** — Client Work. Real project in Las Palmas (logo,
  brand identity, physical applications, menu, upselling, QR, site, booking,
  content, reel, production, Meta Ads, Google Ads, strategy). Approved
  publishable result: +20% revenue from the following month — always framed as
  project-specific, never a general promise. Client site:
  `corazonnapoletano.com`. `public/projects/corazon/logoCNxNexo.png` is a real
  NEXO-era co-branded asset that still needs a real NEXAD update.
- **Barber Booking** — NEXAD Lab. Personal demo product for barber shops,
  adaptable to other appointment businesses; in development; no clients, users
  or commercial results. Confirmed features: online booking, service
  selection, barber selection, availability calendar, admin dashboard,
  services/prices management, staff management, customers, cancel/modify
  appointment, statistics, auth/login. Not claimed: payments, email/SMS/
  WhatsApp reminders, AI.

## Contact

- Client-side form submitting to Formspree via `fetch`
  (`NEXT_PUBLIC_FORMSPREE_FORM_ID`, public repo variable injected at build).
- **Collection is disabled by default during pre-launch.** The form only
  becomes submittable when `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` AND a
  Formspree ID is set; production activation is blocked by Legal/Contact
  prerequisites (TODO 6B).
- Fields: name, email, business/project, business stage (new opening /
  existing / software product / other), optional multiple services, message.
  No budget, timing or phone.
- States: loading, success, error. No marketing/newsletter opt-ins are
  collected.

## Legal / privacy

Pre-launch state — legal production setup is not complete.

- No public Privacy Policy / Legal Notice exists (intentionally: no
  placeholder or invented legal pages).
- No public NEXAD email or WhatsApp exists; no calendar-booking product (calls
  are arranged manually through direct messaging).
- Contact collection is disabled by default; production activation is blocked
  until the legal/contact prerequisites are met (TODO 6B).
- Missing real-world prerequisites: legal operator/controller identity,
  publishable professional/service address, public NEXAD contact email, and a
  dedicated WhatsApp channel if desired.
- No newsletter/marketing consent is currently collected.

## Retention (future policy)

Approved policy for when collection is activated: non-client contact enquiries
are retained up to 12 months from the last meaningful interaction, then deleted
unless a commercial relationship, legal obligation, or another applicable basis
requires different retention. Not yet in effect — no lead data is currently
collected.

## Assets

- `public/logos/` — official NEXAD wordmark SVGs (`nexad-wordmark-carbon`,
  `nexad-wordmark-ivory`) and Forward D marks (`nexad-mark-{carbon,ivory,
  signal}`), matching `NEXAD_Brand_Kit_v1.0`. Legacy NEXO assets removed.
- `public/projects/barber/customer/` — 3 real mobile screenshots (Spanish,
  demo data, WebP): `service-selection`, `availability`, `booking-summary`.
- `public/projects/corazon/` — real logo assets (`logoCN.webp`,
  `logoCNxNexo.png`); full photography not mounted yet.
- `public/social/nexad-social.svg` (source) + `nexad-social.png` (rasterized
  1200×630 via `scripts/generate-social.mjs`).
- All public paths go through the `asset()` helper (`lib/asset.ts`); asset
  paths must remain basePath-safe.

## Design system

- Tokens (in `app/globals.css`): `carbon` `#0B0C0D`, `ivory` `#F3EBDD`,
  `graphite` `#73777C`, `soft-ivory` `#D8D1C6`, `signal` `#FF5A36`.
  `obsidian`/`stone` remain as legacy aliases for existing utility usage.
  Ratio ≈ 80% carbon/ivory, 15% neutrals, 5% signal.
- Fonts: Space Grotesk (display/sans), IBM Plex Mono (technical), Instrument
  Serif (editorial italic accent).
- Signature device: the Forward D (`▶`); reusable `ForwardMark` component for
  CTA arrows and action cues.
- Editorial motif: `SignalDot` (`components/ui/signal-dot.tsx`) — a small
  static Signal circle used sparingly (2–4 per page) as brand punctuation;
  never a bullet style, never pulsing.
- No decorative section numbering: section indices and list-item numbers were
  removed; content numbers (coordinates, +20%, metrics) are preserved.
- Header logo renders at `h-7 md:h-8` (mobile/desktop), same 810×180 SVG.
- Direction: editorial, typographic, premium; hairlines, mono labels, serif
  italic accents, restrained forward motion.
- Avoid: generic SaaS cards, stock imagery, gratuitous gradients, cyberpunk /
  hacker clichés, heavy animations, new dependencies, signal-as-background.

## Current constraints

- Static export only — no middleware, no server-only routing, no `public/
  index.html`; localized pages must remain available without JS.
- `/NEXAD` must never be hardcoded; future custom domain must drop the basePath
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
- **Corazón co-branded logo** (`logoCNxNexo.png`) — the NEXO-era asset is still
  shown on the home Corazón section; needs a real NEXAD update before the
  rebrand is visually complete.