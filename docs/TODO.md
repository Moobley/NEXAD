# NEXAD — Roadmap

Legend: ✅ Complete · 🔴 High priority · 🟠 Next · 🟡 Later · ⏸ Paused · ⚪ Optional

> **Production status:** NOT production-ready. The Aruba deployment
> architecture is in place, but the site stays noindex with the contact form
> off until the Legal/Contact blockers below are actually resolved.

## ✅ Complete

- Routing / deploy (static export, trailingSlash, basePath env, no middleware).
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
- Public NEXAD email decided: `nexadlab@gmail.com` (Formspree recipient,
  configured in the Formspree dashboard, never hardcoded in the frontend).
- Spam-protection decision for v1 (D-032): Formspree `_gotcha` honeypot;
  no CAPTCHA added. Re-evaluate only if real spam requires it.
- Production hosting architecture (D-030): Aruba static hosting — local
  `npm run build` produces `out/`, uploaded manually via FileZilla (no CI/CD,
  no GitHub Actions; deploy workflows removed).

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
data, adding a real management-side visual to the "Cosa abbiamo costruito"
section without turning the page into a gallery.

## 🔴 High priority

### 6B — Legal + Contact production activation

🔴 Blocked / pending real business data. Next major task after 6A. Do not
invent provider/company/tax data — NEXAD is pre-launch and early-stage.

✅ Implemented (form integration + links — done ahead of production activation):

- Contact form: mandatory "I have read the Privacy Policy" acknowledgement
  checkbox (NOT marketing consent), localized via `messages/*.json`, with a
  locale-independent Privacy Policy PDF link (opens in a new tab via
  `asset()`).
- First-layer privacy notice under the form (localized, short: purpose,
  Formspree processor, 12-month retention, data-subject rights).
- Formspree `_gotcha` honeypot (invisible, out of tab order, `autocomplete=off`)
  whose value is actually appended to the submitted `FormData`.
- Footer: localized Privacy Policy, Legal Notice/Aviso Legal and Cookie Policy
  links to the Spanish PDFs under `public/legal/` (locale-independent paths,
  opened in a new tab) + a "Cookie settings" trigger that reopens the
  preferences panel.
- Cookie consent system (privacy-by-default): consent banner, preferences
  modal, `localStorage` persistence under `nexad_cookie_consent`, centralized
  `useCookieConsent()` API; `necessary` always on, `analytics` /
  `advertising` off until explicitly granted.
- Tracking readiness, gated on consent and tag IDs: Google Consent Mode
  (`ad_storage` / `analytics_storage` / `ad_user_data` /
  `ad_personalization` denied by default), Meta Pixel loaded only after
  advertising consent, centralized `trackConversion()` (no-op without IDs or
  consent).
- Contact form marketing opt-in: removed. The form now collects only first
  name, surname, phone, email (required), optional message, and mandatory
  Privacy Policy consent — no newsletter/marketing opt-in.

⚠️ Still required before enabling production submission: real
service-provider identity, publishable address, final approved Privacy
Policy PDF content, legal-basis review, and the Formspree processing/privacy
review. Public email and spam protection are decided (see below).
`NEXT_PUBLIC_CONTACT_FORM_ENABLED` stays OFF.

Legal identity / provider data:

- Define the real legal operator / service provider before publication
  (company, autónomo, partnership or joint ownership — none is assumed).
- Define a legally appropriate publishable domicile/address for the service
  provider (Las Palmas de Gran Canaria alone is not a substitute for a
  complete address when legally required).
- ✅ Public NEXAD contact email decided: `nexadlab@gmail.com` (Formspree
  recipient, configured in the Formspree dashboard, never in the frontend).
- ✅ Public NEXAD WhatsApp decided: `+34 610 77 51 40` (`34610775140`), shown
  via the floating WhatsApp button on every localized page
  (`components/layout/whatsapp-float.tsx`). Calls are arranged manually
  through messaging (no calendar booking).

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

- ✅ Decided for v1 (D-032): the Formspree `_gotcha` honeypot already
  implemented in the form. No CAPTCHA is added. Re-evaluate CAPTCHA/other
  anti-bot measures only if real spam requires it, and then evaluate privacy
  impact, cookie/storage behavior, accessibility, static-export compatibility
  and performance.

### Technical SEO (Punto 7)

✅ **Complete.** Implemented and reviewed:

- page-specific metadata for Gateway / Home / Services / Studio / Work /
  Contact / Corazón / Barber (`generateMetadata` + `seo` messages namespace)
- absolute self-referencing canonicals; reciprocal hreflang es/en/it + x-default
- robots meta driven by `NEXT_PUBLIC_SITE_INDEXABLE` (production stays
  `noindex, follow` until go-live); fail-closed: indexable builds require an
  explicit valid https `NEXT_PUBLIC_SITE_ORIGIN`
- `app/sitemap.ts` (22 canonical URLs) and `app/robots.ts` (allow-all, no
  `Disallow: /`); while noindex, `robots.txt` does not advertise the sitemap
- Open Graph + Twitter cards with a static 1200×630 social preview
  (`public/social/nexad-social.png`)
- minimal `WebSite` JSON-LD at the Gateway root
- origin/basePath-driven URL builder (`lib/seo.ts`); no `/NEXAD` hardcoded

Production / activation TODOs (blocked until explicit production approval —
the domain `https://www.nexadlab.com` is decided but NOT live):

- At go-live set `NEXT_PUBLIC_SITE_ORIGIN=https://www.nexadlab.com`,
  `NEXT_PUBLIC_BASE_PATH=` (empty) and `NEXT_PUBLIC_SITE_INDEXABLE=true`; the
  guardrail in `lib/seo.ts` enforces exactly this combination.
- Connect the custom domain / DNS only at go-live; no `CNAME` before.
- Verify canonical / hreflang / sitemap after the production cutover.
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

Current state: a privacy-by-default consent system is implemented — consent
banner + preferences modal, `localStorage`-persisted (`nexad_cookie_consent`,
no consent cookie), Google Consent Mode and Meta Pixel gated on consent, and
the contact form's separate newsletter opt-in. Nothing non-essential loads
before a stored choice, and both tag integrations tolerate missing IDs. The
Meta Pixel ID (`1009835142128506`) is now configured; Google Ads remains
unconfigured. The final Spanish legal PDFs (`public/legal/*.pdf`) are still
pending. Re-audit when the legal PDFs, GA4 or any additional third-party embed
is added.

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

✅ **Aruba hosting architecture implemented.** Production is hosted as a
static export on Aruba: `npm run build` (reads `.env.production`, origin
`https://www.nexadlab.com` + empty basePath) produces `out/`, which is
uploaded manually via FileZilla. No CI/CD, no GitHub Actions.

🟠 First Aruba deploy (pre-go-live): build locally with
`NEXT_PUBLIC_SITE_INDEXABLE=false` + `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`
(set in `.env.production`), upload `out/` via FileZilla, and smoke-test the
canonical origin (still noindex, form off).

🔴 Go-live checklist (only after explicit approval AND the Legal/Contact
blockers are resolved): connect DNS/custom domain + HTTPS, set
`NEXT_PUBLIC_SITE_INDEXABLE=true`, verify final canonicals, Search Console,
sitemap, redirects if needed, localized routes and the Gateway, and run a
final production smoke test.

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

🟡 Later / blocked until legal/contact identity is ready. The contact form no
longer collects a newsletter consent (the checkbox was removed). Still pending
if a newsletter is reintroduced: choose a real provider, define purposes
and workflow, implement an unsubscribe/revoke mechanism, update privacy/legal,
verify processors/transfers, verify email tracking if used. Not to be
implemented now.

## Housekeeping

- Keep `messages/{es,en,it}.json` structurally synchronized when copy changes.
- Keep `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `docs/TODO.md` updated
  when a decision materially changes the project.