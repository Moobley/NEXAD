"use client"

import { useTranslations } from "next-intl"

import { useCookieConsent } from "@/components/consent/consent-provider"

const REJECT_BUTTON =
  "inline-flex items-center justify-center border border-ivory/60 px-[1.9rem] py-[1.05rem] text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:border-signal hover:text-signal focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-3"

export function CookieBanner() {
  const t = useTranslations("cookies.banner")
  const {
    hasConsentChoice,
    consentReady,
    acceptAll,
    rejectAll,
    openPreferences,
  } = useCookieConsent()

  // Hidden until the store is hydrated: avoids a hydration mismatch (the
  // server always renders the "no choice" view) and a flash for returning
  // users who already have a stored choice.
  if (!consentReady || hasConsentChoice) return null

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      className="surface-obsidian fixed inset-x-0 bottom-0 z-[70] border-t border-ivory/15"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-8 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-sans text-xl font-medium tracking-tight text-foreground">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={acceptAll}
              className="cta-primary justify-center"
            >
              {t("acceptAll")}
            </button>
            <button type="button" onClick={rejectAll} className={REJECT_BUTTON}>
              {t("rejectAll")}
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className={REJECT_BUTTON}
            >
              {t("configure")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
