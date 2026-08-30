# NEXO — Roadmap

Legend: ✅ Complete · 🔴 High priority · 🟠 Next · 🟡 Later · ⏸ Paused · ⚪ Optional

## ✅ Complete

- Routing / deploy (static export, trailingSlash, basePath env, GitHub Pages
  workflow on `master`, no middleware).
- Services page (Hero → 5 Capabilities → System → Collaboration → CTA).
- Studio page (Hero → Why NEXO → Team → Principles → Network → CTA).
- Work index + Corazón case study + Barber NEXO Lab page.
- Contact UI (Formspree integration, states, validation, i18n).
- Editorial compression / mobile pass (copy reduction, geography dedup,
  compact internal heroes, reduced-motion preserved).
- NEXO Gateway (root `/`, ES/EN/IT, session UX, deep-link guard, `?direct=1`).
- Barber customer real-asset pass (3 real WebP screenshots in the case study).
- Repository / project memory (canonical: `AGENTS.md` + `docs/`
  PROJECT_STATE/DECISIONS/TODO are tracked in the repository).

## ⏸ Paused

### Corazón Real Asset Pass

Paused until enough real material is available. Not a blocker. Desirable
assets: vector logo, locale, dishes, brand applications, menu, QR,
content/reel, website desktop/mobile, Meta/Google creatives.

## ⚪ Optional / paused

### Barber Business Real Assets

Not a blocker. Depends on fixing the Barber backend admin login
(`400 "No active transaction for update or delete query"`). Possible future
assets: dashboard, agenda, services, staff/customers, statistics — with demo
data, replacing part of the abstract `DashboardUi` without turning the page
into a gallery.

## 🔴 High priority

### Legal + Contact Production

Next major task after Project Memory:

1. Privacy Policy
2. Legal Notice / Aviso Legal if required
3. Cookie Policy
4. cookie/consent handling if the chosen tools require it
5. privacy consent near the form if needed
6. footer legal links
7. Formspree production setup
8. public NEXO email
9. WhatsApp
10. calendar / call-booking CTA
11. CAPTCHA / spam protection if appropriate

Before writing legal texts, collect the real business data — never invent
company/tax data. NEXO is early-stage; handle that correctly in the legal
texts.

### Technical SEO

After Legal. Complete audit + implementation:

- per-page/per-locale metadata (title, description)
- canonical, hreflang ES/EN/IT, x-default
- Gateway SEO
- sitemap, robots
- Open Graph, Twitter cards, favicon/icons, social preview
- case-study metadata; Services/Studio/Contact metadata
- schema.org where correct (Organization / ProfessionalService only if
  accurate; Breadcrumb where useful; local/location markup without
  overclaiming)
- static export validation; GitHub Pages basePath; future custom-domain
  migration

Re-evaluate the "fresh deep link → Gateway" behavior from the perspective of
JS-enabled crawlers. `?direct=1` is QA only, not a crawler solution. Do not
alter the Gateway UX without an explicit decision.

## 🟠 Next

### Analytics / conversion tracking

Choose the stack before implementing: GA4 vs a privacy-friendly alternative
(Plausible / Umami or similar). Candidate events: Gateway language choice,
Services/Studio CTAs, Work project click, contact form start/success/error,
WhatsApp click, booking-call click, outbound project/client site click. Do not
track useless events. Coordinate with Privacy/Legal.

### Performance / Core Web Vitals

Real audit: Lighthouse mobile/desktop, LCP, CLS, INP, image loading, fonts,
JS, Gateway animation, Aurora, Barber screenshots, lazy loading, static
export, asset caching, bundle size. Do not degrade the design to chase an
artificial 100.

### Accessibility

Target WCAG AA (realistic). Audit: keyboard, focus visible, headings,
landmarks, form labels/errors, contrast, ARIA, decorative visuals, reduced
motion, Gateway, language selection, mobile menu, alt text, screenshot
semantics.

### Domain / production deployment

GitHub Pages is temporary; a future domain (possibly `nexo.studio`) is NOT
acquired or confirmed. When decided: DNS, custom domain, HTTPS, drop `/NEXO`
from the production basePath, final canonicals, Search Console, final sitemap,
redirects if needed, verify localized routes and the Gateway.

## 🟡 Later

### Marketing / conversion pass

After the site is technically stable: ICP, offers, CTA, funnel, lead
qualification, positioning, proof, objections, conversion copy. Do not
restrict NEXO to restaurants.

### Service landing pages / SEO content

Evaluate only after core SEO + positioning. Possible landings: digital
strategy, Meta/Google Ads, social/content, web development, booking systems,
software/automation. Vertical landings only if commercially sensible. No
doorway pages.

### Social proof

Only real, authorized material: testimonials, verifiable results, new case
studies, authorized client logos, process proof. Corazón remains the main
proof for now.

### Content / organic marketing

Separate from technical completion: NEXO Instagram, Lorenzo as a brand face,
educational content, project breakdowns, behind the scenes, marketing + tech
connection, selective build in public.

## Housekeeping

- Keep `messages/{es,en,it}.json` structurally synchronized when copy changes.
- Keep `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `docs/TODO.md` updated
  when a decision materially changes the project.