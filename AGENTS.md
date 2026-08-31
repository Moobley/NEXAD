<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all
differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NEXO — Digital Studio
Next.js 16 + React 19 + TypeScript strict site for NEXO, a digital studio based
in Las Palmas de Gran Canaria.

This folder is the git repo. Run git and npm commands here, not from its parent.

## Commands
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run format`
- No automated test suite is currently configured.

For routing, deployment or asset-path changes also verify:

`NEXT_PUBLIC_BASE_PATH=/NEXO npm run build`

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

It is the NEXO Gateway, implemented in its own route group with a second root
layout:

- `app/(gateway)/page.tsx`
- `app/(gateway)/layout.tsx` (renders its own `<html>/<body>`, obsidian, no
  site header/footer)

Components live in `components/gateway/`.

The gateway:

- has an obsidian visual treatment;
- has no normal site header/footer;
- shows ES / EN / IT;
- uses browser language only to suggest a locale;
- never auto-enters a language;
- uses `sessionStorage` only for `nexo_gateway_seen` (intro already seen).

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

`NEXT_PUBLIC_BASE_PATH="/NEXO"`

Never hardcode `/NEXO` in components or content.

GitHub Pages is temporary. The architecture must remain easy to move to a custom
domain with an empty basePath.

## SEO configuration
SEO is environment-driven via `lib/seo.ts`:

- `NEXT_PUBLIC_SITE_ORIGIN` — public origin (scheme + host), without basePath
  (GitHub Pages: `https://moobley.github.io`; custom domain later). The custom
  domain is NOT decided — never assume `nexo.studio`.
- `NEXT_PUBLIC_SITE_INDEXABLE` — `"true"` enables index/follow; anything else
  (default) produces `noindex, follow`. The current GitHub Pages deployment
  MUST stay `false`.
- `NEXT_PUBLIC_BASE_PATH` — deployment prefix as above.

Full URLs are built as `SITE_ORIGIN + BASE_PATH + localized pathname`
(`siteUrl` / `localizedPathname` in `lib/seo.ts`); metadata is page-specific
(`generateMetadata` + the `seo` messages namespace), with absolute canonicals,
reciprocal hreflang (es/en/it + x-default), Open Graph, Twitter cards, a
`WebSite` JSON-LD at the Gateway root, `sitemap.xml` and `robots.txt`.

Indexability is fail-closed:

- An indexable build (`NEXT_PUBLIC_SITE_INDEXABLE=true`) requires an explicit,
  valid, https `NEXT_PUBLIC_SITE_ORIGIN` (no basePath/pathname/credentials/
  query/hash); the build fails otherwise.
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
- Barber Booking — NEXO Lab, product in development

Never present Barber Booking as a client project.

Never invent:

- clients;
- metrics;
- revenue;
- testimonials;
- certifications;
- product users;
- results.

Corazón's approved public result is `+20%` revenue from the following month,
specific to that project/context.

### Case-study integrity

Corazón Napoletano is real Client Work (Las Palmas): logo, brand identity,
colors/fonts, physical applications, menu, upselling, QR, site, booking,
content, reel, production, Meta Ads, Google Ads, overall strategy. Always
frame `+20%` revenue as the result of that specific project — never as a
general NEXO promise. The Corazón real-asset pass is paused until enough real
material exists.

Barber Booking is a NEXO Lab demo product designed for barber shops,
adaptable with limited re-engineering to other appointment businesses.
Confirmed features: online booking, service selection, barber selection,
availability calendar, admin dashboard, services/prices management, staff
management, customers, cancel/modify appointment, statistics, auth/login.
Do not claim payments, email/SMS/WhatsApp reminders or AI unless actually
implemented. It has no clients, users or commercial results; the business/
admin side may stay abstract.

## Positioning and services

NEXO is a digital studio, not a restaurant-only agency. Hospitality is the
first proof/case study, not the market limit.

- Services: Digital Strategy; Paid Media/Growth (Meta Ads, Google Ads, other
  channels only when appropriate); Social/Content (editorial plan, copy,
  publishing, reels, production via collaborators); Web/Digital Experiences;
  Software/Automation (gestionali, booking platforms, web products,
  automations).
- Engagement: one-off projects and retainers.
- Do not shrink NEXO to restaurants in copy or positioning.

## Team and company representation

NEXO is early-stage — never present it as a large structured company.

- Core team: Alessandro (marketing specialist, brand identity,
  marketing/communication); Lorenzo (full-stack developer, strong security/
  cybersecurity interest).
- Base: Las Palmas de Gran Canaria; NEXO works across the Canary Islands and
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
Hero → Why NEXO → Team → Principles → Network → CTA

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

There is no public NEXO email or WhatsApp yet — do not invent or suggest
contact channels (the `nexo.studio` domain is not confirmed). Calls are
arranged manually through direct messaging; no calendar-booking product.

Current pending items:

- public NEXO email;
- WhatsApp number;
- CAPTCHA/spam hardening;
- final Privacy/Legal integration.

Do not expose placeholder contact channels in the UI.

## Design language
Primary tokens in `app/globals.css` include:

- `obsidian`
- `ivory`
- `lilac`
- `iris`

Fonts:
- Familjen Grotesk
- Instrument Serif
- Geist Mono

Visual language:
- typography-led;
- editorial layouts;
- mono labels;
- serif accents;
- hairlines;
- generous but controlled whitespace;
- restrained motion.

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
hardcode `/NEXO`.

Real project screenshots live under `public/projects/` (e.g.
`public/projects/barber/customer/`). Current state:

- Barber Booking (NEXO Lab): **customer-side real screenshots are integrated**
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
- do not add `/NEXO` manually.

## Verification
Before declaring implementation complete, normally run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

For deployment/routing/path changes also run:

- `NEXT_PUBLIC_BASE_PATH=/NEXO npm run build`

For visual tasks, perform responsive QA at relevant mobile and desktop widths.

Do not claim visual QA was performed unless it actually was.

## Path alias
`@/*` maps to the repo root.

Example:

`@/components/ui/...`

`components.json` uses shadcn `base-nova`, lucide icons and `@base-ui/react`
primitives.