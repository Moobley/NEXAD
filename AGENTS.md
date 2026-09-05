<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all
differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NEXAD — Digital Studio
Next.js 16 + React 19 + TypeScript strict site for NEXAD, a digital studio based
in Las Palmas de Gran Canaria. NEXAD combines marketing, software, data and
product as one growth system. Position: **Growth, engineered.**

This folder is the git repo. Run git and npm commands here, not from its parent.

## Commands
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run format`
- No automated test suite is currently configured.

For routing, deployment or asset-path changes also verify:

`NEXT_PUBLIC_BASE_PATH=/NEXAD npm run build`

Do not commit or push unless explicitly requested.

## Project memory
For broad architectural, UX or cross-page tasks, read:
- `docs/PROJECT_STATE.md`
- `docs/DECISIONS.md`
- `docs/TODO.md`

Do not rescan the entire repository for every task.
For scoped work, inspect only the relevant implementation files plus the project
memory needed to understand the task.

Keep these docs updated when a decision materially changes the architecture or
project state.

## i18n
Uses `next-intl` v4.
Locales:
- `es` — default
- `en`
- `it`

`localePrefix: "always"`.

Localized URLs are always:

- `/es/...`
- `/en/...`
- `/it/...`

Localized pages live under `app/[locale]/`.

Inside the localized application, use the navigation helpers from
`@/i18n/navigation` instead of manually constructing locale-prefixed URLs.

Localized pages/layouts must follow the existing `setRequestLocale` and
`generateStaticParams` patterns. `params` is asynchronous in this Next.js version.

Do not add middleware/proxy for locale routing: the site uses static export.

## Root gateway
`/` is NOT a localized homepage and does NOT automatically redirect by browser
language.

It is the NEXAD Gateway, implemented in its own route group with a second root
layout:

- `app/(gateway)/page.tsx`
- `app/(gateway)/layout.tsx` (renders its own `<html>/<body>`, carbon, no
  site header/footer)

Components live in `components/gateway/`.

The gateway:

- has a carbon visual treatment;
- has no normal site header/footer;
- shows ES / EN / IT;
- uses browser language only to suggest a locale;
- never auto-enters a language;
- uses `sessionStorage` only for `nexad_gateway_seen` (intro already seen).
  During the NEXO → NEXAD migration the legacy `nexo_gateway_seen` key is
  still recognized and the new key is written, so legacy sessions skip the
  full intro once.

Stable routing rules:

- `/` is the Gateway — it only appears when the user visits the root.
- `/es/*`, `/en/*` and `/it/*` are directly accessible and are never
  intercepted by the Gateway (no deep-link guard).
- Browser language is a suggestion at `/` only — never an auto-redirect.
- There is no `?direct=1` special query.

Do not recreate `public/index.html`.

## Static export / deployment
`next.config.ts` uses:

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true` where required by static hosting.

`NEXT_PUBLIC_BASE_PATH` controls the deployment prefix.

Local development:

`NEXT_PUBLIC_BASE_PATH=""`

GitHub Pages:

`NEXT_PUBLIC_BASE_PATH="/NEXAD"`

Never hardcode `/NEXAD` in components or content.

## Environments

Two environments exist. The architecture moves between them with env vars
only (no code changes):

- **PREVIEW (current, GitHub Pages):** `https://moobley.github.io/NEXAD/`.
  Origin `https://moobley.github.io`, basePath `/NEXAD`, always noindex
  (`NEXT_PUBLIC_SITE_INDEXABLE=false`). Pre-launch site.
- **PRODUCTION FUTURA (not live):** `https://www.nexadlab.com/`.
  Origin `https://www.nexadlab.com` (canonical), empty basePath. Becomes
  indexable only at explicit go-live. Do NOT connect the custom domain, create
  a `CNAME`, change DNS or enable indexing yet.

## SEO configuration
SEO is environment-driven via `lib/seo.ts`:

- `NEXT_PUBLIC_SITE_ORIGIN` — public origin (scheme + host), without basePath
  (preview: `https://moobley.github.io`; production:
  `https://www.nexadlab.com`).
- `NEXT_PUBLIC_SITE_INDEXABLE` — `"true"` enables index/follow; anything else
  (default) produces `noindex, follow`. The current GitHub Pages deployment
  MUST stay `false`.
- `NEXT_PUBLIC_BASE_PATH` — deployment prefix as above (GitHub Pages `/NEXAD`;
  production empty).

Full URLs are built as `SITE_ORIGIN + BASE_PATH + localized pathname`
(`siteUrl` / `localizedPathname` in `lib/seo.ts`); metadata is page-specific
(`generateMetadata` + the `seo` messages namespace), with absolute canonicals,
reciprocal hreflang (es/en/it + x-default), Open Graph, Twitter cards,
`WebSite` + `Organization` + `ProfessionalService` JSON-LD forming one entity
graph via stable `@id` nodes (`lib/seo.ts`, `entityId`), `sitemap.xml` and
`robots.txt`.

Indexability is fail-closed and pinned to production:

- An indexable build (`NEXT_PUBLIC_SITE_INDEXABLE=true`) requires
  `NEXT_PUBLIC_SITE_ORIGIN` to be exactly `https://www.nexadlab.com` (after
  trailing-slash normalization), an empty `NEXT_PUBLIC_BASE_PATH`, and a valid
  https origin; the build fails otherwise. An indexable build on the GitHub
  Pages preview origin or under `/NEXAD` is therefore impossible
  (`PRODUCTION_ORIGIN` guardrail in `lib/seo.ts`).
- Pre-launch builds remain `noindex, follow` and do not advertise the sitemap
  through `robots.txt` (the `Sitemap:` line is only emitted when indexable).

Deployment is built from `master` through GitHub Actions.

## Content and i18n
All public UI copy lives in:

- `messages/es.json`
- `messages/en.json`
- `messages/it.json`

Do not hardcode user-facing copy in components.

Keep locale files structurally synchronized.

English and Italian copy should be natural localizations, not mechanically
literal translations.

`content/projects.ts` stores project data and references message namespaces.

## Project taxonomy
Work has two explicit types:

- `client`
- `lab`

Current projects:

- Corazón Napoletano — Client Work
- Barber Booking — NEXAD Lab, product in development

Never present Barber Booking as a client project.

Never invent:

- clients;
- metrics;
- revenue;
- testimonials;
- certifications;
- product users;
- results.

Corazón's approved public results are client-provided, real metrics (business
performance, Google Business Profile, Google Ads), specific to that project and
context. They are grouped in `content/projects.ts` (`corazonMetricGroups`) and
localized in `projects.corazon.caseStudy.metrics`.

### Case-study integrity

Corazón Napoletano is real Client Work (Las Palmas): logo, brand identity,
colors/fonts, physical applications, menu, upselling, QR, site, booking,
content, reel, production, Meta Ads, Google Ads, overall strategy. Always
frame results as specific to that project — never as a general NEXAD promise.

Approved metrics: business (+49.1% average weekly revenue, +54.8% takeaway
pizza, +28.7% pizzas/week, +27.3% dine-in pizza, +39.0% weekly pizza revenue,
+15.8% revenue per pizza); Google Business Profile, August 2026 (1,500 local
actions = 998 directions + 329 website clicks + 173 calls); Google Ads, August
2026 (153,751 impressions, 5,035 clicks).

Excluded by the client — never render, reference or derive anything from them:
average CTR (3.27%) and tracked conversions (467). Do not invent time periods
for the business metrics.

The earlier `+20%` revenue figure is superseded by the richer metrics above.

The Corazón real-asset pass is paused until enough real material exists. Note:
`public/projects/corazon/logoCNxNexo.png` is a real NEXO-era co-branded asset;
it still needs a real NEXAD update before it can be shown as the current brand.

Barber Booking is a NEXAD Lab demo product designed for barber shops,
adaptable with limited re-engineering to other appointment businesses.
Confirmed features: online booking, service selection, barber selection,
availability calendar, admin dashboard, services/prices management, staff
management, customers, cancel/modify appointment, statistics, auth/login.
Do not claim payments, email/SMS/WhatsApp reminders or AI unless actually
implemented. It has no clients, users or commercial results; the business/
admin side may stay abstract.

## Positioning and services

NEXAD is a digital studio where marketing, software, data and product are
parts of the same growth system. Hospitality is the first proof/case study,
not the market limit.

- Services: Digital Strategy; Paid Media/Growth (Meta Ads, Google Ads, other
  channels only when appropriate); Social/Content (editorial plan, copy,
  publishing, reels, production via collaborators); Web/Digital Experiences;
  Software/Automation (gestionali, booking platforms, web products,
  automations).
- Brand architecture: **NEXAD Growth** (marketing, strategy, paid, content),
  **NEXAD Build** (web, products, interfaces, software), **NEXAD Systems**
  (automation, internal tools, booking, workflows). Used as vocabulary, not
  as extra pages.
- Engagement: one-off projects and retainers.
- Do not shrink NEXAD to restaurants in copy or positioning.

## Team and company representation

NEXAD is early-stage — never present it as a large structured company.

- Core team: Alessandro (marketing specialist, brand identity,
  marketing/communication); Lorenzo (full-stack developer, strong security/
  cybersecurity interest).
- Base: Las Palmas de Gran Canaria; NEXAD works across the Canary Islands and
  must not be artificially geo-limited in communication.
- Model: core team + external specialists/collaborators when needed.
- Principles: tell the client when something is not needed; measure before
  judging; simplicity; transparency; economic results; design for the user.

## Page roles
Do not re-expand the institutional pages unless explicitly requested.

The current intentionally compressed structure is:

### Services
Hero → Capabilities → System → Collaboration → CTA

### Studio
Hero → Why NEXAD → Team → Principles → Network → CTA

### Work
Short Hero → Corazón → Barber

### Contact
Compact Hero → Form

Detailed project pages may be longer because they are case/product studies.

Avoid reintroducing duplicated Process, Location, Philosophy, Metrics or Approach
sections that were deliberately removed during editorial compression.

## Contact
Contact uses a client-side form with external Formspree submission.

The form is OFF by default during pre-launch. It only becomes submittable when
BOTH `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` AND `NEXT_PUBLIC_FORMSPREE_FORM_ID`
are set; production activation remains blocked until the Legal/Contact
production prerequisites (TODO 6B) are complete.

Environment:

- `NEXT_PUBLIC_CONTACT_FORM_ENABLED` (default OFF)
- `NEXT_PUBLIC_FORMSPREE_FORM_ID`

Do not hardcode a Formspree ID.

There is no public NEXAD email or WhatsApp yet — do not invent or suggest
contact channels. Calls are
arranged manually through direct messaging; no calendar-booking product.

Current pending items:

- public NEXAD email;
- WhatsApp number;
- CAPTCHA/spam hardening;
- final Privacy/Legal integration.

Do not expose placeholder contact channels in the UI.

## Design language
NEXAD brand tokens in `app/globals.css`:

- `carbon` `#0B0C0D` (primary ink / dark surface)
- `ivory` `#F3EBDD` (light canvas / text on dark)
- `graphite` `#73777C` (neutral)
- `soft-ivory` `#D8D1C6` (neutral, muted on dark)
- `signal` `#FF5A36` (accent — used as an event: CTA detail, hover, focus,
  Forward D, tiny status markers; never a large background)

`obsidian` and `stone` remain as legacy aliases of `carbon`/graphite-family for
existing utility usage; new code should use the NEXAD token names.

Target ratio ≈ 80% carbon/ivory, 15% graphite/soft-ivory, 5% signal.

### Editorial motif
The **SignalDot** (`components/ui/signal-dot.tsx`) is a small static Signal
circle used as brand punctuation (important / active / point of focus).
Use 2–4 per page maximum, paired with mono eyebrows or beside key titles —
never as a bullet-list style, never pulsing. The pulse is reserved for the
Gateway Forward mark.

### Gateway motion
The Gateway intro is **Signal → Forward**: the complete D opens centered in
Signal, holds, then travels right into the wordmark (ring hands Signal →
Ivory; the Forward ▶ stays Signal); N E X A reveals as one group. Full intro
≈3.7s, short ~0.9s for returning sessions, static final wordmark under
reduced motion. After the intro the gateway stays alive: grid drift, glow
drift, breathing network nodes, and the Forward ▶ pulsing (idle).

### Interaction language
Rule: **Neutral at rest → Signal on intent → Forward on action.**

- Rest is Carbon/Ivory/Graphite; Signal appears on hover/focus/active/selected;
  the `▶` Forward mark reveals only on high-intent CTAs (never on nav links,
  language options, inline links, or decorative diagrams).
- Reusable classes live in `app/globals.css` (`@layer components`):
  `cta-primary`, `cta-secondary`, `header-cta`, `menu-cta`, `nav-link`,
  `interactive-link`, `lang-link`, and `cta-forward` (the mark reveal —
  hidden at rest with no reserved space, width/margin grow from zero on
  hover/focus, `cubic-bezier(0.16, 1, 0.3, 1)`, no bounce/rotate/glow).
- Pointer reveal is gated behind `@media (hover: hover)` so touch never
  leaves a sticky mark; keyboard intent reveals via `:focus-visible`
  (Signal outline) on every device; `prefers-reduced-motion` snaps the mark
  without translation.
- Do not fade CTAs with opacity on hover, do not hardcode mark colors inside
  `ForwardMark` (it uses `currentColor`).

Fonts:
- Space Grotesk (display / sans)
- IBM Plex Mono (technical / labels / metrics)
- Instrument Serif (intentional editorial italic accent, used sparingly)

Visual language:
- typography-led;
- editorial layouts;
- mono labels;
- serif accents;
- hairlines;
- generous but controlled whitespace;
- restrained motion, forward (left → right) by default.

The **Forward D** (the `▶` cutout inside the D) is the signature device. Reuse
the `ForwardMark` component (`components/ui/forward-mark.tsx`) for CTA arrows
and action cues; never redraw the logo geometry or place triangles everywhere.

Avoid:
- generic SaaS cards;
- stock imagery;
- gratuitous gradients;
- new visual systems;
- heavy animation dependencies;
- unnecessary client components.

Do not add new dependencies without a concrete need. Prefer real assets when
they exist; abstract surfaces may remain when real ones are not available or
not ready — never invent social proof or materials.

Mobile layouts must be designed intentionally, not merely desktop layouts
stacked into one column.

## Assets
Public asset paths must remain basePath-safe.

Use the existing `asset()` helper (`lib/asset.ts`) for public paths — never
hardcode `/NEXAD`.

Real project screenshots live under `public/projects/` (e.g.
`public/projects/barber/customer/`). Current state:

- Barber Booking (NEXAD Lab): **customer-side real screenshots are integrated**
  in the case study (`service-selection`, `availability`, `booking-summary`
  WebP, shown via `components/ui/mobile-frame.tsx`). The business/admin side
  is still abstract and deferred: the Barber backend login was returning
  `400 "No active transaction for update or delete query"`, so no real
  dashboard/schedule/servizi screenshots were captured.
- Corazón: uses its real logo assets; full photography not mounted yet.

Screenshot guidelines:

- use semantic kebab-case filenames;
- prefer WebP, high quality, no needless full-size duplicates;
- never publish secrets or real personal/demo data accidentally;
- prefer `next/image`;
- preserve readability of UI screenshots (avoid aggressive `object-cover` on
  text-heavy UI; use `object-contain`/natural aspect where appropriate);
- keep intentional abstract surfaces (Flow, ScheduleUi, DashboardUi) where they
  explain a concept instead of faking a UI we cannot show yet;
- do not add `/NEXAD` manually.

## Verification
Before declaring implementation complete, normally run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

For deployment/routing/path changes also run:

- `NEXT_PUBLIC_BASE_PATH=/NEXAD npm run build`

For SEO/deployment changes, after building also run the static SEO verifier
against the generated `out/` with the same env used for the build, e.g.:

- `NEXT_PUBLIC_SITE_ORIGIN=https://moobley.github.io NEXT_PUBLIC_BASE_PATH=/NEXAD NEXT_PUBLIC_SITE_INDEXABLE=false npm run verify:seo`
- `NEXT_PUBLIC_SITE_ORIGIN=https://www.nexadlab.com NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_INDEXABLE=true npm run verify:seo`

For visual tasks, perform responsive QA at relevant mobile and desktop widths.

Do not claim visual QA was performed unless it actually was.

## Path alias
`@/*` maps to the repo root.

Example:

`@/components/ui/...`

`components.json` uses shadcn `base-nova`, lucide icons and `@base-ui/react`
primitives.