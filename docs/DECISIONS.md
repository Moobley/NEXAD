# Project Decisions

Intentional decisions and the reasons behind them. These are stable — do not
"correct" them without a real business requirement. Format: concise entries
with the decision, the why, and what not to do.

## D-001 — Always-prefixed localized routes

**Decision**
Use `/es/…`, `/en/…`, `/it/…` (`localePrefix: "always"`).

**Why**
Static export + temporary GitHub Pages hosting is simpler and more robust
than `as-needed` prefixing; every URL is unambiguous per locale.

**Do not**
Introduce locale-less URLs for localized pages.

## D-002 — Static export is an architectural requirement

**Decision**
The site ships as a static export (`output: "export"`). No middleware, no
server-only routing, no `public/index.html`.

**Why**
GitHub Pages hosting and no NEXO backend. Localized pages must stay available
without JavaScript.

**Do not**
Add solutions that depend on a Next.js runtime server.

## D-003 — GitHub Pages basePath is deployment-specific

**Decision**
`/NEXO` exists only as the `NEXT_PUBLIC_BASE_PATH` build variable; never
hardcoded in components or content (use `asset()` and `@/i18n/navigation`).

**Why**
The site must move to a custom domain (empty basePath) without code changes.

**Do not**
Write `/NEXO` anywhere in code, components, or public asset paths.

## D-004 — Gateway instead of automatic locale redirect

**Decision**
The root `/` is the NEXO Gateway (obsidian, no header/footer) with an explicit
ES / EN / IT choice. Browser language is only a suggestion. No auto redirect.

**Why**
A controlled brand entry point; avoids a duplicate root implementation and
surprising auto-redirects.

**Do not**
Restore an automatic browser-language redirect at `/`.

## D-005 — Deep-link Gateway behavior is intentional

> **SUPERSEDED by D-019** — localized deep links no longer pass through the
> Gateway. Kept for historical context.

**Decision**
A fresh-session localized deep link (e.g. `/es/work/barber-booking/`) passes
through the Gateway; after language selection the same conceptual route is
restored in the chosen language (e.g. `/it/work/barber-booking/`). The
original locale never dictates the final one.

**Why**
Preserves deep links while keeping the language choice with the user.

**Do not**
Treat this as a bug; changing it requires an explicit UX decision.

## D-006 — Guard architecture

> **SUPERSEDED by D-019** — the inline guard was removed. Kept for historical
> context.

**Decision**
The deep-link guard is a client-side inline script at the start of the
`[locale]` body (`gateway-guard.tsx`), using `sessionStorage`
(`nexo_gateway_seen` / `nexo_gateway_entered` / `nexo_gateway_return_path`).
It is fail-open and `?direct=1` bypasses it for QA/technical access.

**Why**
Static-export compatible, minimal flash, no hydration risk, no open redirect,
no bot detection.

**Do not**
Move the guard to middleware, add server redirects, recreate
`public/index.html`, or add bot detection.

## D-007 — Gateway SEO is intentionally unresolved

> **SUPERSEDED by D-019 and D-021** — the Gateway and full-site SEO foundation
> are implemented. Kept for historical context.

**Decision**
The Gateway and the deep-link guard have no dedicated SEO handling yet. This
is deliberately deferred to the Technical SEO pass, where the
"fresh deep link → Gateway" behavior must be re-evaluated from the crawler
(JS-enabled) perspective.

**Why**
Resolving it prematurely risks breaking the approved Gateway UX.

**Do not**
Treat `?direct=1` as a crawler solution, or alter the Gateway UX without an
explicit decision.

## D-008 — Internal pages are intentionally compressed

**Decision**
Services, Studio, Work and Contact follow short, fixed structures (see
PROJECT_STATE.md). Do not re-add Process, Location, Philosophy, Metrics or
Approach sections without a business requirement.

**Why**
Pages had begun to look like "the same page with different text".

**Do not**
Re-expand the institutional pages "just because" — brevity is a UX/editorial
decision.

## D-009 — NEXO positioning

**Decision**
NEXO is a digital studio; hospitality is the first proof/case study, not the
market limit. Future verticals: service businesses, dental clinics, aesthetics,
hospitality, other high-value businesses.

**Why**
Avoid locking the brand and services to restaurants.

**Do not**
Shrink NEXO to a restaurant-only agency in copy or positioning.

## D-010 — Corazón classification and result framing

**Decision**
Corazón Napoletano is Client Work with real, authorized results: business
performance, Google Business Profile and Google Ads metrics, always framed as
specific project results (see `content/projects.ts` `corazonMetricGroups`).

**Why**
Credibility comes from real, contextualized proof — not general promises.

**Do not**
Turn results into a general NEXO guarantee, or invent additional metrics.
Excluded by the client: average CTR and tracked conversions — never show them.

## D-011 — Barber is NEXO Lab, not Client Work

**Decision**
Barber Booking is an internal product exploration (NEXO Lab) with no clients,
users or commercial results. Only confirmed features may be claimed.

**Why**
Credibility comes from the demo/product work shown, not fabricated results.

**Do not**
Present Barber as a client project, claim payments/reminders/AI, or invent
users or metrics.

## D-012 — Real assets policy

**Decision**
Prefer real assets when they exist. Abstract surfaces (Flow, ScheduleUi,
DashboardUi) may remain where they explain a concept or where the real UI is
not ready.

**Why**
Real product UI and photography are more credible than compositions that fake
what we cannot show; no invented social proof or materials.

**Do not**
Publish assets that cannot be recreated, or fabricate credentials/state to
capture screenshots.

## D-013 — Dependency discipline

**Decision**
No new dependencies without a concrete need; prefer the existing design
system, fonts, and controlled motion.

**Why**
Keeps the static export small, fast, and maintainable.

**Do not**
Add libraries (animation, UI, analytics) as a shortcut or "for later".

## D-014 — Contact form uses Formspree

**Decision**
Contact submits to Formspree via `fetch` using `NEXT_PUBLIC_FORMSPREE_FORM_ID`
(a public repo variable injected at build, not a secret), with
loading/success/error (and "not configured") states. Never fake a success.

**Why**
No NEXO backend; the public Form ID ships in the page bundle, so a build-time
repo variable is the correct choice.

**Do not**
Commit a real Formspree ID, or activate production before the Privacy/Legal
pass.

## D-015 — Contact form defaults OFF during pre-launch

**Decision**
The contact form is disabled by default. It only becomes submittable when
`NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` AND a `NEXT_PUBLIC_FORMSPREE_FORM_ID`
is present; neither alone activates it. The disabled state shows a compact
note and renders the fields non-interactive.

**Why**
Legal identity is incomplete, no public email exists, and privacy/legal
information is not ready. No personal data should be collected prematurely.

**Do not**
Activate the form via a Formspree ID alone, collect personal data before the
production legal requirements are completed, or leave editable fields that
cannot be submitted.

## D-016 — No marketing/newsletter consent during pre-launch

**Decision**
No newsletter, marketing checkbox or promotional opt-in is collected during
pre-launch. Future newsletter/marketing functionality requires its own
implementation and legal/privacy review, with separate, optional, un-checked
consent.

**Why**
Marketing consent must be separated from a normal contact request and never be
a condition for contacting NEXO; the tools, purposes and legal basis do not
exist yet.

**Do not**
Add a fake consent/marketing checkbox "because it looks legal", or reuse
contact requests as marketing opt-in.

## D-017 — Future retention: 12 months for non-client enquiries

**Decision**
When contact collection is activated: non-client contact enquiries are
retained for up to 12 months from the last meaningful interaction, then
deleted — unless a commercial relationship, a legal obligation, or another
applicable legal basis requires different retention.

**Why**
Approved NEXO policy that keeps enquiry handling proportional to its purpose.

**Do not**
Claim the current (disabled) form is already collecting/retaining leads, or
apply this policy to data NEXO does not hold yet.

## D-018 — Calls arranged manually, no calendar booking

**Decision**
NEXO does not use calendar-booking products (Calendly, Cal.com or similar).
Calls are arranged manually through direct messaging with the interested lead.

**Why**
Product decision: a real contact channel does not exist yet, and manual
arrangement through messaging is the chosen flow.

**Do not**
Create TODOs to integrate Calendly/Cal.com, or expose a "book a call" CTA
before a real public contact channel exists.

## D-019 — Gateway is root-only; localized deep links bypass it

**Decision**
`/` is the Gateway. `/es/*`, `/en/*` and `/it/*` are directly accessible and
are never intercepted by the Gateway. The deep-link inline guard, the
`nexo_gateway_entered` / `nexo_gateway_return_path` session keys and the
`?direct=1` bypass are removed. Language links on the Gateway are real links
usable without JS.

**Why**
Shareability, direct navigation, international SEO, avoiding JavaScript
redirect ambiguity for crawlers, while keeping an explicit language gateway at
`/`.

**Do not**
Reintroduce a deep-link guard, a client-side redirect of localized routes to
`/`, or `?direct=1` semantics.

## D-020 — Temporary GitHub Pages deployment remains noindex

**Decision**
The current GitHub Pages deployment is intentionally `noindex, follow` until
explicit production activation. Indexing is controlled by the
`NEXT_PUBLIC_SITE_INDEXABLE` env flag (default false); noindex is emitted via
the meta robots in the HTML, never via `robots.txt Disallow`.

**Why**
The Pages site is temporary and pre-launch; content must stay crawlable but
not indexed, and must become indexable at cutover without code changes.

**Do not**
Set `NEXT_PUBLIC_SITE_INDEXABLE=true` in the deployment, or use
`Disallow: /` to hide content.

## D-021 — SEO origin and indexability are environment-driven

**Decision**
All canonical, hreflang, sitemap, robots and social URLs are built from
`NEXT_PUBLIC_SITE_ORIGIN` + `NEXT_PUBLIC_BASE_PATH` via `lib/seo.ts`. No
`/NEXO` or future-domain assumption is hardcoded in components or metadata
builders.

**Why**
GitHub Pages (`https://moobley.github.io` + `/NEXO`) must switch to a custom
domain (origin change, empty basePath, indexable) without rewriting pages.

**Do not**
Hardcode `/NEXO` or `nexo.studio` anywhere in source, metadata, sitemap or
structured data.

## D-022 — Indexability activation is fail-closed

**Decision**
An indexable build (`NEXT_PUBLIC_SITE_INDEXABLE=true`) requires an explicit,
valid, https `NEXT_PUBLIC_SITE_ORIGIN` with no basePath/pathname, credentials,
query or hash; the build fails otherwise. The `http://localhost:3000` origin
fallback is only allowed for non-indexable development builds. While noindex,
`robots.txt` does not announce the sitemap.

**Why**
Avoid accidental production indexing with a localhost/invalid canonical
origin; keep pre-launch deployment quiet (no sitemap advertisement) while the
meta robots tag remains the real indexing control.

**Do not**
Add a non-https or path-containing origin to an indexable build, or rely on
the localhost fallback in production.
## D-023 — NEXO → NEXAD brand migration

**Decision**
The site rebrands from NEXO to NEXAD. Visual identity, palette and motion come
from `NEXAD_Brand_Kit_v1.0`; the architecture, page structure, editorial
character and interaction model of the existing site are preserved.

**Why**
NEXAD positions the studio as marketing + engineering ("Growth, engineered."),
replacing the previous lilac/iris identity with the Carbon/Ivory/Signal system.

**What changed**
- Wordmark/logo: official NEXAD SVGs (`nexad-wordmark-{carbon,ivory}.svg`,
  `nexad-mark-{carbon,ivory,signal}.svg`) replace the NEXO assets;
  `logo.tsx` uses `alt="NEXAD"` and the real 810×180 ratio. Legacy NEXO
  logo/social files removed.
- Palette: `carbon #0B0C0D`, `ivory #F3EBDD`, `graphite #73777C`,
  `soft-ivory #D8D1C6`, `signal #FF5A36`. `obsidian`/`stone` kept as
  aliases for existing utility classes; `lilac` removed as brand accent;
  `iris` → `signal`. Signal is an accent (~5%), never a background.
- Typography: Space Grotesk (sans/display), IBM Plex Mono (technical).
  Instrument Serif retained as an intentional editorial italic accent.
- Forward D: the ▶ cutout is the signature device; `ForwardMark` component
  reuses the official geometry for CTA arrows and action cues. Recognition
  through repetition, not saturation.
- Gateway: `nexo-gateway.tsx` → `nexad-gateway.tsx` (`NexoGateway` →
  `NexadGateway`); Signal → Forward intro (Signal D opens centered, travels
  right into the wordmark, N E X A reveals as one group), ≈3.7s full / short
  for returning sessions / static under reduced motion; idle pulse + ambient
  drift after the intro. Descriptor `GROWTH, ENGINEERED.`
- Session storage: new key `nexad_gateway_seen`; legacy
  `nexo_gateway_seen` still recognized during the migration and the new key
  is written. Drop the legacy key later.
- SEO/internal: `SITE_NAME` → NEXAD, `public/social/nexad-social.png`
  (generated from official geometry via `scripts/generate-social.mjs`),
  favicon = Forward D mark, package name `nexad-digital-studio`, messages
  and public copy NEXAD-native (Growth/Build/Systems vocabulary, tagline where
  it has hierarchy).
- Deployment: GitHub Pages basePath moved to `/NEXAD` in `deploy.yml`
  (matches the renamed `Moobley/NEXAD` repository). Still env-driven
  (`NEXT_PUBLIC_BASE_PATH`); a custom domain uses an empty basePath without
  code changes.
- Case facts preserved: Corazón `+20%` stays project-specific; Barber remains
  NEXAD Lab (no clients/users/metrics).

**Do not**
- Redraw, rotate, stretch or recolor the NEXAD logo; only the official SVGs.
- Use Signal as a large background, or spread triangles everywhere.
- Treat the NEXO-era `logoCNxNexo.png` as the final brand asset — it needs a
  real NEXAD update.
- Reintroduce lilac/iris as accents or rename the whole codebase mechanically;
  `obsidian`/`stone` aliases stay until a low-risk cleanup.

## D-024 — Visual refinement v3: Signal dots, numbering, Gateway motion

**Decision**
Refine the approved NEXAD site without redesign: enlarge the header wordmark,
introduce a restrained static Signal dot as editorial brand punctuation,
remove decorative section numbering, and replace the Gateway intro with a
slower "Signal → Forward" sequence plus a persistent idle state.

**Why**
The logo was too discreet; section numbers added noise; and the previous
gateway animation felt too fast and ended frozen. The D is NEXAD's source
object, so the intro now starts from the D.

**What changed**
- Header logo: `h-7 md:h-8` (mobile/desktop), same 810×180 SVG, no header
  height change; mobile menu logo matches.
- `SignalDot` component (`components/ui/signal-dot.tsx`): small static
  Signal circle (`sm` 6px / `md` 8px), `aria-hidden`, used as brand
  punctuation (hero eyebrows, capabilities, studio why, work categories,
  contact) — 2–4 per page, never as bullets, never pulsing.
- Removed decorative section indexing (`01`…`05`) and list-item numbers
  (`0{i+1}`) across all sections; removed project `index` fields. Content
  numbers (+20%, coordinates, metrics) preserved.
- Gateway motion renamed **Signal → Forward**: complete Signal D opens
  centered (translateX −267 → 0 in the 810×180 viewBox), holds, travels right
  into the wordmark while its ring hands Signal → Ivory (Forward mark stays
  Signal); N E X A reveals as one group (clip right→left); ≈3.7s full, ~0.9s
  short, reduced-motion shows the static final wordmark.
- Idle state: grid drifts (30s), glow drifts (18s), network nodes/connectors
  breathe asynchronously, Forward ▶ pulses (3.4s breath + pause) with an
  occasional faint Signal ring; language hover nudges the mark forward.
- CSS/SVG only (no new dependencies); old Boot→Forward keyframes removed.

**Do not**
- Pulse static Signal dots on content pages; pulse is reserved for the Gateway
  Forward mark.
- Reintroduce decorative numbering or a dot on every section.
- Exceed ~4.2s before the language links are visible on first load.

## D-025 — SEO readiness: gateway language, branded 404, Organization schema

**Decision**
- Gateway metadata resolves the English `seo.gateway` copy
  (`app/(gateway)/layout.tsx`), matching its existing `lang="en"` +
  `og:locale en_US` + English tagline. Previously the description came from
  `defaultLocale` (es), giving the x-default root conflicting language signals.
- Unknown URLs serve a branded 404 via `app/global-not-found.tsx` with
  `experimental.globalNotFound` — the documented mechanism for apps with
  multiple root layouts and a top-level dynamic-segment root layout. It is a
  full `<html>/<body>` document mirroring the Gateway, `noindex`, with
  basePath-prefixed absolute links built from `NEXT_PUBLIC_BASE_PATH`.
- Localized pages emit an `Organization` JSON-LD (name, url, logo, Las Palmas
  address, founders) via `organizationSchema()` in `lib/seo.ts`.
- SEO titles for home/services/contact add geo/use-case modifiers
  (es/en/it). Work/studio titles unchanged.

**Why**
- Consistent language signals at `/` before indexable activation; on-brand
  fallback for any wrong URL; local/E-E-A-T relevance via Organization schema;
  geo keywords for the primary market.

**Do not**
- Revert the Gateway to locale-mixed metadata, drop the branded 404, or
  hardcode `/NEXAD` in the 404 links.

## D-026 — Production domain decided; two environments

**Decision**
The canonical production origin of NEXAD is `https://www.nexadlab.com`
(`www.nexadlab.com` is the canonical version). It is NOT live yet. The GitHub
Pages deployment `https://moobley.github.io/NEXAD/` stays active as a
temporary PRE-LAUNCH preview, built with `NEXT_PUBLIC_SITE_ORIGIN=https://moobley.github.io`,
`NEXT_PUBLIC_BASE_PATH=/NEXAD`, `NEXT_PUBLIC_SITE_INDEXABLE=false`.

**Why**
Fix a single canonical origin for production (empty basePath, indexable only
at go-live) while the GitHub Pages preview keeps serving the pre-launch site
as noindex. The two environments are switched by env vars only.

**Do not**
Connect the custom domain, create a `CNAME`, change DNS, or enable indexing
before the explicit go-live step.

## D-027 — Indexable builds are pinned to the production origin

**Decision**
An indexable build (`NEXT_PUBLIC_SITE_INDEXABLE=true`) is only allowed with
`NEXT_PUBLIC_SITE_ORIGIN` exactly `https://www.nexadlab.com` (after
trailing-slash normalization) AND an empty `NEXT_PUBLIC_BASE_PATH`. The build
fails otherwise. Non-indexable environments (GitHub Pages preview, localhost)
keep the existing permissive behaviour.

**Why**
Supersedes the generic fail-closed rule in D-022 with a hard pin: it makes an
indexable build on the GitHub Pages origin or under `/NEXAD` impossible by
construction, preventing accidental production indexing of the preview.

**Do not**
Relax the guardrail, hardcode `/NEXAD`, or reintroduce a non-nexadlab.com
origin as indexable.

## D-028 — JSON-LD entity graph with stable @id and locale-aware Services

**Decision**
Structured data forms one coherent entity graph anchored at the build root
(`entityId()` in `lib/seo.ts`):

- `Organization` gets `@id` `<site-root>#organization` (real facts only).
- `WebSite` (Gateway root) gets `@id` `<site-root>#website` and links
  `publisher` to the Organization `@id`.
- `ProfessionalService` (Services page) gets `@id`
  `<site-root>#professional-service`, a locale-aware `url`
  (`localizedPathname(locale, "/services")` ? `/es|en|it/services/`),
  `inLanguage`, and `provider` linked to the Organization `@id`.
- `areaServed` is removed: Las Palmas is the base, not a market restriction,
  and no precise public coverage data exists to describe it correctly.

**Why**
A single graph lets engines merge the Organization, WebSite and service nodes
across pages; the Services URL previously dropped the locale despite
`localePrefix: "always"`.

**Do not**
Reintroduce `areaServed`, invent business/geo data, or emit a locale-less
`/services/` canonical/schema URL.
