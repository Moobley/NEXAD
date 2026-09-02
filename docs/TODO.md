# NEXAD — Roadmap

Legend: ✅ Complete · 🔴 High priority · 🟠 Next · 🟡 Later · ⏸ Paused · ⚪ Optional

## ✅ Complete

- Routing / deploy (static export, trailingSlash, basePath env, GitHub Pages
  workflow on `master`, no middleware).
- Services page (Hero → 5 Capabilities → System → Collaboration → CTA).
- Studio page (Hero → Why NEXAD → Team → Principles → Network → CTA).
- Work index + Corazón case study + Barber NEXAD Lab page.
- Contact UI (Formspree integration, states, validation, i18n).
- Editorial compression / mobile pass (copy reduction, geography dedup,
  compact internal heroes, reduced-motion preserved).
- NEXAD Gateway (root `/`, ES/EN/IT language entry, browser-language
  suggestion; localized routes directly accessible — no deep-link guard).
- Barber customer real-asset pass (3 real WebP screenshots in the case study).
- Repository / project memory (canonical: `AGENTS.md` + `docs/`
  PROJECT_STATE/DECISIONS/TODO are tracked in the repository).
- 6A — Pre-launch Legal + Contact hardening (contact form defaults OFF via
  feature flag + Formspree-ID requirement, submit guard, disabled UX with
  availability note; no marketing/consent opt-ins; no fake public email /
  WhatsApp / calendar introduced).
- NEXO → NEXAD brand migration (D-023): official logo assets, Carbon/Ivory/
  Signal palette, Space Grotesk + IBM Plex Mono, Forward D system, Gateway
  Signal → Forward animation, `nexad_gateway_seen` storage migration, NEXAD
  copy/SEO, basePath `/NEXAD`, docs updated.
- Visual refinement v3 (D-024): larger header logo, `SignalDot` editorial
  motif, decorative section numbering removed, Gateway "Signal → Forward"
  intro with persistent idle pulse/ambient motion.

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

### 6B — Legal + Contact production activation

🔴 Blocked / pending real business data. Next major task after 6A. Do not
invent provider/company/tax data — NEXAD is pre-launch and early-stage.

Legal identity / provider data:

- Define the real legal operator / service provider before publication
  (company, autónomo, partnership or joint ownership — none is assumed).
- Define a legally appropriate publishable domicile/address for the service
  provider (Las Palmas de Gran Canaria alone is not a substitute for a
  complete address when legally required).
- Create and approve a public NEXAD contact email.
- Create a dedicated NEXAD business messaging/WhatsApp channel before exposing
  any WhatsApp CTA; later implement a direct-contact CTA and arrange calls
  manually through messaging (no calendar booking).

Privacy:

- Draft/finalize localized Privacy Policy after controller details are known.
- Implement first-layer privacy information at the contact form before
  enabling collection.
- Determine and document the correct legal basis for contact enquiries.
- Document Formspree role, processing terms/subprocessors/transfers as
  applicable.
- Document data-subject rights and a contact channel once the public
  email/controller are available.
- Apply approved retention: 12 months from the last meaningful interaction for
  non-client enquiries, unless another legitimate retention requirement
  applies.

Legal Notice / Aviso Legal + footer:

- Draft/finalize localized Legal Notice / Aviso Legal once the real
  service-provider details exist.
- Add footer Legal/Privacy links only after the corresponding pages are
  complete and approved.

Formspree production activation:

- Enable Formspree production submission only after the prerequisites above
  are complete (real provider/controller, public address, public email,
  approved Privacy Policy, first-layer form information, legal-basis review,
  Formspree processing review, retention workflow, spam-protection decision).
  Keep `NEXT_PUBLIC_CONTACT_FORM_ENABLED` OFF until then.

Spam protection:

- Evaluate spam protection when the form is activated; prefer minimal
  solutions first. If a third-party CAPTCHA/anti-bot is needed, evaluate
  privacy impact, cookie/storage behavior, accessibility, static-export
  compatibility and performance.

### Technical SEO (Punto 7)

✅ **Complete.** Implemented and reviewed:

- page-specific metadata for Gateway / Home / Services / Studio / Work /
  Contact / Corazón / Barber (`generateMetadata` + `seo` messages namespace)
- absolute self-referencing canonicals; reciprocal hreflang es/en/it + x-default
- robots meta driven by `NEXT_PUBLIC_SITE_INDEXABLE` (GitHub Pages stays
  `noindex, follow`); fail-closed: indexable builds require an explicit valid
  https `NEXT_PUBLIC_SITE_ORIGIN`
- `app/sitemap.ts` (22 canonical URLs) and `app/robots.ts` (allow-all, no
  `Disallow: /`); while noindex, `robots.txt` does not advertise the sitemap
- Open Graph + Twitter cards with a static 1200×630 social preview
  (`public/social/nexad-social.png`)
- minimal `WebSite` JSON-LD at the Gateway root
- origin/basePath-driven URL builder (`lib/seo.ts`); no `/NEXAD` hardcoded

Production / activation TODOs (blocked until the custom domain and explicit
approval — not blockers for the foundation):

- Set `NEXT_PUBLIC_SITE_INDEXABLE=true` only after explicit production approval.
- Switch `NEXT_PUBLIC_SITE_ORIGIN` to the final custom domain.
- Verify canonical / hreflang / sitemap after the custom-domain cutover.
- Set up Search Console and submit the sitemap after production domain
  activation.
- Re-evaluate Organization / ProfessionalService structured data after
  Legal + Contact 6B.
- Create project-specific social previews when sufficient real assets exist.

🟡 Later — small consistency task: align the Gateway visible descriptor
(`STRATEGY · DESIGN · TECHNOLOGY`) with the canonical positioning descriptor
(`STRATEGY · MARKETING · CONTENT · TECHNOLOGY`).

## 🟠 Next

### Analytics / conversion tracking

Choose the stack before implementing: GA4 vs a privacy-friendly alternative
(Plausible / Umami or similar). Candidate events: Gateway language choice,
Services/Studio CTAs, Work project click, contact form start/success/error,
WhatsApp click, direct-messaging / call CTA, outbound project/client site
click. Do not track useless events. Coordinate with Privacy/Legal.

### Cookies / consent re-audit

Conditional: re-audit cookie/consent requirements whenever analytics,
advertising, third-party embeds, CAPTCHA or other non-essential
tracking/storage is introduced.

Current audit result (technical, not legal advice): no consent banner is
currently required by the implemented app stack — no cookies, no non-essential
storage, no third-party embeds or trackers were found; the Gateway uses
`sessionStorage` for its own functionality and Formspree submission is
disabled by default. Re-evaluate when the stack changes.

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

GitHub Pages is temporary; a future custom domain is NOT
acquired or confirmed. When decided: DNS, custom domain, HTTPS, drop `/NEXAD`
from the production basePath, final canonicals, Search Console, final sitemap,
redirects if needed, verify localized routes and the Gateway.

## 🟡 Later

### Marketing / conversion pass

After the site is technically stable: ICP, offers, CTA, funnel, lead
qualification, positioning, proof, objections, conversion copy. Do not
restrict NEXAD to restaurants.

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

Separate from technical completion: NEXAD Instagram, Lorenzo as a brand face,
educational content, project breakdowns, behind the scenes, marketing + tech
connection, selective build in public.

### Newsletter / promotional communications setup

🟡 Later / blocked until legal/contact identity is ready. Choose a real
provider; define purposes and workflow; separate marketing from the contact
request; implement an appropriate, un-checked opt-in; provide a simple
unsubscribe/revoke mechanism; update privacy/legal; verify
processors/transfers; verify email tracking if used. Not to be implemented
now.

## Housekeeping

- Keep `messages/{es,en,it}.json` structurally synchronized when copy changes.
- Keep `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `docs/TODO.md` updated
  when a decision materially changes the project.