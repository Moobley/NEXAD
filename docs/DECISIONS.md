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
Corazón Napoletano is Client Work with a real, authorized result: +20% revenue
from the following month. It must always be framed as a specific project
result.

**Why**
Credibility comes from real, contextualized proof — not general promises.

**Do not**
Turn the +20% into a general NEXO guarantee, or invent additional metrics.

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