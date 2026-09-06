"use client"

import { useTranslations } from "next-intl"

import { useCookieConsent } from "@/components/consent/consent-provider"

/** Footer trigger that reopens the cookie preferences panel. */
export function CookieSettingsButton() {
  const t = useTranslations("footer")
  const { openPreferences } = useCookieConsent()

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="interactive-link font-mono text-[11px] tracking-[0.15em]"
    >
      {t("cookieSettings")}
    </button>
  )
}
